import { ArrowDown } from '@/components/icons';
import { formatCPlusShare, kcseReports, type KcseReport } from '@/data/kcse';

interface KcsePerformanceProps {
  report: KcseReport;
  onYearChange: (year: number) => void;
  onViewPerformers: () => void;
}

export default function KcsePerformance({ report, onYearChange, onViewPerformers }: KcsePerformanceProps) {
  const { year, meanPoints, meanGrade, candidateCount, cPlusOrHigher, grades, streams, topPerformers } = report;
  const cPlusShare = formatCPlusShare(report);
  const largestGradeCount = Math.max(...grades.map((grade) => grade.count));
  const leadingStream = streams[0];
  const topPerformer = topPerformers[0];

  const highlights = [
    { label: 'School mean', value: meanPoints, detail: `Overall grade ${meanGrade}` },
    { label: 'Candidates', value: candidateCount, detail: `Across ${streams.length} Form 4 streams` },
    { label: 'C+ or higher', value: cPlusOrHigher, detail: `${cPlusShare} of all candidates` },
    { label: 'Highest score', value: topPerformer.points, detail: `Total points · Grade ${topPerformer.meanGrade}` },
  ];

  return (
    <section
      id="kcse-results"
      aria-labelledby="kcse-results-heading"
      className="scroll-mt-4 border-b border-slate-200 bg-slate-bg py-14 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              National examinations · {year} cohort
            </p>
            <h2 id="kcse-results-heading" className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl">
              {year} KCSE Performance
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
              Mumbi Girls Senior School recorded a mean of {meanPoints} ({meanGrade}).
              {' '}{cPlusOrHigher} of the {candidateCount} candidates earned C+ or higher.
            </p>
          </div>
          <a
            href="#wall-of-fame"
            onClick={onViewPerformers}
            className="inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-primary bg-white px-5 py-2.5 text-sm font-semibold text-primary hover:bg-blue-50 sm:self-auto"
          >
            View top performers
            <ArrowDown className="size-4 shrink-0" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-7">
          <p id="kcse-year-picker-label" className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-slate-600">
            Examination year
          </p>
          <div role="group" aria-labelledby="kcse-year-picker-label" className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
            {kcseReports.map((option) => (
              <button
                key={option.year}
                type="button"
                aria-pressed={year === option.year}
                onClick={() => onYearChange(option.year)}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors sm:px-4 ${
                  year === option.year
                    ? 'border-primary bg-blue-50 text-primary-dark ring-1 ring-primary'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-primary'
                }`}
              >
                <span className="block text-sm font-bold">KCSE {option.year}</span>
                <span className="block text-xs text-slate-600 tabular-nums">
                  Mean {option.meanPoints} ({option.meanGrade})
                </span>
              </button>
            ))}
          </div>
          <p role="status" className="sr-only">
            Showing {year} KCSE results for {candidateCount} candidates. School mean {meanPoints}, grade {meanGrade}.
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {highlights.map(({ label, value, detail }, index) => (
            <div
              key={label}
              className={`flex flex-col rounded-lg border p-4 sm:p-5 ${
                index === 0
                  ? 'border-primary-dark bg-primary-dark text-white'
                  : 'border-slate-200 bg-white text-slate-900'
              }`}
            >
              <dt className={`text-xs font-semibold uppercase tracking-[0.1em] ${index === 0 ? 'text-blue-100' : 'text-slate-600'}`}>
                {label}
              </dt>
              <dd className="mt-2 font-serif text-3xl leading-none font-bold tabular-nums sm:text-4xl">{value}</dd>
              <dd className={`mt-2 text-xs ${index === 0 ? 'text-blue-50' : 'text-slate-600'}`}>{detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 grid items-start gap-4 lg:grid-cols-2 lg:gap-6">
          <section aria-labelledby="kcse-grade-heading" className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
            <h3 id="kcse-grade-heading" className="font-serif text-xl font-bold text-slate-900">
              Grade distribution
            </h3>
            <p className="mt-1 text-sm text-slate-600">Number of candidates in each grade awarded.</p>
            <ul role="list" className="mt-5 space-y-2.5">
              {grades.map(({ grade, gradePoints, count }) => (
                <li key={grade} className="grid grid-cols-[2rem_1fr_2rem] items-center gap-2 text-sm tabular-nums sm:gap-3">
                  <span className="font-semibold text-slate-800">{grade}</span>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
                    <div
                      className={`h-full rounded-full ${gradePoints >= 7 ? 'bg-primary' : 'bg-blue-300'}`}
                      style={{ width: `${(count / largestGradeCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-right font-medium text-slate-700">{count}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex items-center gap-2 text-xs text-slate-600">
              <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
              Dark blue marks C+ or higher
            </p>
          </section>

          <section aria-labelledby="kcse-stream-heading" className="rounded-lg border border-slate-200 bg-white p-4 sm:p-6">
            <h3 id="kcse-stream-heading" className="font-serif text-xl font-bold text-slate-900">
              Results by stream
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-slate-600">
              {leadingStream.name} led the {streams.length} streams with a mean of {leadingStream.meanPoints} ({leadingStream.meanGrade}).
            </p>
            <table className="mt-4 w-full border-collapse text-left text-xs tabular-nums sm:text-sm">
              <caption className="sr-only">{year} KCSE entries, mean points and grades by Form 4 stream</caption>
              <thead className="border-y border-slate-200 bg-slate-bg text-slate-600">
                <tr>
                  <th scope="col" className="p-2">Stream</th>
                  <th scope="col" className="p-2 text-right">Entries</th>
                  <th scope="col" className="p-2 text-right">Mean</th>
                  <th scope="col" className="p-2 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {streams.map(({ name, entries, meanPoints, meanGrade }) => (
                  <tr key={name} className={name === leadingStream.name ? 'bg-blue-50' : undefined}>
                    <th scope="row" className="p-2 font-semibold text-slate-900">{name}</th>
                    <td className="p-2 text-right text-slate-700">{entries}</td>
                    <td className="p-2 text-right text-slate-700">{meanPoints}</td>
                    <td className="p-2 text-right font-semibold text-primary-dark">{meanGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <p className="mt-4 text-xs text-slate-600">
          Source: School&apos;s {year} KCSE results summary.
        </p>
      </div>
    </section>
  );
}
