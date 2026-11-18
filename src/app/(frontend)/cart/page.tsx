'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/checkout')
      .then((r) => r.json())
      .then((d: { enabled?: boolean }) => setEnabled(!!d.enabled))
      .catch(() => setEnabled(false));
  }, []);

  const inquiryHref = () => {
    const first = items[0];
    return first ? `/contact?work=${first.productSlug}&size=${encodeURIComponent(first.size)}` : '/contact';
  };

  // Straight to Stripe Checkout when it's configured; the inquiry form only while online checkout is switched off.
  const handleCheckout = async () => {
    if (items.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((item) => ({ slug: item.productSlug, size: item.size, quantity: item.quantity })) }),
      });
      const data = await response.json().catch(() => ({}));
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      if (data.code === 'checkout_disabled') {
        window.location.href = inquiryHref();
        return;
      }
      setError(data.error || 'Could not start checkout. Please try again.');
    } catch {
      setError('Could not start checkout. Please check your connection and try again.');
    }
    setBusy(false);
  };

  if (items.length === 0) {
    return (
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="font-display text-3xl lg:text-4xl  tracking-wide mb-6">Your Cart</h1>
          <div className="w-12 h-px bg-accent mx-auto mb-8" />
          <p className="text-muted mb-8">Your cart is empty</p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3 lk-btn lk-btn-gold"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 bg-background min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h1 className="font-display text-3xl lg:text-4xl  tracking-wide mb-6 text-center">Your Cart</h1>
        <div className="w-12 h-px bg-accent mx-auto mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 pb-6 border-b border-line">
                {/* Image */}
                <div className="relative w-32 h-40 flex-shrink-0 bg-surface">
                  {item.image && (
                    <Image quality={75}
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-light mb-1">{item.title}</h3>
                  <p className="text-sm text-muted mb-1">{item.size} - {item.dimensions}</p>
                  <p className="text-xs text-muted mb-3">{item.edition}</p>
                  <p className="text-lg font-light">${item.price.toLocaleString()}</p>

                  {/* Quantity & Remove */}
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border border-line">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-sm hover:bg-white/5 transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm border-x border-line">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-sm hover:bg-white/5 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-muted hover:text-foreground transition-colors underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-xs text-muted hover:text-foreground transition-colors underline"
            >
              Clear Cart
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface p-8">
              <h2 className="text-sm tracking-[0.2em] mb-6">ORDER SUMMARY</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Shipping (US)</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Tax</span>
                  <span className="text-muted">Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-line pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-light">Total before tax</span>
                  <span className="text-xl font-light">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={busy}
                className="w-full py-4 lk-btn lk-btn-gold disabled:opacity-60"
              >
                {busy ? 'ONE MOMENT…' : enabled === false ? 'INQUIRE TO PURCHASE' : 'PROCEED TO CHECKOUT'}
              </button>
              {enabled === false && (
                <p className="mt-3 text-center text-xs text-muted">Online checkout opens soon. Send an inquiry and the studio will reply personally.</p>
              )}
              {error && (
                <p role="alert" className="mt-3 text-center text-xs text-[#a12a2a]">{error}</p>
              )}

              <Link
                href="/shop"
                className="block text-center text-xs text-muted hover:text-foreground transition-colors mt-4"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 space-y-3 text-xs text-muted">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Secure checkout powered by Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Made to order · free insured US shipping · 2–4 weeks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
