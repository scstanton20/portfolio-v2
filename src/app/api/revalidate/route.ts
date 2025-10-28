import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

type SanityWebhookPayload = {
  _type?: string;
  _id?: string;
};

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🔔 Webhook received from Sanity`);

  // Validate secret token from env var
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    console.log(`[${timestamp}] ❌ Invalid token provided`);
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  try {
    // Parse the webhook payload to determine what to revalidate
    const body = await request.json().catch(() => ({})) as SanityWebhookPayload;
    const { _type, _id } = body;

    console.log(`[${timestamp}] 📦 Content type: ${_type || 'unknown'}, ID: ${_id || 'unknown'}`);

    const revalidatedTags: string[] = [];

    // Revalidate based on content type
    // Note: In Next.js 16, revalidateTag requires a second argument (cache profile)
    // Using empty string for default behavior
    if (_type === 'project') {
      revalidateTag('projects', '');
      revalidatedTags.push('projects');
    } else if (_type === 'certification') {
      revalidateTag('certifications', '');
      revalidatedTags.push('certifications');
    } else if (_type === 'connectphoto') {
      revalidateTag('connectphoto', '');
      revalidatedTags.push('connectphoto');
    } else if (_type === 'experience') {
      revalidateTag('experience', '');
      revalidatedTags.push('experience');
    } else {
      // If no type specified or unknown type, revalidate everything
      console.log(`[${timestamp}] ⚠️  Unknown content type, revalidating all tags`);
      revalidateTag('projects', '');
      revalidateTag('certifications', '');
      revalidateTag('connectphoto', '');
      revalidateTag('experience', '');
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
