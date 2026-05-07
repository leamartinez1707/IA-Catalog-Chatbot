import FavoritesList from "@/components/favorites/FavoritesList"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Favorites | ShopSmart AI',
    description: 'Review saved products and jump back into the buying flow when you are ready.',
    keywords: 'favorites, wishlist, ecommerce, shopping, ShopSmart AI',
}

const FavoritesPage = () => {
    return <FavoritesList />
}

export default FavoritesPage