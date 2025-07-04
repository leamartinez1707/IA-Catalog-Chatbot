'use client'

import useAppStore from '@/store'
import FavoritesItem from './FavoritesItem'

const FavoritesList = () => {
    const favorites = useAppStore((state) => state.favorites)
    return (
        <div className="h-screen bg-gray-100 pt-20">
            <h1 className="mb-10 text-center text-2xl font-bold">My Favorites</h1>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {favorites.map((prd) => (
                        <FavoritesItem key={prd.id} product={prd} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FavoritesList