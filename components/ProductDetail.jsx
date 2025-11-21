import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useCart } from '../state/CartContext'


export default function ProductDetail(){
const { id } = useParams()
const [product, setProduct] = useState(null)
const [loading, setLoading] = useState(true)
const [, dispatch] = useCart()
const navigate = useNavigate()


useEffect(()=>{
let mounted = true
api.getProduct(id).then(d => { if(mounted) { setProduct(d); setLoading(false) } }).catch(()=>setLoading(false))
return ()=> mounted = false
}, [id])


if(loading) return <div>Loading...</div>
if(!product) return <div>Product not found</div>


function addToCart(){
dispatch({ type: 'ADD', payload: { product, qty: 1 } })
navigate('/cart')
}


return (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<img src={product.image} alt={product.title} className="w-full h-96 object-cover rounded" />
<div>
<h1 className="text-2xl font-bold">{product.title}</h1>
<p className="mt-3 text-gray-700">{product.description}</p>
<div className="mt-4 text-xl font-semibold">${product.price.toFixed(2)}</div>
<div className="mt-6">
<button onClick={addToCart} className="px-4 py-2 bg-green-600 text-white rounded">Add to cart</button>
<Link to="/" className="ml-4 text-sm text-gray-600">Continue shopping</Link>
</div>
</div>
</div>
)
}
