'use client';

import { useMemo, useState } from 'react';
import {
  BookOpen,
  Building,
  Calendar,
  CheckCircle2,
  Download,
  FileText,
  HardDrive,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import { downloads, schoolInfo } from '@/data/mock-school-data';
import { parseDateKE, toIsoDate } from '@/lib/utils';
import type { DownloadItem } from '@/types';

const CATEGORIES = [
  'All',
  'Holiday Assignment',
  'Newsletter',
  'Circular',
  'Admission & Joining Instructions',
  'Fee Structure',
  'Exam Timetable',
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
  'Mathematics',
  'English',
  'Sciences',
  'Humanities',
  'General',
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
    // If a real document URL is configured in a later phase, open it directly
    if (item.fileUrl && item.fileUrl !== '#') {
      window.open(item.fileUrl, '_blank', 'noopener,noreferrer');
      setDownloadedNotice(`Opening "${item.title}"...`);
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
          `Note: This is a placeholder summary file downloaded from the public preview portal.\n` +
          `Official PDF uploads will be served once the document storage repository is connected.\n`,
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
      `Downloaded preview summary for "${item.title}". Official PDFs will be attached in the portal phase.`
    );
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Controls */}
      <section
        aria-labelledby="downloads-filter-heading"
        className="bg-white rounded-2xl border border-slate-200 border-t-4 border-t-primary p-5 sm:p-7 shadow-xs space-y-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2
            id="downloads-filter-heading"
            className="text-lg font-bold text-slate-900"
          >
            Search &amp; Filter Documents
          </h2>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="min-h-11 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-accent bg-accent/8 border border-accent/25 hover:bg-accent hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Labelled Search Input */}
        <div>
          <label
            htmlFor="downloads-search"
            className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
          >
            Keyword Search
          </label>
          <div className="relative">
            <Search
              className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="downloads-search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, subject, category, or department..."
              className="w-full min-h-12 pl-12 pr-12 py-3 rounded-xl border border-slate-300 bg-slate-bg focus:bg-white focus:border-primary text-sm text-slate-900 placeholder:text-slate-500"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search query"
                className="absolute right-0.5 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-100"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div>
          <span
            id="category-filter-label"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2"
          >
            Category
          </span>
          <div
            role="group"
            aria-labelledby="category-filter-label"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`min-h-11 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    active
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-slate-bg border border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Class / Level Filter Pills */}
        <div>
          <span
            id="level-filter-label"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2"
          >
            Target Class / Level
          </span>
          <div
            role="group"
            aria-labelledby="level-filter-label"
            className="flex flex-wrap gap-2"
          >
            {LEVELS.map((lvl) => {
              const active = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`min-h-11 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    active
                      ? 'bg-primary-dark text-white shadow-xs'
                      : 'bg-slate-bg border border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>
        </div>

        {/* Subject Filter Pills */}
        <div>
          <span
            id="subject-filter-label"
            className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2"
          >
            Subject
          </span>
          <div
            role="group"
            aria-labelledby="subject-filter-label"
            className="flex flex-wrap gap-2"
          >
            {SUBJECTS.map((subject) => {
              const active = selectedSubject === subject;
              return (
                <button
                  key={subject}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedSubject(subject)}
                  className={`min-h-11 px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                    active
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-slate-bg border border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
                  }`}
                >
                  {subject}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Download Feedback Banner */}
      {downloadedNotice && (
        <div
          role="status"
          aria-live="polite"
          className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start justify-between gap-3"
        >
          <div className="flex items-start gap-2.5 text-xs sm:text-sm">
            <CheckCircle2
              className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <span>{downloadedNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setDownloadedNotice(null)}
            aria-label="Dismiss download notification"
            className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-emerald-800 hover:bg-emerald-100 shrink-0"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Results Summary & Cards */}
      <section aria-labelledby="downloads-results-heading" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 px-1">
          <h2
            id="downloads-results-heading"
            className="text-base font-bold text-slate-900"
          >
            Available Resources
          </h2>
          <p
            role="status"
            aria-live="polite"
            className="text-xs text-slate-600"
          >
            Showing <strong className="text-slate-900">{filteredDownloads.length}</strong>{' '}
            of {downloads.length} documents • Dates in{' '}
            <strong className="text-slate-900">DD/MM/YYYY</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDownloads.length > 0 ? (
            filteredDownloads.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md bg-primary/10 text-primary leading-snug">
                      {item.category}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-accent/10 text-accent shrink-0">
                      {item.level}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <dl className="space-y-1.5 text-xs text-slate-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar
                        className="w-3.5 h-3.5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <dt>Uploaded:</dt>
                      <dd className="font-bold text-slate-800">
                        <time dateTime={toIsoDate(item.uploadDate)}>
                          {item.uploadDate}
                        </time>
                      </dd>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building
                        className="w-3.5 h-3.5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <dt>Department:</dt>
                      <dd className="font-bold text-slate-800">
                        {item.department}
                      </dd>
                    </div>
                    {item.subject && (
                      <div className="flex items-center gap-2">
                        <BookOpen
                          className="w-3.5 h-3.5 text-primary shrink-0"
                          aria-hidden="true"
                        />
                        <dt>Subject:</dt>
                        <dd className="font-bold text-slate-800">
                          {item.subject}
                        </dd>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <HardDrive
                        className="w-3.5 h-3.5 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <dt>File Size:</dt>
                      <dd className="font-bold text-slate-800">
                        {item.fileSize}
                      </dd>
                    </div>
                  </dl>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownload(item)}
                  className="w-full min-h-11 py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Download ({item.fileSize})</span>
                </button>
              </article>
            ))
          ) : (
            <div className="col-span-full py-14 px-6 text-center bg-white rounded-2xl border border-slate-200">
              <FileText
                className="w-12 h-12 text-slate-400 mx-auto mb-3"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                No Matching Documents Found
              </h3>
              <p className="text-sm text-slate-600 mb-5">
                Try broadening your keyword search or resetting one of the
                selected filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary-dark transition-colors"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Show All Resources</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
