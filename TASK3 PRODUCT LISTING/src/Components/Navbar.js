import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const [title, setTitle] = useState("E-Commerce App");
   
    const [productPage, setProductPage] = useState('Product Page'); 
    const [checkoutPage, setCheckoutPage] = useState('Checkout Page'); 
    const [loginPage, setLoginPage] = useState('Login Page'); 
    const [dashboardPage, setDashboardPage] = useState('Dashboard Page'); 
    const [productAddPage, setProductAddPage] = useState('Product Add Page'); 
    const [AddtoCart,setAddtoCart] =useState('Add to Cart');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">{title}</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  
                    <li className="nav-item">
                        <Link className="nav-link" to="/ProductPage">{productPage}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/CheckoutPage">{checkoutPage}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/LoginPage">{loginPage}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/DashboardPage">{dashboardPage}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/ProductAddPage">{productAddPage}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/AddtoCart">{AddtoCart}</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    
                </form>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </div>
        </nav>
    );
}

export default Navbar;
