import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import WorkCard from '@/components/WorkCard';
import ProductClient from './ProductClient';
import {
  getCollection,
  getImage,
  getWork,
  getWorksInCollection,
  PRINT_DETAILS,
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
  const more = related.length >= 3 ? related.slice(0, 3) : [...related, ...works.filter((w) => w.collection !== work.collection && !related.includes(w))].slice(0, 3);

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

      <nav className="border-y border-line" aria-label="More artworks">
        <div className="mx-auto grid max-w-[1600px] grid-cols-2 px-6 lg:px-10">
          <Link href={`/shop/${prev.slug}`} className="group py-8 pr-4">
            <span className="eyebrow text-muted">← Previous</span>
            <span className="font-display mt-2 block text-2xl text-foreground group-hover:text-accent-light">{prev.title}</span>
          </Link>
          <Link href={`/shop/${next.slug}`} className="group border-l border-line py-8 pl-4 text-right">
            <span className="eyebrow text-muted">Next →</span>
            <span className="font-display mt-2 block text-2xl text-foreground group-hover:text-accent-light">{next.title}</span>
          </Link>
        </div>
      </nav>

      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal className="mb-14 text-center">
            <p className="eyebrow text-accent">Continue Exploring</p>
            <h2 className="font-display mt-3 text-4xl text-foreground lg:text-5xl">You May Also Like</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((w, i) => (
              <Reveal key={w.slug} delay={i * 100}>
                <WorkCard work={w} aspect="4/5" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
