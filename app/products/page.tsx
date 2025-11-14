"use client"
import { useEffect, useState, useMemo } from 'react';
import type { IProduct } from '@/types';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/productCard';
import { Bookmark } from 'lucide-react';
import { useProducts, useIsLoading, useFetchProducts, useToggleBookmark, useRemoveProduct } from '@/store/useProductStore';

export default function Products() {
  const products = useProducts();
  const isLoading = useIsLoading();
  const fetchProducts = useFetchProducts();
  const toggleBookmark = useToggleBookmark();
  const removeProduct = useRemoveProduct();
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

  const filteredProducts = useMemo(() => {
    return isFiltered 
      ? products.filter((product: IProduct) => product.isBookmarked)
      : products;
  }, [products, isFiltered]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleFilteredProducts = () => setIsFiltered(prev => !prev)

  return (
    <main className="min-h-screen">

      <div className='flex items-center mb-4 space-x-2'>
        <h1 className="text-2xl font-bold">Продукты</h1>

        <Button
          onClick={toggleFilteredProducts}
          variant="outline"
          size="icon-lg"
        >
          <Bookmark fill={isFiltered ? 'black' : 'white'} />
        </Button>

      </div>

      <div className="grid grid-cols-3 gap-4">

        {isLoading ?
          <div>Loading...</div>
          :
          filteredProducts.map((product: IProduct) => (
            <ProductCard
              key={product.id}
              {...product}
              onToggleBookmark={toggleBookmark}
              onRemoveProduct={removeProduct}
            />
          ))}

      </div>

    </main >
  );
}
