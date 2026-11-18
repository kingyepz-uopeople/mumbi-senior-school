import type { Metadata } from 'next';
import PageHero from '@/components/shared/PageHero';
import GalleryBrowser from '@/components/gallery/GalleryBrowser';
import { galleryAlbums } from '@/data/mock-school-data';
import { getAvailablePublicAssets } from '@/lib/media';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Photo Gallery',
  description:
    'School event albums from Mumbi Girls Senior School covering Prayer Day, the Annual General Meeting & Prize Giving, the STEM Innovation Fair, and KSSSA sports.',
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
        subtitle="Event albums from Prayer Day, the Annual General Meeting & Prize Giving, the Murang'a County STEM Innovation Fair, and KSSSA term games."
        meta={[`${galleryAlbums.length} Event Albums`, 'Mukuyu Campus']}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <GalleryBrowser availableSrcs={availableSrcs} />
      </div>
    </div>
  );
}
