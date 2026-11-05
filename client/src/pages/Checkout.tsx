import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { createOrder, resetCreateStatus } from '@/store/slices/ordersSlice';
import { clearCart } from '@/store/slices/cartSlice';
import { Button, Input, Field, Alert, Spinner } from '@/components/ui';
import type { ShippingAddress } from '@/types';

export default function Checkout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const items = useAppSelector((s) => s.cart.items);
  const { createStatus, error, lastCreated } = useAppSelector((s) => s.orders);

  const [address, setAddress] = useState<ShippingAddress>({
    street: '', city: '', state: '', postalCode: '', country: 'Pakistan',
  });
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingCost = subtotal >= 3000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shippingCost + tax;

  if (items.length === 0 && !lastCreated) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 pt-20 text-center"
        data-icod-id="src_pages_checkout_tsx_428b">
        <h2
          className="font-serif text-2xl text-foreground"
          data-icod-id="src_pages_checkout_tsx_3eda">Your cart is empty</h2>
        <Button
          variant="outline"
          onClick={() => navigate('/shop')}
          data-icod-id="src_pages_checkout_tsx_5179">Continue Shopping</Button>
      </div>
    );
  }

  if (lastCreated) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 pt-20 text-center"
        data-icod-id="src_pages_checkout_tsx_b6da">
        <div
          className="rounded-full bg-success/10 p-6"
          data-icod-id="src_pages_checkout_tsx_0be7">
          <span className="text-4xl" data-icod-id="src_pages_checkout_tsx_99a0">&#10003;</span>
        </div>
        <h1
          className="font-serif text-3xl font-bold text-foreground"
          data-icod-id="src_pages_checkout_tsx_9784">Order Placed Successfully</h1>
        <p
          className="text-muted-foreground"
          data-icod-id="src_pages_checkout_tsx_a670">
          Order #{lastCreated._id.slice(-8).toUpperCase()} has been confirmed.
          <br data-icod-id="src_pages_checkout_tsx_7c18" />You will receive a confirmation email shortly.
        </p>
        <div className="flex gap-3" data-icod-id="src_pages_checkout_tsx_2285">
          <Button
            onClick={() => { dispatch(resetCreateStatus()); navigate('/account'); }}
            data-icod-id="src_pages_checkout_tsx_8318">View Orders</Button>
          <Button
            variant="outline"
            onClick={() => { dispatch(resetCreateStatus()); navigate('/shop'); }}
            data-icod-id="src_pages_checkout_tsx_7f2a">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createOrder({
      items: items.map((i) => ({ product: i.product._id, quantity: i.quantity })),
      shippingAddress: address,
      paymentMethod,
    })).then(() => {
      dispatch(clearCart());
    });
  };

  return (
    <div className="min-h-screen pt-20" data-icod-id="src_pages_checkout_tsx_b934">
      <div
        className="mx-auto max-w-4xl px-4 py-8 md:px-8"
        data-icod-id="src_pages_checkout_tsx_963d">
        <h1
          className="mb-8 font-serif text-3xl font-bold text-foreground"
          data-icod-id="src_pages_checkout_tsx_f786">Checkout</h1>

        {error && <Alert
          variant="error"
          className="mb-6"
          data-icod-id="src_pages_checkout_tsx_e97c">{error}</Alert>}

        <form
          onSubmit={handleSubmit}
          className="grid gap-8 lg:grid-cols-5"
          data-icod-id="src_pages_checkout_tsx_487b">
          {/* Form */}
          <div
            className="space-y-8 lg:col-span-3"
            data-icod-id="src_pages_checkout_tsx_8926">
            {/* Shipping Address */}
            <section data-icod-id="src_pages_checkout_tsx_43d4">
              <h2
                className="heading-luxury mb-4 text-sm font-bold text-foreground"
                data-icod-id="src_pages_checkout_tsx_4e44">Shipping Address</h2>
              <div
                className="grid gap-4 sm:grid-cols-2"
                data-icod-id="src_pages_checkout_tsx_c4fa">
                <Field
                  label="Street Address"
                  required
                  className="sm:col-span-2"
                  data-icod-id="src_pages_checkout_tsx_c5d0">
                  <Input
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    required
                    data-icod-id="src_pages_checkout_tsx_8d0e" />
                </Field>
                <Field label="City" required data-icod-id="src_pages_checkout_tsx_7411">
                  <Input
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    required
                    data-icod-id="src_pages_checkout_tsx_257c" />
                </Field>
                <Field
                  label="State / Province"
                  required
                  data-icod-id="src_pages_checkout_tsx_7815">
                  <Input
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    data-icod-id="src_pages_checkout_tsx_f7c2" />
                </Field>
                <Field label="Postal Code" required data-icod-id="src_pages_checkout_tsx_dbe4">
                  <Input
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    required
                    data-icod-id="src_pages_checkout_tsx_01b5" />
                </Field>
                <Field label="Country" required data-icod-id="src_pages_checkout_tsx_8ae1">
                  <Input
                    value={address.country}
                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                    required
                    data-icod-id="src_pages_checkout_tsx_1bc1" />
                </Field>
              </div>
            </section>

            {/* Payment Method */}
            <section data-icod-id="src_pages_checkout_tsx_969c">
              <h2
                className="heading-luxury mb-4 text-sm font-bold text-foreground"
                data-icod-id="src_pages_checkout_tsx_a093">Payment Method</h2>
              <div className="space-y-3" data-icod-id="src_pages_checkout_tsx_0a41">
                {[
                  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay when you receive your order' },
                  { id: 'bank_transfer', label: 'Bank Transfer', desc: 'Direct bank transfer to ScentoraX account' },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-luxury ${
                      paymentMethod === method.id ? 'border-primary bg-primary/5' : 'border-border/40 hover:border-border'
                    }`}
                    data-icod-id={`src_pages_checkout_tsx_3a77_${method.id}`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mt-1 accent-primary"
                      data-icod-id={`src_pages_checkout_tsx_eef8_${method.id}`} />
                    <div data-icod-id={`src_pages_checkout_tsx_bddd_${method.id}`}>
                      <p
                        className="text-sm font-medium text-foreground"
                        data-icod-id={`src_pages_checkout_tsx_f882_${method.id}`}>{method.label}</p>
                      <p
                        className="text-xs text-muted-foreground"
                        data-icod-id={`src_pages_checkout_tsx_3924_${method.id}`}>{method.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          </div>

          {/* Order Review */}
          <div className="lg:col-span-2" data-icod-id="src_pages_checkout_tsx_3e29">
            <div
              className="sticky top-24 rounded-xl border border-border/40 bg-card p-6"
              data-icod-id="src_pages_checkout_tsx_527d">
              <h2
                className="heading-luxury mb-4 text-sm font-bold text-foreground"
                data-icod-id="src_pages_checkout_tsx_9a05">Order Review</h2>
              <div className="mb-4 space-y-3" data-icod-id="src_pages_checkout_tsx_0042">
                {items.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex justify-between text-sm"
                    data-icod-id={`src_pages_checkout_tsx_4b89_${item.product._id}`}>
                    <span
                      className="text-muted-foreground"
                      data-icod-id={`src_pages_checkout_tsx_7939_${item.product._id}`}>{item.product.name} x{item.quantity}</span>
                    <span
                      className="text-foreground"
                      data-icod-id={`src_pages_checkout_tsx_1c3c_${item.product._id}`}>₨{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div
                className="space-y-2 border-t border-border/40 pt-4 text-sm"
                data-icod-id="src_pages_checkout_tsx_f73e">
                <div
                  className="flex justify-between text-muted-foreground"
                  data-icod-id="src_pages_checkout_tsx_f3fa">
                  <span data-icod-id="src_pages_checkout_tsx_c322">Subtotal</span><span className="text-foreground" data-icod-id="src_pages_checkout_tsx_f3ff">₨{subtotal.toLocaleString()}</span>
                </div>
                <div
                  className="flex justify-between text-muted-foreground"
                  data-icod-id="src_pages_checkout_tsx_c875">
                  <span data-icod-id="src_pages_checkout_tsx_1f50">Shipping</span><span className="text-foreground" data-icod-id="src_pages_checkout_tsx_bff6">{shippingCost === 0 ? 'Free' : `₨${shippingCost}`}</span>
                </div>
                <div
                  className="flex justify-between text-muted-foreground"
                  data-icod-id="src_pages_checkout_tsx_ac16">
                  <span data-icod-id="src_pages_checkout_tsx_2b75">Tax (5%)</span><span className="text-foreground" data-icod-id="src_pages_checkout_tsx_b572">₨{tax.toLocaleString()}</span>
                </div>
                <div
                  className="flex justify-between border-t border-border/40 pt-2 font-serif text-lg font-bold text-foreground"
                  data-icod-id="src_pages_checkout_tsx_7e13">
                  <span data-icod-id="src_pages_checkout_tsx_bcdc">Total</span><span data-icod-id="src_pages_checkout_tsx_492e">₨{total.toLocaleString()}</span>
                </div>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full"
                loading={createStatus === 'loading'}
                data-icod-id="src_pages_checkout_tsx_a992">
                Place Order
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
