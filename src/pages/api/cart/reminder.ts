import type { NextApiRequest, NextApiResponse } from 'next';
import { sendEmail } from '@/lib/email';
import { CartItem } from '@/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, name, cart } = req.body as {
      email: string;
      name: string;
      cart: CartItem[];
    };

    if (!email || !cart || cart.length === 0) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    // Calcular el total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Crear el contenido del email
    const productList = cart.map(item => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.imageUrl}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>
    `).join('');

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0;">🛒 ¡No olvides tu carrito!</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
            Hola <strong>${name}</strong>,
          </p>
          
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 20px;">
            Notamos que dejaste algunos productos en tu carrito. ¡No pierdas la oportunidad de completar tu compra!
          </p>

          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0ea5e9; margin-top: 0;">Tu Carrito:</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f3f4f6;">
                  <th style="padding: 10px; text-align: left;">Producto</th>
                  <th style="padding: 10px; text-align: left;">Nombre</th>
                  <th style="padding: 10px; text-align: center;">Cantidad</th>
                  <th style="padding: 10px; text-align: right;">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${productList}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3" style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px;">
                    Total:
                  </td>
                  <td style="padding: 15px 10px; text-align: right; font-weight: bold; font-size: 18px; color: #0ea5e9;">
                    $${total.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="${process.env.NEXTAUTH_URL}/cart" 
               style="display: inline-block; background: #0ea5e9; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Completar mi Compra
            </a>
          </div>

          <p style="font-size: 12px; color: #9ca3af; text-align: center; margin-top: 30px;">
            Este es un recordatorio automático porque tienes productos en tu carrito.<br>
            Si ya completaste tu compra, puedes ignorar este mensaje.
          </p>
        </div>
      </div>
    `;

    const text = `
      Hola ${name},
      
      Notamos que dejaste algunos productos en tu carrito:
      
      ${cart.map(item => `- ${item.name} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`).join('\n')}
      
      Total: $${total.toFixed(2)}
      
      ¡No pierdas la oportunidad de completar tu compra!
      Visita: ${process.env.NEXTAUTH_URL}/cart
    `;

    await sendEmail({
      to: email,
      subject: '🛒 ¡Tienes productos esperándote en tu carrito!',
      text,
      html,
    });

    return res.status(200).json({ message: 'Reminder email sent successfully' });
  } catch (error: any) {
    console.error('Error sending cart reminder:', error);
    return res.status(500).json({ 
      message: 'Error sending reminder email', 
      error: error.message 
    });
  }
}
