'use client';

import Image from 'next/image';
import {Link} from '@/components/shared/link';
import {useState} from 'react';
export default function Homepage() {
  const [isHovering, setIsHovering] = useState(false);

  const primaryImage = '/images/LP2.avif';
  const secondaryImage = '/images/LP.HERR.avif';

  return (
    <div className='relative'>
      <div className='relative min-h-[calc(100vh-56px)]'>
        <Image
          src={primaryImage}
          alt='Landing-Page-Dam'
          width={1920}
          height={1080}
          priority
          loading='eager'
          sizes='100vw'
          quality={100}
          className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
            isHovering ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <Image
          src={secondaryImage}
          alt='Landing-Page-Herr'
          width={1920}
          height={1080}
          loading='lazy'
          sizes='100vw'
          priority
          quality={100}
          className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-700 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className='absolute left-0 top-2/3  w-full px-6 '>
        <div className='flex justify-center items-center space-x-5  font-syne uppercase '>
          <Link
            variant='secondaryTwo'
            href='/c/dam'
            onMouseEnter={() => setIsHovering(false)}
            className={`w-full sm:w-40 text-base font-black transition-all duration-500 ${
              isHovering ? '' : 'bg-white'
            }`}
          >
            dam
          </Link>
          <Link
            variant='primaryTwo'
            href='/c/herr'
            onMouseEnter={() => setIsHovering(true)}
            className={`w-full sm:w-40 text-base font-black transition-all duration-500 ${
              isHovering ? 'bg-black' : ''
            }`}
          >
            herr
          </Link>
        </div>
      </div>
    </div>
  );
}
