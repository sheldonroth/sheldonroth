import Link from 'next/link';
import Image from 'next/image';

const featuredCollections = [
  {
    id: 1,
    title: 'Wildlife',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80',
    href: '/collections/wildlife',
  },
  {
    id: 2,
    title: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    href: '/collections/landscapes',
  },
  {
    id: 3,
    title: 'Architecture',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    href: '/collections/architecture',
  },
];

const featuredWorks = [
  {
    id: 1,
    title: 'Gemsbok in the Mist',
    price: '$2,500',
    edition: 'Limited Edition of 150',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&q=80',
  },
  {
    id: 2,
    title: 'Reflection Pool',
    price: '$3,200',
    edition: 'Limited Edition of 100',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    id: 3,
    title: 'Urban Symmetry',
    price: '$2,800',
    edition: 'Limited Edition of 125',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
  },
  {
    id: 4,
    title: 'Golden Hour',
    price: '$2,200',
    edition: 'Limited Edition of 175',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=90"
            alt="Featured artwork - Wildlife photography"
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
                Gemsbok in the Mist
              </h1>
              <p className="text-white/70 text-sm tracking-wider mb-8 max-w-md">
                Limited Edition of 150 | Museum-Quality Acrylic Print
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/shop/gemsbok-in-the-mist" className="btn-primary bg-white text-[#1a1a1a] hover:bg-[#88744a] hover:text-white">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Collections</h2>
            <div className="w-12 h-px bg-[#88744a] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                href={collection.href}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredWorks.map((work) => (
              <Link key={work.id} href={`/shop/${work.title.toLowerCase().replace(/ /g, '-')}`} className="group">
                <div className="relative aspect-[4/5] overflow-hidden mb-4">
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm font-light tracking-wide mb-1 group-hover:text-[#88744a] transition-colors">
                  {work.title}
                </h3>
                <p className="text-xs text-[#77776d] mb-1">{work.edition}</p>
                <p className="text-sm font-medium">{work.price}</p>
              </Link>
            ))}
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
