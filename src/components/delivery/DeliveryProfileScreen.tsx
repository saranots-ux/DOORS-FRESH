import React from 'react';
import {
  User,
  ShieldCheck,
  Bike,
  Thermometer,
  FileCheck,
  Phone,
  Award,
  BatteryCharging,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { DeliveryPartnerProfile } from '../../types';

interface DeliveryProfileScreenProps {
  rider: DeliveryPartnerProfile;
  onToggleOnline: () => void;
}

export const DeliveryProfileScreen: React.FC<DeliveryProfileScreenProps> = ({
  rider,
  onToggleOnline,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4 pt-4 pb-5 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/30 border border-emerald-500/50 text-emerald-300 flex items-center justify-center font-bold text-xl shadow-md">
            {rider.avatarText}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.2 rounded border border-emerald-800">
                {rider.id}
              </span>
              <span className="text-[10px] font-semibold text-emerald-300 flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Star Rider
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">{rider.name}</h2>
            <p className="text-xs text-slate-400">{rider.phone} · {rider.assignedHubName}</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-center text-xs">
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">Deliveries</span>
            <span className="font-bold text-white text-xs">{rider.totalDeliveries} Drops</span>
          </div>
          <div className="border-x border-slate-800">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">Rating</span>
            <span className="font-bold text-amber-300 text-xs">★ {rider.rating}</span>
          </div>
          <div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">On-Time SLA</span>
            <span className="font-bold text-emerald-400 text-xs">{rider.onTimeRatePercent}%</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* EV Vehicle Telemetry Card */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Bike className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Registered EV Fleet</h3>
            </div>
            <span className="text-[10px] font-mono font-bold bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
              {rider.vehiclePlate}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Vehicle Model:</span>
              <span className="font-bold text-white">{rider.vehicleModel}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Battery Status:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <BatteryCharging className="w-3.5 h-3.5" /> {rider.batteryPercent}% ({rider.rangeKmRemaining} km range)
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Emission Footprint:</span>
              <span className="font-bold text-emerald-400">100% Zero-Emission EV</span>
            </div>
          </div>
        </div>

        {/* Cold-Chain Insulated Box Compliance */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">Insulated Cold Box ID</h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              {rider.insulatedBagId}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Internal Sensor:</span>
              <span className="font-bold text-cyan-300">{rider.coldBagTempCelsius}°C (Calibrated)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-400">Morning Sanitize Audit:</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Passed Today 06:00 AM
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">Crate Return Bay:</span>
              <span className="font-bold text-white">Velachery Micro-Hub Dock 3</span>
            </div>
          </div>
        </div>

        {/* Verified Documents */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Compliance & Documents
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-300">Driving License (TN Transport)</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                VERIFIED
              </span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
              <span className="text-slate-300">Commercial EV Insurance</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                ACTIVE
              </span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-300">Police & Background Check</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                CLEARED
              </span>
            </div>
          </div>
        </div>

        {/* Training Certifications */}
        <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-3.5 text-xs text-emerald-200">
          <div className="flex items-center gap-2 font-bold text-white mb-1">
            <Award className="w-4 h-4 text-emerald-400" /> Cold-Chain Produce Handling Certified
          </div>
          <p className="text-[11px] text-emerald-300 leading-relaxed">
            Completed Doors Fresh organic produce safety training. Certified to handle fragile vine tomatoes and cold-air bagged greens.
          </p>
        </div>

        {/* App Version & Support */}
        <div className="pt-2 text-center text-xs text-slate-500">
          Doors Fresh Delivery Partner App v4.2.0 (Build 8912)
        </div>
      </div>
    </div>
  );
};
