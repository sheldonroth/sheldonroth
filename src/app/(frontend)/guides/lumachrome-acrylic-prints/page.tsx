import Link from 'next/link';
import type { Metadata } from 'next';
import GuideLayout, { GuideFaqs, GuideSection } from '@/components/GuideLayout';
import { articleJsonLd } from '@/lib/schema';

const title = "Lumachrome Acrylic Prints: How They're Made & Why Collectors Choose Them";
const description =
  'How Sheldon Roth’s limited editions are produced: archival Lumachrome HD prints face-mounted to TruLife anti-reflective museum acrylic, with care and display notes for collectors.';
const url = 'https://sheldonroth.com/guides/lumachrome-acrylic-prints';

const faqs = [
  {
    q: 'Do these prints need a frame?',
    a: 'No. Each work arrives face-mounted and ready to hang on its French cleat. Hang it away from direct sunlight and heat sources.',
  },
  {
    q: 'How should the acrylic be cleaned?',
    a: 'Dust gently with a clean, soft microfibre cloth, without pressure. If needed, use a cleaner made for acrylic, sprayed onto the cloth, never directly onto the work. Never use glass cleaner, ammonia, alcohol, paper towels or abrasive pads, which can cloud or scratch the surface.',
  },
  {
    q: 'How long does a print take?',
    a: 'Each piece is made to order. Please allow two to four weeks from your order to delivery. You will receive tracking details by email when it ships.',
  },
];

export const metadata: Metadata = { title, description };

export default function LumachromeGuidePage() {
  return (
    <GuideLayout
      title={title}
      intro="A face-mounted Lumachrome print is made so that light can pass through the image and back again. This guide explains the materials used for every limited edition in the collection, and how to care for a work once it is on the wall."
      jsonLd={articleJsonLd({ title, description, url, faqs })}
    >
      <GuideSection title="The print itself">
        <p className="lk-body">
          Every limited edition begins as an archival Lumachrome HD print. The process is chosen for brilliant colour, fine
          detail and a long life — the same qualities described on each work’s materials list. A size is only offered when the
          original file holds at least 150 pixels per inch at that size, so the print can be read close to the wall as well as
          from across a room.
        </p>
        <p className="lk-body">
          The photograph is then face-mounted to TruLife anti-reflective, anti-glare museum-grade acrylic. Light travels through
          the image and returns, so colour and depth seem lit from within. The anti-reflective face is intended to keep
          reflections quiet, even in a bright interior.
        </p>
      </GuideSection>

      <GuideSection title="How the work is built">
        <p className="lk-body">
          Behind the print is an acrylic backing. The finished piece is presented with a floating mount and a French-cleat
          hanger, so it arrives ready to hang — no separate frame is required. Edges are finished as part of the face-mount,
          and the work is signed and numbered by Sheldon Roth. A{' '}
          <Link href="/certificate" className="text-accent-dark underline underline-offset-4">
            certificate of authenticity
          </Link>{' '}
          records the title, size, edition number, materials and date of production.
        </p>
        <p className="lk-body">
          Large acrylic works are inspected, wrapped, corner-protected and shipped in a rigid crate, fully insured, with a
          signature required on delivery. Production and packing are made to order; please allow{' '}
          <Link href="/shipping-returns" className="text-accent-dark underline underline-offset-4">
            two to four weeks
          </Link>{' '}
          from order to arrival in the United States.
        </p>
      </GuideSection>

      <GuideSection title="Living with an acrylic print">
        <p className="lk-body">
          A face-mounted print needs very little care to look its best for decades, provided it is hung and cleaned with the
          surface in mind. Avoid direct sunlight and strong UV light, which can fade any photograph over time. Keep the work
          away from heat sources such as radiators, fireplaces and vents, and from very humid rooms. A stable room temperature
          is ideal.
        </p>
        <p className="lk-body">
          Dust gently with a clean, soft microfibre cloth, without pressure. For marks, use a cleaner made for acrylic, sprayed
          onto the cloth, never directly onto the work. Never use glass cleaner, ammonia, alcohol, paper towels or abrasive
          pads, which can cloud or scratch the surface. The full notes are on the{' '}
          <Link href="/care-instructions" className="text-accent-dark underline underline-offset-4">
            Caring for Your Art
          </Link>{' '}
          page.
        </p>
      </GuideSection>

      <GuideSection title="Seeing the work in the galleries">
        <p className="lk-body">
          The same process is used across the collection, whether the subject is a high peak, a still lake, a reef or a wildlife
          portrait. You can begin with the{' '}
          <Link href="/collections/signature" className="text-accent-dark underline underline-offset-4">
            Signature Works
          </Link>
          , the{' '}
          <Link href="/collections/wildlife" className="text-accent-dark underline underline-offset-4">
            Wildlife
          </Link>{' '}
          gallery, or the coastal and underwater photographs in{' '}
          <Link href="/collections/coast" className="text-accent-dark underline underline-offset-4">
            Coast &amp; Ocean
          </Link>
          . Each product page lists the sizes the file will support, and a wall-scale preview shows the print above an 84-inch
          sofa.
        </p>
      </GuideSection>

      <GuideFaqs
        items={faqs.map((f) => ({
          q: f.q,
          a: f.a,
        }))}
      />
    </GuideLayout>
  );
}
