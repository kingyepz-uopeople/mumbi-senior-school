'use client';

import { useMemo, useState } from 'react';
import {
  KCSE_MAX_POINTS,
  kcseReports,
  meanGradeFromPoints,
} from '@/data/kcse';

export type HonourYear = number | 'all';

interface WallOfFameGridProps {
  year?: HonourYear;
  onYearChange?: (year: HonourYear) => void;
}

const candidates = kcseReports.flatMap(({ year, topPerformers }) =>
  topPerformers.map(({ name, points, meanGrade }) => ({
    name,
    points,
    meanGrade,
    year,
  }))
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

  const filtered = useMemo(() => {
    const list =
      selectedYear === 'all'
        ? candidates
        : candidates.filter((student) => student.year === selectedYear);

    const sorted = [...list].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (a.year !== b.year) return b.year - a.year;
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    });

    let rank = 1;
    return sorted.map((student, index) => {
      if (index > 0 && student.points < sorted[index - 1].points) {
        rank = index + 1;
      }

      return {
        ...student,
        overallRank: rank,
        meanGrade: meanGradeFromPoints(student.points),
      };
    });
  }, [selectedYear]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter KCSE candidates by examination year"
        className="mb-6 flex flex-wrap items-center gap-2"
      >
        {yearFilters.map(({ year: filterYear, label, count }) => (
          <button
            key={filterYear}
            type="button"
            aria-pressed={selectedYear === filterYear}
            onClick={() => selectYear(filterYear)}
            className={`min-h-11 rounded-full border px-4 py-2 text-xs font-semibold tabular-nums transition-colors sm:text-sm ${
              selectedYear === filterYear
                ? 'border-primary bg-primary text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:border-primary hover:text-primary'
            }`}
          >
            {label} ({count})
          </button>
        ))}
      </div>

      <p className="mb-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
        Ranked by total points
        {selectedYear === 'all'
          ? ' across the selected years'
          : ` for KCSE ${selectedYear}`}
        . Equal points share a rank; the next lower score skips ahead. Mean
        grade follows points out of {KCSE_MAX_POINTS}.
      </p>

      <p className="sr-only" role="status">
        Showing {filtered.length} candidates ranked by points
        {selectedYear === 'all'
          ? ' across all recorded years'
          : ` for KCSE ${selectedYear}`}
        .
      </p>

      <div className="hidden border border-t-2 border-t-primary border-slate-200 bg-white/45 md:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            KCSE Roll of Honour ranked by points
          </caption>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-bg/60 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
              <th scope="col" className="px-4 py-3.5">
                Rank
              </th>
              <th scope="col" className="px-4 py-3.5">
                Points
              </th>
              <th scope="col" className="px-4 py-3.5">
                Grade
              </th>
              <th scope="col" className="px-5 py-3.5">
                Candidate
              </th>
              <th scope="col" className="px-4 py-3.5">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {filtered.map((student) => (
              <tr
                key={`${student.year}-${student.name}`}
                className="transition-colors hover:bg-slate-bg/70"
              >
                <td className="px-4 py-4 font-semibold tabular-nums text-slate-800">
                  {student.overallRank}
                </td>
                <td className="px-4 py-4 font-semibold whitespace-nowrap tabular-nums text-slate-900">
                  {student.points}
                  <span className="font-normal text-slate-500">
                    {' '}
                    / {KCSE_MAX_POINTS}
                  </span>
                </td>
                <td className="px-4 py-4 font-bold text-primary">
                  {student.meanGrade}
                </td>
                <th
                  scope="row"
                  className="px-5 py-4 font-serif text-base font-bold text-slate-900"
                >
                  {student.name}
                </th>
                <td className="px-4 py-4 tabular-nums text-slate-600">
                  {student.year}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul
        role="list"
        className="divide-y divide-slate-200 border border-t-2 border-t-primary border-slate-200 bg-white/45 md:hidden"
      >
        {filtered.map((student) => (
          <li
            key={`${student.year}-${student.name}`}
            className="space-y-1.5 p-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif text-base leading-snug font-bold text-slate-900">
                {student.name}
              </h3>
              <span className="shrink-0 text-sm font-bold tabular-nums text-slate-900">
                {student.points} / {KCSE_MAX_POINTS}
              </span>
            </div>
            <p className="text-xs tabular-nums text-slate-600">
              Rank {student.overallRank} · Grade {student.meanGrade} · KCSE{' '}
              {student.year}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
