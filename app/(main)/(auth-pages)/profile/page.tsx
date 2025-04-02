import Link from 'next/link';
import {createClient} from '@/utils/supabase/server';
import {redirect} from 'next/navigation';
import {Metadata} from 'next';
import {Button} from '@/components/shared/button';
import {signOutAction} from '@/actions/auth';

export const metadata: Metadata = {
  title: 'Mitt konto',
};

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    // return redirect('/sign-in?callbackUrl=/profile');
    return redirect('/');
  }

  return (
    <div className=' py-8 font-syne uppercase'>
      <h1 className='text-2xl uppercase mb-12 border-b border-black w-fit '>Mitt konto</h1>
      <div className='flex flex-col space-y-8'>
        <Link
          href='/profile/information'
          className='text-lg font-medium hover:underline w-fit'
        >
          Mina uppgifter
        </Link>

        <Link
          href='/profile/orders'
          className='text-lg font-medium hover:underline w-fit'
        >
          Mina ordrar
        </Link>

        {/* <Link
          href='/profile/address'
          className='text-lg font-medium hover:underline w-fit'
        >
          Mina adresser
        </Link> */}

        <form action={signOutAction} className='mt-6'>
          <Button
            type='submit'
            variant='underline'
            className='uppercase text-base px-0  text-red-700 font-medium '
          >
            Logga ut
          </Button>
        </form>
      </div>
    </div>
  );
}
