import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

type SanityWebhookPayload = {
  _type?: string;
  _id?: string;
};

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔔 Webhook received from Sanity`);

  // Read the raw body for signature validation
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    console.log(`[${timestamp}] ❌ SANITY_REVALIDATE_SECRET not configured`);
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  // Validate webhook signature
  if (!signature || !(await isValidSignature(body, signature, secret))) {
    console.log(`[${timestamp}] ❌ Invalid webhook signature`);
    return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
  }

  console.log(`[${timestamp}] ✅ Signature validated`);

  try {
    // Parse the validated body
    const payload = JSON.parse(body) as SanityWebhookPayload;
    const { _type, _id } = payload;

    console.log(`[${timestamp}] 📦 Content type: ${_type || 'unknown'}, ID: ${_id || 'unknown'}`);

    const revalidatedTags: string[] = [];

    // Revalidate cache based on content type
    if (_type === 'project') {
      revalidateTag('projects', 'max');
      revalidatedTags.push('projects');
    } else if (_type === 'certification') {
      revalidateTag('certifications', 'max');
      revalidatedTags.push('certifications');
    } else if (_type === 'connectphoto') {
      revalidateTag('connectphoto', 'max');
      revalidatedTags.push('connectphoto');
    } else if (_type === 'experience') {
      revalidateTag('experience', 'max');
      revalidatedTags.push('experience');
    } else {
      // If no type specified or unknown type, revalidate all tags
      console.log(`[${timestamp}] ⚠️  Unknown content type, revalidating all tags`);
      revalidateTag('projects', 'max');
      revalidateTag('certifications', 'max');
      revalidateTag('connectphoto', 'max');
      revalidateTag('experience', 'max');
      revalidatedTags.push('projects', 'certifications', 'connectphoto', 'experience');
    }

    console.log(`[${timestamp}] ✅ Successfully revalidated tags: ${revalidatedTags.join(', ')}`);

    return NextResponse.json({
      revalidated: true,
      tags: revalidatedTags,
      now: Date.now(),
      message: `Successfully revalidated tags: ${revalidatedTags.join(', ')}`,
    });
  } catch (err) {
    console.error(`[${timestamp}] ❌ Error revalidating:`, err);
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    );
  }
}
