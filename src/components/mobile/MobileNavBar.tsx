import React from 'react';
import { Home, Heart, ShoppingBag, CalendarClock, User } from 'lucide-react';
import { ScreenType } from '../../types';

interface MobileNavBarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  orderCount?: number;
  wishlistCount?: number;
}

export const MobileNavBar: React.FC<MobileNavBarProps> = ({
  currentScreen,
  onNavigate,
  orderCount = 1,
  wishlistCount = 0,
}) => {
  const tabs = [
    {
      id: 'home' as ScreenType,
      label: 'Home',
      icon: Home,
      isActive: currentScreen === 'home' || currentScreen === 'listing',
    },
    {
      id: 'wishlist' as ScreenType,
      label: 'Wishlist',
      icon: Heart,
      isActive: currentScreen === 'wishlist',
      badge: wishlistCount > 0 ? `${wishlistCount}` : undefined,
    },
    {
      id: 'tracking' as ScreenType,
      label: 'Orders',
      icon: ShoppingBag,
      isActive: currentScreen === 'tracking',
      badge: orderCount > 0 ? '1' : undefined,
    },
    {
      id: 'subscriptions' as ScreenType,
      label: 'Subscribe',
      icon: CalendarClock,
      isActive: currentScreen === 'subscriptions',
    },
    {
      id: 'profile' as ScreenType,
      label: 'Account',
      icon: User,
      isActive:
        currentScreen === 'profile' ||
        currentScreen === 'help_support' ||
        currentScreen === 'settings_notifications',
    },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-2 py-2">
      <div className="grid grid-cols-5 items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center py-1 relative transition-colors ${
                tab.isActive
                  ? 'text-emerald-700 font-semibold'
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 ${
                    tab.isActive ? 'stroke-[2.4] text-emerald-700' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight leading-tight">
                {tab.label}
              </span>
              {tab.isActive && (
                <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
