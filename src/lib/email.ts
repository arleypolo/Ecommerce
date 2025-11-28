import nodemailer from 'nodemailer';
import { EmailPayload } from '@/types';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export const sendEmail = async (payload: EmailPayload): Promise<void> => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: payload.to,
            subject: payload.subject,
            text: payload.text,
            html: payload.html,
        });
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export const createContactEmailTemplate = (
    name: string,
    email: string,
    subject: string,
    message: string
): { text: string; html: string } => {
    const text = `
    Nuevo mensaje de contacto:
    
    Nombre: ${name}
    Email: ${email}
    Asunto: ${subject}
    
    Mensaje:
    ${message}
  `;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #0ea5e9;">Nuevo mensaje de contacto</h2>
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px;">
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
        <p><strong>Mensaje:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
      <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
        Este mensaje fue enviado desde el formulario de contacto de tu e-commerce.
      </p>
    </div>
  `;

    return { text, html };
};
