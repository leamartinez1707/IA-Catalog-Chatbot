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
            className="h-11 w-full rounded-full bg-slate-950 text-white shadow-lg shadow-slate-950/10 hover:bg-slate-800"
        >
            <ShoppingCart className="mr-2 h-4 w-4 text-white" />
            Add to Cart
        </Button>
    )
}

export default AddToCartButton