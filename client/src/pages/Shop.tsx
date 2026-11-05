import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, fetchCategories, setFilters } from '@/store/slices/productsSlice';
import { addItem } from '@/store/slices/cartSlice';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { Spinner, Button } from '@/components/ui';
import { SlidersHorizontal, X } from 'lucide-react';
import type { Product } from '@/types';

export default function Shop() {
  const dispatch = useAppDispatch();
  const { items, categories, total, page, pages, filters, status, categoriesStatus } = useAppSelector((s) => s.products);
  const [searchParams] = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [dispatch, categoriesStatus]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const newFilters = { ...filters };
    if (categoryParam) newFilters.category = categoryParam;
    dispatch(setFilters(newFilters));
    dispatch(fetchProducts(newFilters));
  }, [dispatch, searchParams]);

  const handleFilterChange = (key: string, value: string | undefined) => {
    const updated = { ...filters, [key]: value || undefined };
    if (!value) delete updated[key];
    dispatch(setFilters(updated));
    dispatch(fetchProducts({ ...updated, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    dispatch(fetchProducts({ ...filters, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (product: Product) => {
    dispatch(addItem({ product }));
  };

  return (
    <div className="min-h-screen pt-20" data-icod-id="src_pages_shop_tsx_3e79">
      <div
        className="mx-auto max-w-7xl px-4 md:px-8"
        data-icod-id="src_pages_shop_tsx_b3d2">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]}
          className="mb-6"
          data-icod-id="src_pages_shop_tsx_2458" />

        <div
          className="mb-8 flex items-center justify-between"
          data-icod-id="src_pages_shop_tsx_3672">
          <h1
            className="font-serif text-3xl font-bold text-foreground"
            data-icod-id="src_pages_shop_tsx_092b">Our Collection</h1>
          <Button
            variant="outline"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            data-icod-id="src_pages_shop_tsx_d150">
            <SlidersHorizontal className="h-4 w-4" data-icod-id="src_pages_shop_tsx_94c2" /> Filters
          </Button>
        </div>

        <div className="flex gap-8" data-icod-id="src_pages_shop_tsx_b6fa">
          {/* Sidebar Filters */}
          <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-card p-6 shadow-2xl transition-transform md:relative md:z-auto md:w-56 md:translate-x-0 md:bg-transparent md:p-0 md:shadow-none ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}
            data-icod-id="src_pages_shop_tsx_d23b">
            {mobileFiltersOpen && (
              <div
                className="absolute inset-0 -z-10 bg-foreground/40 backdrop-blur-sm md:hidden"
                onClick={() => setMobileFiltersOpen(false)}
                data-icod-id="src_pages_shop_tsx_6b81" />
            )}
            <div
              className="relative space-y-8 md:sticky md:top-24"
              data-icod-id="src_pages_shop_tsx_6228">
              <div
                className="flex items-center justify-between md:hidden"
                data-icod-id="src_pages_shop_tsx_d301">
                <h3
                  className="heading-luxury text-sm font-bold text-foreground"
                  data-icod-id="src_pages_shop_tsx_cf0a">Filters</h3>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-muted-foreground"
                  data-icod-id="src_pages_shop_tsx_cdd3"><X className="h-5 w-5" data-icod-id="src_pages_shop_tsx_26d5" /></button>
              </div>

              {/* Category Filter */}
              <div data-icod-id="src_pages_shop_tsx_f04a">
                <h3
                  className="heading-luxury mb-3 text-xs font-bold text-foreground"
                  data-icod-id="src_pages_shop_tsx_62c8">Category</h3>
                <div className="space-y-2" data-icod-id="src_pages_shop_tsx_62e0">
                  <button
                    onClick={() => handleFilterChange('category', undefined)}
                    className={`block text-sm transition-luxury ${!filters.category ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                    data-icod-id="src_pages_shop_tsx_655f">
                    All Fragrances
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => handleFilterChange('category', cat.slug)}
                      className={`block text-sm transition-luxury ${filters.category === cat.slug ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      data-icod-id={`src_pages_shop_tsx_a9c4_${cat._id}`}>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div data-icod-id="src_pages_shop_tsx_f0ff">
                <h3
                  className="heading-luxury mb-3 text-xs font-bold text-foreground"
                  data-icod-id="src_pages_shop_tsx_f34c">Sort By</h3>
                <select
                  value={filters.sort || 'newest'}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/40"
                  data-icod-id="src_pages_shop_tsx_71c5">
                  <option value="newest" data-icod-id="src_pages_shop_tsx_3403">Newest</option>
                  <option value="price-asc" data-icod-id="src_pages_shop_tsx_def0">Price: Low to High</option>
                  <option value="price-desc" data-icod-id="src_pages_shop_tsx_c109">Price: High to Low</option>
                  <option value="rating" data-icod-id="src_pages_shop_tsx_f60d">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div data-icod-id="src_pages_shop_tsx_3ada">
                <h3
                  className="heading-luxury mb-3 text-xs font-bold text-foreground"
                  data-icod-id="src_pages_shop_tsx_846d">Price Range</h3>
                <div className="space-y-2" data-icod-id="src_pages_shop_tsx_bdd9">
                  {[
                    { label: 'All Prices', min: undefined, max: undefined },
                    { label: 'Under ₨5,000', min: undefined, max: 5000 },
                    { label: '₨5,000 – ₨8,000', min: 5000, max: 8000 },
                    { label: 'Over ₨8,000', min: 8000, max: undefined },
                  ].map((range) => (
                    <button
                      key={range.label}
                      onClick={() => {
                        handleFilterChange('minPrice', range.min !== undefined ? String(range.min) : undefined);
                        handleFilterChange('maxPrice', range.max !== undefined ? String(range.max) : undefined);
                      }}
                      className="block text-sm text-muted-foreground hover:text-foreground transition-luxury"
                      data-icod-id={`src_pages_shop_tsx_b935_${range.label}`}>
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1" data-icod-id="src_pages_shop_tsx_5e20">
            {status === 'loading' ? (
              <div
                className="flex justify-center py-20"
                data-icod-id="src_pages_shop_tsx_9f86"><Spinner size="lg" data-icod-id="src_pages_shop_tsx_c64d" /></div>
            ) : items.length === 0 ? (
              <div
                className="py-20 text-center text-muted-foreground"
                data-icod-id="src_pages_shop_tsx_cbc0">No products found.</div>
            ) : (
              <>
                <p
                  className="mb-6 text-sm text-muted-foreground"
                  data-icod-id="src_pages_shop_tsx_296d">{total} fragrances</p>
                <div
                  className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                  data-icod-id="src_pages_shop_tsx_426c">
                  {items.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onQuickAdd={handleQuickAdd}
                      data-icod-id={`src_pages_shop_tsx_c831_${product._id}`} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <div
                    className="mt-12 flex justify-center gap-2"
                    data-icod-id="src_pages_shop_tsx_065c">
                    {Array.from({ length: pages }).map((_, i) => (
                      <Button
                        key={i}
                        variant={page === i + 1 ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handlePageChange(i + 1)}
                        data-icod-id={`src_pages_shop_tsx_d41e_${i}`}>
                        {i + 1}
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
