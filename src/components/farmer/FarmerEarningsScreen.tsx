import React, { useState } from 'react';
import {
  Banknote,
  Building2,
  CheckCircle2,
  Clock,
  ArrowDownLeft,
  ShieldCheck,
  FileText,
  Download,
  Sparkles,
  QrCode,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { FarmerPayout, FarmerProfile } from '../../types';

interface FarmerEarningsScreenProps {
  farmer: FarmerProfile;
  payouts: FarmerPayout[];
  onTriggerInstantPayout?: (payoutId: string) => void;
}

export const FarmerEarningsScreen: React.FC<FarmerEarningsScreenProps> = ({
  farmer,
  payouts,
  onTriggerInstantPayout,
}) => {
  const [activePayoutList, setActivePayoutList] = useState<FarmerPayout[]>(payouts);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const completedTotal = activePayoutList
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.netPayout, 0);

  const pendingTotal = activePayoutList
    .filter((p) => p.status === 'processing' || p.status === 'pending_qc')
    .reduce((sum, p) => sum + p.netPayout, 0);

  const handleInstantTransfer = (payoutId: string) => {
    setActivePayoutList((prev) =>
      prev.map((p) =>
        p.id === payoutId
          ? {
              ...p,
              status: 'completed' as const,
              utrNumber: `SBI${Math.floor(100000000000 + Math.random() * 900000000000)}`,
            }
          : p
      )
    );
    setToastMessage('₹13,012 successfully transferred to your SBI account via IMPS!');
    setTimeout(() => setToastMessage(null), 4000);
    if (onTriggerInstantPayout) onTriggerInstantPayout(payoutId);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-emerald-800 text-white px-4 pt-4 pb-6 rounded-b-3xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-bold text-white">Farmer Earnings & Settlements</h1>
            <p className="text-xs text-emerald-200">Zero Commission · Instant RBI Bank Credit</p>
          </div>
          <span className="text-[10px] bg-emerald-700/80 text-emerald-100 border border-emerald-500 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-300" /> Direct DBT
          </span>
        </div>

        {/* Big Earnings Balance Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-200">
                Disbursed This Month
              </span>
              <div className="text-2xl font-extrabold text-white mt-0.5">
                ₹{completedTotal.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-200">
                Processing QC
              </span>
              <div className="text-lg font-bold text-amber-300 mt-0.5">
                ₹{pendingTotal.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-emerald-100">
            <span className="flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> SBI A/c •••• {farmer.bankAccountLast4}
            </span>
            <span className="font-mono text-[11px] text-emerald-200">{farmer.upiId}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3 -mt-2">
        {/* Toast */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white p-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Processing Settlement Action Card (if any) */}
        {activePayoutList.some((p) => p.status === 'processing') && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Instant Transfer Ready
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">Batch #BATCH-8821 Weighed & Cleared</h3>
                <p className="text-[11px] text-slate-600">454 kg Roma Tomato @ ₹28/kg + Quality Bonus</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">₹13,012</div>
                <span className="text-[10px] text-emerald-700 font-semibold">+₹300 Bonus</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Auto-release in 2 hours or click to get immediately:</span>
              <button
                onClick={() => handleInstantTransfer('PAY-4892')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
              >
                Instant IMPS <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Payouts Statement List */}
        <div className="flex items-center justify-between pt-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Settlement Ledger</h3>
          <span className="text-[10px] font-semibold text-slate-400">Past 30 Days</span>
        </div>

        <div className="space-y-2.5">
          {activePayoutList.map((payout) => (
            <div
              key={payout.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-bold">
                      {payout.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        payout.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {payout.status === 'completed' ? 'Credited to Bank' : 'Processing NEFT'}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mt-1">{payout.cropName}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{payout.date}</p>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-slate-900">₹{payout.netPayout.toLocaleString()}</div>
                  <span className="text-[10px] text-slate-400">@ ₹{payout.ratePerKg}/kg</span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-3 gap-1 text-[11px] text-slate-600">
                <div>
                  <span className="text-[9px] text-slate-400 block">Gross Yield</span>
                  <span className="font-semibold text-slate-800">₹{payout.grossAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Quality Bonus</span>
                  <span className="font-semibold text-emerald-700">+₹{payout.doorsFreshBonus}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 block">Mandi Brokerage</span>
                  <span className="font-semibold text-emerald-700">₹0 (Free)</span>
                </div>
              </div>

              {/* Bank Reference */}
              <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="truncate max-w-[200px] font-mono">UTR: {payout.utrNumber}</span>
                <span className="text-emerald-700 font-semibold cursor-pointer hover:underline flex items-center gap-0.5">
                  <Download className="w-3 h-3" /> Slip PDF
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
