import type { NextApiRequest, NextApiResponse } from 'next';
import { uploadImage } from '@/lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // En una aplicación real, aquí procesarías el archivo con multer o similar
    // Por simplicidad, este endpoint está preparado para recibir la URL de Cloudinary
    // desde el cliente usando el widget de Cloudinary
    
    return res.status(200).json({ 
      message: 'Use Cloudinary upload widget on the client side' 
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      message: 'Error uploading image', 
      error: error.message 
    });
  }
}
