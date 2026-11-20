import Link from 'next/link';
import type { Metadata } from 'next';
import GuideLayout, { GuideFaqs, GuideSection } from '@/components/GuideLayout';
import { articleJsonLd } from '@/lib/schema';

const title = 'How to Size Large-Format Fine Art Photography for Your Wall';
const description =
  'Practical guidance for choosing a print size — 24 × 16, 30 × 20, 36 × 24, 45 × 30, 60 × 40, and 2:1 panoramas such as 36 × 18 — using the wall-scale preview on each work.';
const url = 'https://sheldonroth.com/guides/sizing-large-format-photography';

const faqs = [
  {
    q: 'What sizes are offered?',
    a: 'Works are offered from 24 × 16 in up to 60 × 40 in (24 × 16, 30 × 20, 36 × 24, 45 × 30 and 60 × 40), turned for portrait images. Selected panoramic works are also offered in 2:1 sizes such as 24 × 12, 30 × 15 and 36 × 18 in. A size is only listed when the original file holds at least 150 pixels per inch at that size.',
  },
  {
    q: 'How can I judge the scale before I order?',
    a: 'Each product page has a “See it on your wall” view. It draws the selected size to true scale on a 14-foot-wide, 9-foot-tall wall, centred above an 84-inch sofa, with a 5-foot-9-inch figure standing beside it.',
  },
  {
    q: 'Can I request a size that is not listed?',
    a: 'Please contact the studio with your space and the size you have in mind. Custom pieces are quoted individually.',
  },
];

export const metadata: Metadata = { title, description };

export default function SizingGuidePage() {
  return (
    <GuideLayout
      title={title}
      intro="Scale is part of the work. The sizes offered on this site are fixed formats, and each product page includes a wall preview so you can judge a print against a sofa and a standing figure before you choose."
      jsonLd={articleJsonLd({ title, description, url, faqs })}
    >
      <GuideSection title="The sizes that are actually offered">
        <p className="lk-body">
          Most works are printed in the 3:2 formats used throughout the collection: 24 × 16, 30 × 20, 36 × 24, 45 × 30 and
          60 × 40 inches. Portrait works use the same long and short edges, turned (for example, 20 × 30 in). Collection-tier
          works include the 24 × 16 in opening size; Premier and Signature works begin at 30 × 20 in.
        </p>
        <p className="lk-body">
          A handful of photographs are cropped to a 2:1 panoramic proportion and are offered in matching sizes — 24 × 12,
          30 × 15, 36 × 18, and, when the file will support them, 48 × 24 or 60 × 30 inches — so the image is not cropped or
          stretched to fit a 3:2 sheet. You can see those works in the{' '}
          <Link href="/collections/panoramas" className="text-accent-dark underline underline-offset-4">
            Panoramas
          </Link>{' '}
          gallery;{' '}
          <Link href="/shop/savanna-sentinel" className="text-accent-dark underline underline-offset-4">
            Savanna Sentinel
          </Link>{' '}
          is one current example.
        </p>
        <p className="lk-body">
          Not every work is available in every size. A format is listed only when the master file holds at least 150 pixels per
          inch along the long edge. The sizes on the product page are the sizes that can be printed cleanly.
        </p>
      </GuideSection>

      <GuideSection title="Reading the wall preview">
        <p className="lk-body">
          Every work page includes a “See it on your wall” drawing. The wall is 14 feet wide and 9 feet tall. An 84-inch sofa
          sits beneath the print, and a 5-foot-9-inch figure stands to the side. The artwork is shown at the exact inch
          measurements of the size you have selected, hanging a short distance above the sofa back. Changing the size updates
          the drawing at once.
        </p>
        <p className="lk-body">
          That view is the most reliable way to judge scale. On an 84-inch sofa, a 30 × 20 in print is a modest presence; a
          45 × 30 in print sits closer to half the sofa’s width; a 60 × 40 in print is a true statement piece. A 36 × 18 in
          panorama has the width of a 36 × 24 in print but a lower profile, which often suits a wide wall or a space with a
          lower ceiling line.
        </p>
      </GuideSection>

      <GuideSection title="A practical starting point">
        <p className="lk-body">
          For a principal wall above a standard sofa, many collectors begin by comparing 36 × 24 in and 45 × 30 in on the
          preview, then step up or down once they have seen the work at scale. Smaller studies and narrower walls often sit
          comfortably at 24 × 16 or 30 × 20. Very large rooms, and walls that are meant to carry a single image, are where
          60 × 40 in — or a wide 2:1 panorama — earns its place.
        </p>
        <p className="lk-body">
          Leave breathing room around the print. The preview hangs the work nine inches above the sofa back; in a real room,
          keep the piece clear of picture lights, vents and direct sun, as noted in the{' '}
          <Link href="/care-instructions" className="text-accent-dark underline underline-offset-4">
            care instructions
          </Link>
          . Larger sizes are heavy; they should be hung with two people, on a French cleat fixed into studs or rated anchors.
        </p>
      </GuideSection>

      <GuideSection title="If the listed sizes are not quite right">
        <p className="lk-body">
          If your wall asks for a measurement that is not listed,{' '}
          <Link href="/contact" className="text-accent-dark underline underline-offset-4">
            contact the studio
          </Link>{' '}
          with the room and the size you have in mind. Custom pieces are quoted individually. For a first look at scale, open
          any work —{' '}
          <Link href="/shop/cloud-lake" className="text-accent-dark underline underline-offset-4">
            Cloud Lake
          </Link>
          ,{' '}
          <Link href="/shop/the-watcher" className="text-accent-dark underline underline-offset-4">
            The Watcher
          </Link>
          , or a panorama from the{' '}
          <Link href="/collections/panoramas" className="text-accent-dark underline underline-offset-4">
            Panoramas
          </Link>{' '}
          gallery — and move through the sizes on the wall preview.
        </p>
      </GuideSection>

      <GuideFaqs items={faqs} />
    </GuideLayout>
  );
}
