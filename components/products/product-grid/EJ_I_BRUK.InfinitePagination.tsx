'use client';
import {useState, useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {getProductsForInfiniteScroll} from '@/actions/product';
import {Product} from '@/lib/validators';
import ProductGrid from '@/components/products/product-grid/ProductGrid';
import SpinningLogo from '../../shared/SpinningLogo';

type InfiniteScrollProductsProps = {
  initialProducts: Product[];
  title?: string;
  className?: string;
};

export default function InfiniteScrollProducts({
  initialProducts,
  title,
  className,
}: InfiniteScrollProductsProps) {
  // Ändra typannotationen från number till string|null
  const [lastId, setLastId] = useState<string | null>(
    initialProducts.length > 0
      ? initialProducts[initialProducts.length - 1].id
      : null
  );

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const {ref, inView} = useInView({
    threshold: 0.1,
    rootMargin: '0px 0px 500px 0px',
    triggerOnce: false,
  });

  const loadMoreProducts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Uppdatera även här för att spegla ändringen i backend-funktionen
      const result = await getProductsForInfiniteScroll(8, lastId, 'id', 'asc');

      if (result.products.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...result.products]);
        setLastId(result.products[result.products.length - 1].id);
        setHasMore(result.hasMore);
      }
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inView) {
      loadMoreProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <>
      <ProductGrid products={products} className={className} />

      <div className='w-full'>
        {hasMore && (
          <div ref={ref} className='flex justify-center py-8'>
            {/* {loading ? <SpinningLogo /> : <div className='h-16'></div>} */}
            <div className='h-16'></div>
          </div>
        )}

        {/* {!hasMore && products.length > 0 && (
          <div className='text-center py-8 text-gray-500'>
            Inga fler produkter att visa
          </div>
        )} */}
      </div>
    </>
  );
}
