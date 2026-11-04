import React from 'react';
import {
  Home,
  Package,
  TrendingUp,
  Leaf,
  Banknote,
  Signal,
  Wifi,
  Battery,
  UserCheck,
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

interface FarmerMobileFrameProps {
  farmer: FarmerProfile;
  batches: FarmerBatch[];
  mandiRates: MandiRate[];
  advisories: CropAdvisory[];
  payouts: FarmerPayout[];
  allFarmers?: FarmerProfile[];
  onSelectFarmer?: (farmer: FarmerProfile) => void;
  onOpenRegisterFarmer?: () => void;
  onRegisterNewFarmer?: (farmer: FarmerProfile) => void;
  activeScreen: FarmerScreenType;
  onScreenChange: (screen: FarmerScreenType) => void;
  onAddBatch: (batch: FarmerBatch) => void;
  onTriggerInstantPayout?: (payoutId: string) => void;
}

export const FarmerMobileFrame: React.FC<FarmerMobileFrameProps> = ({
  farmer,
  batches,
  mandiRates,
  advisories,
  payouts,
  allFarmers,
  onSelectFarmer,
  onOpenRegisterFarmer,
  onRegisterNewFarmer,
  activeScreen,
  onScreenChange,
  onAddBatch,
  onTriggerInstantPayout,
}) => {
  return (
    <div className="relative mx-auto w-[380px] h-[780px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800">
      {/* Device Outer Frame */}
      <div className="relative w-full h-full bg-slate-50 rounded-[40px] overflow-hidden flex flex-col border border-slate-200">
        {/* Device Status Bar */}
        <div className="h-7 bg-emerald-800 text-white flex items-center justify-between px-6 text-xs select-none z-30 shrink-0">
          <span className="font-semibold text-[11px]">9:41</span>
          <div className="w-20 h-4 bg-emerald-950 rounded-b-xl mx-auto -mt-1.5" />
          <div className="flex items-center gap-1.5 text-emerald-200">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-hidden relative">
          {activeScreen === 'farmer_auth' && (
            <FarmerAuthScreen
              currentFarmer={farmer}
              allFarmers={allFarmers}
              onLogin={(f) => {
                if (onSelectFarmer) onSelectFarmer(f);
                onScreenChange('farmer_home');
              }}
              onRegisterNewFarmer={onRegisterNewFarmer}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'farmer_home' && (
            <FarmerDashboardScreen
              farmer={farmer}
              batches={batches}
              mandiRates={mandiRates}
              allFarmers={allFarmers}
              onSelectFarmer={onSelectFarmer}
              onOpenRegisterFarmer={onOpenRegisterFarmer}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'farmer_batches' && (
            <FarmerProduceListingScreen
              batches={batches}
              onAddBatch={onAddBatch}
            />
          )}

          {activeScreen === 'farmer_rates' && (
            <FarmerPricingScreen
              rates={mandiRates}
              onSelectCropToSell={(crop) => onScreenChange('farmer_batches')}
            />
          )}

          {activeScreen === 'farmer_advisory' && (
            <FarmerAdvisoryScreen
              advisories={advisories}
            />
          )}

          {activeScreen === 'farmer_earnings' && (
            <FarmerEarningsScreen
              farmer={farmer}
              payouts={payouts}
              onTriggerInstantPayout={onTriggerInstantPayout}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
          <button
            onClick={() => onScreenChange('farmer_home')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'farmer_home' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => onScreenChange('farmer_batches')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'farmer_batches' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Batches</span>
          </button>

          <button
            onClick={() => onScreenChange('farmer_rates')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'farmer_rates' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Mandi</span>
          </button>

          <button
            onClick={() => onScreenChange('farmer_advisory')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'farmer_advisory' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Leaf className="w-4 h-4" />
            <span>Agri-AI</span>
          </button>

          <button
            onClick={() => onScreenChange('farmer_earnings')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'farmer_earnings' ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Banknote className="w-4 h-4" />
            <span>Payout</span>
          </button>

          <button
            onClick={() => onScreenChange('farmer_auth')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'farmer_auth' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Auth</span>
          </button>
        </div>
      </div>
    </div>
  );
};
