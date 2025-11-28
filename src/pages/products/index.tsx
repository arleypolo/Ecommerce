import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductCard from '@/components/products/ProductCard';
import { Product } from '@/types';

export default function ProductsPage() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);    useEffect(() => {
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

    const handleViewDetails = (productId: string) => {
        router.push(`/products/${productId}`);
    };

    return (
        <>
            <Head>
                <title>E-Commerce - {t('common.products')}</title>
                <meta name="description" content="Explora nuestros productos" />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {t('products.title')}
                    </h1>
                    <p className="text-xl text-gray-600">
                        Encuentra los mejores productos para ti
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">Cargando productos...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onViewDetails={handleViewDetails}
                                />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="text-center py-12">
                                <p className="text-xl text-gray-600">No hay productos disponibles</p>
                            </div>
                        )}
                    </>
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
                destination: '/auth/signin?callbackUrl=/products',
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
