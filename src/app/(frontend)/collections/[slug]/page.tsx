import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CollectionBanner from '@/components/CollectionBanner';
import GalleryGrid from '@/components/GalleryGrid';
import GallerySidebar from '@/components/GallerySidebar';
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
      {/* Wide inset banner, centred title + intro, then the collection list and grey-mat grid, as on lik.com */}
      <CollectionBanner src={getImage(collection.cover).src} alt={`${collection.title} gallery`} />

      <header className="lk-container pb-16 pt-14 text-center">
        <p className="lk-small">
          <Link href="/" className="hover:underline">Home</Link> / <Link href="/collections" className="hover:underline">Galleries</Link> / {collection.title}
        </p>
        <h1 className="lk-page-title mt-6">{collection.title}</h1>
        <p className="lk-intro mx-auto mt-6 max-w-[900px]">{collection.description}</p>
        <p className="lk-card-edition mt-6">{items.length} {items.length === 1 ? 'Work' : 'Works'}</p>
      </header>

      <GalleryGrid works={items} aside={<GallerySidebar active={collection.slug} />} />

      <Link href={`/collections/${next.slug}`} className="group relative block h-[360px] overflow-hidden md:h-[420px]">
        <Image quality={90} src={getImage(next.cover).src} alt={`${next.title} gallery`} fill sizes="100vw" className="zoom-img object-cover" />
        <div className="lk-scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-14 text-center text-white">
          <p className="lk-hero-eyebrow">Next Gallery</p>
          <p className="lk-hero-title mt-4">{next.title}</p>
        </div>
      </Link>
    </>
  );
}
