import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { FarmBasketIllustration, WishoreLogo } from '../../common/ProduceGraphics';
import { ScreenType } from '../../../types';

interface SplashScreenProps {
  onEnterApp: () => void;
  onNavigateScreen?: (screen: ScreenType) => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onEnterApp, onNavigateScreen }) => {
  const [progress, setProgress] = useState(35);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 15;
      });
    }, 400);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[640px] h-full flex flex-col justify-between bg-gradient-to-b from-emerald-50 via-teal-50/50 to-lime-50/70 p-6 overflow-hidden">
      {/* Decorative sunbeams & subtle farm clouds */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute top-36 left-0 w-64 h-64 bg-emerald-200/20 rounded-full blur-2xl -ml-20 pointer-events-none" />

      {/* Top Branding Area */}
      <div className="relative z-10 flex flex-col items-center pt-8 text-center">
        <div className="bg-white/80 backdrop-blur-xs px-5 py-2.5 rounded-2xl shadow-sm border border-emerald-100/80 flex items-center justify-center mb-2.5">
          <img
            src="/assets/aistudio/Doors__991a8f46.png"
            alt="Doors Fresh"
            className="h-10 w-auto object-contain drop-shadow-2xs"
          />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Doors Fresh <span className="text-emerald-700">Agri-Tech</span>
        </h1>
        <p className="text-xs font-semibold text-emerald-800 tracking-wide mt-1">
          Fresh Farm Produce to Your Doorstep
        </p>
      </div>

      {/* Scenic Farm Field with rows & overflowing basket */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-4">
        {/* Farm rows illustration backdrop */}
        <div className="w-full max-w-[280px] h-40 relative rounded-2xl overflow-hidden border border-emerald-200/60 shadow-inner bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 mb-2">
          {/* Distant farm mountains */}
          <svg viewBox="0 0 300 160" className="w-full h-full object-cover">
            <path d="M0 100 Q60 60 120 90 T240 80 T300 110 L300 160 L0 160 Z" fill="#bbf7d0" />
            <path d="M0 110 Q80 85 160 115 T300 120 L300 160 L0 160 Z" fill="#86efac" />
            {/* Sun */}
            <circle cx="210" cy="50" r="22" fill="#fde047" opacity="0.85" />
            {/* Crop rows perspective */}
            <path d="M150 115 L20 160 M150 115 L70 160 M150 115 L120 160 M150 115 L180 160 M150 115 L230 160 M150 115 L280 160" stroke="#15803d" strokeWidth="2.5" opacity="0.5" />
          </svg>
        </div>

        {/* Harvest Basket overlapping nicely */}
        <div className="w-64 -mt-16 transform hover:scale-105 transition-transform duration-300">
          <FarmBasketIllustration className="w-full h-auto drop-shadow-xl" />
        </div>

        <div className="flex items-center gap-1.5 mt-2 text-[11px] font-medium text-emerald-900 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          100% Pesticide-Free Direct Harvest
        </div>
      </div>

      {/* Loading & CTA Area */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center pb-4">
        <div className="w-full mb-3">
          <div className="flex justify-between text-[11px] font-semibold text-emerald-900 mb-1.5">
            <span>Harvesting fresh batches...</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button
          onClick={onEnterApp}
          className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] text-white rounded-xl font-semibold text-sm shadow-md shadow-emerald-900/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Explore Farm Store</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
