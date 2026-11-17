'use client';

import { useMemo, useState } from 'react';
import WorkCard from './WorkCard';
import type { Work } from '@/content/catalog';

export default function GalleryGrid({
  works,
  filters,
}: {
  works: Work[];
  filters?: { slug: string; title: string }[];
}) {
  const [active, setActive] = useState<string>('all');
  const shown = useMemo(() => (active === 'all' ? works : works.filter((w) => w.collection === active)), [active, works]);

  return (
    <section className="pb-28 lg:pb-40">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        {filters && filters.length > 0 && (
          <div className="scrollbar-hide -mx-6 mb-14 flex gap-8 overflow-x-auto border-b border-line px-6 lg:mx-0 lg:justify-center lg:px-0">
            {[{ slug: 'all', title: 'All Works' }, ...filters].map((f) => (
              <button
                key={f.slug}
                type="button"
                onClick={() => setActive(f.slug)}
                className={`eyebrow -mb-px shrink-0 border-b pb-4 transition-colors ${
                  active === f.slug ? 'border-accent text-foreground' : 'border-transparent text-muted hover:text-foreground'
                }`}
              >
                {f.title}
              </button>
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((w, i) => (
            <WorkCard key={w.slug} work={w} aspect="4/5" priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
