import {createServerClient} from '@supabase/ssr';
import {type NextRequest, NextResponse} from 'next/server';

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({name, value}) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({name, value, options}) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // Always use getUser() for security verification in middleware
    // This makes a secure request to the Supabase Auth server to verify the user
    const {data, error} = await supabase.auth.getUser();
    // console.log('data', data);
    if (error) {
      // console.error('Auth error in middleware:', error.message);
      return response;
    }

    // protected routes
    if (request.nextUrl.pathname.startsWith('/protected') && !data.user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Skydda profilsidor
    if (request.nextUrl.pathname.startsWith('/profile') && !data.user) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Förhindra inloggade användare från att komma åt autentiseringssidor
    if (
      (request.nextUrl.pathname === '/sign-in' ||
        request.nextUrl.pathname === '/sign-up' ||
        request.nextUrl.pathname === '/forgot-password') &&
      data.user
    ) {
      return NextResponse.redirect(new URL('/profile', request.url));
    }

    return response;
  } catch (e) {
    console.error('Middleware error:', e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
