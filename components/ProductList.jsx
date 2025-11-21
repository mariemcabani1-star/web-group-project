import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../services/api'


export default function ProductList(){
const [products, setProducts] = useState([])
const [loading, setLoading] = useState(true)
const [q, setQ] = useState('')


useEffect(()=>{
let mounted = true
api.getProducts().then(data=>{ if(mounted){ setProducts(data); setLoading(false) } }).catch(()=>setLoading(false))
return ()=> mounted = false
}, [])


const filtered = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()) )


if(loading) return <div>Loading...</div>


return (
<div>
<div className="flex items-center justify-between mb-4">
<h1 className="text-2xl font-semibold">Products</h1>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." className="border rounded px-3 py-1" />
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
{filtered.map(p => (
<div key={p._id} className="border rounded p-4 flex flex-col">
<img src={p.image} alt={p.title} className="h-40 object-cover mb-3 rounded" />
<h3 className="font-semibold">{p.title}</h3>
<p className="text-sm text-gray-600 flex-1">{p.description?.slice(0,120)}</p>
<div className="mt-3 flex items-center justify-between">
<div className="font-bold">${p.price.toFixed(2)}</div>
<Link to={`/products/${p._id`} className="text-green-700 font-medium">View</Link>
</div>
</div>
))}
</div>
</div>
)
}
