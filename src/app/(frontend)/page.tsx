import Image from 'next/image';
import Link from 'next/link';
import HeroSlideshow from '@/components/HeroSlideshow';
import Reveal from '@/components/Reveal';
import WorkCard from '@/components/WorkCard';
import {
  collections,
  getBestSellers,
  getCollection,
  getHeroWorks,
  getImage,
  getNewReleases,
  getWork,
  getWorksInCollection,
  works,
} from '@/content/catalog';

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
  const panorama = getWork('pacific-edge')!;
  const artistImage = getImage('solitude');
  const inquireImage = getImage('island-paradise');
  const [featuredCollection, ...otherCollections] = collections;

  return (
    <>
      <HeroSlideshow slides={slides} />

      {/* Intro */}
      <section className="px-6 py-24 text-center lg:py-36">
        <Reveal className="mx-auto max-w-3xl">
          <p className="eyebrow text-accent">Limited Edition Fine Art Photography</p>
          <h2 className="font-display mt-6 text-4xl leading-tight text-foreground md:text-5xl lg:text-[3.6rem]">
            The world’s quiet moments, made to last a lifetime.
          </h2>
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-foreground/65">
            Each photograph by Sheldon Roth is released in a strictly limited edition, printed at monumental scale,
            face-mounted to acrylic and hand-signed. When an edition is gone, it is gone for good.
          </p>
        </Reveal>
      </section>

      {/* New Releases */}
      <section className="pb-24 lg:pb-36">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
            <div>
              <p className="eyebrow text-accent">Just Released</p>
              <h2 className="font-display mt-3 text-4xl text-foreground lg:text-5xl">New Releases</h2>
            </div>
            <Link href="/new-releases" className="eyebrow link-line text-foreground/80 hover:text-foreground">
              View All New Releases
            </Link>
          </Reveal>
        </div>
        <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:px-10 mx-auto max-w-[1600px]">
          {newReleases.map((w, i) => (
            <Reveal key={w.slug} delay={i * 90} className="w-[78vw] shrink-0 snap-center sm:w-[46vw] lg:w-auto">
              <WorkCard work={w} aspect="4/5" sizes="(max-width: 640px) 80vw, (max-width: 1024px) 46vw, 25vw" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full-bleed panorama feature */}
      <section className="relative h-[78vh] min-h-[480px] w-full overflow-hidden">
        <Image
          src={getImage(panorama.slug).src}
          alt={`${panorama.title} by Sheldon Roth`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <Reveal>
            <p className="eyebrow text-accent-light">Featured Panorama</p>
            <h2 className="font-display mt-5 text-5xl text-white md:text-7xl">{panorama.title}</h2>
            <p className="eyebrow mt-5 text-white/80">Limited Edition {panorama.editionSize}</p>
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-white/75">{panorama.description}</p>
            <Link href={`/shop/${panorama.slug}`} className="btn btn-light mt-10">
              Discover
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Galleries */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal className="mb-14 text-center">
            <p className="eyebrow text-accent">Explore</p>
            <h2 className="font-display mt-3 text-4xl text-foreground lg:text-5xl">The Galleries</h2>
          </Reveal>

          <Reveal>
            <CollectionTile
              slug={featuredCollection.slug}
              title={featuredCollection.title}
              tagline={featuredCollection.tagline}
              cover={featuredCollection.cover}
              count={getWorksInCollection(featuredCollection.slug).length}
              className="aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]"
              sizes="100vw"
            />
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:gap-8">
            {otherCollections.map((c, i) => (
              <Reveal
                key={c.slug}
                delay={(i % 2) * 120}
                className={otherCollections.length % 2 === 1 && i === otherCollections.length - 1 ? 'sm:col-span-2' : ''}
              >
                <CollectionTile
                  slug={c.slug}
                  title={c.title}
                  tagline={c.tagline}
                  cover={c.cover}
                  count={getWorksInCollection(c.slug).length}
                  className={
                    otherCollections.length % 2 === 1 && i === otherCollections.length - 1
                      ? 'aspect-[4/5] sm:aspect-[16/9] lg:aspect-[21/9]'
                      : 'aspect-[4/5] sm:aspect-[4/3]'
                  }
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Artist */}
      <section className="bg-surface">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[760px]">
            <Image src={artistImage.src} alt="Solitude by Sheldon Roth" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex items-center px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
            <Reveal>
              <p className="eyebrow text-accent">The Artist</p>
              <h2 className="font-display mt-5 text-4xl leading-tight text-foreground lg:text-[3.4rem]">
                Sheldon Roth, photographer
              </h2>
              <blockquote className="font-display mt-10 border-l border-accent/60 pl-6 text-2xl italic leading-snug text-foreground/85 lg:text-[1.85rem]">
                “Photography is not about capturing what we see, but revealing what we feel. Every frame is an
                opportunity to share a moment of wonder.”
              </blockquote>
              <p className="mt-10 max-w-lg leading-relaxed text-foreground/65">
                From the reefs and islands of the tropics to the savannas of Africa and the skylines of the world’s
                great cities, Sheldon travels to find light that lasts only a moment — then spends the time it takes
                to hold onto it.
              </p>
              <Link href="/artist" className="btn btn-outline mt-12">
                Read His Story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
          <Reveal className="mb-14 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:items-end md:text-left">
            <div>
              <p className="eyebrow text-accent">Collector Favourites</p>
              <h2 className="font-display mt-3 text-4xl text-foreground lg:text-5xl">Best Sellers</h2>
            </div>
            <Link href="/best-sellers" className="eyebrow link-line text-foreground/80 hover:text-foreground">
              View All Best Sellers
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {bestSellers.map((w, i) => (
              <Reveal key={w.slug} delay={(i % 3) * 100}>
                <WorkCard work={w} aspect="3/2" />
              </Reveal>
            ))}
          </div>
          <div className="mt-20 text-center">
            <Link href="/shop" className="btn btn-outline">
              View All {works.length} Limited Editions
            </Link>
          </div>
        </div>
      </section>

      {/* The craft */}
      <section className="border-y border-line py-20 lg:py-28">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 text-center md:grid-cols-3 lg:px-10">
          {[
            ['Strictly Limited', 'Every image is released in a numbered edition. Once it sells out, it is retired forever.'],
            ['Gallery Presentation', 'Face-mounted to museum-grade acrylic for depth and luminosity that feels like a window.'],
            ['Signed by the Artist', 'Each piece is hand-signed and numbered, and arrives with a certificate of authenticity.'],
          ].map(([title, body], i) => (
            <Reveal key={title} delay={i * 120}>
              <p className="font-display text-5xl text-accent/80">0{i + 1}</p>
              <h3 className="eyebrow mt-5 text-foreground">{title}</h3>
              <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-foreground/60">{body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Inquire */}
      <section className="relative overflow-hidden py-32 lg:py-44">
        <Image src={inquireImage.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <Reveal className="relative mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow text-accent-light">Private Consultation</p>
          <h2 className="font-display mt-5 text-4xl text-white md:text-6xl">Find the piece for your space</h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-white/75">
            Speak with the studio about sizing, availability, framing and commissions. We’ll help you choose the
            right work for your home or office.
          </p>
          <Link href="/contact" className="btn btn-light mt-10">
            Inquire
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function CollectionTile({
  slug,
  title,
  tagline,
  cover,
  count,
  className,
  sizes,
}: {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  count: number;
  className: string;
  sizes: string;
}) {
  return (
    <Link href={`/collections/${slug}`} className={`group relative block overflow-hidden bg-surface ${className}`}>
      <Image src={getImage(cover).src} alt={`${title} gallery`} fill sizes={sizes} className="zoom-img object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/10 transition-colors duration-700 group-hover:bg-black/20" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center p-8 text-center lg:p-12">
        <p className="eyebrow text-white/70">{tagline}</p>
        <h3 className="font-display mt-3 text-4xl text-white lg:text-6xl">{title}</h3>
        <span className="eyebrow mt-6 border-b border-white/50 pb-1 text-white/90 transition-colors group-hover:border-accent group-hover:text-accent-light">
          Explore {count} {count === 1 ? 'Work' : 'Works'}
        </span>
      </div>
    </Link>
  );
}
