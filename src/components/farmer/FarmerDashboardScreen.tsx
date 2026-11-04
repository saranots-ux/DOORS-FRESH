import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  TrendingUp,
  PackageCheck,
  Calendar,
  AlertTriangle,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Banknote,
  Sparkles,
  UserPlus,
} from 'lucide-react';
import { FarmerBatch, FarmerProfile, MandiRate } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface FarmerDashboardScreenProps {
  farmer: FarmerProfile;
  batches: FarmerBatch[];
  mandiRates: MandiRate[];
  allFarmers?: FarmerProfile[];
  onSelectFarmer?: (farmer: FarmerProfile) => void;
  onOpenRegisterFarmer?: () => void;
  onNavigate: (screen: 'farmer_home' | 'farmer_batches' | 'farmer_rates' | 'farmer_advisory' | 'farmer_earnings') => void;
  onOpenCreateBatch?: () => void;
}

export const FarmerDashboardScreen: React.FC<FarmerDashboardScreenProps> = ({
  farmer,
  batches,
  mandiRates,
  allFarmers,
  onSelectFarmer,
  onOpenRegisterFarmer,
  onNavigate,
  onOpenCreateBatch,
}) => {
  const activeBatches = batches.filter((b) => b.status !== 'settled');
  const settledBatches = batches.filter((b) => b.status === 'settled');
  const totalEarningsYtd = settledBatches.reduce((acc, b) => acc + (b.totalPayoutAmount || 0), 0);

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Kisan Header */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-800 text-white px-4 pt-4 pb-6 rounded-b-3xl shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DoorsFreshLogo size="sm" variant="icon" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-200">Kisan Mitra Pro</span>
                <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-600/80 text-emerald-100 px-1.5 py-0.5 rounded font-medium">
                  <ShieldCheck className="w-2.5 h-2.5" /> KYC Verified
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <h1 className="text-base font-bold leading-tight text-white">{farmer.name}</h1>
                {onOpenRegisterFarmer && (
                  <button
                    onClick={onOpenRegisterFarmer}
                    className="text-[10px] bg-white/20 hover:bg-white/30 text-emerald-100 px-2 py-0.5 rounded-lg border border-white/25 font-bold flex items-center gap-1 transition-all cursor-pointer"
                    title="Register New Farmer"
                  >
                    <UserPlus className="w-3 h-3" /> + Add Farmer
                  </button>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('farmer_earnings')}
            className="text-right bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-xl backdrop-blur-sm transition-colors border border-white/15"
          >
            <div className="text-[10px] text-emerald-200 uppercase font-medium">Today's Payouts</div>
            <div className="text-sm font-bold text-white">₹13,012</div>
          </button>
        </div>

        {/* Farmer Switcher Bar (if multiple registered) */}
        {allFarmers && allFarmers.length > 1 && onSelectFarmer && (
          <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto text-xs py-1">
            <span className="text-[10px] text-emerald-200 font-semibold whitespace-nowrap">Switch Account:</span>
            {allFarmers.map((f) => (
              <button
                key={f.id}
                onClick={() => onSelectFarmer(f)}
                className={`text-[10px] px-2 py-0.5 rounded-md font-semibold transition-all whitespace-nowrap ${
                  f.id === farmer.id
                    ? 'bg-white text-emerald-900 shadow-xs'
                    : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
                }`}
              >
                {f.name.split(' ')[0]} ({f.district})
              </button>
            ))}
          </div>
        )}

        {/* Location & Micro-Weather Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
          <div className="flex items-center justify-between text-xs text-emerald-100 mb-2 font-medium">
            <span className="flex items-center gap-1 truncate max-w-[200px]">
              📍 {farmer.location}
            </span>
            <span className="text-amber-300 font-semibold">28°C · Part Cloudy</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-cyan-300" /> Soil Moisture
              </span>
              <span className="text-xs font-bold text-white">64% (Optimal)</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/10">
              <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                <Wind className="w-3 h-3 text-amber-200" /> Rain Prob.
              </span>
              <span className="text-xs font-bold text-white">20% Tonight</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                <CloudSun className="w-3 h-3 text-yellow-300" /> Harvest Brix
              </span>
              <span className="text-xs font-bold text-white">8.4° (Sweet)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-4">
        {/* Quick Action Procurement Banner */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-emerald-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Guaranteed Farmgate Procurement
            </div>
            <p className="text-xs text-slate-600 mt-0.5">Doors Fresh pays 25% to 35% above Mandi APMC rates.</p>
          </div>
          <button
            onClick={onOpenCreateBatch || (() => onNavigate('farmer_batches'))}
            className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1 shrink-0 shadow-xs active:scale-95 transition-all"
          >
            Sell Harvest <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Live KPI Cards */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => onNavigate('farmer_batches')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium">Scheduled Lots</span>
              <PackageCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">450 kg</div>
            <div className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5 mt-0.5">
              Pickup vehicle in 45m
            </div>
          </div>

          <div
            onClick={() => onNavigate('farmer_rates')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium">Top Rate Premium</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">+₹10 / kg</div>
            <div className="text-[10px] text-slate-600 font-medium mt-0.5">
              Shallots @ ₹48 (Mandi: ₹38)
            </div>
          </div>
        </div>

        {/* Active Harvest Pickup Live Status */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> Active Farm Collection
            </h3>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">
              Van Assigned (TN-19-BA-8902)
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900">BATCH-8821 · Roma Tomato</span>
                <p className="text-[11px] text-slate-500 mt-0.5">450 kg · Grade A+ (Vine-Ripened)</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-700">₹12,712</span>
                <p className="text-[10px] text-slate-400">@ ₹28/kg</p>
              </div>
            </div>

            {/* Micro Stepper */}
            <div className="mt-3 pt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-emerald-200" /> Harvest Ready
              </div>
              <span className="text-slate-300">——</span>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse ring-2 ring-emerald-200" /> Cold Van In-Transit
              </div>
              <span className="text-slate-300">——</span>
              <div className="flex items-center gap-1 text-slate-400">
                <span className="w-2 h-2 rounded-full bg-slate-300" /> Hub Inward
              </div>
            </div>
          </div>
        </div>

        {/* Mandi vs Doors Fresh Procurement Preview */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Today's Market Rates</h3>
              <p className="text-[10px] text-slate-500">Live Kanchipuram APMC vs Doors Fresh Farmgate</p>
            </div>
            <button
              onClick={() => onNavigate('farmer_rates')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-0.5"
            >
              All Rates <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2 mt-2">
            {mandiRates.slice(0, 3).map((rate) => (
              <div key={rate.cropName} className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100">
                <div>
                  <div className="text-xs font-bold text-slate-800">{rate.cropName}</div>
                  <div className="text-[10px] text-slate-400">Mandi Rate: ₹{rate.mandiApmcRate}/kg</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-700">₹{rate.doorsFreshRate}/kg</div>
                  <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    +₹{rate.premiumAmount} (+{rate.changePercent}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agronomist Alert Banner */}
        <div
          onClick={() => onNavigate('farmer_advisory')}
          className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 flex items-start gap-3 cursor-pointer hover:bg-amber-100/70 transition-colors"
        >
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900">Rain Alert: IMD Radar 11 PM</span>
              <span className="text-[10px] font-semibold text-amber-700">Urgent</span>
            </div>
            <p className="text-[11px] text-amber-800 mt-0.5">
              18mm shower expected. Complete tomato picking and apply neem mulch.
            </p>
          </div>
          <ChevronRight className="w-4 h-4 text-amber-600 shrink-0 self-center" />
        </div>
      </div>
    </div>
  );
};
