import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import Image from 'next/image';
import ProductClient from './ProductClient';
import {
  getCollection,
  getImage,
  getWork,
  getWorksInCollection,
  formatPrice,
  PRINT_DETAILS,
  PRINT_SIZES,
  sizesFor,
  works,
} from '@/content/catalog';

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: 'Artwork Not Found' };
  const img = getImage(work.slug);
  return {
    title: `${work.title} — Limited Edition ${work.editionSize}`,
    description: work.description,
    openGraph: { title: `${work.title} by Sheldon Roth`, description: work.description, images: [{ url: img.src, width: img.width, height: img.height }] },
  };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const collection = getCollection(work.collection)!;
  const image = getImage(work.slug);
  const related = getWorksInCollection(work.collection).filter((w) => w.slug !== work.slug);
  const more = related.length >= 3 ? related.slice(0, 3) : [...related, ...works.filter((w) => w.collection !== work.collection && !w.webOnly && !related.includes(w))].slice(0, 3);

  const index = works.findIndex((w) => w.slug === work.slug);
  const prev = works[(index - 1 + works.length) % works.length];
  const next = works[(index + 1) % works.length];

  return (
    <>
      <ProductClient
        work={{
          slug: work.slug,
          title: work.title,
          description: work.description,
          editionSize: work.editionSize,
          collectionTitle: collection.title,
          collectionSlug: collection.slug,
          image,
          sizes: sizesFor(work.slug),
          details: PRINT_DETAILS,
        }}
      />

      <section className="lk-section">
        <div className="lk-container">
          <Reveal className="mb-14 text-center">
            <h2 className="text-[30px] font-light leading-[1.1] tracking-[0.02em] text-[#222] md:text-[45px]">You May Also Like</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((w, i) => (
              <Reveal key={w.slug} delay={i * 100}>
                <Link href={`/shop/${w.slug}`} className="group block text-center">
                  <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden">
                    <Image quality={85} src={getImage(w.slug).src} alt={`${w.title} by Sheldon Roth`} width={getImage(w.slug).width} height={getImage(w.slug).height} sizes="(max-width: 640px) 100vw, 33vw" className="zoom-img h-auto max-h-full w-auto max-w-full object-contain" />
                  </div>
                  <h3 className="lk-related-title mt-6">{w.title}</h3>
                  <p className="lk-related-edition mt-3">Limited Edition of {w.editionSize}</p>
                  <p className="mt-3 text-[18px] leading-[27px] text-accent-dark">From {formatPrice(PRINT_SIZES[0].price)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <nav className="border-t border-line" aria-label="More artworks">
        <div className="lk-container grid grid-cols-2">
          <Link href={`/shop/${prev.slug}`} className="group py-8 pr-4">
            <span className="lk-edition-label">← Previous</span>
            <span className="lk-related-title mt-3 block group-hover:underline">{prev.title}</span>
          </Link>
          <Link href={`/shop/${next.slug}`} className="group border-l border-line py-8 pl-4 text-right">
            <span className="lk-edition-label">Next →</span>
            <span className="lk-related-title mt-3 block group-hover:underline">{next.title}</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
