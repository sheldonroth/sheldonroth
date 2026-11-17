import Link from 'next/link';
import Wordmark from './Wordmark';
import { collections, SITE } from '@/content/catalog';

const info = [
  { href: '/artist', label: 'The Artist' },
  { href: '/contact', label: 'Inquire' },
  { href: '/faq', label: 'FAQ' },
  { href: '/shipping-returns', label: 'Shipping & Returns' },
  { href: '/care-instructions', label: 'Caring for Your Art' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-[#070707]">
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 lg:py-24">
        <div className="flex flex-col items-center text-center">
          <Wordmark size="lg" />
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted">
            Limited edition fine art photography, hand-signed and numbered by the artist.
          </p>
          <Link href="/contact" className="btn btn-outline mt-10">
            Speak With the Gallery
          </Link>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-line pt-14 md:grid-cols-4">
          <div>
            <h3 className="eyebrow mb-6 text-accent">Galleries</h3>
            <ul className="space-y-3">
              {collections.map((c) => (
                <li key={c.slug}>
                  <Link href={`/collections/${c.slug}`} className="text-sm text-foreground/70 transition-colors hover:text-foreground">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-6 text-accent">Collect</h3>
            <ul className="space-y-3">
              <li><Link href="/new-releases" className="text-sm text-foreground/70 hover:text-foreground">New Releases</Link></li>
              <li><Link href="/shop" className="text-sm text-foreground/70 hover:text-foreground">Limited Editions</Link></li>
              <li><Link href="/best-sellers" className="text-sm text-foreground/70 hover:text-foreground">Best Sellers</Link></li>
              <li><Link href="/cart" className="text-sm text-foreground/70 hover:text-foreground">Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-6 text-accent">Information</h3>
            <ul className="space-y-3">
              {info.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-foreground/70 transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-6 text-accent">Studio</h3>
            <p className="text-sm leading-relaxed text-foreground/70">{SITE.location}</p>
            <a href={`mailto:${SITE.email}`} className="mt-3 block break-all text-sm text-foreground/70 hover:text-foreground">
              {SITE.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted md:flex-row">
          <p>© {year} Sheldon Roth. All photographs © Sheldon Roth. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
