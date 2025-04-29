'use client';

import {useRef, useEffect} from 'react';
import {useCart} from '@/context/CartProvider';
import {AnimatePresence, motion} from 'framer-motion';
import CartItems from './CartItems';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import SpinningLogo from '../shared/SpinningLogo';
import {PiBagSimpleThin} from 'react-icons/pi';

import {MotionCloseX} from '../header/AnimatedDropdown';

export default function CartDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {
    cartItems,
    loading: isLoading,
    totalPrice,
    isCartOpen,
    openCart,
    closeCart,
    itemCount,
  } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          closeCart();
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isCartOpen, closeCart]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeCart();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        className='relative flex items-center justify-center focus:outline-none group'
        onClick={() => (isCartOpen ? closeCart() : openCart())}
        aria-label='Visa varukorg'
      >
        <>
          {isLoading ? (
             <div className='flex items-center justify-center'>
             <SpinningLogo width='30' height='25' />
           </div>
          ) : (
            <PiBagSimpleThin
              size={28}
              strokeWidth={0.8}
              className='cursor-pointer'
            />
          )}

          {itemCount > 0 && (
            <span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pt-0.5 text-black text-sm font-medium'>
              {itemCount}
            </span>
          )}
          <span className='absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-500 bottom-full left-1/2 transform -translate-x-1/2 px-2 text-xs -mb-0.5 font-syne uppercase text-black'>
            Varukorg
          </span>
        </>
      </button>

      {/* Dropdown cart */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className='absolute -right-3 md:right-0 top-10.5  w-72 md:w-96 bg-white shadow-lg rounded-xs z-20 overflow-hidden '
            initial={{opacity: 0, y: -15}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -15}}
            transition={{duration: 0.3}}
          >
            <div className='border  border-gray-200 rounded-xs'>
              <div className='flex justify-between items-center p-3 border-b border-gray-100'>
                <h2 className='font-medium'>Din varukorg ({itemCount})</h2>
                <div aria-label='Stäng varukorg'>
                  <MotionCloseX onClick={closeCart} />
                </div>
              </div>

              {isLoading && (
                <div className='flex justify-center items-center p-8 z-50 bg-white'>
                  <SpinningLogo />
                </div>
              )}

              {!isLoading && cartItems.length === 0 && (
                <EmptyCart compact onCartClick={() => closeCart()} />
              )}

              {!isLoading && cartItems.length > 0 && (
                <>
                  <CartItems compact />
                  <CartSummary
                    totalPrice={totalPrice}
                    compact
                    onCartClick={() => closeCart()}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
