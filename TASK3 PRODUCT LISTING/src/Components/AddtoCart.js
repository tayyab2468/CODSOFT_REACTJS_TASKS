import React, { useContext } from 'react';
import CartContext from './CartContext';
import './AddtoCart.css';

function AddtoCart() {
    const { cart, setCart } = useContext(CartContext);

    // Remove item from cart
    const removeFromCart = (index) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    // Calculate the subtotal
    const calculateSubtotal = () => {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    // Optional: Add tax or shipping (change this as per your requirements)
    const taxRate = 0.07; // Example 7% tax rate
    const shippingCost = cart.length > 0 ? 10 : 0; // Flat shipping rate if items are present in cart
    const subtotal = calculateSubtotal();
    const tax = subtotal * taxRate;
    const finalTotal = subtotal + tax + shippingCost;

    return (
        <div className="container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.title} style={{ width: '100px' }} />
                            <div className="item-details">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                                <p>Price: ${item.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                                <button 
                                    className="btn btn-danger"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Subtotal, tax, and final total calculation */}
            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Tax (7%): ${tax.toFixed(2)}</p>
                    <p>Shipping: ${shippingCost.toFixed(2)}</p>
                    <h4>Total: ${finalTotal.toFixed(2)}</h4>
                </div>
            )}
        </div>
    );
}

export default AddtoCart;
