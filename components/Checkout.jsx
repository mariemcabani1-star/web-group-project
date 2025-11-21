import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../state/CartContext'
import { api } from '../services/api'


export default function Checkout(){
const [state, dispatch] = useCart()
const [loading, setLoading] = useState(false)
const [name, setName] = useState('')
const [address, setAddress] = useState('')
const navigate = useNavigate()


const total = state.items.reduce((s,i)=>s + i.qty * i.product.price, 0)


async function placeOrder(){
setLoading(true)
try{
const payload = {
items: state.items.map(i=>({ product: i.product._id, qty: i.qty })),
customer: { name, address },
total
}
await api.createOrder(payload)
dispatch({ type: 'CLEAR' })
navigate('/')
}catch(err){
console.error(err)
alert('Could not place order')
}finally{ setLoading(false) }
}


return (
<div className="max-w-xl mx-auto">
<h2 className="text-2xl font-semibold mb-4">Checkout</h2>
<div className="space-y-3">
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full border rounded px-3 py-2" />
<textarea value={address} onChange={e=>setAddress(e.target.value)} placeholder="Delivery address" className="w-full border rounded px-3 py-2" />
<div className="font-semibold">Total: ${total.toFixed(2)}</div>
<button onClick={placeOrder} disabled={loading || !name || !address} className="w-full px-4 py-2 bg-green-600 text-white rounded">{loading? 'Placing...' : 'Place order'}</button>
</div>
</div>
)
}
