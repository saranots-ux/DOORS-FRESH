import React, { useState } from 'react';
import { Plus, Minus, Trash2, ArrowRight, Tag, ShieldCheck, ShoppingBag } from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { TomatoGraphic, OnionGraphic, CarrotGraphic, PotatoGraphic } from '../../common/ProduceGraphics';
import { CartItem, Product, ScreenType } from '../../../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onClearCart,
  onProceedToCheckout,
  onBack,
  onNavigateScreen,
}) => {
  const [promoCode, setPromoCode] = useState('HARVEST20');
  const [isPromoApplied, setIsPromoApplied] = useState(false);

  const getProductGraphic = (product: Product) => {
    switch (product.id) {
      case 'prod-tomato':
        return <TomatoGraphic className="w-12 h-12" />;
      case 'prod-onion':
        return <OnionGraphic className="w-12 h-12" />;
      case 'prod-potato':
        return <PotatoGraphic className="w-12 h-12" />;
      case 'prod-carrot':
        return <CarrotGraphic className="w-12 h-12" />;
      default:
        return <TomatoGraphic className="w-12 h-12" />;
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = isPromoApplied ? Math.round(subtotal * 0.2) : 0;
  const deliveryCharge = subtotal > 0 ? 20 : 0;
  const totalAmount = Math.max(0, subtotal - discount + deliveryCharge);

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800">
      <MobileHeader
        title="My Cart"
        showBack={true}
        onBack={onBack}
        rightAction={cartItems.length > 0 ? 'trash' : 'none'}
        onClearCart={onClearCart}
      />

      {cartItems.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-base font-bold text-slate-800">Your basket is empty</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Add crisp, fresh farm produce straight from local harvest fields.
          </p>
          <button
            onClick={() => onNavigateScreen('listing')}
            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all"
          >
            Browse Fresh Vegetables
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Cart Item Cards matching design board Screen 6 */}
          <div className="space-y-2.5">
            {cartItems.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs flex items-center justify-between"
              >
                {/* Thumbnail & Info */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 shrink-0">
                    {getProductGraphic(item.product)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 leading-tight">
                      {item.product.name}
                    </h4>
                    <div className="text-xs font-semibold text-slate-500 font-mono mt-0.5">
                      ₹{item.product.price}/{item.product.unit}
                    </div>
                  </div>
                </div>

                {/* Stepper & Line Item Price */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-slate-100/80 rounded-lg p-0.5 border border-slate-200/60">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 rounded flex items-center justify-center bg-white text-slate-700 hover:text-rose-600 active:scale-95 shadow-xs"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-900 w-4 text-center font-mono">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 rounded flex items-center justify-center bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 shadow-xs"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-sm font-bold text-slate-900 font-mono w-10 text-right">
                    ₹{item.product.price * item.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-emerald-600" />
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="Enter promo coupon"
                className="flex-1 bg-slate-50 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-slate-800 outline-none uppercase"
              />
              <button
                onClick={() => setIsPromoApplied(!isPromoApplied)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  isPromoApplied
                    ? 'bg-rose-50 text-rose-600 border border-rose-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {isPromoApplied ? 'Remove' : 'Apply'}
              </button>
            </div>
            {isPromoApplied && (
              <p className="text-[10px] text-emerald-700 font-semibold mt-1.5 flex items-center gap-1">
                ✓ Coupon HARVEST20 applied! 20% discount on root veggies.
              </p>
            )}
          </div>

          {/* Bill Breakdown matching design board Screen 6 */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 mb-2">Order Bill Summary</h4>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-mono font-semibold text-slate-900">₹{subtotal}</span>
            </div>

            {isPromoApplied && (
              <div className="flex justify-between text-emerald-700 font-medium">
                <span>Coupon Discount</span>
                <span className="font-mono font-semibold">-₹{discount}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Delivery Charge</span>
              <span className="font-mono font-semibold text-slate-900">₹{deliveryCharge}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Amount</span>
              <span className="font-mono font-black text-emerald-800 text-base">
                ₹{totalAmount}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Guaranteed same-day harvest freshness with sanitized eco-packaging.</span>
          </div>
        </div>
      )}

      {/* Sticky Bottom Proceed to Checkout Bar */}
      {cartItems.length > 0 && (
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 shadow-lg">
          <button
            onClick={onProceedToCheckout}
            className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-900/15 flex items-center justify-between px-5 transition-all cursor-pointer"
          >
            <div className="text-left">
              <span className="text-[10px] block opacity-80 uppercase tracking-wide">
                Payable Amount
              </span>
              <span className="text-base font-black font-mono">₹{totalAmount}</span>
            </div>

            <div className="flex items-center gap-1 font-bold">
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
