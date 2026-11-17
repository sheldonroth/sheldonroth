import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { collections, getImage, getWorksInCollection } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Galleries',
  description: 'Explore the fine art photography galleries of Sheldon Roth — high peaks and ice, mountain and forest, light and sky, water and far horizons.',
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Galleries"
        title="Explore the Collections"
        intro="Five bodies of work, each a journey — the high peaks and their glaciers, the lakes and forests of the high country, fleeting light, the colour of water and wide open horizons."
      />
      <section className="lk-container pb-20 lg:pb-[100px]">
        <div className="grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-3">
          {collections.map((c, i) => {
            const count = getWorksInCollection(c.slug).length;
            return (
              <Reveal key={c.slug} delay={i * 100}>
                <Link href={`/collections/${c.slug}`} className="group block text-center">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <Image src={getImage(c.cover).src} alt={`${c.title} gallery`} fill quality={85} sizes="(max-width: 768px) 100vw, 33vw" priority={i === 0} className="zoom-img object-cover" />
                  </div>
                  <h2 className="lk-related-title mt-6">{c.title}</h2>
                  <p className="lk-card-edition mt-2">{count} {count === 1 ? 'Work' : 'Works'}</p>
                  <p className="lk-body mx-auto mt-3 max-w-sm">{c.description}</p>
                  <span className="lk-btn lk-btn-gold mt-6">View Gallery</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
