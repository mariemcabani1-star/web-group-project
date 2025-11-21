import React from 'react'


export default function Footer(){
return (
<footer className="bg-gray-100 text-gray-700 mt-8">
<div className="container mx-auto px-4 py-6 text-center">
<p className="text-sm">© {new Date().getFullYear()} EcoMart — Sustainable products for a better tomorrow.</p>
</div>
</footer>
)
}
