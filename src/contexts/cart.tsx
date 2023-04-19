import React, { createContext, useState } from 'react';

export const CartContext = createContext<any>({});

export const CartProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item: any) => item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.map(item => item.prices).reduce((acc, curr) => {
    return acc + curr.reduce((acc2, curr2) => {
        return acc2 + curr2.price;
    }, 0);
}, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};