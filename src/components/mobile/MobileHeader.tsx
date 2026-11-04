import React from 'react';
import { ChevronLeft, MoreVertical, Search, Heart, Share2, Settings, Trash2 } from 'lucide-react';
import { ScreenType } from '../../types';

interface MobileHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: 'dots' | 'search' | 'product_actions' | 'trash' | 'settings' | 'none';
  onRightAction?: () => void;
  onSearchClick?: () => void;
  isWishlisted?: boolean;
  onToggleWishlist?: () => void;
  onClearCart?: () => void;
  centerLogo?: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  title,
  subtitle,
  onBack,
  showBack = true,
  rightAction = 'dots',
  onRightAction,
  onSearchClick,
  isWishlisted = false,
  onToggleWishlist,
  onClearCart,
  centerLogo = false,
}) => {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-3 bg-white/95 backdrop-blur-md border-b border-slate-100 text-slate-800">
      <div className="flex items-center gap-2">
        {showBack ? (
          <button
            onClick={onBack}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-700"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>
        ) : (
          <div className="w-2" />
        )}

        {title && !centerLogo && (
          <div>
            <h2 className="text-base font-bold text-slate-900 tracking-tight leading-tight flex items-center gap-1.5">
              {title}
            </h2>
            {subtitle && <p className="text-[11px] text-slate-500 font-medium">{subtitle}</p>}
          </div>
        )}
      </div>

      {centerLogo && (
        <div className="text-center font-bold text-emerald-800 text-sm tracking-tight">
          Wishore <span className="text-emerald-600">Agri-Tech</span>
        </div>
      )}

      <div className="flex items-center gap-1">
        {rightAction === 'dots' && (
          <button
            onClick={onRightAction}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
            aria-label="Options"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        )}

        {rightAction === 'search' && (
          <button
            onClick={onSearchClick}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        )}

        {rightAction === 'product_actions' && (
          <div className="flex items-center gap-1">
            <button
              onClick={onToggleWishlist}
              className={`w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all ${
                isWishlisted ? 'text-rose-500 fill-rose-500' : 'text-slate-600'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'Fresh Tomato', url: window.location.href });
                }
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        )}

        {rightAction === 'trash' && (
          <button
            onClick={onClearCart}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-rose-50 text-slate-500 hover:text-rose-600 active:scale-95 transition-all"
            aria-label="Clear cart"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}

        {rightAction === 'settings' && (
          <button
            onClick={onRightAction}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 active:scale-95 transition-all text-slate-600"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        )}

        {rightAction === 'none' && <div className="w-9" />}
      </div>
    </header>
  );
};
