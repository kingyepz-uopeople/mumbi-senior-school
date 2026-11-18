'use client';

import { useState } from 'react';
import { kcseReports } from '@/data/kcse';

export type HonourYear = number | 'all';

interface WallOfFameGridProps {
  year?: HonourYear;
  onYearChange?: (year: HonourYear) => void;
}

const candidates = kcseReports.flatMap(({ year, topPerformers }) =>
  topPerformers.map((student) => ({ ...student, year })),
);

const yearFilters = [
  { year: 'all' as const, label: 'All Years', count: candidates.length },
  ...kcseReports.map(({ year, topPerformers }) => ({
    year,
    label: `KCSE ${year}`,
    count: topPerformers.length,
  })),
];

export default function WallOfFameGrid({ year, onYearChange }: WallOfFameGridProps) {
  const [localYear, setLocalYear] = useState<HonourYear>(kcseReports[0].year);
  const selectedYear = year ?? localYear;
  const selectYear = onYearChange ?? setLocalYear;
  const filtered = selectedYear === 'all'
    ? candidates
    : candidates.filter((student) => student.year === selectedYear);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter KCSE candidates by examination year"
        className="mb-6 flex flex-wrap items-center gap-2"
      >
        {yearFilters.map(({ year, label, count }) => (
          <button
            key={year}
            type="button"
            aria-pressed={selectedYear === year}
            onClick={() => selectYear(year)}
            className={`min-h-11 rounded-full border px-4 py-2 text-xs font-semibold tabular-nums transition-colors sm:text-sm ${
              selectedYear === year
                ? 'border-primary bg-primary text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Showing {filtered.length} candidates
        {selectedYear === 'all'
          ? ' across all recorded years'
          : ` for KCSE ${selectedYear}`}
        .
      </p>

      <div className="hidden border border-t-2 border-slate-200 border-t-primary bg-white/45 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">KCSE Roll of Honour</caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-bg/60 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
              <th scope="col" className="px-4 py-3.5">Overall rank</th>
              <th scope="col" className="px-5 py-3.5">Candidate</th>
              <th scope="col" className="px-4 py-3.5">Year</th>
              <th scope="col" className="px-4 py-3.5">Grade</th>
              <th scope="col" className="px-4 py-3.5">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {filtered.map((student) => (
              <tr key={`${student.year}-${student.name}`} className="transition-colors hover:bg-slate-bg/70">
                <td className="px-4 py-4 font-semibold text-slate-800 tabular-nums">
                  {student.overallRank}
                </td>
                <th scope="row" className="px-5 py-4 font-serif text-base font-bold text-slate-900">
                  {student.name}
                </th>
                <td className="px-4 py-4 text-slate-600 tabular-nums">{student.year}</td>
                <td className="px-4 py-4 font-bold text-primary">{student.meanGrade}</td>
                <td className="px-4 py-4 font-medium whitespace-nowrap text-slate-800 tabular-nums">
                  {student.points} / 84
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul role="list" className="divide-y divide-slate-200 border border-t-2 border-slate-200 border-t-primary bg-white/45 md:hidden">
        {filtered.map((student) => (
          <li key={`${student.year}-${student.name}`} className="space-y-1.5 p-4">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-base leading-snug font-bold text-slate-900">
                {student.name}
              </h3>
              <span className="shrink-0 text-sm font-bold text-primary">
                Grade {student.meanGrade}
              </span>
            </div>
            <p className="text-xs text-slate-600 tabular-nums">
              Overall rank {student.overallRank} · KCSE {student.year} · {student.points} points
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
