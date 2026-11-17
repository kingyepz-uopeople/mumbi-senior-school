'use client';

import { useState } from 'react';
import { topStudents } from '@/data/mock-school-data';

export default function WallOfFameGrid() {
  const years = Array.from(new Set(topStudents.map((s) => s.year))).sort(
    (a, b) => b - a
  );
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  const filtered =
    selectedYear === 'all'
      ? topStudents
      : topStudents.filter((s) => s.year === selectedYear);

  return (
    <div>
      {/* Left-aligned examination year filter controls */}
      <div
        role="group"
        aria-label="Filter KCSE candidates by examination year"
        className="flex flex-wrap items-center gap-2 mb-6"
      >
        <button
          type="button"
          aria-pressed={selectedYear === 'all'}
          onClick={() => setSelectedYear('all')}
          className={`min-h-11 px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold border transition-colors ${
            selectedYear === 'all'
              ? 'bg-primary border-primary text-white'
              : 'bg-white border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
          }`}
        >
          All Years ({topStudents.length})
        </button>
        {years.map((year) => {
          const count = topStudents.filter((s) => s.year === year).length;
          const active = selectedYear === year;
          return (
            <button
              key={year}
              type="button"
              aria-pressed={active}
              onClick={() => setSelectedYear(year)}
              className={`min-h-11 px-4 py-2 rounded-sm text-xs sm:text-sm font-semibold border tabular-nums transition-colors ${
                active
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              KCSE {year} ({count})
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {filtered.length} candidates
        {selectedYear === 'all'
          ? ' across all recorded years'
          : ` for KCSE ${selectedYear}`}
        .
      </p>

      {/* Desktop / Tablet Honours Table */}
      <div className="hidden md:block bg-white border-t-2 border-t-primary border-x border-b border-slate-200">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-bg text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
              <th scope="col" className="py-3.5 px-5">
                Candidate
              </th>
              <th scope="col" className="py-3.5 px-4">
                Year
              </th>
              <th scope="col" className="py-3.5 px-4">
                Mean Grade
              </th>
              <th scope="col" className="py-3.5 px-4">
                Points
              </th>
              <th scope="col" className="py-3.5 px-5">
                University &amp; Degree Placement
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            {filtered.map((student) => (
              <tr
                key={student.id}
                className="hover:bg-slate-bg/70 transition-colors"
              >
                <td className="py-4 px-5 font-serif font-bold text-base text-slate-900">
                  {student.name}
                </td>
                <td className="py-4 px-4 text-slate-600 tabular-nums">
                  {student.year}
                </td>
                <td className="py-4 px-4 font-bold text-primary tabular-nums">
                  {student.meanGrade}
                </td>
                <td className="py-4 px-4 text-slate-800 font-medium tabular-nums">
                  {student.points} / 84
                </td>
                <td className="py-4 px-5">
                  <span className="font-medium text-slate-900">
                    {student.course}
                  </span>
                  <span className="text-slate-600">
                    {' '}
                    — {student.university}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Honours List (zero horizontal scroll at 360px) */}
      <ul className="md:hidden bg-white border-t-2 border-t-primary border-x border-b border-slate-200 divide-y divide-slate-200">
        {filtered.map((student) => (
          <li key={student.id} className="p-4 space-y-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-serif font-bold text-base text-slate-900 leading-snug">
                {student.name}
              </h3>
              <span className="text-sm font-bold text-primary tabular-nums shrink-0">
                Grade {student.meanGrade}
              </span>
            </div>
            <p className="text-xs text-slate-600 tabular-nums">
              KCSE {student.year} · {student.points} points
            </p>
            <p className="text-sm text-slate-800 leading-snug pt-0.5">
              {student.course}
              <span className="block text-xs text-slate-600">
                {student.university}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
