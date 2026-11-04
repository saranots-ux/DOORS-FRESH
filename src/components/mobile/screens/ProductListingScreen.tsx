import React, { useState } from 'react';
import {
  Search,
  Plus,
  Minus,
  ChevronDown,
  ShoppingBag,
  Star,
  Check,
  Heart,
} from 'lucide-react';
import { MobileNavBar } from '../MobileNavBar';
import {
  TomatoGraphic,
  OnionGraphic,
  PotatoGraphic,
  CarrotGraphic,
} from '../../common/ProduceGraphics';
import { CartItem, Product, ScreenType } from '../../../types';
import { FarmerProfileModal, getFarmerForProduct } from '../FarmerProfileModal';

interface ProductListingScreenProps {
  products: Product[];
  cartItems: CartItem[];
  wishlistIds?: string[];
  onToggleWishlist?: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const ProductListingScreen: React.FC<ProductListingScreenProps> = ({
  products,
  cartItems,
  wishlistIds = [],
  onToggleWishlist,
  onAddToCart,
  onRemoveFromCart,
  onSelectProduct,
  onNavigateScreen,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Leafy' | 'Root' | 'Others'>('All');
  const [farmerModalProduct, setFarmerModalProduct] = useState<Product | null>(null);

  const filters: Array<'All' | 'Leafy' | 'Root' | 'Others'> = ['All', 'Leafy', 'Root', 'Others'];

  const filteredProducts = products.filter((p) => {
    const matchesFilter = activeFilter === 'All' || p.subcategory === activeFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getProductGraphic = (product: Product) => {
    switch (product.id) {
      case 'prod-tomato':
        return <TomatoGraphic className="w-24 h-24" />;
      case 'prod-onion':
        return <OnionGraphic className="w-24 h-24" />;
      case 'prod-potato':
        return <PotatoGraphic className="w-24 h-24" />;
      case 'prod-carrot':
        return <CarrotGraphic className="w-24 h-24" />;
      default:
        return <TomatoGraphic className="w-24 h-24" />;
    }
  };

  const getItemCartQty = (productId: string) => {
    const item = cartItems.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800">
      {/* Top Header matching board: "< Vegetables ⌵ 🔍" */}
      <header className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-slate-100 shadow-xs">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onNavigateScreen('home')}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-700 font-bold"
            aria-label="Back to home"
          >
            ←
          </button>

          <div className="flex items-center gap-1 font-bold text-slate-900 text-base">
            <span>Vegetables</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onNavigateScreen('wishlist')}
              className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-rose-50 text-slate-600 hover:text-rose-600 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigateScreen('cart')}
              className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-700"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar matching board: "🔍 Search vegetables..." */}
        <div className="mt-2.5 relative flex items-center bg-slate-100/90 rounded-xl px-3 py-2 border border-slate-200/60 focus-within:bg-white focus-within:border-emerald-500 transition-all">
          <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vegetables..."
            className="w-full bg-transparent text-xs font-medium text-slate-900 outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
            >
              ×
            </button>
          )}
        </div>

        {/* Filter Pills matching board: [All] [Leafy] [Root] [Others] */}
        <div className="flex items-center gap-2 mt-2.5 overflow-x-auto no-scrollbar pb-1">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>

      {/* Product Grid (2 columns matching board) */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => {
            const qty = getItemCartQty(product.id);
            const isFavorited = wishlistIds.includes(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all group relative"
              >
                {/* Heart Wishlist Toggle Button on Card */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onToggleWishlist) onToggleWishlist(product.id);
                  }}
                  className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    isFavorited
                      ? 'bg-rose-50 text-rose-500 shadow-xs'
                      : 'bg-white/90 text-slate-400 hover:text-rose-500 hover:bg-white shadow-2xs'
                  }`}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-colors ${
                      isFavorited ? 'fill-rose-500 text-rose-500' : ''
                    }`}
                  />
                </button>

                {/* Product Thumbnail & Clickable area */}
                <div
                  onClick={() => onSelectProduct(product)}
                  className="cursor-pointer flex flex-col items-center pt-1"
                >
                  <div className="w-24 h-24 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                    {getProductGraphic(product)}
                  </div>

                  <div className="w-full text-left mt-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-slate-400">({product.reviewCount})</span>
                    </div>

                    {/* Sourced by chip */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFarmerModalProduct(product);
                      }}
                      className="w-full mt-1.5 py-0.5 px-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 text-[10px] text-emerald-800 font-semibold flex items-center justify-between transition-colors text-left cursor-pointer"
                    >
                      <span className="truncate">Sourced by {getFarmerForProduct(product).name.split(' ')[0]}</span>
                      <span className="text-[9px] text-emerald-700 font-bold shrink-0">Farm Info ➔</span>
                    </button>
                  </div>
                </div>

                {/* Price & Add to Cart button */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-black text-slate-900 font-mono">
                      ₹{product.price}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      /{product.unit}
                    </span>
                  </div>

                  {qty > 0 ? (
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-300 rounded-lg p-0.5">
                      <button
                        onClick={() => onRemoveFromCart(product.id)}
                        className="w-5 h-5 rounded flex items-center justify-center bg-white text-emerald-800 shadow-xs hover:bg-emerald-100 active:scale-95"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-emerald-900 w-4 text-center font-mono">
                        {qty}
                      </span>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="w-5 h-5 rounded flex items-center justify-center bg-emerald-600 text-white shadow-xs hover:bg-emerald-700 active:scale-95"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom floating cart pill if items exist */}
        {totalCartCount > 0 && (
          <div className="mt-4 sticky bottom-2 z-10">
            <button
              onClick={() => onNavigateScreen('cart')}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white p-3 rounded-xl flex items-center justify-between shadow-lg shadow-slate-950/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                  {totalCartCount} items
                </span>
                <span className="text-xs font-bold">View Basket</span>
              </div>
              <span className="text-xs font-bold font-mono text-emerald-300">
                Proceed to Cart →
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <MobileNavBar
        currentScreen="listing"
        onNavigate={onNavigateScreen}
        wishlistCount={wishlistIds.length}
      />

      {/* Interactive Farmer Profile Modal */}
      {farmerModalProduct && (
        <FarmerProfileModal
          product={farmerModalProduct}
          isOpen={true}
          onClose={() => setFarmerModalProduct(null)}
        />
      )}
    </div>
  );
};
