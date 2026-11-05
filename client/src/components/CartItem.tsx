import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/utils/cn';
import { getAssetUrl } from '@/utils/assetUrl';
import type { CartItem } from '@/types';

interface CartItemComponentProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  className?: string;
}

export default function CartItemComponent({
  item,
  onUpdateQuantity,
  onRemove,
  className,
}: CartItemComponentProps) {
  const imageUrl = item.product.images && item.product.images.length > 0
    ? getAssetUrl(item.product.images[0])
    : '';

  return (
    <div
      className={cn('flex gap-4 border-b border-border/40 py-4', className)}
      data-icod-id="src_components_cartitem_tsx_45d3">
      <div
        className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted"
        data-icod-id="src_components_cartitem_tsx_6ed3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.product.name}
            className="h-full w-full object-cover"
            data-icod-id="src_components_cartitem_tsx_c85b" />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/20 via-accent to-muted"
            data-icod-id="src_components_cartitem_tsx_1352">
            <ShoppingBag
              className="h-8 w-8 text-primary/40"
              data-icod-id="src_components_cartitem_tsx_30e0" />
          </div>
        )}
      </div>
      <div
        className="flex flex-1 flex-col gap-1"
        data-icod-id="src_components_cartitem_tsx_593c">
        <h4
          className="font-serif text-sm font-medium text-foreground"
          data-icod-id="src_components_cartitem_tsx_c91e">{item.product.name}</h4>
        <p
          className="text-xs text-muted-foreground"
          data-icod-id="src_components_cartitem_tsx_f22d">{item.product.size}ml</p>
        <p
          className="mt-auto font-medium text-primary"
          data-icod-id="src_components_cartitem_tsx_4238">₨{item.product.price.toLocaleString()}</p>
      </div>
      <div
        className="flex flex-col items-end gap-2"
        data-icod-id="src_components_cartitem_tsx_7cff">
        <div
          className="flex items-center gap-2"
          data-icod-id="src_components_cartitem_tsx_d674">
          <button
            onClick={() => onUpdateQuantity(item.product._id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-sm text-foreground hover:bg-muted disabled:opacity-40 transition-luxury"
            data-icod-id="src_components_cartitem_tsx_3293">
            −
          </button>
          <span
            className="w-6 text-center text-sm text-foreground"
            data-icod-id="src_components_cartitem_tsx_84c6">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.product._id, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-sm text-foreground hover:bg-muted transition-luxury"
            data-icod-id="src_components_cartitem_tsx_6881">
            +
          </button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.product._id)}
          className="text-xs text-destructive hover:text-destructive"
          data-icod-id="src_components_cartitem_tsx_b843">
          Remove
        </Button>
      </div>
    </div>
  );
}
