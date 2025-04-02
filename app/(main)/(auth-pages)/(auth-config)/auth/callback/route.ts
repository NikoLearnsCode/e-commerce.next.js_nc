import {createClient} from '@/utils/supabase/server';
import {NextResponse} from 'next/server';
import {transferCartOnLogin} from '@/actions/auth';
import {CART_SESSION_COOKIE} from '@/utils/cookies';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get('redirect_to')?.toString();

  let response: NextResponse;

  if (redirectTo) {
    response = NextResponse.redirect(`${origin}${redirectTo}`);
  } else {
    // URL to redirect to after sign up process completes - ändrad till startsidan
    response = NextResponse.redirect(`${origin}/`);
  }

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    // Hämta användarinformation efter att sessionen har skapats
    const {
      data: {user},
    } = await supabase.auth.getUser();

    // Om användaren finns, överför varukorgen från session till användare
    if (user) {
      console.log(
        'User authenticated via email confirmation, transferring cart'
      );
      await transferCartOnLogin(user.id);

      // Ta bort session_id-cookien efter överföringen genom att sätta utgångsdatum till förfluten tid
      // Detta är samma som görs i signInAction efter transferCartOnLogin
      response.cookies.set(CART_SESSION_COOKIE, '', {
        expires: new Date(0),
        path: '/',
      });
    }
  }

  return response;
}
