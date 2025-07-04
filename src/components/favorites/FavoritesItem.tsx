import { useAppStore } from "@/store"
import { Product } from "@/types"
import { X } from "lucide-react"
import Image from "next/image"
import { toast } from "sonner"

interface Props {
    product: Product
}

const FavoritesItem = ({ product }: Props) => {

    const removeFromFavorites = useAppStore((state) => state.handleFavorite)
    const handleRemoveFromFavorites = (product: Product) => {
        removeFromFavorites(product)
        toast.error(`${product.name} has been removed from your favorites!`)
    }
    return (
        <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <Image src={product.image ?? ''} alt="product-image"
                width={150}
                height={150}
                className="rounded-lg" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0 flex flex-col justify-center">
                    <h2 className="text-lg font-bold text-gray-900">{product.name}</h2>
                    <p className="mt-1 text-gray-700">{product.description}</p>
                    <p className="mt-2 text-xs text-gray-700">{product.features}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center space-x-4">
                        <p className="text-sm">${product.price}</p>
                        <X onClick={() => handleRemoveFromFavorites(product)} className="size-4 bg-red-500 text-white hover:text-red-100 rounded-full hover:cursor-pointer" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FavoritesItem