import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Download,
  CheckCircle2,
  Sparkles,
  Zap,
  Calendar,
  Clock,
  ArrowDownLeft,
  CalendarDays,
  BarChart3,
  ChevronRight,
  Receipt,
  HelpCircle,
} from 'lucide-react';
import { DeliveryPartnerProfile, RiderEarningsSummary } from '../../types';

interface DeliveryEarningsScreenProps {
  rider: DeliveryPartnerProfile;
  earnings: RiderEarningsSummary;
  onInstantCashout?: (amount: number) => void;
}

export const DeliveryEarningsScreen: React.FC<DeliveryEarningsScreenProps> = ({
  rider,
  earnings,
  onInstantCashout,
}) => {
  const [wallet, setWallet] = useState(earnings.walletBalanceInr);
  const [cashoutNotice, setCashoutNotice] = useState<string | null>(null);
  const [activePeriodTab, setActivePeriodTab] = useState<'today' | 'weekly' | 'monthly'>('today');

  // Payout transactions history
  const [payoutLogs, setPayoutLogs] = useState(earnings.recentPayouts || [
    {
      id: 'PO-9812',
      date: 'Yesterday, 08:30 PM',
      amount: 1420,
      utr: 'UPI984210984112',
      status: 'completed' as const,
    },
    {
      id: 'PO-9740',
      date: '2 Nov 2026, 09:15 PM',
      amount: 1680,
      utr: 'UPI983199014299',
      status: 'completed' as const,
    },
    {
      id: 'PO-9611',
      date: '1 Nov 2026, 07:45 PM',
      amount: 1250,
      utr: 'UPI981944109814',
      status: 'completed' as const,
    },
  ]);

  const handleCashout = () => {
    if (wallet <= 0) return;
    const amount = wallet;
    const generatedUtr = `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setWallet(0);
    setCashoutNotice(`₹${amount} transferred instantly to ${rider.upiId} (UTR: ${generatedUtr})!`);
    
    // Add to payout logs
    setPayoutLogs((prev) => [
      {
        id: `PO-${Date.now().toString().slice(-4)}`,
        date: 'Today, Just now',
        amount,
        utr: generatedUtr,
        status: 'completed',
      },
      ...prev,
    ]);

    setTimeout(() => setCashoutNotice(null), 5000);
    if (onInstantCashout) onInstantCashout(amount);
  };

  // Weekly aggregate numbers
  const weeklyData = [
    { day: 'Mon', amount: 1420, orders: 18 },
    { day: 'Tue', amount: 1680, orders: 22 },
    { day: 'Wed', amount: 1540, orders: 19 },
    { day: 'Thu', amount: 1890, orders: 24 },
    { day: 'Fri', amount: 1720, orders: 21 },
    { day: 'Sat', amount: 2150, orders: 28 },
    { day: 'Sun', amount: 2480, orders: 32 },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 pt-4 pb-6 border-b border-slate-800 shadow-sm shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-bold text-white">Rider Earnings & Incentives</h1>
            <p className="text-xs text-slate-400">Zero Commission · Instant Daily UPI Payouts</p>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Nodal Escrow
          </span>
        </div>

        {/* Big Wallet Balance Card */}
        <div className="bg-slate-950/90 rounded-2xl p-4 border border-slate-800 shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                Withdrawable Wallet
              </span>
              <div className="text-2xl font-black text-white mt-0.5">
                ₹{wallet.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                Today's Earnings
              </span>
              <div className="text-lg font-extrabold text-emerald-300 mt-0.5">
                ₹{earnings.todayTotalInr.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="truncate max-w-[190px] font-mono text-[11px] text-slate-400">
              UPI: {rider.upiId}
            </span>

            <button
              onClick={handleCashout}
              disabled={wallet <= 0}
              className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <Zap className="w-3.5 h-3.5 fill-white" /> Instant Cashout
            </button>
          </div>
        </div>

        {/* Time Period Tabs: Today, Weekly, Monthly */}
        <div className="mt-4 flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActivePeriodTab('today')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activePeriodTab === 'today'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Daily (Today)
          </button>
          <button
            type="button"
            onClick={() => setActivePeriodTab('weekly')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activePeriodTab === 'weekly'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Weekly (7 Days)
          </button>
          <button
            type="button"
            onClick={() => setActivePeriodTab('monthly')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activePeriodTab === 'monthly'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly (Nov)
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3.5 -mt-2">
        {/* Cashout Success Toast */}
        {cashoutNotice && (
          <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{cashoutNotice}</span>
          </div>
        )}

        {/* TAB 1: TODAY'S EARNINGS BREAKDOWN */}
        {activePeriodTab === 'today' && (
          <>
            {/* Today's Incentive Breakdown Card */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Today's Pay Component Breakdown
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-300">Base Drop Pay ({earnings.completedOrdersCount} orders @ ₹40/order)</span>
                  <span className="font-mono font-bold text-white">₹{earnings.basePayInr}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-300">Distance Travel Bonus (&gt;3 km long drops)</span>
                  <span className="font-mono font-bold text-emerald-400">+₹{earnings.distanceBonusInr}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-300">Peak Fresh Slot Incentive (Morning & Evening)</span>
                  <span className="font-mono font-bold text-amber-300">+₹{earnings.peakSlotIncentivesInr}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-300">Cold-Chain Insulated Bag Quality Bonus</span>
                  <span className="font-mono font-bold text-cyan-300">+₹{earnings.coldChainComplianceBonusInr}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-300">Customer Direct Tips</span>
                  <span className="font-mono font-bold text-emerald-300">+₹{earnings.tipsInr}</span>
                </div>

                <div className="flex items-center justify-between pt-2 text-sm font-extrabold">
                  <span className="text-white">Net Total Earned Today</span>
                  <span className="text-emerald-400 font-mono">₹{earnings.todayTotalInr}</span>
                </div>
              </div>
            </div>

            {/* Per-Order Rate Card Reference */}
            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 text-xs space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-blue-400" /> Per-Order Rate Card
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block">Base Pay:</span>
                  <strong className="text-white">₹40 / completed drop</strong>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block">Distance Pay:</span>
                  <strong className="text-white">₹8 / km above 2.5 km</strong>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block">Cold-Chain Bag:</span>
                  <strong className="text-cyan-300">+₹10 / verified sub-6°C</strong>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl">
                  <span className="text-slate-400 block">Crate Collection:</span>
                  <strong className="text-amber-300">+₹10 / returned crate</strong>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: WEEKLY EARNINGS */}
        {activePeriodTab === 'weekly' && (
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Weekly Total</span>
                <div className="text-xl font-black text-white mt-0.5">₹12,880</div>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                164 Deliveries
              </span>
            </div>

            {/* Weekly Bar Chart Simulation */}
            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-end justify-between h-32 gap-2 px-1">
                {weeklyData.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] text-slate-400 font-mono">₹{d.amount}</span>
                    <div
                      className="w-full bg-emerald-600 hover:bg-emerald-500 rounded-t-md transition-all"
                      style={{ height: `${(d.amount / 2500) * 100}%` }}
                    />
                    <span className="text-[10px] text-slate-300 font-bold">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-400 flex justify-between border-t border-slate-800">
              <span>Avg Daily: <strong>₹1,840</strong></span>
              <span>Avg Drops/Day: <strong>23 orders</strong></span>
            </div>
          </div>
        )}

        {/* TAB 3: MONTHLY EARNINGS */}
        {activePeriodTab === 'monthly' && (
          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Current Month (November)</span>
                <div className="text-xl font-black text-white mt-0.5">₹48,920</div>
              </div>
              <span className="text-xs bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                612 Deliveries
              </span>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-800">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Gross Drop Revenue:</span>
                <strong className="text-white">₹38,400</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Cold-Chain Compliance Incentives:</span>
                <strong className="text-cyan-300">₹6,120</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Peak Slot & Distance Surges:</span>
                <strong className="text-amber-300">₹3,200</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Customer Tips Disbursed:</span>
                <strong className="text-emerald-400">₹1,200</strong>
              </div>
            </div>
          </div>
        )}

        {/* INCENTIVES AND PAYMENT HISTORY / UTR LIST */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> UPI Payout History & UTR
            </h3>
            <span className="text-[10px] text-slate-400">Instant IMPS</span>
          </div>

          <div className="space-y-2">
            {payoutLogs.map((p) => (
              <div
                key={p.id}
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white">₹{p.amount.toLocaleString()}</span>
                    <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800 uppercase font-semibold">
                      {p.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {p.date} • <span className="font-mono">UTR: {p.utr}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-emerald-400 font-semibold block">IMPS Transfer</span>
                  <span className="text-[9px] text-slate-500 font-mono">{p.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
