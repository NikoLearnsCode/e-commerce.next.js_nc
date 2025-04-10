'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Product} from '@/lib/validators';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {twMerge} from 'tailwind-merge';
import 'swiper/css';
import 'swiper/css/navigation';

type ProductCardProps = {
  product: Product;
  priorityLoading?: boolean;
};

export default function ProductCard({
  product,
  priorityLoading = false,
}: ProductCardProps) {
  const hasMultipleImages = product.images && product.images.length > 1;
  const prevButtonClass = `product-card-prev-${product.id}`;
  const nextButtonClass = `product-card-next-${product.id}`;

  if (!product.images || product.images.length === 0) {
    return (
      <div className='border border-gray-50 h-full group'>
        <div className='w-full aspect-[7/9] bg-gray-200 flex items-center justify-center'>
          <span className='text-gray-500'>Ingen bild tillgänglig</span>
        </div>
        <div className='p-4 overflow-hidden'>
          <h2 className='truncate font-medium'>{product.name}</h2>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {product.description}
          </p>
          <p className='mt-2 font-semibold'>{product.price.toFixed(2)} kr</p>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full h-full pb-6 group'>
      <div className='w-full relative h-full bg-white'>
        {hasMultipleImages ? (
          <>
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              spaceBetween={1}
              loop={true}
              allowTouchMove={false}
              navigation={{
                prevEl: `.${prevButtonClass}`,
                nextEl: `.${nextButtonClass}`,
              }}
              className='relative aspect-[7/9] h-full w-full'
            >
              {product.images.map((imgSrc, idx) => (
                <SwiperSlide key={idx}>
                  <Link
                    href={`/${product.slug}`}
                    className='block h-full w-full'
                  >
                    <Image
                      src={imgSrc}
                      alt={`${product.name} - bild ${idx + 1}`}
                      fill
                      priority={priorityLoading && idx === 0}
                      loading={priorityLoading && idx === 0 ? 'eager' : 'lazy'}
                      className='object-cover h-full w-full'
                      sizes='(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 50vw'
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className={twMerge(
                `${prevButtonClass} absolute left-0 top-1/2 -translate-y-1/2  pr-3 pl-1 py-4 transition-opacity duration-800  z-10 opacity-0 group-hover:opacity-100`
              )}
              aria-label='Föregående bild'
            >
              <ChevronLeft
                size={20}
                strokeWidth={1.5}
                className='text-gray-600'
              />
            </button>
            <button
              className={twMerge(
                `${nextButtonClass} absolute right-0 top-1/2 -translate-y-1/2   pl-3 pr-1 py-4 transition-opacity duration-800  z-10 opacity-0 group-hover:opacity-100`
              )}
              aria-label='Nästa bild'
            >
              <ChevronRight
                size={20}
                strokeWidth={1.5}
                className='text-gray-600'
              />
            </button>
          </>
        ) : (
          <Link
            href={`/${product.slug}`}
            className='block relative aspect-[7/9] h-full w-full'
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              priority={priorityLoading}
              loading={priorityLoading ? 'eager' : 'lazy'}
              className='object-cover h-full w-full'
              sizes='(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 50vw'
            />
          </Link>
        )}
      </div>

      <div className='py-2 px-5 flex flex-col gap-0.5 '>
        <Link href={`/${product.slug}`}>
          <h2 className=' text-sm sm:text-lg '>{product.name}</h2>
        </Link>
        <p className='text-xs font-semibold uppercase font-syne text-gray-600 '>
          {product.brand}
        </p>
        <p className='text-sm sm-text-base'>{product.price.toFixed(2)} kr</p>
        <p className='text-xs font-medium text-gray-600 uppercase font-syne'>
          {product.color}
        </p>
      </div>
    </div>
  );
}
