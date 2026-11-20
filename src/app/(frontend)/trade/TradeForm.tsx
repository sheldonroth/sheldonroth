'use client';

import { useEffect, useRef, useState } from 'react';

const field =
  'w-full border-0 border-b border-[#999] bg-transparent px-0 py-3 text-[16px] leading-6 text-[#222] placeholder:text-[#9a9a9a] transition-colors focus:border-accent-dark focus:outline-none focus:ring-0';
const label = 'block text-[11px] font-bold uppercase leading-[11px] tracking-[0.05em] text-[#6c6a6a]';

const ROLES = ['Interior designer', 'Art consultant', 'Architect', 'Hospitality / corporate buyer', 'Other trade'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

/** Trade program application. Posts to /api/trade; the studio's address never reaches the browser. */
export default function TradeForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const startedAt = useRef(0);
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
      const res = await fetch('/api/trade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, elapsed: Date.now() - startedAt.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus('sent');
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
        <p className="lk-eyebrow">Application Received</p>
        <h2 className="lk-h2 mt-6">Thank you</h2>
        <p className="lk-body mx-auto mt-6 max-w-md">
          Sheldon reviews every trade application personally. Once approved, you&apos;ll receive your personal trade code by email,
          usually within two business days.
        </p>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <span className="mt-2 block text-[13px] text-[#a33]">{errors[k]}</span>;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-9">
      <div>
        <h2 className="lk-h2">Apply for Trade</h2>
        <p className="lk-body mt-4">A few details about your practice. There is no fee and no minimum order.</p>
      </div>
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
          <span className={label}>Firm *</span>
          <input name="firm" required maxLength={160} autoComplete="organization" className={field} aria-invalid={!!errors.firm} />
          {err('firm')}
        </label>
        <label className="block">
          <span className={label}>You are</span>
          <select name="role" defaultValue={ROLES[0]} className={field}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Website or portfolio</span>
          <input name="website" type="url" maxLength={300} placeholder="https://" className={field} />
        </label>
        <label className="block">
          <span className={label}>City, state</span>
          <input name="location" maxLength={120} autoComplete="address-level2" className={field} />
        </label>
      </div>
      <label className="block">
        <span className={label}>Current project (optional)</span>
        <textarea name="project" rows={4} maxLength={4000} className={`${field} resize-none`}
          placeholder="The space, the wall sizes, the timeline, or the works you have in mind." />
      </label>
      {error && <p role="alert" className="text-[14px] text-[#a33]">{error}</p>}
      <div>
        <button type="submit" disabled={status === 'sending'} className="lk-btn lk-btn-solid w-full sm:w-auto sm:min-w-[220px]">
          {status === 'sending' ? 'Sending…' : 'Apply'}
        </button>
        <p className="lk-small mt-4">Your details are used only to review your application.</p>
      </div>
    </form>
  );
}
