import { Link } from 'react-router-dom';
import { ArrowRight, CompassIcon, Home } from 'lucide-react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFound() {
  useDocumentTitle('Page Not Found');

  return (
    <div className="container-page grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-orange-50 text-brand-orange">
          <CompassIcon size={36} />
        </span>
        <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.18em] text-brand-orange">
          404
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink-primary sm:text-4xl">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-3 max-w-md text-ink-secondary">
          The page you&apos;re looking for may have been moved or doesn&apos;t exist. Let&apos;s get
          you back on track.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/shop" className="btn-ghost">
            Browse Shop <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
