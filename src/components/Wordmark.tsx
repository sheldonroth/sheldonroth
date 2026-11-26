import Link from 'next/link';

/** Text wordmark set like Lik's logo lock-up: a bold name and a light "Fine Art". */
export default function Wordmark({ onClick, className = '' }: { onClick?: () => void; className?: string }) {
  return (
    <Link href="/" prefetch={false} onClick={onClick} aria-label="Sheldon Roth Fine Art — home" className={`lk-wordmark inline-flex items-baseline gap-2 whitespace-nowrap ${className}`}>
      <span className="font-semibold">Sheldon Roth</span>
      <small className="hidden sm:inline">Fine Art</small>
    </Link>
  );
}
