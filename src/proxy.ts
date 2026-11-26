import { NextResponse, type NextRequest } from 'next/server';
import { newsItems } from '@/data/mock-school-data';
import {
  defaultLocale,
  isLocale,
  LOCALE_COOKIE,
  locales,
  type Locale,
} from '@/i18n/config';

const publishedSlugs = new Set(newsItems.map(({ slug }) => slug));

function negotiateLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isLocale(cookieLocale)) return cookieLocale;

  const header = request.headers.get('accept-language') ?? '';
  const preferred = header
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean);

  for (const tag of preferred) {
    if (tag === 'sw' || tag.startsWith('sw-')) return 'sw';
    if (tag === 'en' || tag.startsWith('en-')) return 'en';
  }

  return defaultLocale;
}

function withLocaleHeader(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);
  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next internals and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const pathnameLocale = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!pathnameLocale) {
    const locale = negotiateLocale(request);
    const url = request.nextUrl.clone();
    url.pathname =
      pathname === '/' ? `/${locale}` : `/${locale}${pathname}`;
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    });
    return response;
  }

  // Unknown news slug guard: /{locale}/news/:slug
  const newsMatch = pathname.match(/^\/(en|sw)\/news\/([^/]+)\/?$/);
  if (newsMatch) {
    const slug = newsMatch[2];
    try {
      if (!publishedSlugs.has(decodeURIComponent(slug))) {
        return NextResponse.rewrite(new URL('/404', request.url), {
          status: 404,
        });
      }
    } catch {
      return NextResponse.rewrite(new URL('/404', request.url), {
        status: 404,
      });
    }
  }

  const response = withLocaleHeader(request, pathnameLocale);
  response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\..*).*)'],
};
