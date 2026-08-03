import React, { createContext, useContext, useEffect, useState } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  totalItems: number;
  total: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem('yakuza_cart') || '[]'); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem('yakuza_cart', JSON.stringify(items)); }, [items]);

  const addItem = (product: Product) => setItems(current => {
    const existing = current.find(item => item.product.id === product.id);
    if (existing) return current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
    return [...current, { product, quantity: 1 }];
  });
  const removeItem = (productId: string) => setItems(current => current.filter(item => item.product.id !== productId));
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return removeItem(productId);
    setItems(current => current.map(item => item.product.id === productId ? { ...item, quantity } : item));
  };
  return <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, totalItems: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe utilizarse dentro de CartProvider');
  return context;
};
