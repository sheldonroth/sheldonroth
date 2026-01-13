export const metadata = {
  title: 'Privacy Policy | Sheldon Roth Fine Art',
  description: 'Privacy policy for Sheldon Roth Fine Art website.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
            Privacy Policy
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
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Information We Collect</h2>
              <p>
                When you visit our website or make a purchase, we collect certain information
                about you, including your name, email address, shipping address, and payment
                information. We also collect information about your browsing behavior through
                cookies and similar technologies.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your orders and account</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with
                third-party service providers who help us operate our business, such as payment
                processors and shipping carriers. These providers are contractually obligated
                to protect your information.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing
                experience, analyze website traffic, and understand where our visitors come
                from. You can control cookie settings through your browser preferences.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal information.
                You may also opt out of marketing communications at any time. To exercise
                these rights, please contact us at{' '}
                <a href="mailto:hello@sheldonroth.com" className="text-[#88744a] hover:underline">
                  hello@sheldonroth.com
                </a>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect
                your personal information against unauthorized access, alteration, disclosure,
                or destruction.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of
                any material changes by posting the new policy on this page and updating
                the &quot;last updated&quot; date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-light text-[#1a1a1a] mb-4">Contact Us</h2>
              <p>
                If you have questions about this privacy policy, please contact us at{' '}
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
