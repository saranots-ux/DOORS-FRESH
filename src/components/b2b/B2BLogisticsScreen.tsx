import React, { useState } from 'react';
import {
  Truck,
  Thermometer,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  Navigation,
  ShieldCheck,
  Boxes,
  QrCode,
  Building2,
} from 'lucide-react';
import { B2BBusinessProfile, B2BScreenType } from '../../types';

interface B2BLogisticsScreenProps {
  currentClient: B2BBusinessProfile;
  onNavigate: (screen: B2BScreenType) => void;
}

export const B2BLogisticsScreen: React.FC<B2BLogisticsScreenProps> = ({
  currentClient,
  onNavigate,
}) => {
  const [returnableCratesCount, setReturnableCratesCount] = useState(14);
  const [isAckRecorded, setIsAckRecorded] = useState(false);

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 shrink-0 sticky top-0 z-20 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold mb-1 border border-blue-500/30">
              <Truck className="w-3 h-3 text-blue-400" />
              <span>Dedicated Reefer Fleet • Cold-Chain Transit</span>
            </div>
            <h2 className="text-sm font-bold text-white">Reefer Truck & Dock Telemetry</h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono border border-emerald-500/30 font-bold">
            On Schedule
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1">
          Direct dispatch from {currentClient.assignedDarkStoreHub} to {currentClient.businessName}
        </p>
      </div>

      <div className="p-4 flex-1 space-y-4">
        {/* Active Dispatch Card */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-700/60 flex items-center justify-center text-blue-300">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Reefer Truck #DF-CH-04</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                    3.5 Ton Capacity
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Driver: Selvakumar M. (+91 97910 88201)
                </div>
              </div>
            </div>
            <a
              href="tel:+919791088201"
              className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center cursor-pointer shadow-sm"
              title="Call Driver"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* IoT Telemetry HUD */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-700/60">
            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700/50">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3 h-3 text-cyan-400" />
                  <span>Reefer Cargo Bay</span>
                </span>
                <span className="text-emerald-400 font-mono">Optimal</span>
              </div>
              <div className="text-base font-extrabold text-white font-mono">
                4.2°C
              </div>
              <div className="text-[9px] text-slate-500 font-mono">
                Target: 3.5°C - 5.5°C
              </div>
            </div>

            <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-700/50">
              <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-amber-400" />
                  <span>Receiving Dock ETA</span>
                </span>
                <span className="text-amber-300 font-mono">Live</span>
              </div>
              <div className="text-base font-extrabold text-white font-mono">
                04:45 AM
              </div>
              <div className="text-[9px] text-slate-500 font-mono">
                Early Morning Sunrise Window
              </div>
            </div>
          </div>

          {/* Visual Route Progress */}
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-700/40 space-y-2">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Transit Stage:</span>
              <span className="text-blue-300 font-semibold font-mono">Stage 3 of 4 (En Route to Kitchen)</span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full w-3/4" />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400">
              <span>Dark Store Out (03:45 AM)</span>
              <span className="text-white font-semibold">Kitchen Receiving Gate</span>
            </div>
          </div>
        </div>

        {/* Returnable Crate System */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold text-white">Returnable Food-Grade Crates</h3>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono border border-emerald-500/30">
              Zero Plastic Waste
            </span>
          </div>

          <p className="text-[11px] text-slate-400">
            Doors Fresh operates circular sanitised crates. Empty crates from previous days are collected during morning drop.
          </p>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700">
            <div>
              <div className="text-xs font-bold text-white font-mono">
                {returnableCratesCount} Empty Crates
              </div>
              <div className="text-[10px] text-slate-400">
                Ready for handover to driver at receiving dock
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAckRecorded(true);
                setTimeout(() => setIsAckRecorded(false), 2500);
              }}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-all shadow-xs"
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Acknowledge Handover</span>
            </button>
          </div>
        </div>

        {/* Dedicated Relationship Manager */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-2.5">
          <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Dedicated HORECA Relationship Manager:
          </div>
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-700">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-900/80 border border-indigo-700 text-indigo-300 font-bold flex items-center justify-center text-xs">
                RS
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {currentClient.dedicatedAccountManager.name}
                </div>
                <div className="text-[10px] text-slate-400">
                  {currentClient.dedicatedAccountManager.role}
                </div>
              </div>
            </div>
            <a
              href={`tel:${currentClient.dedicatedAccountManager.phone}`}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Phone className="w-3 h-3" />
              <span>Call Manager</span>
            </a>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {isAckRecorded && (
        <div className="fixed top-12 left-6 right-6 max-w-[340px] mx-auto bg-emerald-600 text-white p-3 rounded-2xl shadow-2xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div className="text-xs">
            <div className="font-bold">Crate Handover Handshake Confirmed!</div>
            <div className="text-[10px] text-emerald-100">
              14 crates logged into circular asset tracking ledger.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
