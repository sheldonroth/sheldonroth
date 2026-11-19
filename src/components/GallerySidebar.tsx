import Link from 'next/link';
import { collections } from '@/content/catalog';

/** Left-hand collection list, as on lik.com collection pages (desktop only). */
export default function GallerySidebar({ active }: { active?: string }) {
  const items = [
    { href: '/shop', slug: 'all', title: 'View All' },
    { href: '/new-releases', slug: 'new-releases', title: 'New Releases' },
    { href: '/premier', slug: 'premier', title: 'Premier Works' },
    ...collections.map((c) => ({ href: `/collections/${c.slug}`, slug: c.slug, title: c.title })),
  ];
  return (
    <nav aria-label="Galleries" className="sticky top-[96px]">
      <p className="border-b border-line pb-3 text-[14px] font-bold uppercase leading-[14px] tracking-[0.05em] text-[#767676]">Galleries</p>
      <ul className="mt-3">
        {items.map((i) => (
          <li key={i.slug}>
            <Link
              href={i.href}
              aria-current={active === i.slug ? 'page' : undefined}
              className={`block py-[5px] text-[14px] leading-[21px] transition-colors ${active === i.slug ? 'font-bold text-accent-dark' : 'text-[#77776d] hover:text-[#222]'}`}
            >
              {i.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
