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
      className="bg-gradient-to-r from-maroon via-[#5c0017] to-maroon text-white py-12 sm:py-16 px-4 sm:px-6 border-b-4 border-gold"
    >
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/25 border border-gold/45 text-gold text-xs font-semibold uppercase tracking-wider mb-4">
          <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{badge}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight leading-tight">
          {title}
        </h1>
        <p className="max-w-3xl mx-auto text-slate-100 text-base sm:text-lg leading-relaxed">
          {description}
        </p>
        {chips && chips.length > 0 && (
          <ul className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 text-xs font-medium text-white/90">
            {chips.map((chip) => (
              <li
                key={chip}
                className="bg-black/30 px-3 py-1.5 rounded-lg border border-white/15"
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
