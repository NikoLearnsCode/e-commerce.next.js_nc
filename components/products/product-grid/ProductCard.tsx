'use client';
import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Product} from '@/lib/validators';

type ProductCardProps = {
  product: Product;
  priorityLoading?: boolean;
};

export default function Cards({
  product,

  priorityLoading = false,
}: ProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const primaryImage = product.images?.[0];
  const secondaryImage = product.images?.[1];

  if (!product.images || product.images.length === 0) {
    return (
      <div className='border border-gray-50 h-full'>
        <div className='w-full aspect-square bg-gray-200 flex items-center justify-center'>
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
    <div className='flex flex-col w-full h-full pb-6  '>
      <div
        className='w-full relative h-full bg-white'
        onMouseEnter={() => secondaryImage && setIsHovering(true)}
        onMouseLeave={() => secondaryImage && setIsHovering(false)}
      >
        <Link href={`/${product.slug}`} className=' h-full w-full'>
          {/* Primary image */}
          <div className='relative  aspect-[7/9] h-full w-full '>
            <Image
              src={primaryImage || ''}
              alt={product.name}
              fill
              priority={priorityLoading}
              loading={priorityLoading ? 'eager' : 'lazy'}
              className='object-cover h-full w-full'
              sizes='(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 50vw'
            />
          </div>

          {/* Secondary image - positioned absolutely on top, fades in on hover */}
          {secondaryImage && (
            <div
              className='absolute inset-0 transition-opacity duration-300 ease-in-out'
              style={{opacity: isHovering ? 1 : 0}}
            >
              <Image
                src={secondaryImage || ''}
                alt={product.name}
                fill
                priority={false}
                loading='lazy'
                className='object-cover '
                sizes='(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 50vw'
              />
            </div>
          )}
        </Link>
      </div>

      <div className='py-2 px-5 flex flex-col gap-0.5 '>
        <h2 className=' text-sm sm:text-lg '>{product.name}</h2>
        <p className='text-xs font-semibold uppercase font-syne text-gray-600 '>
          {product.brand}
        </p>
        <p className='text-sm sm-text-base'>{product.price.toFixed(2)} kr</p>
        <p className='text-xs font-medium uppercase font-syne'>{product.color}</p>
      </div>
    </div>
  );
}
