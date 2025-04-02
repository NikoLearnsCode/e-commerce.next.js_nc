'use client';

import Link from 'next/link';
import {GoArrowLeft} from 'react-icons/go';

type EmptyCartProps = {
  compact?: boolean;
  onCartClick?: () => void;
};

export default function EmptyCart({
  compact = false,

}: EmptyCartProps) {
  if (compact) {
    return (
      <div className='p-4 text-center'>
        <p className='text-sm text-gray-700 mb-1'>Din varukorg är tom.</p>
        {/* <Link
          onClick={onCartClick}
          className='text-xs text-primary font-medium hover:underline flex justify-center  items-center gap-1 mt-3 group tracking-wider mx-auto text-center'
          href='/'
        >
          <GoArrowLeft
            size={14}
            className='group-hover:-translate-x-2 transition-transform duration-300'
          />
          Fortsätt handla
        </Link> */}
      </div>
    );
  }

  return (
    <div className='flex flex-col justify-center items-center min-h-[calc(100vh-310px)]'>
      <h2 className='text-2xl font-medium text-gray-500'>
        Din varukorg är tom
      </h2>

      <Link
        className='text-sm text-primary font-medium hover:underline flex justify-center gap-1 items-center mt-4 group tracking-wider mx-auto text-center'
        href='/'
      >
        <GoArrowLeft
          size={16}
          className='group-hover:-translate-x-2 transition-transform duration-300 mr-1'
        />
        Fortsätt handla
      </Link>

      {/* <div className='flex justify-center items-center gap-6 font-syne uppercase '>
      <Link
        className='text-lg text-primary font-semibold hover:underline flex justify-center gap-1 items-center mt-4 group tracking-wider mx-auto text-center'
        href='/c/dam'
      >
        <GoArrowLeft
          size={22}
          className='group-hover:-translate-x-2 transition-transform duration-300 mr-1'
        />
        Dam
      </Link>
      <Link
        className='text-lg text-primary font-semibold hover:underline flex justify-center gap-1 items-center mt-4 group tracking-wider mx-auto text-center'
        href='/c/herr'
      >
        
        Herr
        <GoArrowRight
          size={22}
          className='group-hover:translate-x-2 transition-transform duration-300 ml-1'
        />
      </Link>
     
      </div> */}
    </div>
  );
}
