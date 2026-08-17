import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, X } from 'lucide-react';
import Logo from './Logo';
import CartDrawer from './CartDrawer';
import { useCartStore } from '../store/cartStore';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const totalItems = useCartStore((s) => s.totalItems());

  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [bounce, setBounce] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);
  const prevCount = useRef(totalItems);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Bounce the badge whenever the item count increases.
  useEffect(() => {
    if (totalItems > prevCount.current) {
      setBounce(true);
      const t = window.setTimeout(() => setBounce(false), 500);
      prevCount.current = totalItems;
      return () => window.clearTimeout(t);
    }
    prevCount.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const runSearch = () => {
    navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
    setSearchOpen(false);
    setMobileOpen(false);
  };

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    runSearch();
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? 'text-brand-orange' : 'text-gray-200 hover:text-brand-orange'
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-brand-dark transition-shadow duration-300 ${
          scrolled ? 'shadow-nav' : ''
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Link to="/" aria-label="Jayakirana home">
            <Logo dark />
          </Link>

          {/* desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l) =>
              l.to.includes('#') ? (
                <a
                  key={l.label}
                  href={l.to}
                  className="text-sm font-semibold text-gray-200 transition-colors hover:text-brand-orange"
                >
                  {l.label}
                </a>
              ) : (
                <NavLink key={l.label} to={l.to} className={linkClass} end={l.to === '/'}>
                  {l.label}
                </NavLink>
              ),
            )}
          </nav>

          {/* right actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* search */}
            <form
              onSubmit={submitSearch}
              className={`hidden items-center overflow-hidden rounded-full bg-white/10 transition-all duration-300 sm:flex ${
                searchOpen ? 'w-52 px-3' : 'w-9'
              }`}
            >
              <button
                type="button"
                aria-label="Toggle search"
                onClick={() => (searchOpen ? runSearch() : setSearchOpen(true))}
                className="grid h-9 w-9 flex-shrink-0 place-items-center text-gray-200 hover:text-brand-orange"
              >
                <Search size={20} />
              </button>
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className={`bg-transparent text-sm text-white placeholder:text-gray-400 focus:outline-none ${
                  searchOpen ? 'w-full' : 'w-0'
                }`}
              />
            </form>

            {/* cart */}
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full text-gray-100 transition-colors hover:bg-white/10 hover:text-brand-orange"
            >
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span
                  className={`absolute -right-0.5 -top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-brand-orange px-1 text-[11px] font-bold text-white ${
                    bounce ? 'animate-bounce-badge' : ''
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </button>

            <Link to="/contact" className="hidden btn-primary !px-5 !py-2.5 md:inline-flex">
              Get a Quote
            </Link>

            {/* mobile menu toggle */}
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-gray-100 hover:bg-white/10 lg:hidden"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-brand-dark lg:hidden">
          <div className="container-page flex h-16 items-center justify-between">
            <Logo dark />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-full text-gray-100 hover:bg-white/10"
            >
              <X size={26} />
            </button>
          </div>
          <form onSubmit={submitSearch} className="container-page mt-2">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5">
              <Search size={20} className="text-gray-300" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products…"
                className="w-full bg-transparent text-white placeholder:text-gray-400 focus:outline-none"
              />
            </div>
          </form>
          <nav className="container-page mt-8 flex flex-col gap-2">
            {navLinks.map((l) =>
              l.to.includes('#') ? (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-4 text-xl font-semibold text-white"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-white/10 py-4 text-xl font-semibold text-white"
                >
                  {l.label}
                </Link>
              ),
            )}
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-6 w-full"
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
