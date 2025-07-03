import { Product } from '@/types';
import { create } from 'zustand'

interface BearState {
    favorites: Product[]
}

const useBearStore = create<BearState>()((set) => ({
    favorites: [],


    addToFavorites: (product: Product) => {
        set((state) => ({
            favorites: [...state.favorites, product]
        }))
    },
    removeFavorite: (id: number) => {
        set((state) => ({
            favorites: state.favorites.filter((fav) => fav.id === id)
        }))
    }


}))

export default useBearStore;