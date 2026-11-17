import { ArrowRight } from 'lucide-react';
import { newsItems } from '@/data/mock';

const categoryColors: Record<string, { bg: string; text: string }> = {
  Newsletter: { bg: 'rgba(59,130,246,0.1)', text: '#2563eb' },
  Circular: { bg: 'rgba(245,158,11,0.1)', text: '#d97706' },
  Download: { bg: 'rgba(34,197,94,0.1)', text: '#16a34a' },
  Event: { bg: 'rgba(139,92,246,0.1)', text: '#7c3aed' },
};

export default function LatestNews() {
  const displayItems = newsItems.slice(0, 3);

  return (
    <section className="py-16 md:py-20" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{ color: '#800020' }}
          >
            Latest News &amp; Updates
          </h2>
          <div
            className="w-16 h-1 rounded-full mx-auto"
            style={{ backgroundColor: '#D4AF37' }}
          />
        </div>

        {/* News cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item) => {
            const colors = categoryColors[item.category] || categoryColors.Event;
            return (
              <article
                key={item.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                {/* Decorative top bar */}
                <div
                  className="h-1.5"
                  style={{ backgroundColor: '#800020' }}
                />

                <div className="p-6 flex flex-col flex-1">
                  {/* Category badge */}
                  <span
                    className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-3"
                    style={{
                      backgroundColor: colors.bg,
                      color: colors.text,
                    }}
                  >
                    {item.category}
                  </span>

                  {/* Title */}
                  <h3
                    className="font-bold text-lg mb-2 line-clamp-2"
                    style={{ color: '#800020' }}
                  >
                    {item.title}
                  </h3>

                  {/* Date */}
                  <time className="text-xs text-gray-400 mb-3">{item.date}</time>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                    {item.excerpt}
                  </p>

                  {/* Read More */}
                  <a
                    href={`/news/${item.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold transition-colors hover:gap-2"
                    style={{ color: '#D4AF37' }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
