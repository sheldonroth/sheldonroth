import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import GalleryGrid from '@/components/GalleryGrid';
import { collections, works } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Limited Editions',
  description: 'Every limited edition fine art photograph by Sheldon Roth, hand-signed and numbered.',
};

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collect"
        title="Limited Editions"
        intro="Every work is released in a strictly limited, numbered edition — face-mounted to acrylic, hand-signed and accompanied by a certificate of authenticity."
      />
      <GalleryGrid works={works} filters={collections.map((c) => ({ slug: c.slug, title: c.title }))} />
    </>
  );
}
