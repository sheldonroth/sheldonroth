'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const field =
  'w-full border-0 border-b border-[#999] bg-transparent px-0 py-3 text-[16px] text-[#222] placeholder:text-[#767676] focus:border-accent focus:outline-none focus:ring-0 transition-colors';

export default function InquiryForm({ works, email }: { works: { slug: string; title: string }[]; email: string }) {
  const params = useSearchParams();
  const initialWork = params.get('work') ?? '';
  const initialSize = params.get('size') ?? '';
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const workSlug = String(data.get('work') || '');
    const workTitle = works.find((w) => w.slug === workSlug)?.title;
    const subject = workTitle ? `Inquiry: ${workTitle}` : `Inquiry: ${data.get('topic') || 'General'}`;
    const body = [
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      data.get('phone') ? `Phone: ${data.get('phone')}` : '',
      workTitle ? `Artwork: ${workTitle}${initialSize && workSlug === initialWork ? ` (${initialSize})` : ''}` : '',
      `Topic: ${data.get('topic')}`,
      '',
      String(data.get('message') || ''),
    ]
      .filter(Boolean)
      .join('\n');
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="font-display text-3xl text-foreground">Send an Inquiry</h2>
        <p className="mt-3 text-sm text-muted">Your email app will open with the message ready to send.</p>
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="block">
          <span className="eyebrow text-muted">Name *</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="eyebrow text-muted">Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
        <label className="block">
          <span className="eyebrow text-muted">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className="eyebrow text-muted">Topic</span>
          <select name="topic" defaultValue={initialWork ? 'Purchasing an artwork' : 'General inquiry'} className={`${field}`}>
            <option>Purchasing an artwork</option>
            <option>Custom size or framing</option>
            <option>Commission</option>
            <option>Licensing</option>
            <option>General inquiry</option>
          </select>
        </label>
      </div>
      <label className="block">
        <span className="eyebrow text-muted">Artwork</span>
        <select name="work" defaultValue={initialWork} className={`${field}`}>
          <option value="">— Not a specific piece —</option>
          {works.map((w) => (
            <option key={w.slug} value={w.slug}>
              {w.title}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="eyebrow text-muted">Message *</span>
        <textarea name="message" required rows={5} className={`${field} resize-none`} placeholder="Tell us about your space, the size you have in mind, or any questions." />
      </label>
      <button type="submit" className="lk-btn lk-btn-solid w-full sm:w-auto">
        Send Inquiry
      </button>
      {sent && (
        <p className="text-sm text-muted">
          If your email app didn’t open, write to{' '}
          <a href={`mailto:${email}`} className="text-accent-dark underline">
            {email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
