import { Award, Eye, Heart, Target } from 'lucide-react';
import { schoolInfo } from '@/data/mock-school-data';

export default function FoundationalPillars() {
  const textPillars = [
    {
      title: 'Our Motto',
      icon: Award,
      content: `“${schoolInfo.motto}”`,
      highlight: true,
    },
    {
      title: 'Our Mission',
      icon: Target,
      content: schoolInfo.mission,
      highlight: false,
    },
    {
      title: 'Our Vision',
      icon: Eye,
      content: schoolInfo.vision,
      highlight: false,
    },
  ];

  return (
    <section
      aria-labelledby="foundational-pillars-heading"
      className="py-14 sm:py-20 bg-white border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-maroon">
            Guiding Identity
          </span>
          <h2
            id="foundational-pillars-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
          >
            Foundational Pillars
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto mb-3">
            The principles anchoring scholarship, character formation, and
            community life at {schoolInfo.name}.
          </p>
          <div
            className="w-16 h-1 rounded-full bg-gold mx-auto"
            aria-hidden="true"
          />
        </div>

        {/* 4-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {textPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-slate-bg rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-maroon text-gold flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-maroon">
                    {pillar.title}
                  </h3>
                </div>

                <p
                  className={
                    pillar.highlight
                      ? 'font-serif italic font-bold text-xl text-slate-900 leading-snug'
                      : 'text-slate-700 text-sm leading-relaxed'
                  }
                >
                  {pillar.content}
                </p>
              </div>
            );
          })}

          {/* Core Values Card */}
          <div className="bg-slate-bg rounded-2xl border border-slate-200 border-t-4 border-t-gold p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-maroon text-gold flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-maroon">Core Values</h3>
            </div>

            <ul className="flex flex-wrap gap-2">
              {schoolInfo.coreValues.map((value) => (
                <li
                  key={value.title}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full bg-maroon/10 text-maroon"
                >
                  {value.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
