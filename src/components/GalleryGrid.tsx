'use client';

import { useMemo, useState } from 'react';
import WorkCard from './WorkCard';
import type { Work } from '@/content/catalog';

export default function GalleryGrid({ works, filters }: { works: Work[]; filters?: { slug: string; title: string }[] }) {
  const [active, setActive] = useState<string>('all');
  const shown = useMemo(() => (active === 'all' ? works : works.filter((w) => w.collection === active)), [active, works]);

  return (
    <section className="lk-container pb-20 lg:pb-[100px]">
      {filters && filters.length > 0 && (
        <div className="mb-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-line py-5">
          <span className="text-[14px] font-bold uppercase leading-[14px] tracking-[0.05em] text-[#767676]">Galleries</span>
          {[{ slug: 'all', title: 'View All' }, ...filters].map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => setActive(f.slug)}
              className={`text-[14px] leading-[21px] transition-colors ${active === f.slug ? 'font-bold text-accent-dark underline underline-offset-4' : 'text-[#77776d] hover:text-[#222]'}`}
            >
              {f.title}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((w, i) => (
          <WorkCard key={w.slug} work={w} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
