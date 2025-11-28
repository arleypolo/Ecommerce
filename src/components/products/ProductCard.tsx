import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-toastify';
import { Product } from '@/types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { t } = useTranslation('common');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} agregado al carrito`, {
      icon: '🛒',
    });
  };

  return (
    <Card hover className="flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price.toFixed(2)}
            </span>
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? t('products.inStock') : t('products.outOfStock')}
            </span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {t('products.addToCart')}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails?.(product.id)}
            >
              {t('products.viewDetails')}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
