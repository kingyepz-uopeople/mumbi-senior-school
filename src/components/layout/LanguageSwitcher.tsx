'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  defaultLocale,
  isLocale,
  localeNames,
  locales,
  LOCALE_COOKIE,
  stripLocale,
  type Locale,
} from '@/i18n/config';
import { useLocale } from '@/i18n/locale-context';

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { locale, dict } = useLocale();
  const pathname = usePathname() || '/';
  const router = useRouter();
  const barePath = stripLocale(pathname);

  const switchTo = (next: Locale) => {
    if (next === locale) return;
    setLocaleCookie(next);
    const nextPath = barePath === '/' ? `/${next}` : `/${next}${barePath}`;
    router.push(nextPath);
  };

  return (
    <div
      role="group"
      aria-label={dict.meta.switchLanguage}
      className={`inline-flex items-center rounded-full border border-white/25 bg-primary-dark/40 p-0.5 ${
        compact ? 'text-[11px]' : 'text-xs'
      }`}
    >
      {locales.map((code) => {
        const selected = code === locale || (!isLocale(locale) && code === defaultLocale);
        return (
          <button
            key={code}
            type="button"
            aria-pressed={selected}
            onClick={() => switchTo(code)}
            className={`min-h-8 rounded-full px-2.5 py-1 font-semibold transition-colors ${
              selected
                ? 'bg-white text-primary'
                : 'text-white/85 hover:bg-white/10 hover:text-white'
            }`}
          >
            {compact ? code.toUpperCase() : localeNames[code]}
          </button>
        );
      })}
    </div>
  );
}
