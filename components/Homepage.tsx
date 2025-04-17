'use client';

import Image from 'next/image';
import {Link} from '@/components/shared/link';
import {useState} from 'react';

export default function Homepage() {
  const [currentView, setCurrentView] = useState<'dam' | 'herr'>('dam');

  // Define image sources
  const damDesktopImage = '/images/LP.DAM.avif';
  const herrDesktopImage = '/images/LP.HERR.avif';
  const damMobileImage = '/images/LP.DAM.webp';

  return (
    <div className='relative'>
      <div className='relative min-h-[calc(100vh-56px)]'>
        {/* Mobile image with priority for LCP */}
        <div className='md:hidden'>
          <Image
            src={damMobileImage}
            alt='Landing-Page-Dam-Mobil'
            fill
            priority={true}
            loading='eager'
            sizes='90vw'
            quality={100}
            className='object-cover w-full h-full absolute top-0 left-0'
          />
        </div>

        {/* Desktop images with animation */}
        <div className='hidden md:block'>
          <Image
            src={damDesktopImage}
            alt='Landing-Page-Dam'
            fill
            priority={true}
            loading='eager'
            sizes='90vw'
            quality={100}
            className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
              currentView === 'dam' ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={herrDesktopImage}
            alt='Landing-Page-Herr'
            fill
            loading='lazy'
            sizes='90vw'
            quality={100}
            className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
              currentView === 'herr' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      <div className='absolute left-0 top-2/3 w-full px-6'>
        <div className='flex justify-center items-center space-x-5 font-syne uppercase'>
          <Link
            variant='secondaryTwo'
            href='/c/dam'
            className='w-full sm:w-40 text-base font-black transition-all duration-500'
            onMouseEnter={() => setCurrentView('dam')}
          >
            dam
          </Link>
          <Link
            variant='primaryTwo'
            href='/c/herr'
            className='w-full sm:w-40 text-base font-black transition-all duration-500'
            onMouseEnter={() => setCurrentView('herr')}
          >
            herr
          </Link>
        </div>
      </div>
    </div>
  );
}
