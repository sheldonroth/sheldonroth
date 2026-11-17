import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import InquiryForm from './InquiryForm';
import { getImage, SITE, works } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Inquire',
  description: 'Speak with the Sheldon Roth studio about an artwork, sizing, availability, framing or a commission.',
};

export default function ContactPage() {
  const side = getImage('tropical-sunset');
  return (
    <>
      <PageHeader
        eyebrow="Private Consultation"
        title="Inquire"
        intro="Interested in a piece, a custom size, a commission or licensing? Send a note and the studio will be in touch personally."
      />
      <section className="pb-28 lg:pb-40">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:px-10">
          <div className="order-2 lg:order-1">
            <div className="relative hidden aspect-[4/5] overflow-hidden lg:block">
              <Image src={side.src} alt="Tropical Sunset by Sheldon Roth" fill sizes="40vw" className="object-cover" />
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h2 className="eyebrow text-accent">Email</h2>
                <a href={`mailto:${SITE.email}`} className="mt-3 block break-all font-display text-2xl text-foreground hover:text-accent-light">
                  {SITE.email}
                </a>
              </div>
              <div>
                <h2 className="eyebrow text-accent">Studio</h2>
                <p className="mt-3 font-display text-2xl text-foreground">{SITE.location}</p>
              </div>
            </div>
          </div>
          <div className="order-1 border border-line bg-surface p-7 sm:p-12 lg:order-2">
            <Suspense fallback={null}>
              <InquiryForm works={works.map((w) => ({ slug: w.slug, title: w.title }))} email={SITE.email} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
