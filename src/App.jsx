import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Product from './pages/product_page';
import Cart from './pages/cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
