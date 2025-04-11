'use client';

import Image from 'next/image';
import {Link} from '@/components/shared/link';
import {useState} from 'react';

export default function Homepage() {
  const [currentView, setCurrentView] = useState<'dam' | 'herr'>('dam');

  const primaryImage = '/images/LP.DAM.avif';
  const secondaryImage = '/images/LP.HERR.avif';
  const primaryMobileImage = '/images/LP.DAM.webp';
  const secondaryMobileImage = '/images/LP.HERR.webp';

  return (
    <div className='relative'>
      <div className='relative min-h-[calc(100vh-56px)]'>
        <Image
          src={primaryImage}
          alt='Landing-Page-Dam'
          // width={1920}
          // height={1080}
          fill
          priority={true}
          loading='eager'
          sizes='90vw'
          quality={100}
          className={`hidden md:block object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
            currentView === 'dam' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Image
          src={secondaryImage}
          alt='Landing-Page-Herr'
          // width={1920}
          // height={1080}
          fill
          priority={true}
          loading='eager'
          sizes='90vw'
          className={`hidden md:block object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
            currentView === 'herr' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Image
          src={primaryMobileImage}
          alt='Landing-Page-Dam-Mobil'
          // width={820}
          // height={880}
          fill
          priority={true}
          loading='eager'
          sizes='90vw'
          quality={100}
          className={`block md:hidden object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
            currentView === 'dam' ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <Image
          src={secondaryMobileImage}
          alt='Landing-Page-Herr-Mobil'
          // width={820}
          // height={880}
          fill
          loading='lazy'
          sizes='90vw'
          className={`block md:hidden object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
            currentView === 'herr' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className='absolute left-0 top-2/3  w-full px-6 '>
        <div className='flex justify-center items-center space-x-5  font-syne uppercase '>
          <Link
            variant='secondaryTwo'
            href='/c/dam'
            className={`w-full sm:w-40 text-base font-black transition-all duration-500 ${
              currentView === 'dam' ? '' : ''
            }`}
            onMouseEnter={() => setCurrentView('dam')}
          >
            dam
          </Link>
          <Link
            variant='primaryTwo'
            href='/c/herr'
            className={`w-full sm:w-40 text-base font-black transition-all duration-500 ${
              currentView === 'herr' ? '' : ''
            }`}
            onMouseEnter={() => setCurrentView('herr')}
          >
            herr
          </Link>
        </div>
      </div>
    </div>
  );
}
