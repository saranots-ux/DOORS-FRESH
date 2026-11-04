import React, { useState } from 'react';
import {
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Pause,
  Play,
  RotateCw,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { MobileNavBar } from '../MobileNavBar';
import { FarmBasketIllustration } from '../../common/ProduceGraphics';
import { ScreenType, SubscriptionPlan } from '../../../types';

interface SubscriptionsScreenProps {
  plans: SubscriptionPlan[];
  onToggleSubscription: (planId: string) => void;
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const SubscriptionsScreen: React.FC<SubscriptionsScreenProps> = ({
  plans,
  onToggleSubscription,
  onBack,
  onNavigateScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'plans' | 'active'>('plans');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubscribeClick = (plan: SubscriptionPlan) => {
    setSelectedPlanId(plan.id);
    setShowConfirmModal(true);
  };

  const confirmSubscription = () => {
    if (selectedPlanId) {
      onToggleSubscription(selectedPlanId);
    }
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800">
      <MobileHeader
        title="Subscriptions"
        showBack={true}
        onBack={onBack}
        rightAction="none"
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Banner matching design board Screen 9 */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-4 shadow-sm">
          <div className="relative z-10 max-w-[65%]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1.5">
              Direct Farm Program
            </span>
            <h3 className="text-base font-extrabold leading-snug">
              Save More with Our Subscription Plans
            </h3>
            <p className="text-[11px] text-emerald-100 mt-1 font-medium">
              Free priority morning dispatch, zero pesticide harvest, pause anytime.
            </p>
          </div>

          <div className="absolute -right-4 -bottom-4 w-32 h-28 pointer-events-none">
            <FarmBasketIllustration className="w-full h-full drop-shadow-md" />
          </div>
        </div>

        {/* 3 Subscription Plan Cards matching design board Screen 9 */}
        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                plan.isSubscribed
                  ? 'border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                  : 'border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-xs ${
                      plan.id === 'sub-veg'
                        ? 'bg-emerald-100 text-emerald-800'
                        : plan.id === 'sub-fruit'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    {plan.id === 'sub-veg' ? '🥗' : plan.id === 'sub-fruit' ? '🍓' : '🧺'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 leading-tight">
                        {plan.name}
                      </h4>
                      {plan.isSubscribed && (
                        <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                          Active Plan
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                      {plan.subtitle}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <div className="text-base font-black text-slate-900 font-mono">
                    ₹{plan.priceMonthly}
                    <span className="text-[10px] text-slate-500 font-normal font-sans">
                      /month
                    </span>
                  </div>
                  <div className="text-[9px] text-emerald-700 font-semibold font-mono">
                    ≈ ₹{Math.round(plan.priceMonthly / 30)}/day
                  </div>
                </div>
              </div>

              {/* Inclusions list */}
              <div className="my-3 pt-2.5 border-t border-slate-100">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Harvest Basket Includes:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {plan.itemsIncluded.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1"
                    >
                      <Check className="w-2.5 h-2.5 text-emerald-600 stroke-[3]" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button matching board Screen 9 */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-slate-500 font-medium">
                  {plan.frequency}
                </span>

                <button
                  onClick={() => handleSubscribeClick(plan)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-xs ${
                    plan.isSubscribed
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/10'
                  }`}
                >
                  {plan.isSubscribed ? 'Manage / Pause' : 'Subscribe'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition Strip */}
        <div className="bg-emerald-50 rounded-2xl p-3.5 border border-emerald-100 text-xs text-emerald-950 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
          <div className="text-[11px] leading-relaxed">
            <strong>Subscribers Save 28%</strong> on average compared to daily market rates. Plus enjoy zero delivery charges on all additional pantry add-ons.
          </div>
        </div>
      </div>

      {/* Subscription Action Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 shadow-2xl text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-xl">
              🌾
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Confirm Subscription Change
            </h4>
            <p className="text-xs text-slate-500">
              Your daily harvest slot is locked to Morning Harvest (6:00 AM - 8:00 AM). You can pause or cancel anytime with one tap.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={confirmSubscription}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav */}
      <MobileNavBar
        currentScreen="subscriptions"
        onNavigate={onNavigateScreen}
      />
    </div>
  );
};
