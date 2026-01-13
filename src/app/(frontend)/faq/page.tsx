'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Prints & Quality',
    questions: [
      {
        q: 'What type of paper do you use for prints?',
        a: 'All prints are produced on museum-quality archival paper using giclée printing technology. We use Hahnemühle Photo Rag or similar premium papers that are acid-free and designed to last for generations without fading or yellowing.',
      },
      {
        q: 'What sizes are available?',
        a: 'We offer prints in various sizes depending on the artwork. Standard sizes range from 16x20" to 40x60". Limited edition prints are available in specific sizes noted on each product page. Custom sizes may be available upon request.',
      },
      {
        q: 'Are the prints signed?',
        a: 'Yes, all limited edition prints are hand-signed by Sheldon Roth and include a certificate of authenticity with the edition number. Open edition prints include a printed signature.',
      },
      {
        q: 'What is a limited edition print?',
        a: 'Limited edition prints are produced in a specific quantity (e.g., 25 or 50 prints total) and are numbered accordingly. Once the edition sells out, no more prints of that image will be made at that size, increasing their collectible value.',
      },
    ],
  },
  {
    category: 'Ordering & Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover) through our secure payment processor. We also accept PayPal and Apple Pay.',
      },
      {
        q: 'Can I request a custom size or framing?',
        a: 'Yes, we offer custom sizing and professional framing services. Please contact us with your requirements for a personalized quote. Custom orders typically require 2-3 weeks additional production time.',
      },
      {
        q: 'Do you offer gift certificates?',
        a: 'Yes, we offer digital gift certificates in various denominations. They make perfect gifts for art lovers and can be used toward any purchase on our site.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Each print is made to order, requiring 5-7 business days for production. After that, domestic (US) shipping takes 5-10 business days. International shipping varies by destination, typically 10-21 business days.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship worldwide. International shipping rates are calculated at checkout. Please note that customers are responsible for any customs duties or taxes that may apply in their country.',
      },
      {
        q: 'How are prints packaged?',
        a: 'Prints are carefully protected with acid-free tissue paper and shipped in heavy-duty tubes (for rolled prints) or rigid flat mailers (for smaller prints). Framed works are shipped in custom protective crates.',
      },
    ],
  },
  {
    category: 'Care & Display',
    questions: [
      {
        q: 'How should I frame my print?',
        a: 'We recommend professional framing with archival materials. Use acid-free matting and backing, and consider UV-protective glass to prevent fading. A simple frame in black, white, or natural wood complements most artwork.',
      },
      {
        q: 'How do I care for my print?',
        a: 'Display your print away from direct sunlight and maintain consistent temperature and humidity. Avoid touching the print surface. For detailed care guidelines, please visit our Care Instructions page.',
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
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-[#88744a] mb-4">SUPPORT</p>
          <h1 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[#77776d] font-light max-w-2xl mx-auto">
            Find answers to common questions about our prints, ordering, and more.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-12">
              <h2 className="text-xl font-light text-[#1a1a1a] mb-6 pb-2 border-b border-[#e5e5e5]">
                {category.category}
              </h2>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const itemId = `${catIndex}-${qIndex}`;
                  const isOpen = openItems.includes(itemId);
                  return (
                    <div key={qIndex} className="border-b border-[#e5e5e5] last:border-0">
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full py-4 flex justify-between items-start text-left"
                      >
                        <span className="text-[#1a1a1a] font-light pr-8">{faq.q}</span>
                        <span className="text-[#88744a] text-xl flex-shrink-0">
                          {isOpen ? '−' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="pb-4 text-[#77776d] font-light leading-relaxed">
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
          <div className="text-center pt-8 border-t border-[#e5e5e5]">
            <p className="text-[#77776d] font-light mb-6">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
