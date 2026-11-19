import Link from 'next/link';
import type { Metadata } from 'next';
import PolicyPage, { PolicySection } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Terms of Sale', description: 'Terms of sale and use for Sheldon Roth Fine Art.' };

export default function TermsPage() {
  return (
    <PolicyPage eyebrow="Policies" title="Terms of Sale & Use" updated="November 2026">
      <PolicySection title="Agreement">
        <p>By using this website or placing an order you agree to these terms. If you do not agree, please do not use the site.</p>
      </PolicySection>
      <PolicySection title="Copyright">
        <p>
          All photographs, text and graphics on this site are the property of Sheldon Roth and are protected by copyright. Buying a print
          gives you ownership of that physical artwork only; it does not transfer any copyright or reproduction rights. Prints may not be
          copied, scanned or used commercially without written permission.
        </p>
      </PolicySection>
      <PolicySection title="Limited Editions">
        <p>
          Each work is released as one limited edition shared across all of its sizes (Premier 20, Signature 40, Collection 75), plus a
          small Artist Proof run for Premier and Signature works. Every print is numbered within its edition and accompanied by a
          certificate of authenticity. Once an edition sells out, no further prints of that work are made in any size.
        </p>
      </PolicySection>
      <PolicySection title="Orders, Pricing and Payment">
        <p>
          Prices are in US dollars. Edition prices rise in published steps as each edition sells; the price shown on the work&apos;s page
          when you check out is the price you pay. Price steps reflect remaining availability only and are not a statement about future
          or resale value. Payment is taken securely by Stripe at checkout; we never see or store your card number. An order is
          accepted when payment is confirmed. If a price or edition count on the site is ever wrong, we will contact you and you may
          cancel for a full refund before production begins. Shipping within the US is free. Sales tax is calculated at checkout from the shipping address and charged where required by law.
        </p>
      </PolicySection>
      <PolicySection title="Production, Shipping and Returns">
        <p>
          Prints are made to order. Production times, shipping and our 14-day returns policy are
          set out on the <Link href="/shipping-returns" className="text-accent hover:underline">Shipping &amp; Returns</Link> page and form
          part of these terms.
        </p>
      </PolicySection>
      <PolicySection title="Colour and Appearance">
        <p>
          Screens vary, so the colour and brightness of a print may differ slightly from what you see online. These natural variations are
          not defects.
        </p>
      </PolicySection>
      <PolicySection title="Liability">
        <p>
          To the extent permitted by law, our total liability for any order is limited to the amount you paid for it, and we are not liable
          for indirect or consequential losses.
        </p>
      </PolicySection>
      <PolicySection title="Governing Law">
        <p>These terms are governed by the laws of the State of Colorado, USA.</p>
      </PolicySection>
      <PolicySection title="Changes">
        <p>We may update these terms from time to time. The version on this page when you place an order applies to that order.</p>
      </PolicySection>
    </PolicyPage>
  );
}
