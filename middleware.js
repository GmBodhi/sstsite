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
  '/api/',
  '/_next/',
  '/static/',
];

export function middleware(request) {
  const { pathname, search } = request.nextUrl;
  
  // Skip middleware for static assets, API routes, etc.
  if (pathname.includes('/_next/') || 
      pathname.includes('/static/') || 
      pathname.includes('/api/') ||
      pathname.includes('/favicon.ico')) {
    return NextResponse.next();
  }
  
  // If it's a public route, allow access without checking auth
  if (publicRoutes.some(route => pathname === route || pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check if the route is protected - exact match for /profile or starts with /e/ or /points
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route === '/profile') {
      return pathname === '/profile' || pathname.startsWith('/profile/');
    }
    return pathname.startsWith(route);
  });
  
  // If route doesn't need protection and isn't public, continue
  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // Get token from cookies
  const token = request.cookies.get('token')?.value;
  
  // If no token, redirect to login page with return URL
  if (!token) {
    // Store the current URL (including query parameters) as a returnUrl parameter
    const fullPath = pathname + search;
    const returnUrl = encodeURIComponent(fullPath);
    
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
    // Match all paths
    '/:path*',
    // Exclude specific paths that don't need middleware
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 