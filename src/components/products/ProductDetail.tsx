'use client'

import { useProducts } from "@/hooks/products/useProducts"
import { formatCurrency } from "@/utils"
import Image from "next/image"
import { useParams } from "next/navigation"
import AddToCartButton from "../cart/AddToCartButton"
import { Star } from "lucide-react"
import SuggestedProducts from "./SuggestedProducts"

const ProductDetail = () => {

    const { id } = useParams()
    const { products } = useProducts()

    if (!products || products.length === 0) {
        return <div className="text-center text-gray-500">No products available</div>
    }

    const product = products.find((prd) => prd.id.toString() === id)
    if (!product) {
        return <div className="text-center text-red-500">Product not found</div>
    }
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="rounded bg-white shadow-xl lg:p-10 text-gray-800 relative text-left flex flex-col xl:flex-row items-center ">
                <Image
                    width={800}
                    height={800}
                    alt={product.name}
                    src={product?.image}
                    className="rounded-t-md" />
                <div className="flex flex-col justify-start w-full px-2 py-4 md:pl-10">
                    <span className="capitalize font-light">{product.category}</span>
                    <div className="mb-4">
                        <h2 className="font-bold uppercase text-4xl mb-2 w-full">{product.name}</h2>
                        <span className="flex items-center gap-x-1 font-bold mb-4">{product.rating}/5 <Star className="fill-yellow-300 text-yellow-400" /></span>
                    </div>

                    <div className="w-full flex flex-col sm:flex-row justify-between">
                        <div className="inline-block align-bottom">
                            <span className="font-bold text-3xl leading-none align-baseline">{formatCurrency(product.price).split('.')[0]}</span>
                            <span className="text-2xl leading-none align-baseline">.{formatCurrency(product.price).split('.')[1]}</span>
                        </div>
                        <AddToCartButton product={product} />
                    </div>
                    <div className="my-8">
                        <p className="text-lg font-semibold mb-4">{product.description}</p>
                        {product.features.split(',').map((feature, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8.586 12l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>{feature.trim()}</span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <SuggestedProducts category={product.category} id={product.id} />
        </div>
    )
}

export default ProductDetail