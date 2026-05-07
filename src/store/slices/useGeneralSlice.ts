import { StateCreator } from 'zustand'

export interface GeneralStore {
    showChat: boolean
    showCart: boolean
    setShowChat: (show: boolean) => void
    setShowCart: (show: boolean) => void
}

const createGeneralSlice: StateCreator<GeneralStore, [], [], GeneralStore> = (
    (set) => ({
        showChat: false,
        showCart: false,
        setShowChat: (show: boolean) => set({ showChat: show }),
        setShowCart: (show: boolean) => set({ showCart: show }),
    })
);

export default createGeneralSlice;