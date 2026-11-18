import type { Metadata } from 'next';
import Link from 'next/link';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import DownloadsBrowser from '@/components/downloads/DownloadsBrowser';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Downloads & Circulars',
  description:
    'Official term circulars, school newsletters, holiday assignments, Grade 10 joining instructions, examination timetables, and fee structures from Mumbi Girls Senior School.',
  path: '/downloads',
});

export default function DownloadsPage() {
  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="downloads"
        kicker="School Documents"
        title="Downloads & Circulars"
        subtitle="Term opening circulars, Grade 10 joining instructions, the annual fee structure, examination timetables, newsletters, and departmental holiday assignments."
        meta={[
          `KNEC ${schoolInfo.knecCode}`,
          'Grades 10 – 12 & Forms 3 – 4',
          'Dates in DD/MM/YYYY',
        ]}
      />

      <div className="relative">
        <SectionStemBackdrop variant="downloads" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <p className="mb-6 border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
            <strong>Joining Grade 10?</strong> Use the{' '}
            <Link href="/admissions" className="font-semibold text-primary underline underline-offset-4">
              admissions guide
            </Link>{' '}
            for reporting and school fee information. Sample documents below are
            not current joining instructions.
          </p>
          <DownloadsBrowser />
        </div>
      </div>
    </div>
  );
}
