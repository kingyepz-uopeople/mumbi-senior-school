'use client';

import { useMemo, useState } from 'react';
import { Check, Download, RotateCcw, Search, X } from 'lucide-react';
import { downloads, schoolInfo } from '@/data/mock-school-data';
import { parseDateKE } from '@/lib/utils';
import type { DownloadItem } from '@/types';

/**
 * Short file-type monogram shown on the left of every document row. Circulars,
 * timetables, newsletters, and fee structures are distributed as PDFs; the
 * departmental holiday assignments are editable documents.
 */
function fileTypeMonogram(item: DownloadItem): 'PDF' | 'DOC' {
  return item.category === 'Holiday Assignment' ? 'DOC' : 'PDF';
}

export default function DownloadsBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [downloadedNotice, setDownloadedNotice] = useState<string | null>(null);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(downloads.map((item) => item.category))
    ).sort();
    return ['All', ...unique];
  }, []);

  const filteredDownloads = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return downloads
      .filter(
        (item) =>
          selectedCategory === 'All' || item.category === selectedCategory
      )
      .filter((item) => {
        if (!needle) return true;
        const haystack = [
          item.title,
          item.category,
          item.level,
          item.subject ?? '',
          item.department,
          item.uploadDate,
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(needle);
      })
      .sort(
        (a, b) =>
          parseDateKE(b.uploadDate).getTime() -
          parseDateKE(a.uploadDate).getTime()
      );
  }, [selectedCategory, query]);

  const handleDownload = (item: DownloadItem) => {
    if (item.fileUrl && item.fileUrl !== '#') {
      window.open(item.fileUrl, '_blank', 'noopener,noreferrer');
      setDownloadedNotice(`Opening "${item.title}".`);
      return;
    }

    // TODO(database-phase): Replace sample preview download with Supabase Storage
    // `school-documents` public/signed URL once document uploads are wired.
    const blob = new Blob(
      [
        `${schoolInfo.name.toUpperCase()}\n` +
          `KNEC Centre: ${schoolInfo.knecCode} | MoE Reg: ${schoolInfo.moeReg}\n` +
          `${schoolInfo.postalAddress} | ${schoolInfo.physicalLocation}\n` +
          `------------------------------------------------------------\n\n` +
          `Document Title : ${item.title}\n` +
          `Category       : ${item.category}\n` +
          `Target Level   : ${item.level}\n` +
          `Subject        : ${item.subject ?? 'General'}\n` +
          `Department     : ${item.department}\n` +
          `Upload Date    : ${item.uploadDate}\n\n` +
          `Note: Summary sheet downloaded from the public website preview.\n` +
          `The official PDF will be linked here once uploaded.\n`,
      ],
      { type: 'text/plain;charset=utf-8' }
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')}-preview.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);

    setDownloadedNotice(`Downloaded a summary sheet for "${item.title}".`);
  };

  const filterBtnClass = (active: boolean) =>
    `min-h-10 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
      active
        ? 'bg-white text-primary-dark border-white'
        : 'bg-transparent text-white border-white/40 hover:border-white'
    }`;

  return (
    <div className="space-y-8">
      {/* Quick client-side search + category filter */}
      <div className="space-y-4">
        <div className="relative max-w-md">
          <label htmlFor="download-search" className="sr-only">
            Search documents by title, subject, or department
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60 stroke-[1.75]"
            aria-hidden="true"
          />
          <input
            id="download-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search circulars, timetables, assignments"
            className="min-h-11 w-full rounded-full border border-white/35 bg-white/5 py-2 pl-11 pr-11 text-sm text-white placeholder:text-white/55 transition-colors focus:border-white focus:bg-white/10 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="Filter documents by type"
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
                className={filterBtnClass(isActive)}
              >
                {category}
              </button>
            );
          })}
        </div>

        <p
          role="status"
          aria-live="polite"
          className="text-xs font-medium text-blue-100/80 tabular-nums"
        >
          {filteredDownloads.length}{' '}
          {filteredDownloads.length === 1 ? 'document' : 'documents'}
          {query.trim() ? ` matching “${query.trim()}”` : ''}
        </p>
      </div>

      {/* Download feedback banner */}
      {downloadedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-sm bg-white/10 border border-white/25 border-l-4 border-l-white/70 text-white flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <Check
              className="w-4 h-4 text-white shrink-0 mt-0.5 stroke-[2]"
              aria-hidden="true"
            />
            <span>{downloadedNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setDownloadedNotice(null)}
            aria-label="Dismiss download notification"
            className="inline-flex items-center justify-center w-11 h-11 -my-2 -mr-2 rounded-full text-white/80 hover:text-white hover:bg-white/15 shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Dated file list */}
      <ol className="editorial-index" aria-label="School documents">
        {filteredDownloads.map((item, index) => (
          <li key={item.id} className="editorial-cell">
            <button
              type="button"
              onClick={() => handleDownload(item)}
              aria-label={`Download ${item.title}`}
              className="editorial-row editorial-row--doc"
              data-reveal=""
              data-reveal-delay={(index % 6) + 1}
            >
              <span className="flex min-w-0 items-center gap-4">
                <span className="doc-monogram" aria-hidden="true">
                  {fileTypeMonogram(item)}
                </span>
                <span className="min-w-0">
                  <span className="block font-serif text-lg font-semibold leading-snug text-white sm:text-xl">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-[0.82rem] leading-relaxed text-blue-100/85 sm:text-sm">
                    {item.category}
                    {' · '}
                    Uploaded {item.uploadDate}
                    {' · '}
                    {item.fileSize}
                  </span>
                </span>
              </span>
              <Download
                className="editorial-arrow size-5 shrink-0 text-white"
                aria-hidden="true"
              />
              <span className="doc-sweep" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ol>

      {filteredDownloads.length === 0 && (
        <div className="py-12 px-6 bg-white/5 border border-white/15">
          <h3 className="font-serif text-lg font-bold text-white">
            No documents match this search
          </h3>
          <p className="mt-1 text-sm text-blue-100/85">
            Term circulars, joining instructions, and newsletters are added
            through the school office.
          </p>
          <div className="pt-3">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setQuery('');
              }}
              className="min-h-11 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-primary-dark text-sm font-semibold hover:bg-blue-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
              <span>Show all documents</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
