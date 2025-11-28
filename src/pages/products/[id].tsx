import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Product } from '@/types';
import { ShoppingCart, ArrowLeft } from 'lucide-react';

// Datos de ejemplo
const mockProducts: Product[] = [
    {
        id: '1',
        name: 'Laptop Pro 15"',
        description: 'Potente laptop para profesionales con procesador de última generación. Incluye 16GB RAM, 512GB SSD, pantalla Full HD.',
        price: 1299.99,
        category: 'Electrónica',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
        imagePublicId: 'sample',
        stock: 15,
        createdAt: new Date(),
    },
];

interface ProductDetailProps {
    product: (Omit<Product, 'createdAt'> & { createdAt: string }) | null;
}

export default function ProductDetail({ product }: ProductDetailProps) {
    const { t } = useTranslation('common');
    const router = useRouter();

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <Button onClick={() => router.push('/products')}>
                    Volver a productos
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        console.log('Adding to cart:', product);
        toast.success(`${product.name} agregado al carrito 🛒`);
    };

    return (
        <>
            <Head>
                <title>E-Commerce - {product.name}</title>
                <meta name="description" content={product.description} />
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <Button
                    variant="outline"
                    onClick={() => router.push('/products')}
                    className="mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Volver a productos
                </Button>

                <Card>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                        <div className="relative h-96">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {product.name}
                            </h1>

                            <div className="mb-4">
                                <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {product.category}
                                </span>
                            </div>

                            <div className="text-4xl font-bold text-primary-600 mb-6">
                                ${product.price.toFixed(2)}
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">
                                    {t('products.description')}
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <p className="text-sm">
                                    <span className="font-medium">Stock: </span>
                                    <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                                        {product.stock > 0 ? `${product.stock} ${t('products.inStock')}` : t('products.outOfStock')}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-auto">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    fullWidth
                                    onClick={handleAddToCart}
                                    disabled={product.stock === 0}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    {t('products.addToCart')}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: mockProducts.map((product) => ({
            params: { id: product.id },
        })),
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
    const product = mockProducts.find((p) => p.id === params?.id) || null;

    // Convertir Date a string para que sea serializable
    const serializedProduct = product ? {
        ...product,
        createdAt: typeof product.createdAt === 'string' ? product.createdAt : product.createdAt.toISOString(),
    } : null;

    return {
        props: {
            product: serializedProduct,
            ...(await serverSideTranslations(locale || 'es', ['common'])),
        },
        revalidate: 60,
    };
};
