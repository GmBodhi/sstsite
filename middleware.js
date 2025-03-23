import { NextResponse } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = [
  '/profile',
  '/e/',
  '/points',
];

// Routes that should not redirect to login when unauthenticated
const publicRoutes = [
  '/',
  '/login',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // If it's a public route, allow access without checking auth
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    return NextResponse.next();
  }
  
  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  // If route doesn't need protection and isn't public, continue
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If no token, redirect to login page with return URL
  if (!token) {
    // Store the current URL as a query parameter to redirect back after login
    const returnUrl = encodeURIComponent(request.nextUrl.pathname);
    
    // Create URL for the login page
    const loginUrl = new URL(`/login?returnUrl=${returnUrl}`, request.url);
    
    // Return response that redirects to login page
    return NextResponse.redirect(loginUrl);
  }
  
  // If token exists, continue
  return NextResponse.next();
}

// Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Paths that the middleware will run on
    '/profile/:path*',
    '/e/:path*',
    '/points/:path*',
  ],
}; 