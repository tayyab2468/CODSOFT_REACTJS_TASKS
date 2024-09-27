import React, { useState, useEffect } from 'react';

const ProductaddPage = ({ addItem }) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [items, setItems] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation for letters and numbers
        const namePattern = /^[A-Za-z]+$/;  // Only letters
        const quantityPattern = /^[0-9]+$/;  // Only numbers

        if (!namePattern.test(name)) {
            alert("Product name should contain only letters.");
            return;
        }

        if (!quantityPattern.test(quantity)) {
            alert("Quantity should contain only numbers.");
            return;
        }

        // Create new item
        const newItem = { name, quantity, price };

        // Lift the state to parent component using addItem
        addItem(newItem);

        // Add the new item to the local state
        setItems([...items, newItem]);

        // Set formSubmitted to true to trigger the alert
        setFormSubmitted(true);

        // Clear the form after submission
        setName("");
        setQuantity("");
        setPrice("");
    };

    useEffect(() => {
        if (formSubmitted) {
            alert("Product added successfully!");
            // Reset formSubmitted to false to prevent repeated alerts
            setFormSubmitted(false);
        }
    }, [formSubmitted]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="productName">Enter Product Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Product Name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productQuantity">Enter Quantity</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productQuantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter Quantity"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="productPrice">Enter Price</label>
                    <input
                        type="text"
                        className="form-control"
                        id="productPrice"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Price"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {/* Display the list of products */}
            <h2 className="mt-5">Products</h2>
            {items.length === 0 ? (
                <p>No products recorded.</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <strong>{item.name}</strong> - {item.quantity} - ${item.price}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default ProductaddPage;
