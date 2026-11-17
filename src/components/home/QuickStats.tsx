import { Calendar, Users, GraduationCap, Route, type LucideIcon } from 'lucide-react';
import { quickStats } from '@/data/mock';

const iconMap: Record<string, LucideIcon> = {
  Calendar,
  Users,
  GraduationCap,
  Route,
};

export default function QuickStats() {
  return (
    <section style={{ backgroundColor: '#800020' }}>
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {quickStats.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center group"
              >
                {Icon && (
                  <Icon
                    className="w-8 h-8 md:w-10 md:h-10 mb-3 transition-transform group-hover:scale-110"
                    style={{ color: '#D4AF37' }}
                  />
                )}
                <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-1">
                  {stat.value}
                </span>
                <span
                  className="text-sm md:text-base font-medium"
                  style={{ color: 'rgba(255,255,255,0.8)' }}
                >
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
