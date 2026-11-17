import { Award, Target, Eye, Heart } from 'lucide-react';
import { schoolInfo } from '@/data/mock';

const pillars = [
  {
    title: 'Our Motto',
    icon: Award,
    content: schoolInfo.motto,
    type: 'text' as const,
  },
  {
    title: 'Our Mission',
    icon: Target,
    content: schoolInfo.mission,
    type: 'text' as const,
  },
  {
    title: 'Our Vision',
    icon: Eye,
    content: schoolInfo.vision,
    type: 'text' as const,
  },
  {
    title: 'Core Values',
    icon: Heart,
    content: schoolInfo.coreValues,
    type: 'values' as const,
  },
];

export default function FoundationalPillars() {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: '#800020' }}
          >
            Foundational Pillars
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ backgroundColor: '#D4AF37' }}
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4"
                style={{ borderTopColor: '#D4AF37' }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}
                  >
                    <Icon className="w-6 h-6" style={{ color: '#D4AF37' }} />
                  </div>
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#800020' }}
                  >
                    {pillar.title}
                  </h3>
                </div>

                {pillar.type === 'values' ? (
                  <div className="flex flex-wrap gap-2">
                    {(pillar.content as string[]).map((value) => (
                      <span
                        key={value}
                        className="text-xs font-medium px-3 py-1.5 rounded-full"
                        style={{
                          backgroundColor: 'rgba(128,0,32,0.08)',
                          color: '#800020',
                        }}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {pillar.content as string}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
