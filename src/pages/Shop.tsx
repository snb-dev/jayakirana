import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { BRANDS, categories, formatLKR, products } from '../data/products';
import type { Brand, CategoryId, Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductCardSkeleton from '../components/ProductCardSkeleton';
import CategoryIcon from '../components/CategoryIcon';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const PRICE_MAX = 15000;
const PAGE_SIZE = 12;

export default function Shop() {
  useDocumentTitle('Shop');
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>([]);
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('featured');
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Brief simulated load on first mount so the catalogue does not just pop in.
  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 450);
    return () => window.clearTimeout(t);
  }, []);

  // Initialise from URL params (?q= and ?category=) coming from Navbar / category grid.
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category') as CategoryId | null;
    if (q !== null) setQuery(q);
    if (cat && categories.some((c) => c.id === cat)) setSelectedCategories([cat]);
  }, [searchParams]);

  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
    setPage(1);
  };

  const toggleBrand = (b: Brand) => {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
    setPage(1);
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMaxPrice(PRICE_MAX);
    setInStockOnly(false);
    setSort('featured');
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list: Product[] = products.filter((p) => {
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesPrice = p.price <= maxPrice;
      const matchesStock = !inStockOnly || p.inStock;
      return matchesQuery && matchesCategory && matchesBrand && matchesPrice && matchesStock;
    });

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    return list;
  }, [query, selectedCategories, selectedBrands, maxPrice, inStockOnly, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const FiltersPanel = (
    <div className="space-y-7">
      {/* search */}
      <div>
        <label className="mb-2 block text-sm font-bold text-ink-primary">Search</label>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name or brand…"
            className="input-field pl-9"
          />
        </div>
      </div>

      {/* categories */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-ink-primary">Category</h3>
        <div className="space-y-2.5">
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={selectedCategories.includes(c.id)}
                onChange={() => toggleCategory(c.id)}
                className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
              />
              <span className="flex items-center gap-2 text-ink-secondary">
                <CategoryIcon category={c.id} size={16} /> {c.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* price */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-ink-primary">Max Price</h3>
        <input
          type="range"
          min={0}
          max={PRICE_MAX}
          step={100}
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(Number(e.target.value));
            setPage(1);
          }}
          className="w-full accent-brand-orange"
        />
        <div className="mt-1 flex justify-between text-xs text-ink-secondary">
          <span>LKR 0</span>
          <span className="font-semibold text-brand-orange">{formatLKR(maxPrice)}</span>
        </div>
      </div>

      {/* brand */}
      <div>
        <h3 className="mb-3 text-sm font-bold text-ink-primary">Brand</h3>
        <div className="space-y-2.5">
          {BRANDS.map((b) => (
            <label key={b} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="checkbox"
                checked={selectedBrands.includes(b)}
                onChange={() => toggleBrand(b)}
                className="h-4 w-4 rounded border-gray-300 text-brand-orange focus:ring-brand-orange"
              />
              <span className="text-ink-secondary">{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* in stock */}
      <label className="flex cursor-pointer items-center justify-between">
        <span className="text-sm font-bold text-ink-primary">In Stock Only</span>
        <span className="relative inline-block">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => {
              setInStockOnly(e.target.checked);
              setPage(1);
            }}
            className="peer sr-only"
          />
          <span className="block h-6 w-11 rounded-full bg-gray-300 transition-colors peer-checked:bg-brand-orange" />
          <span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
        </span>
      </label>

      <button type="button" onClick={clearFilters} className="btn-ghost w-full justify-center">
        Clear Filters
      </button>
    </div>
  );

  return (
    <div className="container-page py-8 lg:py-10">
      <div className="mb-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-orange">The catalogue</p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink-primary sm:text-4xl">Everything in one place</h1>
        <p className="mt-1 text-sm text-ink-secondary">
          Browse our curated range of hardware, tools, garden, electrical, and home essentials.
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* sidebar (desktop) */}
        <aside className="hidden w-[260px] flex-shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-white p-5 shadow-card">
            {FiltersPanel}
          </div>
        </aside>

        {/* main */}
        <div className="min-w-0 flex-1">
          <div className="mb-5 flex items-center justify-between gap-3">
            <p className="text-sm text-ink-secondary">
              Showing <span className="font-semibold text-ink-primary">{filtered.length}</span>{' '}
              product{filtered.length !== 1 && 's'}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="btn-ghost gap-2 lg:hidden"
              >
                <SlidersHorizontal size={16} /> Filters
              </button>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="input-field w-auto cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : paged.length === 0 ? (
            <div className="grid place-items-center rounded-xl border border-dashed border-border bg-white py-20 text-center">
              <p className="text-lg font-semibold text-ink-primary">No products found</p>
              <p className="mt-1 text-sm text-ink-secondary">Try adjusting your filters.</p>
              <button type="button" onClick={clearFilters} className="btn-primary mt-5">
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paged.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => {
                          setPage(n);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`grid h-10 w-10 place-items-center rounded-lg text-sm font-semibold transition-colors ${
                          n === currentPage
                            ? 'bg-brand-orange text-white shadow'
                            : 'border border-border bg-white text-ink-secondary hover:border-brand-orange hover:text-brand-orange'
                        }`}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* mobile filters bottom sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-slide-up overflow-y-auto rounded-t-2xl bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="grid h-9 w-9 place-items-center rounded-full text-ink-secondary hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            {FiltersPanel}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              Show {filtered.length} Result{filtered.length !== 1 && 's'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
