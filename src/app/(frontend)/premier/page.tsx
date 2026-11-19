import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import GalleryGrid from '@/components/GalleryGrid';
import GallerySidebar from '@/components/GallerySidebar';
import { getWorksInTier } from '@/content/catalog';
import { TIERS } from '@/content/pricing';

export const metadata: Metadata = {
  title: 'Premier Works',
  description: `The five defining photographs by Sheldon Roth, each released in an edition of only ${TIERS.premier.edition} across all sizes.`,
};

export default function PremierPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Rarest Editions"
        title="Premier Works"
        intro={`The five photographs Sheldon considers his finest. Each is released in an edition of only ${TIERS.premier.edition} prints across all sizes, with ${TIERS.premier.artistProofs} Artist Proofs.`}
      />
      <GalleryGrid works={getWorksInTier('premier')} aside={<GallerySidebar active="premier" />} />
    </>
  );
}
