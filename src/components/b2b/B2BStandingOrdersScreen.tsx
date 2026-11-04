import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Pause,
  Play,
  TrendingUp,
  AlertCircle,
  Truck,
  Plus,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { B2BBusinessProfile, B2BScreenType, B2BStandingOrder } from '../../types';

interface B2BStandingOrdersScreenProps {
  currentClient: B2BBusinessProfile;
  standingOrders: B2BStandingOrder[];
  onToggleStatus?: (orderId: string) => void;
  onNavigate: (screen: B2BScreenType) => void;
}

export const B2BStandingOrdersScreen: React.FC<B2BStandingOrdersScreenProps> = ({
  currentClient,
  standingOrders,
  onToggleStatus,
  onNavigate,
}) => {
  const [orders, setOrders] = useState<B2BStandingOrder[]>(standingOrders);
  const [surgeBoostToast, setSurgeBoostToast] = useState(false);

  const handleToggle = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: o.status === 'active' ? 'paused' : 'active' }
          : o
      )
    );
    if (onToggleStatus) onToggleStatus(orderId);
  };

  const handleApplySurgeBoost = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              dailyTotalKg: Math.round(o.dailyTotalKg * 1.3),
              dailyEstimatedInr: Math.round(o.dailyEstimatedInr * 1.3),
              title: `${o.title} (Weekend Surge +30%)`,
            }
          : o
      )
    );
    setSurgeBoostToast(true);
    setTimeout(() => setSurgeBoostToast(false), 2500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header Banner */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 shrink-0 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold mb-1 border border-indigo-500/30">
              <Calendar className="w-3 h-3 text-indigo-400" />
              <span>Automated Daily Kitchen Supply</span>
            </div>
            <h2 className="text-sm font-bold text-white">Standing Kitchen Orders</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('b2b_catalog')}
            className="px-2.5 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Standing Order</span>
          </button>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Recurring daily produce dispatched direct to your receiving dock before 05:30 AM
        </p>
      </div>

      {/* Orders List */}
      <div className="p-4 flex-1 space-y-4">
        {orders.map((order) => {
          const isActive = order.status === 'active';

          return (
            <div
              key={order.id}
              className={`p-4 rounded-2xl border transition-all ${
                isActive
                  ? 'bg-slate-800/80 border-slate-700 shadow-md'
                  : 'bg-slate-900/60 border-slate-800 opacity-60'
              }`}
            >
              {/* Order Header */}
              <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-700/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-white">{order.title}</h3>
                    <span
                      className={`text-[9px] px-2 py-0.2 rounded-full font-bold uppercase font-mono border ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}
                    >
                      {isActive ? 'Active Daily Drop' : 'Paused by Kitchen'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      <span>{order.dailyDeliveryTime}</span>
                    </span>
                    <span>•</span>
                    <span className="text-indigo-300 font-mono">{order.assignedDeliverySlot}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggle(order.id)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-amber-950/50 hover:bg-amber-900 text-amber-300 border-amber-700/50'
                      : 'bg-emerald-950/50 hover:bg-emerald-900 text-emerald-300 border-emerald-700/50'
                  }`}
                >
                  {isActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isActive ? 'Pause' : 'Resume'}</span>
                </button>
              </div>

              {/* Items Breakdown */}
              <div className="py-3 space-y-2">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Daily Crate Inclusions ({order.items.length} staples):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-slate-700/50 text-[11px]"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-slate-200 truncate">{item.cropName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{item.packagingUnit}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-white font-mono">
                          {item.quantityUnits} Units (~{item.approxKg} kg)
                        </div>
                        <div className="text-[9px] text-emerald-400 font-mono">
                          ₹{item.pricePerUnit * item.quantityUnits}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer & Actions */}
              <div className="pt-2.5 border-t border-slate-700/60 flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-bold text-white flex items-baseline gap-1.5">
                    <span>{order.dailyTotalKg} kg / day</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      (~₹{order.dailyEstimatedInr.toLocaleString()}/day)
                    </span>
                  </div>
                  <div className="text-[9px] text-indigo-400 font-mono">
                    Next: {order.nextScheduledDelivery}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleApplySurgeBoost(order.id)}
                  className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-750 text-amber-300 hover:text-amber-200 border border-amber-500/40 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                >
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>+30% Weekend Surge</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Info Box */}
        <div className="bg-indigo-950/40 p-3.5 rounded-2xl border border-indigo-800/40 space-y-1 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Guaranteed Morning Supply SLA</span>
          </div>
          <p className="text-[10px] text-indigo-200/80 max-w-sm mx-auto">
            Produce harvested by midnight, sorted at dark store by 03:00 AM, and dropped at kitchen dock before morning shift. Zero missed deliveries.
          </p>
        </div>
      </div>

      {/* Toast Alert */}
      {surgeBoostToast && (
        <div className="fixed top-12 left-6 right-6 max-w-[340px] mx-auto bg-amber-600 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <Sparkles className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <div className="font-bold">Weekend Banquet Surge Applied (+30%)!</div>
            <div className="text-[10px] text-amber-100">
              Kitchen capacity adjusted for Saturday-Sunday volume.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
