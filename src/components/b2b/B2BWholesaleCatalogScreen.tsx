import React, { useState } from 'react';
import {
  Boxes,
  TrendingDown,
  ShoppingBag,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  Layers,
  Percent,
} from 'lucide-react';
import { B2BBusinessProfile, B2BScreenType, B2BWholesaleItem } from '../../types';

interface B2BWholesaleCatalogScreenProps {
  currentClient: B2BBusinessProfile;
  items: B2BWholesaleItem[];
  onPlaceBulkOrder?: (order: any) => void;
  onNavigate: (screen: B2BScreenType) => void;
}

export const B2BWholesaleCatalogScreen: React.FC<B2BWholesaleCatalogScreenProps> = ({
  currentClient,
  items,
  onPlaceBulkOrder,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Record<string, number>>({
    'B2B-ITEM-01': 4, // 4 Crates Roma Tomato = 100 kg
    'B2B-ITEM-02': 2, // 2 Bags Small Onions = 100 kg
  });
  const [isOrderPlacedToast, setIsOrderPlacedToast] = useState(false);

  const categories = ['All', 'Vegetable', 'Root', 'Leafy', 'Pantry Bulk'];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tamilName.includes(searchQuery) ||
      item.originDistrict.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Calculate order totals
  let totalOrderUnits = 0;
  let totalWeightKg = 0;
  let totalSubtotalInr = 0;
  let totalMandiBenchmarkInr = 0;

  Object.entries(cart).forEach(([itemId, qty]) => {
    const item = items.find((i) => i.id === itemId);
    if (item && qty > 0) {
      totalOrderUnits += qty;
      const approxKgPerUnit = item.packagingUnit.includes('50 kg')
        ? 50
        : item.packagingUnit.includes('25 kg')
        ? 25
        : item.packagingUnit.includes('20')
        ? 20
        : 10;
      const kg = qty * approxKgPerUnit;
      totalWeightKg += kg;
      totalSubtotalInr += qty * item.doorsFreshCratePrice;
      totalMandiBenchmarkInr += kg * item.mandiBenchmarkRatePerKg;
    }
  });

  const totalSavingsInr = Math.max(0, totalMandiBenchmarkInr - totalSubtotalInr);

  const handleCheckout = () => {
    if (totalSubtotalInr === 0) return;
    setIsOrderPlacedToast(true);
    setTimeout(() => {
      setIsOrderPlacedToast(false);
      onNavigate('b2b_invoices');
    }, 1800);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header with Client HUD */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 shrink-0 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-900/80 text-indigo-300 border border-indigo-700/60 flex items-center justify-center font-bold text-xs shrink-0">
              {currentClient.businessName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="truncate max-w-[200px]">{currentClient.businessName}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
                  Active
                </span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-2">
                <span>Credit Avail: ₹{((currentClient.creditLimitInr - currentClient.creditUsedInr) / 1000).toFixed(0)}k</span>
                <span>•</span>
                <span className="text-indigo-400 font-mono">{currentClient.deliveryWindowPreference.split('(')[0].trim()}</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('b2b_connect')}
            className="text-[10px] px-2 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
          >
            Switch Client
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="mt-3 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chef produce, tomato crates, onions..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Produce List */}
      <div className="p-4 flex-1 space-y-3 pb-24">
        {filteredItems.map((item) => {
          const qty = cart[item.id] || 0;

          return (
            <div
              key={item.id}
              className="bg-slate-800/70 p-3 rounded-2xl border border-slate-700/60 flex flex-col justify-between gap-2.5 hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300">
                      {item.name}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 shrink-0">
                      Save {item.savingsVsMandiPercent}%
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {item.tamilName} • {item.originDistrict}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {item.packagingUnit}
                    </span>
                    <span className="text-[10px] text-amber-300">
                      {item.grade}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price & Cart Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-bold text-white">
                      ₹{item.doorsFreshCratePrice}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      (₹{item.doorsFreshBulkPricePerKg}/kg)
                    </span>
                    <span className="text-[10px] text-slate-500 line-through">
                      ₹{item.mandiBenchmarkRatePerKg}/kg APMC
                    </span>
                  </div>
                  <div className="text-[9px] text-indigo-400 font-mono">
                    Stock in Hub: {item.availableStockKg} kg
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
                  <button
                    type="button"
                    onClick={() => handleUpdateQuantity(item.id, -1)}
                    disabled={qty === 0}
                    className="w-6 h-6 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 flex items-center justify-center font-bold text-xs disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white font-mono">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUpdateQuantity(item.id, 1)}
                    className="w-6 h-6 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Bulk Order Drawer */}
      {totalOrderUnits > 0 && (
        <div className="fixed bottom-0 left-0 right-0 max-w-[380px] mx-auto bg-slate-950/95 backdrop-blur-md border-t border-indigo-900/60 p-3 shadow-2xl z-30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{totalOrderUnits} Crates ({totalWeightKg} kg)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-semibold">
                  Saved ₹{totalSavingsInr}
                </span>
              </div>
              <div className="text-[10px] text-slate-400">
                15-Day Commercial Credit Line Approved
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold text-white">₹{totalSubtotalInr.toLocaleString()}</div>
              <div className="text-[9px] text-slate-400 font-mono">GST 0% on Fresh</div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCheckout}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-950/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Book 04:30 AM Reefer Delivery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Toast Notification on checkout */}
      {isOrderPlacedToast && (
        <div className="fixed top-12 left-6 right-6 max-w-[340px] mx-auto bg-emerald-600 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <div className="font-bold">B2B Purchase Order Confirmed!</div>
            <div className="text-[10px] text-emerald-100">
              Reefer dispatch scheduled for tomorrow morning.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
