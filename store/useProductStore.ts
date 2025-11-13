import { create, StateCreator } from 'zustand'
import type { IProduct } from '@/types'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface IInitialState {
    products: IProduct[]
    isLoading: boolean
}

interface IProductActions {
    fetchProducts: () => Promise<void>
    toggleBookmark: (id: IProduct['id']) => void
    addProduct: (product: IProduct) => void
    removeProduct: (id: IProduct['id']) => void
}

interface IStoreState extends IInitialState, IProductActions { }

const initialState: IInitialState = {
    products: [],
    isLoading: false,
}

const counterStore: StateCreator<IStoreState, [["zustand/devtools", never], ["zustand/persist", unknown]]> = ((set) => ({
    ...initialState,
    toggleBookmark: (id: IProduct['id']) => set((state: IStoreState) => ({
        products: state.products.map(product => ({
            ...product,
            ...(product.id === id && { isBookmarked: !product.isBookmarked })
        }))
    }), false, 'toggleBookmark'),
    fetchProducts: async () => {
        set({ isLoading: true }, false, 'fetchProducts');
        try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json().then(data => data.products);
            set({ products: data, isLoading: false }, false, 'fetchProducts/success');
        } catch (error) {
            console.error('Error fetching products:', error);
            set({ products: [], isLoading: false }, false, 'fetchProducts/failed');
        } finally {
            set({ isLoading: false }, false, 'fetchProducts/finally');
        }
    },
    addProduct: (product: IProduct) => set((state: IStoreState) => ({ products: [...state.products, product] }), false, "addProduct"),
    removeProduct: (id: IProduct['id']) => set((state: IStoreState) => ({ products: state.products.filter((p) => p.id !== id) }), false, "removeProduct"),
}))

const useProductStore = create<IStoreState>()(
    devtools(
        persist(counterStore, {
            name: "products-storage",
            storage: createJSONStorage(() => localStorage)
        })
    )
)

export const useProducts = () => useProductStore(state => state.products)
export const useIsLoading = () => useProductStore(state => state.isLoading)
export const useFetchProducts = () => useProductStore(state => state.fetchProducts)
export const useToggleBookmark = () => useProductStore(state => state.toggleBookmark)
export const useRemoveProduct = () => useProductStore(state => state.removeProduct)
export const useAddProduct = () => useProductStore(state => state.addProduct)