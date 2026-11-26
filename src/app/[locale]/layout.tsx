import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import UtilityBar from '@/components/layout/UtilityBar';
import MobileInstallBanner from '@/components/layout/MobileInstallBanner';
import ScrollRevealObserver from '@/components/shared/ScrollRevealObserver';
import { PwaProvider } from '@/components/pwa/PwaProvider';
import DynamicMarker from '@/components/shared/DynamicMarker';
import {
  isLocale,
  localeHtmlLang,
  locales,
  type Locale,
} from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { LocaleProvider } from '@/i18n/locale-context';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dict={dict}>
      <PwaProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-full focus:bg-primary-dark focus:text-white focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-2 focus:outline-white focus:outline-offset-2"
        >
          {dict.a11y.skipToContent}
        </a>

        <header
          data-dark-surface
          className="sticky top-0 z-40 w-full shrink-0 border-b border-primary-dark bg-primary"
          data-locale={localeHtmlLang[locale]}
        >
          <Header />
        </header>

        <main
          id="main-content"
          tabIndex={-1}
          className="relative z-0 w-full grow shrink-0 overflow-x-clip scroll-mt-28 focus:outline-none"
        >
          {children}
        </main>

        <UtilityBar />
        <Footer />
        <MobileInstallBanner />
        <ScrollRevealObserver />
        <DynamicMarker />
      </PwaProvider>
    </LocaleProvider>
  );
}
