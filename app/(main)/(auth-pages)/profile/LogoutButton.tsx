'use client';

import {useTransition} from 'react';
import {signOutAction} from '@/actions/auth';
import {Button} from '@/components/shared/button';
import {Loader2} from 'lucide-react';
import {twMerge} from 'tailwind-merge';

// Define props if needed in the future, for now just className
interface LogoutButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function LogoutButton({className, ...props}: LogoutButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await signOutAction();
      // Redirect handled by the action itself
    });
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant='underline' // Keep the original variant
      className={twMerge(
        'uppercase text-sm px-0 text-red-700 font-medium', // Original classes
        'flex items-center gap-2', // Add flex for loader alignment
        className // Allow overriding classes
      )}
      {...props}
    >
      {isPending ? (
        <>
          Loggar ut {''} 
          <Loader2 className='h-4 w-4 animate-spin' />
        </>
      ) : (
        'Logga ut'
      )}
    </Button>
  );
}
