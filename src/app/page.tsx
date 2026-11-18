import type { Metadata } from 'next';
import CampusHero from '@/components/home/CampusHero';
import QuickStats from '@/components/home/QuickStats';
import PrincipalWelcome from '@/components/home/PrincipalWelcome';
import FoundationalPillars from '@/components/home/FoundationalPillars';
import PathwaysPreview from '@/components/home/PathwaysPreview';
import WallOfFame from '@/components/home/WallOfFame';
import LatestNews from '@/components/home/LatestNews';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Mumbi Girls Senior School',
  description:
    "Mumbi Girls Senior School — Determined to Excel. C2 public girls' boarding senior school in Mukuyu Sub-location, Kiharu Constituency, Murang'a County, established in 1960 (KNEC 10204102, MoE F2030609). CBC Senior School pathways, KCSE results, student life, circulars, and downloads.",
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <CampusHero />
      <QuickStats />
      <PrincipalWelcome />
      <FoundationalPillars />
      <PathwaysPreview />
      <WallOfFame />
      <LatestNews />
    </>
  );
}
