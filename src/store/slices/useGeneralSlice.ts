import { StateCreator } from 'zustand'

export interface GeneralStore {
    showChat: boolean
    showCart: boolean
    searchQuery: string
    selectedCategory: string

    clearFilters: () => void
    setShowChat: (show: boolean) => void
    setShowCart: (show: boolean) => void
    setSearchQuery: (query: string) => void
    setSelectedCategory: (category: string) => void
}

const createGeneralSlice: StateCreator<GeneralStore, [], [], GeneralStore> = (
    (set,) => ({
        showChat: false,
        showCart: false,
        searchQuery: '',
        selectedCategory: 'All',


        setShowChat: (show: boolean) => set({ showChat: show }),
        setShowCart: (show: boolean) => set({ showCart: show }),
        setSearchQuery: (query: string) => set({ searchQuery: query }),
        setSelectedCategory: (category: string) => set({ selectedCategory: category }),
        clearFilters: () => set({ searchQuery: '', selectedCategory: 'All' })

    })
);

export default createGeneralSlice;