import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../state/CartContext'


export default function Header(){
const [state] = useCart()
const qty = state.items.reduce((s,i)=>s+i.qty,0)
return (
<header className="bg-green-700 text-white">
<div className="container mx-auto px-4 py-4 flex items-center justify-between">
<Link to="/" className="font-bold text-xl">EcoMart</Link>
<nav className="space-x-4">
<Link to="/" className="hover:underline">Shop</Link>
<Link to="/cart" className="hover:underline">Cart ({qty})</Link>
</nav>
</div>
</header>
)
}
