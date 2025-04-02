import {getProductsByCategoryAndGender} from '@/actions/product';
import Newsletter from '@/components/shared/Newsletter';
import ProductFilterWrapper from '@/components/products/product-grid/ProductFilterWrapper';
import {notFound} from 'next/navigation';
import {Metadata} from 'next';

interface GenderPageProps {
  params: Promise<{
    gender: string;
  }>;
}

async function getGenderProducts(gender: string) {
  const products = await getProductsByCategoryAndGender(undefined, gender);
  if (!products || products.length === 0) {
    notFound();
  }
  return products;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{gender: string}>;
}): Promise<Metadata> {
  const {gender} = await params;
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);

  return {
    title: capitalizedGender,
    description: `Utforska senaste stilar och trender för ${gender}.`,
  };
}

export default async function GenderPage({params}: GenderPageProps) {
  const {gender} = await params;
  const products = await getGenderProducts(gender);

  return (
    <div className='mx-auto'>
      <ProductFilterWrapper
        products={products}
        genderCategoryTitle={`Allt inom ${gender}`}
      />
      <Newsletter />
    </div>
  );
}
