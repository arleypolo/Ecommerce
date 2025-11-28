import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser } from '@/lib/users';
import { registerSchema } from '@/utils/authSchemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }

  try {
    const { name, email, password } = req.body;

    // Validar datos
    await registerSchema.validate({ name, email, password, confirmPassword: password });

    // Crear usuario
    const user = await createUser(email, password, name);

    return res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user,
    });
  } catch (error: any) {
    console.error('Error en registro:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(400).json({
      message: error.message || 'Error al registrar usuario',
    });
  }
}
