import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from '../i18n.config';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale
});

export const config = {
  // Match all requests except API routes, static files, and Next.js internals
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']
};