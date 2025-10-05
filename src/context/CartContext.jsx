import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itemInCart, setItemInCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(itemInCart));
  }, [itemInCart]);
  const addToCart = (product) => {
    setItemInCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => {
    setItemInCart((prev) => prev.filter((item) => item.id !== id));
  };
  const clearCart = () => setItemInCart([]);
  return (
    <CartContext.Provider
      value={{ itemInCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
