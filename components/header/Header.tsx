'use client';

import Logo from '@/components/shared/Logo';
import NavLinks from './NavLinks';
import SearchBar from './SearchBar';
import UserButton from './UserButton';

import HeaderCartDropdown from '@/components/cart/HeaderCartDropdown';

export default function Header() {
  return (
    <div className='fixed w-full top-0 z-40 text-black '>
      <div className='flex justify-between items-center px-8 h-14 bg-white'>
        <div className='flex gap-5 items-center '>
          <NavLinks />
          <div className=' md:absolute md:left-1/2 md:transform md:-translate-x-1/2'>
            <Logo />
          </div>
        </div>

        <div className='flex space-x-5 items-center justify-center'>
          <SearchBar />
          <UserButton />
          <HeaderCartDropdown />
        </div>
      </div>
    </div>
  );
}
