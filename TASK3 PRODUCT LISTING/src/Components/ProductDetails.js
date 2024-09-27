import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import './Productdetails.css';
import CartContext from './CartContext';
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
function ProductDetailPage() {
    // Always call hooks at the top level
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
    const { id } = useParams(); // Get the product ID from the URL
    const { cart, setCart } = React.useContext(CartContext); // Use context hook here
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth0();

    // Fetch product details on mount
    useEffect(() => {
        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    // Handler functions
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1)); // Ensures quantity doesn't go below 1
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };
    const handleBuyNow = () => {
        if (!isAuthenticated) {
          alert('Please log in to proceed');
          navigate('/LoginPage');  // Redirect to login if not authenticated
        } else {
          navigate('/CheckoutPage');  // Proceed to checkout if authenticated
        }
      };
    const handleAddToCart = () => {
        if (product) {
            // Add product to the cart
            setCart((prevCart) => [...prevCart, { ...product, quantity, selectedSize }]);
            alert(`Product has been added: ${product.title}`); 
            <div class="alert alert-primary" role="alert"> (`Product has been added: ${product.title}`); 
            ${product.title}
</div>
        }
        
    };
   

    // Return early if product is not loaded yet
    if (!product) {
        return <div>Loading...</div>;
    }

    const isOutOfStock = product.stock <= 0;

    return (
        <div className="container">
            {/* Breadcrumb Navigation */}
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">{product.category}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                </ol>
            </nav>

            <div className="row">
                {/* Product Image with Zoom */}
                <div className="col-md-4">
                    <Zoom>
                        <img src={product.image} alt={product.title} className="img-fluid" />
                    </Zoom>
                </div>

                {/* Product Details */}
                <div className="col-md-6">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <p><strong>{isOutOfStock ? 'Out of Stock' : `Stock: ${product.stock}`}</strong></p>
                    <h3>${product.price}</h3>

                    {/* Size Selector (Only show for clothing items) */}
                    {product.category === "men's clothing" || product.category === "women's clothing" ? (
                        <div className="mb-3">
                            <label className="form-label">Select Size:</label>
                            <div className="d-flex">
                                {['S', 'M', 'L', 'XL'].map(size => (
                                    <button 
                                        key={size}
                                        className={`btn btn-outline-secondary mx-1 ${selectedSize === size ? 'btn-primary' : ''}`}
                                        onClick={() => handleSizeClick(size)}
                                        style={{ minWidth: '50px' }} // Make the buttons small and responsive
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : null}

                    {/* Quantity Selector */}
                    <div className="d-flex align-items-center mb-3">
                        <button className="btn btn-outline-secondary" onClick={decreaseQuantity}>-</button>
                        <input type="text" className="form-control text-center mx-2" value={quantity} readOnly />
                        <button className="btn btn-outline-secondary" onClick={increaseQuantity}>+</button>
                    </div>

                    {/* Add to Cart Button */}
                    <button onClick={handleAddToCart} className="btn btn-warning btn-lg">Add to Cart</button>
                    <button  onClick={handleBuyNow}className="btn btn-warning btn-lg my-2">Buy Now</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
