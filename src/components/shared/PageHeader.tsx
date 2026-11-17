import type { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  badge: string;
  title: string;
  description: string;
  icon: LucideIcon;
  chips?: string[];
}

export default function PageHeader({
  badge,
  title,
  description,
  icon: Icon,
  chips,
}: PageHeaderProps) {
  return (
    <section
      data-dark-surface
      className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-12 sm:py-16 px-4 sm:px-6 border-b border-primary-dark"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
          <Icon className="w-4 h-4 text-blue-100 shrink-0" aria-hidden="true" />
          <span>{badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
          {title}
        </h1>
        <div
          className="w-16 h-1 rounded-full bg-accent mx-auto mb-4"
          aria-hidden="true"
        />
        <p className="max-w-3xl mx-auto text-white/90 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
        {chips && chips.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs font-medium text-white/95">
            {chips.map((chip) => (
              <li
                key={chip}
                className="bg-black/25 px-3 py-1.5 rounded-lg border border-white/20"
              >
                {chip}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
