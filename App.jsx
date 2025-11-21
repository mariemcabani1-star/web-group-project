import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import ShoppingCart from './components/ShoppingCart'
import Checkout from './components/Checkout'


export default function App(){
return (
<Router>
<div className="min-h-screen flex flex-col">
<Header />
<main className="flex-1 container mx-auto px-4 py-6">
<Routes>
<Route path="/" element={<ProductList />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="/cart" element={<ShoppingCart />} />
<Route path="/checkout" element={<Checkout />} />
</Routes>
</main>
<Footer />
</div>
</Router>
)
}


