import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import NewsIndexClient from '@/components/news/NewsIndexClient';
import { newsItems } from '@/data/mock-school-data';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'News & Events',
  description:
    'Official school notices, term circulars, newsletters, and announcements from Mumbi Girls Senior School.',
  path: '/news',
});

export default function NewsPage() {
  return (
    <>
      <PageHero
        title="News & Events"
        subtitle="Official school notices, term circulars, newsletters, and announcements."
        variant="downloads"
      />
      <section className="bg-surface py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <NewsIndexClient items={newsItems} />
        </div>
      </section>
    </>
  );
}
