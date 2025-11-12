export interface Product {
    id: string
    name: string
    price: number
    debut: number
    isBookmarked?: boolean
}

export interface ProductCardProps extends Product {
    onToggleBookmark: (id: Product['id']) => void
    onRemoveProduct: (id: Product['id']) => void
}

export interface StoreState {
    products: Product[]
    isFetching: boolean
    fetchUsers: () => Promise<void>
    toggleBookmark: (id: Product['id']) => void
    addProduct: (product: Product) => void
    removeProduct: (id: Product['id']) => void
    clearProducts: () => void
}

