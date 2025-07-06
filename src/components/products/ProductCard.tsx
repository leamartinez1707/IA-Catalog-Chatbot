'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Star } from 'lucide-react'
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
    return (
        <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-transparent py-0">
            <CardHeader className="p-0 relative">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                    <Image
                        src={product.image ? product.image : '/broken-image.png'}
                        alt={product.name}
                        width={300}
                        height={300}
                        quality={100}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <FavoriteButton product={product} />
            </CardHeader>

            <CardContent className="p-4">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs capitalize">
                            {product.category}
                        </Badge>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{product.rating}</span>
                        </div>
                    </div>
                    <Link href={`/product/${product.id}`} className="hover:underline">
                        <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>

                    <div className="flex flex-wrap gap-1">
                        {product?.features?.split(',').map((feature, index) => (
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
                    <AddToCartButton product={product} />
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductCard