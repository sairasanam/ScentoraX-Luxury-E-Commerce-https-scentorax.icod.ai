import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchOrders } from '@/store/slices/ordersSlice';
import { logout } from '@/store/slices/authSlice';
import { updateProfileRequest } from '@/services/apiClient';
import { Button, Input, Field, Card, Spinner, Alert } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const { items: orders, status: ordersStatus } = useAppSelector((s) => s.orders);
  const [tab, setTab] = useState<'orders' | 'profile'>('orders');
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [saveMsg, setSaveMsg] = useState('');

  useEffect(() => {
    if (ordersStatus === 'idle') dispatch(fetchOrders());
  }, [dispatch, ordersStatus]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfileRequest({ name: editName, phone: editPhone });
      setSaveMsg('Profile updated successfully');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch {
      setSaveMsg('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen pt-20" data-icod-id="src_pages_account_tsx_1716">
      <div
        className="mx-auto max-w-4xl px-4 py-8 md:px-8"
        data-icod-id="src_pages_account_tsx_83ab">
        <div
          className="mb-8 flex items-center justify-between"
          data-icod-id="src_pages_account_tsx_2f90">
          <h1
            className="font-serif text-3xl font-bold text-foreground"
            data-icod-id="src_pages_account_tsx_d974">My Account</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            data-icod-id="src_pages_account_tsx_c170">Sign Out</Button>
        </div>

        {/* Tabs */}
        <div
          className="mb-8 flex gap-6 border-b border-border/40"
          data-icod-id="src_pages_account_tsx_4255">
          {[
            { id: 'orders' as const, label: 'Order History' },
            { id: 'profile' as const, label: 'Profile' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`heading-luxury pb-3 text-xs font-bold transition-luxury ${
                tab === t.id ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
              data-icod-id={`src_pages_account_tsx_e126_${t.id}`}>
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'orders' && (
          <div data-icod-id="src_pages_account_tsx_1081">
            {ordersStatus === 'loading' ? (
              <div
                className="flex justify-center py-12"
                data-icod-id="src_pages_account_tsx_8a0c"><Spinner data-icod-id="src_pages_account_tsx_6a2b" /></div>
            ) : orders.length === 0 ? (
              <p
                className="py-12 text-center text-muted-foreground"
                data-icod-id="src_pages_account_tsx_0c44">No orders yet.</p>
            ) : (
              <div className="space-y-4" data-icod-id="src_pages_account_tsx_9101">
                {orders.map((order) => (
                  <Card
                    key={order._id}
                    className="border-border/40 p-5"
                    data-icod-id={`src_pages_account_tsx_db88_${order._id}`}>
                    <div
                      className="flex flex-wrap items-start justify-between gap-3"
                      data-icod-id={`src_pages_account_tsx_5927_${order._id}`}>
                      <div data-icod-id={`src_pages_account_tsx_3485_${order._id}`}>
                        <p
                          className="text-sm font-medium text-foreground"
                          data-icod-id={`src_pages_account_tsx_bf08_${order._id}`}>Order #{order._id.slice(-8).toUpperCase()}</p>
                        <p
                          className="text-xs text-muted-foreground"
                          data-icod-id={`src_pages_account_tsx_4654_${order._id}`}>{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div
                        className="text-right"
                        data-icod-id={`src_pages_account_tsx_3ba6_${order._id}`}>
                        <span
                          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.orderStatus === 'delivered' ? 'bg-success/10 text-success' :
                            order.orderStatus === 'cancelled' ? 'bg-destructive/10 text-destructive' :
                            'bg-primary/10 text-primary'
                          }`}
                          data-icod-id={`src_pages_account_tsx_9bbd_${order._id}`}>
                          {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                        </span>
                        <p
                          className="mt-1 font-serif text-lg font-bold text-foreground"
                          data-icod-id={`src_pages_account_tsx_a570_${order._id}`}>₨{order.totalAmount.toLocaleString()}</p>
                      </div>
                    </div>
                    <div
                      className="mt-3 space-y-1"
                      data-icod-id={`src_pages_account_tsx_e814_${order._id}`}>
                      {order.items.map((item, i) => (
                        <p
                          key={i}
                          className="text-sm text-muted-foreground"
                          data-icod-id={`src_pages_account_tsx_c4f1_${order._id}_${i}`}>{item.name} x{item.quantity}</p>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'profile' && (
          <Card
            className="max-w-lg border-border/40 p-6"
            data-icod-id="src_pages_account_tsx_7477">
            <form
              onSubmit={handleSaveProfile}
              className="space-y-4"
              data-icod-id="src_pages_account_tsx_1cd3">
              <Field label="Full Name" data-icod-id="src_pages_account_tsx_0700">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  data-icod-id="src_pages_account_tsx_eb43" />
              </Field>
              <Field label="Email" data-icod-id="src_pages_account_tsx_515d">
                <Input
                  value={user?.email || ''}
                  disabled
                  data-icod-id="src_pages_account_tsx_75a4" />
              </Field>
              <Field label="Phone" data-icod-id="src_pages_account_tsx_9355">
                <Input
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder="+92..."
                  data-icod-id="src_pages_account_tsx_f0f6" />
              </Field>
              {saveMsg && <Alert variant="success" data-icod-id="src_pages_account_tsx_e3bc">{saveMsg}</Alert>}
              <Button type="submit" data-icod-id="src_pages_account_tsx_12cf">Save Changes</Button>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}
