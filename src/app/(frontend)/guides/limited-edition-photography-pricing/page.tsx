import Link from 'next/link';
import type { Metadata } from 'next';
import GuideLayout, { GuideFaqs, GuideSection } from '@/components/GuideLayout';
import { articleJsonLd } from '@/lib/schema';

const title = 'How Limited-Edition Fine Art Photography Pricing Works';
const description =
  'How Sheldon Roth’s editions are structured: one shared edition across all sizes, three tiers, a five-step published price ladder, Artist Proofs, certificates of authenticity, and 14-day returns.';
const url = 'https://sheldonroth.com/guides/limited-edition-photography-pricing';

const faqs = [
  {
    q: 'Why do prices change as an edition sells?',
    a: 'Each edition is priced in five published steps. The first quarter is offered at the opening price, then the price rises by 20%, 40% and 70% of the opening price as the edition sells, and the final 10% (at twice the opening price) is offered by inquiry. Every product page shows the current step and when the price next rises. The steps reflect how many prints remain, not a prediction of future or resale value.',
  },
  {
    q: 'What is an Artist Proof?',
    a: 'Premier and Signature works have a small, separately numbered run of Artist Proofs — two for Premier works and four for Signature Works. They are offered only in the largest available size, by inquiry, at the top of the price ladder from the outset. Collection works do not include Artist Proofs.',
  },
  {
    q: 'Can I return a print?',
    a: 'Yes. Contact the studio within 14 days of delivery and return the piece in its original crate and packaging, insured, with return freight paid by you. You can choose a full refund of the purchase price or a full exchange credit toward another work. If a piece arrives damaged, contact the studio within 48 hours with photographs and it will be replaced at no cost.',
  },
];

export const metadata: Metadata = { title, description };

export default function PricingGuidePage() {
  return (
    <GuideLayout
      title={title}
      intro="Every work is one limited edition, shared across all of its sizes. The price of the next print is published in advance, and it rises only as the edition sells."
      jsonLd={articleJsonLd({ title, description, url, faqs })}
    >
      <GuideSection title="One edition, shared across every size">
        <p className="lk-body">
          A limited edition here is not a separate run for each size. All prints of a work — whether 30 × 20 in or 60 × 40 in —
          count toward a single edition. Prints are numbered in the order they are sold, and once that number is reached the
          edition is closed permanently in every size. Numbers are never reused.
        </p>
        <p className="lk-body">
          Each print is signed and numbered and accompanied by a{' '}
          <Link href="/certificate" className="text-accent-dark underline underline-offset-4">
            certificate of authenticity
          </Link>
          . The certificate records the title, the artist, the print size, the edition number (for example, 7 / 40), the
          materials, the date of production and the artist’s signature. Keep it with the work; if it is ever lost, the studio
          can confirm a print’s edition number from its records.
        </p>
      </GuideSection>

      <GuideSection title="The three tiers">
        <p className="lk-body">
          Every work belongs to one of three tiers. The tier sets the edition size, whether Artist Proofs are offered, and the
          opening price of each format:
        </p>
        <ul className="lk-body list-disc space-y-2 pl-6">
          <li>
            <Link href="/premier" className="text-accent-dark underline underline-offset-4">
              Premier
            </Link>{' '}
            — the five defining photographs, in an edition of 20 plus two Artist Proofs, from $4,800.
          </li>
          <li>
            <Link href="/collections/signature" className="text-accent-dark underline underline-offset-4">
              Signature
            </Link>{' '}
            — an edition of 40 plus four Artist Proofs, from $3,400.
          </li>
          <li>Collection — an edition of 75, from $1,650. Collection works do not include Artist Proofs.</li>
        </ul>
        <p className="lk-body">
          Opening prices then rise with size. A Collection work, for example, is listed at $1,650 for 24 × 16 in, $2,400 for
          30 × 20 in, $3,200 for 36 × 24 in, $4,200 for 45 × 30 in and $7,200 for 60 × 40 in at the first step. The same long
          edges, at the same opening prices, apply to 2:1 panoramic formats such as 36 × 18 in. Current prices always appear
          on the work’s page.
        </p>
      </GuideSection>

      <GuideSection title="The published price ladder">
        <p className="lk-body">
          Each edition is divided into five steps. The first 25% of the edition is offered at the opening price. The next 25%
          is 20% above the opening price; the next 25% is 40% above; the following 15% is 70% above. The final 10% is offered
          at twice the opening price, by inquiry only. Prices are rounded to a clean gallery figure.
        </p>
        <p className="lk-body">
          Every product page shows the step the next print falls in, and the edition number at which the price next rises. The
          ladder describes how many prints remain. It is not a prediction of future or resale value.
        </p>
      </GuideSection>

      <GuideSection title="Artist Proofs">
        <p className="lk-body">
          Premier and Signature works also have a small, separately numbered run of Artist Proofs, marked AP: two proofs for
          each Premier work, four for each Signature work. They are offered only in the largest available size, by inquiry, and
          are priced at the top of the ladder from the first day. If you would like to be considered for a proof, use the{' '}
          <Link href="/contact" className="text-accent-dark underline underline-offset-4">
            inquiry form
          </Link>{' '}
          or join the Collector List for early word when one becomes available.
        </p>
      </GuideSection>

      <GuideSection title="Returns and exchanges">
        <p className="lk-body">
          If a piece is not right for your space, contact the studio within 14 days of delivery. Return it in its original crate
          and packaging, insured, with return freight paid by you. Once it arrives back undamaged, you may choose a full refund
          of the purchase price or a full exchange credit toward any other work. Damage in transit is replaced at no cost if it
          is reported within 48 hours with photographs. The full policy is on{' '}
          <Link href="/shipping-returns" className="text-accent-dark underline underline-offset-4">
            Shipping &amp; Returns
          </Link>
          .
        </p>
      </GuideSection>

      <GuideFaqs items={faqs} />
    </GuideLayout>
  );
}
