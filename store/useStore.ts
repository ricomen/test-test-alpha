import { create } from 'zustand'
import type { Product, StoreState } from '@/types'

const useStore = create<StoreState>((set) => ({
    products: [],
    isFetching: false,
    fetchUsers: async () => {
        set({ isFetching: true });
        try {
            const response = await fetch('https://api.squiggle.com.au/?q=teams');
            const data = await response.json().then(data => data.teams);
            set({ products: data, isFetching: false });
        } catch (error) {
            console.error('Error fetching users:', error);
            set({ isFetching: false });
        }
    },
    toggleBookmark: (id: Product['id']) => set((state: StoreState) => ({
        products: state.products.map(product => ({
            ...product,
            ...(product.id === id && { isBookmarked: !product.isBookmarked })
        }))
    })),
    addProduct: (product: Product) => set((state) => ({ products: [...state.products, product] })),
    removeProduct: (id: Product['id']) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),
    clearProducts: () => set({ products: [] }),
}))

export { useStore }