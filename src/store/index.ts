import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import useCartSlice, { CartStore } from './slices/useCartSlice'
import useFavoriteSlice, { FavStore } from './slices/useFavoritesSlice'
import useGeneralSlice, { GeneralStore } from './slices/useGeneralSlice'

export const useAppStore = create<FavStore & CartStore & GeneralStore>()(
    persist(
        (...a) => ({
            ...useFavoriteSlice(...a),
            ...useCartSlice(...a),
            ...useGeneralSlice(...a),
        })
        , {
            name: 'shop-smart-storage',
            partialize: (state) => ({
                favorites: state.favorites,
                cart: state.cart,
            }),
        })
)