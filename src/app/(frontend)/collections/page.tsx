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
        intro="Six bodies of work, each a journey — the high peaks and their glaciers, the lakes and forests of the high country, fleeting light, the colour of water, wide open horizons and the great animals of the wild."
      />
      <section className="lk-container pb-20 lg:pb-[120px]">
        <div className="grid grid-cols-1 gap-[34px] sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => {
            const count = getWorksInCollection(c.slug).length;
            const img = getImage(c.cover);
            return (
              <Reveal key={c.slug} delay={(i % 3) * 100}>
                {/* lik.com collection card: #efefef mat, photograph contained inside, small caps title + link */}
                <Link href={`/collections/${c.slug}`} className="group block bg-[#efefef] px-[7%] pb-8 pt-[9%] text-center transition-colors duration-300 hover:bg-[#e8e8e7]">
                  <div className="relative flex aspect-[325/199] items-center justify-center">
                    <Image src={img.src} alt={`${c.title} gallery`} width={img.width} height={img.height} quality={75} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 420px" priority={i < 3} className="zoom-img h-auto max-h-full w-auto max-w-full object-contain shadow-[0_3px_10px_rgba(0,0,0,0.22)]" />
                  </div>
                  <h2 className="lk-card-title mt-8">{c.title}</h2>
                  <p className="lk-card-edition mt-3">{count} {count === 1 ? 'Work' : 'Works'}</p>
                  <span className="lk-cta-link mt-4 text-accent-dark">Explore Collection</span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
