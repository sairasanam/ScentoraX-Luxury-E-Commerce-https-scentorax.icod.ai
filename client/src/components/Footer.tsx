import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const quickLinks = [
  { label: 'Shop All', to: '/shop' },
  { label: 'Oud Collection', to: '/shop?category=oud-collection' },
  { label: 'Fresh & Floral', to: '/shop?category=fresh-floral' },
  { label: 'Signature Blends', to: '/shop?category=signature-blends' },
];

const serviceLinks = [
  { label: 'Contact Us', to: '/about' },
  { label: 'Shipping Policy', to: '/about' },
  { label: 'Returns & Exchanges', to: '/about' },
  { label: 'FAQ', to: '/about' },
];

export default function Footer() {
  return (
    <footer
      className="border-t border-border/40 bg-card/30"
      data-icod-id="src_components_footer_tsx_aee1">
      <div
        className="mx-auto max-w-7xl px-4 py-16 md:px-8"
        data-icod-id="src_components_footer_tsx_26c6">
        <div
          className="grid gap-12 md:grid-cols-4"
          data-icod-id="src_components_footer_tsx_e4a3">
          {/* Brand */}
          <div className="space-y-4" data-icod-id="src_components_footer_tsx_3672">
            <Link
              to="/"
              className="font-serif text-xl font-bold tracking-wider text-foreground"
              data-icod-id="src_components_footer_tsx_3fab">
              <span className="text-primary" data-icod-id="src_components_footer_tsx_9e01">Scentora</span>X
            </Link>
            <p
              className="text-sm leading-relaxed text-muted-foreground"
              data-icod-id="src_components_footer_tsx_a8bb">
              Leave a Signature. Pakistani luxury fragrances crafted with rare ingredients and timeless sophistication.
            </p>
            <div className="flex gap-3 pt-2" data-icod-id="src_components_footer_tsx_a928">
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-luxury"
                data-icod-id="src_components_footer_tsx_94c6">
                <Instagram className="h-5 w-5" data-icod-id="src_components_footer_tsx_f614" />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-luxury"
                data-icod-id="src_components_footer_tsx_f3ab">
                <Facebook className="h-5 w-5" data-icod-id="src_components_footer_tsx_0ff7" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-luxury"
                data-icod-id="src_components_footer_tsx_acca">
                <Twitter className="h-5 w-5" data-icod-id="src_components_footer_tsx_a2cf" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div data-icod-id="src_components_footer_tsx_44bc">
            <h4
              className="heading-luxury mb-4 text-xs font-bold text-foreground"
              data-icod-id="src_components_footer_tsx_b464">Shop</h4>
            <ul className="space-y-2" data-icod-id="src_components_footer_tsx_6c7f">
              {quickLinks.map((link) => (
                <li
                  key={link.label}
                  data-icod-id={`src_components_footer_tsx_7b03_${link.label}`}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-luxury"
                    data-icod-id={`src_components_footer_tsx_dbdb_${link.label}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div data-icod-id="src_components_footer_tsx_2a47">
            <h4
              className="heading-luxury mb-4 text-xs font-bold text-foreground"
              data-icod-id="src_components_footer_tsx_8aac">Customer Service</h4>
            <ul className="space-y-2" data-icod-id="src_components_footer_tsx_1793">
              {serviceLinks.map((link) => (
                <li
                  key={link.label}
                  data-icod-id={`src_components_footer_tsx_2bfd_${link.label}`}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-primary transition-luxury"
                    data-icod-id={`src_components_footer_tsx_1b71_${link.label}`}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div data-icod-id="src_components_footer_tsx_ce88">
            <h4
              className="heading-luxury mb-4 text-xs font-bold text-foreground"
              data-icod-id="src_components_footer_tsx_52af">Contact</h4>
            <ul
              className="space-y-2 text-sm text-muted-foreground"
              data-icod-id="src_components_footer_tsx_91d2">
              <li data-icod-id="src_components_footer_tsx_180c">info@scentorax.com</li>
              <li data-icod-id="src_components_footer_tsx_054d">+92 300 1234567</li>
              <li data-icod-id="src_components_footer_tsx_ae89">Lahore, Pakistan</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-16 border-t border-border/40 pt-8 text-center text-xs text-muted-foreground"
          data-icod-id="src_components_footer_tsx_d941">
          &copy; {new Date().getFullYear()} ScentoraX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
