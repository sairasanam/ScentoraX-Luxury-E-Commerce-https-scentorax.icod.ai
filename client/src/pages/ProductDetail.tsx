import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Minus, Plus } from 'lucide-react';
import { useAppDispatch } from '@/store/hooks';
import { addItem } from '@/store/slices/cartSlice';
import { fetchProductBySlugRequest, fetchProductReviewsRequest } from '@/services/apiClient';
import Breadcrumb from '@/components/Breadcrumb';
import RatingStars from '@/components/RatingStars';
import ProductCard from '@/components/ProductCard';
import { Button, Spinner, Alert } from '@/components/ui';
import { getAssetUrl } from '@/utils/assetUrl';
import { cn } from '@/utils/cn';
import type { Product, Review } from '@/types';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'notes' | 'reviews'>('description');
  const [added, setAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetchProductBySlugRequest(slug);
        if (res.data) {
          setProduct(res.data);
          const reviewsRes = await fetchProductReviewsRequest(res.data._id);
          if (reviewsRes.data) setReviews(reviewsRes.data);
        }
      } catch {
        // handled by loading state
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItem({ product, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div
        className="flex min-h-[80vh] items-center justify-center pt-20"
        data-icod-id="src_pages_productdetail_tsx_17d5">
        <Spinner size="lg" data-icod-id="src_pages_productdetail_tsx_59f2" />
      </div>
    );
  }

  if (!product) {
    return (
      <div
        className="flex min-h-[60vh] flex-col items-center justify-center gap-4 pt-20 text-center"
        data-icod-id="src_pages_productdetail_tsx_44da">
        <h2
          className="font-serif text-2xl text-foreground"
          data-icod-id="src_pages_productdetail_tsx_94af">Product not found</h2>
        <Link to="/shop" data-icod-id="src_pages_productdetail_tsx_516e"><Button variant="outline" data-icod-id="src_pages_productdetail_tsx_20f0">Back to Shop</Button></Link>
      </div>
    );
  }

  const tabs = [
    { id: 'description' as const, label: 'Description' },
    { id: 'notes' as const, label: 'Fragrance Notes' },
    { id: 'reviews' as const, label: `Reviews (${reviews.length})` },
  ];

  return (
    <div
      className="min-h-screen pt-20"
      data-icod-id="src_pages_productdetail_tsx_d812">
      <div
        className="mx-auto max-w-7xl px-4 py-8 md:px-8"
        data-icod-id="src_pages_productdetail_tsx_444c">
        <Breadcrumb
          items={[
            { label: 'Home', to: '/' },
            { label: 'Shop', to: '/shop' },
            { label: typeof product.category === 'object' ? product.category.name : 'Collection', to: typeof product.category === 'object' ? `/shop?category=${product.category.slug}` : '/shop' },
            { label: product.name },
          ]}
          className="mb-8"
          data-icod-id="src_pages_productdetail_tsx_3bf5" />

        <div
          className="grid gap-10 lg:grid-cols-2"
          data-icod-id="src_pages_productdetail_tsx_2348">
          {/* Image Gallery */}
          <div className="space-y-4" data-icod-id="src_pages_productdetail_tsx_cadf">
            {/* Main Image */}
            <div
              className="aspect-square overflow-hidden rounded-xl bg-muted"
              data-icod-id="src_pages_productdetail_tsx_d9d1">
              {product.images && product.images.length > 0 ? (
                <img
                  src={getAssetUrl(product.images[selectedImageIndex]) || ''}
                  alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                  className="h-full w-full object-cover transition-all duration-300"
                  data-icod-id="src_pages_productdetail_tsx_1473" />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 via-accent/30 to-muted"
                  data-icod-id="src_pages_productdetail_tsx_e0aa">
                  <ShoppingBag
                    className="h-32 w-32 text-primary/20"
                    data-icod-id="src_pages_productdetail_tsx_8ff8" />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery (only if multiple images) */}
            {product.images && product.images.length > 1 && (
              <div
                className="flex gap-3 overflow-x-auto pb-2"
                data-icod-id="src_pages_productdetail_tsx_c4d1">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={cn(
                      'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-luxury',
                      selectedImageIndex === index
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-transparent hover:border-border/60'
                    )}
                    data-icod-id={`src_pages_productdetail_tsx_d00a_${index}`}>
                    <img
                      src={getAssetUrl(image) || ''}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                      data-icod-id={`src_pages_productdetail_tsx_7710_${index}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div
            className="flex flex-col gap-6"
            data-icod-id="src_pages_productdetail_tsx_e6a4">
            <div data-icod-id="src_pages_productdetail_tsx_a32a">
              <p
                className="heading-luxury text-xs tracking-[0.2em] text-primary"
                data-icod-id="src_pages_productdetail_tsx_b521">
                {typeof product.category === 'object' ? product.category.name : ''}
              </p>
              <h1
                className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl"
                data-icod-id="src_pages_productdetail_tsx_f5e8">{product.name}</h1>
              <div
                className="mt-3 flex items-center gap-3"
                data-icod-id="src_pages_productdetail_tsx_e789">
                <RatingStars
                  rating={product.rating}
                  showCount
                  count={product.numReviews}
                  data-icod-id="src_pages_productdetail_tsx_42b2" />
              </div>
            </div>

            <div
              className="flex items-baseline gap-3"
              data-icod-id="src_pages_productdetail_tsx_76b8">
              <span
                className="font-serif text-3xl font-bold text-foreground"
                data-icod-id="src_pages_productdetail_tsx_9e3f">₨{product.price.toLocaleString()}</span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span
                  className="text-lg text-muted-foreground line-through"
                  data-icod-id="src_pages_productdetail_tsx_b31c">₨{product.comparePrice.toLocaleString()}</span>
              )}
            </div>

            <p
              className="leading-relaxed text-muted-foreground"
              data-icod-id="src_pages_productdetail_tsx_1212">{product.shortDescription || product.description.slice(0, 200)}...</p>

            {/* Fragrance Notes Preview */}
            <div
              className="flex flex-wrap gap-2"
              data-icod-id="src_pages_productdetail_tsx_db28">
              {[...product.notes.top, ...product.notes.middle, ...product.notes.base].slice(0, 5).map((note) => (
                <span
                  key={note}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                  data-icod-id={`src_pages_productdetail_tsx_44ed_${note}`}>
                  {note}
                </span>
              ))}
            </div>

            <div
              className="border-t border-border/40 pt-6"
              data-icod-id="src_pages_productdetail_tsx_7093">
              <p
                className="mb-2 text-sm text-muted-foreground"
                data-icod-id="src_pages_productdetail_tsx_377f">Size: {product.size}ml</p>
              <div
                className="flex items-center gap-4"
                data-icod-id="src_pages_productdetail_tsx_ac20">
                <div
                  className="flex items-center gap-3 rounded-lg border border-border/60 p-1"
                  data-icod-id="src_pages_productdetail_tsx_9be8">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-luxury"
                    data-icod-id="src_pages_productdetail_tsx_7083">
                    <Minus className="h-4 w-4" data-icod-id="src_pages_productdetail_tsx_4d4f" />
                  </button>
                  <span
                    className="w-8 text-center text-sm font-medium text-foreground"
                    data-icod-id="src_pages_productdetail_tsx_f5af">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-luxury"
                    data-icod-id="src_pages_productdetail_tsx_0cff">
                    <Plus className="h-4 w-4" data-icod-id="src_pages_productdetail_tsx_1406" />
                  </button>
                </div>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                  data-icod-id="src_pages_productdetail_tsx_572f">
                  Add to Cart — ₨{(product.price * quantity).toLocaleString()}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="Add to Wishlist"
                  data-icod-id="src_pages_productdetail_tsx_545e">
                  <Heart className="h-5 w-5" data-icod-id="src_pages_productdetail_tsx_2f17" />
                </Button>
              </div>
              {added && (
                <Alert
                  variant="success"
                  className="mt-3"
                  data-icod-id="src_pages_productdetail_tsx_a913">Added to cart successfully</Alert>
              )}
              {product.stock < 10 && product.stock > 0 && (
                <p
                  className="mt-2 text-xs text-warning"
                  data-icod-id="src_pages_productdetail_tsx_4867">Only {product.stock} left in stock</p>
              )}
              {product.shippingCost === undefined && (
                <p
                  className="mt-2 text-xs text-success"
                  data-icod-id="src_pages_productdetail_tsx_59ca">Free shipping on orders over ₨3,000</p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16" data-icod-id="src_pages_productdetail_tsx_ea6b">
          <div
            className="flex gap-8 border-b border-border/40"
            data-icod-id="src_pages_productdetail_tsx_7ef6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`heading-luxury pb-3 text-xs font-bold transition-luxury ${
                  activeTab === tab.id ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
                data-icod-id={`src_pages_productdetail_tsx_5ece_${tab.id}`}>
                {tab.label}
              </button>
            ))}
          </div>
          <div className="py-8" data-icod-id="src_pages_productdetail_tsx_009a">
            {activeTab === 'description' && (
              <p
                className="max-w-3xl leading-relaxed text-muted-foreground"
                data-icod-id="src_pages_productdetail_tsx_a48b">{product.description}</p>
            )}
            {activeTab === 'notes' && (
              <div
                className="grid gap-8 sm:grid-cols-3"
                data-icod-id="src_pages_productdetail_tsx_a85f">
                {[
                  { label: 'Top Notes', notes: product.notes.top },
                  { label: 'Heart Notes', notes: product.notes.middle },
                  { label: 'Base Notes', notes: product.notes.base },
                ].map((group) => (
                  <div
                    key={group.label}
                    data-icod-id={`src_pages_productdetail_tsx_a44f_${group.label}`}>
                    <h3
                      className="heading-luxury mb-3 text-xs font-bold text-primary"
                      data-icod-id={`src_pages_productdetail_tsx_355b_${group.label}`}>{group.label}</h3>
                    <div
                      className="flex flex-wrap gap-2"
                      data-icod-id={`src_pages_productdetail_tsx_b4cc_${group.label}`}>
                      {group.notes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full border border-border/60 bg-card px-3 py-1.5 text-sm text-foreground"
                          data-icod-id={`src_pages_productdetail_tsx_59e7_${group.label}_${note}`}>
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="space-y-6" data-icod-id="src_pages_productdetail_tsx_03d3">
                {reviews.length === 0 ? (
                  <p
                    className="text-muted-foreground"
                    data-icod-id="src_pages_productdetail_tsx_9a1d">No reviews yet. Be the first to review this fragrance.</p>
                ) : (
                  reviews.map((review) => (
                    <div
                      key={review._id}
                      className="border-b border-border/40 pb-4"
                      data-icod-id={`src_pages_productdetail_tsx_5b3f_${review._id}`}>
                      <div
                        className="flex items-center gap-3"
                        data-icod-id={`src_pages_productdetail_tsx_dde2_${review._id}`}>
                        <RatingStars
                          rating={review.rating}
                          size="sm"
                          data-icod-id={`src_pages_productdetail_tsx_d67e_${review._id}`} />
                        <span
                          className="text-sm font-medium text-foreground"
                          data-icod-id={`src_pages_productdetail_tsx_1c67_${review._id}`}>
                          {typeof review.user === 'object' ? review.user.name : 'Verified Buyer'}
                        </span>
                      </div>
                      {review.title && <h4
                        className="mt-2 font-medium text-foreground"
                        data-icod-id={`src_pages_productdetail_tsx_c5ac_${review._id}`}>{review.title}</h4>}
                      {review.comment && <p
                        className="mt-1 text-sm text-muted-foreground"
                        data-icod-id={`src_pages_productdetail_tsx_094d_${review._id}`}>{review.comment}</p>}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
