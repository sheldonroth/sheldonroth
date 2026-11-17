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
  const more = related.length >= 4 ? related.slice(0, 4) : [...related, ...works.filter((w) => w.collection !== work.collection && !w.webOnly && !related.includes(w))].slice(0, 4);

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

      {/* lik.com: grey band, "You Might Also Like" heading left with a gallery link right, four dark mats */}
      <section className="bg-[#edecec] py-14 lg:py-20">
        <div className="lk-container">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="lk-edition-label">You Might Also Like</p>
              <h2 className="mt-3 text-[30px] font-light leading-[1.1] tracking-[0.03em] text-accent md:text-[45px]">Explore more from this gallery</h2>
            </div>
            <Link href={`/collections/${collection.slug}`} className="lk-btn lk-btn-gold shrink-0">Shop the Gallery</Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {more.map((w, i) => (
              <Reveal key={w.slug} delay={i * 100}>
                <WorkCard work={w} tone="dark" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px" />
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
