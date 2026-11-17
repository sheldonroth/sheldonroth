import Image from 'next/image';
import Link from 'next/link';
import HeroSlideshow from '@/components/HeroSlideshow';
import Reveal from '@/components/Reveal';
import WorkCard from '@/components/WorkCard';
import { collections, getBestSellers, getCollection, getHeroWorks, getImage, getNewReleases, getWork } from '@/content/catalog';

export default function Home() {
  const slides = getHeroWorks().map((w) => ({
    slug: w.slug,
    title: w.title,
    collection: getCollection(w.collection)?.title ?? '',
    editionSize: w.editionSize,
    src: getImage(w.slug).src,
    blurb: w.description,
  }));

  const newReleases = getNewReleases();
  const bestSellers = getBestSellers().slice(0, 6);
  const panorama = getWork('roof-of-the-world')!;
  const panoImg = getImage(panorama.slug);
  const artistImage = getImage('sentinel');

  return (
    <>
      <HeroSlideshow slides={slides} />

      {/* Intro */}
      <section className="lk-section text-center">
        <div className="lk-container">
          <Reveal>
            <p className="lk-eyebrow">Limited Edition Fine Art Photography</p>
            <h2 className="lk-h2 mx-auto mt-6 max-w-4xl">Light, water and wild places</h2>
            <p className="lk-body mx-auto mt-6 max-w-[760px]">
              Every photograph is captured in a single moment and produced as a strictly limited edition. Each print is hand-signed,
              numbered and accompanied by a certificate of authenticity.
            </p>
            <div className="mt-10">
              <Link href="/shop" className="lk-btn lk-btn-gold">Explore the Work</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* New releases */}
      <section className="lk-section border-t border-line">
        <div className="lk-container">
          <div className="text-center">
            <p className="lk-eyebrow">Just Released</p>
            <h2 className="lk-h2 mt-6">New Releases</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
            {newReleases.map((w) => (
              <WorkCard key={w.slug} work={w} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/new-releases" className="lk-btn lk-btn-gold">View All New Releases</Link>
          </div>
        </div>
      </section>

      {/* Feature panorama */}
      <section className="lk-hero-h relative overflow-hidden lg:mx-10">
        <Image quality={90} src={panoImg.src} alt={`${panorama.title} by Sheldon Roth`} fill sizes="100vw" className="object-cover" />
        <div className="lk-scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-16 text-center text-white md:pb-20">
          <p className="lk-hero-eyebrow">Featured Panorama</p>
          <h2 className="lk-hero-title mt-4">{panorama.title}</h2>
          <div className="mt-8">
            <Link href={`/shop/${panorama.slug}`} className="lk-btn lk-btn-light">Discover</Link>
          </div>
        </div>
      </section>

      {/* Galleries */}
      <section className="lk-section">
        <div className="lk-container">
          <div className="text-center">
            <p className="lk-eyebrow">Shop by Gallery</p>
            <h2 className="lk-h2 mt-6">The Galleries</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {collections.map((c) => {
              const img = getImage(c.cover);
              return (
                <Link key={c.slug} href={`/collections/${c.slug}`} className="group relative block aspect-[4/5] overflow-hidden bg-black">
                  <Image quality={85} src={img.src} alt={`${c.title} gallery`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw" className="zoom-img object-cover" />
                  <div className="lk-scrim absolute inset-0" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-center text-white">
                    <h3 className="lk-h2-sm">{c.title}</h3>
                    <span className="lk-cta-link mt-4">View Gallery</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Artist */}
      <section className="bg-surface">
        <div className="lk-container grid grid-cols-1 items-center gap-10 py-[60px] md:grid-cols-2 lg:gap-20 lg:py-[120px]">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[4/5]">
            <Image quality={85} src={artistImage.src} alt="Sentinel by Sheldon Roth" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <Reveal>
            <p className="lk-eyebrow">The Artist</p>
            <h2 className="lk-h2 mt-6">Sheldon Roth</h2>
            <p className="lk-body mt-6">
              Sheldon Roth photographs high peaks, wild water and far horizons, waiting for the rare moments when light
              transforms a scene.
            </p>
            <p className="lk-body mt-4">
              His limited editions are printed to museum standards and released in small numbers, so each one remains a rare and
              personal object for the collector.
            </p>
            <div className="mt-10">
              <Link href="/artist" className="lk-btn lk-btn-gold">Meet the Artist</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Best sellers */}
      <section className="lk-section">
        <div className="lk-container">
          <div className="text-center">
            <p className="lk-eyebrow">Collector Favourites</p>
            <h2 className="lk-h2 mt-6">Best Sellers</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((w) => (
              <WorkCard key={w.slug} work={w} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link href="/best-sellers" className="lk-btn lk-btn-gold">View All Best Sellers</Link>
          </div>
        </div>
      </section>

      {/* Inquire */}
      <section className="bg-black text-white">
        <div className="lk-container py-[60px] text-center lg:py-[100px]">
          <p className="lk-eyebrow text-white">Private Consultations</p>
          <h2 className="lk-h2 mt-6 text-white">Find the right piece for your space</h2>
          <p className="lk-body mx-auto mt-6 max-w-[700px] text-white">
            Questions about sizing, framing or availability of an edition? Get in touch and Sheldon will help you choose the perfect work.
          </p>
          <div className="mt-10">
            <Link href="/contact" className="lk-btn lk-btn-light">Inquire</Link>
          </div>
        </div>
      </section>
    </>
  );
}
