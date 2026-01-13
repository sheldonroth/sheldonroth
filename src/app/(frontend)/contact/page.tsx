'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Contact</h1>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-6" />
          <p className="text-[#77776d] max-w-2xl mx-auto">
            Have a question about a piece, interested in commissioning work, or want to discuss a collaboration? I&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-6">Get In Touch</h2>
              <div className="w-12 h-px bg-[#88744a] mb-8" />

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs tracking-[0.2em] text-[#88744a] mb-2">EMAIL</h3>
                  <a href="mailto:hello@sheldonroth.com" className="text-[#77776d] hover:text-[#1a1a1a] transition-colors">
                    hello@sheldonroth.com
                  </a>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.2em] text-[#88744a] mb-2">LOCATION</h3>
                  <p className="text-[#77776d]">
                    Available for projects worldwide<br />
                    Based in Los Angeles, CA
                  </p>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.2em] text-[#88744a] mb-2">STUDIO VISITS</h3>
                  <p className="text-[#77776d]">
                    By appointment only.<br />
                    Please reach out to schedule a viewing.
                  </p>
                </div>

                <div>
                  <h3 className="text-xs tracking-[0.2em] text-[#88744a] mb-2">FOLLOW</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#77776d] hover:text-[#88744a] transition-colors"
                    >
                      Instagram
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#77776d] hover:text-[#88744a] transition-colors"
                    >
                      YouTube
                    </a>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-12 p-6 bg-[#f8f8f6]">
                <h3 className="text-xs tracking-[0.2em] mb-2">RESPONSE TIME</h3>
                <p className="text-sm text-[#77776d]">
                  I personally respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {isSubmitted ? (
                <div className="bg-[#f8f8f6] p-12 text-center">
                  <svg className="w-12 h-12 text-[#88744a] mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                  </svg>
                  <h3 className="text-xl font-light tracking-wide mb-4">Message Sent</h3>
                  <p className="text-[#77776d] mb-6">
                    Thank you for reaching out. I&apos;ll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs tracking-[0.2em] text-[#88744a] hover:text-[#1a1a1a] transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-xs tracking-[0.2em] mb-2">
                      NAME *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#88744a] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs tracking-[0.2em] mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#88744a] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-xs tracking-[0.2em] mb-2">
                      SUBJECT
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#88744a] transition-colors bg-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="purchase">Purchase Inquiry</option>
                      <option value="commission">Commission Request</option>
                      <option value="licensing">Licensing</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="press">Press / Media</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs tracking-[0.2em] mb-2">
                      MESSAGE *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-[#e5e5e5] text-sm focus:outline-none focus:border-[#88744a] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Frequently Asked Questions</h2>
            <div className="w-12 h-px bg-[#88744a] mx-auto" />
          </div>

          <div className="space-y-8">
            <div className="border-b border-[#e5e5e5] pb-8">
              <h3 className="text-sm tracking-wide font-medium mb-3">What printing methods do you use?</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                All limited edition prints are produced using museum-quality acrylic face mounting or archival pigment printing on fine art paper, depending on the piece. Each method is chosen to best complement the artwork.
              </p>
            </div>

            <div className="border-b border-[#e5e5e5] pb-8">
              <h3 className="text-sm tracking-wide font-medium mb-3">Do you offer custom sizes?</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                Yes, many pieces can be produced in custom sizes. Please contact me directly to discuss options and pricing for your specific requirements.
              </p>
            </div>

            <div className="border-b border-[#e5e5e5] pb-8">
              <h3 className="text-sm tracking-wide font-medium mb-3">What is included with each purchase?</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                Each limited edition print includes a hand-signed certificate of authenticity, detailed care instructions, and is professionally packaged for safe delivery.
              </p>
            </div>

            <div className="border-b border-[#e5e5e5] pb-8">
              <h3 className="text-sm tracking-wide font-medium mb-3">Do you ship internationally?</h3>
              <p className="text-sm text-[#77776d] leading-relaxed">
                Yes, I ship worldwide. All international shipments are fully insured and include tracking. Shipping costs and delivery times vary by destination.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
