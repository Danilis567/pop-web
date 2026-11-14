import { MotionConfig } from 'framer-motion';
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteLayout } from './components/layout/SiteLayout';
import { COPY } from './content/copy';

const HomePage = lazy(() => import('./pages/HomePage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const MixPage = lazy(() => import('./pages/MixPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const CreditsPage = lazy(() => import('./pages/CreditsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function PageFallback() {
  return (
    <div className="max-w-[var(--container-max)] mx-auto px-4 py-16 text-center">
      <span className="inline-flex px-4 py-2 rounded-full pop-border bg-[var(--color-butter)] font-mono-spec text-xs uppercase">
        {COPY.common.loading}
      </span>
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:category" element={<ShopPage />} />
              <Route path="/mix" element={<MixPage />} />
              <Route path="/product/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/info" element={<InfoPage />} />
              <Route path="/credits" element={<CreditsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MotionConfig>
  );
}
