import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Minimize2,
  Smartphone,
  CheckCircle,
  Bike,
  Thermometer,
  Navigation,
  ShieldCheck,
  Wallet,
  Clock,
  BatteryCharging,
  QrCode,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  DeliveryPartnerProfile,
  DeliveryScreenType,
  DeliveryTask,
  DeliveryTaskStatus,
  RiderEarningsSummary,
} from '../../types';
import { DeliveryDashboardScreen } from './DeliveryDashboardScreen';
import { DeliveryTasksScreen } from './DeliveryTasksScreen';
import { DeliveryNavigationScreen } from './DeliveryNavigationScreen';
import { DeliveryEarningsScreen } from './DeliveryEarningsScreen';
import { DeliveryProfileScreen } from './DeliveryProfileScreen';
import { DeliveryAuthScreen } from './DeliveryAuthScreen';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface DeliveryDesignBoardProps {
  rider: DeliveryPartnerProfile;
  allRiders?: DeliveryPartnerProfile[];
  tasks: DeliveryTask[];
  earnings: RiderEarningsSummary;
  selectedTask: DeliveryTask;
  onSelectScreenForInteractive: (screen: DeliveryScreenType) => void;
  onSelectRider?: (rider: DeliveryPartnerProfile) => void;
  onRegisterNewRider?: (rider: DeliveryPartnerProfile) => void;
  onToggleOnline: () => void;
  onUpdateTaskStatus: (taskId: string, status: DeliveryTaskStatus) => void;
  onCompleteDelivery: (taskId: string) => void;
  onInstantCashout: (amount: number) => void;
  onSelectTask: (task: DeliveryTask) => void;
  onSwitchToCustomerApp?: () => void;
}

export const DeliveryDesignBoard: React.FC<DeliveryDesignBoardProps> = ({
  rider,
  allRiders = [],
  tasks,
  earnings,
  selectedTask,
  onSelectScreenForInteractive,
  onSelectRider,
  onRegisterNewRider,
  onToggleOnline,
  onUpdateTaskStatus,
  onCompleteDelivery,
  onInstantCashout,
  onSelectTask,
  onSwitchToCustomerApp,
}) => {
  const [scale, setScale] = useState(0.85);

  const screens: {
    id: DeliveryScreenType;
    number: string;
    title: string;
    description: string;
    component: React.ReactNode;
    features: string[];
    tag: string;
  }[] = [
    {
      id: 'delivery_auth',
      number: '01',
      title: 'Rider Partner Auth & Onboarding',
      description: 'Fleet mobile + PIN login, EV scooter pairing, insulated cold box check, and self-serve rider onboarding flow.',
      features: ['Mobile + PIN authentication', 'Ather/Ola EV scooter selector', 'Instant Fleet Partner Application'],
      tag: 'Auth & Fleet KYC',
      component: (
        <DeliveryAuthScreen
          currentRider={rider}
          allRiders={allRiders.length > 0 ? allRiders : [rider]}
          onLogin={(r) => {
            if (onSelectRider) onSelectRider(r);
            onSelectScreenForInteractive('delivery_home');
          }}
          onRegisterNewRider={onRegisterNewRider}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'delivery_home',
      number: '02',
      title: 'Duty Hub & Cold Box Telemetry',
      description: 'Online/Offline switch, IoT cold-chain sensor (5.2°C), Ather 450X battery range (78%), and live dispatch radar.',
      features: ['One-tap online duty toggle', 'Live 4-8°C cold box telemetry', 'Ather EV battery & range HUD'],
      tag: 'Duty & Telemetry',
      component: (
        <DeliveryDashboardScreen
          rider={rider}
          tasks={tasks}
          onToggleOnline={onToggleOnline}
          onNavigate={onSelectScreenForInteractive}
          onSelectTask={onSelectTask}
        />
      ),
    },
    {
      id: 'delivery_orders',
      number: '03',
      title: 'Route Tasks & Produce Checklist',
      description: 'Accept micro-hub orders, itemized fragile produce inspection checklist, and returnable crate pickup tags.',
      features: ['Fragile & cold produce tags', 'Returnable crate incentives', 'Quick swipe order accept'],
      tag: 'Orders & Checklist',
      component: (
        <DeliveryTasksScreen
          tasks={tasks}
          onSelectTask={(task) => {
            onSelectTask(task);
            onSelectScreenForInteractive('delivery_navigation');
          }}
          onUpdateTaskStatus={onUpdateTaskStatus}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'delivery_navigation',
      number: '04',
      title: 'GPS HUD & OTP Drop Verification',
      description: 'Turn-by-turn guidance, masked customer calling, 4-digit drop OTP (4821), crate return reward, and photo delivery proof.',
      features: ['Turn-by-turn GPS HUD', '4-digit secure OTP verification', 'Crate return ₹20 credit logger'],
      tag: 'GPS & Verification',
      component: (
        <DeliveryNavigationScreen
          task={selectedTask}
          onCompleteDelivery={onCompleteDelivery}
          onNavigate={onSelectScreenForInteractive}
          onSwitchToCustomerApp={onSwitchToCustomerApp}
        />
      ),
    },
    {
      id: 'delivery_earnings',
      number: '05',
      title: 'Daily Earnings & Instant UPI Cashout',
      description: 'Daily payout breakdown (base pay + cold compliance + tip), withdrawable balance, and instant transfer to UPI VPA.',
      features: ['Instant UPI cashout (@okaxis)', 'Cold bag compliance bonus', 'Full UTR payout ledger'],
      tag: 'Earnings & Payouts',
      component: (
        <DeliveryEarningsScreen
          earnings={earnings}
          rider={rider}
          onInstantCashout={onInstantCashout}
        />
      ),
    },
    {
      id: 'delivery_profile',
      number: '06',
      title: 'Fleet EV, KYC & Equipment Health',
      description: 'TN Transport DL verification, Ather 450X diagnostics, Insulated bag sterilization audit, and produce certification.',
      features: ['Zero-emission EV telemetry', 'Sanitization audit log', 'Organic handling certificate'],
      tag: 'Profile & Fleet',
      component: (
        <DeliveryProfileScreen
          rider={rider}
          onToggleOnline={onToggleOnline}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* Top Design Board Control Header */}
      <div className="bg-slate-950 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <DoorsFreshLogo size="sm" variant="image" />
          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                <Bike className="w-3.5 h-3.5 text-emerald-400" /> Delivery Partner App · Complete UI Design
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> 5 Key Production Screens
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Screen-by-Screen Artboards · Cold-Chain Logistics, Turn-by-Turn GPS HUD & Instant UPI Payouts
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
                <div className="w-full h-full bg-slate-900 rounded-[36px] overflow-hidden flex flex-col relative text-slate-100">
                  {/* Screen Indicator Badge */}
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
