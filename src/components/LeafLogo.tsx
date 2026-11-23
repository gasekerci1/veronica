interface LeafLogoProps {
  className?: string;
  /** Use on dark backgrounds (footer): sage leaf, linen ground line. */
  onDark?: boolean;
}

/** Lawn & Order leaf mark — a single leaf with a ruler-straight midrib. */
export function LeafLogo({ className = 'w-6 h-6', onDark = false }: LeafLogoProps) {
  const leaf = onDark ? '#A9B99A' : '#4F6F4A';
  const rib = onDark ? '#23262A' : '#F7F5F0';
  const ground = onDark ? '#F7F5F0' : '#23262A';

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path d="M50 10 C80 28 82 64 50 86 C18 64 20 28 50 10 Z" fill={leaf} />
      <line x1="50" y1="20" x2="50" y2="92" stroke={rib} strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="44" x2="64" y2="34" stroke={rib} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="50" y1="58" x2="36" y2="48" stroke={rib} strokeWidth="2.4" strokeLinecap="round" />
      <line x1="24" y1="94" x2="76" y2="94" stroke={ground} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

interface WordmarkProps {
  className?: string;
  /** Terracotta on light backgrounds, a lighter clay on dark ones. */
  onDark?: boolean;
}

/** lowercase "lawn&order" wordmark in Fraunces with a terracotta ampersand. */
export function Wordmark({ className = '', onDark = false }: WordmarkProps) {
  return (
    <span
      className={className}
      style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}
    >
      <span className="sr-only">Lawn &amp; Order</span>
      <span aria-hidden="true">
        lawn<span style={{ color: onDark ? '#E6A27F' : '#C0592F' }}>&amp;</span>order
      </span>
    </span>
  );
}
