import { getCollections, getImageUrl } from '@/lib/payload';
import { CollectionsPageClient } from './CollectionsPageClient';

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

  return <CollectionsPageClient collections={collections} />;
}
