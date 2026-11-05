import { Link } from 'react-router-dom';
import { Card, Button } from '@/components/ui';
import RatingStars from './RatingStars';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assetUrl';
import type { Product } from '@/types';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
  className?: string;
}

export default function ProductCard({ product, onQuickAdd, className }: ProductCardProps) {
  const imageUrl = product.images && product.images.length > 0
    ? getAssetUrl(product.images[0])
    : '';

  return (
    <Card
      className={cn('group relative flex flex-col overflow-hidden border-border/40 bg-card transition-luxury hover:shadow-gold', className)}
      data-icod-id="src_components_productcard_tsx_46ab">
      <Link
        to={`/shop/${product.slug}`}
        className="relative aspect-square overflow-hidden bg-muted"
        data-icod-id="src_components_productcard_tsx_f270">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-icod-id="src_components_productcard_tsx_8dea" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 via-accent/50 to-muted transition-luxury group-hover:scale-105"
            data-icod-id="src_components_productcard_tsx_5a2b">
            <ShoppingBag
              className="h-16 w-16 text-primary/20"
              data-icod-id="src_components_productcard_tsx_775a" />
          </div>
        )}
        {product.comparePrice && product.comparePrice > product.price && (
          <span
            className="absolute left-3 top-3 rounded-sm bg-destructive px-2 py-0.5 text-xs font-medium text-destructive-foreground"
            data-icod-id="src_components_productcard_tsx_e2bb">
            SALE
          </span>
        )}
        {onQuickAdd && (
          <div
            className="absolute inset-x-0 bottom-0 translate-y-full p-3 opacity-0 transition-luxury group-hover:translate-y-0 group-hover:opacity-100"
            data-icod-id="src_components_productcard_tsx_8c67">
            <Button
              size="sm"
              className="w-full"
              onClick={(e) => { e.preventDefault(); onQuickAdd(product); }}
              data-icod-id="src_components_productcard_tsx_a87f">
              Add to Cart
            </Button>
          </div>
        )}
      </Link>
      <div
        className="flex flex-1 flex-col gap-1.5 p-4"
        data-icod-id="src_components_productcard_tsx_25c9">
        <p
          className="text-xs uppercase tracking-wider text-muted-foreground"
          data-icod-id="src_components_productcard_tsx_fa3a">
          {typeof product.category === 'object' ? product.category.name : ''}
        </p>
        <Link
          to={`/shop/${product.slug}`}
          data-icod-id="src_components_productcard_tsx_a8bb">
          <h3
            className="font-serif text-base font-medium text-foreground transition-luxury group-hover:text-primary"
            data-icod-id="src_components_productcard_tsx_6eeb">
            {product.name}
          </h3>
        </Link>
        <RatingStars
          rating={product.rating}
          size="sm"
          showCount
          count={product.numReviews}
          data-icod-id="src_components_productcard_tsx_6337" />
        <div
          className="mt-auto flex items-baseline gap-2 pt-2"
          data-icod-id="src_components_productcard_tsx_1bbf">
          <span
            className="font-serif text-lg font-semibold text-foreground"
            data-icod-id="src_components_productcard_tsx_ce8d">₨{product.price.toLocaleString()}</span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span
              className="text-sm text-muted-foreground line-through"
              data-icod-id="src_components_productcard_tsx_8d3f">₨{product.comparePrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </Card>
  );
}
