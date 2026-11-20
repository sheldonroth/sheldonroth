import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { getImage, SITE } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Collector Guides',
  description:
    'Guides for collectors of limited-edition fine art photography — how Lumachrome acrylic prints are made, how to size a work for your wall, and how edition pricing works.',
};

const guides = [
  {
    href: '/guides/lumachrome-acrylic-prints',
    title: 'Lumachrome Acrylic Prints',
    standfirst: 'How they are made, and why collectors choose a face-mounted print.',
    cover: 'glacial-jewel',
  },
  {
    href: '/guides/sizing-large-format-photography',
    title: 'Sizing Large-Format Photography',
    standfirst: 'How to choose a size for your wall, from 24 × 16 in to panoramic 36 × 18 in.',
    cover: 'above-the-clouds',
  },
  {
    href: '/guides/limited-edition-photography-pricing',
    title: 'Limited-Edition Pricing',
    standfirst: 'Shared editions, the published price ladder, Artist Proofs and the certificate of authenticity.',
    cover: 'the-watcher',
  },
];

export default function GuidesPage() {
  return (
    <>
      <PageHeader
        title="Collector Guides"
        intro="A short reading list on craft, scale and editions — written from the same facts that appear on every work and in the studio’s collector policies."
      />
      <section className="lk-container pb-20 lg:pb-[120px]">
        <div className="grid grid-cols-1 gap-[34px] md:grid-cols-3">
          {guides.map((g, i) => {
            const img = getImage(g.cover);
            return (
              <Reveal key={g.href} delay={i * 100}>
                <Link href={g.href} className="group block bg-[#efefef] px-[7%] pb-8 pt-[9%] text-center transition-colors duration-300 hover:bg-[#e8e8e7]">
                  <div className="relative flex aspect-[325/199] items-center justify-center">
                    <Image
                      src={img.src}
                      alt=""
                      width={img.width}
                      height={img.height}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="zoom-img h-auto max-h-full w-auto max-w-full object-contain shadow-[0_3px_10px_rgba(0,0,0,0.22)]"
                    />
                  </div>
                  <h2 className="lk-card-title mt-8">{g.title}</h2>
                  <p className="lk-body mx-auto mt-4 max-w-[28ch]">{g.standfirst}</p>
                  <span className="lk-cta-link mt-4 text-accent-dark">Read the Guide</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <p className="lk-body mx-auto mt-16 max-w-[640px] text-center">
          Questions about a particular work or room?{' '}
          <Link href="/contact" className="text-accent-dark underline underline-offset-4">
            Inquire
          </Link>
          , or visit {SITE.name} on{' '}
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-accent-dark underline underline-offset-4">
            Instagram
          </a>
          .
        </p>
      </section>
    </>
  );
}
