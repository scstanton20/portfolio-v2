const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK;

const handler = async (req: any, res: any) => {
  try {
    if (!DISCORD_WEBHOOK_URL) {
      throw new Error('DISCORD_WEBHOOK environment variable is not set');
    }

    const { fullname, email, message } = req.body;

    // Create Discord embed for a nicer formatted message
    const embed = {
      title: '📬 New Portfolio Contact Message',
      color: 0x5865F2, // Discord blurple color
      fields: [
        {
          name: '👤 Name',
          value: fullname || 'Not provided',
          inline: true
        },
        {
          name: '📧 Email',
          value: email || 'Not provided',
          inline: true
        },
        {
          name: '💬 Message',
          value: message || 'No message',
          inline: false
        }
      ],
      timestamp: new Date().toISOString(),
      footer: {
        text: 'Portfolio Contact Form'
      }
    };

    const payload = {
      embeds: [embed]
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Discord webhook failed: ${response.status}`);
    }

    res.status(200).json({ status: 'Ok' });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'Error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export default handler;
