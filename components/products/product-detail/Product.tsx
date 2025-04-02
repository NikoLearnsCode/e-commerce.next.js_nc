'use client';

import Image from 'next/image';
import AddToCartButton from '@/components/products/product-detail/AddToCartButton';
import {twMerge} from 'tailwind-merge';
import {Product} from '@/lib/validators';
import {useState} from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Dot,
} from 'lucide-react';
import ProductCarousel from '@/components/products/product-detail/CarouselOne';
import Newsletter from '@/components/shared/Newsletter';
import ProductTwo from './CarouselTwo';
import {Truck, RefreshCcw, ShieldCheck} from 'lucide-react';

import AccordionSection from '@/components/shared/Accordion';

type ProductPageProps = {
  product: Product;
  categoryProducts?: Product[];
  genderProducts?: Product[];
  onCartClick?: () => void;
  initial?: boolean;
};

export default function product({
  product,
  categoryProducts = [],
  genderProducts = [],
}: ProductPageProps) {
  // const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Hitta primärbild-index direkt
  // const initialImageIndex =
  //   !product.images || product.images.length === 0
  //     ? 0
  //     : product.images.findIndex((img) => img) || 0;

  const initialImageIndex = 0;

  const [activeImageIndex, setActiveImageIndex] = useState(initialImageIndex);

  // Funktion för att återställa kvantitet efter tillägg i varukorg
  const handleAddToCartSuccess = () => {
    // setQuantity(1);
    setSelectedSize(null);
  };

  // Funktioner för navigation
  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setActiveImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setActiveImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  return (
    <>
      <div className='w-full mx-auto md:pt-4 md:pb-8 relative '>
        <div className='flex flex-col justify-center gap-4 md:gap-8 md:flex-row lg:gap-16 md:px-4'>
          {/* Vänster kolumn - bilder */}
          <div className=' h-full md:sticky md:top-18 '>
            {product.images && product.images.length > 0 ? (
              <div className='flex flex-col justify-start  w-full  md:flex-row h-full '>
                {/* Mobile */}
                <div className='md:hidden relative'>
                  <div className='relative w-full'>
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={product.name}
                      width={700}
                      height={700}
                      priority={true}
                      className='w-full '
                    />

                    {/* Navigationsknappar */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className='absolute left-2 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-full transition cursor-pointer '
                          aria-label='Föregående bild'
                        >
                          <ArrowLeft size={20} strokeWidth={1.25} />
                        </button>
                        <button
                          onClick={nextImage}
                          className='absolute right-2 top-1/2 -translate-y-1/2 hover:bg-gray-100 p-1 rounded-full transition cursor-pointer '
                          aria-label='Nästa bild'
                        >
                          <ArrowRight size={20} strokeWidth={1.25} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Pagination  */}
                  {product.images.length > 1 && (
                    <div className='absolute bottom-2 left-1/2 -translate-x-1/2 justify-center mt-4 flex gap-2'>
                      {product.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-2 h-2 rounded-full ${idx === activeImageIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
                          aria-label={`Gå till bild ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop */}
                <div className='hidden md:flex md:flex-col items-start  lg:flex-row-reverse gap-2 h-full '>
                  {/* Huvudbild */}
                  <div className=' flex items-start  justify-start  w-full '>
                    <Image
                      src={product.images[activeImageIndex]}
                      alt={product.name}
                      width={1000}
                      height={1000}
                      priority={true}
                      className='object-contain object-top w-full xl:min-h-[85vh] xl:max-h-[85vh] '
                    />
                  </div>

                  {/* Thumbnails */}
                  {product.images.length > 1 && (
                    <div className='flex flex-row lg:flex-col  gap-4'>
                      {product.images.map((img, idx) => (
                        <div
                          key={idx}
                          className={`w-20 h-auto border-2 cursor-pointer ${idx === activeImageIndex ? 'border-black' : 'border-gray-200'}`}
                          onMouseEnter={() => setActiveImageIndex(idx)}
                          onClick={() => setActiveImageIndex(idx)}
                        >
                          <Image
                            src={img}
                            alt={product.name}
                            width={100}
                            height={150}
                            className='object-contain'
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className='w-full  bg-gray-200 flex items-center justify-center'>
                <span className='text-gray-500'>Ingen bild tillgänglig</span>
              </div>
            )}
          </div>

          {/* Höger kolumn - produktinfo */}
          <div className='flex flex-col px-6 sm:px-5 gap-4 md:mb-28 w-full md:max-w-[330px] md:min-w-[330px] lg:max-w-[400px] lg:min-w-[400px]   transition-all duration-300  '>
            {/* Produktnamn */}
            <div>
              <h1 className='text-xl md:text-2xl mt-4 font-semibold'>
                {product.name}
              </h1>
              {/* <p className='text-gray-600  text-base font-medium pt-1'>
                {product.brand
                  ? String(product.brand).charAt(0).toUpperCase() +
                    String(product.brand).slice(1)
                  : ''}
              </p> */}
              <p className='text-gray-600 font-semibold uppercase font-syne text-sm  pt-1'>
                {product.brand}
              </p>
            </div>

            <div className='text-xl md:text-2xl my-2 sm:my-4 text-gray-800 font-semibold '>
              {product.price} kr
              {/* <span className='text-base font-normal text-gray-600'>kr</span> */}
            </div>
            <div className='flex gap-1 items-center'>
              <span className='text-gray-600 font-light text-sm'>Färg:</span>
              <p className='text-gray-950 text-base medium'>
                {product.color &&
                  product.color.charAt(0).toUpperCase() +
                    product.color.slice(1)}
              </p>
            </div>

            {/* Size */}
            <div className='flex flex-col mt-6 gap-2'>
              <span
                className={twMerge(
                  'text-gray-600 font-light text-sm mb-1 ',
                  selectedSize ? 'text-green-950 font-medium' : 'text-gray-600'
                )}
              >
                {selectedSize ? `Vald storlek: ${selectedSize}` : 'Storlekar:'}
              </span>
              <div className='flex  items-center flex-wrap'>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={twMerge(
                      'h-12 w-16 p-0 m-0 border appearance-none text-sm  font-medium hover:border-black transition border-gray-200  cursor-pointer',
                      selectedSize === size
                        ? 'border border-black bg-gray-100'
                        : ''
                    )}
                    onClick={() => setSelectedSize(size)}
                    disabled={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            {/* <div className='flex flex-col  gap-2'>
              <span className='text-gray-600 text-sm font-light'>Antal:</span>
              <div className='flex items-center gap-3 border border-gray-200  w-fit'>
                <button
                  className={twMerge(
                    'px-4 py-2',
                    'focus:outline-none',
                    quantity === 1
                      ? 'opacity-50 cursor-not-allowed '
                      : 'cursor-pointer'
                  )}
                  onClick={() =>
                    quantity > 1 ? setQuantity(quantity - 1) : null
                  }
                  disabled={quantity === 1}
                >
                  <Minus strokeWidth={1} size={24} />
                </button>
                <span className='text-gray-600 text-lg font-light'>
                  {quantity}
                </span>
                <button
                  className={twMerge(
                    'px-4 py-2',
                    'focus:outline-none',
                    'cursor-pointer'
                  )}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus strokeWidth={1} size={24} />
                </button>
              </div>
            </div> */}

            <AddToCartButton
              product={product}
              selectedSize={selectedSize}
              onAddSuccess={handleAddToCartSuccess}
              className='w-full h-11 mt-2 text-sm font-semibold transition duration-300 rounded-none'
              disabled={!selectedSize}
            />

            <div className='space-y-4 mt-4'>
              <AccordionSection
                title='Om produkten'
                className='text-base font-medium '
              >
                <p className='text-gray-600 font-normal text-sm '>
                  {product.description}
                </p>
              </AccordionSection>

              <AccordionSection
                title='Specifikationer'
                className='font-medium text-base'
              >
                {product.specs.map((spec) => (
                  <span
                    key={spec}
                    className='text-gray-600 text-sm font-normal flex items-center'
                  >
                    <Dot size={22} className='text-black' />
                    {spec}
                  </span>
                ))}
              </AccordionSection>
            </div>

            {/* Information om frakt, returer, etc. */}
            <div className=' space-y-8 pt-12 '>
              <div>
                <div className='flex items-center gap-3 mb-1'>
                  <Truck size={25} strokeWidth={1.25} />
                  <h3 className='font-medium text-base text-gray-900'>
                    Gratis frakt och snabb leverans
                  </h3>
                </div>
                <p className='text-sm text-gray-600 pl-10 md:pr-12'>
                  Gäller för beställningar över 499 kr. Leverans inom 2-3
                  arbetsdagar.
                </p>
              </div>

              <div>
                <div className='flex items-center gap-3 mb-1'>
                  <ShieldCheck size={25} strokeWidth={1.25} />
                  <h3 className='font-medium text-gray-900'>
                    Enkla byten av presenter
                  </h3>
                </div>
                <p className='text-sm text-gray-600 pl-10 md:pr-12'>
                  Logga in och skapa ett presentkvitto.
                </p>
              </div>

              <div>
                <div className='flex items-center gap-3 mb-1'>
                  <RefreshCcw size={25} strokeWidth={1.25} />
                  <h3 className='font-medium text-gray-900'>Enkla returer</h3>
                </div>
                <p className='text-sm text-gray-600 pl-10 md:pr-12'>
                  Vi erbjuder enkla kostnadsfria returer inom 30 dagar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produkter i samma kategori */}
      {categoryProducts.length > 0 && (
        <div className=' mx-auto   pt-20 pb-8'>
          <ProductCarousel products={categoryProducts} />
        </div>
      )}

      {/* Produkter för samma kön */}
      {genderProducts.length > 0 && (
        <div className=' mx-auto   py-8'>
          <ProductTwo products={genderProducts} />
        </div>
      )}
      <Newsletter />
    </>
  );
}
