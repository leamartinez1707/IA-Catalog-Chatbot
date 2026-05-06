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
            className="absolute right-3 top-3 h-9 w-9 rounded-full border border-white/30 bg-white/90 p-0 shadow-lg backdrop-blur transition-colors duration-200 hover:bg-slate-100"
            onClick={() => handleFavorite(product)}
        >
            <Heart
                className={`h-4 w-4 ${isFavorite ? 'fill-rose-500 text-rose-600' : 'fill-transparent text-slate-700'}`}
            />
        </Button>
    )
}

export default FavoriteButton