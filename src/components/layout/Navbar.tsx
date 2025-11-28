import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { ShoppingCart, Home, Package, Mail, LogIn, LogOut, Globe } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '@/contexts/CartContext';

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { cartCount } = useCart();    const changeLanguage = (locale: string) => {
        router.push(router.pathname, router.asPath, { locale });
    };

    const navLinks = [
        { href: '/', label: t('common.home'), icon: Home },
        { href: '/products', label: t('common.products'), icon: Package },
        { href: '/contact', label: t('common.contact'), icon: Mail },
    ];

    const adminLink = { href: '/admin', label: 'Admin', icon: Package };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ShoppingCart className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">E-Commerce</span>
            </Link>
          </div>

          <div className="flex-grow"></div>                    <div className="flex items-center space-x-4">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                                >
                                    <Icon className="h-5 w-5 mr-1" />
                                    {link.label}
                                </Link>
                            );
                        })}

                        {session && session.user.role === 'admin' && (
                            <Link
                                href={adminLink.href}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                            >
                                <Package className="h-5 w-5 mr-1" />
                                {adminLink.label}
                            </Link>
                        )}

                        <Link
                            href="/cart"
                            className="relative flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                        >
                            <ShoppingCart className="h-5 w-5 mr-1" />
                            {t('common.cart')}
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <div className="flex items-center space-x-2 ml-4 border-l pl-4">
                            <button
                                onClick={() => changeLanguage(i18n.language === 'es' ? 'en' : 'es')}
                                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
                            >
                                <Globe className="h-5 w-5 mr-1" />
                                {i18n.language ? i18n.language.toUpperCase() : 'ES'}
                            </button>

                            {session ? (
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm text-gray-700">
                                        {session.user?.name}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => signOut()}
                                    >
                                        <LogOut className="h-4 w-4 mr-1" />
                                        {t('auth.signOut')}
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-2">
                                    <Link href="/auth/register">
                                        <Button variant="outline" size="sm">
                                            Registro
                                        </Button>
                                    </Link>
                                    <Link href="/auth/signin">
                                        <Button variant="primary" size="sm">
                                            <LogIn className="h-4 w-4 mr-1" />
                                            {t('common.login')}
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
