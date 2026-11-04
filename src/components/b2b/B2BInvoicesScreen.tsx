import React, { useState } from 'react';
import {
  FileText,
  CreditCard,
  Download,
  CheckCircle2,
  AlertCircle,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Receipt,
  Clock,
} from 'lucide-react';
import { B2BBusinessProfile, B2BInvoice, B2BScreenType } from '../../types';

interface B2BInvoicesScreenProps {
  currentClient: B2BBusinessProfile;
  invoices: B2BInvoice[];
  onPayInvoice?: (invoiceId: string) => void;
  onNavigate: (screen: B2BScreenType) => void;
}

export const B2BInvoicesScreen: React.FC<B2BInvoicesScreenProps> = ({
  currentClient,
  invoices,
  onPayInvoice,
  onNavigate,
}) => {
  const [invoiceList, setInvoiceList] = useState<B2BInvoice[]>(invoices);
  const [settledToast, setSettledToast] = useState(false);

  const availableCredit = currentClient.creditLimitInr - currentClient.creditUsedInr;
  const creditUsagePercent = Math.min(
    100,
    Math.round((currentClient.creditUsedInr / currentClient.creditLimitInr) * 100)
  );

  const handleSettle = (id: string) => {
    setInvoiceList((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' } : inv))
    );
    if (onPayInvoice) onPayInvoice(id);
    setSettledToast(true);
    setTimeout(() => setSettledToast(false), 2500);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header Banner with Credit Line Meter */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 shrink-0 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 mb-1">
              <Receipt className="w-3 h-3 text-emerald-400" />
              <span>Commercial Tax Invoices & ITC Ledger</span>
            </div>
            <h2 className="text-sm font-bold text-white">GST Invoicing & Credit Desk</h2>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded font-mono border border-indigo-700/50">
              GST: {currentClient.gstin}
            </span>
          </div>
        </div>

        {/* Credit Limit Card */}
        <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-indigo-400" />
              <span>{currentClient.paymentTermsDays}-Day Credit Line:</span>
            </span>
            <span className="font-bold text-white font-mono">
              ₹{currentClient.creditUsedInr.toLocaleString()} / ₹{currentClient.creditLimitInr.toLocaleString()}
            </span>
          </div>

          {/* Progress Meter */}
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                creditUsagePercent > 80 ? 'bg-rose-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${creditUsagePercent}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>Available Buffer: ₹{availableCredit.toLocaleString()}</span>
            <span className="text-emerald-400">{100 - creditUsagePercent}% Unused</span>
          </div>
        </div>
      </div>

      {/* Invoice List */}
      <div className="p-4 flex-1 space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
          <span>Recent Kitchen Tax Invoices ({invoiceList.length})</span>
          <span className="text-[10px] text-slate-400">HSN Code 0702 / 0703 (0% GST)</span>
        </div>

        {invoiceList.map((inv) => {
          const isPaid = inv.status === 'paid';

          return (
            <div
              key={inv.id}
              className="bg-slate-800/70 p-3.5 rounded-2xl border border-slate-700/60 hover:border-indigo-500/50 transition-all group"
            >
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-700/50">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white group-hover:text-indigo-300">
                      {inv.invoiceNumber}
                    </span>
                    <span
                      className={`text-[9px] px-2 py-0.2 rounded font-bold uppercase font-mono border ${
                        isPaid
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      }`}
                    >
                      {isPaid ? 'Settled' : 'Payment Due'}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Date: {inv.date} • Due: {inv.dueDate}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-white font-mono">
                    ₹{inv.totalAmountInr.toLocaleString()}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono">
                    {inv.totalWeightKg} kg Produce
                  </div>
                </div>
              </div>

              {/* Delivery Receipt & Challan */}
              <div className="py-2 flex items-center justify-between text-[10px] text-slate-400">
                <span>Challan: <strong className="text-slate-200 font-mono">{inv.deliveryChallanNumber}</strong></span>
                <span>Ack by: <strong className="text-slate-200">{inv.receivedBy}</strong></span>
              </div>

              {/* Invoice Actions */}
              <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Downloading GST Invoice ${inv.invoiceNumber} (PDF)...`)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>Tax Invoice (PDF)</span>
                </button>

                {!isPaid ? (
                  <button
                    type="button"
                    onClick={() => handleSettle(inv.id)}
                    className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Pay via NEFT/UPI</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Cleared via DBT Bank Transfer</span>
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {/* GST ITC Box */}
        <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 space-y-1.5 text-center mt-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Tax Compliant B2B Billing</span>
          </div>
          <p className="text-[10px] text-slate-400 max-w-sm mx-auto">
            Direct farmer gate procurement qualifies under exempt HSN schedules with zero surcharge, offering hotels and caterers fully verifiable books of accounts.
          </p>
        </div>
      </div>

      {/* Settled Toast */}
      {settledToast && (
        <div className="fixed top-12 left-6 right-6 max-w-[340px] mx-auto bg-emerald-600 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <div className="font-bold">Invoice Paid Successfully!</div>
            <div className="text-[10px] text-emerald-100">
              Commercial credit limit restored instantly.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
