import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from './Spinner'; // Ensure Spinner component is correctly implemented

function ProductPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('');
    const [category, setCategory] = useState('');
    const [product, setproduct] = useState(null);
    const [cart, setcart] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('');
     
    
   
    useEffect(() => {
        // Fetch products from the API when the component mounts
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
                setLoading(false); // Set loading to false once products are fetched
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
                setLoading(false); // Set loading to false even if there is an error
            });
    }, []);

    // Handle sort selection change
    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const uniqueCategories = [...new Set(products.map(product => product.category))];

    // Sort products based on the selected sort order
    let sortedProducts = [...products];
    if (sortOrder === 'asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Filter products by selected category
    if (category) {
        sortedProducts = sortedProducts.filter(product => product.category === category);
    }

    // Handle add to cart logic
     const handleAddToCart = () => {
        if (product) {
            // Add product to the cart
            setcart((prevCart) => [...prevCart, { ...product, quantity, selectedSize }]);
            alert(`Product has been added: ${product.title}`); 
            <div class="alert alert-primary" role="alert"> (`Product has been added: ${product.title}`); 
            ${product.title}
</div>
        }
    };

    return (
        <div className="container">
            <h1>Welcome to Products Page</h1>

            {/* Sort by Price Select */}
            <select className="form-select mb-4" aria-label="Sort by Price" onChange={handleSortChange}>
                <option value="">Sort by Price</option>
                <option value="asc">Low to High</option>
                <option value="desc">High to Low</option>
            </select>

            {/* Filter by Category Select */}
            <select className="form-select mb-4" aria-label="Filter by Category" onChange={handleCategoryChange}>
                <option value="">All Categories</option>
                {uniqueCategories.map((category, index) => (
                    <option value={category} key={index}>{category}</option>
                ))}
            </select>

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner />
                </div>
            ) : (
                <div className="row">
                    {sortedProducts.map(product => (
                        <div className="col-md-4 col-sm-6 mb-4" key={product.id}>
                            <div className="card h-10 md-1">
                                <img className="card-img-top" src={product.image} alt={product.title} />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                                    </h5>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">${product.price}</p>
                                    <Link to={`/product/${product.id}`} className="btn btn-primary">Buy Now</Link>
                                    <button onClick={() => handleAddToCart(product)} className="btn btn-secondary ml-2">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductPage;
