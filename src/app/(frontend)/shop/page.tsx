import { getProducts, getCollections, getImageUrl } from '@/lib/payload';
import ShopClient from './ShopClient';

// Fallback data when CMS has no content yet
const fallbackProducts = [
  { id: '1', title: 'Gemsbok in the Mist', slug: 'gemsbok-in-the-mist', price: 2500, edition: 'Limited Edition of 150', category: 'wildlife', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80' },
  { id: '2', title: 'Reflection Pool', slug: 'reflection-pool', price: 3200, edition: 'Limited Edition of 100', category: 'landscapes', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: '3', title: 'Urban Symmetry', slug: 'urban-symmetry', price: 2800, edition: 'Limited Edition of 125', category: 'architecture', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { id: '4', title: 'Golden Hour', slug: 'golden-hour', price: 2200, edition: 'Limited Edition of 175', category: 'landscapes', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80' },
  { id: '5', title: 'Elephant Portrait', slug: 'elephant-portrait', price: 3500, edition: 'Limited Edition of 75', category: 'wildlife', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&q=80' },
  { id: '6', title: 'Antelope Canyon', slug: 'antelope-canyon', price: 4200, edition: 'Limited Edition of 50', category: 'landscapes', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=600&q=80' },
  { id: '7', title: 'Sydney Opera', slug: 'sydney-opera', price: 2900, edition: 'Limited Edition of 100', category: 'architecture', image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600&q=80' },
  { id: '8', title: 'Savanna Sunrise', slug: 'savanna-sunrise', price: 2600, edition: 'Limited Edition of 125', category: 'wildlife', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600&q=80' },
];

const fallbackCategories = ['wildlife', 'landscapes', 'architecture'];

export const metadata = {
  title: 'Shop | Sheldon Roth Fine Art',
  description: 'Browse our collection of limited edition fine art prints. Each piece is museum-quality and hand-numbered.',
};

export default async function ShopPage() {
  let products = fallbackProducts;
  let categories = fallbackCategories;

  try {
    const cmsProducts = await getProducts();
    if (cmsProducts.length > 0) {
      products = cmsProducts.map((prod) => {
        const collection = prod.collection as { slug?: string } | null;
        const edition = prod.edition as { type?: string; total?: number } | null;
        return {
          id: String(prod.id),
          title: prod.title as string,
          slug: prod.slug as string,
          price: (prod.sizes?.[0]?.price as number) || 2500,
          edition: edition?.type === 'limited'
            ? `Limited Edition of ${edition?.total || 100}`
            : 'Open Edition',
          category: collection?.slug || 'uncategorized',
          image: getImageUrl(prod.images?.[0]?.image),
        };
      });
    }
  } catch (e) {
    console.log('Using fallback products', e);
  }

  try {
    const cmsCollections = await getCollections();
    if (cmsCollections.length > 0) {
      categories = cmsCollections.map((col) => col.slug as string);
    }
  } catch (e) {
    console.log('Using fallback categories', e);
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">Shop</h1>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-6" />
          <p className="text-[#77776d] max-w-2xl mx-auto">
            Each limited edition print is museum-quality, hand-numbered, and accompanied by a certificate of authenticity.
          </p>
        </div>
      </section>

      <ShopClient products={products} categories={categories} />

      {/* Info Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-sm tracking-[0.2em] mb-2">CERTIFICATE OF AUTHENTICITY</h3>
              <p className="text-sm text-[#77776d]">
                Each print includes a hand-signed certificate verifying its authenticity and edition number.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-sm tracking-[0.2em] mb-2">WORLDWIDE SHIPPING</h3>
              <p className="text-sm text-[#77776d]">
                Professional packing and insured delivery to collectors around the world.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-[#88744a]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-sm tracking-[0.2em] mb-2">SATISFACTION GUARANTEE</h3>
              <p className="text-sm text-[#77776d]">
                30-day return policy for complete peace of mind with your purchase.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
