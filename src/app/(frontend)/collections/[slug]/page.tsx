import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import WorkCard from '@/components/WorkCard';
import { collections, getCollection, getImage, getWorksInCollection } from '@/content/catalog';

export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCollection(slug);
  if (!c) return {};
  return {
    title: `${c.title} Gallery`,
    description: c.description,
    openGraph: { images: [{ url: getImage(c.cover).src }] },
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();
  const items = getWorksInCollection(collection.slug);
  const idx = collections.findIndex((c) => c.slug === collection.slug);
  const next = collections[(idx + 1) % collections.length];

  return (
    <>
      <section className="relative h-[82svh] min-h-[520px] w-full overflow-hidden">
        <Image src={getImage(collection.cover).src} alt={`${collection.title} gallery`} fill priority sizes="100vw" className="kenburns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-16 text-center lg:pb-24">
          <p className="eyebrow fade-up text-accent-light">
            <Link href="/collections" className="hover:text-white">Galleries</Link> · {items.length} {items.length === 1 ? 'Work' : 'Works'}
          </p>
          <h1 className="font-display fade-up mt-4 text-6xl text-white md:text-8xl" style={{ animationDelay: '150ms' }}>
            {collection.title}
          </h1>
          <p className="fade-up mx-auto mt-6 max-w-xl leading-relaxed text-white/75" style={{ animationDelay: '300ms' }}>
            {collection.description}
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 3) * 100}>
                <WorkCard work={w} aspect="4/5" showCollection={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Link href={`/collections/${next.slug}`} className="group relative block h-[46vh] min-h-[320px] overflow-hidden">
        <Image src={getImage(next.cover).src} alt={`${next.title} gallery`} fill sizes="100vw" className="zoom-img object-cover" />
        <div className="absolute inset-0 bg-black/55 transition-colors duration-700 group-hover:bg-black/40" />
        <div className="relative flex h-full flex-col items-center justify-center text-center">
          <p className="eyebrow text-white/70">Next Gallery</p>
          <p className="font-display mt-3 text-5xl text-white lg:text-7xl">{next.title}</p>
        </div>
      </Link>
    </>
  );
}
