import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/signup', '/auth/error', '/about', '/help'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for public routes (exact match or starting with the route)
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))) {
    return NextResponse.next();
  }
  
  // Skip middleware for Next.js internal routes, API routes, and static files
  if (
    pathname.includes('/_next') || 
    pathname.includes('/api/auth') ||
    pathname.includes('/static') || 
    pathname.includes('/images') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/) ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }
  
  try {
    // Check if user is authenticated
    const token = await getToken({ 
      req: request,
      cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
    });
    
    // For debugging
    console.log(`Auth check for ${pathname}, Token exists: ${!!token}`);
    
    // Allow the request if the user is authenticated
    if (token) {
      return NextResponse.next();
    }
    
    // Redirect to login if no token found
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(url);
  } catch (error) {
    console.error('Auth middleware error:', error);
    // Redirect to login on error
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api/auth/* (authentication API routes)
     * 2. /_next/* (Next.js internals)
     * 3. /static/* (static files)
     * 4. /images/* (image files)
     * 5. favicon.ico (browser favicon)
     */
    '/((?!api/auth|_next|static|images|favicon.ico).*)',
  ],
}; 