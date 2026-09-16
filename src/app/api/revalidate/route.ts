import { revalidateTag } from 'next/cache';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

const TYPES = ['project', 'certification', 'connectphoto', 'experience'];

export async function POST(request: Request) {
  const timestamp = new Date().toISOString();

  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.log(`[${timestamp}] ❌ SANITY_REVALIDATE_SECRET not configured`);
    return Response.json(
      { message: 'Server configuration error' },
      { status: 500 },
    );
  }

  if (!signature || !(await isValidSignature(body, signature, secret))) {
    console.log(`[${timestamp}] ❌ Invalid webhook signature`);
    return Response.json({ message: 'Invalid signature' }, { status: 401 });
  }

  try {
    const { _type } = JSON.parse(body) as { _type?: string };
    const tags = _type && TYPES.includes(_type) ? [_type] : TYPES;
    tags.forEach((tag) => revalidateTag(tag, 'max'));

    console.log(`[${timestamp}] ✅ Revalidated: ${tags.join(', ')}`);
    return Response.json({ revalidated: true, tags, now: Date.now() });
  } catch (err) {
    console.error(`[${timestamp}] ❌ Error revalidating:`, err);
    return Response.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 },
    );
  }
}
