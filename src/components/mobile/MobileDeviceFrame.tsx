import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
  deviceLabel?: string;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({
  children,
  deviceLabel,
}) => {
  return (
    <div className="flex flex-col items-center">
      {/* Phone Hardware Shell */}
      <div className="relative w-[340px] sm:w-[360px] h-[720px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800/80 shadow-slate-950/40 select-none">
        {/* Outer Phone Bezel accents */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-10 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[3px] top-42 w-[3px] h-12 bg-slate-700 rounded-l-xs" />
        <div className="absolute -left-[3px] top-58 w-[3px] h-12 bg-slate-700 rounded-l-xs" />
        <div className="absolute -right-[3px] top-36 w-[3px] h-16 bg-slate-700 rounded-r-xs" />

        {/* Screen Glass Area */}
        <div className="relative w-full h-full bg-white rounded-[38px] overflow-hidden flex flex-col">
          {/* iOS / Modern Android Status Bar */}
          <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md px-6 pt-2 pb-1 flex items-center justify-between text-slate-900 text-xs font-semibold">
            <span className="font-mono text-[12px] font-bold">9:41</span>
            
            {/* Dynamic Island / Camera Notch */}
            <div className="w-24 h-4 bg-slate-950 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
            </div>

            <div className="flex items-center gap-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5 stroke-[2.5]" />
              <Wifi className="w-3.5 h-3.5 stroke-[2.5]" />
              <Battery className="w-4 h-4 stroke-[2.5]" />
            </div>
          </div>

          {/* Child Screen Content */}
          <div className="flex-1 overflow-hidden flex flex-col relative">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="h-4 bg-white flex items-center justify-center shrink-0">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>

      {deviceLabel && (
        <span className="mt-3 text-xs font-bold text-slate-500 tracking-tight">
          {deviceLabel}
        </span>
      )}
    </div>
  );
};
