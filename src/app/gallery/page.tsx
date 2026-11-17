import type { Metadata } from 'next';
import { Camera } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import GalleryBrowser from '@/components/gallery/GalleryBrowser';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Photo & Media Gallery',
  description:
    'Browse event albums from Mumbi Girls Senior School including Prayer Day, AGM & Prize Giving, the STEM Innovation Fair, and KSSSA sports competitions.',
  path: '/gallery',
});

export default function GalleryPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Campus Highlights"
        title="Photo & Media Gallery"
        description="Moments from Prayer Day, AGM & Prize Giving, regional STEM exhibitions, and KSSSA sports competitions at Mumbi Girls Senior School."
        icon={Camera}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <GalleryBrowser />
      </div>
    </div>
  );
}
