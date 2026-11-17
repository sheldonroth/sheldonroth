import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { getImage } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'The Artist',
  description: 'Sheldon Roth — photographer, entrepreneur and visual engineer, based in Buena Vista, Colorado.',
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
  const hero = getImage('mountain-majesty');
  const portrait = getImage('aspen-cascade');
  const wide = getImage('pacific-edge');
  return (
    <>
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden">
        <Image src={hero.src} alt="Mountain Majesty by Sheldon Roth" fill priority sizes="100vw" className="kenburns object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/35 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-20 text-center lg:pb-28">
          <p className="eyebrow fade-up text-accent-light">The Artist</p>
          <h1 className="font-display fade-up mt-5 text-6xl text-white md:text-8xl lg:text-9xl" style={{ animationDelay: '150ms' }}>
            Sheldon Roth
          </h1>
          <p className="eyebrow fade-up mt-6 text-white/75" style={{ animationDelay: '300ms' }}>
            Photographer · Visual Engineer
          </p>
        </div>
      </section>

      <section className="py-24 lg:py-36">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
          <Reveal>
            <p className="eyebrow text-accent">His Story</p>
            <h2 className="font-display mt-5 text-4xl leading-tight text-foreground lg:text-6xl">
              Chasing light that lasts only a moment
            </h2>
            <div className="mt-10 space-y-6 leading-relaxed text-foreground/70">
              <p>
                Sheldon Roth is an entrepreneur with a diverse portfolio of businesses — and, behind the camera, a
                visual storyteller. Beyond the business lies a person deeply rooted in community, content creation and
                empathy.
              </p>
              <p>
                Through his lens, he captures moments that transcend the ordinary, transforming fleeting instants into
                timeless works of art. His photographs span the reefs and islands of the tropics, restless
                coastlines and the high peaks, forests and alpine water of the mountains.
              </p>
              <p>
                Today he works from Buena Vista, Colorado, surrounded by the high peaks of the Sawatch Range. Every
                image he releases is a limited edition — printed large, face-mounted to acrylic and signed by hand.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden">
            <Image src={portrait.src} alt="Aspen Cascade by Sheldon Roth" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-32 lg:py-48">
        <Image src={wide.src} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <Reveal className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="eyebrow text-accent-light">Philosophy</p>
          <blockquote className="font-display mt-8 text-3xl italic leading-snug text-white md:text-5xl">
            “Photography is not about capturing what we see, but revealing what we feel. Every frame is an
            opportunity to share a moment of wonder, to invite others into a world they might otherwise overlook.”
          </blockquote>
          <p className="eyebrow mt-10 text-white/70">— Sheldon Roth</p>
        </Reveal>
      </section>

      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <Reveal className="mb-16 text-center">
            <p className="eyebrow text-accent">The Process</p>
            <h2 className="font-display mt-3 text-4xl text-foreground lg:text-5xl">From the Field to the Wall</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-14 md:grid-cols-3">
            {chapters.map((c, i) => (
              <Reveal key={c.n} delay={i * 120} className="border-t border-line pt-10">
                <p className="font-display text-6xl text-accent/80">{c.n}</p>
                <h3 className="eyebrow mt-6 text-foreground">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-foreground/60">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line py-24 text-center lg:py-32">
        <Reveal className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl text-foreground lg:text-5xl">Work with Sheldon</h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-foreground/65">
            Commissioning a piece, licensing an image, or looking for the right work for your space? He’d love to hear
            from you.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn btn-gold">Inquire</Link>
            <Link href="/collections" className="btn btn-outline">View the Galleries</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
