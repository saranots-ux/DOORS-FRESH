import React, { useState } from 'react';
import {
  Plus,
  Package,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  Scale,
  Sparkles,
  ChevronDown,
  Filter,
  Check,
  AlertCircle,
  QrCode,
} from 'lucide-react';
import { FarmerBatch } from '../../types';

interface FarmerProduceListingScreenProps {
  batches: FarmerBatch[];
  onAddBatch: (batch: FarmerBatch) => void;
  onSelectBatch?: (batch: FarmerBatch) => void;
}

export const FarmerProduceListingScreen: React.FC<FarmerProduceListingScreenProps> = ({
  batches,
  onAddBatch,
  onSelectBatch,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'settled'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newCropName, setNewCropName] = useState('Roma Tomato');
  const [newVariety, setNewVariety] = useState('Arka Rakshak F1');
  const [newGrade, setNewGrade] = useState<'Grade A+ (Premium)' | 'Grade A (Export)' | 'Grade B (Standard)'>('Grade A+ (Premium)');
  const [newQuantityKg, setNewQuantityKg] = useState<number>(350);
  const [newPrice, setNewPrice] = useState<number>(28);
  const [newDate, setNewDate] = useState('Tomorrow, 06:00 AM');
  const [newNotes, setNewNotes] = useState('Sun ripened, zero pesticide spray.');

  const filteredBatches = batches.filter((b) => {
    if (activeTab === 'active') return b.status !== 'settled';
    if (activeTab === 'settled') return b.status === 'settled';
    return true;
  });

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    const newBatch: FarmerBatch = {
      id: `BATCH-${Math.floor(1000 + Math.random() * 9000)}`,
      cropName: newCropName,
      variety: newVariety,
      grade: newGrade,
      quantityKg: Number(newQuantityKg),
      expectedHarvestDate: newDate,
      offeredPricePerKg: Number(newPrice),
      mandiBenchmarkPerKg: Math.round(Number(newPrice) * 0.78),
      status: 'pending_approval',
      hubDestination: 'Velachery Micro-Hub',
      moisturePercent: 86,
      notes: newNotes,
    };
    onAddBatch(newBatch);
    setShowAddModal(false);
  };

  const getStatusBadge = (status: FarmerBatch['status']) => {
    switch (status) {
      case 'settled':
        return { label: 'Settled & Paid', bg: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'scheduled_pickup':
        return { label: 'Pickup Van Enroute', bg: 'bg-blue-100 text-blue-800 border-blue-200' };
      case 'in_transit':
        return { label: 'In Cold Transit', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'weighed_accepted':
        return { label: 'Weighed & Passed QC', bg: 'bg-teal-100 text-teal-800 border-teal-200' };
      case 'pending_approval':
        return { label: 'Hub Approving Slot', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
      default:
        return { label: 'Draft', bg: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-emerald-800 text-white px-4 pt-4 pb-5 rounded-b-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold text-white">Harvest Batches & Inwarding</h1>
            <p className="text-xs text-emerald-200">Register crop yields for guaranteed cold-chain collection</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> New Batch
          </button>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-emerald-900/60 p-1 rounded-xl text-xs font-medium mt-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'all' ? 'bg-white text-emerald-900 font-bold shadow-xs' : 'text-emerald-200 hover:text-white'
            }`}
          >
            All Lots ({batches.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'active' ? 'bg-white text-emerald-900 font-bold shadow-xs' : 'text-emerald-200 hover:text-white'
            }`}
          >
            Active In-Transit
          </button>
          <button
            onClick={() => setActiveTab('settled')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'settled' ? 'bg-white text-emerald-900 font-bold shadow-xs' : 'text-emerald-200 hover:text-white'
            }`}
          >
            Settled (Paid)
          </button>
        </div>
      </div>

      {/* Batches List */}
      <div className="p-4 space-y-3">
        {filteredBatches.map((batch) => {
          const badge = getStatusBadge(batch.status);
          const estimatedPayout = batch.actualWeighedKg
            ? batch.actualWeighedKg * batch.offeredPricePerKg
            : batch.quantityKg * batch.offeredPricePerKg;

          return (
            <div
              key={batch.id}
              onClick={() => onSelectBatch && onSelectBatch(batch)}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all cursor-pointer"
            >
              {/* Batch Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-semibold">
                      {batch.id}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                      {badge.label}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{batch.cropName}</h3>
                  <p className="text-[11px] text-slate-500">{batch.variety} · {batch.grade}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-extrabold text-emerald-700">₹{estimatedPayout.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400 font-medium">₹{batch.offeredPricePerKg}/kg</div>
                </div>
              </div>

              {/* Batch Specs Grid */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Quantity</span>
                  <span className="font-bold text-slate-800">{batch.quantityKg} kg</span>
                  {batch.actualWeighedKg && (
                    <span className="text-[9px] text-emerald-700 block font-medium">Weighed: {batch.actualWeighedKg}kg</span>
                  )}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Harvest Date</span>
                  <span className="font-medium text-slate-700 truncate block">{batch.expectedHarvestDate}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Destination</span>
                  <span className="font-medium text-slate-700 truncate block">{batch.hubDestination.replace(' Micro-Hub', '')}</span>
                </div>
              </div>

              {/* Bottom Slip & Action Bar */}
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1 text-slate-500">
                  <Scale className="w-3.5 h-3.5 text-slate-400" />
                  <span>Mandi Benchmark: ₹{batch.mandiBenchmarkPerKg}/kg</span>
                </div>
                {batch.weighmentSlipNo ? (
                  <span className="flex items-center gap-1 text-emerald-700 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded">
                    <QrCode className="w-3 h-3" /> Slip #{batch.weighmentSlipNo}
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-400">Awaiting Farmgate Weighment</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Register New Harvest Batch */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Schedule Harvest Collection</h3>
                <p className="text-[11px] text-slate-500">Doors Fresh Reefer Van will collect at farmgate</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Crop Name</label>
                <select
                  value={newCropName}
                  onChange={(e) => {
                    setNewCropName(e.target.value);
                    if (e.target.value.includes('Tomato')) setNewPrice(28);
                    else if (e.target.value.includes('Onion')) setNewPrice(48);
                    else if (e.target.value.includes('Carrot')) setNewPrice(36);
                    else setNewPrice(32);
                  }}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Roma Tomato">Roma Tomato (Vine-Ripened)</option>
                  <option value="Country Carrot">Country Carrot (Deep Orange)</option>
                  <option value="Shallot / Small Onion">Shallot / Small Onion</option>
                  <option value="English Cucumber">English Cucumber</option>
                  <option value="Palak & Spinach">Palak & Spinach (Fresh Leafy)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Quality Grade</label>
                  <select
                    value={newGrade}
                    onChange={(e: any) => setNewGrade(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Grade A+ (Premium)">Grade A+ (Premium)</option>
                    <option value="Grade A (Export)">Grade A (Export)</option>
                    <option value="Grade B (Standard)">Grade B (Standard)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Estimated Yield (kg)</label>
                  <input
                    type="number"
                    value={newQuantityKg}
                    onChange={(e) => setNewQuantityKg(Number(e.target.value))}
                    min={50}
                    step={10}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Guaranteed Rate (₹/kg)</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Harvest Window</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Field Notes / Curing Info</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Organic methods, harvest picking instructions..."
                />
              </div>

              <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-emerald-800 uppercase font-semibold">Projected Net Payout</span>
                  <div className="text-base font-extrabold text-emerald-900">
                    ₹{(newQuantityKg * newPrice).toLocaleString()}
                  </div>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-1 rounded font-medium">
                  Direct Bank UPI Credit
                </span>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-2.5 border border-slate-300 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Schedule Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
