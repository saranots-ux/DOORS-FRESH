import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  Bike,
  ShieldCheck,
  TrendingUp,
  Signal,
  Wifi,
  Battery,
  UserCheck,
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

interface FranchiseDeviceFrameProps {
  hub: FranchiseHub;
  allHubs?: FranchiseHub[];
  inwardBatches: FranchiseInwardBatch[];
  orders: FranchiseDispatchOrder[];
  wastageRecords: FranchiseWastageRecord[];
  financials: FranchiseFinancialSummary;
  activeScreen: FranchiseScreenType;
  onScreenChange: (screen: FranchiseScreenType) => void;
  onSelectHub?: (hub: FranchiseHub) => void;
  onRegisterNewHub?: (hub: FranchiseHub) => void;
  onApproveInward?: (batchId: string) => void;
  onDispatchOrder?: (orderId: string) => void;
}

export const FranchiseDeviceFrame: React.FC<FranchiseDeviceFrameProps> = ({
  hub,
  allHubs = [],
  inwardBatches,
  orders,
  wastageRecords,
  financials,
  activeScreen,
  onScreenChange,
  onSelectHub,
  onRegisterNewHub,
  onApproveInward,
  onDispatchOrder,
}) => {
  return (
    <div className="relative mx-auto w-[380px] h-[780px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800">
      <div className="relative w-full h-full bg-slate-50 rounded-[40px] overflow-hidden flex flex-col border border-slate-200">
        {/* Device Status Bar */}
        <div className="h-7 bg-teal-900 text-white flex items-center justify-between px-6 text-xs select-none z-30 shrink-0">
          <span className="font-semibold text-[11px]">9:41</span>
          <div className="w-20 h-4 bg-teal-950 rounded-b-xl mx-auto -mt-1.5" />
          <div className="flex items-center gap-1.5 text-teal-200">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-hidden relative">
          {activeScreen === 'franchise_auth' && (
            <FranchiseAuthScreen
              currentHub={hub}
              allHubs={allHubs.length > 0 ? allHubs : [hub]}
              onLogin={(h) => {
                if (onSelectHub) onSelectHub(h);
                onScreenChange('franchise_home');
              }}
              onRegisterNewHub={onRegisterNewHub}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'franchise_home' && (
            <FranchiseDashboardScreen
              hub={hub}
              inwardBatches={inwardBatches}
              orders={orders}
              financials={financials}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'franchise_inventory' && (
            <FranchiseInventoryScreen
              batches={inwardBatches}
              onApproveInward={onApproveInward}
            />
          )}

          {activeScreen === 'franchise_dispatch' && (
            <FranchiseDispatchScreen
              orders={orders}
              onDispatchOrder={onDispatchOrder}
            />
          )}

          {activeScreen === 'franchise_spoilage' && (
            <FranchiseWastageScreen
              wastageRecords={wastageRecords}
            />
          )}

          {activeScreen === 'franchise_margins' && (
            <FranchiseAnalyticsScreen
              hub={hub}
              financials={financials}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
          <button
            onClick={() => onScreenChange('franchise_home')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'franchise_home' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Hub Ops</span>
          </button>

          <button
            onClick={() => onScreenChange('franchise_inventory')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'franchise_inventory' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Inventory</span>
          </button>

          <button
            onClick={() => onScreenChange('franchise_dispatch')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'franchise_dispatch' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Dispatch</span>
          </button>

          <button
            onClick={() => onScreenChange('franchise_spoilage')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'franchise_spoilage' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Waste</span>
          </button>

          <button
            onClick={() => onScreenChange('franchise_margins')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'franchise_margins' ? 'text-teal-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Margins</span>
          </button>

          <button
            onClick={() => onScreenChange('franchise_auth')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors ${
              activeScreen === 'franchise_auth' ? 'text-teal-700 font-bold' : 'text-slate-400 hover:text-slate-600'
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
