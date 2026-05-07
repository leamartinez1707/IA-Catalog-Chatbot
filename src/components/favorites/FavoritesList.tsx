'use client'

import { useAppStore } from '@/store'
import FavoritesItem from './FavoritesItem'
import PageTitle from '../titles/PageTitle'
import LinkToHomeButton from '../ui/LinkToHomeButton'

const FavoritesList = () => {
    const favorites = useAppStore((state) => state.favorites)
    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.25)] sm:p-8">
                    <PageTitle>
                        Favorites
                    </PageTitle>
                    <p className="mt-3 text-sm leading-6 text-slate-500">Keep a shortlist of products worth revisiting, then jump back into the purchase flow when you are ready.</p>
                </div>
                <div className="mx-auto max-w-5xl">
                    {favorites.map((prd) => (
                        <FavoritesItem key={prd.id} product={prd} />
                    ))}
                    {favorites.length === 0 && (
                        <div className='flex flex-col items-center justify-center gap-y-8 rounded-[2rem] border border-dashed border-slate-300 bg-white px-6 py-16 text-center'>
                            <div className="text-slate-500">
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