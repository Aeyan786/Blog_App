import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/articles',
  '/articles/:id*',
  '/api/public(.*)',
  '/sign-in(.*)',     
  '/sign-up(.*)',      
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
