import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeItem, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import CartItemComponent from '@/components/CartItem';
import { Button, EmptyState } from '@/components/ui';
import { ShoppingBag } from 'lucide-react';

export default function Cart() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.cart.items);

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 3000 ? 0 : 250;
  const total = subtotal + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-20" data-icod-id="src_pages_cart_tsx_56b6">
        <div
          className="mx-auto max-w-4xl px-4 py-16 md:px-8"
          data-icod-id="src_pages_cart_tsx_8648">
          <h1
            className="mb-8 font-serif text-3xl font-bold text-foreground"
            data-icod-id="src_pages_cart_tsx_b162">Your Cart</h1>
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Discover our collection of luxury Pakistani fragrances."
            action={<Link to="/shop" data-icod-id="src_pages_cart_tsx_23ca"><Button data-icod-id="src_pages_cart_tsx_2432">Explore Collection</Button></Link>}
            data-icod-id="src_pages_cart_tsx_8513" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" data-icod-id="src_pages_cart_tsx_4c8d">
      <div
        className="mx-auto max-w-6xl px-4 py-8 md:px-8"
        data-icod-id="src_pages_cart_tsx_f7d7">
        <h1
          className="mb-8 font-serif text-3xl font-bold text-foreground"
          data-icod-id="src_pages_cart_tsx_4d08">Your Cart</h1>

        <div
          className="grid gap-8 lg:grid-cols-3"
          data-icod-id="src_pages_cart_tsx_7b83">
          {/* Line Items */}
          <div className="lg:col-span-2" data-icod-id="src_pages_cart_tsx_a865">
            {items.map((item) => (
              <CartItemComponent
                key={item.product._id}
                item={item}
                onUpdateQuantity={(productId, quantity) => dispatch(updateQuantity({ productId, quantity }))}
                onRemove={(productId) => dispatch(removeItem(productId))}
                data-icod-id={`src_pages_cart_tsx_8d43_${item.product._id}`} />
            ))}
            <div className="mt-4 flex justify-end" data-icod-id="src_pages_cart_tsx_8f38">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(clearCart())}
                data-icod-id="src_pages_cart_tsx_0b99">Clear Cart</Button>
            </div>
          </div>

          {/* Order Summary */}
          <div
            className="h-fit rounded-xl border border-border/40 bg-card p-6"
            data-icod-id="src_pages_cart_tsx_2044">
            <h2
              className="heading-luxury mb-6 text-sm font-bold text-foreground"
              data-icod-id="src_pages_cart_tsx_2367">Order Summary</h2>
            <div className="space-y-3 text-sm" data-icod-id="src_pages_cart_tsx_ad34">
              <div
                className="flex justify-between text-muted-foreground"
                data-icod-id="src_pages_cart_tsx_6c70">
                <span data-icod-id="src_pages_cart_tsx_361b">Subtotal</span>
                <span className="text-foreground" data-icod-id="src_pages_cart_tsx_41e6">₨{subtotal.toLocaleString()}</span>
              </div>
              <div
                className="flex justify-between text-muted-foreground"
                data-icod-id="src_pages_cart_tsx_aab2">
                <span data-icod-id="src_pages_cart_tsx_5560">Shipping</span>
                <span className="text-foreground" data-icod-id="src_pages_cart_tsx_a2cb">{shippingCost === 0 ? 'Free' : `₨${shippingCost}`}</span>
              </div>
              {subtotal < 3000 && (
                <p className="text-xs text-primary" data-icod-id="src_pages_cart_tsx_cde8">Add ₨{(3000 - subtotal).toLocaleString()} more for free shipping</p>
              )}
              <div
                className="border-t border-border/40 pt-3"
                data-icod-id="src_pages_cart_tsx_a433">
                <div
                  className="flex justify-between font-serif text-lg font-bold text-foreground"
                  data-icod-id="src_pages_cart_tsx_dfc8">
                  <span data-icod-id="src_pages_cart_tsx_2ed3">Total</span>
                  <span data-icod-id="src_pages_cart_tsx_8f42">₨{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block"
              data-icod-id="src_pages_cart_tsx_9820">
              <Button size="lg" className="w-full" data-icod-id="src_pages_cart_tsx_199a">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
