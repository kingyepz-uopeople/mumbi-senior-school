'use client';

import { useState } from 'react';
import { GraduationCap, Trophy } from 'lucide-react';
import { topStudents } from '@/data/mock';

export default function WallOfFame() {
  const years = Array.from(new Set(topStudents.map((s) => s.year))).sort(
    (a, b) => b - a
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const filtered = selectedYear
    ? topStudents.filter((s) => s.year === selectedYear)
    : topStudents;

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: '#800020' }}
          >
            KCSE Wall of Fame
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-4"
            style={{ backgroundColor: '#D4AF37' }}
          />
          <p className="text-gray-600 max-w-xl mx-auto">
            Celebrating our top-performing students and their remarkable
            achievements.
          </p>
        </div>

        {/* Year filter pills */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <button
            onClick={() => setSelectedYear(null)}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
            style={{
              backgroundColor: selectedYear === null ? '#800020' : 'rgba(128,0,32,0.08)',
              color: selectedYear === null ? '#fff' : '#800020',
            }}
          >
            All Years
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              style={{
                backgroundColor:
                  selectedYear === year ? '#800020' : 'rgba(128,0,32,0.08)',
                color: selectedYear === year ? '#fff' : '#800020',
              }}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Student cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 border-t-4 flex flex-col"
              style={{ borderTopColor: '#D4AF37' }}
            >
              {/* Grade badge */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: '#800020' }}
                  >
                    {student.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    KCSE {student.year}
                  </span>
                </div>
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg text-white"
                  style={{ backgroundColor: '#800020' }}
                >
                  {student.meanGrade}
                </div>
              </div>

              {/* Points */}
              <div className="flex items-center gap-1 mb-3">
                <Trophy className="w-4 h-4" style={{ color: '#D4AF37' }} />
                <span className="text-sm font-semibold text-gray-700">
                  {student.points} Points
                </span>
              </div>

              {/* University */}
              <div className="mt-auto pt-3 border-t">
                <div className="flex items-start gap-2">
                  <GraduationCap
                    className="w-4 h-4 mt-0.5 flex-shrink-0"
                    style={{ color: '#D4AF37' }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {student.university}
                    </p>
                    <p className="text-xs text-gray-500">{student.course}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
