import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import { LEAD_TIME_TEXT } from '@/content/commerce';
import { checkoutEnabled, getStripe } from '@/lib/stripe';
import ClearCart from './ClearCart';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Thank You', robots: { index: false } };

export default async function CheckoutSuccess({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  let email: string | null = null;
  let paid = false;
  let items: string[] = [];
  if (checkoutEnabled() && session_id && /^cs_[A-Za-z0-9_]+$/.test(session_id)) {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(session_id);
      paid = session.payment_status === 'paid';
      email = session.customer_details?.email ?? null;
      const li = await stripe.checkout.sessions.listLineItems(session_id, { limit: 20 });
      items = li.data.map((l) => `${l.description}${l.quantity && l.quantity > 1 ? ` × ${l.quantity}` : ''}`);
    } catch {
      /* show the generic thank-you */
    }
  }

  return (
    <>
      {paid && <ClearCart />}
      <PageHeader
        eyebrow="Order Received"
        title="Thank you"
        intro={
          paid
            ? `Your order is confirmed${email ? ` and a receipt is on its way to ${email}` : ''}. Your print is now being made to order.`
            : 'Thank you for your order. If your payment is still processing, you will receive a confirmation by email shortly.'
        }
      />
      <section className="lk-container max-w-[760px] pb-24 text-center">
        {items.length > 0 && (
          <ul className="lk-body mb-10">
            {items.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        )}
        <p className="lk-body">
          Each limited edition is printed, face-mounted and signed to order, then shipped insured with signature required. Please allow{' '}
          {LEAD_TIME_TEXT} for production and delivery. The studio will be in touch with tracking details as soon as your piece ships.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/shop" className="lk-btn lk-btn-gold">Continue Exploring</Link>
          <Link href="/contact" className="lk-btn lk-btn-gold">Contact the Studio</Link>
        </div>
      </section>
    </>
  );
}
