import React, { useState } from 'react';
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { MobileNavBar } from '../MobileNavBar';
import {
  TomatoGraphic,
  OnionGraphic,
  PotatoGraphic,
  CarrotGraphic,
} from '../../common/ProduceGraphics';
import { Product, ScreenType } from '../../../types';

interface WishlistScreenProps {
  wishlistProducts: Product[];
  onMoveToCart: (product: Product) => void;
  onMoveAllToCart: () => void;
  onRemoveFromWishlist: (productId: string) => void;
  onClearWishlist: () => void;
  onSelectProduct: (product: Product) => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const WishlistScreen: React.FC<WishlistScreenProps> = ({
  wishlistProducts,
  onMoveToCart,
  onMoveAllToCart,
  onRemoveFromWishlist,
  onClearWishlist,
  onSelectProduct,
  onNavigateScreen,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const getProductGraphic = (product: Product) => {
    switch (product.id) {
      case 'prod-tomato':
        return <TomatoGraphic className="w-14 h-14" />;
      case 'prod-onion':
        return <OnionGraphic className="w-14 h-14" />;
      case 'prod-potato':
        return <PotatoGraphic className="w-14 h-14" />;
      case 'prod-carrot':
        return <CarrotGraphic className="w-14 h-14" />;
      default:
        return <TomatoGraphic className="w-14 h-14" />;
    }
  };

  const handleItemMoveToCart = (product: Product) => {
    onMoveToCart(product);
    showToast(`Moved ${product.name} to cart!`);
  };

  const handleAllMoveToCart = () => {
    onMoveAllToCart();
    showToast('All items added to cart!');
  };

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800 relative">
      <MobileHeader
        title="My Wishlist"
        subtitle={`${wishlistProducts.length} saved farm favorites`}
        showBack={true}
        onBack={() => onNavigateScreen('home')}
        rightAction={wishlistProducts.length > 0 ? 'trash' : 'none'}
        onClearCart={onClearWishlist}
      />

      {/* Main Content Area */}
      {wishlistProducts.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 flex items-center justify-center mb-3 shadow-xs">
            <Heart className="w-8 h-8 stroke-[1.8]" />
          </div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
            Tap the heart icon on any fresh organic vegetable or farm fruit to save it for quick weekly reordering.
          </p>
          <button
            onClick={() => onNavigateScreen('listing')}
            className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-950/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore Farm Harvest</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
          <div className="flex items-center justify-between text-xs px-1">
            <span className="font-bold text-slate-700">Saved Items ({wishlistProducts.length})</span>
            <button
              onClick={handleAllMoveToCart}
              className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline flex items-center gap-1 text-[11px]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Move All to Cart
            </button>
          </div>

          <div className="space-y-3">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="flex items-start gap-3">
                  {/* Clickable Graphic */}
                  <div
                    onClick={() => onSelectProduct(product)}
                    className="w-18 h-18 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center justify-center p-1 shrink-0 cursor-pointer hover:scale-105 transition-transform"
                  >
                    {getProductGraphic(product)}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div
                        onClick={() => onSelectProduct(product)}
                        className="cursor-pointer"
                      >
                        <h4 className="text-sm font-bold text-slate-900 leading-tight hover:text-emerald-700 transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                          {product.subcategory} · Fresh & Organic
                        </span>
                      </div>

                      {/* Remove Heart Button */}
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="w-7 h-7 rounded-full hover:bg-rose-50 text-rose-500 flex items-center justify-center transition-colors -mr-1 -mt-1"
                        title="Remove from Wishlist"
                        aria-label="Remove from Wishlist"
                      >
                        <Heart className="w-4 h-4 fill-rose-500" />
                      </button>
                    </div>

                    {/* Rating & Stock */}
                    <div className="flex items-center gap-2 mt-1 text-[11px]">
                      <div className="flex items-center text-amber-600 font-semibold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 mr-0.5" />
                        <span>{product.rating}</span>
                        <span className="text-slate-400 font-normal">
                          ({product.reviewCount})
                        </span>
                      </div>
                      <span className="text-slate-300">·</span>
                      <span className="text-emerald-700 font-semibold text-[10px]">
                        In Stock ({product.availableStockKg} kg)
                      </span>
                    </div>

                    {/* Price & Move to Cart Button */}
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-base font-black text-slate-900 font-mono">
                          ₹{product.price}
                        </span>
                        <span className="text-[11px] text-slate-500">
                          /{product.unit}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through ml-1.5 font-mono">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleItemMoveToCart(product)}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Produce in your wishlist is harvested fresh on the morning of dispatch.</span>
          </div>
        </div>
      )}

      {/* Floating Action Bar when items exist */}
      {wishlistProducts.length > 0 && (
        <div className="sticky bottom-16 z-20 px-4 pb-2">
          <button
            onClick={handleAllMoveToCart}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-2xl flex items-center justify-between shadow-lg shadow-slate-950/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {wishlistProducts.length} items
              </span>
              <span className="text-xs font-bold">Move All to Shopping Cart</span>
            </div>
            <span className="text-xs font-bold font-mono text-emerald-300 flex items-center gap-1">
              Add All →
            </span>
          </button>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div className="absolute top-14 left-4 right-4 z-40 bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => onNavigateScreen('cart')}
            className="text-[11px] underline font-bold text-emerald-200"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      <MobileNavBar
        currentScreen="wishlist"
        onNavigate={onNavigateScreen}
      />
    </div>
  );
};
