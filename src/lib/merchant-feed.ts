import type { PrintSize, Work } from '@/content/catalog';
import { LEAD_TIME_TEXT } from '@/content/commerce';
import { TIERS } from '@/content/pricing';

export function feedSizeLabel(dimensions: string) {
  return dimensions.replace(/"/g, ' in').replace(/\s+/g, ' ').trim();
}

export function feedDescription(
  work: Work,
  size: PrintSize,
  { gallery, orientation }: { gallery: string; orientation: 'portrait' | 'landscape' },
) {
  const spec = TIERS[work.tier];
  const dims = feedSizeLabel(size.dimensions);
  const proofs = spec.artistProofs
    ? `, plus ${spec.artistProofs} Artist Proofs offered by inquiry`
    : '';

  return [
    `${work.title} is a signed limited edition fine-art photograph by Sheldon Roth. ${work.description}`,
    `This ${orientation} photograph from the ${gallery} gallery is a ${spec.label} limited edition of ${work.editionSize}, shared across all sizes${proofs}. This listing is the ${dims} print.`,
    `It is an archival Lumachrome HD print face-mounted to TruLife anti-reflective, anti-glare museum-grade acrylic. Light travels through the image and returns, so colour and depth seem lit from within. Behind the print is an acrylic backing. The finished piece is presented with a floating mount and a French-cleat hanger, so it arrives ready to hang — no separate frame is required. A size is only offered when the original file holds at least 150 pixels per inch at that size.`,
    `Every print is signed and numbered by Sheldon Roth and accompanied by a certificate of authenticity recording the title, size, edition number, materials and date of production. Each piece is made to order; please allow ${LEAD_TIME_TEXT} from order to delivery. Acrylic works are wrapped, corner-protected and shipped in a rigid crate. Shipping within the United States is free, fully insured, with a signature required on delivery. International delivery is by studio inquiry.`,
  ].join(' ');
}

/** Merchant Center product_detail rows built only from catalog and published materials copy. */
export function feedProductDetails(
  work: Work,
  size: PrintSize,
  { gallery, orientation }: { gallery: string; orientation: 'portrait' | 'landscape' },
) {
  const spec = TIERS[work.tier];
  const edition =
    spec.artistProofs > 0
      ? `Limited edition of ${work.editionSize}, shared across all sizes, plus ${spec.artistProofs} Artist Proofs`
      : `Limited edition of ${work.editionSize}, shared across all sizes`;

  return [
    { section: 'Edition', name: 'Edition', value: edition },
    { section: 'Edition', name: 'Tier', value: spec.label },
    { section: 'Materials', name: 'Medium', value: 'Archival Lumachrome HD print' },
    {
      section: 'Materials',
      name: 'Finish',
      value: 'Face-mounted to TruLife anti-reflective, anti-glare museum-grade acrylic',
    },
    { section: 'Materials', name: 'Mount', value: 'Acrylic backing, floating mount and French-cleat hanger' },
    { section: 'Edition', name: 'Signed', value: 'Signed and numbered by Sheldon Roth, with a certificate of authenticity' },
    { section: 'Specifications', name: 'Size', value: feedSizeLabel(size.dimensions) },
    { section: 'Specifications', name: 'Orientation', value: orientation },
    { section: 'Specifications', name: 'Gallery', value: gallery },
  ];
}

/** Two to four short highlights. No promotional language. */
export function feedProductHighlights(work: Work) {
  return [
    `Signed and numbered limited edition of ${work.editionSize}, with a certificate of authenticity`,
    'Archival Lumachrome HD print face-mounted to museum-grade acrylic',
    'Ready to hang on a French-cleat hanger; no separate frame is required',
    'Shipped in a rigid crate; insured US delivery with signature required',
  ];
}
