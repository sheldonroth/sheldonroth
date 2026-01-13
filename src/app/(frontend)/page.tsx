import Link from 'next/link';
import Image from 'next/image';
import { getCollections, getFeaturedProducts, getImageUrl, formatPrice } from '@/lib/payload';

// Fallback data when CMS has no content yet
const fallbackCollections = [
  { id: '1', title: 'Wildlife', slug: 'wildlife', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80' },
  { id: '2', title: 'Landscapes', slug: 'landscapes', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },
  { id: '3', title: 'Architecture', slug: 'architecture', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80' },
  { id: '4', title: 'Abstract', slug: 'abstract', image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80' },
  { id: '5', title: 'Seascapes', slug: 'seascapes', image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80' },
  { id: '6', title: 'Black & White', slug: 'black-and-white', image: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&q=80' },
];

const fallbackWorks = [
  { id: '1', title: 'Gemsbok in the Mist', slug: 'gemsbok-in-the-mist', price: 2500, edition: { type: 'limited', total: 150 }, image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80' },
  { id: '2', title: 'Reflection Pool', slug: 'reflection-pool', price: 3200, edition: { type: 'limited', total: 100 }, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' },
  { id: '3', title: 'Urban Symmetry', slug: 'urban-symmetry', price: 2800, edition: { type: 'limited', total: 125 }, image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80' },
  { id: '4', title: 'Golden Hour', slug: 'golden-hour', price: 2200, edition: { type: 'limited', total: 175 }, image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80' },
];

export default async function Home() {
  // Fetch from CMS with fallback
  let collections = fallbackCollections;
  let featuredWorks = fallbackWorks;

  try {
    const cmsCollections = await getCollections();
    if (cmsCollections.length > 0) {
      collections = cmsCollections.map((col) => ({
        id: String(col.id),
        title: col.title as string,
        slug: col.slug as string,
        image: getImageUrl(col.image),
      }));
    }
  } catch (e) {
    console.log('Using fallback collections', e);
  }

  try {
    const cmsProducts = await getFeaturedProducts(10);
    if (cmsProducts.length > 0) {
      featuredWorks = cmsProducts.map((prod) => ({
        id: String(prod.id),
        title: prod.title as string,
        slug: prod.slug as string,
        price: (prod.sizes?.[0]?.price as number) || 2500,
        edition: (prod.edition as { type: string; total: number }) || { type: 'limited', total: 100 },
        image: getImageUrl(prod.images?.[0]?.image),
      }));
    }
  } catch (e) {
    console.log('Using fallback products', e);
  }

  const heroWork = featuredWorks[0] || fallbackWorks[0];

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroWork.image.replace('w=600', 'w=1920')}
            alt={`Featured artwork - ${heroWork.title}`}
            fill
            className="object-cover animate-scale-in"
            priority
            sizes="100vw"
          />
          {/* Warm golden overlay to match original site aesthetic */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <span className="text-white/80 text-xs tracking-[0.3em] font-light mb-4 block">
                FEATURED WORK
              </span>
              <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-6">
                {heroWork.title}
              </h1>
              <p className="text-white/70 text-sm tracking-wider mb-8 max-w-md">
                {heroWork.edition.type === 'limited'
                  ? `Limited Edition of ${heroWork.edition.total}`
                  : 'Open Edition'} | Museum-Quality Acrylic Print
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/shop/${heroWork.slug}`} className="btn-primary bg-white text-[#1a1a1a] hover:bg-[#88744a] hover:text-white">
                  View Artwork
                </Link>
                <Link href="/collections" className="btn-secondary border-white text-white hover:bg-white hover:text-[#1a1a1a]">
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-white/50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Collections</h2>
              <div className="w-12 h-px bg-[#88744a] mx-auto md:mx-0" />
            </div>
            <Link
              href="/collections"
              className="hidden md:block text-xs tracking-[0.2em] text-[#88744a] hover:text-[#1a1a1a] transition-colors"
            >
              VIEW ALL COLLECTIONS
            </Link>
          </div>

          {/* Horizontal scrollable carousel */}
          <div className="relative">
            <div className="flex gap-4 lg:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6 lg:mx-0 lg:px-0">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.slug}`}
                  className="group relative flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[350px] aspect-[3/4] overflow-hidden snap-start"
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 350px"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl lg:text-2xl tracking-[0.2em] font-light">
                      {collection.title.toUpperCase()}
                    </h3>
                  </div>
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

      {/* Featured Works Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Featured Works</h2>
              <div className="w-12 h-px bg-[#88744a]" />
            </div>
            <Link
              href="/shop"
              className="text-xs tracking-[0.2em] text-[#88744a] hover:text-[#1a1a1a] transition-colors"
            >
              VIEW ALL WORKS
            </Link>
          </div>

          {/* Horizontal scrollable carousel on mobile, grid on larger screens */}
          <div className="relative">
            <div className="flex lg:grid lg:grid-cols-4 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-4 lg:pb-0 -mx-6 px-6 lg:mx-0 lg:px-0">
              {featuredWorks.map((work) => (
                <Link
                  key={work.id}
                  href={`/shop/${work.slug}`}
                  className="group flex-shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-start"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-4">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 25vw"
                    />
                  </div>
                  <h3 className="text-sm font-light tracking-wide mb-1 group-hover:text-[#88744a] transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-[#77776d] mb-1">
                    {work.edition.type === 'limited'
                      ? `Limited Edition of ${work.edition.total}`
                      : 'Open Edition'}
                  </p>
                  <p className="text-sm font-medium">{formatPrice(work.price)}</p>
                </Link>
              ))}
            </div>
            {/* Scroll hint for mobile */}
            <div className="flex lg:hidden justify-center mt-4 gap-1">
              {featuredWorks.map((_, index) => (
                <div key={index} className="w-1.5 h-1.5 rounded-full bg-[#88744a]/30" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-square lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                alt="Sheldon Roth - Fine Art Photographer"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <span className="text-xs tracking-[0.3em] text-[#88744a] mb-4 block">THE ARTIST</span>
              <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-6">About Sheldon</h2>
              <div className="w-12 h-px bg-[#88744a] mb-8" />
              <p className="text-[#77776d] leading-relaxed mb-6">
                Sheldon is a multi-faceted entrepreneur with a diverse portfolio of businesses. But beyond the business acumen lies a person deeply rooted in community, content creation and empathy.
              </p>
              <p className="text-[#77776d] leading-relaxed mb-8">
                Through his lens, Sheldon captures moments that transcend the ordinary, transforming fleeting instances into timeless works of art. Each photograph is a testament to patience, precision, and an unwavering commitment to excellence.
              </p>
              <Link href="/artist" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 lg:py-32 bg-[#1a1a1a] text-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Stay Connected</h2>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          <p className="text-white/60 mb-8">
            Be the first to know about new releases, exclusive editions, and behind-the-scenes content.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-transparent border border-white/20 text-white placeholder:text-white/40 text-sm tracking-wider focus:outline-none focus:border-[#88744a] transition-colors"
            />
            <button type="submit" className="btn-primary bg-[#88744a] hover:bg-[#a89264]">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
