"use client"
import { useStore } from '@/store/useStore';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/productCard';
import { Bookmark } from 'lucide-react';

export default function Products() {
  const {
    products,
    fetchUsers,
    toggleBookmark,
    isFetching,
    removeProduct
  } = useStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isFiltered, setIsFiltered] = useState<Boolean>(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
    setIsFiltered(false);
  }, [products]);

  const toggleFilteredProducts = () => {
    if (isFiltered) {
      setFilteredProducts(products);
      setIsFiltered(false);
    } else {
      setFilteredProducts(products.filter((product: Product) => product.isBookmarked));
      setIsFiltered(true);
    }
  }

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

        {isFetching ?
          <div>Loading...</div>
          :
          filteredProducts.map((product: Product) => (
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
