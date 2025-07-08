import FavoritesList from "@/components/favorites/FavoritesList"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'My Favorites | SmartShopAI',
    description: 'List of favorites added.',
    keywords: 'favorites, wishlist, ecommerce, shopping, smartshopai',
}

const FavoritesPage = () => {
    return <FavoritesList />
}

export default FavoritesPage