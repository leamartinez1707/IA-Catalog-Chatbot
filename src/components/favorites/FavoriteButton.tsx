import { Button } from '../ui/button'
import { Heart } from 'lucide-react'
import { useAppStore } from '@/store'
import { Product } from '@/types'
import { toast } from 'sonner'

const FavoriteButton = ({ product }: { product: Product }) => {
    const favorites = useAppStore((state) => state.favorites)
    const removeFromFavorites = useAppStore((state) => state.handleFavorite)
    const isFavorite = favorites.some((prd) => prd.id === product.id)
    const handleFavorite = (product: Product) => {
        removeFromFavorites(product)
        if (!isFavorite) {
            toast.success(`${product.name} has been added to your favorites!`)
        } else {
            toast.error(`${product.name} has been removed from your favorites!`)
        }
    }
    return (
        <Button
            size="sm"
            className="absolute top-2 right-2 bg-white hover:bg-gray-200 rounded-full p-1 shadow-md transition-colors duration-200"
            onClick={() => handleFavorite(product)}
        >
            <Heart
                className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-600 hover:fill-white duration-200 transition-colors hover:text-white' : 'text-red-600 fill-white'}`}
            />
        </Button>
    )
}

export default FavoriteButton