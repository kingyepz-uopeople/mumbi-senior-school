import { quickStats } from '@/data/mock-school-data';

export default function QuickStats() {
  return (
    <section
      aria-labelledby="quick-stats-heading"
      className="bg-white border-b border-slate-200"
    >
      <h2 id="quick-stats-heading" className="sr-only">
        School Figures at a Glance
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 divide-slate-200">
          {quickStats.map((stat, index) => (
            <div
              key={stat.label}
              data-reveal=""
              data-reveal-delay={index > 0 ? String(index) : undefined}
              className={`py-7 sm:py-9 ${
                index % 2 === 1 ? 'pl-5 sm:pl-8 border-l border-slate-200' : 'pr-4 sm:pr-8'
              } ${
                index === 2 ? 'lg:pl-8 lg:border-l lg:border-slate-200' : ''
              } ${index < 2 ? 'border-b lg:border-b-0' : 'border-b-0'}`}
            >
              <dd className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-tight tabular-nums">
                {stat.value}
              </dd>
              <dt className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-800 mt-1.5">
                {stat.label}
              </dt>
              {stat.detail && (
                <p className="text-xs text-slate-600 mt-0.5">{stat.detail}</p>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
