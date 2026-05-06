'use client'
import { useProducts } from '@/hooks/products/useProducts'
import React from 'react'
import ProductSuggested from './ProductSuggested'
import { Sparkles } from 'lucide-react'

const SuggestedProducts = ({ category, id }: { category: string, id: string }) => {
    const { products, isLoading, error } = useProducts()
    if (isLoading) {
        return <div className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white px-6 py-12 text-center text-slate-500">Loading suggested products...</div>
    }
    if (error) {
        return <div className="mt-10 rounded-[1.75rem] border border-rose-200 bg-rose-50 px-6 py-12 text-center text-rose-600">Could not load suggested products.</div>
    }
    if (!products || products.length === 0) {
        return <div className="text-center text-gray-500">No products available</div>
    }
    const suggestedProducts = products.filter(prds => prds.category === category && prds.id !== id);
    if (suggestedProducts.length === 0) {
        return <div className="text-center text-gray-500">No suggested products available for this category</div>
    }
    return (
        <div className="mt-10 w-full md:mt-20">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        <Sparkles className="h-3.5 w-3.5" />
                        More to explore
                    </div>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Similar products in this category</h2>
                </div>
                <p className="max-w-xl text-sm leading-6 text-slate-500">Keep the browsing flow moving with related items that match the same product context.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {suggestedProducts.filter(prds => prds.category === category).slice(0, 3).map((product) => (
                    <ProductSuggested key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SuggestedProducts