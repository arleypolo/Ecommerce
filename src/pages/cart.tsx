import React from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { t } = useTranslation('common');
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

  const handleIncrement = (productId: string, currentQuantity: number) => {
    updateQuantity(productId, currentQuantity + 1);
    toast.success('Cantidad actualizada');
  };

  const handleDecrement = (productId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
      toast.success('Cantidad actualizada');
    }
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.info(`${productName} eliminado del carrito`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  const handleCheckout = () => {
    toast.info('Función de pago en desarrollo. Tu total es: $' + cartTotal.toFixed(2));
    // Aquí implementarías la integración con Stripe/PayPal
  };

  return (
    <>
      <Head>
        <title>E-Commerce - {t('cart.title')}</title>
        <meta name="description" content="Tu carrito de compras" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link href="/products">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {t('cart.title')}
        </h1>

        {cart.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {t('cart.empty')}
            </h2>
            <p className="text-gray-500 mb-6">
              Agrega productos a tu carrito para verlos aquí
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg">
                Explorar Productos
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.id} className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 flex-shrink-0 relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.description}
                      </p>
                      <p className="text-lg font-bold text-primary-600">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() => handleDecrement(item.id, item.quantity)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrement(item.id, item.quantity)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-end pt-4">
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                >
                  Vaciar Carrito
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4">
                <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

                <div className="space-y-3 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{t('cart.total')}</span>
                    <span className="text-2xl font-bold text-primary-600">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleCheckout}
                >
                  {t('cart.checkout')}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Envío y tasas calculadas al finalizar la compra
                </p>
              </Card>
            </div>
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
        destination: '/auth/signin?callbackUrl=/cart',
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
