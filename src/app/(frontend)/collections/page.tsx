import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { collections, getImage, getWorksInCollection } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Galleries',
  description: 'Explore the fine art photography galleries of Sheldon Roth — landscape, seascape, wildlife, architecture, nature and abstract.',
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Galleries"
        title="Explore the Collections"
        intro="Six bodies of work, each a journey — from the reefs and islands of the tropics to the plains of Africa and the skylines of the world’s great cities."
      />
      <section className="pb-28 lg:pb-40">
        <div className="mx-auto max-w-[1600px] space-y-6 px-6 lg:space-y-8 lg:px-10">
          {collections.map((c, i) => {
            const count = getWorksInCollection(c.slug).length;
            return (
              <Reveal key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden bg-surface sm:aspect-[16/9] lg:aspect-[21/9]"
                >
                  <Image src={getImage(c.cover).src} alt={`${c.title} gallery`} fill sizes="100vw" priority={i === 0} className="zoom-img object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-end p-8 sm:items-center sm:p-14 lg:p-20">
                    <div className="max-w-md">
                      <p className="eyebrow text-accent-light">0{i + 1} — {count} {count === 1 ? 'Work' : 'Works'}</p>
                      <h2 className="font-display mt-4 text-5xl text-white lg:text-7xl">{c.title}</h2>
                      <p className="mt-5 hidden leading-relaxed text-white/75 sm:block">{c.description}</p>
                      <span className="btn btn-outline mt-8">Enter Gallery</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
