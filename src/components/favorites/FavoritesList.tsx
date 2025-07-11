'use client'

import { useAppStore } from '@/store'
import FavoritesItem from './FavoritesItem'
import PageTitle from '../titles/PageTitle'
import LinkToHomeButton from '../ui/LinkToHomeButton'

const FavoritesList = () => {
    const favorites = useAppStore((state) => state.favorites)
    return (
        <div className="min-h-screen h-auto bg-gray-100 py-8">
            <PageTitle>
                Favorites
            </PageTitle>
            <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                <div className="rounded-lg md:w-2/3">
                    {favorites.map((prd) => (
                        <FavoritesItem key={prd.id} product={prd} />
                    ))}
                    {favorites.length === 0 && (
                        <div className='flex flex-col items-center justify-center gap-y-10'>
                            <div className="text-center text-gray-500">
                                No favorites added yet.
                            </div>
                            <LinkToHomeButton
                                href='/'
                                text='Go back to shopping'
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FavoritesList