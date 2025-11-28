import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getAllProducts, createProduct } from '@/lib/products';
import { productFormSchema } from '@/utils/validationSchemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // GET - Obtener todos los productos
  if (req.method === 'GET') {
    try {
      const products = getAllProducts();
      return res.status(200).json(products);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  }

  // POST - Crear nuevo producto (requiere autenticación y rol admin)
  if (req.method === 'POST') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }

      // Validar datos con Yup
      await productFormSchema.validate(req.body);

      const newProduct = createProduct(req.body);
      return res.status(201).json(newProduct);
    } catch (error: any) {
      return res.status(400).json({ message: 'Error creating product', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
