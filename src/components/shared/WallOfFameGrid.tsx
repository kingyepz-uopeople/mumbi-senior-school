'use client';

import { useState } from 'react';
import { GraduationCap, Trophy } from 'lucide-react';
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
      {/* Accessible Year Filter Pills */}
      <div
        role="group"
        aria-label="Filter KCSE scholars by examination year"
        className="flex items-center justify-center flex-wrap gap-2 mb-8"
      >
        <button
          type="button"
          aria-pressed={selectedYear === 'all'}
          onClick={() => setSelectedYear('all')}
          className={`min-h-11 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
            selectedYear === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-white border border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
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
              className={`min-h-11 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors ${
                active
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:border-primary hover:text-primary'
              }`}
            >
              KCSE {year} ({count})
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {filtered.length} top scholars
        {selectedYear === 'all'
          ? ' across all years'
          : ` for KCSE ${selectedYear}`}
        .
      </p>

      {/* Scholar Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filtered.map((student) => (
          <article
            key={student.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:border-primary hover:shadow-md transition-all flex flex-col"
          >
            <div className="bg-gradient-to-r from-primary to-primary-dark text-white p-4 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="block text-xs text-blue-100 font-semibold">
                  KCSE {student.year}
                </span>
                <h3 className="font-bold text-base text-white leading-snug">
                  {student.name}
                </h3>
              </div>
              <div
                aria-label={`Mean grade ${student.meanGrade}`}
                className="w-12 h-12 rounded-xl bg-white text-primary flex items-center justify-center font-black text-lg shrink-0 shadow-xs"
              >
                {student.meanGrade}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col">
              <div className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-800 mb-4">
                <Trophy
                  className="w-4 h-4 text-accent shrink-0"
                  aria-hidden="true"
                />
                <span>{student.points} Points</span>
              </div>

              <div className="mt-auto pt-3.5 border-t border-slate-100 flex items-start gap-2.5">
                <GraduationCap
                  className="w-4 h-4 text-primary mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-bold text-slate-900 leading-snug">
                    {student.university}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {student.course}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
