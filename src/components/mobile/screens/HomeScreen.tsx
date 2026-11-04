import React, { useState } from 'react';
import {
  MapPin,
  Bell,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Milk,
  Apple,
  Carrot,
  Droplets,
  Fish,
  Sprout,
  Grid,
  Heart,
  Bike,
  Clock,
  CheckCircle2,
  Lock,
  Gift,
} from 'lucide-react';
import { MobileNavBar } from '../MobileNavBar';
import { FarmBasketIllustration } from '../../common/ProduceGraphics';
import { Order, ScreenType } from '../../../types';

interface HomeScreenProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount?: number;
  wishlistCount?: number;
  onSwitchToB2B?: () => void;
  activeOrder?: Order;
  onSwitchToDelivery?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigateScreen,
  onOpenNotifications,
  unreadNotificationsCount = 2,
  wishlistCount = 0,
  onSwitchToB2B,
  activeOrder,
  onSwitchToDelivery,
}) => {
  const [selectedCity, setSelectedCity] = useState('Chennai');
  const [showCityMenu, setShowCityMenu] = useState(false);

  const cities = ['Chennai', 'Bangalore', 'Coimbatore', 'Madurai', 'Kanchipuram'];

  const categories = [
    {
      id: 'vegetables',
      label: 'Vegetables',
      icon: Carrot,
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'fruits',
      label: 'Fruits',
      icon: Apple,
      bg: 'bg-rose-50 text-rose-600 border-rose-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'groceries',
      label: 'Groceries',
      icon: ShoppingBag,
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'milk_dairy',
      label: 'Milk & Dairy',
      icon: Milk,
      bg: 'bg-sky-50 text-sky-600 border-sky-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'water',
      label: 'Water',
      icon: Droplets,
      bg: 'bg-blue-50 text-blue-600 border-blue-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'meat_fish',
      label: 'Meat & Fish',
      icon: Fish,
      bg: 'bg-orange-50 text-orange-600 border-orange-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'organic',
      label: 'Organic',
      icon: Sprout,
      bg: 'bg-teal-50 text-teal-700 border-teal-200',
      action: () => onNavigateScreen('listing'),
    },
    {
      id: 'more',
      label: 'More',
      icon: Grid,
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      action: () => onNavigateScreen('listing'),
    },
  ];

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50/70 text-slate-800">
      {/* Top Bar with Location Picker and Notification Bell */}
      <header className="sticky top-0 z-20 bg-white px-4 py-3 border-b border-slate-100 flex items-center justify-between shadow-xs">
        <div className="relative">
          <button
            onClick={() => setShowCityMenu(!showCityMenu)}
            className="flex items-center gap-1.5 text-slate-800 hover:text-emerald-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-left">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Delivery to</div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-1">
                {selectedCity}
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </div>
            </div>
          </button>

          {showCityMenu && (
            <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Select City
              </div>
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setShowCityMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between hover:bg-slate-50 ${
                    city === selectedCity ? 'text-emerald-700 bg-emerald-50/60' : 'text-slate-700'
                  }`}
                >
                  <span>{city}</span>
                  {city === selectedCity && <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Wishlist Button */}
          <button
            onClick={() => onNavigateScreen('wishlist')}
            className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Notification Bell with Badge */}
          <button
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Promotional Hero Banner matching the design board */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white p-4 shadow-md shadow-emerald-950/10">
          <div className="relative z-10 max-w-[58%]">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wide uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full mb-1">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              Daily Harvest
            </span>
            <h2 className="text-lg font-extrabold tracking-tight leading-snug">
              Fresh Vegetables
            </h2>
            <p className="text-xs font-semibold text-emerald-100 mb-3">
              Up to 30% OFF
            </p>
            <button
              onClick={() => onNavigateScreen('listing')}
              className="inline-flex items-center gap-1.5 bg-white text-emerald-800 hover:bg-emerald-50 px-3.5 py-1.5 rounded-lg text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <span>Order Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fresh Produce Graphic in Banner */}
          <div className="absolute -right-4 -bottom-6 w-40 h-36 transform rotate-6 pointer-events-none">
            <FarmBasketIllustration className="w-full h-full drop-shadow-lg" />
          </div>
        </div>

        {/* Live Delivery Partner Connection Widget */}
        {activeOrder && (
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-3.5 shadow-md border border-indigo-800/40 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <Bike className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white leading-tight">Live EV Delivery in Progress</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <div className="text-[10px] text-slate-300">
                    {activeOrder.deliveryPartner.name} · {activeOrder.eta}
                  </div>
                </div>
              </div>

              {/* Delivery OTP Badge */}
              <div className="bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-xl text-center">
                <span className="text-[8px] font-bold uppercase tracking-wider text-emerald-300 block">OTP Code</span>
                <span className="font-mono text-xs font-black text-white tracking-widest">{activeOrder.deliveryOtp || '4821'}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <button
                onClick={() => onNavigateScreen('tracking')}
                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer shadow-xs"
              >
                Track Live Order
              </button>

              {onSwitchToDelivery && (
                <button
                  onClick={onSwitchToDelivery}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 active:scale-95 text-indigo-300 hover:text-white border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                  title="Switch to Delivery Partner View"
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Rider Cockpit</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Categories</h3>
            <span className="text-[11px] font-semibold text-emerald-700">8 Items</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={cat.action}
                  className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-slate-100 hover:border-emerald-300 hover:shadow-xs transition-all active:scale-95 text-center group cursor-pointer"
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-1.5 transition-transform group-hover:scale-105 ${cat.bg}`}
                  >
                    <Icon className="w-5 h-5 stroke-[2]" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700 line-clamp-1 group-hover:text-emerald-700">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Today's Offers Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">Today's Offers</h3>
            <button
              onClick={() => onNavigateScreen('listing')}
              className="text-[11px] font-semibold text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Flat 20% OFF Card */}
          <div
            onClick={() => onNavigateScreen('listing')}
            className="cursor-pointer relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative z-10 max-w-[62%]">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/25 px-2 py-0.5 rounded-full">
                Flash Harvest Deal
              </span>
              <h4 className="text-xl font-black mt-1 leading-tight">
                Flat 20% OFF
              </h4>
              <p className="text-xs text-amber-100 mt-0.5 font-medium">
                On all farm-fresh root veggies
              </p>
              <div className="mt-2.5 inline-block text-[10px] font-mono font-bold bg-white text-orange-800 px-2.5 py-1 rounded-md">
                USE CODE: HARVEST20
              </div>
            </div>

            <div className="absolute -right-3 -bottom-4 w-32 h-28 pointer-events-none">
              <FarmBasketIllustration className="w-full h-full drop-shadow-md" />
            </div>
          </div>
        </div>

        {/* B2B Wholesale Supply Banner (Hotels, Restos, Hostels, Shops) */}
        <div
          onClick={onSwitchToB2B}
          className="cursor-pointer bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 border border-indigo-800/80 text-white rounded-2xl p-3 flex items-center justify-between hover:border-indigo-500 shadow-sm transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/80 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              🏢
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>B2B Supply: Hotels, Restos & Shops</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/30 text-indigo-300 font-mono">
                  Wholesale
                </span>
              </div>
              <div className="text-[11px] text-indigo-200/80 font-medium">
                Crates 25% below mandi • 4:30 AM Reefer Delivery • 15d Credit
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
        </div>

        {/* Refer a Friend & Dual Loyalty Rewards Banner */}
        <div
          onClick={() => onNavigateScreen('referral')}
          className="cursor-pointer bg-gradient-to-r from-amber-600 via-emerald-700 to-teal-800 text-white rounded-2xl p-3.5 flex items-center justify-between shadow-md hover:shadow-lg transition-all active:scale-[0.99] group border border-emerald-500/40 relative overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs text-amber-300 flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              <Gift className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-xs font-black text-white flex items-center gap-1.5 leading-tight">
                <span>Refer a Friend & Earn 250 Coins</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-bold uppercase">
                  +100 For Friend
                </span>
              </div>
              <div className="text-[11px] text-emerald-100 font-medium mt-0.5">
                Share code DOORS-PRIYA250 • Instant ₹100 discount for your friend
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform shrink-0 relative z-10" />
        </div>

        {/* Quick Subscription Callout */}
        <div
          onClick={() => onNavigateScreen('subscriptions')}
          className="cursor-pointer bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 flex items-center justify-between hover:bg-emerald-100/70 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              🌾
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-950">
                Daily Vegetable Subscription
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                Fresh basket at your doorstep starting ₹299/mo
              </div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0" />
        </div>
      </div>

      {/* Bottom Nav */}
      <MobileNavBar
        currentScreen="home"
        onNavigate={onNavigateScreen}
        wishlistCount={wishlistCount}
      />
    </div>
  );
};
