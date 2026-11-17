'use client';

import { useState } from 'react';
import {
  FlaskConical,
  Microscope,
  Cpu,
  Globe,
  TrendingUp,
  BookOpen,
  Music,
  Palette,
  Trophy,
  type LucideIcon,
} from 'lucide-react';
import { cbcPathways } from '@/data/mock';

const iconMap: Record<string, LucideIcon> = {
  FlaskConical,
  Microscope,
  Cpu,
  Globe,
  TrendingUp,
  BookOpen,
  Music,
  Palette,
  Trophy,
};

export default function PathwaysPreview() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-10">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: '#800020' }}
          >
            CBC Pathways
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto mb-4"
            style={{ backgroundColor: '#D4AF37' }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our three pathways designed to match every student&apos;s
            talents and aspirations.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex border-b-2 border-gray-200">
            {cbcPathways.map((pathway, index) => (
              <button
                key={pathway.id}
                onClick={() => setActiveTab(index)}
                className="relative px-5 md:px-8 py-3 text-sm md:text-base font-semibold transition-colors"
                style={{
                  color: activeTab === index ? '#800020' : '#6b7280',
                }}
              >
                {pathway.name}
                {/* Active underline */}
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 transition-all duration-300"
                  style={{
                    backgroundColor: '#D4AF37',
                    transform: activeTab === index ? 'scaleX(1)' : 'scaleX(0)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Track Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cbcPathways[activeTab].tracks.map((track) => {
            const Icon = iconMap[track.icon];
            return (
              <div
                key={track.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  {Icon && (
                    <div
                      className="p-2.5 rounded-lg"
                      style={{ backgroundColor: 'rgba(212,175,55,0.1)' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#D4AF37' }} />
                    </div>
                  )}
                  <h3
                    className="text-lg font-bold"
                    style={{ color: '#800020' }}
                  >
                    {track.name}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {track.description}
                </p>

                {/* Subjects */}
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Key Subjects
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {track.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: 'rgba(128,0,32,0.06)',
                          color: '#800020',
                        }}
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Careers */}
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Career Prospects
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {track.careers.map((career) => (
                      <span
                        key={career}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          backgroundColor: 'rgba(212,175,55,0.1)',
                          color: '#7a6520',
                        }}
                      >
                        {career}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
