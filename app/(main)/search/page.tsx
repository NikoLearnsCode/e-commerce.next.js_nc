import {Suspense} from 'react';
import type {Metadata} from 'next';
import {searchProducts} from '@/actions/product';
import ProductGrid from '@/components/products/product-grid/ProductGrid';
import SpinningLogo from '@/components/shared/SpinningLogo';

type Props = {
  params: Promise<{}>;
  searchParams: Promise<{q?: string}>;
};

// Generera metadata dynamiskt baserat på sökfrågan
export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  return {
    title: query ? `Sökresultat för "${query}" | NC` : 'Sök produkter | NC',
    description: query
      ? `Se våra produkter som matchar "${query}"`
      : 'Sök bland vårt sortiment av produkter',
  };
}

// Enkel laddningskomponent
function SearchLoading() {
  return (
    <div className='flex items-center justify-center min-h-[calc(100vh-400px)]'>
      <SpinningLogo />
    </div>
  );
}

export default async function SearchPage({searchParams}: Props) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';

  const products = query ? await searchProducts(query) : [];

  return (
    <div className='w-full flex justify-center py-4 '>
      <div className='w-full'>
        <Suspense fallback={<SearchLoading />}>
          <div className='w-full'>
            <h2 className='text-base md:text-lg  uppercase font-medium px-6 sm:px-8 pt-2 pb-7 '>
              {products.length > 0 && (
                <>
                  Sökresultat för "{query}"
                  <span className='ml-2'>({products.length})</span>
                </>
              )}
            </h2>

            {products.length > 0 ? (
              <ProductGrid
                products={products}
                title={`Sökresultat för "${query}"`}
              />
            ) : (
              <div className='flex items-center justify-center min-h-[calc(100vh-400px)]'>
                <div className='text-center'>
                  {query ? (
                    <p className='px-10 text-base md:text-lg text-gray-600 font-medium'>
                      Inga produkter hittades för "{query}". Prova med andra
                      sökord.
                    </p>
                  ) : (
                    <p className='text-gray-600'>
                      Ange ett sökord för att hitta produkter.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
