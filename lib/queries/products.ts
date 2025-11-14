import { useQuery } from '@tanstack/react-query'
import type { IProduct } from '@/types'

const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await fetch('https://dummyjson.com/products')
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  const data = await response.json()
  return data.products
}

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })
}

