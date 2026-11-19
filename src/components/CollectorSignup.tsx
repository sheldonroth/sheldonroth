'use client';

import { useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'sending' | 'done' | 'error';

/** Quiet collector-list signup for the footer: email only, posts to /api/collector-list. */
export default function CollectorSignup() {
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/collector-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, company_website: trap, elapsed: Date.now() - startedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus('done');
        return;
      }
      setError(data.error || 'Something went wrong. Please try again.');
      setStatus('error');
    } catch {
      setError('Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    return <p className="text-[14px] leading-[21px] text-white/85">Thank you. You&apos;ll hear about new releases before anyone else.</p>;
  }

  return (
    <form onSubmit={submit} className="w-full max-w-[420px] md:w-[380px]" noValidate>
      <div className="flex border-b border-white/40 focus-within:border-white">
        <label htmlFor="collector-email" className="sr-only">Email address</label>
        <input
          id="collector-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          className="min-w-0 flex-1 border-0 bg-transparent px-0 py-3 text-[15px] text-white placeholder:text-white/50 focus:outline-none focus:ring-0"
        />
        <button type="submit" disabled={status === 'sending'} className="lk-footer-h shrink-0 py-3 pl-4 !mb-0 hover:opacity-75 disabled:opacity-50">
          {status === 'sending' ? 'Joining…' : 'Join'}
        </button>
      </div>
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="absolute left-[-9999px] h-px w-px opacity-0"
        aria-hidden="true"
      />
      {error && <p role="alert" className="mt-2 text-[13px] text-[#f0b4b4]">{error}</p>}
    </form>
  );
}
