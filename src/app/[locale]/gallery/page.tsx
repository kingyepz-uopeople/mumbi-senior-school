import type { Metadata } from 'next';
import GalleryBrowser from '@/components/gallery/GalleryBrowser';
import { galleryAlbums } from '@/data/mock-school-data';
import { getLocaleDictionary } from '@/i18n/server';
import { getAvailablePublicAssets } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Photo Gallery',
  description:
    'Photographs of the Mumbi Girls Senior School campus, including the main gate and Tahidi study area, alongside school events.',
  path: '/gallery',
});

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { dict } = await getLocaleDictionary(params);
  const g = dict.gallery;

  const allPaths = galleryAlbums.flatMap((album) =>
    album.images.map((image) => image.src)
  );
  const availableSrcs = getAvailablePublicAssets(allPaths);

  const campusAlbum = galleryAlbums.find((album) => album.id === 'school-campus');
  const driftImages = campusAlbum ? campusAlbum.images : [];

  return (
    <div className="bg-slate-bg">
      <section
        data-dark-surface
        className="bg-primary-dark py-14 text-white sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-blue-100">
            <span className="h-0.5 w-7 bg-accent" aria-hidden="true" />
            {g.kicker}
          </p>
          <h1 className="font-serif text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            {g.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
            {g.subtitle}
          </p>
        </div>
      </section>

      <div className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
          <GalleryBrowser
            availableSrcs={availableSrcs}
            driftImages={driftImages}
          />
        </div>
      </div>
    </div>
  );
}