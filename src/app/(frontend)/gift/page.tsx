import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import GiftButtons from './GiftButtons';
import { GIFT_AMOUNTS } from '@/content/gifts';
import { LEAD_TIME_TEXT } from '@/content/commerce';
import { checkoutEnabled } from '@/lib/stripe';

export const metadata: Metadata = {
  title: 'Gift Certificates',
  description: 'Digital gift certificates for Sheldon Roth limited-edition fine art prints, delivered by email within minutes. $250 to $1,650.',
  alternates: { canonical: '/gift' },
};

export default function GiftPage() {
  const live = checkoutEnabled();
  return (
    <>
      <PageHeader
        title="Gift Certificates"
        intro="Give a limited-edition print and let them choose the work. Delivered by email within minutes, ready to forward or print."
      />
      <section className="lk-container pb-12">
        <div className="mx-auto max-w-[900px]">
          {live ? (
            <GiftButtons amounts={GIFT_AMOUNTS} />
          ) : (
            <p className="lk-body text-center">
              Gift certificates are available by <Link href="/contact" className="text-accent-dark underline underline-offset-4">inquiry</Link>.
            </p>
          )}
        </div>
      </section>
      <section className="lk-container pb-20 lg:pb-[100px]">
        <div className="mx-auto max-w-[760px] space-y-4">
          <h2 className="text-[22px] font-light leading-tight tracking-[0.03em] text-ink md:text-[28px]">Holiday timing</h2>
          <p className="lk-body">
            Every print is made to order and takes {LEAD_TIME_TEXT} plus insured shipping, so a print ordered now may not arrive before
            December 25. A gift certificate arrives instantly, and the recipient chooses their work and size whenever they like.
          </p>
          <h2 className="pt-6 text-[22px] font-light leading-tight tracking-[0.03em] text-ink md:text-[28px]">How it works</h2>
          <ul className="lk-body list-disc space-y-2 pl-5">
            <li>Choose an amount and pay securely through Stripe. You can add the recipient&apos;s name and a short message.</li>
            <li>The certificate code arrives by email within minutes. Forward it, or print it for a card.</li>
            <li>The recipient enters the code at checkout on any limited-edition print. It covers one order and does not expire.</li>
            <li>The $1,650 certificate matches the opening price of a 24 × 16 in Collection print. US shipping is always free.</li>
          </ul>
          <p className="lk-body">
            Want a certificate for a specific work, or a different amount? <Link href="/contact" className="text-accent-dark underline underline-offset-4">Inquire</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
