import type { Metadata } from 'next';
import PolicyPage, { PolicySection } from '@/components/PolicyPage';
import { EDITION_PER_SIZE } from '@/content/commerce';

export const metadata: Metadata = {
  title: 'Certificate of Authenticity',
  description: 'Every limited edition by Sheldon Roth is numbered and accompanied by a certificate of authenticity.',
};

export default function CertificatePage() {
  return (
    <PolicyPage eyebrow="Collector Services" title="Certificate of Authenticity" intro="Every limited edition is documented, so its provenance stays with the work.">
      <PolicySection title="What You Receive">
        <p>Each print is accompanied by a certificate of authenticity recording:</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>The title of the work and the artist, Sheldon Roth</li>
          <li>The print size and its edition number (for example, 7 / {EDITION_PER_SIZE})</li>
          <li>The materials: archival print face-mounted to acrylic</li>
          <li>The date of production and the artist&apos;s signature</li>
        </ul>
      </PolicySection>
      <PolicySection title="Limited Means Limited">
        <p>
          Each size of each work is a separate edition of {EDITION_PER_SIZE}. Numbers are issued in order as prints are sold and are never
          reused. When an edition is complete it is closed permanently.
        </p>
      </PolicySection>
      <PolicySection title="Keep It With the Work">
        <p>
          Store the certificate safely and pass it on with the artwork if it is ever sold or gifted. If a certificate is lost, the studio
          can confirm a print&apos;s edition number from its records.
        </p>
      </PolicySection>
    </PolicyPage>
  );
}
