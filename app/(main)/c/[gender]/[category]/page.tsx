import {getProductsByCategoryAndGender} from '@/actions/product';
import Newsletter from '@/components/shared/Newsletter';
import ProductFilterWrapper from '@/components/products/product-grid/ProductFilterWrapper';
import {notFound} from 'next/navigation';
import {Metadata} from 'next';

interface CategoryPageProps {
  params: Promise<{
    gender: string;
    category: string;
  }>;
}

async function getCategoryProducts(category: string, gender: string) {
  const products = await getProductsByCategoryAndGender(category, gender);
  if (!products || products.length === 0) {
    notFound();
  }
  return products;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{gender: string; category: string}>;
}): Promise<Metadata> {
  const {gender, category} = await params;
  const capitalizedGender = gender.charAt(0).toUpperCase() + gender.slice(1);
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  // We don't need to fetch products for metadata in this case
  return {
    title: `${capitalizedGender} - ${capitalizedCategory} `,
    description: `Utforska senaste ${category} stilar och trender för ${gender}.`,
  };
}

export default async function CategoryPage({params}: CategoryPageProps) {
  const {gender, category} = await params;
  const products = await getCategoryProducts(category, gender);

  return (
    <div className='mx-auto px-0  bg-white z-10'>
      <ProductFilterWrapper
        products={products}
        genderCategoryTitle={`${category}`}
      />
      <Newsletter />
    </div>
  );
}
