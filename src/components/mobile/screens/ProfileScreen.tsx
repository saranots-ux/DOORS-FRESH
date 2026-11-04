import React from 'react';
import {
  Package,
  Calendar,
  MapPin,
  CreditCard,
  Gift,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Bell,
  Heart,
  Award,
  Users,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { MobileNavBar } from '../MobileNavBar';
import { ScreenType, UserRewards } from '../../../types';

interface ProfileScreenProps {
  onNavigateScreen: (screen: ScreenType) => void;
  onLogout: () => void;
  onOpenSettings: () => void;
  onOpenHelpSupport: () => void;
  onOpenRewards?: () => void;
  rewards?: UserRewards;
  walletBalance?: number;
  wishlistCount?: number;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onNavigateScreen,
  onLogout,
  onOpenSettings,
  onOpenHelpSupport,
  onOpenRewards,
  rewards,
  walletBalance = 125,
  wishlistCount = 0,
}) => {
  const menuItems = [
    {
      id: 'wishlist',
      icon: Heart,
      label: 'My Wishlist (Favorites)',
      badge: `${wishlistCount} saved`,
      badgeColor: 'text-rose-700 bg-rose-50 font-semibold',
      action: () => onNavigateScreen('wishlist'),
    },
    {
      id: 'orders',
      icon: Package,
      label: 'My Orders',
      badge: '1 Active',
      action: () => onNavigateScreen('tracking'),
    },
    {
      id: 'subscriptions',
      icon: Calendar,
      label: 'My Subscriptions',
      badge: 'Family Combo',
      action: () => onNavigateScreen('subscriptions'),
    },
    {
      id: 'addresses',
      icon: MapPin,
      label: 'Delivery Addresses',
      badge: '2 Saved',
      action: () => onNavigateScreen('checkout'),
    },
    {
      id: 'payments',
      icon: CreditCard,
      label: 'Payment Methods',
      badge: 'UPI & Cards',
      action: () => onNavigateScreen('checkout'),
    },
    {
      id: 'wallet',
      icon: Gift,
      label: 'Wallet & Rewards',
      badge: `${rewards?.currentPoints || 1840} pts · ₹${walletBalance}`,
      badgeColor: 'text-amber-800 bg-amber-50 font-mono font-bold',
      action: onOpenRewards || (() => onNavigateScreen('checkout')),
    },
    {
      id: 'referral',
      icon: Users,
      label: 'Refer a Friend (Earn 250 Coins)',
      badge: '+250 pts / Friend',
      badgeColor: 'text-emerald-800 bg-emerald-50 font-bold',
      action: () => onNavigateScreen('referral'),
    },
    {
      id: 'help',
      icon: HelpCircle,
      label: 'Help & Support',
      badge: '24×7 Active',
      badgeColor: 'text-teal-700 bg-teal-50 font-semibold',
      action: onOpenHelpSupport,
    },
    {
      id: 'settings',
      icon: Settings,
      label: 'Settings & Notifications',
      badge: 'Configured',
      action: onOpenSettings,
    },
  ];

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800">
      <MobileHeader
        title="My Profile"
        showBack={true}
        onBack={() => onNavigateScreen('home')}
        rightAction="settings"
        onRightAction={onOpenSettings}
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Profile Card matching design board Screen 10 */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col items-center text-center">
          <div className="relative mb-2">
            <div className="w-20 h-20 rounded-full border-4 border-emerald-100 p-0.5 shadow-sm overflow-hidden bg-emerald-50">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
                alt="Priya Sharma"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  // Fallback avatar container
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="w-full h-full flex items-center justify-center font-bold text-emerald-800 text-xl">
                PS
              </div>
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full shadow-xs" />
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Priya Sharma
          </h3>
          <p className="text-xs text-slate-500 font-medium">priya@gmail.com</p>

          <div className="mt-3 flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              Verified Agri-Member
            </span>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full">
              👑 {rewards?.tier || 'Gold Harvester'}
            </span>
          </div>
        </div>

        {/* Wishore Rewards Loyalty Card */}
        <div
          onClick={onOpenRewards}
          className="bg-gradient-to-br from-amber-500 via-amber-600 to-emerald-700 text-white rounded-2xl p-4 shadow-sm hover:shadow-md cursor-pointer transition-all group relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-200">
                  <Award className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-amber-100">
                  Wishore Rewards
                </span>
              </div>
              <span className="text-[10px] font-extrabold bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                {rewards?.tier || 'Gold Harvester'}
              </span>
            </div>

            <div className="flex items-end justify-between my-1">
              <div>
                <div className="text-2xl font-black font-mono leading-tight tracking-tight">
                  {(rewards?.currentPoints || 1840).toLocaleString()}
                  <span className="text-xs font-sans font-bold ml-1 text-amber-200">pts</span>
                </div>
                <p className="text-[10px] text-amber-100/90 mt-0.5">
                  1.5× points on orders · 50 pts per review
                </p>
              </div>

              <div className="text-right">
                <span className="text-[9px] text-white/80 block uppercase">Points Value</span>
                <span className="text-sm font-black font-mono text-white">
                  ≈ ₹{Math.round((rewards?.currentPoints || 1840) / 10)}
                </span>
              </div>
            </div>

            {/* Progress to Next Tier */}
            {rewards?.nextTier && (
              <div className="mt-2.5 pt-2 border-t border-white/20">
                <div className="flex justify-between text-[10px] mb-1 font-semibold text-amber-100">
                  <span>Level Progress to {rewards.nextTier}</span>
                  <span className="font-mono">{rewards.tierProgressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ width: `${rewards.tierProgressPercent}%` }}
                  />
                </div>
                <p className="text-[9px] text-amber-100/90 mt-1">
                  Earn {rewards.pointsToNextTier} more points to reach {rewards.nextTier} perks.
                </p>
              </div>
            )}

            <div className="mt-2.5 flex items-center justify-between text-[10px] font-bold text-amber-100 group-hover:text-white pt-1">
              <span>View Points Activity & Redeem</span>
              <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Menu Navigation Rows matching design board Screen 10 */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.action}
                className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-slate-50 active:bg-slate-100 transition-colors text-left group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-50 text-slate-700 group-hover:bg-emerald-50 group-hover:text-emerald-700 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800">
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-md ${
                        item.badgeColor || 'text-slate-500 bg-slate-100'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                </div>
              </button>
            );
          })}

          {/* Logout Row */}
          <button
            onClick={onLogout}
            className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-rose-50/50 transition-colors text-left group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-rose-600">Logout</span>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-300" />
          </button>
        </div>

        {/* App Version Footnote */}
        <div className="text-center text-[10px] text-slate-400 font-medium">
          Wishore Agri-Tech App v2.4 · Chennai Hub Build
        </div>
      </div>

      {/* Bottom Nav */}
      <MobileNavBar
        currentScreen="profile"
        onNavigate={onNavigateScreen}
        wishlistCount={wishlistCount}
      />
    </div>
  );
};
