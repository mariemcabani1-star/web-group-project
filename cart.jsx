import React, { createContext, useContext, useReducer, useEffect } from 'react'


const CartStateContext = createContext()
const CartDispatchContext = createContext()


const initialState = {
items: [], // {product, qty}
}


function cartReducer(state, action){
switch(action.type){
case 'HYDRATE':
return { ...state, ...action.payload }
case 'ADD': {
const { product, qty = 1 } = action.payload
const idx = state.items.findIndex(i => i.product._id === product._id)
if(idx >= 0){
const items = [...state.items]
items[idx] = { ...items[idx], qty: items[idx].qty + qty }
return { ...state, items }
}
return { ...state, items: [...state.items, { product, qty }] }
}
case 'REMOVE':
return { ...state, items: state.items.filter(i => i.product._id !== action.payload) }
case 'UPDATE_QTY': {
const { id, qty } = action.payload
return { ...state, items: state.items.map(i => i.product._id === id ? { ...i, qty } : i) }
}
case 'CLEAR':
return { ...state, items: [] }
default:
throw new Error('Unknown action ' + action.type)
}
}


export function CartProvider({ children }){
const [state, dispatch] = useReducer(cartReducer, initialState)


useEffect(() => {
try{
const raw = localStorage.getItem('ecocart')
if(raw) dispatch({ type: 'HYDRATE', payload: JSON.parse(raw) })
}catch(e){}
}, [])


useEffect(() => {
localStorage.setItem('ecocart', JSON.stringify(state))
}, [state])


return (
<CartDispatchContext.Provider value={dispatch}>
<CartStateContext.Provider value={state}>
{children}
</CartStateContext.Provider>
</CartDispatchContext.Provider>
)
}


export function useCart(){
return [useContext(CartStateContext), useContext(CartDispatchContext)]
}
