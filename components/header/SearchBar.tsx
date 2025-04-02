'use client';

// SearchBar.tsx
import React, {useState, useRef, useEffect} from 'react';
import {Search} from 'lucide-react';
import {motion, AnimatePresence} from 'framer-motion';
import {useRouter} from 'next/navigation';
import {MotionCloseX} from './AnimatedDropdown';

export default function SearchBar() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsExpanded(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsExpanded(false);
      setSearchQuery('');
    }
  };

  if (!isMounted) {
    return (
      <div>
        <Search size={28} strokeWidth={1} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className='relative items-center flex '>
      <AnimatePresence>
        {isExpanded ? (
          <motion.form
            initial={{width: '26px', opacity: 0.5, right: 0}}
            animate={{width: 'calc(100vw - 160px)', opacity: 1, right: 0}}
            exit={{width: '50px', opacity: 0, right: 0}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
            className='flex items-center justify-center absolute right-0 z-45'
            onSubmit={handleSubmit}
            style={{
              position: 'absolute',
              top: -22,
              right: 0,
              zIndex: 50,
            }}
          >
            <button
              type='submit'
              className='absolute left-0 ml-1 text-gray-800 cursor-pointer'
            >
              <Search size={24} strokeWidth={1.25} />
            </button>

            <input
              ref={inputRef}
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='SÖK'
              className='w-full pl-9 pr-12 p-1 mt-2 mb-1 placeholder:text-gray-900 bg-white outline-none border-b  border-gray-900 '
              autoComplete='off'
            />
            <div
              className='absolute right-6 bottom-1.5  '
              aria-label='Close search'
            >
              <MotionCloseX
                onClick={() => setIsExpanded(false)}
                size={20}
                strokeWidth={1}
                className='z-50'
                withTranslate={true}
              />
            </div>
          </motion.form>
        ) : (
          <button
            onClick={() => setIsExpanded(true)}
            className=' transition-colors relative z-10 cursor-pointer group'
            aria-label='Search'
          >
            <Search size={28} strokeWidth={1} />
            <span className='absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-500 bottom-full left-1/2 transform -translate-x-1/2 px-2 -mb-1  text-xs uppercase text-black whitespace-nowrap z-50'>
              Sök
            </span>
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
