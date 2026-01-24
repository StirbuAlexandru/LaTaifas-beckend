import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if accessing dashboard routes
  if (pathname.startsWith('/dashboard')) {
    const sessionCookie = request.cookies.get('admin_session');

    // If no session, redirect to login
    if (!sessionCookie) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      // Verify session is valid JSON
      JSON.parse(sessionCookie.value);
      return NextResponse.next();
    } catch {
      // Invalid session, redirect to login
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If logged in and trying to access login page, redirect to dashboard
  if (pathname === '/login') {
    const sessionCookie = request.cookies.get('admin_session');
    if (sessionCookie) {
      try {
        JSON.parse(sessionCookie.value);
        return NextResponse.redirect(new URL('/dashboard', request.url));
      } catch {
        // Invalid session, allow access to login
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
