import Link from 'next/link';
import { collections } from '@/content/catalog';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#1f1f21] text-white">
      <div className="lk-container pb-6 pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="lk-wordmark mb-5"><span className="font-semibold">Sheldon Roth</span> <small>Fine Art</small></p>
            <p className="text-[14px] leading-[17.86px] text-white">Limited edition fine art photography, signed and numbered by the artist.</p>
            <Link href="/contact" className="lk-footer-link mt-4 block underline-offset-4 hover:underline">Inquire</Link>
          </div>
          <div>
            <h2 className="lk-footer-h mb-4">Shop by Gallery</h2>
            <ul>
              {collections.map((c) => (
                <li key={c.slug}><Link href={`/collections/${c.slug}`} className="lk-footer-link hover:underline">{c.title}</Link></li>
              ))}
              <li><Link href="/new-releases" className="lk-footer-link hover:underline">New Releases</Link></li>
              <li><Link href="/best-sellers" className="lk-footer-link hover:underline">Best Sellers</Link></li>
              <li><Link href="/shop" className="lk-footer-link hover:underline">All Limited Editions</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="lk-footer-h mb-4">Collector Services</h2>
            <ul>
              <li><Link href="/contact" className="lk-footer-link hover:underline">Inquire</Link></li>
              <li><Link href="/faq" className="lk-footer-link hover:underline">FAQ</Link></li>
              <li><Link href="/shipping-returns" className="lk-footer-link hover:underline">Shipping &amp; Returns</Link></li>
              <li><Link href="/care-instructions" className="lk-footer-link hover:underline">Caring for Your Art</Link></li>
              <li><Link href="/certificate" className="lk-footer-link hover:underline">Certificate of Authenticity</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="lk-footer-h mb-4">About</h2>
            <ul>
              <li><Link href="/artist" className="lk-footer-link hover:underline">The Artist</Link></li>
              <li><Link href="/cart" className="lk-footer-link hover:underline">Cart</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-center gap-x-6 border-t border-white/15 pt-4 text-center md:flex-row">
          <span className="lk-legal">© {year} Sheldon Roth. All photographs © Sheldon Roth.</span>
          <Link href="/privacy" className="lk-legal px-1 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="lk-legal px-1 hover:underline">Terms of Sale</Link>
        </div>
      </div>
    </footer>
  );
}
