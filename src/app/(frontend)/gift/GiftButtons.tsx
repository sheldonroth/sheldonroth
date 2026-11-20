'use client';

import { useState } from 'react';

/** One button per amount; each starts its own Stripe Checkout through /api/gift. */
export default function GiftButtons({ amounts }: { amounts: readonly number[] }) {
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const buy = async (amount: number) => {
    setBusy(amount);
    setError(null);
    try {
      const res = await fetch('/api/gift', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ amount }) });
      const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.ok && data.url) {
        window.location.assign(data.url);
        return;
      }
      setError(data.error || 'Checkout could not start. Please try again.');
    } catch {
      setError('Please check your connection and try again.');
    }
    setBusy(null);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {amounts.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => buy(a)}
            disabled={busy !== null}
            className="border border-line bg-white px-4 py-8 text-center transition-colors hover:border-accent-dark disabled:opacity-60"
          >
            <span className="block text-[28px] font-light tracking-[0.02em] text-ink">${a.toLocaleString('en-US')}</span>
            <span className="lk-small mt-2 block">{busy === a ? 'Opening checkout…' : 'Give this amount'}</span>
          </button>
        ))}
      </div>
      {error && <p role="alert" className="mt-4 text-center text-[14px] text-[#a33]">{error}</p>}
    </div>
  );
}
