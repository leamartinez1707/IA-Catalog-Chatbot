'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { ArrowRight, Star } from 'lucide-react'
import { Product } from '@/types'
import { Badge } from '../ui/badge'
import Image from 'next/image'
import AddToCartButton from '../cart/AddToCartButton'
import FavoriteButton from '../favorites/FavoriteButton'
import Link from 'next/link'

interface ProductCardProps {
    product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
    const features = product?.features?.split(',').map((feature) => feature.trim()).filter(Boolean).slice(0, 3) ?? []

    return (
        <Card key={product.id} className="group overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white py-0 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(15,23,42,0.4)]">
            <CardHeader className="p-0 relative">
                <div className="relative aspect-[1/1.02] overflow-hidden">
                    <Image
                        src={product.image ? product.image : '/broken-image.png'}
                        alt={product.name}
                        width={300}
                        height={300}
                        quality={100}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/45 to-transparent" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/92 px-3 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        {product.rating}
                    </div>
                </div>
                <FavoriteButton product={product} />
            </CardHeader>

            <CardContent className="p-5">
                <div className="space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <Badge variant="secondary" className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 capitalize">
                            {product.category}
                        </Badge>
                        <span className="text-xs font-medium text-slate-400">AI-friendly pick</span>
                    </div>
                    <Link href={`/product/${product.id}`} className="block transition-opacity hover:opacity-80">
                        <h3 className="text-xl font-semibold tracking-tight text-slate-950 line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-sm leading-6 text-slate-600 line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-2">
                        {features.map((feature, index) => (
                            <Badge key={index} variant="outline" className="rounded-full border-slate-200 px-3 py-1 text-[11px] text-slate-600">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-5 pt-0">
                <div className="w-full space-y-4 border-t border-slate-100 pt-4">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Price</p>
                            <span className="text-3xl font-semibold tracking-tight text-slate-950">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>
                        <Link href={`/product/${product.id}`} className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-slate-950">
                            View details
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <AddToCartButton product={product} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductCard