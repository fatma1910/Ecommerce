// CartContext.js (enhanced context setup)

'use client'
import { createContext, useState, useMemo } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Memoizing the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ cart, setCart, isCartOpen, setIsCartOpen }), [cart, isCartOpen]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
