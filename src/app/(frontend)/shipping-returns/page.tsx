import Link from 'next/link';
import type { Metadata } from 'next';
import PolicyPage, { PolicySection, Term } from '@/components/PolicyPage';
import { LEAD_TIME_TEXT } from '@/content/commerce';

export const metadata: Metadata = {
  title: 'Shipping & Returns',
  description: 'How limited edition prints by Sheldon Roth are made, shipped and protected, and the returns policy.',
};

export default function ShippingReturnsPage() {
  return (
    <PolicyPage eyebrow="Policies" title="Shipping & Returns" intro="Every piece is made to order and delivered with care." updated="November 2026">
      <PolicySection title="Made to Order">
        <Term label="Production">
          Each limited edition is printed, face-mounted to acrylic, signed and numbered specifically for you by our fine art lab. Please
          allow {LEAD_TIME_TEXT} from your order to delivery. If a piece will take longer, the studio will tell you before it ships.
        </Term>
        <Term label="Inspection">Every print is inspected before it is packed. Large acrylic works travel in a protective crate.</Term>
      </PolicySection>

      <PolicySection title="Shipping">
        <Term label="United States">
          Orders ship within the United States, fully insured, with tracking and a signature required on delivery. The shipping charge,
          if any, is shown at checkout before you pay.
        </Term>
        <Term label="Outside the United States">
          Online checkout currently ships to US addresses only. For delivery elsewhere, please{' '}
          <Link href="/contact" className="text-accent hover:underline">contact the studio</Link> for a crate and freight quote before
          ordering. International buyers are responsible for any import duties and taxes.
        </Term>
        <Term label="Tracking">You will receive tracking details by email as soon as your piece ships.</Term>
      </PolicySection>

      <PolicySection title="Returns">
        <Term label="Sales are final">
          Because each print is produced to order and numbered within a limited edition, all sales are final. We cannot accept returns
          or exchanges for a change of mind.
        </Term>
        <Term label="Damage in transit">
          If your artwork arrives damaged, please photograph the packaging and the piece and contact the studio within 48 hours of
          delivery. Keep all packing materials. We will arrange a replacement of the same edition number at no cost to you.
        </Term>
        <Term label="Order changes">
          If you need to change the size or shipping address, contact the studio as soon as possible. Once production has started, an
          order can no longer be cancelled.
        </Term>
      </PolicySection>
    </PolicyPage>
  );
}
