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

    // Refresh session if expired - Reads from cookies first, minimizing network calls
    const {
      data: {session},
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error('Session error in middleware:', error.message);
      // Potentially handle specific errors, but generally allow request to proceed
      // unless it's a critical auth failure preventing session refresh.
    }

    // NOTE: 'session' might be null even if the user was previously logged in,
    // if the session expired and couldn't be refreshed.

    // protected routes - check if session exists
    if (request.nextUrl.pathname.startsWith('/protected') && !session) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Skydda profilsidor - check if session exists
    if (request.nextUrl.pathname.startsWith('/profile') && !session) {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Förhindra inloggade användare (med aktiv session) från att komma åt autentiseringssidor
    if (
      (request.nextUrl.pathname === '/sign-in' ||
        request.nextUrl.pathname === '/sign-up' ||
        request.nextUrl.pathname === '/forgot-password') &&
      session // Check if a session exists
    ) {
      return NextResponse.redirect(new URL('/profile', request.url)); // Redirect logged-in users away from auth pages
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
