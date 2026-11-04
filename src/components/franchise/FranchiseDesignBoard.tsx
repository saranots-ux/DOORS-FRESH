import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Minimize2,
  Smartphone,
  CheckCircle,
  Thermometer,
  Boxes,
  Bike,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  FranchiseDispatchOrder,
  FranchiseFinancialSummary,
  FranchiseHub,
  FranchiseInwardBatch,
  FranchiseScreenType,
  FranchiseWastageRecord,
} from '../../types';
import { FranchiseDashboardScreen } from './FranchiseDashboardScreen';
import { FranchiseInventoryScreen } from './FranchiseInventoryScreen';
import { FranchiseDispatchScreen } from './FranchiseDispatchScreen';
import { FranchiseWastageScreen } from './FranchiseWastageScreen';
import { FranchiseAnalyticsScreen } from './FranchiseAnalyticsScreen';
import { FranchiseAuthScreen } from './FranchiseAuthScreen';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface FranchiseDesignBoardProps {
  hub: FranchiseHub;
  allHubs?: FranchiseHub[];
  inwardBatches: FranchiseInwardBatch[];
  orders: FranchiseDispatchOrder[];
  wastageRecords: FranchiseWastageRecord[];
  financials: FranchiseFinancialSummary;
  onSelectScreenForInteractive: (screen: FranchiseScreenType) => void;
  onSelectHub?: (hub: FranchiseHub) => void;
  onRegisterNewHub?: (hub: FranchiseHub) => void;
  onApproveInward?: (batchId: string) => void;
  onDispatchOrder?: (orderId: string) => void;
}

export const FranchiseDesignBoard: React.FC<FranchiseDesignBoardProps> = ({
  hub,
  allHubs = [],
  inwardBatches,
  orders,
  wastageRecords,
  financials,
  onSelectScreenForInteractive,
  onSelectHub,
  onRegisterNewHub,
  onApproveInward,
  onDispatchOrder,
}) => {
  const [scale, setScale] = useState(0.85);

  const screens: {
    id: FranchiseScreenType;
    number: string;
    title: string;
    description: string;
    component: React.ReactNode;
    features: string[];
    tag: string;
  }[] = [
    {
      id: 'franchise_auth',
      number: '01',
      title: 'Dark Store Auth & Franchise Onboarding',
      description: 'Store manager verification PIN, multi-hub selector, and self-serve franchise partner application desk.',
      features: ['Store Security PIN & OTP', 'Multi-Hub Switching (Velachery, Central, Tambaram)', 'Franchise Partner Enrollment Flow'],
      tag: 'Auth & Onboarding',
      component: (
        <FranchiseAuthScreen
          currentHub={hub}
          allHubs={allHubs.length > 0 ? allHubs : [hub]}
          onLogin={(h) => {
            if (onSelectHub) onSelectHub(h);
            onSelectScreenForInteractive('franchise_home');
          }}
          onRegisterNewHub={onRegisterNewHub}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'franchise_home',
      number: '02',
      title: 'Dark Store & Hub Command',
      description: 'Live cold room telemetry at 4°C, inward harvest arrival staging, and real-time delivery turnaround SLA.',
      features: ['IoT Cold Room sensor telemetry', 'Staging dock arrival alerts', 'Daily turnaround analytics'],
      tag: 'Hub Command',
      component: (
        <FranchiseDashboardScreen
          hub={hub}
          inwardBatches={inwardBatches}
          orders={orders}
          financials={financials}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'franchise_inventory',
      number: '03',
      title: 'Cold-Chain Inwarding & QC',
      description: 'Digital crate QR scanning, automated tare deduction, quality grading score, and refrigerated bay slotting.',
      features: ['Digital QR barcode scanner', 'Automated tare weighment check', 'Cold Bay C-12 slotting'],
      tag: 'Inventory & QC',
      component: (
        <FranchiseInventoryScreen
          batches={inwardBatches}
          onApproveInward={onApproveInward}
        />
      ),
    },
    {
      id: 'franchise_dispatch',
      number: '04',
      title: 'B2C Dispatch & Rider Management',
      description: 'Pack and assign customer orders to EV delivery partners with live slot queue and delivery confirmations.',
      features: ['Slot-wise route clustering', 'EV rider assignment & tracking', 'One-click pack & dispatch'],
      tag: 'Dispatch Fleet',
      component: (
        <FranchiseDispatchScreen
          orders={orders}
          onDispatchOrder={onDispatchOrder}
        />
      ),
    },
    {
      id: 'franchise_spoilage',
      number: '05',
      title: 'Zero-Waste & Spoilage Audit',
      description: 'Strict &lt;1.5% spoilage target enforcement, organic biogas & compost redirection, zero landfill policy.',
      features: ['Spoilage & bruising tracker', 'Biogas & compost redirection', 'Preventative SOP guidelines'],
      tag: 'Zero-Waste',
      component: (
        <FranchiseWastageScreen
          wastageRecords={wastageRecords}
        />
      ),
    },
    {
      id: 'franchise_margins',
      number: '06',
      title: 'Daily Margins & Commercials',
      description: 'Transparent ₹3.5/kg handling fee, ~8% retail commission, delivery incentive bonuses, and weekly tax invoice.',
      features: ['₹3.5/kg handling fee statement', 'Daily net franchisee profit HUD', 'Automated tax invoice export'],
      tag: 'Financials',
      component: (
        <FranchiseAnalyticsScreen
          hub={hub}
          financials={financials}
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
              <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">
                Doors Fresh Franchise App
              </span>
              <span className="text-[10px] bg-teal-950 text-teal-300 border border-teal-800 px-2 py-0.5 rounded-full font-semibold">
                Complete 5-Screen UI Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Screen-by-Screen Artboards · Dark Store Operations, Cold-Chain Inwarding & Last-Mile Delivery
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
                    <span className="w-6 h-6 rounded-lg bg-teal-600/30 text-teal-400 border border-teal-500/40 font-mono text-xs font-bold flex items-center justify-center">
                      {screen.number}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">
                      {screen.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectScreenForInteractive(screen.id)}
                    className="text-xs bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 border border-teal-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all"
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
                      <CheckCircle className="w-2.5 h-2.5 text-teal-400" /> {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mobile Phone Mockup Artboard */}
              <div className="w-[380px] h-[780px] bg-slate-950 rounded-[44px] p-2.5 shadow-2xl border-4 border-slate-700/60 relative overflow-hidden ring-1 ring-teal-500/20">
                <div className="w-full h-full bg-slate-50 rounded-[36px] overflow-hidden flex flex-col relative">
                  <div className="absolute top-2 right-4 z-40 bg-slate-900/80 backdrop-blur-sm text-teal-300 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border border-slate-700">
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
