import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import SectionStemBackdrop from '@/components/shared/SectionStemBackdrop';
import GalleryBrowser from '@/components/gallery/GalleryBrowser';
import { galleryAlbums, schoolInfo } from '@/data/mock-school-data';
import { getAvailablePublicAssets } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Photo Gallery',
  description:
    'Explore the Mumbi Girls Senior School campus, including the main gate and Tahidi study area, alongside photos from school events.',
  path: '/gallery',
});

export default function GalleryPage() {
  const allPaths = galleryAlbums.flatMap((album) =>
    album.images.map((image) => image.src)
  );
  const availableSrcs = getAvailablePublicAssets(allPaths);

  return (
    <div className="bg-slate-bg">
      <PageHero
        variant="gallery"
        kicker="School Archives"
        title="Photo Gallery"
        subtitle="Explore our campus, from the main gate and gardens to the Tahidi study area and academic buildings, alongside photos from school events."
        meta={[`${galleryAlbums.length} Photo Albums`, schoolInfo.locationShort]}
      />

      <div className="relative">
        <SectionStemBackdrop variant="gallery" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <GalleryBrowser availableSrcs={availableSrcs} />
        </div>
      </div>
    </div>
  );
}
