import { formatCPlusShare, kcseReports, type KcseReport } from '@/data/kcse';

function sumGrades(report: KcseReport, targets: readonly string[]): number {
  return report.grades
    .filter((g) => targets.includes(g.grade))
    .reduce((sum, g) => sum + g.count, 0);
}

export default function KcseMultiYearTable({
  selectedYear,
  onSelectYear,
}: {
  selectedYear: number;
  onSelectYear?: (year: number) => void;
}) {
  return (
    <section
      id="kcse-multi-year"
      aria-labelledby="kcse-multi-year-heading"
      className="bg-surface border-t border-b border-slate-200 py-12 sm:py-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-6 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-1.5">
            Four-Year Trend (2022–2025)
          </p>
          <h2
            id="kcse-multi-year-heading"
            className="font-serif text-2xl sm:text-3xl font-bold text-slate-900"
          >
            Multi-Year KCSE Summary
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Entry, mean grade, mean points, university-entry qualifying share (C+ &amp; above), and grade spread across the 2022–2025 KCSE cohorts.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-sm shadow-xs overflow-x-auto">
          <table className="w-full min-w-[680px] text-left border-collapse tabular-nums">
            <thead>
              <tr className="bg-primary-dark text-white text-xs uppercase tracking-[0.08em]">
                <th scope="col" className="py-3.5 px-4 font-semibold sticky left-0 bg-primary-dark z-10">
                  Year
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  Entry
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-center">
                  Mean Grade
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  Mean Points
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  C+ &amp; Above
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  A / A-
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  B+ / B / B-
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  C+
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  C / C-
                </th>
                <th scope="col" className="py-3.5 px-4 font-semibold text-right">
                  D+ &amp; Below
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-800">
              {kcseReports.map((report) => {
                const isSelected = report.year === selectedYear;
                const aCount = sumGrades(report, ['A', 'A-']);
                const bCount = sumGrades(report, ['B+', 'B', 'B-']);
                const cPlusCount = sumGrades(report, ['C+']);
                const cCount = sumGrades(report, ['C', 'C-']);
                const dAndBelowCount = sumGrades(report, ['D+', 'D', 'D-', 'E']);

                return (
                  <tr
                    key={report.year}
                    className={
                      isSelected
                        ? 'bg-blue-50/70 font-medium'
                        : 'hover:bg-slate-50 transition-colors'
                    }
                  >
                    <th
                      scope="row"
                      className={`py-3.5 px-4 font-serif font-bold sticky left-0 z-10 ${
                        isSelected ? 'bg-blue-50 text-primary-dark' : 'bg-white text-slate-900'
                      }`}
                    >
                      {onSelectYear ? (
                        <button
                          type="button"
                          onClick={() => onSelectYear(report.year)}
                          className="inline-flex items-center gap-2 hover:text-primary hover:underline underline-offset-4 cursor-pointer"
                        >
                          <span>{report.year}</span>
                          {isSelected && (
                            <span
                              className="w-1.5 h-1.5 rounded-full bg-[#C22F2F]"
                              aria-label="Currently selected"
                            />
                          )}
                        </button>
                      ) : (
                        report.year
                      )}
                    </th>
                    <td className="py-3.5 px-4 text-right">{report.candidateCount}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-8 px-2 py-0.5 rounded-sm bg-blue-50 text-primary-dark font-bold text-xs border border-blue-200">
                        {report.meanGrade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-semibold text-primary-dark">
                      {report.meanPoints.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {report.cPlusOrHigher}{' '}
                      <span className="text-xs text-slate-500">
                        ({formatCPlusShare(report)})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">{aCount}</td>
                    <td className="py-3.5 px-4 text-right">{bCount}</td>
                    <td className="py-3.5 px-4 text-right">{cPlusCount}</td>
                    <td className="py-3.5 px-4 text-right">{cCount}</td>
                    <td className="py-3.5 px-4 text-right">{dAndBelowCount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
