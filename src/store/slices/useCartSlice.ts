import { CartItem, Product } from '@/types';
import { StateCreator } from 'zustand'

export interface CartStore {
    cart: CartItem[]

    addToCart: (product: Product) => void
    increaseQuantity: (product: CartItem) => void
    decreaseQuantity: (product: CartItem) => void
    removeFromCart: (product: Product) => void
    clearCart: () => void
}

const createCartSlice: StateCreator<CartStore, [], [], CartStore> = (
    (set, get) => ({
        cart: [],

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
    })
);

export default createCartSlice;