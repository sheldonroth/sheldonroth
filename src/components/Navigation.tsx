'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Wordmark from './Wordmark';

const leftLinks = [
  { href: '/collections', label: 'Galleries' },
  { href: '/new-releases', label: 'New Releases' },
  { href: '/shop', label: 'Limited Editions' },
];

const rightLinks = [
  { href: '/best-sellers', label: 'Best Sellers' },
  { href: '/artist', label: 'The Artist' },
  { href: '/contact', label: 'Inquire' },
];

export default function Navigation() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  // The menu is tied to the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (fn: (v: boolean) => boolean) => setOpenOn(fn(open) ? pathname : null);

  // Pages whose first section is a full-bleed image get a transparent header.
  const overlay = pathname === '/' || pathname === '/artist' || pathname.startsWith('/collections/');

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

  const solid = scrolled || !overlay || open;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? 'bg-[#0a0a0a]/92 backdrop-blur-md border-b border-line'
            : 'bg-gradient-to-b from-black/60 to-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto grid h-[72px] max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 lg:h-[92px] lg:px-10">
          {/* Left */}
          <nav className="hidden items-center gap-8 xl:gap-10 lg:flex" aria-label="Primary">
            {leftLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className="eyebrow link-line text-foreground/85 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 block h-px w-6 bg-foreground transition-all duration-300 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 top-1.5 block h-px w-6 bg-foreground transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`absolute left-0 block h-px w-6 bg-foreground transition-all duration-300 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
            </span>
          </button>

          {/* Center */}
          <div className="justify-self-center">
            <Wordmark />
          </div>

          {/* Right */}
          <div className="flex items-center justify-end gap-8 xl:gap-10">
            <nav className="hidden items-center gap-8 xl:gap-10 lg:flex" aria-label="Secondary">
              {rightLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? 'page' : undefined}
                  className="eyebrow link-line text-foreground/85 hover:text-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <Link href="/cart" className="relative -mr-2 flex h-11 w-11 items-center justify-center text-foreground/85 hover:text-foreground" aria-label={`Cart, ${totalItems} items`}>
              <svg className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12l-1 13H7L6 7zm3 0V5a3 3 0 016 0v2" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-medium text-black">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-opacity duration-500 lg:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <nav className="flex h-full flex-col justify-center gap-7 px-8 pt-16" aria-label="Mobile">
          {[...leftLinks, ...rightLinks].map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              tabIndex={open ? 0 : -1}
              className={`font-display text-4xl text-foreground transition-all duration-700 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              style={{ transitionDelay: open ? `${120 + i * 60}ms` : '0ms' }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-8 h-px w-16 bg-accent" />
          <a href="mailto:sheldon@sheldonroth.com" tabIndex={open ? 0 : -1} className="eyebrow text-muted">
            sheldon@sheldonroth.com
          </a>
        </nav>
      </div>
    </>
  );
}
