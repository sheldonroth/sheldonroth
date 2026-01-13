import Link from 'next/link';
import { getPayloadClient } from '@/lib/payload';

export const metadata = {
  title: 'New Releases | Sheldon Roth Fine Art',
  description: 'Discover the latest fine art photography prints from Sheldon Roth.',
};

// Placeholder products until CMS is populated
const placeholderProducts = [
  {
    id: '1',
    title: 'Autumn Symphony',
    slug: 'autumn-symphony',
    category: 'Landscape',
    price: 480,
    image: '/placeholder-1.jpg',
    isNew: true,
  },
  {
    id: '2',
    title: 'City at Dusk',
    slug: 'city-at-dusk',
    category: 'Architecture',
    price: 520,
    image: '/placeholder-2.jpg',
    isNew: true,
  },
  {
    id: '3',
    title: 'Coastal Dreams',
    slug: 'coastal-dreams',
    category: 'Seascape',
    price: 450,
    image: '/placeholder-3.jpg',
    isNew: true,
  },
  {
    id: '4',
    title: 'Desert Solitude',
    slug: 'desert-solitude',
    category: 'Landscape',
    price: 420,
    image: '/placeholder-4.jpg',
    isNew: true,
  },
];

export default async function NewReleasesPage() {
  let products = placeholderProducts;

  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'products',
      limit: 12,
      sort: '-createdAt',
    });

    if (result.docs.length > 0) {
      products = result.docs.map((doc: any) => ({
        id: doc.id,
        title: doc.title,
        slug: doc.slug,
        category: doc.category || 'Photography',
        price: doc.sizes?.[0]?.price || 0,
        image: doc.images?.[0]?.image?.url || '/placeholder-1.jpg',
        isNew: true,
      }));
    }
  } catch (error) {
    console.log('Using placeholder products');
  }

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] text-[#88744a] mb-4">LATEST WORKS</p>
          <h1 className="text-4xl md:text-5xl font-light text-[#1a1a1a] mb-6">
            New Releases
          </h1>
          <p className="text-lg text-[#77776d] font-light max-w-2xl mx-auto">
            Fresh perspectives and newly captured moments, now available as limited edition prints.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group bg-white"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0ee]">
                  {/* New Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#88744a] text-white text-[10px] tracking-[0.2em] px-3 py-1">
                      NEW
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-[#c4c4c4]">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs tracking-[0.2em] text-[#88744a] mb-1">
                    {product.category.toUpperCase()}
                  </p>
                  <h3 className="text-sm font-light text-[#1a1a1a] mb-2 group-hover:text-[#88744a] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#77776d]">
                    From ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Link href="/shop" className="btn-secondary">
              View All Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
