'use server';

import {Product} from '@/lib/validators';
import {createClient} from '@/utils/supabase/server';

//Hämta alla produkter
export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();

  const {data, error} = await supabase
    .from('products')
    .select('*')
    .order('name');

  if (error) {
    console.error('Error fetching products', error);
    return [];
  }

  return data as Product[];
}

//Hämta en produkt med slug
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const supabase = await createClient();

  const {data, error} = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error);
    return null;
  }

  return data as Product;
}

//Hämta en produkt baserat på kategori (herr, dam),+(skor, kläder)
export async function getProductsByCategoryAndGender(
  category?: string,
  gender?: string,
  limit?: number
): Promise<Product[]> {
  const supabase = await createClient();

  // Specificera endast nödvändiga kolumner
  const selectColumns = 'id, slug, name, price, brand, color, images, sizes';

  let query = supabase.from('products').select(selectColumns); // Använd specificerade kolumner

  if (gender) {
    query = query.eq('gender', gender);
  }
  // console.log('query', gender);

  if (category) {
    query = query.eq('category', category);
  }

  // Lägg till limit om det finns
  if (limit && limit > 0) {
    query = query.limit(limit);
  }

  // console.log('query', category);
  const {data, error} = await query;

  // console.log('error', query);

  if (error) {
    console.error(`Error fetching products by category and gender:`, error);
    return [];
  }

  return data as Product[];
}

//Hämta produkter baserat på sökfråga
export async function searchProducts(query: string): Promise<Product[]> {
  const supabase = await createClient();

  try {
    if (!query || query.trim() === '') {
      return [];
    }
    const searchTerm = `%${query}%`;
    const {data, error} = await supabase
      .from('products')
      .select('*')
      .or(
        `name.ilike.${searchTerm},category.ilike.${searchTerm},gender.ilike.${searchTerm}`
      );

    if (error) {
      console.error('Error searching products:', error);
      return [];
    }

    return data as Product[];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}

// Ny funktion för att hämta alla produktdetaljer via RPC
export async function getProductDetailsBySlug(slug: string): Promise<{
  product: Product | null;
  categoryProducts: Product[];
  genderProducts: Product[];
}> {
  const supabase = await createClient();

  const {data, error} = await supabase.rpc('get_product_details', {
    product_slug: slug, // Namnet på argumentet i SQL-funktionen
  });

  if (error) {
    console.error(
      `Error calling RPC get_product_details for slug ${slug}:`,
      error
    );
    // Returnera ett tomt/null-state vid fel
    return {product: null, categoryProducts: [], genderProducts: []};
  }

  // Supabase RPC returnerar datan direkt i 'data'-fältet.
  // Vi antar att JSON-strukturen matchar det vi definierade i SQL.
  // Vi behöver kanske type assertion här om TS klagar, eller bättre validering.
  const result = data as {
    product: Product | null;
    categoryProducts: Product[];
    genderProducts: Product[];
  };

  // Säkerställ att arrayerna inte är null (om RPC mot förmodan skulle returnera det)
  return {
    product: result.product || null,
    categoryProducts: result.categoryProducts || [],
    genderProducts: result.genderProducts || [],
  };
}

// Paging och infinite scroll
export async function getProductsForInfiniteScroll(
  limit: number = 8,
  lastId: string | null = null,
  sort: string = 'id',
  order: 'asc' | 'desc' = 'asc'
): Promise<{products: Product[]; hasMore: boolean}> {
  const supabase = await createClient();

  let query = supabase
    .from('products')
    .select('*')
    .order(sort, {ascending: order === 'asc'})
    .limit(limit + 1); // Hämta en extra för att avgöra om det finns fler

  // Om vi har ett lastId, filtrera efter det
  if (lastId !== null) {
    // Använd > eller < beroende på sorteringsordning
    const operator = order === 'asc' ? 'gt' : 'lt';
    query = query.filter(sort, operator, lastId);
  }

  const {data, error} = await query;

  if (error) {
    console.error('Error fetching products for infinite scroll:', error);
    return {products: [], hasMore: false};
  }

  // Bestäm om det finns fler produkter
  const hasMore = data.length > limit;

  // Ta bort den extra produkten om vi hämtade fler än begärt
  const products = hasMore ? data.slice(0, limit) : data;

  return {products: products as Product[], hasMore};
}
