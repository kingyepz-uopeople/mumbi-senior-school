import WallOfFameGrid from '@/components/shared/WallOfFameGrid';

export default function WallOfFame() {
  return (
    <section
      aria-labelledby="home-wof-heading"
      className="py-14 sm:py-20 bg-white border-y border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Academic Distinction
          </span>
          <h2
            id="home-wof-heading"
            className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 mb-3"
          >
            KCSE Wall of Fame
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto mb-3">
            Celebrating our top-performing scholars and their placement in
            leading university degree programmes.
          </p>
          <div
            className="w-16 h-1 rounded-full bg-accent mx-auto"
            aria-hidden="true"
          />
        </div>

        <WallOfFameGrid />
      </div>
    </section>
  );
}
