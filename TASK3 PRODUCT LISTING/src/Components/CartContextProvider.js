import React from "react";
import CartContext from "./CartContext"; // Ensure the path is correct

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = React.useState([]);

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
