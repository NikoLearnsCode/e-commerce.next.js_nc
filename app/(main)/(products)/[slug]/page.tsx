import {notFound} from 'next/navigation';
import {
  getProductBySlug,
  getProductsByCategoryAndGender,
} from '@/actions/product';
import type {Metadata} from 'next';
import ProductPage from '@/components/products/product-detail/Product';
import {Product} from '@/lib/validators';

interface PageProps {
  params: Promise<{slug: string}>;
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}

async function getProduct(slug: string) {
  const product = await getProductBySlug(slug);
  if (!product) {
    notFound();
  }
  return product;
}

async function getRelatedProducts(product: Product) {
  if (!product.category || !product.gender) {
    return {
      categoryProducts: [],
      genderProducts: [],
    };
  }

  const [categoryResults, genderResults] = await Promise.all([
    getProductsByCategoryAndGender(product.category, product.gender, 9),
    getProductsByCategoryAndGender(undefined, product.gender, 20),
  ]);

  const categoryProducts = categoryResults
    .filter((p) => p.id !== product.id)
    .slice(0, 8);

  const genderProducts = genderResults
    .filter((p) => p.id !== product.id)
    .filter((p) => p.category !== product.category)
    .slice(0, 8);

  return {
    categoryProducts,
    genderProducts,
  };
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const {slug} = await params;
  const product = await getProduct(slug);

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({params}: PageProps) {
  const {slug} = await params;
  const product = await getProduct(slug);
  const {categoryProducts, genderProducts} = await getRelatedProducts(product);

  return (
    <ProductPage
      product={product}
      categoryProducts={categoryProducts}
      genderProducts={genderProducts}
    />
  );
}
