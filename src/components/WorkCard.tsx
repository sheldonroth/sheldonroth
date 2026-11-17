import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, getImage, PRINT_SIZES, type Work } from '@/content/catalog';

/** Grid card styled after lik.com's collection grid: image, small gold caps title, edition, price. */
export default function WorkCard({
  work,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority,
}: {
  work: Work;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  showCollection?: boolean;
}) {
  const img = getImage(work.slug);
  return (
    <Link href={`/shop/${work.slug}`} className="group block text-center">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-white">
        <Image quality={85}
          src={img.src}
          alt={`${work.title} — fine art photograph by Sheldon Roth`}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
          className="zoom-img h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
      <div className="mt-6">
        <h3 className="lk-card-title">{work.title}</h3>
        <p className="lk-card-edition mt-2">Limited Edition</p>
        <p className="lk-price mt-1">{formatPrice(PRINT_SIZES[0].price)}</p>
      </div>
    </Link>
  );
}
