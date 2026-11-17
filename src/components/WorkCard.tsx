import Image from 'next/image';
import Link from 'next/link';
import { getImage, getCollection, type Work } from '@/content/catalog';

interface WorkCardProps {
  work: Work;
  /** CSS aspect ratio for the frame, e.g. '4/5'. Omit to use the photo's own ratio. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  showCollection?: boolean;
}

export default function WorkCard({
  work,
  aspect,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority,
  showCollection = true,
}: WorkCardProps) {
  const img = getImage(work.slug);
  const collection = getCollection(work.collection);
  return (
    <Link href={`/shop/${work.slug}`} className="group block">
      <div
        className="relative overflow-hidden bg-surface"
        style={{ aspectRatio: aspect ?? `${img.width}/${img.height}` }}
      >
        <Image
          src={img.src}
          alt={`${work.title} — fine art photograph by Sheldon Roth`}
          fill
          sizes={sizes}
          priority={priority}
          className="zoom-img object-cover"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/25" />
        <span className="eyebrow absolute bottom-5 left-1/2 -translate-x-1/2 translate-y-3 whitespace-nowrap border border-white/60 bg-black/30 px-5 py-3 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          View Artwork
        </span>
      </div>
      <div className="mt-5 text-center">
        <h3 className="font-display text-2xl text-foreground transition-colors group-hover:text-accent-light">
          {work.title}
        </h3>
        <p className="eyebrow mt-2 text-muted">
          {showCollection && collection ? `${collection.title} · ` : ''}Limited Edition {work.editionSize}
        </p>
      </div>
    </Link>
  );
}
