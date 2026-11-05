import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCurrentUser } from '@/store/slices/authSlice';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import Home from '@/pages/Home';
import Shop from '@/pages/Shop';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Auth from '@/pages/Auth';
import Account from '@/pages/Account';
import About from '@/pages/About';

export default function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <div
        className="min-h-screen bg-background text-foreground"
        data-icod-id="src_app_tsx_7038">
        <Navbar data-icod-id="src_app_tsx_25c6" />
        <main data-icod-id="src_app_tsx_3273">
          <Routes>
            <Route path="/" element={<Home data-icod-id="src_app_tsx_2089" />} />
            <Route path="/shop" element={<Shop data-icod-id="src_app_tsx_be89" />} />
            <Route path="/shop/:slug" element={<ProductDetail data-icod-id="src_app_tsx_f739" />} />
            <Route path="/cart" element={<Cart data-icod-id="src_app_tsx_4ee9" />} />
            <Route path="/about" element={<About data-icod-id="src_app_tsx_c88b" />} />
            <Route path="/auth" element={<Auth data-icod-id="src_app_tsx_d874" />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute data-icod-id="src_app_tsx_7d89">
                  <Checkout data-icod-id="src_app_tsx_7eb1" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/account"
              element={
                <ProtectedRoute data-icod-id="src_app_tsx_9cf3">
                  <Account data-icod-id="src_app_tsx_b268" />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Home data-icod-id="src_app_tsx_5a2d" />} />
          </Routes>
        </main>
        <Footer data-icod-id="src_app_tsx_1bae" />
      </div>
    </BrowserRouter>
  );
}
