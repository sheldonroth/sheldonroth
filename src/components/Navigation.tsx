'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Wordmark from './Wordmark';

type GalleryLink = { slug: string; title: string };

const links = [
  { href: '/shop', label: 'The Work' },
  { href: '/collections', label: 'The Galleries' },
  { href: '/new-releases', label: 'New Releases' },
  { href: '/artist', label: 'The Artist' },
  { href: '/gift', label: 'Gifts' },
  { href: '/contact', label: 'Inquire' },
];

export default function Navigation({ galleries }: { galleries: GalleryLink[] }) {
  /** "The Work" menu, numbered as on lik.com: the curated tiers first, then every gallery. */
  const workMenu = [
    { href: '/shop', label: 'View All' },
    { href: '/new-releases', label: 'New Releases' },
    { href: '/premier', label: 'Premier Works' },
    ...galleries.map((c) => ({ href: `/collections/${c.slug}`, label: c.title })),
  ];
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  // The menu is tied to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;

  // Only the home and artist pages start with a full-bleed photo under the header (as on lik.com).
  const overlay = pathname === '/' || pathname === '/artist';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const light = overlay && !scrolled && !open; // white text over photo
  // Product pages open on lik.com's grey band, so the header shares that grey until the page scrolls.
  const tint = pathname.startsWith('/shop/') && !scrolled && !open;
  const compact = scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          light ? 'bg-transparent text-white' : tint ? 'bg-[#edecec] text-[#222]' : 'bg-white text-[#222]'
        } ${compact ? 'shadow-[0_1px_0_rgba(0,0,0,0.08)]' : ''}`}
      >
        {light && <div className="lk-scrim-top pointer-events-none absolute inset-0 -z-10 h-[180%]" />}
        <div
          className={`flex w-full items-center justify-between px-5 transition-all duration-300 lg:px-20 ${
            compact ? 'h-[70px] lg:h-[66px]' : 'h-[70px] lg:h-[166px]'
          }`}
        >
          <Wordmark />

          <nav className="hidden lg:block" aria-label="Primary">
            <ul className="flex items-center">
              {links.map((l) => {
                const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
                if (l.href === '/shop') {
                  return (
                    <li key={l.href} className="group relative">
                      <Link
                        href={l.href}
                        aria-haspopup="true"
                        aria-current={active ? 'page' : undefined}
                        className={`lk-nav block p-5 transition-opacity hover:opacity-70 ${active ? 'underline underline-offset-8' : ''}`}
                      >
                        {l.label}
                      </Link>
                      <div className="invisible absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 bg-white pb-5 pt-4 text-[#222] opacity-0 shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-opacity duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                        <ul>
                          {workMenu.map((m, i) => (
                            <li key={m.href}>
                              <Link href={m.href} className="flex gap-4 px-7 py-[7px] text-[14px] leading-[20px] hover:bg-[#f4f4f2]">
                                <span className="w-7 text-[#9a9a90]">/{String(i + 1).padStart(2, '0')}</span>
                                <span>{m.label}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                }
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? 'page' : undefined}
                      className={`lk-nav block p-5 transition-opacity hover:opacity-70 ${active ? 'underline underline-offset-8' : ''}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/cart" className="relative flex h-11 items-center gap-1.5 px-2 hover:opacity-70" aria-label={`Cart, ${totalItems} items`}>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 18a2 2 0 100 4 2 2 0 000-4zm10 0a2 2 0 100 4 2 2 0 000-4zM5.2 4l.4 2H21l-2.2 8.2a1 1 0 01-1 .8H8.1l.4 2H19v2H7.7a1 1 0 01-1-.8L4 4H1V2h3.8a1 1 0 01.4 2z" />
              </svg>
              <span className="text-[13px] font-bold">{totalItems}</span>
            </Link>
            <button
              type="button"
              onClick={() => setOpenOn(open ? null : pathname)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              <span className="relative block h-3.5 w-6">
                <span className={`absolute left-0 block h-[2px] w-6 bg-current transition-all ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 top-1.5 block h-[2px] w-6 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
                <span className={`absolute left-0 block h-[2px] w-6 bg-current transition-all ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 overflow-y-auto bg-white pt-[70px] transition-opacity duration-300 lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`} aria-hidden={!open}>
        <nav className="lk-container flex flex-col pt-8" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} tabIndex={open ? 0 : -1} className="lk-nav border-b border-line py-5 text-[#222]">
              {l.label}
            </Link>
          ))}
          <Link href="/premier" tabIndex={open ? 0 : -1} className="lk-nav border-b border-line py-5 text-[#222]">Premier Works</Link>
          <p className="pt-6 text-[12px] font-bold uppercase tracking-[0.08em] text-[#767676]">Galleries</p>
          <div className="grid grid-cols-2 gap-x-6 pb-10 pt-2">
            {galleries.map((c) => (
              <Link key={c.slug} href={`/collections/${c.slug}`} tabIndex={open ? 0 : -1} className="py-2 text-[15px] text-[#222]">
                {c.title}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
