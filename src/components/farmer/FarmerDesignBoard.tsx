import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Smartphone,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  TrendingUp,
  Scale,
  Truck,
  Building2,
  Leaf,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  CropAdvisory,
  FarmerBatch,
  FarmerPayout,
  FarmerProfile,
  FarmerScreenType,
  MandiRate,
} from '../../types';
import { FarmerDashboardScreen } from './FarmerDashboardScreen';
import { FarmerProduceListingScreen } from './FarmerProduceListingScreen';
import { FarmerPricingScreen } from './FarmerPricingScreen';
import { FarmerAdvisoryScreen } from './FarmerAdvisoryScreen';
import { FarmerEarningsScreen } from './FarmerEarningsScreen';
import { FarmerAuthScreen } from './FarmerAuthScreen';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface FarmerDesignBoardProps {
  farmer: FarmerProfile;
  batches: FarmerBatch[];
  mandiRates: MandiRate[];
  advisories: CropAdvisory[];
  payouts: FarmerPayout[];
  allFarmers?: FarmerProfile[];
  onSelectFarmer?: (farmer: FarmerProfile) => void;
  onOpenRegisterFarmer?: () => void;
  onRegisterNewFarmer?: (farmer: FarmerProfile) => void;
  onSelectScreenForInteractive: (screen: FarmerScreenType) => void;
  onAddBatch: (batch: FarmerBatch) => void;
}

export const FarmerDesignBoard: React.FC<FarmerDesignBoardProps> = ({
  farmer,
  batches,
  mandiRates,
  advisories,
  payouts,
  allFarmers,
  onSelectFarmer,
  onOpenRegisterFarmer,
  onRegisterNewFarmer,
  onSelectScreenForInteractive,
  onAddBatch,
}) => {
  const [scale, setScale] = useState(0.85);

  const screens: {
    id: FarmerScreenType;
    number: string;
    title: string;
    description: string;
    component: React.ReactNode;
    features: string[];
    tag: string;
  }[] = [
    {
      id: 'farmer_auth',
      number: '01',
      title: 'Farmer Auth & Onboarding',
      description: 'Mobile OTP authentication, KYC validation, instant demo farmer switches, and new producer enrollment.',
      features: ['Mobile + OTP Verification', 'Demo Farmer Quick-Login', 'Self-Serve Producer Onboarding'],
      tag: 'Auth & KYC',
      component: (
        <FarmerAuthScreen
          currentFarmer={farmer}
          allFarmers={allFarmers}
          onLogin={(f) => {
            if (onSelectFarmer) onSelectFarmer(f);
            onSelectScreenForInteractive('farmer_home');
          }}
          onRegisterNewFarmer={onRegisterNewFarmer}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'farmer_home',
      number: '02',
      title: 'Kisan Mitra Dashboard',
      description: 'Micro-climate intelligence, soil moisture telemetry, harvest alerts, and active pickup tracking.',
      features: ['Real-time Tamil Nadu weather', 'Soil moisture & Brix index', 'Active van collection tracker'],
      tag: 'Kisan Home',
      component: (
        <FarmerDashboardScreen
          farmer={farmer}
          batches={batches}
          mandiRates={mandiRates}
          allFarmers={allFarmers}
          onSelectFarmer={onSelectFarmer}
          onOpenRegisterFarmer={onOpenRegisterFarmer}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'farmer_batches',
      number: '03',
      title: 'Harvest Inwarding & Scheduling',
      description: 'Register yield batches with Grade A+/A/B categorization, Reefer van dispatch, and digital weighment slips.',
      features: ['Batch creation modal', 'Cold-chain Reefer van booking', 'Digital weighment slip tracking'],
      tag: 'Harvest & Inwarding',
      component: (
        <FarmerProduceListingScreen
          batches={batches}
          onAddBatch={onAddBatch}
        />
      ),
    },
    {
      id: 'farmer_rates',
      number: '04',
      title: 'Mandi vs Doors Fresh Pricing Radar',
      description: 'Transparent APMC comparison showing 25-35% premium, zero brokerage cuts, and guaranteed MSP floor.',
      features: ['Live Kanchipuram APMC feed', 'Guaranteed Doors Fresh premium', 'Instant rate lock & sell'],
      tag: 'Price Index',
      component: (
        <FarmerPricingScreen
          rates={mandiRates}
          onSelectCropToSell={() => onSelectScreenForInteractive('farmer_batches')}
        />
      ),
    },
    {
      id: 'farmer_advisory',
      number: '05',
      title: 'Crop Health & AI Diagnostic',
      description: 'Instant leaf blight camera scanner, IMD storm alerts, organic bio-fertilizer guidance, and direct agronomist calls.',
      features: ['Leaf photo disease scanner', 'Bilingual agro-meteorology', 'Dedicated TNAU agronomist'],
      tag: 'Agri-AI Advisory',
      component: (
        <FarmerAdvisoryScreen
          advisories={advisories}
        />
      ),
    },
    {
      id: 'farmer_earnings',
      number: '06',
      title: 'Earnings & Instant RBI Payouts',
      description: 'Zero-commission digital weighment payouts via direct IMPS/NEFT, UTR audit ledger, and PDF slip downloads.',
      features: ['Direct DBT bank transfer', 'Instant IMPS release button', 'Transparent bonus & zero-cut slip'],
      tag: 'Settlement Ledger',
      component: (
        <FarmerEarningsScreen
          farmer={farmer}
          payouts={payouts}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* Board Top HUD */}
      <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <DoorsFreshLogo size="sm" variant="icon" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Doors Fresh Farmer App
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                Complete 5-Screen UI Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Screen-by-Screen Artboards · Farmgate Procurement & Kisan Empowerment Suite
            </p>
          </div>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 text-xs">
            <button
              onClick={() => setScale((s) => Math.max(0.55, s - 0.1))}
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-xs text-slate-300 min-w-[50px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.2, s + 0.1))}
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setScale(0.85)}
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors ml-1"
              title="Reset Zoom"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Presentation Canvas */}
      <div className="flex-1 overflow-auto p-8 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]">
        <div
          className="flex gap-8 transition-transform duration-200 origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          {screens.map((screen) => (
            <div key={screen.id} className="flex flex-col shrink-0 w-[380px]">
              {/* Artboard Header Card */}
              <div className="mb-3 bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-slate-700/80 shadow-md">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 font-mono text-xs font-bold flex items-center justify-center">
                      {screen.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {screen.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectScreenForInteractive(screen.id)}
                    className="text-xs bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
                  >
                    <Smartphone className="w-3.5 h-3.5" /> Test Live
                  </button>
                </div>
                <h3 className="text-sm font-bold text-white">{screen.title}</h3>
                <p className="text-xs text-slate-400 mt-1 leading-snug">{screen.description}</p>

                {/* Features Pill List */}
                <div className="flex flex-wrap gap-1.5 mt-3 pt-2.5 border-t border-slate-700/60">
                  {screen.features.map((feat, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-slate-900/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50 flex items-center gap-1"
                    >
                      <CheckCircle className="w-2.5 h-2.5 text-emerald-400" /> {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Phone Mockup Artboard */}
              <div className="w-[380px] h-[780px] bg-slate-950 rounded-[44px] p-2.5 shadow-2xl border-4 border-slate-700/60 relative overflow-hidden ring-1 ring-emerald-500/20">
                <div className="w-full h-full bg-slate-50 rounded-[36px] overflow-hidden flex flex-col relative">
                  {/* Subtle Screen Indicator Badge */}
                  <div className="absolute top-2 right-4 z-40 bg-slate-900/80 backdrop-blur-sm text-emerald-300 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-700">
                    SCREEN {screen.number}
                  </div>
                  {screen.component}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
