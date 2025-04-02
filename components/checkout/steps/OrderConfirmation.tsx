'use client';

import {useEffect, useState} from 'react';
import {useCart} from '@/context/CartProvider';
import Link from 'next/link';
import {GoArrowLeft} from 'react-icons/go';

export default function OrderConfirmation() {
  const {clearCartAction} = useCart();
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    setHasRendered(true);
    console.log('OrderConfirmation mounted');
  }, []);

  useEffect(() => {
    if (!hasRendered) return;

    return () => {
      console.log('OrderConfirmation unmounting - clearing cart');
      clearCartAction();
    };
  }, [hasRendered, clearCartAction]);

  return (
    <div className='max-w-lg mx-auto px-4 pt-16 py-8 text-center'>
      <h1 className='text-3xl font-medium mb-6'>Tack för din beställning!</h1>
      <p className='text-gray-600 font-normal text-base mb-6'>
        Vi har tagit emot din order och kommer att behandla den så snart som
        möjligt. En orderbekräftelse har skickats till din e-postadress.
      </p>

      <div className='mt-12'>
        <Link
          className='text-sm text-primary font-medium hover:underline flex justify-center gap-1 items-center mt-4 group tracking-wider mx-auto text-center'
          href='/'
        >
          <GoArrowLeft
            size={16}
            className='group-hover:-translate-x-2 transition-transform duration-300 mr-1'
          />
          Gå till startsidan
        </Link>
      </div>
    </div>
  );
}
