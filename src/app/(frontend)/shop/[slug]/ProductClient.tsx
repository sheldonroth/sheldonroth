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
  const { addItem } = useCart();
  const size = work.sizes[selected];
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

  const handleBuyNow = async () => {
    setCheckingOut(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [
            {
              name: `${work.title} — ${size.name}`,
              price: size.price,
              quantity: 1,
              image: new URL(work.image.src, window.location.origin).toString(),
              description: `${size.dimensions} · Limited Edition of ${work.editionSize}`,
            },
          ],
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      window.location.href = `/contact?work=${work.slug}&size=${encodeURIComponent(size.name)}`;
    } catch {
      window.location.href = `/contact?work=${work.slug}&size=${encodeURIComponent(size.name)}`;
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <>
      {/* Stage */}
      <section className="bg-black pt-[72px] lg:pt-[92px]">
        <button
          type="button"
          onClick={() => setLightbox(true)}
          className="group relative mx-auto flex w-full max-w-[1800px] cursor-zoom-in items-center justify-center px-0 py-6 sm:px-6 lg:py-12"
          aria-label={`View ${work.title} full screen`}
        >
          <Image
            src={work.image.src}
            alt={`${work.title} — limited edition photograph by Sheldon Roth`}
            width={work.image.width}
            height={work.image.height}
            priority
            sizes="(max-width: 1800px) 100vw, 1800px"
            className={`h-auto w-auto object-contain shadow-[0_30px_80px_rgba(0,0,0,0.6)] ${portrait ? 'max-h-[82vh]' : 'max-h-[78vh]'}`}
            style={{ maxWidth: '100%' }}
          />
          <span className="eyebrow absolute bottom-10 right-10 hidden bg-black/50 px-4 py-2 text-white/80 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 md:block">
            Full Screen ⤢
          </span>
        </button>
      </section>

      {/* Details */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-24 lg:px-10">
          <div>
            <nav className="eyebrow text-muted" aria-label="Breadcrumb">
              <Link href="/collections" className="hover:text-foreground">Galleries</Link>
              <span className="mx-3">/</span>
              <Link href={`/collections/${work.collectionSlug}`} className="hover:text-foreground">{work.collectionTitle}</Link>
            </nav>
            <h1 className="font-display mt-6 text-5xl leading-[1.02] text-foreground md:text-6xl lg:text-7xl">{work.title}</h1>
            <p className="eyebrow mt-6 text-accent">Limited Edition of {work.editionSize}</p>
            <div className="mt-6 h-px w-14 bg-accent/60" />
            <p className="font-display mt-8 max-w-xl text-2xl italic leading-relaxed text-foreground/80">{work.description}</p>

            <div className="mt-14">
              <h2 className="eyebrow mb-6 text-foreground">The Gallery Presentation</h2>
              <ul className="space-y-4">
                {work.details.map((d) => (
                  <li key={d} className="flex gap-4 text-sm leading-relaxed text-foreground/65">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:pt-14">
            <div className="border border-line bg-surface p-7 sm:p-10 lg:sticky lg:top-32">
              <h2 className="eyebrow text-foreground">Select a Size</h2>
              <div className="mt-6 space-y-3" role="radiogroup" aria-label="Print size">
                {work.sizes.map((s, i) => (
                  <button
                    key={s.name}
                    type="button"
                    role="radio"
                    aria-checked={i === selected}
                    onClick={() => setSelected(i)}
                    className={`flex w-full items-center justify-between border px-5 py-4 text-left transition-colors ${
                      i === selected ? 'border-accent bg-accent/10' : 'border-line hover:border-foreground/40'
                    }`}
                  >
                    <span>
                      <span className="block font-display text-xl text-foreground">{s.name}</span>
                      <span className="text-xs tracking-wider text-muted">{s.dimensions}</span>
                    </span>
                    <span className="text-sm tracking-wider text-foreground/85">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex items-baseline justify-between border-t border-line pt-6">
                <span className="eyebrow text-muted">Price</span>
                <span className="font-display text-3xl text-foreground">{formatPrice(size.price)}</span>
              </div>

              <div className="mt-8 grid gap-3">
                <Link href={`/contact?work=${work.slug}&size=${encodeURIComponent(size.name)}`} className="btn btn-gold w-full">
                  Inquire About This Piece
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={handleAdd} className="btn btn-outline w-full px-3">
                    {added ? 'Added ✓' : 'Add to Cart'}
                  </button>
                  <button type="button" onClick={handleBuyNow} disabled={checkingOut} className="btn btn-light w-full px-3">
                    {checkingOut ? 'One Moment…' : 'Buy Now'}
                  </button>
                </div>
              </div>
              {added && (
                <p className="mt-4 text-center text-xs text-muted">
                  Added to your cart. <Link href="/cart" className="text-accent-light underline">View cart</Link>
                </p>
              )}
              <p className="mt-6 text-center text-xs leading-relaxed text-muted">
                Complimentary shipping. Each piece is made to order, signed and numbered by the artist.
              </p>
            </div>
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
            quality={85}
            className="h-auto max-h-[94vh] w-auto max-w-full object-contain"
          />
          <button
            type="button"
            className="eyebrow absolute right-5 top-5 px-3 py-2 text-white/80 hover:text-white"
            onClick={() => setLightbox(false)}
          >
            Close ✕
          </button>
        </div>
      )}
    </>
  );
}
