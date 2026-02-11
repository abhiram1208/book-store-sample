import { createContext, useContext, useState } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = book => {
    setCart(curr => {
      const existing = curr.find(i => i.id === book.id);
      if (existing) {
        return curr.map(i =>
          i.id === book.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...curr, { ...book, quantity: 1 }];
    });
  };
  const removeFromCart = id => {
    setCart(curr => curr.filter(i => i.id !== id));
  };
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(curr =>
      curr.map(i => (i.id === id ? { ...i, quantity } : i))
    );
  };
  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);