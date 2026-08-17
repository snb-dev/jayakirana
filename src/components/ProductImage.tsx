import { useEffect, useState } from 'react';
import { categoryColors, getCategory } from '../data/products';
import type { CategoryId } from '../types';
import CategoryIcon from './CategoryIcon';

interface ProductImageProps {
  category: CategoryId;
  src?: string | null;
  alt?: string;
  className?: string;
  emojiClassName?: string;
  rounded?: string;
  priority?: boolean;
}

/**
 * Product visual: shows the real photo when `src` is provided, layered over a
 * soft category-colored gradient + emoji that doubles as the loading state and
 * the fallback if the image fails to load.
 */
export default function ProductImage({
  category,
  src,
  alt,
  className = '',
  emojiClassName = 'text-6xl',
  rounded = 'rounded-t-xl',
  priority = false,
}: ProductImageProps) {
  const colors = categoryColors[category];
  const cat = getCategory(category);

  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  // Reset state when the source changes (e.g. slider advancing).
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [src]);

  const showImage = !!src && !errored;

  return (
    <div
      className={`relative grid place-items-center overflow-hidden ${rounded} ${className}`}
      style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 14px)',
        }}
      />
      <span className={`relative grid h-14 w-14 place-items-center rounded-2xl bg-white/60 text-brand-dark/30 ${emojiClassName}`}>
        <CategoryIcon category={category} size={28} />
      </span>

      {showImage && (
        <img
          src={src as string}
          alt={alt ?? cat.name}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          {...{ fetchpriority: priority ? 'high' : 'auto' }}
        />
      )}
    </div>
  );
}
