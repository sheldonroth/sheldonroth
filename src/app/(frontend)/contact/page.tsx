import { Suspense } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import InquiryForm from './InquiryForm';
import { getImage, PRINT_SIZES, works } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Inquire',
  description: 'Private consultations with the Sheldon Roth studio about an artwork, sizing, availability, framing or a commission.',
};

export default function ContactPage() {
  const side = getImage('rhododendron-valley');
  return (
    <>
      <PageHeader
        eyebrow="Private Consultation"
        title="Inquire"
        intro="Interested in a piece, a custom size, a commission or licensing? Send a note and Sheldon will be in touch personally."
      />
      <section className="lk-container pb-20 lg:pb-[100px]">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="relative order-2 hidden aspect-[4/5] overflow-hidden lg:order-1 lg:block">
            <Image src={side.src} alt="Rhododendron Valley by Sheldon Roth" fill quality={85} sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <div id="inquire" className="order-1 lg:order-2 relative scroll-mt-[120px] border border-line bg-surface p-6 sm:p-12">
            <Suspense fallback={null}>
              <InquiryForm works={works.map((w) => ({ slug: w.slug, title: w.title }))} sizes={PRINT_SIZES.map((p) => p.name)} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
