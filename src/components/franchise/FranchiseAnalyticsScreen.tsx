import React from 'react';
import {
  TrendingUp,
  Coins,
  Receipt,
  Download,
  Calendar,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  PieChart,
} from 'lucide-react';
import { FranchiseFinancialSummary, FranchiseHub } from '../../types';

interface FranchiseAnalyticsScreenProps {
  hub: FranchiseHub;
  financials: FranchiseFinancialSummary;
  onExportStatement?: () => void;
}

export const FranchiseAnalyticsScreen: React.FC<FranchiseAnalyticsScreenProps> = ({
  hub,
  financials,
  onExportStatement,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-teal-800 text-white px-4 pt-4 pb-6 rounded-b-3xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-bold text-white">Hub Margins & Commercials</h1>
            <p className="text-xs text-teal-200">Daily Revenue Statement · Transparent Commission</p>
          </div>
          <span className="text-[10px] bg-teal-700 text-teal-100 border border-teal-600 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-300" /> Verified Settlement
          </span>
        </div>

        {/* Big Net Margin Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-200">
                Today's Net Profit
              </span>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                ₹{financials.netDailyProfit.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300">
                Hub Turnaround
              </span>
              <div className="text-sm font-bold text-white mt-0.5">
                {financials.totalProduceSoldKg} kg Handled
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-teal-100">
            <span>Gross Sales Volume: ₹{financials.dailyGrossRevenue.toLocaleString()}</span>
            <span className="font-semibold text-emerald-300">~13.0% Net Margin</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 -mt-2">
        {/* Itemized Commercials Breakdown */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Today's Earnings Breakdown
          </h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-600" />
                <span className="text-slate-700">Hub Handling Fee ({financials.totalProduceSoldKg} kg @ ₹3.5/kg)</span>
              </div>
              <span className="font-bold text-slate-900">
                ₹{Math.round(financials.totalProduceSoldKg * financials.handlingFeeRatePerKg).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span className="text-slate-700">Retail Fulfillment Margin (~8%)</span>
              </div>
              <span className="font-bold text-slate-900">₹{financials.hubCommissionEarned.toLocaleString()}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span className="text-slate-700">On-Time SLA Delivery Bonus</span>
              </div>
              <span className="font-bold text-emerald-700">+₹{financials.deliveryIncentives}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span className="text-slate-700">Spoilage Redirection Adjustment</span>
              </div>
              <span className="font-bold text-rose-700">-₹{financials.wastagePenaltyDeduction}</span>
            </div>

            <div className="flex items-center justify-between pt-2 text-sm">
              <span className="font-extrabold text-slate-900">Total Transferred to Franchise Account</span>
              <span className="font-extrabold text-teal-800">₹{financials.netDailyProfit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Weekly Settlement Cycle Box */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4 text-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-bold text-teal-900">
              <Building2 className="w-4 h-4 text-teal-700" /> Weekly Settlement Schedule
            </div>
            <span className="text-[10px] bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded">
              Next: Monday 09:00 AM
            </span>
          </div>
          <p className="text-teal-800 text-[11px] leading-relaxed">
            All daily handling commissions and dispatch bonuses are aggregated weekly and credited directly to the franchise nodal current account via RTGS with 100% automated TDS certificates.
          </p>

          <div className="mt-3 pt-2.5 border-t border-teal-200/80 flex items-center justify-between">
            <span className="text-[10px] text-slate-500">Nodal Bank: HDFC Bank •••• 9104</span>
            <button
              onClick={onExportStatement}
              className="bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-xs transition-colors"
            >
              <Download className="w-3 h-3" /> Download Tax Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
