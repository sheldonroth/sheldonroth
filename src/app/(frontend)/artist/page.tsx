import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Reveal from '@/components/Reveal';
import { getImage, SITE } from '@/content/catalog';
import { JsonLd, personOrganizationGraph } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'The Artist',
  description: 'Sheldon Roth photographs high peaks, wild water and wildlife, waiting for the moments when light transforms a scene, and releases each image as a limited edition face-mounted to acrylic.',
};

const chapters = [
  {
    n: '01',
    title: 'Waiting for the Light',
    body: 'Most of the work is patience: scouting a place, learning how its weather moves, and returning until light, subject and composition finally line up. Many visits end without a frame worth keeping.',
  },
  {
    n: '02',
    title: 'One Moment, One Frame',
    body: 'Each photograph is a single real moment in the field — the alpenglow on a ridge, a dolphin clearing the water, a leopard turning its head. Finishing brings out depth and tone without inventing a scene that was never there.',
  },
  {
    n: '03',
    title: 'Made to Glow',
    body: 'Every edition is printed as an archival Lumachrome HD print and face-mounted to anti-glare museum acrylic, which lets light pass through the image and back, so colour and depth seem lit from within. A size is only offered when the original file holds the detail for it.',
  },
];

export default function ArtistPage() {
  const hero = getImage('frozen-symphony');
  const portrait = getImage('alpine-bloom');
  const wide = getImage('snow-range');
  return (
    <>
      <JsonLd data={personOrganizationGraph()} />
      <section className="lk-hero-h relative w-full overflow-hidden bg-black">
        <Image src={hero.src} alt="Frozen Symphony by Sheldon Roth" fill priority quality={80} sizes="100vw" className="object-cover" />
        <div className="lk-scrim absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-[70px] text-center text-white md:pb-[90px]">
          <p className="lk-hero-eyebrow fade-up">The Artist</p>
          <h1 className="lk-hero-title fade-up mt-4" style={{ animationDelay: '120ms' }}>Sheldon Roth</h1>
          <p className="lk-hero-eyebrow fade-up mt-5" style={{ animationDelay: '240ms' }}>Fine Art Photographer</p>
        </div>
      </section>

      <section className="lk-section">
        <div className="lk-container grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="lk-eyebrow">His Story</p>
            <h2 className="lk-h2 mt-6">Chasing light that lasts only a moment</h2>
            <div className="mt-8 space-y-5">
              <p className="lk-body">
                Sheldon Roth photographs high peaks and glacier ice, turquoise alpine lakes, reefs and restless coastlines, golden savanna
                and the wildlife that lives there. His subject is the brief moment when light changes a place — the minutes of alpenglow
                after sunset, the break in a storm, the instant an animal looks back.
              </p>
              <p className="lk-body">
                Those moments rarely announce themselves. His process is slow on purpose: walking the same ground in different seasons,
                waiting out weather, and coming back until the scene he imagined actually happens in front of the lens.
              </p>
              <p className="lk-body">
                He releases only the frames he believes can hold a wall, each as a strictly limited edition — printed large, face-mounted
                to acrylic, signed and numbered, with a certificate of authenticity.
              </p>
              <p className="lk-body">
                Follow new work from the field on Instagram at{' '}
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-accent-dark underline underline-offset-4">
                  {SITE.instagramHandle}
                </a>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={150} className="relative aspect-[4/5] overflow-hidden">
            <Image src={portrait.src} alt="Alpine Bloom by Sheldon Roth" fill quality={75} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden py-[100px] lg:py-[160px]">
        <Image src={wide.src} alt="" fill quality={80} sizes="100vw" className="object-cover" />
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
            Looking for the right work for your space, a size that isn’t listed, or an Artist Proof? Sheldon reads every inquiry personally.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="lk-btn lk-btn-solid">Inquire</Link>
            <Link href="/collections" className="lk-btn lk-btn-gold">View the Galleries</Link>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="lk-btn lk-btn-gold">Instagram</a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
