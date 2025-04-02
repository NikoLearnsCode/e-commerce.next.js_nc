import {motion} from 'framer-motion';
import {ReactNode} from 'react';

interface AnimatedAuthContainerProps {
  children: ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  className?: string;
}

const AnimatedAuthContainer = ({
  children,
  direction = 'right',
  duration = 0.3,
  className = 'w-full max-w-md mx-auto',
}: AnimatedAuthContainerProps) => {
  const variants = {
    initial: {
      opacity: 0,
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
    },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
    },
    exit: {
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? -100 : direction === 'down' ? 100 : 0,
    },
  };

  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
      transition={{
        type: 'tween',
        ease: 'easeInOut',
        duration: duration,
      }}
      className={className} 
    >
      {children}
    </motion.div>
  );
};

export default AnimatedAuthContainer;
