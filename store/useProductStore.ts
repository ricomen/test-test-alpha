import { create, StateCreator } from 'zustand'
import type { IProduct } from '@/types'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

interface IInitialState {
  products: IProduct[]
}

interface IProductActions {
  toggleBookmark: (id: IProduct['id']) => void
  addProduct: (product: IProduct) => void
  removeProduct: (id: IProduct['id']) => void
  getProduct: (id: IProduct['id']) => IProduct | undefined
  setProducts: (products: IProduct[]) => void
}

interface IStoreState extends IInitialState, IProductActions {}

const initialState: IInitialState = {
  products: [],
}

const counterStore: StateCreator<
  IStoreState,
  [['zustand/devtools', never], ['zustand/persist', unknown]]
> = (set, get) => ({
  ...initialState,
  toggleBookmark: (id: IProduct['id']) =>
    set(
      (state: IStoreState) => ({
        products: state.products.map((product) => ({
          ...product,
          ...(product.id === id && { isBookmarked: !product.isBookmarked }),
        })),
      }),
      false,
      'toggleBookmark'
    ),
  addProduct: (product: IProduct) =>
    set(
      (state: IStoreState) => ({ products: [...state.products, product] }),
      false,
      'addProduct'
    ),
  removeProduct: (id: IProduct['id']) =>
    set(
      (state: IStoreState) => ({
        products: state.products.filter((p) => p.id !== id),
      }),
      false,
      'removeProduct'
    ),
  getProduct: (id: IProduct['id']) => {
    const state = get()
    return state.products.find((p) => p.id === Number(id))
  },
  setProducts: (products: IProduct[]) => set(
    () => ({ products: [ ...products] }),
    false,
    'setProducts'
  ),
})

const useProductStore = create<IStoreState>()(
  devtools(
    persist(counterStore, {
      name: 'products-storage',
      storage: createJSONStorage(() => localStorage),
    })
  )
)

export const useProducts = () => useProductStore(state => state.products)
export const useToggleBookmark = () => useProductStore(state => state.toggleBookmark)
export const useRemoveProduct = () => useProductStore(state => state.removeProduct)
export const useAddProduct = () => useProductStore(state => state.addProduct)
export const useGetProduct = (id: IProduct['id']) => useProductStore(state => state.getProduct(id))
export const useSetProducts = () => useProductStore(state => state.setProducts)