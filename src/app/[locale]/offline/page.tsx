import type { Metadata } from 'next';
import Image from 'next/image';
import OfflineRetryButton from '@/components/pwa/OfflineRetryButton';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import LocaleLink from '@/i18n/LocaleLink';
import { fill, getLocaleDictionary } from '@/i18n/server';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Offline',
  description:
    'Offline fallback page for Mumbi Girls Senior School with official address, office hours, and registration details.',
  path: '/offline',
  noIndex: true,
});

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const o = dict.offline;

  return (
    <div className="relative bg-slate-bg py-14 sm:py-20 px-4 sm:px-6">
      <SectionStemBackdrop variant="notices" />
      <div className="relative max-w-2xl mx-auto bg-white/55 border border-slate-200 border-t-2 border-t-primary p-6 sm:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <Image
            src="/images/mumbi-logo.png"
            alt="Mumbi Girls' Senior School crest"
            width={56}
            height={57}
            sizes="56px"
            className="w-14 h-14 rounded-xs bg-[#f7f7f7] border border-slate-200 p-1 object-contain shrink-0"
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent mb-1">
              {o.title}
            </p>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              {o.heading}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {o.body}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <OfflineRetryButton />
          <LocaleLink
            href="/"
            className="w-full sm:w-auto min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold transition-colors"
          >
            {o.returnHome}
          </LocaleLink>
        </div>

        {/* School Office Quick Reference */}
        <section
          aria-labelledby="offline-school-details"
          className="pt-6 border-t border-slate-200 space-y-3"
        >
          <h2
            id="offline-school-details"
            className="font-serif text-lg font-bold text-slate-900"
          >
            {fill(o.officeDetails, { name: schoolInfo.name })}
          </h2>
          <dl className="divide-y divide-slate-200 text-xs sm:text-sm text-slate-700">
            <div className="py-2 tabular-nums">
              <dt className="inline font-semibold text-slate-900">
                {o.registration}{' '}
              </dt>
              <dd className="inline">
                KNEC {schoolInfo.knecCode} · MoE {schoolInfo.moeReg}
              </dd>
            </div>
            <div className="py-2">
              <dt className="inline font-semibold text-slate-900">
                {o.postalAddress}{' '}
              </dt>
              <dd className="inline">{schoolInfo.postalAddress}</dd>
            </div>
            <div className="py-2">
              <dt className="inline font-semibold text-slate-900">
                {o.location}{' '}
              </dt>
              <dd className="inline">{schoolInfo.physicalLocation}</dd>
            </div>
            <div className="py-2">
              <dt className="inline font-semibold text-slate-900">
                {o.officeHours}{' '}
              </dt>
              <dd className="inline">{schoolInfo.officeHours}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}