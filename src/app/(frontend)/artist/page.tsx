import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'The Artist | Sheldon Roth Fine Art',
  description: 'Learn about Sheldon Roth, a multi-faceted entrepreneur and visual storyteller capturing the extraordinary through fine art photography.',
};

const achievements = [
  { number: '150+', label: 'Limited Editions' },
  { number: '30+', label: 'Countries Visited' },
  { number: '10+', label: 'Years Experience' },
  { number: '500+', label: 'Collectors Worldwide' },
];

export default function ArtistPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[70vh] lg:min-h-[80vh]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=90"
            alt="Sheldon Roth"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 h-full min-h-[70vh] lg:min-h-[80vh] flex items-end pb-20 lg:pb-32">
          <div>
            <span className="text-white/70 text-xs tracking-[0.3em] mb-4 block">THE ARTIST</span>
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4">
              Sheldon Roth
            </h1>
            <p className="text-white/70 text-lg font-light">Visual Engineer</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6">About</h2>
              <div className="w-12 h-px bg-[#88744a] mb-8" />
              <div className="space-y-6 text-[#77776d] leading-relaxed">
                <p>
                  Sheldon is a multi-faceted entrepreneur with a diverse portfolio of businesses. But beyond the business acumen lies a person deeply rooted in community, content creation and empathy.
                </p>
                <p>
                  Through his lens, Sheldon captures moments that transcend the ordinary, transforming fleeting instances into timeless works of art. Each photograph is a testament to patience, precision, and an unwavering commitment to excellence.
                </p>
                <p>
                  His work spans across continents, from the misty savannas of Africa to the architectural marvels of modern cities. Every image tells a story, inviting viewers to pause and contemplate the beauty that exists in our world.
                </p>
                <p>
                  Sheldon&apos;s photographs have been collected by art enthusiasts worldwide and featured in prestigious galleries and publications. His unique perspective combines technical mastery with an intuitive understanding of light, composition, and the decisive moment.
                </p>
              </div>
            </div>
            <div className="relative aspect-[3/4] lg:aspect-auto">
              <Image
                src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80"
                alt="Sheldon Roth at work"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-24 bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {achievements.map((item, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl lg:text-5xl font-light text-[#88744a] mb-2">{item.number}</p>
                <p className="text-xs tracking-[0.2em] text-white/60">{item.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <span className="text-xs tracking-[0.3em] text-[#88744a] mb-4 block">PHILOSOPHY</span>
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-8">The Art of Seeing</h2>
          <blockquote className="text-xl lg:text-2xl font-light text-[#77776d] leading-relaxed italic mb-8">
            &ldquo;Photography is not about capturing what we see, but revealing what we feel. Every frame is an opportunity to share a moment of wonder, to invite others into a world they might otherwise overlook.&rdquo;
          </blockquote>
          <p className="text-sm tracking-[0.2em] text-[#88744a]">— SHELDON ROTH</p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">The Process</h2>
            <div className="w-12 h-px bg-[#88744a] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="text-5xl font-light text-[#88744a] mb-4">01</div>
              <h3 className="text-sm tracking-[0.2em] mb-4">DISCOVERY</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                Every project begins with research and exploration. Understanding the subject, its environment, and the story waiting to be told.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-light text-[#88744a] mb-4">02</div>
              <h3 className="text-sm tracking-[0.2em] mb-4">CAPTURE</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                Patience is paramount. Sometimes waiting hours or returning multiple times to capture that perfect moment when light, subject, and composition align.
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-light text-[#88744a] mb-4">03</div>
              <h3 className="text-sm tracking-[0.2em] mb-4">REFINEMENT</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                Careful post-processing brings out the full potential of each image while maintaining authenticity and the emotional impact of the original moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#1a1a1a] text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Work With Me</h2>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          <p className="text-white/60 mb-8">
            Interested in commissioning a piece, licensing work, or discussing a collaboration? I&apos;d love to hear from you.
          </p>
          <Link href="/contact" className="btn-primary bg-[#88744a] hover:bg-[#a89264]">
            Get In Touch
          </Link>
        </div>
      </section>
    </>
  );
}
