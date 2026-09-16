const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

const LIMITS = { fullname: 256, email: 256, message: 1024 };

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();

  for (const [key, times] of hits) {
    const live = times.filter((time) => now - time < WINDOW_MS);
    if (live.length) hits.set(key, live);
    else hits.delete(key);
  }

  const recent = hits.get(ip) ?? [];
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const field = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST(request: Request) {
  if (!DISCORD_WEBHOOK_URL) {
    console.error('DISCORD_WEBHOOK environment variable is not set');
    return Response.json(
      { status: 'Error', error: 'Contact form is unavailable.' },
      { status: 500 },
    );
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

  if (rateLimited(ip)) {
    return Response.json(
      { status: 'Error', error: 'Too many messages. Try again later.' },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const fullname = field(body.fullname, LIMITS.fullname);
    const email = field(body.email, LIMITS.email);
    const message = field(body.message, LIMITS.message);

    if (!fullname || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { status: 'Error', error: 'Please fill in every field.' },
        { status: 400 },
      );
    }

    const embed = {
      title: '📬 New Portfolio Contact Message',
      color: 0x5865f2, // Discord blurple
      fields: [
        { name: '👤 Name', value: fullname, inline: true },
        { name: '📧 Email', value: email, inline: true },
        { name: '💬 Message', value: message, inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'Portfolio Contact Form' },
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    return Response.json({ status: 'Ok' });
  } catch (error) {
    console.error('Contact form error:', error);
    return Response.json(
      { status: 'Error', error: 'Could not send your message.' },
      { status: 500 },
    );
  }
}
