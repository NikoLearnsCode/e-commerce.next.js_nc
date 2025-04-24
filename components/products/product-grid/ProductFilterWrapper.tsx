'use client';

import {useEffect, useState, useMemo, useCallback} from 'react';
import {Product} from '@/lib/validators';
import {useSearchParams, usePathname} from 'next/navigation';
import Link from 'next/link';
import {ChevronRight} from 'lucide-react';
import ProductGrid from '@/components/products/product-grid/ProductGrid';
import FilterBar from '@/components/products/product-grid/FilterBar';
import FilterPanel from '@/components/products/product-grid/FilterPanel';

interface ProductFilterWrapperProps {
  products: Product[];
  genderCategoryTitle?: string;
  emptyMessage?: string;
  className?: string;
}

export default function ProductFilterWrapper({
  products,
  genderCategoryTitle,
  emptyMessage = 'Inga produkter tillgängliga.',
  className = '',
}: ProductFilterWrapperProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const pathParts = pathname.split('/');

  const isGenderPage = pathParts.length === 3 && pathParts[1] === 'c';
  const isCategoryPage = pathParts.length === 4 && pathParts[1] === 'c';
  const currentGender = isGenderPage || isCategoryPage ? pathParts[2] : null;

  // Plockar fram unika kategorier
  const uniqueCategories = useMemo(() => {
    if (!isGenderPage) return [];
    const categoriesSet = new Set<string>();
    products.forEach((p) => p.category && categoriesSet.add(p.category));
    return Array.from(categoriesSet).sort();
  }, [products, isGenderPage]);

  /**
   * Hjälpfunktion som filtrerar och sorterar en lista produkter
   * utifrån färg, storlek och sorteringsordning.
   */
  const filterAndSortProducts = useCallback(
    ({
      productsToFilter,
      colors,
      sizes,
      sortOrder,
    }: {
      productsToFilter: Product[];
      colors?: string[];
      sizes?: string[];
      sortOrder?: string;
    }): Product[] => {
      let result = [...productsToFilter];

      if (colors && colors.length > 0) {
        result = result.filter(
          (product) => product.color && colors.includes(product.color)
        );
      }

      if (sizes && sizes.length > 0) {
        result = result.filter(
          (product) =>
            product.sizes && product.sizes.some((size) => sizes.includes(size))
        );
      }

      if (sortOrder) {
        switch (sortOrder) {
          case 'price_asc':
            result.sort((a, b) => a.price - b.price);
            break;
          case 'price_desc':
            result.sort((a, b) => b.price - a.price);
            break;
          case 'name_asc':
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }

      return result;
    },
    []
  );

  // Uppdaterar `filteredProducts` när URL-parametrar ändras.
  useEffect(() => {
    const colorParam = searchParams.get('color')?.split(',') || [];
    const sizeParam = searchParams.get('size')?.split(',') || [];
    const sortParam = searchParams.get('sort') || '';

    const nextFiltered = filterAndSortProducts({
      productsToFilter: products,
      colors: colorParam,
      sizes: sizeParam,
      sortOrder: sortParam,
    });

    setFilteredProducts(nextFiltered);
  }, [products, searchParams, filterAndSortProducts]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isFilterOpen ? 'hidden' : '';
  }, [isFilterOpen]);

  // Callback som anropas när FilterPanel ändrar filter.
  // const handleFilterChange = (data: {
  //   colors: string[];
  //   sizes: string[];
  //   sortOrder?: string;
  // }) => {
  //   const nextFiltered = filterAndSortProducts({
  //     productsToFilter: products,
  //     colors: data.colors,
  //     sizes: data.sizes,
  //     sortOrder: data.sortOrder,
  //   });

  //   setFilteredProducts(nextFiltered);
  // };

  return (
    <div className='relative'>
      {isCategoryPage && genderCategoryTitle && (
        <div className='flex text-sm   items-center flex-row px-6 sm:px-8 gap-2 pt-2 my-2'>
          <Link
            href={`/c/${currentGender}`}
            className='flex items-center uppercase gap-2  text-sm font-medium text-gray-500'
          >
            <span className=' hover:text-black '>{currentGender}</span>
          </Link>
          <ChevronRight size={13} className='text-gray-500' />
          <h2 className='text-sm font-medium  w-fit  uppercase '>
            {genderCategoryTitle === 'klanningar'
              ? 'klänningar'
              : genderCategoryTitle}
          </h2>
        </div>
      )}

      {isGenderPage && uniqueCategories.length > 0 && (
        <div className='px-6 sm:px-8  my-2 pt-2'>
          <div className='flex flex-wrap gap-4 uppercase font-medium'>
            <div className='text-black  text-sm'>allt</div>
            {uniqueCategories.map((category) => (
              <Link
                key={category}
                href={`${pathname}/${category}`}
                // searchParams.toString()
                //   ? `${pathname}/${category}?${searchParams.toString()}`
                //   : `${pathname}/${category}`
                // }
                className='text-sm  text-gray-500   w-fit font-medium hover:text-black'
              >
                {category === 'klanningar' ? 'klänningar' : category}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* --- Filterbar och filterpanel --- */}
      <FilterBar
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        isFilterOpen={isFilterOpen}
        products={filteredProducts}
      />
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        products={products}
        // onFilterChange={handleFilterChange}
      />

      {/* --- Produktgrid --- */}
      <div className='pt-2'>
        <ProductGrid
          products={filteredProducts}
          emptyMessage={emptyMessage}
          className={className}
        />
      </div>
    </div>
  );
}
