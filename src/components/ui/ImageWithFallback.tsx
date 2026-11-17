import { useState } from 'react';
import { Gamepad2 } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  fallbackTitle?: string;
  aspectRatioClass?: string;
  className?: string;
  priority?: boolean;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackTitle,
  aspectRatioClass = 'aspect-[16/10]',
  className = '',
  priority = false,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const showFallback = !src || hasError;

  return (
    <div
      className={`relative overflow-hidden rounded-[8px] bg-[#171A26] ${aspectRatioClass} ${className}`}
    >
      {showFallback ? (
        <div
          aria-label={alt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.16),transparent_60%),linear-gradient(180deg,#171A26_0%,#10121A_100%)] p-4 text-center"
        >
          <Gamepad2 className="h-7 w-7 text-[#94A3B8]/60" aria-hidden="true" />
          <span className="line-clamp-2 max-w-[85%] text-xs font-medium text-[#94A3B8]">
            {fallbackTitle ?? alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      )}
    </div>
  );
}
