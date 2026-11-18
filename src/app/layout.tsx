import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { PwaProvider } from '@/components/pwa/PwaProvider';
import TopUtilityBar from '@/components/layout/TopUtilityBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileInstallBanner from '@/components/layout/MobileInstallBanner';
import ScrollRevealObserver from '@/components/shared/ScrollRevealObserver';
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Mukuyu, Murang'a County`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Mumbi Girls Senior School — Determined to Excel. C2 public girls' boarding senior school in Mukuyu Sub-location, Kiharu Constituency, Murang'a County, established in 1960. KNEC 10204102, MoE F2030609.",
  keywords: [
    'Mumbi Girls Senior School',
    'KNEC 10204102',
    'MoE F2030609',
    "Murang'a",
    'Mukuyu',
    'Kiharu',
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
    description:
      "Determined to Excel — C2 public girls' boarding senior school in Mukuyu, Kiharu, Murang'a County, Kenya. Established 1960. KNEC 10204102, MoE F2030609.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_KE',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Determined to Excel`,
    description:
      "Mumbi Girls Senior School — Determined to Excel. Mukuyu, Murang'a County (Est. 1960, KNEC 10204102). CBC Senior School pathways, circulars, and downloads.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${sourceSerif.variable} antialiased font-sans`}
    >
      <body className="min-h-dvh flex flex-col bg-slate-bg text-slate-800">
        <PwaProvider>
          {/* Keyboard Skip-to-Content Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-sm focus:bg-primary-dark focus:text-white focus:font-semibold focus:text-sm focus:shadow-lg focus:outline-2 focus:outline-white focus:outline-offset-2"
          >
            Skip to main content
          </a>

          {/* Unified Sticky Utility Bar + Primary Header */}
          <header
            data-dark-surface
            className="sticky top-0 z-40 shrink-0 w-full bg-primary border-b border-primary-dark"
          >
            <TopUtilityBar />
            <Header />
          </header>

          <main
            id="main-content"
            tabIndex={-1}
            className="relative z-0 grow shrink-0 w-full overflow-x-clip scroll-mt-28 focus:outline-none"
          >
            {children}
          </main>

          <Footer />
          <MobileInstallBanner />
          <ScrollRevealObserver />
        </PwaProvider>
      </body>
    </html>
  );
}
