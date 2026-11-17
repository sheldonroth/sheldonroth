import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import GalleryGrid from '@/components/GalleryGrid';
import GallerySidebar from '@/components/GallerySidebar';
import { getNewReleases } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'New Releases',
  description: 'The latest limited edition releases from photographer Sheldon Roth.',
};

export default function NewReleasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Just Released"
        title="New Releases"
        intro="The newest additions to the collection — each one a limited edition, signed and numbered by the artist."
      />
      <GalleryGrid works={getNewReleases()} aside={<GallerySidebar active="new-releases" />} />
    </>
  );
}
