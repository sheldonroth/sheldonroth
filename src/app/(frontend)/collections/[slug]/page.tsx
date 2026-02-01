import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, getProducts, getImageUrl, formatPrice } from '@/lib/payload';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    return { title: 'Collection Not Found' };
  }

  return {
    title: `${collection.title} | Sheldon Roth Fine Art`,
    description: (collection.description as string) || `Explore our ${collection.title} collection of fine art photography.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Fetch products in this collection
  const products = await getProducts({ collection: slug });

  const formattedProducts = products.map((prod) => {
    const edition = prod.edition as { type?: string; total?: number } | null;
    return {
      id: String(prod.id),
      title: prod.title as string,
      slug: prod.slug as string,
      price: (prod.sizes?.[0]?.price as number) || 2500,
      edition: edition?.type === 'limited'
        ? `Limited Edition of ${edition?.total || 100}`
        : 'Open Edition',
      image: getImageUrl(prod.images?.[0]?.image),
    };
  });

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-8 lg:pt-40 lg:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-xs tracking-wide">
              <li>
                <Link href="/collections" className="text-[#77776d] hover:text-[#1a1a1a] transition-colors">
                  Collections
                </Link>
              </li>
              <li className="text-[#77776d]">/</li>
              <li className="text-[#1a1a1a]">{collection.title as string}</li>
            </ol>
          </nav>

          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-light tracking-wide mb-4">{collection.title as string}</h1>
            <div className="w-12 h-px bg-[#88744a] mx-auto mb-6" />
            {collection.description && (
              <p className="text-[#77776d] max-w-2xl mx-auto">
                {collection.description as string}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-20 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {formattedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {formattedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden mb-4 bg-[#f8f8f6]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-light tracking-wide mb-1 group-hover:text-[#88744a] transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-sm text-[#77776d] mb-2">{product.edition}</p>
                  <p className="text-lg">{formatPrice(product.price)}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#77776d] mb-8">No products in this collection yet.</p>
              <Link href="/shop" className="btn-primary">
                Browse All Works
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-[#f8f8f6]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-light tracking-wide mb-4">Explore More Collections</h2>
          <div className="w-12 h-px bg-[#88744a] mx-auto mb-8" />
          <p className="text-[#77776d] mb-8">
            Discover more of our curated collections spanning wildlife, landscapes, architecture, and more.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections" className="btn-secondary">
              All Collections
            </Link>
            <Link href="/shop" className="btn-primary">
              Browse All Works
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
