'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  LOCALE_COOKIE,
  stripLocale,
  type Locale,
} from '@/i18n/config';
import { useLocale } from '@/i18n/locale-context';

function setLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;samesite=lax`;
}

function EnglishFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="16" r="16" fill="#012169" />
      <path
        d="M16 0 32 8.5V0H16Zm0 0L0 8.5V0h16ZM0 23.5 16 32H0v-8.5Zm32 0L16 32h16v-8.5Z"
        fill="#fff"
      />
      <path
        d="M16 0 32 8.5V4.2L19.2 0H16Zm0 0L0 8.5V4.2L12.8 0H16ZM0 23.5 16 32h-3.2L0 27.8v-4.3Zm32 0L16 32h3.2L32 27.8v-4.3Z"
        fill="#C8102E"
      />
      <path d="M0 12h32v8H0z" fill="#fff" />
      <path d="M12 0h8v32h-8z" fill="#fff" />
      <path d="M0 13.5h32v5H0z" fill="#C8102E" />
      <path d="M13.5 0h5v32h-5z" fill="#C8102E" />
    </svg>
  );
}

function KenyaFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="16" cy="16" r="16" fill="#fff" />
      <path
        d="M16 0a16 16 0 0 1 13.856 8H2.144A16 16 0 0 1 16 0Z"
        fill="#000"
      />
      <path
        d="M2.144 8h27.712A16 16 0 0 1 29.856 24H2.144A16 16 0 0 1 2.144 8Z"
        fill="#BB0000"
      />
      <path
        d="M2.144 24H29.856A16 16 0 0 1 16 32 16 16 0 0 1 2.144 24Z"
        fill="#006600"
      />
      <path
        d="M16 7.5c2.8 0 4.8 2.4 4.8 8.5s-2 8.5-4.8 8.5-4.8-2.4-4.8-8.5 2-8.5 4.8-8.5Z"
        fill="#fff"
      />
      <path
        d="M16 9c1.9 0 3.3 1.9 3.3 7s-1.4 7-3.3 7-3.3-1.9-3.3-7 1.4-7 3.3-7Z"
        fill="#000"
      />
      <path
        d="M12.2 14.2 16 16l3.8-1.8M12.2 17.8 16 16l3.8 1.8"
        stroke="#BB0000"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
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
  const isSw = locale === 'sw';
  const nextLocale: Locale = isSw ? 'en' : 'sw';

  const switchLocale = () => {
    setLocaleCookie(nextLocale);
    const nextPath =
      barePath === '/' ? `/${nextLocale}` : `/${nextLocale}${barePath}`;
    router.push(nextPath);
  };

  const label = isSw ? 'SW' : 'EN';
  const nextName = isSw ? dict.common.english : dict.common.kiswahili;

  return (
    <button
      type="button"
      onClick={switchLocale}
      aria-label={`${dict.meta.switchLanguage}: ${nextName}`}
      title={nextName}
      className={`lang-toggle ${compact ? 'lang-toggle--compact' : ''}`}
    >
      <span className="lang-toggle__track" data-locale={locale}>
        <span className="lang-toggle__code lang-toggle__code--start">EN</span>
        <span className="lang-toggle__knob" aria-hidden="true">
          {isSw ? (
            <KenyaFlag className="lang-toggle__flag" />
          ) : (
            <EnglishFlag className="lang-toggle__flag" />
          )}
        </span>
        <span className="lang-toggle__code lang-toggle__code--end">SW</span>
        <span className="sr-only">{label}</span>
      </span>
    </button>
  );
}
