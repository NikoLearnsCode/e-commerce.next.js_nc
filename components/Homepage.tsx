'use client';

import Image from 'next/image';
import {Link} from '@/components/shared/link';
import {useState} from 'react';
import {useMediaQuery} from '@/hooks/useMediaQuery';
export default function Homepage() {
  const [currentView, setCurrentView] = useState<'dam' | 'herr'>('dam');

  const isMobile = useMediaQuery('(max-width: 768px)');

  const primaryImage = '/images/LP.DAM.avif';
  const secondaryImage = '/images/LP.HERR.avif';
  const primaryMobileImage = '/images/LP.DAM.webp';
  // const secondaryMobileImage = '/images/LP.HERR.webp';

  return (
    <div className='relative'>
      <div className='relative min-h-[calc(100vh-56px)]'>
        {isMobile ? (
          <>
            <Image
              src={primaryMobileImage}
              alt='Landing-Page-Dam-Mobil'
              fill
              priority={true}
              loading='eager'
              sizes='90vw'
              quality={100}
              className='object-cover w-full h-full absolute top-0 left-0 '
            />
            {/* <Image
              src={secondaryMobileImage}
              alt='Landing-Page-Herr-Mobil'
              fill
              loading='lazy'
              sizes='90vw'
              quality={100}
              className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
                currentView === 'herr' ? 'opacity-100' : 'opacity-0'
              }`}
            /> */}
          </>
        ) : (
          <>
            <Image
              src={primaryImage}
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
              src={secondaryImage}
              alt='Landing-Page-Herr'
              fill
              loading='lazy'
              sizes='90vw'
              quality={100}
              className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
                currentView === 'herr' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        )}
      </div>

      <div className='absolute left-0 top-2/3  w-full px-6 '>
        <div className='flex justify-center items-center space-x-5  font-syne uppercase '>
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
