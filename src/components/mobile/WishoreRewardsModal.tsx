import React, { useState } from 'react';
import {
  X,
  Award,
  Sparkles,
  ShoppingBag,
  Star,
  Sprout,
  ArrowRight,
  CheckCircle2,
  Gift,
  TrendingUp,
  RefreshCw,
  Zap,
} from 'lucide-react';
import { RewardActivity, UserRewards } from '../../types';

interface WishoreRewardsModalProps {
  rewards: UserRewards;
  isOpen: boolean;
  onClose: () => void;
  onRedeemPoints?: (points: number, rupeeValue: number) => void;
  onOpenReferral?: () => void;
}

export const WishoreRewardsModal: React.FC<WishoreRewardsModalProps> = ({
  rewards,
  isOpen,
  onClose,
  onRedeemPoints,
  onOpenReferral,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'tiers'>('overview');
  const [redeemSuccessToast, setRedeemSuccessToast] = useState<string | null>(null);
  const [redeemErrorToast, setRedeemErrorToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRedeem = (points: number, rupees: number) => {
    if (rewards.currentPoints < points) {
      setRedeemErrorToast(`You need at least ${points} points to redeem this reward.`);
      setTimeout(() => setRedeemErrorToast(null), 3500);
      return;
    }
    if (onRedeemPoints) {
      onRedeemPoints(points, rupees);
    }
    setRedeemSuccessToast(`Successfully redeemed ${points} points for ₹${rupees} Wallet balance!`);
    setTimeout(() => setRedeemSuccessToast(null), 3000);
  };

  const tiers = [
    {
      name: 'Seedling',
      pointsReq: '0 – 499 pts',
      multiplier: '1.0× Points',
      perks: ['Standard morning delivery', 'Direct farmer provenance'],
      isCurrent: rewards.tier === 'Seedling',
      color: 'bg-slate-100 text-slate-800 border-slate-200',
    },
    {
      name: 'Green Harvester',
      pointsReq: '500 – 1,499 pts',
      multiplier: '1.2× Points',
      perks: ['5% harvest discount', 'Free morning slots', 'Exclusive monthly recipes'],
      isCurrent: rewards.tier === 'Green Harvester',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    },
    {
      name: 'Gold Harvester',
      pointsReq: '1,500 – 3,999 pts',
      multiplier: '1.5× Points',
      perks: ['10% seasonal discount', 'Free priority delivery', 'Spotlight harvest reservation'],
      isCurrent: rewards.tier === 'Gold Harvester',
      color: 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-400/50',
    },
    {
      name: 'Agri Master',
      pointsReq: '4,000+ pts',
      multiplier: '2.0× Points',
      perks: ['VIP farm concierge', 'Complimentary seasonal fruit crate', 'Zero delivery fee forever'],
      isCurrent: rewards.tier === 'Agri Master',
      color: 'bg-teal-50 text-teal-900 border-teal-300',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight leading-tight">
                Doors Fresh Rewards
              </h3>
              <p className="text-[10px] text-emerald-100 font-medium">
                Farm-to-Doorstep Customer Loyalty
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Balance Card Banner */}
        <div className="p-4 bg-gradient-to-b from-emerald-50/80 to-white border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Current Point Balance
              </span>
              <div className="text-2xl font-black text-slate-900 font-mono flex items-center gap-1.5 mt-0.5">
                <span>{rewards.currentPoints.toLocaleString()}</span>
                <span className="text-xs font-sans font-bold text-emerald-700">pts</span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full shadow-2xs">
                👑 {rewards.tier}
              </span>
              <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                ≈ ₹{Math.round(rewards.currentPoints / 10)} Value
              </span>
            </div>
          </div>

          {/* Progress to Next Tier */}
          {rewards.nextTier && (
            <div className="mt-3 pt-2.5 border-t border-emerald-100/60">
              <div className="flex justify-between text-[11px] mb-1 font-semibold text-slate-700">
                <span className="flex items-center gap-1">
                  <span>Level Progress to</span>
                  <strong className="text-emerald-800">{rewards.nextTier}</strong>
                </span>
                <span className="font-mono text-emerald-700 font-bold">
                  {rewards.tierProgressPercent}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-600 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, rewards.tierProgressPercent))}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Earn <strong className="text-slate-800 font-mono">{rewards.pointsToNextTier}</strong> more points to unlock {rewards.nextTier} perks.
              </p>
            </div>
          )}
        </div>

        {/* Tab Controls */}
        <div className="px-4 pt-2 pb-1 border-b border-slate-100">
          <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'overview'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              How to Earn
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'history'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab('tiers')}
              className={`py-1.5 rounded-lg transition-all ${
                activeTab === 'tiers'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tier Perks
            </button>
          </div>
        </div>

        {/* Tab 1: How to Earn & Redeem */}
        {activeTab === 'overview' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Ways to Earn Points
              </h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-950 mb-1">
                    <ShoppingBag className="w-4 h-4 text-emerald-600" />
                    <span>Farm Orders</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    Earn <strong>1 point per ₹1 spent</strong> on all fresh harvest veggies.
                  </p>
                </div>

                <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-950 mb-1">
                    <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Rate & Review</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    Earn <strong>+50 points</strong> for every verified product review!
                  </p>
                </div>

                <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-teal-950 mb-1">
                    <Sprout className="w-4 h-4 text-teal-600" />
                    <span>Subscriptions</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    Earn <strong>+200 bonus pts</strong> when activating a monthly plan.
                  </p>
                </div>

                <div className="bg-lime-50/60 border border-lime-100 rounded-xl p-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-lime-950 mb-1">
                    <RefreshCw className="w-4 h-4 text-lime-600" />
                    <span>Return Crates</span>
                  </div>
                  <p className="text-[10px] text-slate-600 leading-tight">
                    Earn <strong>+25 pts</strong> for returning sanitized wooden crates.
                  </p>
                </div>
              </div>
            </div>

            {/* Redeem Points Section */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Redeem for Farm Credits
              </h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div>
                    <div className="text-xs font-bold text-slate-900">₹50 Wallet Credit</div>
                    <div className="text-[10px] text-slate-500">Requires 500 Reward Points</div>
                  </div>
                  <button
                    onClick={() => handleRedeem(500, 50)}
                    disabled={rewards.currentPoints < 500}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95"
                  >
                    Redeem
                  </button>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <div>
                    <div className="text-xs font-bold text-slate-900">₹100 Wallet Credit</div>
                    <div className="text-[10px] text-slate-500">Requires 1,000 Reward Points</div>
                  </div>
                  <button
                    onClick={() => handleRedeem(1000, 100)}
                    disabled={rewards.currentPoints < 1000}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold shadow-xs transition-all active:scale-95"
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Activity History */}
        {activeTab === 'history' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs mb-1 px-1">
              <span className="font-bold text-slate-700">Lifetime Points Earned</span>
              <span className="font-mono font-bold text-emerald-800">
                +{rewards.lifetimePoints} pts
              </span>
            </div>

            {rewards.history.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-xl p-3 border border-slate-100 shadow-2xs flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                      act.type === 'purchase'
                        ? 'bg-emerald-100 text-emerald-700'
                        : act.type === 'review'
                        ? 'bg-amber-100 text-amber-700'
                        : act.type === 'subscription'
                        ? 'bg-teal-100 text-teal-700'
                        : act.type === 'referral'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-lime-100 text-lime-700'
                    }`}
                  >
                    {act.type === 'purchase' ? '🛒' : act.type === 'review' ? '⭐' : act.type === 'subscription' ? '🌾' : act.type === 'referral' ? '👥' : '♻️'}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 leading-snug">
                      {act.description}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {act.date}
                    </span>
                  </div>
                </div>

                <div className="text-xs font-bold font-mono text-emerald-700">
                  +{act.points} pts
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Tier Perks */}
        {activeTab === 'tiers' && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl p-3.5 border transition-all ${t.color}`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <h5 className="text-xs font-black tracking-tight">{t.name}</h5>
                    {t.isCurrent && (
                      <span className="bg-emerald-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        Your Current Tier
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold font-mono">{t.pointsReq}</span>
                </div>

                <div className="text-[11px] font-extrabold text-emerald-900 mb-2">
                  ⚡ {t.multiplier}
                </div>

                <ul className="space-y-1">
                  {t.perks.map((p, idx) => (
                    <li key={idx} className="text-[11px] flex items-center gap-1.5 opacity-90">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Error Toast */}
        {redeemErrorToast && (
          <div className="p-3 bg-rose-700 text-white text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom">
            <span>{redeemErrorToast}</span>
          </div>
        )}

        {/* Success Toast */}
        {redeemSuccessToast && (
          <div className="p-3 bg-emerald-800 text-white text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{redeemSuccessToast}</span>
          </div>
        )}
      </div>
    </div>
  );
};
