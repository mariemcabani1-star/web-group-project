import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../state/CartContext'


export default function ShoppingCart(){
const [state, dispatch] = useCart()
const navigate = useNavigate()
const total = state.items.reduce((s,i)=>s + i.qty * i.product.price, 0)


function remove(id){ dispatch({ type: 'REMOVE', payload: id }) }
function updateQty(id, qty){ dispatch({ type: 'UPDATE_QTY', payload: { id, qty: Number(qty) } }) }


return (
<div>
<h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
{state.items.length === 0 ? (
<div>
<p>Your cart is empty.</p>
<Link to="/" className="text-green-700">Continue shopping</Link>
</div>
) : (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 space-y-4">
{state.items.map(i => (
<div key={i.product._id} className="flex items-center border rounded p-3">
<img src={i.product.image} alt={i.product.title} className="w-24 h-24 object-cover rounded mr-4" />
<div className="flex-1">
<div className="font-medium">{i.product.title}</div>
<div className="text-sm text-gray-600">${i.product.price.toFixed(2)} each</div>
</div>
<div className="flex items-center space-x-2">
<input type="number" value={i.qty} min={1} onChange={e=>updateQty(i.product._id, e.target.value)} className="w-16 border rounded p-1" />
<button onClick={()=>remove(i.product._id)} className="text-red-600">Remove</button>
</div>
</div>
))}
</div>


<div className="border rounded p-4">
<div className="font-semibold">Order summary</div>
<div className="mt-2">Total: <span className="font-bold">${total.toFixed(2)}</span></div>
<button onClick={()=>navigate('/checkout')} className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded">Checkout</button>
</div>
</div>
)}
</div>
)
}
