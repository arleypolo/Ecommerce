import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { toast } from 'react-toastify';
import Head from 'next/head';
import axios from 'axios';
import { useRouter } from 'next/router';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import ProductForm from '@/components/products/ProductForm';
import { Product } from '@/types';
import { Plus, Edit, Trash2, Package } from 'lucide-react';

export default function AdminPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values: any) => {
    try {
      await axios.post('/api/products', values);
      await fetchProducts();
      setShowForm(false);
      toast.success('✅ Producto creado exitosamente');
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast.error('Error al crear producto: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdate = async (values: any) => {
    if (!editingProduct) return;
    
    try {
      await axios.put(`/api/products/${editingProduct.id}`, values);
      await fetchProducts();
      setEditingProduct(undefined);
      setShowForm(false);
      toast.success('✅ Producto actualizado exitosamente');
    } catch (error: any) {
      console.error('Error updating product:', error);
      toast.error('Error al actualizar producto: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/products/${id}`);
      await fetchProducts();
      toast.success('🗑️ Producto eliminado exitosamente');
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast.error('Error al eliminar producto: ' + (error.response?.data?.message || error.message));
    }
  };

  const openCreateForm = () => {
    setEditingProduct(undefined);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditingProduct(undefined);
    setShowForm(false);
  };

  return (
    <>
      <Head>
        <title>E-Commerce - Administración</title>
        <meta name="description" content="Panel de administración de productos" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Administración de Productos
            </h1>
            <p className="text-gray-600">Gestiona tu inventario de productos</p>
          </div>
          {!showForm && (
            <Button variant="primary" onClick={openCreateForm}>
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Producto
            </Button>
          )}
        </div>

        {showForm ? (
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={closeForm}
          />
        ) : loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Cargando productos...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id} className="p-6">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="font-semibold text-primary-600">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-gray-500">
                        Categoría: {product.category}
                      </span>
                      <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                        <Package className="h-4 w-4 inline mr-1" />
                        Stock: {product.stock}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditForm(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}

            {products.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600 mb-4">
                  No hay productos disponibles
                </p>
                <Button variant="primary" onClick={openCreateForm}>
                  <Plus className="h-5 w-5 mr-2" />
                  Crear Primer Producto
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin?callbackUrl=/admin',
        permanent: false,
      },
    };
  }

  // Verificar que el usuario sea admin
  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(context.locale || 'es', ['common'])),
    },
  };
};
