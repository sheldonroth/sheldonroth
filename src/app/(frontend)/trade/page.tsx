import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import TradeForm from './TradeForm';
import { LEAD_TIME_TEXT } from '@/content/commerce';

export const metadata: Metadata = {
  title: 'Trade Program for Designers and Art Consultants',
  description:
    'A 20% trade discount on Sheldon Roth face-mounted acrylic limited-edition prints, up to 60 × 40 in, for interior designers, art consultants and architects, with sizing help and project support.',
  alternates: { canonical: '/trade' },
};

const benefits = [
  { title: '20% trade discount', body: 'On every limited-edition print, at every size, applied with your personal trade code at checkout or on an invoice.' },
  { title: 'Sizing and placement help', body: 'Send wall dimensions or a room photo and the studio will suggest works and sizes that hold the space.' },
  { title: 'Sizes up to 60 × 40 in', body: 'Face-mounted acrylic in standard sizes up to 60 × 40 in. Larger sizes are available on request for the right wall.' },
  { title: 'Made to order', body: `Each print is made to order on Lumachrome HD and face-mounted to acrylic, ready to hang. Allow ${LEAD_TIME_TEXT}.` },
  { title: 'Free insured US shipping', body: 'Signature required, shipped direct to you, your client or the job site.' },
];

export default function TradePage() {
  return (
    <>
      <PageHeader
        title="Trade Program"
        intro="For interior designers, art consultants and architects placing limited-edition photography in residential, hospitality and corporate spaces."
      />
      <section className="lk-container pb-16">
        <div className="mx-auto grid max-w-[1000px] grid-cols-1 gap-10 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title}>
              <h2 className="text-[20px] font-light tracking-[0.03em] text-ink">{b.title}</h2>
              <p className="lk-body mt-3">{b.body}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-14 max-w-[760px] space-y-4">
          <h2 className="text-[22px] font-light leading-tight tracking-[0.03em] text-ink md:text-[28px]">How it works</h2>
          <ol className="lk-body list-decimal space-y-2 pl-5">
            <li>Apply below. It takes a minute.</li>
            <li>Sheldon reviews each application personally and emails you a personal trade code once approved.</li>
            <li>Enter the code in the promotion code field at checkout, or ask for a trade invoice for larger projects.</li>
          </ol>
          <p className="lk-body">
            The trade discount applies to the current edition price and cannot be combined with other offers. Final editions and Artist
            Proofs remain by inquiry. For a size beyond 60 × 40 in, mention the wall in your application. Read about{' '}
            <Link href="/guides/limited-edition-photography-pricing" className="text-accent-dark underline underline-offset-4">edition pricing</Link>{' '}
            and{' '}
            <Link href="/guides/sizing-large-format-photography" className="text-accent-dark underline underline-offset-4">sizing a work for a wall</Link>.
          </p>
        </div>
      </section>
      <section className="lk-container pb-20 lg:pb-[100px]">
        <div className="relative mx-auto max-w-[760px] border border-line bg-surface p-6 sm:p-12">
          <TradeForm />
        </div>
      </section>
    </>
  );
}
