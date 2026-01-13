import { getProductBySlug, getImageUrl } from '@/lib/payload';
import { notFound } from 'next/navigation';
import ProductClient from './ProductClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  return {
    title: `${product.title} | Sheldon Roth Fine Art`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Transform CMS product to client format
  const collection = product.collection as { title?: string; slug?: string } | null;
  const edition = product.edition as { type?: string; total?: number; sold?: number } | null;
  const images = (product.images as { image: unknown }[] | null) || [];
  const sizes = (product.sizes as { name: string; price: number; dimensions: string }[] | null) || [];
  const details = (product.details as { detail: string }[] | null) || [];

  const productData = {
    title: product.title as string,
    slug: product.slug as string,
    description: product.description as string || '',
    category: collection?.title || 'Fine Art',
    categorySlug: collection?.slug || 'all',
    edition: edition?.type === 'limited' ? 'Limited Edition' : 'Open Edition',
    editionTotal: edition?.total || 100,
    editionSold: edition?.sold || 0,
    images: images.map(img => getImageUrl(img.image)),
    sizes: sizes.length > 0 ? sizes : [
      { name: 'Standard', price: 500, dimensions: '16" x 20"' },
    ],
    details: details.map(d => d.detail),
  };

  return <ProductClient product={productData} />;
}
