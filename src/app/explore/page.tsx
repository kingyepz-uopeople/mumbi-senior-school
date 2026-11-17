import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import ExploreTabs from '@/components/explore/ExploreTabs';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Student Life & Co-Curriculars',
  description:
    'Discover student life at Mumbi Girls Senior School — clubs and uniformed movements, KSSSA competitive sports, the 05:00–22:00 daily boarding routine, chaplaincy and faith societies, dining, and official school uniform.',
  path: '/explore',
});

export default function ExplorePage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Holistic Student Growth"
        title="Student Life & Co-Curriculars"
        description="Beyond the classroom: character-building uniformed movements, competitive sports, structured daily routines, vibrant chaplaincy, and a caring boarding community."
        icon={Sparkles}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <ExploreTabs />
      </div>
    </div>
  );
}
