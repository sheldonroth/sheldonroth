import Image from 'next/image';
import Link from 'next/link';
import { formatPrice, getImage, sizesFor, type Work } from '@/content/catalog';

/**
 * Grid card after lik.com's collection grid: a light grey mat (#edecec) with the photograph contained in a
 * near-square box, then the small gold caps title, edition and price, all centred inside the mat.
 */
export default function WorkCard({
  work,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  priority,
  tone = 'grey',
}: {
  work: Work;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** 'dark' is lik.com's charcoal mat used for related works on grey bands */
  tone?: 'grey' | 'dark';
  showCollection?: boolean;
}) {
  const img = getImage(work.slug);
  return (
    <Link href={`/shop/${work.slug}`} className={`group block h-full px-[7%] pb-9 pt-[14%] text-center transition-colors duration-300 ${tone === 'dark' ? 'bg-[#202022] hover:bg-[#2a2a2c]' : 'bg-[#edecec] hover:bg-[#e6e5e3]'}`}>
      <div className="relative flex aspect-[1/0.97] items-center justify-center">
        <Image
          quality={85}
          src={img.src}
          alt={`${work.title} — fine art photograph by Sheldon Roth`}
          width={img.width}
          height={img.height}
          sizes={sizes}
          priority={priority}
          className="zoom-img h-auto max-h-full w-auto max-w-full object-contain shadow-[0_3px_10px_rgba(0,0,0,0.22)]"
        />
      </div>
      <div className="mt-8">
        <h3 className={`lk-card-title ${tone === 'dark' ? '!text-[#c9b48a]' : ''}`}>{work.title}</h3>
        <p className={`lk-card-edition mt-3 ${tone === 'dark' ? '!text-[#bdbdbd]' : ''}`}>Limited Edition</p>
        <p className={`lk-price mt-1 ${tone === 'dark' ? '!text-[#c9b48a]' : ''}`}>{sizesFor(work.slug)[0] ? formatPrice(sizesFor(work.slug)[0].price) : 'Price on request'}</p>
      </div>
    </Link>
  );
}
