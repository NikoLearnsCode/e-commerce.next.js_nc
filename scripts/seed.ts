// Ladda miljövariabler från .env.local
import * as dotenv from 'dotenv';
dotenv.config({path: '.env.local'});

import {createClient} from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Supabase URL och service role key måste anges i .env.local');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const baseProducts = [
  // HERRKLÄDER
  // Byxor
  {
    name: 'Klassiska Chinos',
    description:
      'Stilrena chinos i stretchigt material för optimal komfort. Passar både till vardags och finare tillfällen.',
    price: 899,
    brand: 'Herjano',
    gender: 'herr',
    color: 'black',
    slug: 'klassiska-chinos',
    category: 'byxor',
    specs: [
      'Normal passform',
      'Material: 100% bomull',
      'Maskintvätt högst 30°C',
      'Tål strykning',
    ],
    images: [
      '/images/herr/byxor/byxor-herr1.webp',
      '/images/herr/byxor/byxor-herr2.webp',
      '/images/herr/byxor/byxor-herr3.webp',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  // Jackor
  {
    name: 'Elegant Rock',
    description:
      'Stilsäker rock i klassisk passform med lätt urtvättad look för en vintage känsla.',
    price: 2199,
    brand: 'Manjano',
    gender: 'herr',
    color: 'navy',
    slug: 'elegant-rock',
    category: 'jackor',
    specs: [
      'Normal passform',
      'Material: 80% bomull, 19% polyester, 1% elastan',
      'Maskintvätt högst 30°C',
      'Tål ej strykning',
    ],
    images: [
      '/images/herr/jackor/rock1.webp',
      '/images/herr/jackor/rock2.webp',
    ],
    sizes: ['44', '46', '48', '50', '52'],
  },
  // Overshirt
  {
    name: 'Flanell Overshirt',
    description:
      'Mjuk och varm flanellskjorta i robust kvalitet. Perfekt som ett extra lager under kyligare dagar.',
    price: 1799,
    brand: 'Trekano',
    gender: 'herr',
    color: 'brown',
    slug: 'flanell-overshirt',
    category: 'overshirt',
    specs: [
      'Normal passform',
      'Material: 100% bomull',
      'Maskintvätt högst 30°C',
      'Tål ej strykning',
    ],
    images: [
      '/images/herr/overshirt/overshirt2.webp',
      '/images/herr/overshirt/overshirt1.webp',
    ],
    sizes: ['44', '46', '48', '50', '52', '54'],
  },
  // T-shirt
  {
    name: 'Essential T-shirt',
    description:
      'Minimalistisk t-shirt i 100% ekologisk bomull. En garderobsbasic som passar till allt.',
    price: 599,
    brand: 'Waikiki',
    gender: 'herr',
    color: 'navy',
    slug: 'essential-tshirt',
    category: 't-shirts',
    specs: [
      'Normal passform',
      'Material: 100% ekologisk bomull',
      'Maskintvätt högst 40°C',
      'Använd ej blekmedel',
      'Tål strykning',
      'Tål ej kemtvätt',
    ],
    images: [
      '/images/herr/tshirt/tshirt-herr3.webp',
      '/images/herr/tshirt/tshirt-herr2.webp',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  // DAMKLÄDER
  // Byxor
  {
    name: 'High Waist Pants',
    description:
      'Högmidjade byxor med perfekt passform och stretch för maximal komfort. Smickrande siluett för alla kroppstyper.',
    price: 1999,
    brand: 'Saiki',
    gender: 'dam',
    color: 'navy',
    slug: 'high-waist-pants',
    category: 'byxor',
    specs: [
      'Normal passform',
      'Rakt ben',
      'Hög midja',
      'Material: 64% polyester, 31% viskos, 5% elastan',
      'Maskintvätt högst 30°C',
      'Tål strykning',
    ],
    images: [
      '/images/dam/byxor/byxor-dam1.webp',
      '/images/dam/byxor/byxor-dam3.webp',
      '/images/dam/byxor/byxor-dam2.webp',
    ],
    sizes: ['32', '34', '36', '38', '40', '42', '44'],
  },
  // Jackor
  {
    name: 'Oversized Rock',
    description:
      'Trendig oversized rock i klassisk design. Perfekt för både kontoret och festligare tillfällen.',
    price: 2499,
    brand: 'Frano',
    gender: 'dam',
    color: 'navy',
    slug: 'oversized-rock',
    category: 'jackor',
    specs: [
      'Oversized passform',
      'Material: 100% polyester',
      'Tål ej maskintvätt',
      'Tål ej strykning',
      'Kemtvätt rekommenderas',
    ],
    images: [
      '/images/dam/jackor/jackor-dam2.webp',
      '/images/dam/jackor/jackor-dam3.webp',
    ],
    sizes: ['32', '34', '36', '38', '40', '42', '44'],
  },
  // Klänningar
  {
    name: 'Jeans Klänning',
    description:
      'Den här denim playsuiten är ett snyggt och bekvämt alternativ för alla tillfällen. Den har en klassisk krage, korta ärmar och en dragkedja framtill.',
    price: 1899,
    brand: 'Hermano',
    gender: 'dam',
    color: 'blue',
    slug: 'jeans-klanning',
    category: 'klanningar',
    specs: [
      'Normal passform',
      'Material: 80% bci, 20% återvunnen bomull',
      'Maskintvätt högst 40°C',
      'Tål strykning',
    ],
    images: [
      '/images/dam/klänningar/klänning-dam2.webp',
      '/images/dam/klänningar/klänning-dam1.webp',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  // Toppar
  {
    name: 'Silkesblus',
    description:
      'Lyxig blus i silkesliknande material med elegant fall. Tidlös design som passar alla garderober.',
    price: 899,
    brand: 'Hermana',
    gender: 'dam',
    color: 'midnight blue',
    slug: 'silkesblus',
    category: 'Toppar',
    specs: [
      'Normal passform',
      'Material: 100% bomull',
      'Maskintvätt högst 30°C',
      'Tål strykning',
    ],
    images: ['/images/dam/toppar/topp1.webp', '/images/dam/toppar/topp2.webp'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
];

// Funktion för att hämta befintliga produkter
async function getExistingProductsInfo() {
  // Hämta alla befintliga slug och name värden
  const {data, error} = await supabase
    .from('products')
    .select('slug, name')
    .order('created_at', {ascending: false});

  if (error) {
    console.error('Fel vid hämtning av befintliga produkter:', error);
    return {slugs: [], names: [], highestIndex: 0};
  }

  // Extrahera unika slugs och names
  const slugs = data.map((product) => product.slug);
  const names = data.map((product) => product.name);

  // Hitta högsta index från befintliga slug-mönster (slug-XX)
  let highestIndex = 0;
  slugs.forEach((slug) => {
    const match = slug.match(/-(\d+)$/);
    if (match && match[1]) {
      const index = parseInt(match[1]);
      if (index > highestIndex) {
        highestIndex = index;
      }
    }
  });

  return {slugs, names, highestIndex};
}

// Funktion som skapar en ny produkt baserat på originalet med unika värden
const createDuplicateWithUniqueIds = (
  product: any,
  index: number,
  existingSlugs: string[]
) => {
  const colorVariants = [
    'black',
    'white',
    'navy',
    'beige',
    'blue',
    'green',
    'red',
    'gray',
    'brown',
    'cream',
  ];

  // Välj en slumpmässig färg som är annorlunda från originalets
  let color = product.color;
  while (color === product.color) {
    color = colorVariants[Math.floor(Math.random() * colorVariants.length)];
  }

  // Skapa en unik slug
  let newSlug = `${product.slug}-${index}`;
  let suffix = index;

  // Se till att slug är unik
  while (existingSlugs.includes(newSlug)) {
    suffix++;
    newSlug = `${product.slug}-${suffix}`;
  }

  // Lägg till den nya sluggen i listan så att vi kan kontrollera mot den också
  existingSlugs.push(newSlug);

  return {
    ...product,
    name: `${product.name} #${index}`,
    slug: newSlug,
    color: color, // Ändra färg för variation
    price: Math.round(product.price * (0.9 + Math.random() * 0.2)), // Liten variation i pris
  };
};

// Huvudfunktion för att generera och spara produkter
async function seedProducts(count: number = 50) {
  console.log(`Börjar seeda produkter...`);

  // Hämta information om befintliga produkter
  const {
    slugs: existingSlugs,
    names: existingNames,
    highestIndex,
  } = await getExistingProductsInfo();
  const startIndex = highestIndex + 1;

  console.log(
    `Hittade ${existingSlugs.length} befintliga produkter. Startar från index ${startIndex}`
  );

  // Filtrera bort basprodukter som redan finns baserat på slug
  const basesToAdd = baseProducts.filter(
    (baseProduct) => !existingSlugs.includes(baseProduct.slug)
  );

  console.log(
    `${basesToAdd.length} av ${baseProducts.length} basprodukter behöver läggas till`
  );

  const productRows = [];

  // Lägg till basprodukter som inte redan finns
  if (basesToAdd.length > 0) {
    productRows.push(...basesToAdd);
  }

  // Beräkna hur många ytterligare produkter som behöver skapas
  const remainingToCreate = count - basesToAdd.length;

  if (remainingToCreate > 0) {
    console.log(`Skapar ${remainingToCreate} ytterligare produktvarianter`);

    // Kopiera den befintliga slug-listan så vi kan lägga till nya slugs när de skapas
    const updatedSlugs = [...existingSlugs];

    // Generera ytterligare produkter baserat på originalen
    for (let i = 0; i < remainingToCreate; i++) {
      // Välj en slumpmässig basprodukt att duplicera
      const randomIndex = Math.floor(Math.random() * baseProducts.length);
      const baseProd = baseProducts[randomIndex];

      // Skapa en ny variant med unika identifierare
      const duplicateProduct = createDuplicateWithUniqueIds(
        baseProd,
        startIndex + i,
        updatedSlugs
      );

      productRows.push(duplicateProduct);
    }
  }

  if (productRows.length === 0) {
    console.log('Inga nya produkter att lägga till.');
    return;
  }

  // Spara produkter i databasen
  const {data, error} = await supabase
    .from('products')
    .insert(productRows)
    .select();

  if (error) {
    console.error('Fel vid insättning av produkter:', error);
    return;
  }

  console.log(`Framgångsrikt lagt till ${data.length} produkter!`);
}

(async () => {
  try {
    const numberOfProducts = process.argv[2] ? parseInt(process.argv[2]) : 60;
    await seedProducts(numberOfProducts);
    console.log('✅ Seeding slutfört!');
  } catch (error) {
    console.error('❌ Fel vid seeding:', error);
  } finally {
    process.exit(0);
  }
})();
