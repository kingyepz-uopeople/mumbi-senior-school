import type { Metadata } from 'next';
import DownloadsBrowser from '@/components/downloads/DownloadsBrowser';
import LocaleLink from '@/i18n/LocaleLink';
import { getLocaleDictionary } from '@/i18n/server';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Downloads & Circulars',
  description:
    'Term circulars, Grade 10 joining instructions, the fee structure, examination timetables, newsletters, and departmental holiday assignments from Mumbi Girls Senior School.',
  path: '/downloads',
});

export default async function DownloadsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const d = dict.downloads;

  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            {d.kicker}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {d.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            {d.subtitle}
          </p>

          <div className="mt-10 sm:mt-12">
            <DownloadsBrowser />
          </div>

          <p className="mt-10 border-t border-white/15 pt-6 text-sm leading-relaxed text-blue-100/85">
            {d.joiningGrade10}{' '}
            <LocaleLink
              href="/admissions"
              className="font-semibold text-white underline underline-offset-4 hover:text-blue-100"
            >
              {d.admissionsGuide}
            </LocaleLink>{' '}
            for reporting and school fees.
          </p>
        </div>
      </section>
    </div>
  );
}