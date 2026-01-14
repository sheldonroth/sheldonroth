import Link from 'next/link';
import Image from 'next/image';
import { getCollections, getFeaturedProducts, getImageUrl, formatPrice } from '@/lib/payload';

// Fallback data when CMS has no content yet
const fallbackCollections = [
  { id: '1', title: 'Wildlife', slug: 'wildlife', image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/gemsbok-in-mist-vGgtQRwpJDQQ9ZWVaVRWTNpt3EZNGy.jpg' },
  { id: '2', title: 'Landscapes', slug: 'landscapes', image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/reflection-pool-JWGbfU97jVKRQinQJBPAVnanyfjMQJ.jpg' },
  { id: '3', title: 'Architecture', slug: 'architecture', image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/sydney-opera-AG05UTxSQenoxlAG3S3568BHuQlJPy.jpg' },
  { id: '4', title: 'Nature', slug: 'nature', image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/tree-LoRbPxepQmqiO1dA1IaiiN94qpLIlX.jpg' },
  { id: '5', title: 'Southwest', slug: 'southwest', image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/antelope-canyon-asZxz5DmCd8ygz2HtyuNbrOa75GfDh.jpg' },
  { id: '6', title: 'Black & White', slug: 'black-and-white', image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/burj-khalifa-yr4KCWjhey6EJ2AL60CvLsUYCdK15Y.jpg' },
];

const fallbackWorks = [
  { id: '1', title: 'Gemsbok in the Mist', slug: 'gemsbok-in-the-mist', price: 2800, edition: { type: 'limited', total: 150 }, image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/gemsbok-in-mist-vGgtQRwpJDQQ9ZWVaVRWTNpt3EZNGy.jpg' },
  { id: '2', title: 'Reflection Pool', slug: 'reflection-pool', price: 2800, edition: { type: 'limited', total: 100 }, image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/reflection-pool-JWGbfU97jVKRQinQJBPAVnanyfjMQJ.jpg' },
  { id: '3', title: 'Antelope Canyon', slug: 'antelope-canyon', price: 2800, edition: { type: 'limited', total: 125 }, image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/antelope-canyon-asZxz5DmCd8ygz2HtyuNbrOa75GfDh.jpg' },
  { id: '4', title: 'Burj Khalifa', slug: 'burj-khalifa', price: 2800, edition: { type: 'limited', total: 175 }, image: 'https://awuvex5gqiu0dqk6.public.blob.vercel-storage.com/media/burj-khalifa-yr4KCWjhey6EJ2AL60CvLsUYCdK15Y.jpg' },
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
          {/* Sophisticated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-20 lg:pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
            <div className="animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <span className="text-[#88744a] text-xs tracking-[0.4em] font-light mb-4 block uppercase">
                Featured Work
              </span>
              <h1 className="text-white text-4xl md:text-5xl lg:text-7xl font-extralight tracking-wide mb-6 leading-tight">
                {heroWork.title}
              </h1>
              <p className="text-white/60 text-sm tracking-wider mb-8 max-w-md font-light">
                {heroWork.edition.type === 'limited'
                  ? `Limited Edition of ${heroWork.edition.total}`
                  : 'Open Edition'} | TruLife® Acrylic Face Mount
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/shop/${heroWork.slug}`} className="btn-primary bg-white/95 text-[#1a1a1a] hover:bg-[#88744a] hover:text-white backdrop-blur-sm">
                  View Artwork
                </Link>
                <Link href="/collections" className="btn-secondary border-white/60 text-white hover:bg-white/10 hover:border-white">
                  Explore Collections
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex flex-col items-center gap-2 animate-pulse">
            <span className="text-white/40 text-[10px] tracking-[0.3em] font-light">SCROLL</span>
            <svg
              className="w-5 h-5 text-white/40"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-4">
            <div className="text-center md:text-left w-full md:w-auto">
              <span className="text-xs tracking-[0.4em] text-[#88744a] mb-3 block">EXPLORE</span>
              <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide mb-4">Collections</h2>
              <div className="w-16 h-px bg-gradient-to-r from-[#88744a] to-transparent mx-auto md:mx-0" />
            </div>
            <Link
              href="/collections"
              className="hidden md:flex items-center gap-2 text-xs tracking-[0.2em] text-[#77776d] hover:text-[#88744a] transition-colors group"
            >
              VIEW ALL
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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
                    className="object-cover transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 350px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end pb-10">
                    <h3 className="text-white text-lg lg:text-xl tracking-[0.3em] font-light mb-2">
                      {collection.title.toUpperCase()}
                    </h3>
                    <span className="text-white/50 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      EXPLORE →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            {/* Scroll hint for mobile */}
            <div className="flex justify-center mt-6 gap-1.5 lg:hidden">
              {collections.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-[#88744a]/20" />
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
              <span className="text-xs tracking-[0.4em] text-[#88744a] mb-3 block">CURATED SELECTION</span>
              <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide mb-4">Featured Works</h2>
              <div className="w-16 h-px bg-gradient-to-r from-[#88744a] to-transparent" />
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-2 text-xs tracking-[0.2em] text-[#77776d] hover:text-[#88744a] transition-colors group"
            >
              VIEW ALL WORKS
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
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
                  <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-white">
                    <Image
                      src={work.image}
                      alt={work.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 25vw"
                    />
                    {/* Quick view overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-white text-xs tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 backdrop-blur-sm">
                        VIEW
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-light tracking-wide mb-2 group-hover:text-[#88744a] transition-colors">
                    {work.title}
                  </h3>
                  <p className="text-xs text-[#77776d] mb-2">
                    {work.edition.type === 'limited'
                      ? `Limited Edition of ${work.edition.total}`
                      : 'Open Edition'}
                  </p>
                  <p className="text-sm text-[#1a1a1a]">From {formatPrice(work.price)}</p>
                </Link>
              ))}
            </div>
            {/* Scroll hint for mobile */}
            <div className="flex lg:hidden justify-center mt-6 gap-1.5">
              {featuredWorks.map((_, index) => (
                <div key={index} className="w-2 h-2 rounded-full bg-[#88744a]/20" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="relative">
              {/* Main image */}
              <div className="relative aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                  alt="Sheldon Roth - Fine Art Photographer"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative frame accent */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#88744a]/30 hidden lg:block" />
            </div>
            <div className="lg:pl-8">
              <span className="text-xs tracking-[0.4em] text-[#88744a] mb-4 block">THE ARTIST</span>
              <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide mb-6">About Sheldon</h2>
              <div className="w-16 h-px bg-gradient-to-r from-[#88744a] to-transparent mb-8" />
              <p className="text-[#77776d] leading-relaxed mb-6 text-[15px]">
                Sheldon is a multi-faceted entrepreneur with a diverse portfolio of businesses. But beyond the business acumen lies a person deeply rooted in community, content creation and empathy.
              </p>
              <p className="text-[#77776d] leading-relaxed mb-8 text-[15px]">
                Through his lens, Sheldon captures moments that transcend the ordinary, transforming fleeting instances into timeless works of art. Each photograph is a testament to patience, precision, and an unwavering commitment to excellence.
              </p>
              <Link href="/artist" className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#1a1a1a] hover:text-[#88744a] transition-colors">
                LEARN MORE
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 lg:py-40 bg-[#1a1a1a] text-white relative overflow-hidden">
        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center relative">
          <span className="text-xs tracking-[0.4em] text-[#88744a] mb-4 block">STAY CONNECTED</span>
          <h2 className="text-3xl lg:text-4xl font-extralight tracking-wide mb-4">Join the Collector&apos;s Circle</h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#88744a] to-transparent mx-auto mb-8" />
          <p className="text-white/50 mb-10 text-[15px] font-light max-w-lg mx-auto">
            Be the first to know about new releases, exclusive editions, and behind-the-scenes content from the studio.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm tracking-wider focus:outline-none focus:border-[#88744a] focus:bg-white/10 transition-all"
            />
            <button type="submit" className="px-8 py-4 bg-[#88744a] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#a89264] transition-colors">
              SUBSCRIBE
            </button>
          </form>
          <p className="text-white/30 text-xs mt-6 tracking-wider">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
