import Link from 'next/link';
import type { ReactNode } from 'react';

/** Shared layout for the policy pages (shipping, terms, privacy, certificate). */
export default function PolicyPage({ eyebrow, title, intro, updated, children }: { eyebrow: string; title: string; intro?: string; updated?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <section className="px-6 pb-16 pt-32 lg:px-12 lg:pt-[200px]">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-4 text-xs tracking-[0.3em] text-accent">{eyebrow.toUpperCase()}</p>
          <h1 className="font-display mb-6 text-4xl text-foreground md:text-5xl">{title}</h1>
          {intro && <p className="mx-auto max-w-2xl text-lg font-light text-muted">{intro}</p>}
          {updated && <p className="mt-4 text-sm text-muted">Last updated: {updated}</p>}
        </div>
      </section>
      <section className="px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-3xl">
          {children}
          <div className="border-t border-line pt-8 text-center">
            <p className="mb-6 font-light text-muted">Questions? The studio replies personally.</p>
            <Link href="/contact" className="lk-btn lk-btn-solid">Contact the Studio</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-14">
      <h2 className="mb-6 text-2xl font-light text-foreground">{title}</h2>
      <div className="space-y-4 font-light leading-relaxed text-muted">{children}</div>
    </div>
  );
}

export function Term({ label, children }: { label: string; children: ReactNode }) {
  return (
    <p>
      <strong className="text-foreground">{label}:</strong> {children}
    </p>
  );
}
