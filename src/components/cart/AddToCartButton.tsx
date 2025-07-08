import { useAppStore } from '@/store'
import { Product } from '@/types'
import React from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ShoppingCart } from 'lucide-react'

const AddToCartButton = ({ product }: { product: Product }) => {

    const addToCart = useAppStore((state) => state.addToCart)

    const handleAddToCart = (product: Product) => {
        addToCart(product)
        toast.success(`${product.name} has been added to your cart!`)
    }
    return (
        <Button
            onClick={() => handleAddToCart(product)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
        >
            <ShoppingCart className="w-4 h-4 mr-2 text-white" />
            Add to Cart
        </Button>
    )
}

export default AddToCartButton