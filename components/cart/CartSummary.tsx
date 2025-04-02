'use client';

import {Link} from '@/components/shared/link';
import {formatPrice} from '@/lib/utils';

type CartSummaryProps = {
  totalPrice: number;
  compact?: boolean;

  onCartClick?: () => void;
};

export default function CartSummary({
  totalPrice,
  compact = false,
  onCartClick = () => {},
}: CartSummaryProps) {
  if (compact) {
    return (
      <div className='p-3 border-t border-gray-100'>
        <div className='flex justify-between items-center'>
          <span className='font-syne text-sm'>Totalsumma:</span>
          <span className='font-medium'>{formatPrice(totalPrice)}</span>
        </div>
        <div className='flex'>
          <Link
            href='/cart'
            variant='secondary'
            size='md'
            width='full'
            className='mt-3 font-semibold '
            onClick={onCartClick}
          >
            Visa varukorg
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=''>
      <div className='flex justify-between text-base lg:text-lg '>
        <span className='font-syne'>Totalsumma:</span>
        <span className='font-medium'>{formatPrice(totalPrice)}</span>
      </div>
      <Link
        href='/checkout'
        variant='primary'
        width='full'
        className='mt-6 h-12 text-sm lg:text-base font-semibold'
      >
        Till kassan
      </Link>
    </div>
  );
}
