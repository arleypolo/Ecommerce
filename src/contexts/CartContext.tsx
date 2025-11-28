import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { CartItem } from '@/types';
import { getCart, addToCart as addToCartLib, removeFromCart as removeFromCartLib, updateQuantity as updateQuantityLib, clearCart as clearCartLib, getCartTotal, getCartCount } from '@/lib/cart';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTimestamp, setCartTimestamp] = useState<number | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setCart(getCart());
    const timestamp = localStorage.getItem('cart_timestamp');
    if (timestamp) {
      setCartTimestamp(parseInt(timestamp));
    }
  }, []);

  useEffect(() => {
    if (cart.length === 0) return;

    // Guardar timestamp cuando se agrega el primer item
    if (!cartTimestamp) {
      const now = Date.now();
      setCartTimestamp(now);
      localStorage.setItem('cart_timestamp', now.toString());
    }

    // Verificar si ha pasado 1 minuto y enviar email
    const checkCartTimer = setInterval(() => {
      const savedTimestamp = localStorage.getItem('cart_timestamp');
      if (savedTimestamp && session?.user?.email) {
        const elapsed = Date.now() - parseInt(savedTimestamp);
        const oneMinute = 60 * 1000; // 1 minuto en milisegundos

        if (elapsed >= oneMinute && cart.length > 0) {
          // Enviar email de recordatorio
          fetch('/api/cart/reminder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: session.user.email,
              name: session.user.name || 'Cliente',
              cart: cart,
            }),
          }).then(() => {
            // Resetear el timestamp después de enviar
            localStorage.removeItem('cart_timestamp');
            setCartTimestamp(null);
          });
        }
      }
    }, 10000); // Verificar cada 10 segundos

    return () => clearInterval(checkCartTimer);
  }, [cart, cartTimestamp, session]);

  const addToCart = (product: CartItem) => {
    const newCart = addToCartLib(product);
    setCart(newCart);
  };

  const removeFromCart = (productId: string) => {
    const newCart = removeFromCartLib(productId);
    setCart(newCart);
    if (newCart.length === 0) {
      localStorage.removeItem('cart_timestamp');
      setCartTimestamp(null);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    const newCart = updateQuantityLib(productId, quantity);
    setCart(newCart);
    if (newCart.length === 0) {
      localStorage.removeItem('cart_timestamp');
      setCartTimestamp(null);
    }
  };

  const clearCart = () => {
    clearCartLib();
    setCart([]);
    localStorage.removeItem('cart_timestamp');
    setCartTimestamp(null);
  };

  const cartTotal = getCartTotal(cart);
  const cartCount = getCartCount(cart);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
