import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import DownloadsBrowser from '@/components/downloads/DownloadsBrowser';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Downloads & Circulars',
  description:
    'Term circulars, Grade 10 joining instructions, the fee structure, examination timetables, newsletters, and departmental holiday assignments from Mumbi Girls Senior School.',
  path: '/downloads',
});

export default function DownloadsPage() {
  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            School Documents
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Downloads &amp; Circulars
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            Term opening circulars, Grade 10 joining instructions, the annual fee
            structure, examination timetables, newsletters, and departmental
            holiday assignments. Filter by type, then open a file to download it.
          </p>

          <div className="mt-10 sm:mt-12">
            <DownloadsBrowser />
          </div>

          <p className="mt-10 border-t border-white/15 pt-6 text-sm leading-relaxed text-blue-100/85">
            Joining Grade 10? Read the{' '}
            <Link
              href="/admissions"
              className="font-semibold text-white underline underline-offset-4 hover:text-blue-100"
            >
              admissions guide
            </Link>{' '}
            for reporting and school fees.
          </p>
        </div>
      </section>
    </div>
  );
}
