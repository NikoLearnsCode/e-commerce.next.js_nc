'use client';

import Image from 'next/image';
import {Link} from '@/components/shared/link';
import {useState} from 'react';
import {useSwipeable} from 'react-swipeable';

export default function Homepage() {
  const [currentView, setCurrentView] = useState<'dam' | 'herr'>('dam');

  // Define image sources
  const damDesktopImage = '/images/dam.ai.2.1.png';
  const herrDesktopImage = '/images/herr.ai.2.1.png';
  const damMobileImage = '/images/dam.ai.mobile.png';
  const herrMobileImage = '/images/herr.ai.mobile.png';

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentView('herr'),
    onSwipedRight: () => setCurrentView('dam'),
    preventScrollOnSwipe: true, // Prevent scrolling while swiping
    trackMouse: true, // Allow swiping with mouse for testing/desktop emulation
  });

  return (
    <div className='relative'>
      <div className='relative min-h-[calc(100vh-56px)]'>
        {/* Mobile images with swipe */}
        <div className='sm:hidden' {...handlers}>
          <Image
            src={damMobileImage}
            alt='Landing-Page-Dam-Mobil'
            fill
            priority={true}
            loading='eager'
            sizes='90vw'
            quality={90}
            className={`object-cover object-top w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${currentView === 'dam' ? 'opacity-100' : 'opacity-0'}`}
          />
          <Image
            src={herrMobileImage}
            alt='Landing-Page-Herr-Mobil'
            fill
            loading='lazy' // Lazy load the second mobile image
            sizes='90vw'
            quality={90}
            className={`object-cover object-top w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${currentView === 'herr' ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {/* Desktop images with animation */}
        <div className='hidden sm:block'>
          <Image
            src={damDesktopImage}
            alt='Landing-Page-Dam'
            fill
            priority={true}
            loading='eager'
            sizes='90vw'
            quality={90}
            className={`object-cover  w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
              currentView === 'dam' ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Image
            src={herrDesktopImage}
            alt='Landing-Page-Herr'
            fill
            loading='lazy'
            sizes='90vw'
            quality={90}
            className={`object-cover   w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
              currentView === 'herr' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      </div>

      <div className='absolute left-0 top-3/4 w-full px-6'>
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
