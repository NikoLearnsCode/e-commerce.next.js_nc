import {notFound} from 'next/navigation';
import {getProductDetailsBySlug} from '@/actions/product';
import type {Metadata} from 'next';
import ProductPage from '@/components/products/product-detail/Product';
import {Product} from '@/lib/validators';

// Aktivera ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Uppdatera cachade sidor var 3600:e sekund (1 timme)
export const dynamicParams = true; // Tillåt rendering av nya paths som inte byggdes vid build-time

interface PageProps {
  params: Promise<{slug: string}>;
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const {product} = await getProductDetailsBySlug(slug);

  if (!product) {
    notFound();
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({params}: PageProps) {
  const {slug} = await params;
  const {product, categoryProducts, genderProducts} =
    await getProductDetailsBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductPage
      product={product}
      categoryProducts={categoryProducts}
      genderProducts={genderProducts}
    />
  );
}
