import type { Metadata } from 'next';
import { FolderDown } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import DownloadsBrowser from '@/components/downloads/DownloadsBrowser';
import { buildPageMetadata } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: 'Downloads & Resources Hub',
  description:
    'Search and download official term circulars, school newsletters, holiday assignments, Grade 10 joining instructions, exam timetables, and fee structures from Mumbi Girls Senior School.',
  path: '/downloads',
});

export default function DownloadsPage() {
  return (
    <div className="bg-slate-bg">
      <PageHeader
        badge="Document Repository"
        title="Downloads & Resources Hub"
        description="Access official term newsletters, circulars, holiday assignment packages, joining instructions, exam timetables, and fee structures."
        icon={FolderDown}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <DownloadsBrowser />
      </div>
    </div>
  );
}
