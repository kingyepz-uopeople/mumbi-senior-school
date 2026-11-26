import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import localFont from 'next/font/local';
import './globals.css';

import { schoolInfo } from '@/data/mock-school-data';
import {
  defaultLocale,
  isLocale,
  localeHtmlLang,
  LOCALE_COOKIE,
  type Locale,
} from '@/i18n/config';
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from '@/lib/site';

const inter = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-italic.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = localFont({
  src: [
    {
      path: '../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2',
      weight: '200 900',
      style: 'normal',
    },
    {
      path: '../../node_modules/@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-italic.woff2',
      weight: '200 900',
      style: 'italic',
    },
  ],
  variable: '--font-source-serif',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#115191',
};

const schoolDescription = `${SITE_NAME} — ${schoolInfo.motto}. ${schoolInfo.category} in ${schoolInfo.physicalLocation}. Foundation stone laid ${schoolInfo.foundedOn} by ${schoolInfo.founder}. KNEC ${schoolInfo.knecCode}, MoE ${schoolInfo.moeReg}.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | ${schoolInfo.locationShort}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: schoolDescription,
  keywords: [
    'Mumbi Girls Senior School',
    'KNEC 10204102',
    'MoE F2030609',
    schoolInfo.locationShort,
    'Mumbi area',
    'Mjini Primary School',
    'Kenya senior school',
    'girls boarding school',
    'CBC pathways',
    'KCSE',
  ],
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Mumbi Portal',
  },
  openGraph: {
    title: `${SITE_NAME} | Determined to Excel`,
    description: schoolDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_KE',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Determined to Excel`,
    description: schoolDescription,
    images: [DEFAULT_OG_IMAGE.url],
  },
};

async function resolveLocale(): Promise<Locale> {
  const headerStore = await headers();
  const fromHeader = headerStore.get('x-locale');
  if (fromHeader && isLocale(fromHeader)) return fromHeader;

  const cookie = headerStore.get('cookie') ?? '';
  const match = cookie.match(new RegExp(`${LOCALE_COOKIE}=([^;]+)`));
  if (match?.[1] && isLocale(match[1])) return match[1];

  return defaultLocale;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await resolveLocale();

  return (
    <html
      lang={localeHtmlLang[locale]}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sourceSerif.variable} antialiased font-sans`}
    >
      <body className="flex min-h-dvh flex-col bg-slate-bg text-slate-800">
        {children}
      </body>
    </html>
  );
}
