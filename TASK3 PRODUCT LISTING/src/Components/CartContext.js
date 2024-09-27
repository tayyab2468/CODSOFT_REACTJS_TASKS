import React, { useContext, useState } from "react";

// Create the CartContext
const CartContext = React.createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component that provides the context value
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity, selectedSize) => {
    setCart(prevCart => [...prevCart, { ...product, quantity, selectedSize }]);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalAmount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
