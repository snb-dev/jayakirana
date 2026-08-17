import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  reviews?: number;
  size?: number;
  className?: string;
}

export default function StarRating({ rating, reviews, size = 14, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => {
          const filled = i + 1 <= Math.round(rating);
          return (
            <Star
              key={i}
              style={{ width: size, height: size }}
              className={filled ? 'fill-accent-yellow text-accent-yellow' : 'fill-gray-200 text-gray-200'}
            />
          );
        })}
      </div>
      <span className="text-xs font-medium text-ink-secondary">
        {rating.toFixed(1)}
        {reviews !== undefined && <span className="text-gray-400"> ({reviews})</span>}
      </span>
    </div>
  );
}
