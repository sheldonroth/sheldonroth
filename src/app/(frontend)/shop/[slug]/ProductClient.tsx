'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/content/catalog';
import { ARTIST_PROOF_SIZE, ladderSteps, priceAtStep, type Tier } from '@/content/pricing';
import WallPreview from '@/components/WallPreview';

interface SizeOption {
  name: string;
  dimensions: string;
  long: number;
  short: number;
  /** opening (step 1) price */
  price: number;
}

interface ProductData {
  slug: string;
  title: string;
  description: string;
  tier: Tier;
  tierLabel: string;
  editionSize: number;
  artistProofs: number;
  collectionTitle: string;
  collectionSlug: string;
  image: { src: string; width: number; height: number };
  sizes: SizeOption[];
  details: string[];
  financing: boolean;
}

/** What /api/editions/[slug] returns (prices are always computed on the server). */
interface EditionInfo {
  live: boolean;
  step: number | null;
  inquiryOnly: boolean;
  soldOut: boolean;
  nextIncreaseAt: number | null;
  remaining: number | null;
  sizes: { name: string; price: number | null; nextPrice: number | null }[];
}

export default function ProductClient({ work }: { work: ProductData }) {
  const [selected, setSelected] = useState(0);
  const [added, setAdded] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [edition, setEdition] = useState<EditionInfo | null>(null);
  const { addItem } = useCart();

  const steps = useMemo(() => ladderSteps(work.editionSize), [work.editionSize]);
  const portrait = work.image.height > work.image.width;
  const size = work.sizes[selected] as SizeOption | undefined;

  // Live edition status and server-computed prices.
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/editions/${work.slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: EditionInfo | null) => {
        if (!cancelled && d && Array.isArray(d.sizes)) setEdition(d);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [work.slug]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setLightbox(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox]);

  // Until the server answers, show the opening step (the edition starts there).
  const stepNo = edition?.step ?? 1;
  const currentStep = steps[stepNo - 1];
  const priceOf = (s: SizeOption) => edition?.sizes.find((x) => x.name === s.name)?.price ?? priceAtStep(s.price, currentStep);
  const nextPriceOf = (s: SizeOption) => {
    const fromServer = edition?.sizes.find((x) => x.name === s.name)?.nextPrice;
    if (fromServer !== undefined) return fromServer;
    const next = steps[stepNo];
    return next ? priceAtStep(s.price, next) : null;
  };
  const nextIncreaseAt = edition ? edition.nextIncreaseAt : steps[1]?.from ?? null;
  const soldOut = !!edition?.soldOut;
  const inquiryOnly = !!edition?.inquiryOnly;
  const canBuy = !!size && !soldOut && !inquiryOnly;

  const inquiryHref = (s?: { name: string }) => `/contact?work=${work.slug}${s ? `&size=${encodeURIComponent(s.name)}` : ''}#inquire`;
  const apHref = `/contact?work=${work.slug}&size=${ARTIST_PROOF_SIZE}#inquire`;

  const handleAdd = () => {
    if (!size || !canBuy) return;
    addItem({
      productSlug: work.slug,
      title: work.title,
      size: size.name,
      dimensions: size.dimensions,
      price: priceOf(size),
      image: work.image.src,
      edition: `${work.tierLabel} · Edition of ${work.editionSize}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  // Straight to Stripe Checkout; the inquiry form only while online checkout is switched off.
  const handleCollect = async () => {
    if (!size || !canBuy) return;
    setCheckingOut(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ slug: work.slug, size: size.name, quantity: 1 }] }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.code === 'checkout_disabled' || data.code === 'inquiry_only') {
        window.location.href = inquiryHref(size);
        return;
      }
      setError(data.error || 'Could not start checkout. Please try again.');
    } catch {
      setError('Could not start checkout. Please check your connection and try again.');
    }
    setCheckingOut(false);
  };

  const wallW = size ? (portrait ? size.short : size.long) : 0;
  const wallH = size ? (portrait ? size.long : size.short) : 0;

  return (
    <>
      {/* Product layout after lik.com: grey band with the photograph across the container, then title left and
          purchase panel right; the long copy sits below on white. */}
      <section className="bg-[#edecec] pb-14 pt-[90px] lg:pb-20 lg:pt-[150px]">
        <div className="lk-container">
          <nav className="lk-small mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:underline">Home</Link> / <Link href="/collections" className="hover:underline">Galleries</Link> /{' '}
            <Link href={`/collections/${work.collectionSlug}`} className="hover:underline">{work.collectionTitle}</Link> / {work.title}
          </nav>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="group flex w-full cursor-zoom-in items-center justify-center"
            aria-label={`View ${work.title} full screen`}
          >
            <Image quality={80}
              src={work.image.src}
              alt={`${work.title} — limited edition photograph by Sheldon Roth`}
              width={work.image.width}
              height={work.image.height}
              priority
              sizes="(max-width: 1320px) 100vw, 1280px"
              className={`h-auto w-auto object-contain shadow-[0_4px_14px_rgba(0,0,0,0.25)] ${portrait ? 'max-h-[82vh]' : 'max-h-[74vh]'}`}
              style={{ maxWidth: '100%' }}
            />
          </button>

          <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_436px] lg:gap-20">
            <div>
              <h1 className="lk-product-title">{work.title}</h1>
              <p className="lk-edition-label mt-5">
                {work.tier !== 'collection' && <span className="text-accent-dark">{work.tierLabel} · </span>}
                Edition of {work.editionSize} across all sizes
                {work.artistProofs > 0 && ` · ${work.artistProofs} Artist Proofs`}
              </p>
              <p className="lk-price mt-5">{size ? formatPrice(priceOf(size)) : 'Price on request'}</p>
              {size && (
                <p className="lk-small mt-2">
                  Free shipping within the US · Tax calculated at checkout
                  {work.financing && ' · Pay over time available at checkout'}
                </p>
              )}

              {size && (
                <div className="mt-6 border-l-2 border-accent pl-4">
                  {soldOut ? (
                    <p className="lk-small text-[#222]">This edition is sold out. Artist Proofs may be available by inquiry.</p>
                  ) : inquiryOnly ? (
                    <p className="lk-small text-[#222]">The final editions are offered by inquiry, at {formatPrice(priceOf(size))} for {size.dimensions}.</p>
                  ) : (
                    <p className="lk-small text-[#222]">
                      Step {stepNo} of {steps.length}
                      {stepNo === 1 ? ' · Opening price' : ''}.{' '}
                      {nextIncreaseAt && nextPriceOf(size)
                        ? `The price rises to ${formatPrice(nextPriceOf(size)!)} from edition #${nextIncreaseAt}.`
                        : ''}
                    </p>
                  )}
                  {edition?.remaining != null && !soldOut && (
                    <p className="lk-small mt-1 text-accent-dark">{edition.remaining} of {work.editionSize} remaining</p>
                  )}
                  <details className="group mt-3">
                    <summary className="lk-small cursor-pointer list-none text-accent-dark underline underline-offset-4 [&::-webkit-details-marker]:hidden">
                      How edition pricing works
                    </summary>
                    <table className="mt-3 w-full text-left text-[13px] leading-5 text-[#444]">
                      <thead>
                        <tr className="border-b border-[#d6d4cf] text-[11px] uppercase tracking-[0.05em] text-[#6c6a6a]">
                          <th className="py-1.5 font-bold">Step</th>
                          <th className="py-1.5 font-bold">Edition no.</th>
                          <th className="py-1.5 text-right font-bold">{size.dimensions}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {steps.map((st) => (
                          <tr key={st.step} className={`border-b border-[#e3e1dc] ${st.step === stepNo && !soldOut ? 'font-semibold text-[#222]' : ''}`}>
                            <td className="py-1.5">{st.step}{st.step === stepNo && !soldOut ? ' · now' : ''}</td>
                            <td className="py-1.5">#{st.from}{st.to > st.from ? `–${st.to}` : ''}</td>
                            <td className="py-1.5 text-right">{formatPrice(priceAtStep(size.price, st))}{st.inquiryOnly ? ' · by inquiry' : ''}</td>
                          </tr>
                        ))}
                        {work.artistProofs > 0 && (
                          <tr>
                            <td className="py-1.5">AP</td>
                            <td className="py-1.5">AP 1–{work.artistProofs}</td>
                            <td className="py-1.5 text-right">Largest size · by inquiry</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <p className="mt-2 text-[12px] leading-[18px] text-[#6c6a6a]">
                      One edition is shared across every size. Prices rise as the edition sells, so early collectors pay the least. The steps
                      reflect remaining availability, not a forecast of future value.
                    </p>
                  </details>
                </div>
              )}
            </div>

            {!size ? (
              <div>
                <h2 className="lk-edition-label">Available by Inquiry</h2>
                <p className="lk-body mt-4">
                  This photograph is offered by private inquiry rather than in our standard gallery sizes. Contact the studio to discuss a
                  print of this work.
                </p>
                <div className="mt-8 grid gap-3">
                  <Link href={inquiryHref()} className="lk-btn lk-btn-solid w-full">Ask a Question</Link>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <h2 className="lk-edition-label">Select a Size</h2>
                  <div className="mt-4 space-y-2" role="radiogroup" aria-label="Print size">
                    {work.sizes.map((s, i) => (
                      <button
                        key={s.name}
                        type="button"
                        role="radio"
                        aria-checked={i === selected}
                        onClick={() => setSelected(i)}
                        className={`flex w-full items-center justify-between border px-4 py-3 text-left transition-colors ${
                          i === selected ? 'border-accent-dark bg-white' : 'border-[#d6d4cf] bg-white/60 hover:border-[#999]'
                        }`}
                      >
                        <span className="block text-[16px] font-semibold leading-6 text-[#222]">{s.dimensions}</span>
                        <span className="text-[16px] leading-6 text-[#222]">{formatPrice(priceOf(s))}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  {canBuy ? (
                    <button type="button" onClick={handleCollect} disabled={checkingOut} className="lk-btn lk-btn-solid w-full">
                      {checkingOut ? 'One Moment…' : 'Collect This Edition'}
                    </button>
                  ) : (
                    <Link href={soldOut ? apHref : inquiryHref(size)} className="lk-btn lk-btn-solid w-full">
                      {soldOut ? 'Inquire About an Artist Proof' : 'Inquire About the Final Editions'}
                    </Link>
                  )}
                  <p className="lk-small mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-center">
                    {canBuy && (
                      <button type="button" onClick={handleAdd} className="text-accent-dark underline underline-offset-4 hover:text-[#222]">
                        {added ? 'Added to cart ✓' : 'Add to cart'}
                      </button>
                    )}
                    <Link href={inquiryHref(size)} className="text-accent-dark underline underline-offset-4 hover:text-[#222]">Ask a question</Link>
                    {work.artistProofs > 0 && !soldOut && (
                      <Link href={apHref} className="text-accent-dark underline underline-offset-4 hover:text-[#222]">Artist Proof inquiry</Link>
                    )}
                  </p>
                </div>
                {error && (
                  <p role="alert" className="lk-small mt-4 text-center text-[#a12a2a]">
                    {error} You can also <Link href={inquiryHref(size)} className="underline">contact the studio</Link>.
                  </p>
                )}
                {added && (
                  <p className="lk-small mt-3 text-center">
                    <Link href="/cart" className="font-bold text-accent-dark underline">View cart</Link>
                  </p>
                )}
                <p className="lk-small mt-6">Made to order and shipped in 2–4 weeks. Free shipping within the US, insured and signature-required. Tax calculated at checkout. Each piece is signed and numbered by the artist. 14-day returns. <Link href="/shipping-returns" className="underline">Shipping &amp; returns</Link></p>
              </div>
            )}
          </div>
        </div>
      </section>

      {size && (
        <section className="lk-section border-b border-line" aria-labelledby="wall-heading">
          <div className="lk-container max-w-[1040px] min-[1800px]:max-w-[1120px]">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="lk-edition-label">Scale</p>
                <h2 id="wall-heading" className="mt-3 text-[30px] font-light leading-[1.1] tracking-[0.03em] text-accent md:text-[40px]">See It on Your Wall</h2>
              </div>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Preview size">
                {work.sizes.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    role="radio"
                    aria-checked={i === selected}
                    onClick={() => setSelected(i)}
                    className={`border px-3 py-2 text-[13px] leading-5 transition-colors ${i === selected ? 'border-accent-dark bg-accent-dark text-white' : 'border-[#d6d4cf] text-[#222] hover:border-[#999]'}`}
                  >
                    {s.dimensions}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8">
              <WallPreview src={work.image.src} title={work.title} widthIn={wallW} heightIn={wallH} label={size.dimensions} />
            </div>
          </div>
        </section>
      )}

      <section className="lk-section">
        <div className="lk-container grid max-w-[1040px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 min-[1800px]:max-w-[1120px]">
          <div>
            <h2 className="lk-tab border-b border-line pb-4 text-[#222]">About the Artwork</h2>
            <p className="lk-body mt-6">{work.description}</p>
            <p className="lk-body mt-4">
              {work.tier === 'collection' ? 'Released' : `A ${work.tierLabel} work, released`} as a single limited edition of {work.editionSize}{' '}
              shared across every size{work.artistProofs > 0 ? `, with ${work.artistProofs} Artist Proofs` : ''}. Once the edition is complete it
              is closed permanently and never reprinted.
            </p>
          </div>
          <div>
            <h2 className="lk-tab border-b border-line pb-4 text-[#222]">The Gallery Presentation</h2>
            <ul className="mt-6 space-y-2">
              {work.details.map((d) => (
                <li key={d} className="lk-body flex gap-3">
                  <span className="mt-[11px] h-px w-3 shrink-0 bg-accent" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/97 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${work.title} full screen`}
          onClick={() => setLightbox(false)}
        >
          <Image
            src={work.image.src}
            alt={work.title}
            width={work.image.width}
            height={work.image.height}
            sizes="100vw"
            quality={80}
            className="h-auto max-h-[94vh] w-auto max-w-full object-contain"
          />
          <button
            type="button"
            className="lk-nav absolute right-5 top-5 px-3 py-2 text-white hover:opacity-70"
            onClick={() => setLightbox(false)}
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  );
}
