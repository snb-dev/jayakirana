import { Boxes, CookingPot, Drill, Hammer, Lightbulb, Sprout } from 'lucide-react';
import type { CategoryId } from '../types';

const categoryIcons = {
  'power-tools': Drill,
  'hand-tools': Hammer,
  garden: Sprout,
  electrical: Lightbulb,
  kitchen: CookingPot,
  hardware: Boxes,
} satisfies Record<CategoryId, typeof Drill>;

interface CategoryIconProps {
  category: CategoryId;
  size?: number;
  className?: string;
}

export default function CategoryIcon({ category, size = 24, className = '' }: CategoryIconProps) {
  const Icon = categoryIcons[category];
  return <Icon size={size} strokeWidth={1.8} className={className} aria-hidden="true" />;
}
