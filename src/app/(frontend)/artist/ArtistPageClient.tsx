'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  BlurReveal,
  FadeIn,
  WordReveal,
  StaggerItemSelf,
  ParallaxHero,
} from '@/components/animations';

const achievements = [
  { number: '150+', label: 'Limited Editions' },
  { number: '30+', label: 'Countries Visited' },
  { number: '10+', label: 'Years Experience' },
  { number: '500+', label: 'Collectors Worldwide' },
];

const processSteps = [
  {
    number: '01',
    title: 'DISCOVERY',
    description: 'Every project begins with research and exploration. Understanding the subject, its environment, and the story waiting to be told.',
  },
  {
    number: '02',
    title: 'CAPTURE',
    description: 'Patience is paramount. Sometimes waiting hours or returning multiple times to capture that perfect moment when light, subject, and composition align.',
  },
  {
    number: '03',
    title: 'REFINEMENT',
    description: 'Careful post-processing brings out the full potential of each image while maintaining authenticity and the emotional impact of the original moment.',
  },
];

export function ArtistPageClient() {
  return (
    <>
      {/* Hero Section with Parallax */}
      <ParallaxHero
        imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90"
        imageAlt="Sheldon Roth"
        speed={0.3}
      >
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20 lg:pb-32">
            <BlurReveal delay={300}>
              <span className="text-white/70 text-xs tracking-[0.3em] mb-4 block">THE ARTIST</span>
            </BlurReveal>
            <WordReveal
              text="Sheldon Roth"
              as="h1"
              className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4"
              delay={500}
              staggerDelay={80}
              duration={700}
            />
            <BlurReveal delay={900}>
              <p className="text-white/70 text-lg font-light">Visual Engineer</p>
            </BlurReveal>
          </div>
        </div>
      </ParallaxHero>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <WordReveal
                text="About"
                as="h2"
                className="text-3xl lg:text-4xl font-light tracking-wide mb-6"
                delay={100}
                staggerDelay={100}
              />
              <BlurReveal delay={300}>
                <div className="w-12 h-px bg-[#88744a] mb-8" />
              </BlurReveal>
              <div className="space-y-6 text-[#77776d] leading-relaxed">
                <BlurReveal delay={400}>
                  <p>
                    Sheldon is a multi-faceted entrepreneur with a diverse portfolio of businesses. But beyond the business acumen lies a person deeply rooted in community, content creation and empathy.
                  </p>
                </BlurReveal>
                <BlurReveal delay={500}>
                  <p>
                    Through his lens, Sheldon captures moments that transcend the ordinary, transforming fleeting instances into timeless works of art. Each photograph is a testament to patience, precision, and an unwavering commitment to excellence.
                  </p>
                </BlurReveal>
                <BlurReveal delay={600}>
                  <p>
                    His work spans across continents, from the misty savannas of Africa to the architectural marvels of modern cities. Every image tells a story, inviting viewers to pause and contemplate the beauty that exists in our world.
                  </p>
                </BlurReveal>
                <BlurReveal delay={700}>
                  <p>
                    Sheldon&apos;s photographs have been collected by art enthusiasts worldwide and featured in prestigious galleries and publications. His unique perspective combines technical mastery with an intuitive understanding of light, composition, and the decisive moment.
                  </p>
                </BlurReveal>
              </div>
            </div>
            <BlurReveal delay={300} direction="right" distance={50} duration={900}>
              <div className="relative aspect-[3/4] lg:aspect-auto lg:h-full">
                <Image
                  src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
                  alt="Sheldon Roth at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </BlurReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {achievements.map((item, index) => (
              <StaggerItemSelf key={index} delay={index * 150}>
                <div className="text-center">
                  <BlurReveal delay={100}>
                    <p className="text-4xl lg:text-5xl font-light text-[#88744a] mb-2">{item.number}</p>
                  </BlurReveal>
                  <BlurReveal delay={200}>
                    <p className="text-xs tracking-[0.2em] text-white/60">{item.label.toUpperCase()}</p>
                  </BlurReveal>
                </div>
              </StaggerItemSelf>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <BlurReveal delay={100}>
            <span className="text-xs tracking-[0.3em] text-[#88744a] mb-4 block">PHILOSOPHY</span>
          </BlurReveal>
          <WordReveal
            text="The Art of Seeing"
            as="h2"
            className="text-3xl lg:text-4xl font-light tracking-wide mb-8"
            delay={200}
            staggerDelay={70}
          />
          <BlurReveal delay={600} duration={1000}>
            <blockquote className="text-xl lg:text-2xl font-light text-[#77776d] leading-relaxed italic mb-8">
              &ldquo;Photography is not about capturing what we see, but revealing what we feel. Every frame is an opportunity to share a moment of wonder, to invite others into a world they might otherwise overlook.&rdquo;
            </blockquote>
          </BlurReveal>
          <BlurReveal delay={800}>
            <p className="text-sm tracking-[0.2em] text-[#88744a]">— SHELDON ROTH</p>
          </BlurReveal>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn className="text-center mb-16">
            <WordReveal
              text="The Process"
              as="h2"
              className="text-3xl lg:text-4xl font-light tracking-wide mb-4"
              delay={100}
              staggerDelay={80}
            />
            <BlurReveal delay={400}>
              <div className="w-12 h-px bg-[#88744a] mx-auto" />
            </BlurReveal>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {processSteps.map((step, index) => (
              <StaggerItemSelf key={index} delay={index * 200} duration={800}>
                <div className="text-center">
                  <BlurReveal delay={100}>
                    <div className="text-5xl font-light text-[#88744a] mb-4">{step.number}</div>
                  </BlurReveal>
                  <BlurReveal delay={200}>
                    <h3 className="text-sm tracking-[0.2em] mb-4">{step.title}</h3>
                  </BlurReveal>
                  <BlurReveal delay={300}>
                    <p className="text-sm text-[#77776d] leading-relaxed">
                      {step.description}
                    </p>
                  </BlurReveal>
                </div>
              </StaggerItemSelf>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#1a1a1a] text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <WordReveal
            text="Work With Me"
            as="h2"
            className="text-3xl lg:text-4xl font-light tracking-wide mb-4"
            delay={100}
            staggerDelay={80}
          />
          <BlurReveal delay={400}>
            <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          </BlurReveal>
          <BlurReveal delay={500}>
            <p className="text-white/60 mb-8">
              Interested in commissioning a piece, licensing work, or discussing a collaboration? I&apos;d love to hear from you.
            </p>
          </BlurReveal>
          <BlurReveal delay={600}>
            <Link href="/contact" className="btn-primary bg-[#88744a] hover:bg-[#a89264]">
              Get In Touch
            </Link>
          </BlurReveal>
        </div>
      </section>
    </>
  );
}
