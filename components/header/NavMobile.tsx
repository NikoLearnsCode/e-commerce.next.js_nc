'use client';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {NavLink} from './NavLinks';
import {AlignJustify} from 'lucide-react';
import {AnimatePresence} from 'framer-motion';
import {
  MotionDropdown,
  MotionOverlay,
  MotionCloseX,
} from '@/components/header/AnimatedDropdown';

interface MobileNavProps {
  navLinks: NavLink[];
}

export default function MobileNav({navLinks}: MobileNavProps) {
  const pathname = usePathname();

  // Hitta index för den kategori som matchar nuvarande URL
  const findInitialCategory = () => {
    for (let i = 0; i < navLinks.length; i++) {
      if (
        (navLinks[i].href === '/' && pathname === '/') ||
        (navLinks[i].href !== '/' && pathname.startsWith(navLinks[i].href))
      ) {
        return i;
      }
    }
    return 0;
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(findInitialCategory);

  // Funktion för att kontrollera om denna länk är den aktuella sidan
  // const isActivePath = (href: string) => {
  //   if (href === '/' && pathname === '/') {
  //     return true;
  //   }
  //   return href !== '/' && pathname.startsWith(href);
  // };

  // Växla huvudmenyn och hantera scrollning
  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  // Stäng hela menyn
  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  };

  // Ändra aktiv kategori
  const changeCategory = (index: number) => {
    setActiveCategory(index);
  };

  // Uppdatera aktiv kategori när URL ändras
  useEffect(() => {
    setActiveCategory(findInitialCategory());
  }, [pathname]);


  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);


  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth >= 768) {
        document.body.style.overflow = '';
        closeMenu();
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Återställ overflow vid unmount
  // useEffect(() => {
  //   return () => {
  //     document.body.style.overflow = '';
  //   };
  // }, []);

  return (
    <div className='relative uppercase font-medium'>
 
      <button
        onClick={toggleMenu}
        className='flex items-center group relative focus:outline-none cursor-pointer'
        aria-label={isMenuOpen ? 'Stäng meny' : 'Öppna meny'}
      >
        <AlignJustify
          size={28}
          strokeWidth={1}
          // absoluteStrokeWidth
          className='text-black '
        />

        <span className='absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-500 bottom-full left-1/2 transform -translate-x-1/2 px-2 text-xs -mb-0.5 font-syne uppercase text-black whitespace-nowrap'>
          Meny
        </span>
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <MotionOverlay key='mobile-overlay' />

            <MotionDropdown
              position='left'
              key='mobile-dropdown'
              isMobile={true}
              className='overflow-y-auto'
            >
              {/* Huvudkategorier och stängningsknapp */}
              <div className='flex  uppercase px-4 pr-6 text-sm  font-semibold font-syne py-4 items-center justify-between'>
                <div className='flex  bg-white p-[20px] fixed top-0 left-0 w-full '>
                  {navLinks.map((link, index) => (
                    <div
                      key={link.title}
                      onClick={() => changeCategory(index)}
                      className={`mx-3 cursor-pointer transition duration-300   ${
                        activeCategory === index
                          ? 'text-black border-b border-black'
                          : 'text-gray-500 '
                      }`}
                    >
                      {link.title}
                    </div>
                  ))}
                </div>
                <div className='absolute top-5 right-7'>
                  <MotionCloseX onClick={closeMenu} size={22} strokeWidth={1} />
                </div>
              </div>

              {/* Undermeny för aktiv kategori */}
              <div className='p-4 pt-12 space-y-4 text-sm'>
                {navLinks[activeCategory]?.subLinks?.map((subLink) => (
                  <div key={subLink.title} className='not-first:pt-2'>
                    <Link
                      href={subLink.href}
                      className={`block mx-4   border-b border-transparent hover:border-b hover:border-black w-fit transition ${
                        subLink.title === 'ERBJUDANDEN'
                          ? 'text-red-600 hover:border-red-600'
                          : ''
                      } `}
                      onClick={closeMenu}
                    >
                      {subLink.title}
                    </Link>
                  </div>
                ))}
              </div>
            </MotionDropdown>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
