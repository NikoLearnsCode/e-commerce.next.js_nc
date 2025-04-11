'use client';

import Image from 'next/image';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';
import type SwiperType from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import {twMerge} from 'tailwind-merge';

type MobileImageSwiperProps = {
  images: string[];
  productName: string;
  // initialSlide?: number;
  activeIndex: number;
  onSlideChange: (index: number) => void;
  setSwiperInstance: (instance: SwiperType | null) => void;
  className?: string;
};

export default function MobileImageSwiper({
  images,
  productName,
  // initialSlide = 0,
  activeIndex = 0,
  onSlideChange,
  setSwiperInstance,
  className,
}: MobileImageSwiperProps) {
  const prevButtonClass = 'mobile-image-prev';
  const nextButtonClass = 'mobile-image-next';


  const isBeginning = activeIndex === 0;
  const isEnd = activeIndex === images.length - 1;

  if (!images || images.length === 0) {
    return (
      <div
        className={twMerge(
          'relative aspect-7/9 bg-gray-200 flex items-center justify-center',
          className
        )}
      >
        <span className='text-gray-500'>Ingen bild tillgänglig</span>
      </div>
    );
  }

  return (
    <div className={twMerge('relative', className)}>
      {' '}
      {/* Wrapper div */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation={{
          prevEl: `.${prevButtonClass}`,
          nextEl: `.${nextButtonClass}`,
        }}
        onSlideChange={(swiper) => onSlideChange(swiper.activeIndex)}
        onSwiper={setSwiperInstance}
        className='aspect-7/9'
        // initialSlide={initialSlide}
      >
        {images.map((imgSrc, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={imgSrc}
              alt={`${productName} - bild ${idx + 1}`}
              fill
              sizes='(max-width: 767px) 100vw, 0px'
              priority={idx === activeIndex} 
              loading={idx === activeIndex ? 'eager' : 'lazy'} 
              className='object-cover w-full h-full'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Navigationsknappar (outside Swiper, controlled by Swiper's navigation prop) */}
      {images.length > 1 && (
        <>
          <button
            className={twMerge(
              `${prevButtonClass} absolute right-10 bottom-2  hover:bg-gray-200 p-1 transition cursor-pointer z-10`,
              isBeginning ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
            aria-label='Föregående bild'
          >
            <ArrowLeft size={20} strokeWidth={1.25} />
          </button>
          <button
            className={twMerge(
              `${nextButtonClass} absolute right-2 bottom-2 hover:bg-gray-200 p-1 transition cursor-pointer  z-10`,
              isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
            )}
            aria-label='Nästa bild'
          >
            <ArrowRight size={20} strokeWidth={1.25} />
          </button>
        </>
      )}
      {/* Pagination Text Indicator */}
      {images.length > 1 && (
        <div className='absolute bottom-2 left-2 justify-center mt-4 flex gap-2 z-10'>
          <span className='text-base font-medium  text-gray-700  px-1 '>
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}
