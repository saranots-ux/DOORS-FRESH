import React from 'react';
import {
  Smartphone,
  Layers,
  Sparkles,
  ArrowRight,
  Star,
  Bell,
  HelpCircle,
  ShoppingBag,
  CheckCircle,
  Palette,
  Code2,
} from 'lucide-react';
import { ScreenType } from '../../types';

interface ScreenInspectorProps {
  currentScreen: ScreenType;
  onSelectScreen: (screen: ScreenType) => void;
  onOpenNotifications: () => void;
  onOpenHelpSupport: () => void;
  onOpenSettings: () => void;
  onOpenRewards?: () => void;
}

export const ScreenInspector: React.FC<ScreenInspectorProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenNotifications,
  onOpenHelpSupport,
  onOpenSettings,
  onOpenRewards,
}) => {
  const screensList: { id: ScreenType; label: string; number: string; desc: string }[] = [
    { id: 'splash', number: '1', label: 'Splash Screen', desc: 'Brand reveal, farm field illustration, loader' },
    { id: 'auth', number: '2', label: 'Login / Signup', desc: 'Phone OTP, Social SSO, Terms' },
    { id: 'home', number: '3', label: 'Home Dashboard', desc: 'Location picker, banners, 8 categories, deals' },
    { id: 'listing', number: '4', label: 'Product Listing', desc: 'Vegetables filter pills, search, 2-col cards' },
    { id: 'product_detail', number: '5', label: 'Product Details', desc: 'Hero photo, 5★ review system, badges, add' },
    { id: 'cart', number: '6', label: 'Shopping Cart', desc: 'Steppers, coupon discount, delivery fee breakdown' },
    { id: 'checkout', number: '7', label: 'Checkout & Payment', desc: 'Address selection, slot picker, UPI/Card/COD' },
    { id: 'tracking', number: '8', label: 'Order Tracking', desc: 'Live vector map, ETA badge, Rajesh Kumar partner' },
    { id: 'subscriptions', number: '9', label: 'Subscription Plans', desc: 'Veg, Fruit, and Family combo monthly plans' },
    { id: 'wishlist', number: '❤️', label: 'My Wishlist', desc: 'Favorited farm items, instant move to cart' },
    { id: 'profile', number: '10', label: 'My Profile', desc: 'Priya Sharma, order history, wallet, settings' },
    { id: 'referral', number: '🎁', label: 'Refer a Friend', desc: 'Unique link generation, dual loyalty points & referral tracking' },
    { id: 'help_support', number: '10+', label: 'Help & Support', desc: 'FAQ database, 24x7 channels, AgriBot chat' },
    { id: 'settings_notifications', number: '⚙️', label: 'Notification Settings', desc: 'Configurable push toggles (Orders, Offers, Harvest)' },
  ];

  const screenDetailsMap: Record<ScreenType, { title: string; bullets: string[]; uxHighlights: string[] }> = {
    splash: {
      title: 'Screen 1: Splash Screen',
      bullets: [
        'Official Doors Fresh brand logo banner with doorway typography & leaf accents',
        'Lush vector crop rows with sunbeam atmospheric depth',
        'Handcrafted woven harvest basket overflowing with produce',
        'Smooth loading progress indicator settling at 100%',
        'Direct CTA to bypass to farm store immediately',
      ],
      uxHighlights: ['Instant brand recognition', 'Warm agricultural aesthetic', 'Pesticide-free trust marker'],
    },
    auth: {
      title: 'Screen 2: Login / Signup',
      bullets: [
        'Dual-tab segmented control for frictionless switching',
        'Indian mobile phone input (+91 prefix with flag)',
        'Simulated 4-digit SMS OTP verification workflow',
        'Google & Apple OAuth quick-sign-in buttons',
        'Quick prototype fill button for instant evaluation as Priya Sharma',
      ],
      uxHighlights: ['One-tap authentication', 'No password reach fatigue', 'Clear legal terms consent'],
    },
    home: {
      title: 'Screen 3: Home Dashboard',
      bullets: [
        'City delivery selector (Chennai, Bangalore, Coimbatore)',
        'Push notification bell with unread badge counter',
        'Promotional 30% OFF daily harvest hero banner',
        '8-category interactive touch grid with custom iconography',
        'Flash Harvest Deal card with coupon code HARVEST20',
        'Fixed bottom navigation anchor bar',
      ],
      uxHighlights: ['Above-the-fold value proposition', 'Quick thumb category reach', 'Real-time notification indicator'],
    },
    listing: {
      title: 'Screen 4: Product Categories and Listing',
      bullets: [
        'Live instant search bar with real-time text filter',
        'Subcategory chips: All, Leafy, Root, Others',
        '2-column agricultural product cards with price per kg',
        'Direct stepper quantity counter or one-tap +Add button',
        'Floating bottom cart summary bar when items exist in basket',
      ],
      uxHighlights: ['Rapid visual scanning', 'No two-line title wrapping', 'Inline cart state synchronization'],
    },
    product_detail: {
      title: 'Screen 5: Product Details & Reviews',
      bullets: [
        'Hero high-resolution glossy vine-ripe tomato with cross-section slice',
        '5-Star customer rating breakdown bar chart',
        'Interactive Write a Review modal with verified purchase badge',
        '3 Core Agricultural Badges: Farm Fresh, No Pesticides, Quality Assured',
        'Direct farm harvest transparency (Chengalpattu hub timestamp)',
        'Sticky bottom price calculation & Add to Cart button',
      ],
      uxHighlights: ['Verified social proof', 'Rich sensory agricultural storytelling', 'Transparent harvest origins'],
    },
    cart: {
      title: 'Screen 6: Shopping Cart',
      bullets: [
        'Itemized produce rows with live quantity stepper',
        'Promotional coupon field with instant 20% discount recalculation',
        'Transparent bill details: Subtotal, Delivery Charge (₹20), Total (₹87)',
        'Sticky Proceed to Checkout bar with payable sum',
      ],
      uxHighlights: ['Zero hidden fees', 'Easy modification', 'Eco-packaging guarantee'],
    },
    checkout: {
      title: 'Screen 7: Checkout & Payment',
      bullets: [
        'Enhanced "Select Delivery Slot" feature with multi-day tabs (Today, Tomorrow, Monday)',
        'Farm harvest windows: Early Morning (6-8 AM), Mid-Day (11:30 AM-1:30 PM), Evening (6-8 PM)',
        'Quick slot chips directly on checkout screen for 1-tap switching without opening modal',
        'Eco-route batching & contactless thermal crate delivery options',
        'Saved delivery address selector (#123 Green Park, Chennai)',
        'Multiple payment channels: UPI (GPay/PhonePe), Cards, Net Banking, COD',
      ],
      uxHighlights: ['Predictable farm delivery', 'Eco route batching', 'Free delivery for Gold tier'],
    },
    tracking: {
      title: 'Screen 8: Order Tracking & Live Map',
      bullets: [
        '4-stage visual progress tracker (Placed -> Packed -> Out -> Delivered)',
        'Interactive SVG road network with delivery scooter & route line',
        'Live ETA callout bubble ("Arriving in 20 min")',
        'Assigned partner card: Rajesh Kumar with direct phone simulator',
        'Invoice modal & button to test the Delivered state for reviewing!',
      ],
      uxHighlights: ['Anxiety-reducing live ETA', 'Direct human partner contact', 'Post-delivery review prompt'],
    },
    subscriptions: {
      title: 'Screen 9: Subscription Plans',
      bullets: [
        'Direct Farm Program promotional value banner',
        'Vegetable Plan (₹299/mo), Fruit Plan (₹349/mo), Family Combo (₹599/mo)',
        'Included harvest produce breakdown badges',
        'One-tap subscribe, pause, or resume modal without penalties',
      ],
      uxHighlights: ['28% subscriber cost savings', 'Convenient morning dispatch', 'Flexible pause option'],
    },
    wishlist: {
      title: 'Wishlist & Favorites Screen (Requested Feature)',
      bullets: [
        'Curated list of customer-favorited fresh farm produce',
        'Direct "Move to Cart" button with instant feedback toast',
        '"Move All to Cart" sticky bottom action for frictionless bulk ordering',
        'Heart toggle to quickly add or remove favorites from product cards or detail view',
      ],
      uxHighlights: ['Fast reordering', 'No cart friction', 'Immediate visual state sync'],
    },
    profile: {
      title: 'Screen 10: My Profile & Wishore Rewards',
      bullets: [
        'Verified member card: Priya Sharma with Gold Harvester tier badge',
        'Wishore Rewards Loyalty Card: 1,840 pts balance, tier progress & 1.5× multiplier',
        'Direct points redemption for ₹50 / ₹100 farm wallet store credits',
        'Points earning: 1 pt/₹1 on orders, +50 pts on verified produce reviews',
        'Direct access to Orders, Subscriptions, Addresses, and ₹125 Wallet',
        'Dedicated Help & Support section with FAQs and AgriBot',
        'Settings & Notification preferences for push alerts',
      ],
      uxHighlights: ['Gamified customer loyalty', 'Tier progress incentive', 'Transparent points redemption'],
    },
    help_support: {
      title: 'Help & Support Hub (Requested Feature)',
      bullets: [
        'Comprehensive categorized FAQ database with instant text search',
        '24x7 phone helpline, WhatsApp direct desk, and email contacts',
        'Interactive AgriBot AI Chatbot with smart quick question answers',
        'Unconditional 100% Freshness Guarantee and Wallet refund policy',
      ],
      uxHighlights: ['Instant problem resolution', 'Multi-channel access', 'Conversational farm support'],
    },
    settings_notifications: {
      title: 'Push Notification Settings (Requested Feature)',
      bullets: [
        'Push notifications master switch',
        'Granular category controls: Order Status, Special Offers, New Arrivals',
        'Daily Morning Harvest summary toggle',
        'Multi-channel toggles: App Push, SMS, and WhatsApp alerts',
      ],
      uxHighlights: ['User privacy & control', 'No spam guarantee', 'Configurable channels'],
    },
    referral: {
      title: 'Refer a Friend & Dual Loyalty Rewards',
      bullets: [
        'Unique referral code (DOORS-PRIYA250) and customized invite link generation',
        'One-click copy and instant social sharing via WhatsApp, SMS & QR Code',
        'Dual loyalty points reward: +250 Coins to referrer & +100 Coins to new friend',
        'Interactive simulated friend registration tester',
        'Referral status tracking (Registered, First Harvest Ordered, Completed)',
      ],
      uxHighlights: ['Viral referral mechanics', 'Instant wallet coins crediting', 'Transparent invite tracker'],
    },
  };

  const currentInfo = screenDetailsMap[currentScreen] || screenDetailsMap.home;

  return (
    <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
      {/* Screen Selector Header */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md">
            Design Navigator
          </span>
          <span className="text-xs text-slate-400 font-mono">10 Design Screens</span>
        </div>
        <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
          Select Screen to Preview
        </h3>
      </div>

      {/* Screen Badges Grid */}
      <div className="grid grid-cols-2 gap-1.5 max-h-[220px] overflow-y-auto no-scrollbar p-0.5">
        {screensList.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              if (sc.id === 'help_support') {
                onOpenHelpSupport();
              } else if (sc.id === 'settings_notifications') {
                onOpenSettings();
              } else {
                onSelectScreen(sc.id);
              }
            }}
            className={`text-left p-2 rounded-xl border text-xs transition-all flex items-start gap-2 ${
              currentScreen === sc.id
                ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                : 'border-slate-100 hover:border-slate-200 text-slate-700 bg-slate-50/60'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 font-bold ${
                currentScreen === sc.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {sc.number}
            </span>
            <div className="min-w-0">
              <div className="truncate font-semibold">{sc.label}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Screen Specs Card */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            {currentInfo.title}
          </h4>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Core Specifications:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {currentInfo.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold text-xs mt-0.5">✓</span>
                <span className="leading-snug">{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            UX Intent & Ergonomics:
          </span>
          <div className="flex flex-wrap gap-1">
            {currentInfo.uxHighlights.map((u, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded-md"
              >
                {u}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Color Tokens Reference */}
      <div className="pt-2 border-t border-slate-100">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
          Agricultural Color Palette:
        </span>
        <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
          <div>
            <div className="w-full h-6 rounded-lg bg-emerald-600 mb-1" />
            <span className="font-mono text-slate-700 font-semibold">#16a34a</span>
            <span className="block text-[9px] text-slate-400">Harvest</span>
          </div>
          <div>
            <div className="w-full h-6 rounded-lg bg-emerald-800 mb-1" />
            <span className="font-mono text-slate-700 font-semibold">#065f46</span>
            <span className="block text-[9px] text-slate-400">Deep Earth</span>
          </div>
          <div>
            <div className="w-full h-6 rounded-lg bg-amber-500 mb-1" />
            <span className="font-mono text-slate-700 font-semibold">#f59e0b</span>
            <span className="block text-[9px] text-slate-400">Golden Crop</span>
          </div>
          <div>
            <div className="w-full h-6 rounded-lg bg-rose-600 mb-1" />
            <span className="font-mono text-slate-700 font-semibold">#e11d48</span>
            <span className="block text-[9px] text-slate-400">Ripe Tomato</span>
          </div>
        </div>
      </div>
    </div>
  );
};
