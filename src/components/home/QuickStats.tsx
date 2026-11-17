import {
  Calendar,
  GraduationCap,
  Route,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { quickStats } from '@/data/mock-school-data';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Users,
  GraduationCap,
  Route,
};

export default function QuickStats() {
  return (
    <section
      aria-labelledby="quick-stats-heading"
      className="bg-maroon text-white"
    >
      <h2 id="quick-stats-heading" className="sr-only">
        Mumbi Girls Senior School at a Glance
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-12">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {quickStats.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-3 rounded-xl bg-white/5 border border-white/10"
              >
                {Icon && (
                  <Icon
                    className="w-7 h-7 md:w-9 md:h-9 text-gold mb-2.5"
                    aria-hidden="true"
                  />
                )}
                <dd className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
                  {stat.value}
                </dd>
                <dt className="text-xs sm:text-sm font-medium text-white/90">
                  {stat.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
