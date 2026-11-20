import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { checkoutEnabled, getStripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Thank You', robots: { index: false } };

export default async function GiftThanks({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let email: string | null = null;
  let paid = false;
  if (checkoutEnabled() && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(session_id);
      paid = session.payment_status === 'paid' && session.metadata?.order_type === 'gift_certificate';
      email = session.customer_details?.email ?? null;
    } catch {
      /* generic thank-you */
    }
  }
  return (
    <>
      <PageHeader
        title="Thank you"
        intro={
          paid
            ? `Your gift certificate is paid. The code is on its way to ${email ?? 'your email'} and should arrive within minutes.`
            : 'Thank you. If your payment is still processing, your gift certificate will follow by email as soon as it clears.'
        }
      />
      <section className="lk-container max-w-[760px] pb-24 text-center">
        <p className="lk-body">
          Forward the email to the person you are giving it to, or print it for a card. They redeem it by entering the code at checkout on
          any limited-edition print. If it hasn&apos;t arrived within the hour, check your spam folder or{' '}
          <Link href="/contact" className="text-accent-dark underline underline-offset-4">contact the studio</Link>.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="lk-btn lk-btn-gold">Explore the Work</Link>
        </div>
      </section>
    </>
  );
}
