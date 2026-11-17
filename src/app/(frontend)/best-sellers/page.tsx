import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import GalleryGrid from '@/components/GalleryGrid';
import { getBestSellers } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Best Sellers',
  description: 'The most sought-after limited edition photographs by Sheldon Roth.',
};

export default function BestSellersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collector Favourites"
        title="Best Sellers"
        intro="The works collectors return to again and again. Editions are limited — once they are gone, they are retired."
      />
      <GalleryGrid works={getBestSellers()} />
    </>
  );
}
