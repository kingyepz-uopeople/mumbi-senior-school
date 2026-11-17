import HeroCarousel from '@/components/home/HeroCarousel';
import QuickStats from '@/components/home/QuickStats';
import PrincipalWelcome from '@/components/home/PrincipalWelcome';
import FoundationalPillars from '@/components/home/FoundationalPillars';
import PathwaysPreview from '@/components/home/PathwaysPreview';
import WallOfFame from '@/components/home/WallOfFame';
import LatestNews from '@/components/home/LatestNews';

export default function HomePage() {
  return (
    <main>
      {/* Hero Carousel — full-width */}
      <HeroCarousel />

      {/* Quick Stats — full-width maroon strip */}
      <QuickStats />

      {/* Principal's Welcome */}
      <PrincipalWelcome />

      {/* Foundational Pillars */}
      <FoundationalPillars />

      {/* CBC Pathways Preview */}
      <PathwaysPreview />

      {/* KCSE Wall of Fame */}
      <WallOfFame />

      {/* Latest News */}
      <LatestNews />
    </main>
  );
}
