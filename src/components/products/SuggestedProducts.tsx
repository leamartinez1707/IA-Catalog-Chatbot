'use client'
import React from 'react'
import ProductSuggested from './ProductSuggested'
import type { Product } from '@/types'
import { Sparkles } from 'lucide-react'

interface SuggestedProductsProps {
    category: string
    id: string
    products: Product[]
}

const SuggestedProducts = ({ category, id, products }: SuggestedProductsProps) => {
    const suggestedProducts = products.filter(
        (p) => p.category === category && p.id !== id
    ).slice(0, 3);

    if (suggestedProducts.length === 0) {
        return null;
    }

    return (
        <div className="mt-10 w-full md:mt-20">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                        <Sparkles className="h-3.5 w-3.5" />
                        More to explore
                    </div>
                    <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight text-slate-950">Similar products in this category</h2>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {suggestedProducts.map((product) => (
                    <ProductSuggested key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default SuggestedProducts