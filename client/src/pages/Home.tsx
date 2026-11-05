import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchFeatured, fetchCategories } from '@/store/slices/productsSlice';
import { addItem } from '@/store/slices/cartSlice';
import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import TestimonialCard from '@/components/TestimonialCard';
import Newsletter from '@/components/Newsletter';
import { Spinner } from '@/components/ui';
import type { Product } from '@/types';

const testimonials = [
  { quote: 'Royal Oud is unlike anything I have ever worn. The depth and longevity are extraordinary.', author: 'Ayesha K.', location: 'Lahore' },
  { quote: 'ScentoraX has redefined what Pakistani fragrance can be. Emperor\'s Reserve is pure art.', author: 'Hassan R.', location: 'Karachi' },
  { quote: 'I receive compliments every single time I wear Kashmir Noir. It is my signature now.', author: 'Fatima S.', location: 'Islamabad' },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { featured, featuredStatus, categories, categoriesStatus } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (featuredStatus === 'idle') dispatch(fetchFeatured());
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [dispatch, featuredStatus, categoriesStatus]);

  const handleQuickAdd = (product: Product) => {
    dispatch(addItem({ product }));
  };

  return (
    <div className="min-h-screen" data-icod-id="src_pages_home_tsx_1248">
      <HeroSection data-icod-id="src_pages_home_tsx_cf1d" />
      {/* Featured Products */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 md:px-8"
        data-icod-id="src_pages_home_tsx_bb65">
        <div className="mb-10 text-center" data-icod-id="src_pages_home_tsx_164a">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_home_tsx_2611">Curated Selection</p>
          <h2
            className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl"
            data-icod-id="src_pages_home_tsx_82c3">Featured Fragrances</h2>
        </div>
        {featuredStatus === 'loading' ? (
          <div
            className="flex justify-center py-16"
            data-icod-id="src_pages_home_tsx_14d3"><Spinner size="lg" data-icod-id="src_pages_home_tsx_af78" /></div>
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            data-icod-id="src_pages_home_tsx_776a">
            {featured.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickAdd={handleQuickAdd}
                data-icod-id={`src_pages_home_tsx_4f12_${product._id}`} />
            ))}
          </div>
        )}
      </section>
      {/* Categories */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 md:px-8"
        data-icod-id="src_pages_home_tsx_0aba">
        <div className="mb-10 text-center" data-icod-id="src_pages_home_tsx_06e1">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_home_tsx_f919">Explore</p>
          <h2
            className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl"
            data-icod-id="src_pages_home_tsx_547d">Our Collections</h2>
        </div>
        {categoriesStatus === 'loading' ? (
          <div
            className="flex justify-center py-16"
            data-icod-id="src_pages_home_tsx_0966"><Spinner size="lg" data-icod-id="src_pages_home_tsx_9445" /></div>
        ) : (
          <div
            className="grid gap-6 sm:grid-cols-3"
            data-icod-id="src_pages_home_tsx_c37b">
            {categories.map((category) => (
              <CategoryCard
                key={category._id}
                category={category}
                data-icod-id={`src_pages_home_tsx_c023_${category._id}`} />
            ))}
          </div>
        )}
      </section>
      {/* Brand Story Section */}
      <section
        className="border-y border-border/40 bg-card/30 py-20"
        data-icod-id="src_pages_home_tsx_003e">
        <div
          className="mx-auto max-w-3xl px-4 text-center md:px-8"
          data-icod-id="src_pages_home_tsx_d791">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_home_tsx_5153">Our Philosophy</p>
          <h2
            className="mt-4 font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl"
            data-icod-id="src_pages_home_tsx_144e">
            The Art of Pakistani Perfumery
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed text-muted-foreground"
            data-icod-id="src_pages_home_tsx_07e7">
            Every ScentoraX fragrance is a love letter to Pakistan&apos;s rich olfactory heritage. 
            From the ancient attar makers of Lahore to the modern perfumer&apos;s atelier, we bridge 
            centuries of tradition with contemporary artistry. Our ingredients are sourced from the 
            finest origins — Cambodian oud, Taif roses, Kashmiri saffron — composed into fragrances 
            that leave an indelible signature.
          </p>
        </div>
      </section>
      {/* Testimonials */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 md:px-8"
        data-icod-id="src_pages_home_tsx_f43f">
        <div className="mb-10 text-center" data-icod-id="src_pages_home_tsx_56df">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_home_tsx_ba86">Voices</p>
          <h2
            className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl"
            data-icod-id="src_pages_home_tsx_026d">What They Say</h2>
        </div>
        <div
          className="grid gap-6 md:grid-cols-3"
          data-icod-id="src_pages_home_tsx_dc63">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} data-icod-id={`src_pages_home_tsx_0d73_${i}`} {...t} />
          ))}
        </div>
      </section>
      {/* Lifestyle Grid */}
      <section
        className="mx-auto max-w-7xl px-4 py-20 md:px-8"
        data-icod-id="src_pages_home_tsx_f803">
        <div className="mb-10 text-center" data-icod-id="src_pages_home_tsx_a8ea">
          <p
            className="heading-luxury text-xs tracking-[0.3em] text-primary"
            data-icod-id="src_pages_home_tsx_9ab6">@ScentoraX</p>
          <h2
            className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl"
            data-icod-id="src_pages_home_tsx_1a9a">The ScentoraX Lifestyle</h2>
        </div>
        <div
          className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
          data-icod-id="src_pages_home_tsx_28ca">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square overflow-hidden rounded-lg bg-gradient-to-br ${
                ['from-primary/15 via-accent to-muted', 'from-[#1a0a2e] to-[#0a0a0a]', 'from-[#0a1628] to-[#0a0a0a]', 'from-primary/10 to-card'][i]
              }`}
              data-icod-id={`src_pages_home_tsx_1b25_${i}`}>
              <div
                className="flex h-full w-full items-center justify-center"
                data-icod-id={`src_pages_home_tsx_0a29_${i}`}>
                <span
                  className="text-xs uppercase tracking-widest text-muted-foreground/40"
                  data-icod-id={`src_pages_home_tsx_0c95_${i}`}>Lifestyle</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Newsletter data-icod-id="src_pages_home_tsx_4996" />
    </div>
  );
}
