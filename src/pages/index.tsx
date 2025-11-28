import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ShoppingBag, Truck, Shield, Headphones } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation('common');

  const features = [
    {
      icon: ShoppingBag,
      title: 'Amplia Variedad',
      description: 'Miles de productos para elegir',
    },
    {
      icon: Truck,
      title: 'Envío Rápido',
      description: 'Entrega en 24-48 horas',
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Garantía de satisfacción',
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Estamos aquí para ayudarte',
    },
  ];

  return (
    <>
      <Head>
        <title>E-Commerce - {t('common.home')}</title>
        <meta name="description" content="Tu tienda en línea de confianza" />
      </Head>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('common.welcome')} a E-Commerce
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Descubre los mejores productos al mejor precio
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/products">
                <Button variant="secondary" size="lg">
                  Ver Productos
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Contáctanos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary-100 p-4 rounded-full">
                      <Icon className="h-8 w-8 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Explora nuestra colección de productos y encuentra lo que necesitas
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              Explorar Productos
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'es', ['common'])),
    },
  };
};
