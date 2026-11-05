import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, User } from 'lucide-react';
import { Button, buttonClass } from '@/components/ui';
import SearchOverlay from './SearchOverlay';
import { useAppSelector } from '@/store/hooks';
import { cn } from '@/utils/cn';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useAppSelector((s) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0));
  const user = useAppSelector((s) => s.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Shop', to: '/shop' },
    { label: 'About', to: '/about' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-all duration-300',
          scrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur-md' : 'bg-transparent'
        )}
        data-icod-id="src_components_navbar_tsx_4753">
        <div
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8"
          data-icod-id="src_components_navbar_tsx_0aff">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Menu"
            data-icod-id="src_components_navbar_tsx_741a">
            <Menu className="h-5 w-5" data-icod-id="src_components_navbar_tsx_feb7" />
          </Button>

          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-xl font-bold tracking-wider text-foreground md:text-2xl"
            data-icod-id="src_components_navbar_tsx_716f">
            <span className="text-primary" data-icod-id="src_components_navbar_tsx_d4b3">Scentora</span>X
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-8 md:flex"
            data-icod-id="src_components_navbar_tsx_f514">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="heading-luxury text-xs font-medium text-muted-foreground hover:text-primary transition-luxury"
                data-icod-id={`src_components_navbar_tsx_7ac8_${link.to}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div
            className="flex items-center gap-1"
            data-icod-id="src_components_navbar_tsx_4bfa">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              data-icod-id="src_components_navbar_tsx_ef2c">
              <Search className="h-5 w-5" data-icod-id="src_components_navbar_tsx_9827" />
            </Button>
            <Link
              to={user ? '/account' : '/auth'}
              data-icod-id="src_components_navbar_tsx_e97b">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
                data-icod-id="src_components_navbar_tsx_eab0">
                {user ? <User className="h-5 w-5" data-icod-id="src_components_navbar_tsx_8dad" /> : <User className="h-5 w-5" data-icod-id="src_components_navbar_tsx_ab1f" />}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/cart')}
              aria-label="Cart"
              className="relative"
              data-icod-id="src_components_navbar_tsx_7099">
              <ShoppingBag className="h-5 w-5" data-icod-id="src_components_navbar_tsx_c74b" />
              {cartCount > 0 && (
                <span
                  className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground"
                  data-icod-id="src_components_navbar_tsx_6dec">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          data-icod-id="src_components_navbar_tsx_a5b5">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            data-icod-id="src_components_navbar_tsx_df1f" />
          <div
            className="absolute inset-y-0 left-0 w-72 bg-card p-6 shadow-2xl"
            data-icod-id="src_components_navbar_tsx_a97f">
            <div
              className="mb-8 flex items-center justify-between"
              data-icod-id="src_components_navbar_tsx_84fe">
              <span
                className="font-serif text-lg font-bold text-foreground"
                data-icod-id="src_components_navbar_tsx_aca7">
                <span className="text-primary" data-icod-id="src_components_navbar_tsx_eb92">Scentora</span>X
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                data-icod-id="src_components_navbar_tsx_5be3">
                <X className="h-5 w-5" data-icod-id="src_components_navbar_tsx_5ba1" />
              </Button>
            </div>
            <nav
              className="flex flex-col gap-4"
              data-icod-id="src_components_navbar_tsx_5d58">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="heading-luxury text-sm font-medium text-foreground hover:text-primary transition-luxury"
                  data-icod-id={`src_components_navbar_tsx_579e_${link.to}`}>
                  {link.label}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="heading-luxury text-sm font-medium text-foreground hover:text-primary transition-luxury"
                  data-icod-id="src_components_navbar_tsx_2b0a">
                  Sign In
                </Link>
              )}
              {user && (
                <Link
                  to="/account"
                  onClick={() => setMobileOpen(false)}
                  className="heading-luxury text-sm font-medium text-foreground hover:text-primary transition-luxury"
                  data-icod-id="src_components_navbar_tsx_9d5b">
                  My Account
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        data-icod-id="src_components_navbar_tsx_e120" />
    </>
  );
}
