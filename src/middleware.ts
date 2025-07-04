import { locales, defaultLocale } from '@root/i18n.config';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,

  localePrefix: 'always'
});

export const config = {
  // Match all requests except API routes, static files, and Next.js internals
  matcher: [
    '/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)',
    '/(en|zh-CN|zh-TW|es|ar|pt|ja|ru|fr|de|ko|hi|tr|vi|th|it|ur|pl|id|nl|fa)/:path*'
  ]
};