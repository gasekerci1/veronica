import { useState } from 'react';
import { Sprout } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel = 'Chester Hill Grounds & Landscapes',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EEEBE3] via-[#E7E3D9] to-[#DCD8CC] text-[#3A3D41] p-6 text-center ${className}`}
      >
        <Sprout className="w-8 h-8 text-[#4F6F4A]" aria-hidden="true" />
        <span className="text-sm font-medium tracking-tight max-w-xs">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="eager"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
