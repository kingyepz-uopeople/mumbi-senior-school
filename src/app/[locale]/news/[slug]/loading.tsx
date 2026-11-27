export default function NewsArticleLoading() {
  return (
    <div className="bg-slate-bg">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <p className="sr-only">Loading notice</p>
        <div
          className="mb-6 h-5 w-40 rounded bg-primary/15"
          aria-hidden="true"
        />
        <div
          className="notice-board notice-board--story"
          data-light-surface=""
          aria-busy="true"
          aria-live="polite"
        >
          <article
            className="notice-paper notice-paper--expanded"
            style={{ backgroundColor: '#F8FAFC' }}
            data-light-surface=""
          >
            <div className="notice-paper__body space-y-4">
              <div
                className="h-5 w-24 rounded-full"
                style={{ backgroundColor: 'rgba(17, 81, 145, 0.18)' }}
                aria-hidden="true"
              />
              <div
                className="h-3 w-32 rounded"
                style={{ backgroundColor: 'rgba(12, 61, 110, 0.14)' }}
                aria-hidden="true"
              />
              <div
                className="h-8 w-4/5 max-w-xl rounded sm:h-10"
                style={{ backgroundColor: 'rgba(12, 61, 110, 0.2)' }}
                aria-hidden="true"
              />
              <div className="space-y-2.5 pt-3" aria-hidden="true">
                <div className="h-3 w-full rounded bg-slate-200" />
                <div className="h-3 w-[94%] rounded bg-slate-200" />
                <div className="h-3 w-[88%] rounded bg-slate-200" />
                <div className="h-3 w-[72%] rounded bg-slate-200" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
