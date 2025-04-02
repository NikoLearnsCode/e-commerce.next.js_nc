import {createClient} from '@/utils/supabase/server';
import {InfoIcon} from 'lucide-react';
import {redirect} from 'next/navigation';
import {signOutAction} from '@/actions/auth';
import {Button} from '@/components/shared/button';
import Link from 'next/link';

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: {user},
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  return (
    <div className='flex-1 w-full flex flex-col gap-12'>
      <div className='w-full'>
        <div className='bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center'>
          <InfoIcon size='16' strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className='flex flex-col gap-2 items-start'>
        <h2 className='font-bold text-2xl mb-4'>Your user details</h2>
        <pre className='text-xs font-mono p-3 rounded border max-h-32 overflow-auto'>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <h2 className='font-bold text-2xl mb-4'>Next steps</h2>
        <div className='flex gap-4'>
          <form action={signOutAction}>
            <Button type='submit' variant='outline'>
              Logga ut
            </Button>
          </form>
          <Link href='/'>
            <Button variant='secondary'>Tillbaka till startsidan</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// import { createClient } from '@/utils/supabase/server';
// import { InfoIcon } from 'lucide-react';
// import { redirect } from 'next/navigation';
// import { signOutAction } from '@/actions/auth';
// import { updateProfileAction } from '@/actions/profile';
// import { Button } from '@/components/ui/button';
// import Link from 'next/link';
// import { FloatingLabelInput } from '@/components/ui/floatingLabelInput';

// export default async function ProtectedPage({ searchParams }: { searchParams: { error?: string, success?: string } }) {
//   const supabase = await createClient();
//   const error = searchParams.error;
//   const success = searchParams.success;

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (!user) {
//     return redirect('/sign-in');
//   }

//   // Användarens metadata
//   const firstName = user.user_metadata?.first_name || '';
//   const lastName = user.user_metadata?.last_name || '';

//   return (
//     <div className='flex-1 w-full flex flex-col gap-12 max-w-4xl mx-auto p-4'>
//       <div className='w-full'>
//         <div className='bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center'>
//           <InfoIcon size='16' strokeWidth={2} />
//           Välkommen till din profilsida. Här kan du uppdatera din information.
//         </div>
//       </div>

//       {error && (
//         <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded'>
//           {decodeURIComponent(error)}
//         </div>
//       )}

//       {success && (
//         <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded'>
//           {decodeURIComponent(success)}
//         </div>
//       )}

//       <div className='border rounded-lg p-6 shadow-sm'>
//         <h2 className='font-bold text-2xl mb-6'>Din profilinformation</h2>

//         <form action={updateProfileAction} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <FloatingLabelInput
//                 id="firstName"
//                 name="firstName"
//                 label="Förnamn"
//                 type="text"
//                 defaultValue={firstName}
//               />
//             </div>
//             <div>
//               <FloatingLabelInput
//                 id="lastName"
//                 name="lastName"
//                 label="Efternamn"
//                 type="text"
//                 defaultValue={lastName}
//               />
//             </div>
//           </div>

//           <div>
//             <FloatingLabelInput
//               id="email"
//               label="E-postadress"
//               type="email"
//               value={user.email}
//               disabled
//             />
//             <p className="text-xs text-gray-500 mt-1">
//               E-postadressen kan inte ändras.
//             </p>
//           </div>

//           <div className="flex justify-end">
//             <Button type="submit">Spara ändringar</Button>
//           </div>
//         </form>
//       </div>

//       <div className="border rounded-lg p-6 shadow-sm">
//         <h2 className='font-bold text-2xl mb-4'>Kontoinformation</h2>
//         <div className='text-sm mb-4'>
//           <p><strong>Användare-ID:</strong> {user.id}</p>
//           <p><strong>Senaste inloggning:</strong> {new Date(user.last_sign_in_at || '').toLocaleString('sv-SE')}</p>
//           <p><strong>Konto skapat:</strong> {new Date(user.created_at || '').toLocaleString('sv-SE')}</p>
//         </div>

//         <div className='flex gap-4'>
//           <form action={signOutAction}>
//             <Button type="submit" variant="outline">Logga ut</Button>
//           </form>
//           <Link href="/">
//             <Button variant="secondary">Tillbaka till startsidan</Button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
