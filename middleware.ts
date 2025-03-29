import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/error'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a public route
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/api/'))) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated
  const token = await getToken({ req: request });
  
  // Redirect to login if no token found
  if (!token) {
    const url = new URL(`/auth/login`, request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    // Match all paths except public assets, api routes that handle their own auth
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 