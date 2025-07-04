import { CartItem, Product } from '@/types';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

interface AppStore {
    favorites: Product[]
    cart: CartItem[]

    handleFavorite: (product: Product) => void

    addToCart: (product: Product) => void
    increaseQuantity: (product: CartItem) => void
    decreaseQuantity: (product: CartItem) => void
    removeFromCart: (product: Product) => void
    clearCart: () => void
}

const useAppStore = create<AppStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            cart: [],

            //Favorites
            handleFavorite: (product: Product) => {
                const favorites = useAppStore.getState().favorites
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


            addToCart: (product: Product) => {
                const cart = get().cart
                const isInCart = cart.find((prd) => prd.id === product.id)


                if (!isInCart) {
                    set((state) => ({
                        cart: [...state.cart, { ...product, quantity: 1 }]
                    }))
                } else {
                    isInCart.quantity++
                    set({ cart: [...get().cart] })
                }

            },
            increaseQuantity: (product: CartItem) => {
                const cart = get().cart
                const isInCart = cart.find((prd) => prd.id === product.id)
                if (!isInCart) return
                isInCart.quantity++
                set({ cart: [...get().cart] })
            },
            decreaseQuantity: (product: CartItem) => {
                const cart = get().cart
                const isInCart = cart.find((prd) => prd.id === product.id)
                if (!isInCart) return
                if (isInCart.quantity <= 1) {
                    set((state) => ({
                        cart: state.cart.filter((item) => item.id !== product.id)
                    }))
                    return
                }
                isInCart.quantity--
                set({ cart: [...get().cart] })
            },
            removeFromCart: (product: Product) => {
                const cart = get().cart
                const isInCart = cart.find((prd) => prd.id === product.id)
                if (!isInCart) return
                const updatedCart = cart.filter((item) => item.id !== product.id)
                set({ cart: updatedCart })
            },
            clearCart: () => set({ cart: [] })
        }), {
        name: 'smart-store',
        storage: createJSONStorage(() => localStorage)
    },
    ));

export default useAppStore;