import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { getProductById, updateProduct, deleteProduct } from '@/lib/products';
import { productFormSchema } from '@/utils/validationSchemas';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ message: 'Invalid product ID' });
  }

  // GET - Obtener un producto por ID
  if (req.method === 'GET') {
    try {
      const product = getProductById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  }

  // PUT - Actualizar producto (requiere autenticación y rol admin)
  if (req.method === 'PUT') {
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

      const updatedProduct = updateProduct(id, req.body);
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(updatedProduct);
    } catch (error: any) {
      return res.status(400).json({ message: 'Error updating product', error: error.message });
    }
  }

  // DELETE - Eliminar producto (requiere autenticación y rol admin)
  if (req.method === 'DELETE') {
    try {
      const session = await getServerSession(req, res, authOptions);
      
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      if (session.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' });
      }

      const deleted = deleteProduct(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      return res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
