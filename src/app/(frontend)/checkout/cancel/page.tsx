import Link from 'next/link';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = { title: 'Checkout Cancelled', robots: { index: false } };

export default function CheckoutCancel() {
  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Your order was not placed"
        intro="No payment was taken. Your selection is still in your cart whenever you are ready."
      />
      <section className="lk-container pb-24 text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/cart" className="lk-btn lk-btn-gold">Return to Cart</Link>
          <Link href="/contact" className="lk-btn lk-btn-gold">Questions? Contact the Studio</Link>
        </div>
      </section>
    </>
  );
}
