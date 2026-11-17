import type { Metadata } from 'next';
import HeroCarousel from '@/components/home/HeroCarousel';
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
    "Official website of Mumbi Girls Senior School — a C2 Public Girls' Boarding Senior School in Mukuyu, Kiharu, Murang'a County (KNEC: 10204102, MoE: F2030609). Explore CBC Senior School pathways, KCSE achievements, student life, circulars, and downloads.",
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <QuickStats />
      <PrincipalWelcome />
      <FoundationalPillars />
      <PathwaysPreview />
      <WallOfFame />
      <LatestNews />
    </>
  );
}
