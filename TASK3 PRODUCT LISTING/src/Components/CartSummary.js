// CartSummary.js
import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

function CartSummary() {
    const { cart, getTotalAmount } = useCart();
    const totalAmount = getTotalAmount();

    return (
        <div className="container mt-5">
            <h2>Cart Summary</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="list-group mb-3">
                        {cart.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                                <div>
                                    <h5>{item.title}</h5>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Size: {item.selectedSize}</p>
                                </div>
                                <span className="badge bg-primary rounded-pill">${item.price * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
                    <Link to="/checkout" className="btn btn-primary">Go to Checkout</Link>
                </div>
            )}
        </div>
    );
}

export default CartSummary;
