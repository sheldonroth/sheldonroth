import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { getImage } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'The Artist',
  description: 'Sheldon Roth — photographer, entrepreneur and visual engineer, based in the American West.',
};

const chapters = [
  {
    n: '01',
    title: 'Discovery',
    body: 'Every image begins with exploration — understanding a place, its weather and its light, and the story waiting to be told.',
  },
  {
    n: '02',
    title: 'Capture',
    body: 'Patience is everything. Sometimes it means waiting hours, or returning again and again, until light, subject and composition align.',
  },
  {
    n: '03',
    title: 'Refinement',
    body: 'Careful finishing brings out the full depth of each frame while keeping the honesty and emotion of the original moment.',
  },
];

export default function ArtistPage() {
  const hero = getImage('frozen-symphony');
  const portrait = getImage('alpine-bloom');
  const wide = getImage('snow-range');
  return (
    <>
      <section className="relative h-[560px] w-full overflow-hidden bg-black md:h-[630px]">
        <Image src={hero.src} alt="Frozen Symphony by Sheldon Roth" fill priority quality={90} sizes="100vw" className="object-cover" />
        <div className="lk-scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-[70px] text-center text-white md:pb-[90px]">
          <p className="lk-hero-eyebrow fade-up">The Artist</p>
          <h1 className="lk-hero-title fade-up mt-4" style={{ animationDelay: '120ms' }}>Sheldon Roth</h1>
          <p className="lk-hero-eyebrow fade-up mt-5" style={{ animationDelay: '240ms' }}>Photographer · Visual Engineer</p>
        </div>
      </section>

      <section className="lk-section">
        <div className="lk-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="lk-eyebrow">His Story</p>
            <h2 className="lk-h2 mt-6">Chasing light that lasts only a moment</h2>
            <div className="mt-8 space-y-5">
              <p className="lk-body">
                Sheldon Roth is an entrepreneur with a diverse portfolio of businesses — and, behind the camera, a visual storyteller.
                Beyond the business lies a person deeply rooted in community, content creation and empathy.
              </p>
              <p className="lk-body">
                Through his lens, he captures moments that transcend the ordinary, transforming fleeting instants into timeless works of
                art. His photographs span towering peaks and glacier ice, turquoise alpine lakes and wildflower basins, reefs and restless
                coastlines, golden savanna and wind-written dunes.
              </p>
              <p className="lk-body">
                Based in the American West, he releases every image as a limited edition — printed large, face-mounted to acrylic and
                signed by hand.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden">
            <Image src={portrait.src} alt="Alpine Bloom by Sheldon Roth" fill quality={85} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-[100px] lg:py-[160px]">
        <Image src={wide.src} alt="" fill quality={85} sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <Reveal className="lk-container relative max-w-4xl text-center text-white">
          <p className="lk-hero-eyebrow">Philosophy</p>
          <blockquote className="lk-h2-sm mt-8 text-[24px] leading-[1.4] text-white md:text-[32px]">
            “Photography is not about capturing what we see, but revealing what we feel. Every frame is an opportunity to share a moment
            of wonder, to invite others into a world they might otherwise overlook.”
          </blockquote>
          <p className="lk-hero-eyebrow mt-10">— Sheldon Roth</p>
        </Reveal>
      </section>

      <section className="lk-section">
        <div className="lk-container">
          <Reveal className="mb-14 text-center">
            <p className="lk-eyebrow">The Process</p>
            <h2 className="lk-h2 mt-6">From the Field to the Wall</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {chapters.map((c, i) => (
              <Reveal key={c.n} delay={i * 120} className="border-t border-line pt-8">
                <p className="text-[44px] font-light leading-none text-accent">{c.n}</p>
                <h3 className="lk-eyebrow mt-6 text-[#222]">{c.title}</h3>
                <p className="lk-body mt-4">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface">
        <Reveal className="lk-container max-w-2xl py-[60px] text-center lg:py-[100px]">
          <h2 className="lk-h2">Work with Sheldon</h2>
          <p className="lk-body mx-auto mt-6 max-w-lg">
            Commissioning a piece, licensing an image, or looking for the right work for your space? He’d love to hear from you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="lk-btn lk-btn-solid">Inquire</Link>
            <Link href="/collections" className="lk-btn lk-btn-gold">View the Galleries</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
