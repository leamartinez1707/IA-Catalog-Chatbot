'use client'
import { useProducts } from '@/hooks/products/useProducts'
import React from 'react'
import ProductSuggested from './ProductSuggested'

const SuggestedProducts = ({ category, id }: { category: string, id: number }) => {
    const { products } = useProducts()
    if (!products || products.length === 0) {
        return <div className="text-center text-gray-500">No products available</div>
    }
    const suggestedProducts = products.filter(prds => prds.category === category && prds.id !== id);
    if (suggestedProducts.length === 0) {
        return <div className="text-center text-gray-500">No suggested products available for this category</div>
    }
    return (
        <div className="w-full md:mt-20 mt-10">
            <h2 className="text-2xl font-bold mb-6">Suggested Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mx-auto justify-center">
                {suggestedProducts.filter(prds => prds.category === category).slice(0, 3).map((product) => (
                    <ProductSuggested key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SuggestedProducts