import Link from 'next/link';

export const metadata = {
  title: 'Shipping & Returns | Sheldon Roth Fine Art',
  description: 'Information about shipping, delivery, and return policies for fine art photography prints.',
};

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-[#88744a] mb-4">POLICIES</p>
          <h1 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
            Shipping &amp; Returns
          </h1>
          <p className="text-lg text-[#77776d] font-light max-w-2xl mx-auto">
            We take great care in packaging and delivering your artwork safely to your door.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Shipping */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-[#1a1a1a] mb-6">Shipping</h2>
            <div className="space-y-4 text-[#77776d] font-light leading-relaxed">
              <p>
                <strong className="text-[#1a1a1a]">Processing Time:</strong> Each print is
                produced to order using archival materials. Please allow 5-7 business days
                for production before shipping.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Domestic Shipping (US):</strong> We offer
                free standard shipping on all orders. Prints are carefully packaged in
                protective tubes or flat mailers depending on size, and shipped via insured
                carriers. Standard delivery takes 5-10 business days after production.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">International Shipping:</strong> We ship
                worldwide. International shipping rates are calculated at checkout based on
                destination and package size. Delivery times vary by location (typically
                10-21 business days). Please note that customs duties and taxes may apply.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Tracking:</strong> All orders include
                tracking information, which will be emailed to you once your order ships.
              </p>
            </div>
          </div>

          {/* Packaging */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-[#1a1a1a] mb-6">Packaging</h2>
            <div className="space-y-4 text-[#77776d] font-light leading-relaxed">
              <p>
                Your artwork is our top priority. Each print is carefully inspected before
                packaging and protected with acid-free tissue paper. Depending on size,
                prints are shipped in:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Heavy-duty cardboard tubes with protective end caps (rolled prints)</li>
                <li>Rigid flat mailers with corner protection (smaller prints)</li>
                <li>Custom wooden crates for oversized or framed pieces</li>
              </ul>
            </div>
          </div>

          {/* Returns */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-[#1a1a1a] mb-6">Returns &amp; Exchanges</h2>
            <div className="space-y-4 text-[#77776d] font-light leading-relaxed">
              <p>
                <strong className="text-[#1a1a1a]">Satisfaction Guarantee:</strong> We want
                you to love your artwork. If you&apos;re not completely satisfied with your
                purchase, you may return it within 30 days of delivery for a full refund or
                exchange.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Return Conditions:</strong> Items must be
                returned in their original packaging and in the same condition as received.
                Custom or commissioned pieces are final sale.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Damaged Items:</strong> If your artwork
                arrives damaged, please contact us within 48 hours with photos of the damage.
                We will arrange a replacement or full refund at no additional cost.
              </p>
              <p>
                <strong className="text-[#1a1a1a]">Return Process:</strong> To initiate a
                return, please contact us at{' '}
                <a href="mailto:hello@sheldonroth.com" className="text-[#88744a] hover:underline">
                  hello@sheldonroth.com
                </a>{' '}
                with your order number and reason for return.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-[#e5e5e5]">
            <p className="text-[#77776d] font-light mb-6">
              Have questions about your order?
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
