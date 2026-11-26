import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import ExploreTabs from '@/components/explore/ExploreTabs';
import { getLocaleDictionary } from '@/i18n/server';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Student Life & Boarding',
  description:
    'Student life at Mumbi Girls Senior School — clubs and uniformed movements, KSSSA sports, the 05:00–22:00 weekday boarding timetable, chaplaincy groups, photos of the boarding area, and the official school uniform.',
  path: '/explore',
});

export default async function ExplorePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const e = dict.explore;

  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="student-life"
        kicker={e.kicker}
        title={e.title}
        subtitle={e.subtitle}
        meta={[e.metaClubs, e.metaSports, e.metaRoutine, e.metaFaith]}
      />

      <div className="relative">
        <SectionStemBackdrop variant="student-life" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <ExploreTabs />
        </div>
      </div>
    </div>
  );
}