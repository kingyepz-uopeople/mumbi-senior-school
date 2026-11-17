import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import { PwaProvider } from '@/components/pwa/PwaProvider';
import TopUtilityBar from '@/components/layout/TopUtilityBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileInstallBanner from '@/components/layout/MobileInstallBanner';
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#800020',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Education for Empowerment`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Mumbi Girls Senior School — a C2 Public Girls' Boarding Senior School in Mukuyu, Kiharu, Murang'a County, Kenya. KNEC Code: 10204102, MoE Reg: F2030609.",
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
    title: `${SITE_NAME} | Education for Empowerment`,
    description:
      "A centre of excellence nurturing empowered girls who are innovative, morally upright, and globally competitive in Murang'a County, Kenya.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'en_KE',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Education for Empowerment`,
    description:
      "Official website and resource hub for Mumbi Girls Senior School (KNEC 10204102), Mukuyu, Murang'a County.",
    images: [DEFAULT_OG_IMAGE.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col bg-slate-bg text-slate-800">
        <PwaProvider>
          {/* Keyboard Skip-to-Content Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-maroon focus:text-white focus:font-bold focus:text-sm focus:shadow-2xl focus:outline-2 focus:outline-gold focus:outline-offset-2"
          >
            Skip to main content
          </a>

          {/* Unified Sticky Utility Bar + Primary Header (zero mobile gap) */}
          <header data-dark-surface className="sticky top-0 z-40 shadow-md">
            <TopUtilityBar />
            <Header />
          </header>

          <main
            id="main-content"
            tabIndex={-1}
            className="flex-1 focus:outline-none"
          >
            {children}
          </main>

          <Footer />
          <MobileInstallBanner />
        </PwaProvider>
      </body>
    </html>
  );
}
