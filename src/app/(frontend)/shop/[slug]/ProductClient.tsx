'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/content/catalog';

interface ProductData {
  slug: string;
  title: string;
  description: string;
  editionSize: number;
  collectionTitle: string;
  collectionSlug: string;
  image: { src: string; width: number; height: number };
  sizes: { name: string; price: number; dimensions: string }[];
  details: string[];
}

export default function ProductClient({ work }: { work: ProductData }) {
  const [selected, setSelected] = useState(0);
  const [added, setAdded] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<Record<string, number> | null>(null);
  const [editionSize, setEditionSize] = useState<number>(work.editionSize);

  // Live edition counter: shown only when the edition database answers.
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/editions/${work.slug}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { remaining?: Record<string, number> | null; editionSize?: number } | null) => {
        if (cancelled || !d?.remaining) return;
        setRemaining(d.remaining);
        if (d.editionSize) setEditionSize(d.editionSize);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [work.slug]);
  const { addItem } = useCart();
  const size = work.sizes[selected] as ProductData['sizes'][number] | undefined;
  const portrait = work.image.height > work.image.width;

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

  const handleAdd = () => {
    if (!size) return;
    addItem({
      productSlug: work.slug,
      title: work.title,
      size: size.name,
      dimensions: size.dimensions,
      price: size.price,
      image: work.image.src,
      edition: `Limited Edition of ${work.editionSize}`,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  const soldOut = !!(size && remaining && remaining[size.name] !== undefined && remaining[size.name] <= 0);
  const inquiryHref = (s?: { name: string }) => `/contact?work=${work.slug}${s ? `&size=${encodeURIComponent(s.name)}` : ''}`;

  // Straight to Stripe Checkout when it's configured; the inquiry form only while online checkout is switched off.
  const handleBuyNow = async () => {
    if (!size) return;
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
      if (data.code === 'checkout_disabled') {
        window.location.href = inquiryHref(size);
        return;
      }
      setError(data.error || 'Could not start checkout. Please try again.');
    } catch {
      setError('Could not start checkout. Please check your connection and try again.');
    }
    setCheckingOut(false);
  };

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
              <p className="lk-edition-label mt-5">Limited Edition of {work.editionSize}</p>
              <p className="lk-price mt-5">{size ? formatPrice(size.price) : 'Price on request'}</p>
            </div>

            {!size ? (
              <div>
                <h2 className="lk-edition-label">Available by Inquiry</h2>
                <p className="lk-body mt-4">
                  This photograph is offered by private inquiry rather than in our standard gallery sizes. Contact the studio to discuss a
                  print of this work.
                </p>
                <div className="mt-8 grid gap-3">
                  <Link href={`/contact?work=${work.slug}`} className="lk-btn lk-btn-solid w-full">
                    Inquire
                  </Link>
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
                      <span>
                        <span className="block text-[16px] font-semibold leading-6 text-[#222]">{s.name}</span>
                        <span className="lk-small">{s.dimensions}</span>
                        {remaining && remaining[s.name] !== undefined && (
                          <span className="lk-small block text-accent-dark">
                            {remaining[s.name] > 0 ? `${remaining[s.name]} of ${editionSize} remaining` : 'Edition sold out'}
                          </span>
                        )}
                      </span>
                      <span className="text-[16px] leading-6 text-[#222]">{formatPrice(s.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <button type="button" onClick={handleAdd} disabled={soldOut} className="lk-btn lk-btn-solid w-full disabled:opacity-50">
                  {added ? 'Added to Cart ✓' : 'Add to Cart'}
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={handleBuyNow} disabled={checkingOut || soldOut} className="lk-btn lk-btn-gold w-full px-3 disabled:opacity-50">
                    {checkingOut ? 'One Moment…' : 'Buy Now'}
                  </button>
                  <Link href={inquiryHref(size)} className="lk-btn lk-btn-gold w-full px-3">
                    Inquire
                  </Link>
                </div>
              </div>
              {error && (
                <p role="alert" className="lk-small mt-4 text-center text-[#a12a2a]">
                  {error} You can also <Link href={inquiryHref(size)} className="underline">contact the studio</Link>.
                </p>
              )}
              {added && (
                <p className="lk-small mt-4 text-center">
                  Added to your cart. <Link href="/cart" className="font-bold text-accent-dark underline">View cart</Link>
                </p>
              )}
              <p className="lk-small mt-6">Made to order and shipped in 2–4 weeks, insured and signature-required. Each piece is signed and numbered by the artist. <Link href="/shipping-returns" className="underline">Shipping &amp; returns</Link></p>
            </div>
            )}
          </div>
        </div>
      </section>

      <section className="lk-section">
        <div className="lk-container grid max-w-[1040px] grid-cols-1 gap-12 md:grid-cols-2 md:gap-20 min-[1800px]:max-w-[1120px]">
          <div>
            <h2 className="lk-tab border-b border-line pb-4 text-[#222]">About the Artwork</h2>
            <p className="lk-body mt-6">{work.description}</p>
            <p className="lk-body mt-4">
              Released as a limited edition of {work.editionSize}. Once the edition is sold out it is retired permanently, preserving the
              rarity of every print.
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
