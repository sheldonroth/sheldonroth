'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const field =
  'w-full border-0 border-b border-[#999] bg-transparent px-0 py-3 text-[16px] leading-6 text-[#222] placeholder:text-[#9a9a9a] transition-colors focus:border-accent-dark focus:outline-none focus:ring-0';
const label = 'block text-[11px] font-bold uppercase leading-[11px] tracking-[0.05em] text-[#6c6a6a]';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Lik-style inquiry form: underlined fields, small caps labels. Posts to /api/inquiry; no address in the client. */
type SizeOption = { value: string; label: string };

export default function InquiryForm({ works, sizes }: { works: { slug: string; title: string; sizes: SizeOption[] }[]; sizes: SizeOption[] }) {
  const params = useSearchParams();
  const initialWork = works.some((w) => w.slug === params.get('work')) ? (params.get('work') as string) : '';
  const sizesForWork = (slug: string) => works.find((w) => w.slug === slug)?.sizes ?? sizes;
  const initialSize = sizesForWork(initialWork).some((o) => o.value === params.get('size')) ? (params.get('size') as string) : '';
  const [work, setWork] = useState(initialWork);
  const [size, setSize] = useState(initialSize);
  const sizeOptions = work ? sizesForWork(work) : sizes;
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [firstName, setFirstName] = useState('');
  const startedAt = useRef<number>(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus('sending');
    setError(null);
    setErrors({});
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setFirstName(String(data.name || '').trim().split(/\s+/)[0] ?? '');
        setStatus('sent');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      if (json.errors) setErrors(json.errors);
      setError(json.error ?? (json.errors ? 'Please check the highlighted fields.' : 'Something went wrong. Please try again.'));
      setStatus('error');
    } catch {
      setError('We could not reach the studio just now. Please try again in a moment.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="py-6 text-center" role="status" aria-live="polite">
        <p className="lk-eyebrow">Inquiry Received</p>
        <h2 className="lk-h2 mt-6">Thank you{firstName ? `, ${firstName}` : ''}</h2>
        <p className="lk-body mx-auto mt-6 max-w-md">
          Your message has reached the studio. Sheldon reviews every inquiry personally and will be in touch shortly.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/collections" className="lk-btn lk-btn-gold">View the Galleries</Link>
          <Link href="/shop" className="lk-btn lk-btn-gold">Explore the Work</Link>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="mt-2 block text-[13px] text-[#a33]">{errors[k]}</span>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9" aria-describedby={error ? 'inquiry-error' : undefined}>
      <div>
        <h2 className="lk-h2">Send an Inquiry</h2>
        <p className="lk-body mt-4">Ask about an edition, sizing and framing, a commission or licensing. Sheldon replies personally.</p>
      </div>

      {/* Honeypot: hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>Company website<input name="company_website" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="grid gap-9 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name *</span>
          <input name="name" required maxLength={120} autoComplete="name" className={field} aria-invalid={!!errors.name} />
          {err('name')}
        </label>
        <label className="block">
          <span className={label}>Email *</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} aria-invalid={!!errors.email} />
          {err('email')}
        </label>
        <label className="block">
          <span className={label}>Phone (optional)</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={field} aria-invalid={!!errors.phone} />
          {err('phone')}
        </label>
        <label className="block">
          <span className={label}>Print size</span>
          <select name="size" value={sizeOptions.some((o) => o.value === size) ? size : ''} onChange={(e) => setSize(e.target.value)} className={field}>
            <option value="">{work && sizeOptions.length === 0 ? 'By inquiry' : 'Not sure yet'}</option>
            {sizeOptions.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block">
        <span className={label}>Artwork of interest</span>
        <select name="artwork" value={work} onChange={(e) => setWork(e.target.value)} className={field}>
          <option value="">— Not a specific piece —</option>
          {works.map((w) => (
            <option key={w.slug} value={w.slug}>{w.title}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={label}>Message *</span>
        <textarea name="message" required rows={5} maxLength={5000} className={`${field} resize-none`} aria-invalid={!!errors.message}
          placeholder="Tell Sheldon about your space, the size you have in mind, or any questions." />
        {err('message')}
      </label>

      {error && <p id="inquiry-error" role="alert" className="text-[14px] text-[#a33]">{error}</p>}

      <div>
        <button type="submit" disabled={status === 'sending'} className="lk-btn lk-btn-solid w-full sm:w-auto sm:min-w-[220px]">
          {status === 'sending' ? 'Sending…' : 'Send Inquiry'}
        </button>
        <p className="lk-small mt-4">Your details are used only to reply to this inquiry.</p>
      </div>
    </form>
  );
}
