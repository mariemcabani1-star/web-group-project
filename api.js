const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'


async function request(path, opts = {}){
const res = await fetch(BASE + path, opts)
if(!res.ok) throw new Error(await res.text())
return res.json()
}


export const api = {
getProducts: () => request('/products'),
getProduct: (id) => request(`/products/${id}`),
createOrder: (payload, token) => request('/orders', { method: 'POST', headers: { 'Content-Type': 'application/json', ...(token?{ Authorization: `Bearer ${token}`}: {}) }, body: JSON.stringify(payload) }),
// auth endpoints omitted for brevity
}
