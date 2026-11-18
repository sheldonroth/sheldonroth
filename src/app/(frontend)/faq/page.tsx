'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Prints & Quality',
    questions: [
      {
        q: 'How are the prints made?',
        a: 'Each limited edition is an archival Lumachrome HD print face-mounted to anti-glare museum acrylic, with an acrylic backing, a floating mount and a French-cleat hanger. The result has remarkable depth, clarity and longevity.',
      },
      {
        q: 'What sizes are available?',
        a: 'Most works are offered in three sizes: Gallery (30 × 20 in), Signature (45 × 30 in) and Masterwork (60 × 40 in), turned for portrait images. A size is only offered when the original file holds enough detail for it, so some works come in fewer sizes. Each product page lists what is available.',
      },
      {
        q: 'Are the prints signed?',
        a: 'Yes. Every limited edition is signed and numbered and comes with a certificate of authenticity recording its edition number.',
      },
      {
        q: 'What is a limited edition?',
        a: 'Each size of each work is a separate edition of 50 prints, numbered in order as they are sold. Once a size sells out it is closed permanently and no further prints are made at that size.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    questions: [
      {
        q: 'How do I pay?',
        a: 'Checkout is handled securely by Stripe. Major credit and debit cards are accepted, and Apple Pay or Google Pay where your device supports them. We never see or store your card details.',
      },
      {
        q: 'Can I request a custom size or a work that is not listed in a size I want?',
        a: 'Please contact the studio with your space and the size you have in mind. Custom pieces are quoted individually.',
      },
      {
        q: 'Can I return a print?',
        a: 'Because each print is made to order and numbered, sales are final. If your artwork arrives damaged, contact the studio within 48 hours with photos and we will replace it. See Shipping & Returns for details.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Each piece is made to order. Please allow 2–4 weeks from your order to delivery. You will receive tracking details by email when it ships.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Online checkout ships to US addresses. For delivery elsewhere, contact the studio for a crate and freight quote; import duties and taxes are the buyer\'s responsibility.',
      },
      {
        q: 'How are works packaged?',
        a: 'Acrylic works are wrapped, corner-protected and shipped in a rigid crate, fully insured and with a signature required on delivery.',
      },
    ],
  },
  {
    category: 'Care & Display',
    questions: [
      {
        q: 'Does the print need framing?',
        a: 'No. Each work arrives face-mounted and ready to hang on its French cleat. Hang it away from direct sunlight and heat sources.',
      },
      {
        q: 'How do I clean the acrylic?',
        a: 'Dust gently with a soft microfibre cloth. If needed, use a cleaner made for acrylic; never use glass cleaner, ammonia or paper towels. See the Care Instructions page for more.',
      },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-accent mb-4">SUPPORT</p>
          <h1 className="font-display text-4xl md:text-5xl  text-foreground mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted font-light max-w-2xl mx-auto">
            Find answers to common questions about our prints, ordering, and more.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-xl font-light text-foreground mb-6 pb-2 border-b border-line">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.includes(itemId);
                  return (
                    <div key={qIndex} className="border-b border-line last:border-0">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full py-4 flex justify-between items-start text-left"
                      >
                        <span className="text-foreground font-light pr-8">{faq.q}</span>
                        <span className="text-accent text-xl flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pb-4 text-muted font-light leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="text-center pt-8 border-t border-line">
            <p className="text-muted font-light mb-6">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact" className="lk-btn lk-btn-solid">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
