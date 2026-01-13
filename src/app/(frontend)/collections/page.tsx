import Link from 'next/link';
import Image from 'next/image';
import { getCollections, getImageUrl } from '@/lib/payload';

// Fallback data when CMS has no content yet
const fallbackCollections = [
  { id: '1', title: 'Wildlife', slug: 'wildlife', description: 'Intimate portraits of the natural world', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', count: 24 },
  { id: '2', title: 'Landscapes', slug: 'landscapes', description: 'Breathtaking vistas from around the globe', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', count: 32 },
  { id: '3', title: 'Architecture', slug: 'architecture', description: 'The artistry of human creation', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', count: 18 },
  { id: '4', title: 'Abstract', slug: 'abstract', description: 'Exploring form, light, and texture', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80', count: 15 },
  { id: '5', title: 'Black & White', slug: 'black-and-white', description: 'Timeless monochrome compositions', image: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80', count: 21 },
  { id: '6', title: 'Aerial', slug: 'aerial', description: 'A perspective from above', image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80', count: 12 },
  { id: '7', title: 'Seascapes', slug: 'seascapes', description: 'The power and serenity of the ocean', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80', count: 18 },
  { id: '8', title: 'Desert', slug: 'desert', description: 'Minimalist beauty of arid landscapes', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80', count: 14 },
  { id: '9', title: 'Night Sky', slug: 'night-sky', description: 'Stars, auroras, and celestial wonders', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&q=80', count: 16 },
];

export const metadata = {
  title: 'Collections | Sheldon Roth Fine Art',
  description: 'Explore our curated collections of fine art photography spanning wildlife, landscapes, architecture, and more.',
};

export default async function CollectionsPage() {
  let collections = fallbackCollections;

  try {
    const cmsCollections = await getCollections();
    if (cmsCollections.length > 0) {
      collections = cmsCollections.map((col) => ({
        id: String(col.id),
        title: col.title as string,
        slug: col.slug as string,
        description: (col.description as string) || '',
        image: getImageUrl(col.image),
        count: 0, // Will be populated when products are linked
      }));
    }
  } catch (e) {
    console.log('Using fallback collections', e);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Collections</h1>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-6" />
          <p className="text-[#77776d] max-w-2xl mx-auto">
            Each collection represents a journey, a story told through light, composition, and the unwavering pursuit of the perfect moment.
          </p>
        </div>
      </section>

      {/* Collections Grid - Scrollable on mobile */}
      <section className="pb-20 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative">
            <div className="flex lg:grid lg:grid-cols-3 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-start"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-6">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 33vw"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                    {collection.count > 0 && (
                      <div className="absolute bottom-6 left-6 right-6">
                        <span className="text-white/70 text-xs tracking-[0.2em]">{collection.count} WORKS</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-xl font-light tracking-wide mb-2 group-hover:text-[#88744a] transition-colors">
                    {collection.title}
                  </h2>
                  <p className="text-sm text-[#77776d]">{collection.description}</p>
                </Link>
              ))}
            </div>
            {/* Scroll hint for mobile */}
            <div className="flex justify-center mt-4 gap-1 lg:hidden">
              {collections.map((_, index) => (
                <div key={index} className="w-1.5 h-1.5 rounded-full bg-[#88744a]/30" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Looking for Something Specific?</h2>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          <p className="text-[#77776d] mb-8">
            Explore our complete catalog of works or reach out for personalized assistance in finding the perfect piece.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              Browse All Works
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
