'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Heart, Star, ShoppingCart } from 'lucide-react'
import { Button } from '../ui/button'
import { Product } from '@/types'
import { Badge } from '../ui/badge'
import Image from 'next/image'

interface ProductCardProps {
    product: Product
    favorites: number[]
    toggleFavorite: (productId: number) => void
    onAddToCart: (product: Product) => void
}

const ProductCard = ({ product, favorites, toggleFavorite, onAddToCart }: ProductCardProps) => {
    return (
        <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-transparent">
            <CardHeader className="p-0 relative">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                >
                    <Heart
                        className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                </Button>
            </CardHeader>

            <CardContent className="p-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                            {product.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                    </div>

                    <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-1">
                        {product?.features?.slice(0, 2).map((feature, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                                {feature}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <div className="flex items-center justify-between w-full">
                    <span className="text-2xl font-bold text-blue-600">
                        ${product.price}
                    </span>
                    <Button
                        onClick={() => onAddToCart(product)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                        <ShoppingCart className="w-4 h-4 mr-2 text-white" />
                        Add to Cart
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductCard