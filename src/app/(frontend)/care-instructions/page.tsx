import type { Metadata } from 'next';
import PolicyPage, { PolicySection, Term } from '@/components/PolicyPage';

export const metadata: Metadata = {
  title: 'Caring for Your Art',
  description: 'How to unpack, hang, display and clean a face-mounted acrylic print by Sheldon Roth.',
};

export default function CareInstructionsPage() {
  return (
    <PolicyPage eyebrow="Collector Services" title="Caring for Your Art" intro="A face-mounted acrylic print needs very little care to look its best for decades.">
      <PolicySection title="Unpacking">
        <Term label="Take your time">
          Open the crate on a clean, soft surface with two people for larger works. Lift the piece by its edges, never by pressing on the
          acrylic face. Keep the crate and packing until you are sure the work arrived undamaged.
        </Term>
        <Term label="Check on arrival">If you see any damage, photograph it and contact the studio within 48 hours.</Term>
      </PolicySection>
      <PolicySection title="Hanging">
        <Term label="French cleat">
          The work arrives ready to hang on its French cleat. Fix the wall cleat level and into studs or rated anchors suitable for the
          weight, then lower the piece onto it. Larger sizes are heavy; use two people.
        </Term>
      </PolicySection>
      <PolicySection title="Display">
        <Term label="Light">Avoid direct sunlight and strong UV light, which can fade any photograph over time.</Term>
        <Term label="Environment">
          Keep away from heat sources such as radiators, fireplaces and vents, and from very humid rooms. A stable room temperature is
          ideal.
        </Term>
      </PolicySection>
      <PolicySection title="Cleaning the Acrylic">
        <Term label="Dusting">Dust gently with a clean, soft microfibre cloth, without pressure.</Term>
        <Term label="Marks">
          Use a cleaner made for acrylic, sprayed onto the cloth, never directly onto the work. Never use glass cleaner, ammonia, alcohol,
          paper towels or abrasive pads, which can cloud or scratch the surface.
        </Term>
      </PolicySection>
      <PolicySection title="Moving or Storing">
        <Term label="Protect the face">
          Wrap the acrylic face in soft, lint-free material and store the work upright, never flat with weight on it. The original crate is
          ideal.
        </Term>
      </PolicySection>
    </PolicyPage>
  );
}
