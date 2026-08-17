import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-ink-secondary">
      <Link to="/" className="flex items-center gap-1 hover:text-brand-orange">
        <Home size={13} />
      </Link>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight size={13} className="text-gray-300" />
          {item.to && i !== items.length - 1 ? (
            <Link to={item.to} className="hover:text-brand-orange">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-primary" aria-current="page">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}
