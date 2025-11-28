import React from 'react';
import { useTranslation } from 'next-i18next';

const Footer: React.FC = () => {
    const { t } = useTranslation('common');

    return (
        <footer className="bg-gray-800 text-white mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold mb-4">E-Commerce</h3>
                        <p className="text-gray-400 text-sm">
                            Tu tienda en línea de confianza para productos de calidad.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">{t('common.contact')}</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li>Email: arleipolo15@gmail.com </li>
                            <li>Tel: +57 3128776199</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="/" className="hover:text-white transition-colors">{t('common.home')}</a></li>
                            <li><a href="/products" className="hover:text-white transition-colors">{t('common.products')}</a></li>
                            <li><a href="/contact" className="hover:text-white transition-colors">{t('common.contact')}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} E-Commerce. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
