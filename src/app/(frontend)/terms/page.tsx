export const metadata = {
  title: 'Terms of Service | Sheldon Roth Fine Art',
  description: 'Terms of service for Sheldon Roth Fine Art website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
            Terms of Service
          </h1>
          <p className="text-sm text-[#77776d] font-light">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <div className="space-y-8 text-[#77776d] font-light leading-relaxed">
            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using the Sheldon Roth Fine Art website, you agree to be
                bound by these Terms of Service. If you do not agree to these terms, please
                do not use our website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Intellectual Property</h2>
              <p>
                All content on this website, including photographs, text, graphics, and logos,
                is the property of Sheldon Roth Fine Art and is protected by copyright and
                other intellectual property laws. You may not reproduce, distribute, or create
                derivative works from any content without express written permission.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Purchase Terms</h2>
              <p>
                When you purchase a print from our website, you are purchasing a physical
                reproduction of the artwork. You do not acquire any copyright or other
                intellectual property rights to the underlying image. Prints are for personal
                use only and may not be reproduced or used for commercial purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Limited Editions</h2>
              <p>
                Limited edition prints are produced in specific quantities as indicated on
                the product page. Each print is individually numbered and signed. Once an
                edition sells out, no additional prints will be made at that size. We reserve
                the right to produce the same image at different sizes as separate editions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Pricing and Availability</h2>
              <p>
                All prices are listed in US dollars and are subject to change without notice.
                We reserve the right to modify or discontinue any product at any time. In the
                event of a pricing error, we reserve the right to cancel any orders placed
                at the incorrect price.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Limitation of Liability</h2>
              <p>
                Sheldon Roth Fine Art shall not be liable for any indirect, incidental,
                special, or consequential damages arising from your use of our website or
                purchase of our products. Our total liability shall not exceed the amount
                paid for the product in question.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Governing Law</h2>
              <p>
                These Terms of Service shall be governed by and construed in accordance with
                the laws of the State of California, without regard to its conflict of law
                provisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be
                effective immediately upon posting to the website. Your continued use of
                the website after any changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Contact</h2>
              <p>
                For questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:hello@sheldonroth.com" className="text-[#88744a] hover:underline">
                  hello@sheldonroth.com
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
