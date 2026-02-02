import Link from 'next/link';
import Image from 'next/image';
import { getCollections, getFeaturedProducts, getImageUrl, formatPrice } from '@/lib/payload';
import { HomePageClient } from './HomePageClient';

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
    <HomePageClient
      heroWork={heroWork}
      collections={collections}
      featuredWorks={featuredWorks}
    />
  );
}
