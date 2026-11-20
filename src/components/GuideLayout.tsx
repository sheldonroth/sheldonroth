import Link from 'next/link';
import type { ReactNode } from 'react';
import PageHeader from '@/components/PageHeader';
import { JsonLd } from '@/lib/schema';

const GUIDES = [
  { href: '/guides/lumachrome-acrylic-prints', title: 'Lumachrome Acrylic Prints' },
  { href: '/guides/sizing-large-format-photography', title: 'Sizing Large-Format Photography' },
  { href: '/guides/limited-edition-photography-pricing', title: 'Limited-Edition Pricing' },
];

export default function GuideLayout({
  title,
  intro,
  jsonLd,
  children,
}: {
  title: string;
  intro: string;
  jsonLd: unknown;
  children: ReactNode;
}) {
  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader title={title} intro={intro} />
      <article className="lk-container pb-16 lg:pb-24">
        <div className="mx-auto max-w-[760px] space-y-12">{children}</div>
      </article>
      <section className="border-t border-line bg-surface">
        <div className="lk-container py-16 text-center lg:py-20">
          <p className="lk-eyebrow">Collector Guides</p>
          <h2 className="lk-h2 mt-6">Continue reading</h2>
          <ul className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link href={g.href} className="lk-cta-link text-accent-dark">
                  {g.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/guides" className="lk-btn lk-btn-gold">All Guides</Link>
            <Link href="/contact" className="lk-btn lk-btn-gold">Inquire</Link>
          </div>
          <p className="lk-body mx-auto mt-10 max-w-[640px]">
            Interior designer or art consultant?{' '}
            <Link href="/trade" className="text-accent-dark underline underline-offset-4">The trade program</Link> offers 20% off every edition.
          </p>
        </div>
      </section>
    </>
  );
}

export function GuideSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-[22px] font-light leading-tight tracking-[0.03em] text-ink md:text-[28px]">{title}</h2>
      <div className="mt-5 space-y-4">{children}</div>
    </section>
  );
}

export function GuideFaqs({ items }: { items: { q: string; a: ReactNode }[] }) {
  return (
    <section>
      <h2 className="text-[22px] font-light leading-tight tracking-[0.03em] text-ink md:text-[28px]">Questions collectors often ask</h2>
      <dl className="mt-8 space-y-8">
        {items.map((item) => (
          <div key={item.q}>
            <dt className="text-[16px] font-medium leading-snug tracking-[0.02em] text-ink">{item.q}</dt>
            <dd className="lk-body mt-3">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
