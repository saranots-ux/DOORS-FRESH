import React, { useState } from 'react';
import {
  Boxes,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Thermometer,
  Sparkles,
  ArrowDownToLine,
  Filter,
  Search,
  Check,
} from 'lucide-react';
import { FranchiseInwardBatch } from '../../types';

interface FranchiseInventoryScreenProps {
  batches: FranchiseInwardBatch[];
  onApproveInward?: (batchId: string) => void;
}

export const FranchiseInventoryScreen: React.FC<FranchiseInventoryScreenProps> = ({
  batches,
  onApproveInward,
}) => {
  const [batchList, setBatchList] = useState<FranchiseInwardBatch[]>(batches);
  const [scanModalOpen, setScanModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleInwardQC = (batchId: string) => {
    setBatchList((prev) =>
      prev.map((b) =>
        b.id === batchId
          ? {
              ...b,
              status: 'sorted_stocked' as const,
              qualityScorePercent: 99.2,
              storageZone: 'Chilled Bay C-14 (4°C)',
            }
          : b
      )
    );
    setSuccessToast('Batch scanned, weighed & allocated to Cold Room Bay C-14!');
    setTimeout(() => setSuccessToast(null), 3500);
    if (onApproveInward) onApproveInward(batchId);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-teal-800 text-white px-4 pt-4 pb-5 rounded-b-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold text-white">Hub Inventory & Cold-Chain Inwarding</h1>
            <p className="text-xs text-teal-200">Digital Weighment · QC Inspection · Crate Allocation</p>
          </div>
          <button
            onClick={() => setScanModalOpen(true)}
            className="bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <QrCode className="w-3.5 h-3.5" /> Scan Crate
          </button>
        </div>

        {/* Live Staging Stock Summary */}
        <div className="bg-teal-900/60 rounded-xl p-2.5 grid grid-cols-3 gap-2 text-center text-xs mt-3">
          <div>
            <span className="text-[10px] text-teal-200 block">Stock In Hand</span>
            <span className="font-bold text-white">2,180 kg</span>
          </div>
          <div className="border-x border-teal-700/60">
            <span className="text-[10px] text-teal-200 block">Cold Temp</span>
            <span className="font-bold text-emerald-300">4.2°C (OK)</span>
          </div>
          <div>
            <span className="text-[10px] text-teal-200 block">Avg QC Score</span>
            <span className="font-bold text-white">98.1%</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Toast */}
        {successToast && (
          <div className="bg-teal-700 text-white p-3 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-md animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successToast}</span>
          </div>
        )}

        {/* Pending Inward QC Batch Callout */}
        {batchList.some((b) => b.status === 'arriving' || b.status === 'qc_in_progress') && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Dock Staging Arrival
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">Simla Crisp Capsicum (300 kg)</h3>
                <p className="text-[11px] text-slate-600">Reefer Truck #09 from Hosur · Arrived at Dock 2</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-teal-800">Cold 5.1°C</span>
                <p className="text-[10px] text-slate-400">Within Spec</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[10px] text-slate-500">Scan QR to verify weight and crate allocation:</span>
              <button
                onClick={() => handleInwardQC('INW-403')}
                className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" /> Approve & Stock In
              </button>
            </div>
          </div>
        )}

        {/* All Inward Stock Batches */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pt-1">
          Stocked Batches & Cold Bays
        </h3>

        <div className="space-y-2.5">
          {batchList.map((batch) => (
            <div
              key={batch.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-teal-300 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{batch.cropName}</span>
                    <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded font-bold">
                      {batch.batchCode}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Farmer: {batch.farmerName} · {batch.farmerDistrict}
                  </p>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      batch.status === 'sorted_stocked'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {batch.status === 'sorted_stocked' ? 'Stocked in 4°C' : 'Arriving'}
                  </span>
                  <div className="text-[10px] text-teal-700 font-semibold mt-0.5">
                    QC: {batch.qualityScorePercent}%
                  </div>
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Weighed Net</span>
                  <span className="font-bold text-slate-800">{batch.receivedKg} kg</span>
                  <span className="text-[9px] text-emerald-600 block">Loss: {batch.transitLossPercent}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Cold Storage</span>
                  <span className="font-medium text-slate-700 block truncate">{batch.storageZone}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Cold Chain</span>
                  <span className="text-[10px] font-semibold text-emerald-700 flex items-center gap-0.5 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Compliant
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Scanner Modal Simulation */}
      {scanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-2xl p-5 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 border-2 border-teal-500 mx-auto flex items-center justify-center text-teal-700 mb-3 animate-pulse">
              <QrCode className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Digital Crate Barcode Scanner</h3>
            <p className="text-xs text-slate-500 mt-1">
              Position Doors Fresh returnable crate QR code within camera view.
            </p>

            <div className="mt-4 bg-slate-100 rounded-xl p-3 text-xs text-left text-slate-700 border border-slate-200">
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Target Crate:</span>
                <span className="font-mono font-bold">CRATE-DF-9912</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Sensor Temp:</span>
                <span className="font-bold text-emerald-700">4.1°C (Perfect)</span>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-slate-400">Tare Deducted:</span>
                <span className="font-bold text-slate-900">1.8 kg (Zero loss)</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setScanModalOpen(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setScanModalOpen(false);
                  handleInwardQC('INW-403');
                }}
                className="flex-1 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs"
              >
                Confirm Scan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
