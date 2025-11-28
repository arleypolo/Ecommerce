import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail, createContactEmailTemplate } from '@/lib/email';
import { contactFormSchema } from '@/utils/validationSchemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body;

    // Validar datos con Yup
    await contactFormSchema.validate({ name, email, subject, message });

    // Crear el template del email
    const { text, html } = createContactEmailTemplate(name, email, subject, message);

    // Enviar el email
    await sendEmail({
      to: process.env.EMAIL_SERVER_USER || '',
      subject: `Contacto: ${subject}`,
      text,
      html,
    });

    // Enviar confirmación al usuario
    await sendEmail({
      to: email,
      subject: 'Confirmación de mensaje recibido',
      text: `Hola ${name},\n\nHemos recibido tu mensaje y te responderemos pronto.\n\nGracias por contactarnos.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">¡Gracias por contactarnos!</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Hemos recibido tu mensaje y te responderemos pronto.</p>
          <p>Saludos,<br>El equipo de E-Commerce</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return res.status(500).json({ 
      message: 'Error sending email', 
      error: error.message 
    });
  }
}
