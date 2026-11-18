interface PageHeaderProps {
  kicker: string;
  title: string;
  description: string;
  meta?: string[];
}

export default function PageHeader({
  kicker,
  title,
  description,
  meta,
}: PageHeaderProps) {
  return (
    <section
      data-dark-surface
      className="bg-primary text-white border-b border-primary-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-100 mb-3">
          {kicker}
        </p>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-white leading-[1.15] max-w-3xl">
          {title}
        </h1>

        <div
          data-hero-step="2"
          className="hero-rule w-12 h-0.5 bg-accent mt-5 mb-5"
          aria-hidden="true"
        />

        <p className="max-w-2xl text-white/90 text-base sm:text-lg leading-relaxed">
          {description}
        </p>

        {meta && meta.length > 0 && (
          <ul className="mt-7 pt-5 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-blue-100 tabular-nums">
            {meta.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
