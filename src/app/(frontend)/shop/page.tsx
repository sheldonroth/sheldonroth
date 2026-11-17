import Link from 'next/link';
import type { Metadata } from 'next';
import CollectionBanner from '@/components/CollectionBanner';
import GalleryGrid from '@/components/GalleryGrid';
import { collections, getImage, works } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Limited Editions',
  description: 'Every limited edition fine art photograph by Sheldon Roth, hand-signed and numbered.',
};

export default function ShopPage() {
  return (
    <>
      <CollectionBanner src={getImage('range-of-light').src} alt="Range of Light by Sheldon Roth" />
      <header className="lk-container pb-16 pt-14 text-center">
        <p className="lk-small">
          <Link href="/" className="hover:underline">Home</Link> / Limited Editions
        </p>
        <h1 className="lk-page-title mt-6">View All Limited Editions</h1>
        <p className="lk-intro mx-auto mt-6 max-w-[900px]">
          Every work is released in a strictly limited, numbered edition — face-mounted to acrylic, hand-signed and accompanied by a
          certificate of authenticity.
        </p>
      </header>
      <GalleryGrid works={works} filters={collections.map((c) => ({ slug: c.slug, title: c.title }))} />
    </>
  );
}
