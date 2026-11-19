/**
 * Tiered, stepped-ladder pricing (approved by Sheldon 2026-11-19). Client-safe: pure data and functions only.
 *
 * - Every work belongs to a tier. A tier sets the edition (one count shared across all sizes of a work), the number of
 *   Artist Proofs, and the opening price of each size.
 * - The price of the next print rises as the edition sells, in five published steps. The final 10% is by inquiry.
 * - The server (checkout, /api/editions) is authoritative: it reads the number sold and prices from this file.
 */

export type Tier = 'premier' | 'signature' | 'collection';

/** Size keys are stored in carts, Stripe metadata and site.edition_sales, so never rename one once sold. */
export const SIZE_KEYS = ['24x16', '30x20', '36x24', '45x30', '60x40'] as const;
export type SizeKey = (typeof SIZE_KEYS)[number];

export interface PrintFormat {
  key: SizeKey;
  /** long x short edge in inches */
  long: number;
  short: number;
}

export const PRINT_FORMATS: PrintFormat[] = [
  { key: '24x16', long: 24, short: 16 },
  { key: '30x20', long: 30, short: 20 },
  { key: '36x24', long: 36, short: 24 },
  { key: '45x30', long: 45, short: 30 },
  { key: '60x40', long: 60, short: 40 },
];

/** Old size names (before 2026-11-19) mapped to their new keys, so carts saved in a browser still check out. */
export const LEGACY_SIZE_NAMES: Record<string, SizeKey> = { Gallery: '30x20', Signature: '45x30', Masterwork: '60x40' };

export interface TierSpec {
  label: string;
  /** Prints per work, shared across every size. */
  edition: number;
  /** Separate Artist Proof run: largest available size only, by inquiry, at the top ladder price from day one. */
  artistProofs: number;
  /** Opening (step 1) price per size in USD. A size missing here is not offered in this tier. */
  prices: Partial<Record<SizeKey, number>>;
}

export const TIERS: Record<Tier, TierSpec> = {
  premier: {
    label: 'Premier',
    edition: 20,
    artistProofs: 2,
    prices: { '30x20': 4800, '36x24': 6200, '45x30': 8500, '60x40': 14500 },
  },
  signature: {
    label: 'Signature',
    edition: 40,
    artistProofs: 4,
    prices: { '30x20': 3400, '36x24': 4400, '45x30': 5900, '60x40': 9800 },
  },
  collection: {
    label: 'Collection',
    edition: 75,
    artistProofs: 0,
    prices: { '24x16': 1650, '30x20': 2400, '36x24': 3200, '45x30': 4200, '60x40': 7200 },
  },
};

/** The top five works. Every other Signature Work is `signature`; everything else is `collection`. */
export const PREMIER_SLUGS = ['leap-of-faith', 'the-watcher', 'cloud-lake', 'canyon-song', 'pride'];

/** The five published ladder steps: share of the edition and price multiplier over the opening price. */
export const LADDER = [
  { share: 0.25, multiplier: 1.0, inquiryOnly: false },
  { share: 0.25, multiplier: 1.2, inquiryOnly: false },
  { share: 0.25, multiplier: 1.4, inquiryOnly: false },
  { share: 0.15, multiplier: 1.7, inquiryOnly: false },
  { share: 0.1, multiplier: 2.0, inquiryOnly: true },
] as const;

/** Value used for an Artist Proof request in the inquiry form (`/contact?work=…&size=artist-proof`). */
export const ARTIST_PROOF_SIZE = 'artist-proof';

/** Multiplier for Artist Proofs (the top of the ladder, from day one). */
export const ARTIST_PROOF_MULTIPLIER = 2.0;

/** The exact edition counter is shown only once this share of the edition has sold. */
export const SHOW_REMAINING_FROM = 0.1;

/** Rounds to a clean gallery price: nearest $50 under $2,000, nearest $100 from $2,000. */
export function roundPrice(x: number) {
  const unit = x < 2000 ? 50 : 100;
  return Math.round(x / unit) * unit;
}

export interface LadderStep {
  /** 1-based step number */
  step: number;
  /** first and last edition number in this step (inclusive, 1-based) */
  from: number;
  to: number;
  multiplier: number;
  inquiryOnly: boolean;
}

/** Edition numbers covered by each step, e.g. edition 75 → #1–19, #20–38, #39–56, #57–68, #69–75. */
export function ladderSteps(edition: number): LadderStep[] {
  const steps: LadderStep[] = [];
  let cumulative = 0;
  let prevEnd = 0;
  LADDER.forEach((s, i) => {
    cumulative += s.share;
    const end = i === LADDER.length - 1 ? edition : Math.round(edition * cumulative);
    steps.push({ step: i + 1, from: prevEnd + 1, to: end, multiplier: s.multiplier, inquiryOnly: s.inquiryOnly });
    prevEnd = end;
  });
  return steps;
}

/** The step a given edition number falls in, or undefined when it is beyond the edition. */
export function stepForNumber(edition: number, editionNumber: number): LadderStep | undefined {
  return ladderSteps(edition).find((s) => editionNumber >= s.from && editionNumber <= s.to);
}

export function priceAtStep(openingPrice: number, step: LadderStep) {
  return roundPrice(openingPrice * step.multiplier);
}

export interface EditionStatus {
  tier: Tier;
  tierLabel: string;
  edition: number;
  artistProofs: number;
  sold: number;
  /** Prints left in the edition (all sizes together). */
  remaining: number;
  /** True when the exact counter may be shown (at least SHOW_REMAINING_FROM of the edition sold). */
  showRemaining: boolean;
  soldOut: boolean;
  /** The step the next print falls in (undefined when sold out). */
  current?: LadderStep;
  /** The next print is in the final, inquiry-only step. */
  inquiryOnly: boolean;
  /** Edition number at which the price next rises, if another step follows. */
  nextIncreaseAt?: number;
  /** Current price per size key (what checkout charges for the next print). */
  prices: Partial<Record<SizeKey, number>>;
  /** Price per size key after the next increase. */
  nextPrices?: Partial<Record<SizeKey, number>>;
}

export function editionStatus(tier: Tier, sold: number, sizeKeys: SizeKey[]): EditionStatus {
  const spec = TIERS[tier];
  const steps = ladderSteps(spec.edition);
  const nextNumber = sold + 1;
  const current = steps.find((s) => nextNumber >= s.from && nextNumber <= s.to);
  const nextStep = current ? steps[current.step] : undefined;
  const priceMap = (step: LadderStep) =>
    Object.fromEntries(sizeKeys.filter((k) => spec.prices[k]).map((k) => [k, priceAtStep(spec.prices[k]!, step)])) as Partial<Record<SizeKey, number>>;
  return {
    tier,
    tierLabel: spec.label,
    edition: spec.edition,
    artistProofs: spec.artistProofs,
    sold,
    remaining: Math.max(0, spec.edition - sold),
    showRemaining: sold >= spec.edition * SHOW_REMAINING_FROM,
    soldOut: !current,
    current,
    inquiryOnly: !!current?.inquiryOnly,
    nextIncreaseAt: nextStep?.from,
    prices: current ? priceMap(current) : {},
    nextPrices: nextStep ? priceMap(nextStep) : undefined,
  };
}

/** Human label for a size, turned for portrait works, e.g. `30" × 20"` or `20" × 30"`. */
export function sizeLabel(f: { long: number; short: number }, portrait: boolean) {
  return portrait ? `${f.short}" × ${f.long}"` : `${f.long}" × ${f.short}"`;
}
