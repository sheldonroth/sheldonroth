import Link from 'next/link';

export const metadata = {
  title: 'Care Instructions | Sheldon Roth Fine Art',
  description: 'Learn how to properly care for and preserve your fine art photography prints.',
};

export default function CareInstructionsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-accent mb-4">PRESERVATION</p>
          <h1 className="font-display text-4xl md:text-5xl  text-foreground mb-6">
            Care Instructions
          </h1>
          <p className="text-lg text-foreground/65 font-light max-w-2xl mx-auto">
            Proper care ensures your fine art prints remain vibrant and beautiful for generations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Handling */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-foreground mb-6">Handling Your Print</h2>
            <div className="space-y-4 text-foreground/65 font-light leading-relaxed">
              <p>
                Always handle your print with clean, dry hands or wear cotton gloves to prevent
                oils and moisture from transferring to the surface. Hold prints by the edges
                whenever possible.
              </p>
              <p>
                When moving or transporting your artwork, keep it flat or slightly curved
                (never fold) and protect it with acid-free tissue paper.
              </p>
            </div>
          </div>

          {/* Display */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-foreground mb-6">Display Guidelines</h2>
            <div className="space-y-4 text-foreground/65 font-light leading-relaxed">
              <p>
                <strong className="text-foreground">Avoid direct sunlight:</strong> UV rays can
                cause fading over time. Display your print away from windows or use UV-protective
                glass if framing.
              </p>
              <p>
                <strong className="text-foreground">Temperature and humidity:</strong> Maintain
                consistent room temperature (65-75°F) and humidity levels (30-50%). Avoid placing
                prints near heating vents, fireplaces, or in damp areas.
              </p>
              <p>
                <strong className="text-foreground">Framing:</strong> We recommend professional
                framing with archival materials. Use acid-free matting and backing boards to
                prevent yellowing and deterioration.
              </p>
            </div>
          </div>

          {/* Cleaning */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-foreground mb-6">Cleaning</h2>
            <div className="space-y-4 text-foreground/65 font-light leading-relaxed">
              <p>
                For framed prints, gently dust the glass with a soft, lint-free cloth. Never
                spray cleaning solutions directly onto the glass—apply to the cloth first.
              </p>
              <p>
                Unframed prints should only be dusted with a soft brush or compressed air.
                Never use water or cleaning solutions directly on the print surface.
              </p>
            </div>
          </div>

          {/* Storage */}
          <div className="mb-16">
            <h2 className="text-2xl font-light text-foreground mb-6">Storage</h2>
            <div className="space-y-4 text-foreground/65 font-light leading-relaxed">
              <p>
                If you need to store your print temporarily, keep it flat in a cool, dry place
                away from direct light. Wrap it in acid-free tissue paper and place it in an
                archival storage box.
              </p>
              <p>
                Never store prints in attics, basements, or garages where temperature and
                humidity fluctuate significantly.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-8 border-t border-line">
            <p className="text-foreground/65 font-light mb-6">
              Have questions about caring for your artwork?
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
