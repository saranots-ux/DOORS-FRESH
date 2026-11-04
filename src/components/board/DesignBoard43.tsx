import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ExternalLink,
  Sparkles,
  Info,
  CheckCircle,
  Eye,
  Layers,
  ArrowRight,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { SplashScreen } from '../mobile/screens/SplashScreen';
import { AuthScreen } from '../mobile/screens/AuthScreen';
import { HomeScreen } from '../mobile/screens/HomeScreen';
import { ProductListingScreen } from '../mobile/screens/ProductListingScreen';
import { ProductDetailsScreen } from '../mobile/screens/ProductDetailsScreen';
import { CartScreen } from '../mobile/screens/CartScreen';
import { CheckoutScreen } from '../mobile/screens/CheckoutScreen';
import { OrderTrackingScreen } from '../mobile/screens/OrderTrackingScreen';
import { SubscriptionsScreen } from '../mobile/screens/SubscriptionsScreen';
import { ProfileScreen } from '../mobile/screens/ProfileScreen';
import { WishoreLogo, DoorsFreshLogo } from '../common/ProduceGraphics';
import { CartItem, NotificationSettings, Order, Product, ProductReview, ScreenType, SubscriptionPlan, UserRewards } from '../../types';

interface DesignBoard43Props {
  products: Product[];
  cartItems: CartItem[];
  wishlistIds?: string[];
  order: Order;
  plans: SubscriptionPlan[];
  notificationSettings: NotificationSettings;
  onSelectScreenForInteractive: (screen: ScreenType) => void;
  onOpenHelpSupport: () => void;
  onOpenSettings: () => void;
  onOpenRewards?: () => void;
  rewards?: UserRewards;
  walletBalance?: number;
  onAddToCart: (product: Product, quantity?: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onUpdateCartQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  onToggleSubscription: (planId: string) => void;
  onToggleWishlist?: (productId: string) => void;
}

export const DesignBoard43: React.FC<DesignBoard43Props> = ({
  products,
  cartItems,
  wishlistIds = [],
  order,
  plans,
  notificationSettings,
  onSelectScreenForInteractive,
  onOpenHelpSupport,
  onOpenSettings,
  onOpenRewards,
  rewards,
  walletBalance = 125,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCartQuantity,
  onClearCart,
  onAddReview,
  onToggleSubscription,
  onToggleWishlist,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.72);
  const [selectedScreenBadge, setSelectedScreenBadge] = useState<string | null>(null);
  const [showOriginalComparison, setShowOriginalComparison] = useState(false);

  const mainTomato = products.find((p) => p.id === 'prod-tomato') || products[0];

  // Helper Mini Device Wrapper for Board Grid
  const BoardScreenWrapper: React.FC<{
    badge: string;
    screenId: ScreenType;
    children: React.ReactNode;
  }> = ({ badge, screenId, children }) => (
    <div className="flex flex-col items-center group">
      {/* Top Emerald Badge matching board */}
      <div className="mb-2.5 px-4 py-1 bg-emerald-600 group-hover:bg-emerald-700 text-white rounded-full text-xs font-bold tracking-tight shadow-sm flex items-center gap-1.5 transition-all">
        <span>{badge}</span>
      </div>

      {/* Device Frame */}
      <div
        onClick={() => onSelectScreenForInteractive(screenId)}
        className="w-[240px] h-[500px] bg-slate-900 rounded-[34px] p-2 shadow-xl ring-1 ring-slate-800/80 hover:ring-2 hover:ring-emerald-500 hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col"
      >
        {/* Device Notch & Status */}
        <div className="h-5 bg-white px-3 flex items-center justify-between text-[8px] font-bold text-slate-800 shrink-0">
          <span>9:41</span>
          <div className="w-12 h-2.5 bg-slate-950 rounded-full" />
          <div className="flex gap-1 text-[7px]">●●●</div>
        </div>

        {/* Screen Content Scaled */}
        <div className="flex-1 overflow-hidden relative bg-white text-slate-800 select-none pointer-events-none scale-[0.68] origin-top-left w-[353px] h-[690px]">
          {children}
        </div>

        {/* Hover overlay hint */}
        <div className="absolute inset-0 bg-emerald-950/0 group-hover:bg-emerald-950/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 backdrop-blur-[1px]">
          <span className="px-3 py-1.5 bg-white text-emerald-900 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            Interact / Test
          </span>
        </div>

        {/* Bottom Home indicator */}
        <div className="h-2 bg-white flex items-center justify-center shrink-0">
          <div className="w-16 h-0.5 bg-slate-300 rounded-full" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full flex flex-col items-center">
      {/* Board Controls Toolbar */}
      <div className="w-full max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs mb-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Design Board Canvas (4:3 Ratio)
          </span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">10 Comprehensive Screens + Review System & Notifications</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.45, z - 0.08))}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono font-bold text-slate-700 text-[11px]">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(1.0, z + 0.08))}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(0.72)}
              className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 hover:bg-emerald-50 rounded"
            >
              Reset (Fit)
            </button>
          </div>

          {/* Toggle comparison with original attachment */}
          <button
            onClick={() => setShowOriginalComparison(!showOriginalComparison)}
            className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 border transition-all ${
              showOriginalComparison
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Compare with Original Board</span>
          </button>
        </div>
      </div>

      {/* Side-by-side or Floating Drawer if comparison is turned on */}
      {showOriginalComparison && (
        <div className="w-full max-w-7xl px-4 mb-4 animate-in slide-in-from-top-3 duration-200">
          <div className="bg-white rounded-2xl border border-emerald-200 p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-md">
                  Original Reference Attached Board
                </span>
                <span className="text-xs text-slate-500">
                  Wishore Agri-Tech Customer App – Complete UI Design
                </span>
              </div>
              <button
                onClick={() => setShowOriginalComparison(false)}
                className="text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                Close ✕
              </button>
            </div>
            <div className="w-full max-h-[500px] overflow-auto rounded-xl border border-slate-200 bg-slate-100">
              <img
                src="/assets/aistudio/file_000000009b388246909bb5d849024468_5835da1f.png"
                alt="Wishore Agri-Tech Original UI Design Board"
                className="w-full h-auto object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4:3 Aspect Ratio Canvas Container */}
      <div className="w-full overflow-x-auto flex justify-center py-4">
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          className="transition-transform duration-200 shrink-0"
        >
          {/* Main 4:3 Presentation Canvas matching the image */}
          <div className="w-[1600px] min-h-[1200px] bg-gradient-to-br from-emerald-50/70 via-white to-lime-50/50 rounded-[40px] shadow-2xl border-8 border-white ring-1 ring-slate-200/80 p-8 flex flex-col justify-between select-none">
            {/* Top Brand Header matching board */}
            <header className="flex items-center justify-between pb-6 border-b border-emerald-100/80">
              <div className="flex items-center gap-4">
                <DoorsFreshLogo variant="banner" withText={true} />
              </div>

              {/* Center Green Capsule matching board */}
              <div className="px-8 py-2.5 bg-emerald-800 text-white rounded-full shadow-md shadow-emerald-950/20 text-xl font-extrabold tracking-tight">
                Customer App – Complete UI Design
              </div>

              {/* Right Italic Serif Copy matching board */}
              <div className="text-right">
                <div className="text-base font-serif italic text-emerald-900 font-bold tracking-wide">
                  Fresh Produce... Healthy Living...
                </div>
                <div className="text-sm font-serif italic text-emerald-700">
                  Sustainable Future...
                </div>
              </div>
            </header>

            {/* Middle Grid of 10 Mobile Screens + Key Features */}
            <div className="my-6 space-y-8">
              {/* Row 1: Screens 1 to 6 */}
              <div className="grid grid-cols-6 gap-5 justify-items-center">
                {/* 1. Splash Screen */}
                <BoardScreenWrapper badge="1. Splash Screen" screenId="splash">
                  <SplashScreen onEnterApp={() => onSelectScreenForInteractive('home')} />
                </BoardScreenWrapper>

                {/* 2. Login / Signup */}
                <BoardScreenWrapper badge="2. Login / Signup" screenId="auth">
                  <AuthScreen
                    onLoginSuccess={() => onSelectScreenForInteractive('home')}
                    onBack={() => onSelectScreenForInteractive('splash')}
                  />
                </BoardScreenWrapper>

                {/* 3. Home Dashboard */}
                <BoardScreenWrapper badge="3. Home Dashboard" screenId="home">
                  <HomeScreen
                    onNavigateScreen={onSelectScreenForInteractive}
                    onOpenNotifications={onOpenSettings}
                    unreadNotificationsCount={2}
                  />
                </BoardScreenWrapper>

                {/* 4. Product Listing */}
                <BoardScreenWrapper badge="4. Product Listing" screenId="listing">
                  <ProductListingScreen
                    products={products}
                    cartItems={cartItems}
                    wishlistIds={wishlistIds}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={onAddToCart}
                    onRemoveFromCart={onRemoveFromCart}
                    onSelectProduct={() => onSelectScreenForInteractive('product_detail')}
                    onNavigateScreen={onSelectScreenForInteractive}
                  />
                </BoardScreenWrapper>

                {/* 5. Product Details */}
                <BoardScreenWrapper badge="5. Product Details" screenId="product_detail">
                  <ProductDetailsScreen
                    product={mainTomato}
                    isWishlisted={wishlistIds.includes(mainTomato.id)}
                    onToggleWishlist={onToggleWishlist}
                    onAddToCart={(p, q) => onAddToCart(p, q)}
                    onBack={() => onSelectScreenForInteractive('listing')}
                    onNavigateScreen={onSelectScreenForInteractive}
                    onAddReview={onAddReview}
                  />
                </BoardScreenWrapper>

                {/* 6. Cart */}
                <BoardScreenWrapper badge="6. Cart" screenId="cart">
                  <CartScreen
                    cartItems={cartItems}
                    onUpdateQuantity={onUpdateCartQuantity}
                    onClearCart={onClearCart}
                    onProceedToCheckout={() => onSelectScreenForInteractive('checkout')}
                    onBack={() => onSelectScreenForInteractive('listing')}
                    onNavigateScreen={onSelectScreenForInteractive}
                  />
                </BoardScreenWrapper>
              </div>

              {/* Row 2: Screens 7 to 10 + Key Features Side Panel */}
              <div className="grid grid-cols-6 gap-5 items-start">
                {/* 7. Checkout & Payment */}
                <div className="flex justify-center">
                  <BoardScreenWrapper badge="7. Checkout & Payment" screenId="checkout">
                    <CheckoutScreen
                      totalAmount={87}
                      onPaymentSuccess={() => onSelectScreenForInteractive('tracking')}
                      onBack={() => onSelectScreenForInteractive('cart')}
                      onNavigateScreen={onSelectScreenForInteractive}
                    />
                  </BoardScreenWrapper>
                </div>

                {/* 8. Order Tracking */}
                <div className="flex justify-center">
                  <BoardScreenWrapper badge="8. Order Tracking" screenId="tracking">
                    <OrderTrackingScreen
                      order={order}
                      onBack={() => onSelectScreenForInteractive('home')}
                      onNavigateScreen={onSelectScreenForInteractive}
                      onRateDeliveredProduct={() => onSelectScreenForInteractive('product_detail')}
                    />
                  </BoardScreenWrapper>
                </div>

                {/* 9. Subscription Plans */}
                <div className="flex justify-center">
                  <BoardScreenWrapper badge="9. Subscription Plans" screenId="subscriptions">
                    <SubscriptionsScreen
                      plans={plans}
                      onToggleSubscription={onToggleSubscription}
                      onBack={() => onSelectScreenForInteractive('home')}
                      onNavigateScreen={onSelectScreenForInteractive}
                    />
                  </BoardScreenWrapper>
                </div>

                {/* 10. My Profile */}
                <div className="flex justify-center">
                  <BoardScreenWrapper badge="10. My Profile" screenId="profile">
                    <ProfileScreen
                      onNavigateScreen={onSelectScreenForInteractive}
                      onLogout={() => onSelectScreenForInteractive('auth')}
                      onOpenSettings={onOpenSettings}
                      onOpenHelpSupport={onOpenHelpSupport}
                      onOpenRewards={onOpenRewards}
                      rewards={rewards}
                      walletBalance={walletBalance}
                      wishlistCount={wishlistIds.length}
                    />
                  </BoardScreenWrapper>
                </div>

                {/* Key Features Panel (spans 2 columns matching right side of board) */}
                <div className="col-span-2 bg-emerald-50/70 border-2 border-emerald-200/80 rounded-[32px] p-6 shadow-sm flex flex-col justify-between h-[550px]">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight text-center mb-6">
                      Key Features
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {/* Feature 1 */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-2">
                          🌱
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          Fresh Products
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          (Farm to Home)
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-2">
                          ✓
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          Easy Ordering
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          & Payments
                        </p>
                      </div>

                      {/* Feature 3 */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-2">
                          📅
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          Subscription
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Plans
                        </p>
                      </div>

                      {/* Feature 4 */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-2">
                          📍
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          Real-Time
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Tracking
                        </p>
                      </div>

                      {/* Feature 5 */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-2">
                          🎁
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          Offers &
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Rewards
                        </p>
                      </div>

                      {/* Feature 6 */}
                      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-2xs flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-2">
                          🎧
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 leading-tight">
                          24×7
                        </h4>
                        <p className="text-xs text-slate-500 font-medium mt-0.5">
                          Support
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Button to launch live prototype */}
                  <button
                    onClick={() => onSelectScreenForInteractive('home')}
                    className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-950/15 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span>Launch Interactive Mobile Experience</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Agricultural Banner matching the board */}
            <footer className="mt-4 bg-emerald-700 text-white rounded-2xl px-8 py-4 shadow-lg flex items-center justify-between">
              <div className="flex items-center gap-8 text-sm font-bold">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚜</span>
                  <span>Support Farmers</span>
                </div>
                <span className="text-emerald-400">|</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌱</span>
                  <span>Healthy Food</span>
                </div>
                <span className="text-emerald-400">|</span>
                <div className="flex items-center gap-2">
                  <span className="text-xl">🏡</span>
                  <span>Green Tomorrow</span>
                </div>
              </div>

              <div className="text-lg font-serif italic font-bold tracking-wide text-emerald-100">
                Together for a Healthier & Greener World
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};
