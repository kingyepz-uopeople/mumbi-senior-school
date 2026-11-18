'use client';

import { useMemo, useState } from 'react';
import { Check, Download, RotateCcw, Search, X } from 'lucide-react';
import { downloads, schoolInfo } from '@/data/mock-school-data';
import { parseDateKE, toIsoDate } from '@/lib/utils';
import type { DownloadItem } from '@/types';

const CATEGORIES = [
  'All',
  'Circular',
  'Admission & Joining Instructions',
  'Fee Structure',
  'Exam Timetable',
  'Holiday Assignment',
  'Newsletter',
] as const;

const LEVELS = [
  'All',
  'Grade 10',
  'Grade 11',
  'Grade 12',
  'Form 3',
  'Form 4',
] as const;

const SUBJECTS = [
  'All',
  'General',
  'Mathematics',
  'English',
  'Sciences',
  'Humanities',
] as const;

export default function DownloadsBrowser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [downloadedNotice, setDownloadedNotice] = useState<string | null>(null);

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    selectedSubject !== 'All';

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedSubject('All');
  };

  const filteredDownloads = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return downloads
      .filter((item) => {
        const matchesSearch =
          query === '' ||
          item.title.toLowerCase().includes(query) ||
          item.department.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          (item.subject?.toLowerCase().includes(query) ?? false);

        const matchesCategory =
          selectedCategory === 'All' || item.category === selectedCategory;

        const matchesLevel =
          selectedLevel === 'All' || item.level === selectedLevel;

        const matchesSubject =
          selectedSubject === 'All' ||
          (item.subject ?? 'General') === selectedSubject;

        return (
          matchesSearch && matchesCategory && matchesLevel && matchesSubject
        );
      })
      .sort(
        (a, b) =>
          parseDateKE(b.uploadDate).getTime() -
          parseDateKE(a.uploadDate).getTime()
      );
  }, [searchTerm, selectedCategory, selectedLevel, selectedSubject]);

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
          `Note: Placeholder summary downloaded from the public website preview.\n` +
          `Signed PDF copies will be linked once the document store is connected.\n`,
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

    setDownloadedNotice(
      `Downloaded summary sheet for "${item.title}". Official PDF uploads will replace preview files in the portal phase.`
    );
  };

  const filterBtnClass = (active: boolean) =>
    `min-h-11 px-3.5 py-2 rounded-sm text-xs font-semibold border transition-colors ${
      active
        ? 'bg-primary border-primary text-white'
        : 'bg-white border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
    }`;

  return (
    <div className="space-y-10">
      {/* Search & Filter Panel */}
      <section
        aria-labelledby="downloads-filter-heading"
        className="bg-white border border-slate-200 border-t-2 border-t-primary p-5 sm:p-7 space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
          <h2
            id="downloads-filter-heading"
            className="font-serif text-xl font-bold text-slate-900"
          >
            Find a Document
          </h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-11 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-accent border border-accent/40 hover:bg-accent hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[1.75]" aria-hidden="true" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Search Input */}
        <div>
          <label
            htmlFor="downloads-search"
            className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 mb-2"
          >
            Search by title, subject, or department
          </label>
          <div className="relative">
            <Search
              className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none stroke-[1.75]"
              aria-hidden="true"
            />
            <input
              id="downloads-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g. Fee structure, Grade 10, Mathematics, Circular"
              className="w-full min-h-12 pl-10 pr-12 py-2.5 rounded-sm border border-slate-300 bg-slate-bg focus:bg-white focus:border-primary text-sm text-slate-900 placeholder:text-slate-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search query"
                className="absolute right-0.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-sm text-slate-600 hover:text-primary"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <span
            id="category-filter-label"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 block mb-2"
          >
            Document Type
          </span>
          <div
            role="group"
            aria-labelledby="category-filter-label"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                className={filterBtnClass(selectedCategory === cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Class & Subject Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
          <div>
            <span
              id="level-filter-label"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 block mb-2"
            >
              Class / Form
            </span>
            <div
              role="group"
              aria-labelledby="level-filter-label"
              className="flex flex-wrap gap-2"
            >
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  aria-pressed={selectedLevel === lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={filterBtnClass(selectedLevel === lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span
              id="subject-filter-label"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 block mb-2"
            >
              Subject Area
            </span>
            <div
              role="group"
              aria-labelledby="subject-filter-label"
              className="flex flex-wrap gap-2"
            >
              {SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  type="button"
                  aria-pressed={selectedSubject === subject}
                  onClick={() => setSelectedSubject(subject)}
                  className={filterBtnClass(selectedSubject === subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Download Feedback Banner */}
      {downloadedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-sm bg-white border border-slate-300 border-l-4 border-l-primary text-slate-800 flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <Check
              className="w-4 h-4 text-primary shrink-0 mt-0.5 stroke-[2]"
              aria-hidden="true"
            />
            <span>{downloadedNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setDownloadedNotice(null)}
            aria-label="Dismiss download notification"
            className="inline-flex items-center justify-center w-11 h-11 -my-2 -mr-2 rounded-sm text-slate-600 hover:text-primary shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Document Register */}
      <section aria-labelledby="downloads-results-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <h2
            id="downloads-results-heading"
            className="font-serif text-xl sm:text-2xl font-bold text-slate-900"
          >
            Document Register
          </h2>
          <p
            role="status"
            aria-live="polite"
            className="text-xs text-slate-600 tabular-nums"
          >
            Showing <strong className="text-slate-900">{filteredDownloads.length}</strong>{' '}
            of {downloads.length} documents
          </p>
        </div>

        {filteredDownloads.length > 0 ? (
          <div className="bg-white border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
            {filteredDownloads.map((item) => (
              <article
                key={item.id}
                className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                    <span
                      className={`font-bold uppercase tracking-[0.1em] ${
                        item.category === 'Circular'
                          ? 'text-accent'
                          : 'text-primary'
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="text-slate-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-semibold text-slate-700">
                      {item.level === 'All' ? 'All Classes' : item.level}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 tabular-nums">
                    Uploaded{' '}
                    <time
                      dateTime={toIsoDate(item.uploadDate)}
                      className="font-medium text-slate-800"
                    >
                      {item.uploadDate}
                    </time>{' '}
                    · {item.department} Department
                    {item.subject && item.subject !== 'General'
                      ? ` · ${item.subject}`
                      : ''}{' '}
                    · {item.fileSize}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="w-full md:w-auto shrink-0 min-h-11 py-2.5 px-4 rounded-sm bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors tabular-nums"
                >
                  <Download
                    className="w-4 h-4 shrink-0 stroke-[1.75]"
                    aria-hidden="true"
                  />
                  <span>Download ({item.fileSize})</span>
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 bg-white border border-slate-200 space-y-3">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              No matching documents
            </h3>
            <p className="text-sm text-slate-600 max-w-md">
              No documents match the selected search term and filters. Clear one
              or more filters to view the full register.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-11 inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                <RotateCcw className="w-4 h-4 stroke-[1.75]" aria-hidden="true" />
                <span>Show all documents</span>
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
