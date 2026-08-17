import { getCategory } from '../data/products';
import type { CategoryId } from '../types';
import CategoryIcon from './CategoryIcon';

interface CategoryBadgeProps {
  category: CategoryId;
  className?: string;
}

export default function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const cat = getCategory(category);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-ink-secondary ${className}`}
    >
      <CategoryIcon category={category} size={13} />
      {cat.name}
    </span>
  );
}
