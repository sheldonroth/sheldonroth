'use client';

import { useMemo, useState, type ReactNode } from 'react';
import WorkCard from './WorkCard';
import type { Work } from '@/content/catalog';

/**
 * lik.com collection layout: a narrow collection list on the left (desktop) and a three-column grid of grey
 * mats on the right. With `filters` the list filters in place (the shop); otherwise `aside` is shown.
 */
export default function GalleryGrid({ works, filters, aside }: { works: Work[]; filters?: { slug: string; title: string }[]; aside?: ReactNode }) {
  const [active, setActive] = useState<string>('all');
  const shown = useMemo(() => (active === 'all' ? works : works.filter((w) => w.collection === active && !w.webOnly)), [active, works]);
  const options = filters && filters.length > 0 ? [{ slug: 'all', title: 'View All' }, ...filters] : null;

  return (
    <section className="lk-container pb-20 lg:pb-[100px]">
      {options && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-y border-line py-5 lg:hidden">
          <span className="text-[14px] font-bold uppercase leading-[14px] tracking-[0.05em] text-[#767676]">Galleries</span>
          {options.map((f) => (
            <button key={f.slug} type="button" onClick={() => setActive(f.slug)}
              className={`text-[14px] leading-[21px] transition-colors ${active === f.slug ? 'font-bold text-accent-dark underline underline-offset-4' : 'text-[#77776d] hover:text-[#222]'}`}>
              {f.title}
            </button>
          ))}
        </div>
      )}
      <div className="lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-[60px] min-[1800px]:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          {options ? (
            <nav aria-label="Galleries" className="sticky top-[96px]">
              <p className="border-b border-line pb-3 text-[14px] font-bold uppercase leading-[14px] tracking-[0.05em] text-[#767676]">Galleries</p>
              <ul className="mt-3">
                {options.map((f) => (
                  <li key={f.slug}>
                    <button type="button" onClick={() => setActive(f.slug)} aria-pressed={active === f.slug}
                      className={`block w-full py-[5px] text-left text-[14px] leading-[21px] transition-colors ${active === f.slug ? 'font-bold text-accent-dark' : 'text-[#77776d] hover:text-[#222]'}`}>
                      {f.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          ) : (
            aside
          )}
        </aside>
        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((w, i) => (
            <WorkCard key={w.slug} work={w} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
