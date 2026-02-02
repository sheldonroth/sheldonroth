'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  BlurReveal,
  FadeIn,
  WordReveal,
  StaggerItemSelf,
} from '@/components/animations';

interface Collection {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  count: number;
}

interface CollectionsPageClientProps {
  collections: Collection[];
}

export function CollectionsPageClient({ collections }: CollectionsPageClientProps) {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <WordReveal
            text="Collections"
            as="h1"
            className="text-4xl lg:text-5xl font-light tracking-wide mb-4"
            delay={100}
            staggerDelay={80}
            duration={700}
          />
          <BlurReveal delay={400}>
            <div className="w-12 h-px bg-[#88744a] mx-auto mb-6" />
          </BlurReveal>
          <BlurReveal delay={500} direction="up" distance={20}>
            <p className="text-[#77776d] max-w-2xl mx-auto">
              Each collection represents a journey, a story told through light, composition, and the unwavering pursuit of the perfect moment.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* Collections Grid - Scrollable on mobile */}
      <section className="pb-20 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative">
            <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              {collections.map((collection, index) => (
                <StaggerItemSelf key={collection.id} delay={index * 80} duration={800}>
                  <Link
                    href={`/collections/${collection.slug}`}
                    className="group flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-start"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden mb-6">
                      <Image
                        src={collection.image}
                        alt={collection.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                      {collection.count > 0 && (
                        <div className="absolute bottom-6 left-6 right-6">
                          <span className="text-white/70 text-xs tracking-[0.2em]">{collection.count} WORKS</span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-xl font-light tracking-wide mb-2 group-hover:text-[#88744a] transition-colors">
                      {collection.title}
                    </h2>
                    <p className="text-sm text-[#77776d]">{collection.description}</p>
                  </Link>
                </StaggerItemSelf>
              ))}
            </div>
            {/* Scroll hint for mobile */}
            <div className="flex justify-center mt-4 gap-1 lg:hidden">
              {collections.map((_, index) => (
                <div key={index} className="w-1.5 h-1.5 rounded-full bg-[#88744a]/30" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <FadeIn>
            <WordReveal
              text="Looking for Something Specific?"
              as="h2"
              className="text-3xl lg:text-4xl font-light tracking-wide mb-4"
              delay={100}
              staggerDelay={50}
            />
          </FadeIn>
          <BlurReveal delay={400}>
            <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          </BlurReveal>
          <BlurReveal delay={500}>
            <p className="text-[#77776d] mb-8">
              Explore our complete catalog of works or reach out for personalized assistance in finding the perfect piece.
            </p>
          </BlurReveal>
          <BlurReveal delay={600}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="btn-primary">
                Browse All Works
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </BlurReveal>
        </div>
      </section>
    </>
  );
}
