import FavoritesList from "@/components/favorites/FavoritesList"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'My Favorites | SmartShopAI',
    description: 'List of favorites added.'
}

const FavoritesPage = () => {
    return <FavoritesList />
}

export default FavoritesPage