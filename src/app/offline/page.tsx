import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Home, WifiOff } from 'lucide-react';
import OfflineRetryButton from '@/components/pwa/OfflineRetryButton';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'You Are Offline',
  description:
    'Offline fallback page for Mumbi Girls Senior School with essential official contact and registration details.',
  path: '/offline',
  noIndex: true,
});

export default function OfflinePage() {
  return (
    <div className="bg-slate-bg py-14 sm:py-20 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 border-t-4 border-t-maroon p-6 sm:p-10 shadow-sm text-center space-y-6">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/images/school-crest.png"
            alt="Mumbi Girls Senior School crest"
            width={56}
            height={56}
            sizes="56px"
            className="w-14 h-14 object-contain"
          />
          <div className="w-14 h-14 rounded-2xl bg-maroon/10 text-maroon flex items-center justify-center">
            <WifiOff className="w-7 h-7" aria-hidden="true" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-maroon">
            No Internet Connection
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            You Are Currently Offline
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            This page could not be loaded because your device appears to be
            disconnected from the internet. Check your mobile data or Wi-Fi
            connection and try again.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
          <OfflineRetryButton />
          <Link
            href="/"
            className="w-full sm:w-auto min-h-12 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-maroon text-maroon hover:bg-maroon hover:text-white text-sm font-bold transition-colors"
          >
            <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* Essential Offline Reference Card */}
        <section
          aria-labelledby="offline-school-details"
          className="text-left bg-slate-bg rounded-2xl border border-slate-200 p-5 space-y-2 text-xs sm:text-sm text-slate-700"
        >
          <h2
            id="offline-school-details"
            className="font-bold text-sm sm:text-base text-slate-900"
          >
            {schoolInfo.name} — Quick Reference
          </h2>
          <p>
            <strong className="text-slate-900">Codes:</strong> KNEC{' '}
            {schoolInfo.knecCode} • MoE {schoolInfo.moeReg}
          </p>
          <p>
            <strong className="text-slate-900">Postal Address:</strong>{' '}
            {schoolInfo.postalAddress}
          </p>
          <p>
            <strong className="text-slate-900">Location:</strong>{' '}
            {schoolInfo.physicalLocation}
          </p>
          <p>
            <strong className="text-slate-900">Office Hours:</strong>{' '}
            {schoolInfo.officeHours}
          </p>
        </section>
      </div>
    </div>
  );
}
