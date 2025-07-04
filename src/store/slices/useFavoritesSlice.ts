import { Product } from '@/types';
import { StateCreator } from 'zustand'

export interface FavStore {
    favorites: Product[]
    handleFavorite: (product: Product) => void
}

const createFavoriteSlice: StateCreator<FavStore, [], [], FavStore> = (
    (set, get) => ({
        favorites: [],

        //Favorites
        handleFavorite: (product: Product) => {
            const favorites = get().favorites
            const isFavorite = favorites.find((fav) => fav.id === product.id)
            if (!isFavorite) {
                set((state) => ({
                    favorites: [...state.favorites, product]
                }))
            } else {
                set((state) => ({
                    favorites: state.favorites.filter((fav) => fav.id !== product.id)
                }))
            }
        },
    })
);

export default createFavoriteSlice;