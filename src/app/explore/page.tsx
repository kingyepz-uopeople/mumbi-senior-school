import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import ExploreTabs from '@/components/explore/ExploreTabs';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Student Life & Boarding',
  description:
    'Student life at Mumbi Girls Senior School — clubs and uniformed movements, KSSSA sports, the 05:00–22:00 weekday boarding timetable, chaplaincy groups, dining hall, and official school uniform.',
  path: '/explore',
});

export default function ExplorePage() {
  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="student-life"
        kicker="Boarding & Co-Curricular Life"
        title="Student Life at Mumbi Girls"
        subtitle="Uniformed movements and clubs, afternoon games, the 05:00 to 22:00 weekday boarding timetable, school chaplaincy, dining, and uniform guidelines."
        meta={[
          '7 Clubs & Movements',
          '6 KSSSA Sports',
          '05:00 – 22:00 Weekday Routine',
          '4 Faith Fellowships',
        ]}
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
