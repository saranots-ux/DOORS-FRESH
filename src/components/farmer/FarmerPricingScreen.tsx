import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowUpRight,
  Info,
  CheckCircle,
  Scale,
  BadgePercent,
  Coins,
} from 'lucide-react';
import { MandiRate } from '../../types';

interface FarmerPricingScreenProps {
  rates: MandiRate[];
  onSelectCropToSell?: (cropName: string) => void;
}

export const FarmerPricingScreen: React.FC<FarmerPricingScreenProps> = ({
  rates,
  onSelectCropToSell,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Vegetable' | 'Root' | 'Leafy'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRates = rates.filter((r) => {
    const matchCat = selectedCategory === 'All' || r.category === selectedCategory;
    const matchSearch = r.cropName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-emerald-800 text-white px-4 pt-4 pb-5 rounded-b-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold text-white">Live Farmgate vs Mandi Rates</h1>
            <p className="text-xs text-emerald-200">Guaranteed Doors Fresh Procurement Price Index</p>
          </div>
          <span className="text-[10px] bg-emerald-600 px-2 py-1 rounded-md font-semibold text-emerald-100 border border-emerald-500">
            Live Kanchipuram APMC
          </span>
        </div>

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search crop (e.g. Tomato, Onion, Carrot)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-slate-900 pl-8 pr-3 py-1.5 rounded-xl text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 mt-2 overflow-x-auto text-xs scrollbar-none">
          {['All', 'Vegetable', 'Root', 'Leafy'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-emerald-900 font-bold'
                  : 'bg-emerald-900/50 text-emerald-200 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Why Doors Fresh Pays More Box */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Zero Brokerage & Digital Weighment Promise</span>
          </div>
          <p className="text-emerald-800 text-[11px] leading-relaxed">
            Local APMC Mandis deduct 6% to 8% commission + arbitrary weighment tare loss. Doors Fresh offers certified electronic weighment slips and 100% direct bank credit without any middleman cuts.
          </p>
        </div>

        {/* Rate Cards */}
        <div className="space-y-2.5">
          {filteredRates.map((rate) => {
            const premiumPercent = Math.round(((rate.doorsFreshRate - rate.mandiApmcRate) / rate.mandiApmcRate) * 100);

            return (
              <div
                key={rate.cropName}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{rate.cropName}</span>
                      <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.5 rounded">
                        {rate.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-500">
                      <span>Status:</span>
                      <span className={`font-semibold ${
                        rate.procurementStatus === 'High Demand'
                          ? 'text-emerald-700'
                          : rate.procurementStatus === 'Quota Full'
                          ? 'text-amber-700'
                          : 'text-slate-700'
                      }`}>
                        {rate.procurementStatus}
                      </span>
                    </div>
                  </div>

                  {/* Doors Fresh Rate Callout */}
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-wider">Doors Fresh</span>
                    <span className="text-lg font-extrabold text-emerald-700">₹{rate.doorsFreshRate}</span>
                    <span className="text-[11px] text-slate-500 font-medium">/ kg</span>
                  </div>
                </div>

                {/* Mandi vs Doors Fresh Comparison Bar */}
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">Local APMC Mandi</div>
                    <div className="text-sm font-bold text-slate-700">₹{rate.mandiApmcRate} / kg</div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-0.5 mt-0.5">
                      {rate.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-rose-600" />
                      )}
                      <span>APMC Index {rate.changePercent > 0 ? `+${rate.changePercent}%` : `${rate.changePercent}%`}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                    <div className="text-[10px] text-emerald-800 font-medium">Farmer Premium</div>
                    <div className="text-sm font-extrabold text-emerald-800">+₹{rate.premiumAmount} / kg</div>
                    <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5 mt-0.5">
                      <BadgePercent className="w-3 h-3 text-emerald-700" /> +{premiumPercent}% Extra Revenue
                    </div>
                  </div>
                </div>

                {/* Sell Action */}
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Next Reefer Van Pickup: Tomorrow 6:00 AM</span>
                  <button
                    onClick={() => onSelectCropToSell && onSelectCropToSell(rate.cropName)}
                    className="text-xs bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1 active:scale-95 transition-all"
                  >
                    Lock Rate & Sell <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
