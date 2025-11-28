import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { getServerSession } from 'next-auth/next';
import { signIn } from 'next-auth/react';
import { authOptions } from '../api/auth/[...nextauth]';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { loginSchema } from '@/utils/authSchemas';
import { LogIn, Mail, Lock } from 'lucide-react';

interface LoginFormData {
  email: string;
  password: string;
}

export default function SignIn() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleCredentialsLogin = async (values: LoginFormData) => {
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (result?.error) {
        toast.error('❌ Email o contraseña incorrectos');
      } else {
        toast.success('✅ Inicio de sesión exitoso');
        router.push('/');
      }
    } catch (error) {
      toast.error('❌ Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <>
      <Head>
        <title>E-Commerce - {t('common.login')}</title>
        <meta name="description" content="Inicia sesión en tu cuenta" />
      </Head>

      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="bg-primary-100 p-4 rounded-full">
                  <LogIn className="h-12 w-12 text-primary-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {t('auth.welcomeBack')}
              </h1>
              <p className="text-gray-600">
                Inicia sesión para acceder a tu cuenta
              </p>
            </div>

            <div className="space-y-6">
              {/* Formulario de login con email y contraseña */}
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={loginSchema}
                onSubmit={handleCredentialsLogin}
              >
                {({ errors, touched, values, handleChange, handleBlur }) => (
                  <Form className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        <Mail className="h-4 w-4 inline mr-1" />
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          touched.email && errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {touched.email && errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        <Lock className="h-4 w-4 inline mr-1" />
                        Contraseña
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Tu contraseña"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                          touched.password && errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {touched.password && errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                      disabled={isLoading}
                    >
                      <LogIn className="h-5 w-5 mr-2" />
                      Iniciar sesión
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Divisor */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">O continúa con</span>
                </div>
              </div>

              {/* Botón de Google */}
              <Button
                variant="outline"
                size="lg"
                fullWidth
                onClick={handleGoogleLogin}
                isLoading={isGoogleLoading}
                disabled={isGoogleLoading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t('auth.signInWithGoogle')}
              </Button>
            </div>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              ¿No tienes cuenta?{' '}
              <Link href="/auth/register" className="font-medium text-primary-600 hover:text-primary-500">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
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
