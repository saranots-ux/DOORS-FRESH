import React, { useState } from 'react';
import {
  CloudRain,
  Sun,
  ShieldAlert,
  Leaf,
  Bug,
  Thermometer,
  Droplets,
  Calendar,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  FileCheck,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { CropAdvisory } from '../../types';

interface FarmerAdvisoryScreenProps {
  advisories: CropAdvisory[];
  onRequestAgronomistCall?: () => void;
}

export const FarmerAdvisoryScreen: React.FC<FarmerAdvisoryScreenProps> = ({
  advisories,
  onRequestAgronomistCall,
}) => {
  const [callRequested, setCallRequested] = useState(false);
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handleCall = () => {
    setCallRequested(true);
    if (onRequestAgronomistCall) onRequestAgronomistCall();
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-emerald-800 text-white px-4 pt-4 pb-5 rounded-b-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold text-white">Crop Health & Agronomy</h1>
            <p className="text-xs text-emerald-200">Tamil Nadu Agro-Climatic Intelligence</p>
          </div>
          <span className="text-[10px] bg-emerald-700 text-emerald-100 border border-emerald-600 px-2 py-0.5 rounded font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-300" /> Agri-AI 2.4
          </span>
        </div>

        {/* Soil & Micro-climate Health Matrix */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 grid grid-cols-3 gap-2 text-center text-xs mt-3">
          <div>
            <span className="text-[10px] text-emerald-200 block">Soil pH Index</span>
            <span className="font-bold text-white text-sm">6.8 (Neutral)</span>
          </div>
          <div className="border-x border-white/10">
            <span className="text-[10px] text-emerald-200 block">Organic Carbon</span>
            <span className="font-bold text-white text-sm">0.78% (Rich)</span>
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 block">Nitrogen (N)</span>
            <span className="font-bold text-white text-sm">Optimal</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Instant AI Pest & Disease Scanner */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Camera className="w-4 h-4 text-emerald-700" /> Instant Crop Disease Diagnostic
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Take a photo of spotted leaves or wilted stems for instant AI organic remedy recommendations.
              </p>
            </div>
          </div>

          <div className="mt-3">
            {photoUploaded ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800">
                <div className="flex items-center gap-1.5 font-bold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Diagnostic Result: Early Leaf Blight (Low Severity)
                </div>
                <p className="text-[11px] text-emerald-700">
                  Recommended: Spray 0.5% Pseudomonas fluorescens culture mixed in jaggery water. DO NOT use copper oxychloride before morning harvest.
                </p>
              </div>
            ) : (
              <button
                onClick={() => setPhotoUploaded(true)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 transition-colors"
              >
                <Camera className="w-4 h-4 text-emerald-600" /> Click / Upload Crop Leaf Photo
              </button>
            )}
          </div>
        </div>

        {/* Live Advisories Feed */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 pt-1">
          Active Field Advisories ({advisories.length})
        </h3>

        <div className="space-y-3">
          {advisories.map((adv) => (
            <div
              key={adv.id}
              className={`bg-white rounded-2xl p-4 border shadow-xs ${
                adv.urgency === 'high' ? 'border-amber-300 ring-1 ring-amber-100' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      adv.urgency === 'high'
                        ? 'bg-amber-100 text-amber-800'
                        : adv.urgency === 'medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {adv.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{adv.date}</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500">For {adv.cropTarget}</span>
              </div>

              <h4 className="text-xs font-bold text-slate-900 mt-2">{adv.title}</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{adv.message}</p>

              {/* Action Recommendation Box */}
              <div className="mt-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-0.5">
                  Doors Fresh Field Protocol:
                </span>
                <p className="text-[11px] font-medium text-slate-800">{adv.recommendedAction}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Doors Fresh Agronomist Assistance Box */}
        <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-emerald-200">Free Farmer Support</div>
              <h4 className="text-sm font-bold text-white mt-0.5">Assigned Agronomist: Dr. R. Balaji</h4>
              <p className="text-[11px] text-emerald-100 mt-0.5">TNAU Senior Agronomist · Kanchipuram Zone</p>
            </div>
            <FileCheck className="w-8 h-8 text-emerald-300 opacity-80" />
          </div>

          <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between">
            <span className="text-[10px] text-emerald-200">Soil Testing & Bio-Fertilizer Delivery</span>
            {callRequested ? (
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Call Scheduled in 15 mins
              </span>
            ) : (
              <button
                onClick={handleCall}
                className="bg-white text-emerald-900 hover:bg-emerald-50 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-xs active:scale-95 transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-700" /> Request Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
