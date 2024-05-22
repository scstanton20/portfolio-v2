const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  try {
    const message = `
    Name: ${req.body.fullname}\r\n
    Email: ${req.body.email}\r\n
    Message: ${req.body.message}
  `;
  await mail.send({
    to: 'scstanton2020@gmail.com',
    from: 'sam@scstanton.net',
    subject: 'New message was sent from your Portfolio!',
    text: message,
    html: message.replace(/\r\n/g, '<br>'),
  });
  res.status(200).json({ status: 'Ok' });
  }
  catch (error) {
    console.error(error)
  }
  
}