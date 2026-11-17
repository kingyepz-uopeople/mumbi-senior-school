import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import TopUtilityBar from '@/components/layout/TopUtilityBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileInstallBanner from '@/components/layout/MobileInstallBanner';

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
  themeColor: '#800020',
};

export const metadata: Metadata = {
  title: 'Mumbi Girls Senior School | Education for Empowerment',
  description:
    'Mumbi Girls Senior School — a centre of excellence nurturing empowered girls who are innovative, morally upright, and globally competitive. KNEC Code: 10204102. Located in Murang\'a County, Kenya.',
  keywords: [
    'Mumbi Girls Senior School',
    'KNEC 10204102',
    'Murang\'a',
    'Kenya secondary school',
    'girls school',
    'CBC',
    'KCSE',
  ],
  openGraph: {
    title: 'Mumbi Girls Senior School | Education for Empowerment',
    description:
      'A centre of excellence nurturing empowered girls who are innovative, morally upright, and globally competitive.',
    url: 'https://mumbiseniorschool.sc.ke',
    siteName: 'Mumbi Girls Senior School',
    locale: 'en_KE',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col bg-[#F8FAFC] text-slate-800">
        <TopUtilityBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileInstallBanner />
      </body>
    </html>
  );
}
