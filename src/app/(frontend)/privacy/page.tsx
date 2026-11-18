import type { Metadata } from 'next';
import PolicyPage, { PolicySection } from '@/components/PolicyPage';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'How Sheldon Roth Fine Art collects and uses personal information.' };

export default function PrivacyPage() {
  return (
    <PolicyPage eyebrow="Policies" title="Privacy Policy" updated="November 2026">
      <PolicySection title="What We Collect">
        <p>
          When you send an inquiry we keep your name, email address, optional phone number and message. When you buy a print we receive
          your name, email, phone number, billing and shipping addresses and the details of your order. Card details are entered directly
          with our payment processor, Stripe, and never reach our servers.
        </p>
        <p>
          To limit spam, the inquiry form stores a one-way hash of your IP address rather than the address itself. Your cart is kept in your
          own browser. The site does not use advertising or third-party tracking cookies.
        </p>
      </PolicySection>
      <PolicySection title="How We Use It">
        <p>
          Only to reply to you, to make, ship and support your order, to keep records required by law, and to prevent fraud. We do not send
          marketing email unless you ask us to, and we never sell your information.
        </p>
      </PolicySection>
      <PolicySection title="Who We Share It With">
        <p>
          Only the services needed to run the studio: Stripe (payments), our fine art lab and its carriers (to produce and deliver your
          print, which requires your name, shipping address and phone number), our email provider (to send messages), and our hosting and
          database providers. Each processes your data only to provide that service.
        </p>
      </PolicySection>
      <PolicySection title="Retention and Your Rights">
        <p>
          Order records are kept for as long as tax and accounting rules require; inquiries are deleted on request. You may ask to see,
          correct or delete your information at any time by contacting the studio.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
