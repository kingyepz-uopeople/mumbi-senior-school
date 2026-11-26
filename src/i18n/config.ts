export const locales = ['en', 'sw'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  sw: 'Kiswahili',
};

export const localeHtmlLang: Record<Locale, string> = {
  en: 'en',
  sw: 'sw',
};

export const localeOpenGraph: Record<Locale, string> = {
  en: 'en_KE',
  sw: 'sw_KE',
};

export const LOCALE_COOKIE = 'NEXT_LOCALE';

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

/** Strip a leading `/en` or `/sw` segment from a pathname. */
export function stripLocale(pathname: string): string {
  for (const locale of locales) {
    if (pathname === `/${locale}`) return '/';
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.slice(locale.length + 1) || '/';
    }
  }
  return pathname;
}

/** Prefix an internal href with the active locale. Hash and query are preserved. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith('/')) return href;

  const hashIndex = href.indexOf('#');
  const queryIndex = href.indexOf('?');
  let path = href;
  let suffix = '';

  if (hashIndex >= 0) {
    suffix = href.slice(hashIndex);
    path = href.slice(0, hashIndex);
  } else if (queryIndex >= 0) {
    suffix = href.slice(queryIndex);
    path = href.slice(0, queryIndex);
  }

  const bare = stripLocale(path || '/');
  const localized = bare === '/' ? `/${locale}` : `/${locale}${bare}`;
  return `${localized}${suffix}`;
}
