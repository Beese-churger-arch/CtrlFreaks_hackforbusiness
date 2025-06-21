import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductPage from './components/ProductPage';
import Cart from './components/Cart';
import SignUp from './components/SignUp';
import Home from './components/Home';
import SignIn from './components/SignIn';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/products')  // Fetch from backend API, not local JSON
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products from API');
        return res.json();
      })
      .then(data => {
        setProducts(data.products || []);
      })
      .catch(error => {
        console.error('Error loading products:', error);
      });
  }, []);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
  <>
    <Navbar cartCount={cart.length} products={products} />
    <Routes>
      <Route path="/" element={<Home addToCart={addToCart} products={products} />} />
      <Route path="/product/:id" element={<ProductPage products={products} addToCart={addToCart} />} />
       <Route path="/product/:id" element={<ProductPage products={products} addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
      <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
    <Footer />
  </>
);

  // return (
  //   <>
  //     <Navbar cartCount={cart.length} />
  //     <Routes>
  //       <Route path="/" element={<Home addToCart={addToCart} products={products} />} />
  //       <Route path="/product/:id" element={<ProductPage products={products} addToCart={addToCart} />} />
  //       <Route path="/cart" element={<Cart cart={cart} setCart={setCart} isLoggedIn={isLoggedIn} />} />
  //       <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
  //       <Route path="/signup" element={<SignUp />} />
  //       <Route path="*" element={<Navigate to="/" />} />
  //     </Routes>
  //     <Footer />
  //   </>
  // );
}

export default App;
