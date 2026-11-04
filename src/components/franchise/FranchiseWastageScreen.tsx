import React, { useState } from 'react';
import {
  ShieldCheck,
  Recycle,
  AlertTriangle,
  Leaf,
  Plus,
  Flame,
  BadgePercent,
  CheckCircle2,
  TrendingDown,
  Sparkles,
} from 'lucide-react';
import { FranchiseWastageRecord } from '../../types';

interface FranchiseWastageScreenProps {
  wastageRecords: FranchiseWastageRecord[];
  onAddLog?: (log: FranchiseWastageRecord) => void;
}

export const FranchiseWastageScreen: React.FC<FranchiseWastageScreenProps> = ({
  wastageRecords,
  onAddLog,
}) => {
  const [logs, setLogs] = useState<FranchiseWastageRecord[]>(wastageRecords);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newCrop, setNewCrop] = useState('Country Tomato');
  const [newKg, setNewKg] = useState<number>(1.5);
  const [newReason, setNewReason] = useState<FranchiseWastageRecord['reason']>('transit_bruising');
  const [newAction, setNewAction] = useState<FranchiseWastageRecord['actionTaken']>('biogas_unit');

  const totalLossKg = logs.reduce((sum, l) => sum + l.lossKg, 0);
  const totalLossValue = logs.reduce((sum, l) => sum + l.lossValueInr, 0);

  const handleAddWastage = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: FranchiseWastageRecord = {
      id: `WST-${Math.floor(100 + Math.random() * 900)}`,
      cropName: newCrop,
      lossKg: Number(newKg),
      reason: newReason,
      actionTaken: newAction,
      date: 'Just now',
      lossValueInr: Math.round(Number(newKg) * 28),
      preventativeTip: 'Sorted immediately at intake staging bay.',
    };
    setLogs([newRecord, ...logs]);
    setShowLogModal(false);
    if (onAddLog) onAddLog(newRecord);
  };

  const getActionBadge = (action: FranchiseWastageRecord['actionTaken']) => {
    switch (action) {
      case 'compost_redirection':
        return { label: 'Organic Compost Partner', icon: Leaf, bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'biogas_unit':
        return { label: 'Green Biogas Unit', icon: Flame, bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'discounted_clearance':
        return { label: 'Community B2B Clearance', icon: BadgePercent, bg: 'bg-blue-50 text-blue-800 border-blue-200' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-teal-800 text-white px-4 pt-4 pb-5 rounded-b-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold text-white">Zero-Waste & Quality Audit</h1>
            <p className="text-xs text-teal-200">Continuous Cold-Chain Loss Prevention</p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> Log Spoilage
          </button>
        </div>

        {/* Zero-Waste Benchmark Card */}
        <div className="bg-teal-900/60 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs mt-3">
          <div>
            <span className="text-[10px] text-teal-200 block">Hub Wastage Rate</span>
            <span className="font-extrabold text-emerald-300 text-sm">0.84%</span>
            <span className="text-[9px] text-teal-200 block">Goal: &lt;1.5%</span>
          </div>
          <div className="border-x border-teal-700/60">
            <span className="text-[10px] text-teal-200 block">Total Loss (24h)</span>
            <span className="font-bold text-white text-sm">{totalLossKg.toFixed(1)} kg</span>
            <span className="text-[9px] text-teal-200 block">₹{totalLossValue} value</span>
          </div>
          <div>
            <span className="text-[10px] text-teal-200 block">Diverted to Green</span>
            <span className="font-bold text-white text-sm">100%</span>
            <span className="text-[9px] text-emerald-300 block">0 kg Landfill</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Zero Landfill Policy Card */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 text-xs text-emerald-900 flex items-start gap-2.5">
          <Recycle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block mb-0.5">Doors Fresh Zero-Landfill Promise</span>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Every unmarketable leafy green or bruised vegetable is systematically diverted to registered municipal biogas plants or vermicompost pits. Zero organic matter enters public landfills.
            </p>
          </div>
        </div>

        {/* Audit Log Entries */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pt-1">
          Quality Loss & Redirection Log ({logs.length})
        </h3>

        <div className="space-y-2.5">
          {logs.map((record) => {
            const badge = getActionBadge(record.actionTaken);
            const BadgeIcon = badge.icon;

            return (
              <div
                key={record.id}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-teal-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{record.cropName}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1 rounded">
                        {record.id}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 capitalize">
                      Reason: {record.reason.replace(/_/g, ' ')}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-rose-700">-{record.lossKg} kg</span>
                    <p className="text-[10px] text-slate-400">₹{record.lossValueInr} write-off</p>
                  </div>
                </div>

                {/* Redirection Tag */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                    <BadgeIcon className="w-3 h-3" /> {badge.label}
                  </span>
                  <span className="text-[10px] text-slate-400">{record.date}</span>
                </div>

                {/* Tip */}
                <div className="mt-2 bg-slate-50 p-2 rounded-xl text-[11px] text-slate-600 border border-slate-100">
                  <span className="font-semibold text-slate-800">Preventative SOP: </span>
                  {record.preventativeTip}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Log Spoilage Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 mb-1">Log Spoilage / Downgrade</h3>
            <p className="text-xs text-slate-500 mb-3">Record produce discarded or diverted to compost/biogas</p>

            <form onSubmit={handleAddWastage} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Crop</label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Loss Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newKg}
                    onChange={(e) => setNewKg(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reason</label>
                  <select
                    value={newReason}
                    onChange={(e: any) => setNewReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs"
                  >
                    <option value="transit_bruising">Transit Bruising</option>
                    <option value="shelf_life_expiry">Shelf Life Expiry</option>
                    <option value="grading_downgrade">Grading Downgrade</option>
                    <option value="handling">Handling Damage</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Redirection Stream</label>
                <select
                  value={newAction}
                  onChange={(e: any) => setNewAction(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2 py-2 text-xs font-semibold text-emerald-800"
                >
                  <option value="compost_redirection">Organic Vermicompost Partner</option>
                  <option value="biogas_unit">Green Biogas Unit</option>
                  <option value="discounted_clearance">Community B2B Clearance (40% Off)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="flex-1 py-2 font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
