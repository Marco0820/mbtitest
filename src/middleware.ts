import { locales, defaultLocale } from '@root/i18n.config';
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  
  // Used when no locale matches
  defaultLocale,

  localePrefix: 'always'
});

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    '/(en|zh|zh-CN|zh-TW|es|ar|pt|ja|ru|fr|de|ko|hi|tr|vi|th|it|ur|pl|id|nl|fa)/:path*',

    // Enable redirects that add a locale prefix
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|api|.*\\..*).*)'
  ]
};