import React, { ReactNode, createContext, useState } from 'react';
import { comicProps } from '../types/comics';
interface ChildrenProps {
  children: ReactNode;
}

export const CartContext = createContext<any>({});

export const CartProvider: React.FC = ({ children }: ChildrenProps) => {
  const [cart, setCart] = useState<comicProps[]>([]);

  const addToCart = (item: comicProps) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter((item: comicProps) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.length;

  const totalValue = cart.map((item: comicProps) => item.prices).reduce((acc, curr) => {
    return acc + curr.reduce((acc2, curr2) => {
      return acc2 + curr2.price;
    }, 0);
  }, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalValue, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};