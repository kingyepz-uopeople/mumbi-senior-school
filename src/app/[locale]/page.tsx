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
import { isLocale, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale: Locale = isLocale(localeParam) ? localeParam : 'en';
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: 'Mumbi Girls Senior School',
    description: `${schoolInfo.name} — ${dict.school.motto}. ${dict.school.category} in ${schoolInfo.physicalLocation}.`,
    path: `/${locale}`,
  });
}

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
