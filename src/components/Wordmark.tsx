import Link from 'next/link';

export default function Wordmark({ size = 'md', onClick }: { size?: 'md' | 'lg'; onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Sheldon Roth Fine Art — home" className="group inline-flex flex-col items-center leading-none">
      <span
        className={`wordmark text-foreground transition-colors group-hover:text-accent-light ${
          size === 'lg' ? 'text-2xl md:text-3xl' : 'text-[1.05rem] sm:text-xl lg:text-[1.45rem]'
        }`}
        style={{ marginRight: '-0.42em' }}
      >
        Sheldon Roth
      </span>
      <span className="eyebrow mt-1.5 text-[0.5rem] sm:text-[0.55rem] text-muted" style={{ letterSpacing: '0.6em', marginRight: '-0.6em' }}>
        Fine Art
      </span>
    </Link>
  );
}
