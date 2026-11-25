import type { Metadata } from 'next';
import CampusHero from '@/components/home/CampusHero';
import QuickStats from '@/components/home/QuickStats';
import ParentQuickLinks from '@/components/home/ParentQuickLinks';
import WelcomeMessages from '@/components/home/WelcomeMessages';
import FoundationalPillars from '@/components/home/FoundationalPillars';
import PathwaysPreview from '@/components/home/PathwaysPreview';
import WallOfFame from '@/components/home/WallOfFame';
import LatestNews from '@/components/home/LatestNews';
import { schoolInfo } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Mumbi Girls Senior School',
  description:
    `${schoolInfo.name} — ${schoolInfo.motto}. ${schoolInfo.category} in ${schoolInfo.physicalLocation}. Explore CBC pathways, KCSE results, and student life.`,
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <CampusHero />
      <QuickStats />
      <ParentQuickLinks />
      <WelcomeMessages />
      <FoundationalPillars />
      <PathwaysPreview />
      <WallOfFame />
      <LatestNews />
    </>
  );
}
