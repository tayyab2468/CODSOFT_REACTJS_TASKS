import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './Components/LoginPage';
import ProductPage from './Components/ProductPage';
import ProductaddPage from './Components/ProductaddPage';
import CheckoutPage from './Components/CheckoutPage';
import ProductDetails from './Components/ProductDetails';
import AddtoCart from './Components/AddtoCart';
 import CartContextProvider from './Components/CartContextProvider';
import { useState } from 'react';
import CartSummary from './Components/CartSummary';
function App() {
  const [Product,setProduct] =useState("");
  // Function to add an item to the inventory
const addItem = (item) => {
  setProduct([...Product, Product]);
};
  return (
    
    <BrowserRouter>
      <CartContextProvider>
        <Navbar />
        <Routes>
         
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/CheckoutPage" element={<CheckoutPage />} />
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/ProductaddPage" element={<ProductaddPage addItem={addItem} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/AddtoCart" element={<AddtoCart />} />
          <Route path="/cart" element={<CartSummary />} />
        </Routes>
      </CartContextProvider>
    </BrowserRouter>
    
  );
}

export default App;
