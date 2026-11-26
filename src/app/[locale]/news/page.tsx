import type { Metadata } from 'next';
import NewsIndexClient, {
  type FeaturedImage,
} from '@/components/news/NewsIndexClient';
import { galleryAlbums, newsItems } from '@/data/mock-school-data';
import { getLocaleDictionary } from '@/i18n/server';
import { getAvailablePublicAssets } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';
import { parseDateKE } from '@/lib/utils';

export const metadata: Metadata = buildPageMetadata({
  title: 'News & Events',
  description:
    'Official school notices, term circulars, newsletters, and announcements from Mumbi Girls Senior School.',
  path: '/news',
});

const leadPhotoCandidates = galleryAlbums
  .flatMap((album) => album.images)
  .filter((image) => Boolean(image.caption));

const availableLeadPhotos = getAvailablePublicAssets(
  leadPhotoCandidates.map((image) => image.src)
);

function buildFeaturedImages(): Record<string, FeaturedImage> {
  const available = new Set(availableLeadPhotos);
  const photos = leadPhotoCandidates.filter((image) => available.has(image.src));
  if (photos.length === 0) return {};

  const newest = [...newsItems].sort(
    (a, b) =>
      parseDateKE(b.date).getTime() - parseDateKE(a.date).getTime()
  )[0];

  const photo = photos[0];
  return {
    [newest.slug]: {
      src: photo.src,
      alt: photo.alt,
      width: photo.width,
      height: photo.height,
    },
  };
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const n = dict.news;

  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            {n.kicker}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {n.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            {n.subtitle}
          </p>

          <div className="mt-10 sm:mt-12">
            <NewsIndexClient items={newsItems} featuredImages={buildFeaturedImages()} />
          </div>
        </div>
      </section>
    </div>
  );
}