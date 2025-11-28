import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/layout/Layout';
import { CartProvider } from '@/contexts/CartContext';
import nextI18NextConfig from '../../next-i18next.config.js';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Layout>
      </CartProvider>
    </SessionProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
