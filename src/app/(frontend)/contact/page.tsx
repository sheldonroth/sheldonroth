import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import { getImage } from '@/content/catalog';

export const metadata: Metadata = {
  title: 'Inquire',
  description: 'Private consultations with the Sheldon Roth studio about an artwork, sizing, availability, framing or a commission.',
};

const topics = ['Purchasing an artwork', 'Custom sizes and framing', 'Commissions', 'Licensing'];

export default function ContactPage() {
  const side = getImage('rhododendron-valley');
  return (
    <>
      <PageHeader
        eyebrow="Private Consultation"
        title="Inquire"
        intro="Interested in a piece, a custom size, a commission or licensing? The studio offers private consultations for collectors."
      />
      <section className="lk-container pb-20 lg:pb-[100px]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={side.src} alt="Rhododendron Valley by Sheldon Roth" fill quality={85} sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          </div>
          <div className="border border-line bg-surface p-6 sm:p-12">
            <h2 className="lk-h2">Private Consultations</h2>
            <p className="lk-body mt-6">Every edition is made to order. The studio can help with:</p>
            <ul className="mt-6 space-y-2">
              {topics.map((t) => (
                <li key={t} className="lk-body flex gap-3">
                  <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/shop" className="lk-btn lk-btn-gold">Explore the Work</Link>
              <Link href="/collections" className="lk-btn lk-btn-gold">View the Galleries</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
