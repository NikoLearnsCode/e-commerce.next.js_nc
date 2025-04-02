import {Metadata} from 'next';
// import {getProductsForInfiniteScroll} from '@/actions/product';
import Newsletter from '@/components/shared/Newsletter';
// import InfiniteScrollProducts from '@/components/products/product-grid/InfiniteProductGrid';
import Homepage from '@/components/Homepage';
export const metadata: Metadata = {
  title: 'Kläder för alla | NC',
  description:
    'Kläder för alla, från herr till dam. Vi erbjuder ett brett sortiment av kläder, skor och accessoarer.',
};

export default async function Page() {
  // const {products} = await getProductsForInfiniteScroll(8);

  return (
    <div className='w-full h-full'>
      <Homepage />
      <Newsletter />
    </div>
  );
}
