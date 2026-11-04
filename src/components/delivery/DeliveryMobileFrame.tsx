import React from 'react';
import {
  Bike,
  Package,
  Navigation,
  TrendingUp,
  User,
  Signal,
  Wifi,
  Battery,
  UserCheck,
} from 'lucide-react';
import {
  DeliveryPartnerProfile,
  DeliveryScreenType,
  DeliveryTask,
  RiderEarningsSummary,
} from '../../types';
import { DeliveryDashboardScreen } from './DeliveryDashboardScreen';
import { DeliveryTasksScreen } from './DeliveryTasksScreen';
import { DeliveryNavigationScreen } from './DeliveryNavigationScreen';
import { DeliveryEarningsScreen } from './DeliveryEarningsScreen';
import { DeliveryProfileScreen } from './DeliveryProfileScreen';
import { DeliveryAuthScreen } from './DeliveryAuthScreen';

interface DeliveryMobileFrameProps {
  rider: DeliveryPartnerProfile;
  allRiders?: DeliveryPartnerProfile[];
  tasks: DeliveryTask[];
  earnings: RiderEarningsSummary;
  activeScreen: DeliveryScreenType;
  selectedTask: DeliveryTask;
  onScreenChange: (screen: DeliveryScreenType) => void;
  onSelectTask: (task: DeliveryTask) => void;
  onSelectRider?: (rider: DeliveryPartnerProfile) => void;
  onRegisterNewRider?: (rider: DeliveryPartnerProfile) => void;
  onToggleOnline: () => void;
  onUpdateTaskStatus: (taskId: string, status: DeliveryTask['status']) => void;
  onCompleteDelivery: (taskId: string) => void;
  onInstantCashout?: (amount: number) => void;
  onSwitchToCustomerApp?: () => void;
  onAcceptTask?: (taskId: string) => void;
  onRejectTask?: (taskId: string, reason: string) => void;
  onInitiateReturn?: (taskId: string, reason: string) => void;
}

export const DeliveryMobileFrame: React.FC<DeliveryMobileFrameProps> = ({
  rider,
  allRiders = [],
  tasks,
  earnings,
  activeScreen,
  selectedTask,
  onScreenChange,
  onSelectTask,
  onSelectRider,
  onRegisterNewRider,
  onToggleOnline,
  onUpdateTaskStatus,
  onCompleteDelivery,
  onInstantCashout,
  onSwitchToCustomerApp,
  onAcceptTask,
  onRejectTask,
  onInitiateReturn,
}) => {
  return (
    <div className="relative mx-auto w-[380px] h-[780px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800">
      <div className="relative w-full h-full bg-slate-900 rounded-[40px] overflow-hidden flex flex-col border border-slate-800">
        {/* Device Status Bar */}
        <div className="h-7 bg-slate-950 text-white flex items-center justify-between px-6 text-xs select-none z-30 shrink-0 border-b border-slate-800/80">
          <span className="font-semibold text-[11px]">9:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-b-xl mx-auto -mt-1.5" />
          <div className="flex items-center gap-1.5 text-slate-300">
            <Signal className="w-3 h-3 text-emerald-400" />
            <Wifi className="w-3 h-3 text-emerald-400" />
            <Battery className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-hidden relative">
          {activeScreen === 'delivery_auth' && (
            <DeliveryAuthScreen
              currentRider={rider}
              allRiders={allRiders.length > 0 ? allRiders : [rider]}
              onLogin={(r) => {
                if (onSelectRider) onSelectRider(r);
                onScreenChange('delivery_home');
              }}
              onRegisterNewRider={onRegisterNewRider}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'delivery_home' && (
            <DeliveryDashboardScreen
              rider={rider}
              tasks={tasks}
              onToggleOnline={onToggleOnline}
              onNavigate={onScreenChange}
              onSelectTask={onSelectTask}
              onAcceptTask={onAcceptTask}
              onRejectTask={onRejectTask}
            />
          )}

          {activeScreen === 'delivery_orders' && (
            <DeliveryTasksScreen
              tasks={tasks}
              onSelectTask={onSelectTask}
              onUpdateTaskStatus={onUpdateTaskStatus}
              onNavigate={onScreenChange}
              onRejectTask={onRejectTask}
            />
          )}

          {activeScreen === 'delivery_navigation' && (
            <DeliveryNavigationScreen
              task={selectedTask}
              onCompleteDelivery={onCompleteDelivery}
              onNavigate={onScreenChange}
              onSwitchToCustomerApp={onSwitchToCustomerApp}
              onInitiateReturn={onInitiateReturn}
            />
          )}

          {activeScreen === 'delivery_earnings' && (
            <DeliveryEarningsScreen
              rider={rider}
              earnings={earnings}
              onInstantCashout={onInstantCashout}
            />
          )}

          {activeScreen === 'delivery_profile' && (
            <DeliveryProfileScreen
              rider={rider}
              onToggleOnline={onToggleOnline}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-2 py-2 flex items-center justify-around z-30 shadow-lg">
          <button
            onClick={() => onScreenChange('delivery_home')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'delivery_home' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span>Duty</span>
          </button>

          <button
            onClick={() => onScreenChange('delivery_orders')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'delivery_orders' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({tasks.filter((t) => t.status !== 'delivered').length})</span>
          </button>

          <button
            onClick={() => onScreenChange('delivery_navigation')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'delivery_navigation' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Navigation className="w-4 h-4" />
            <span>GPS</span>
          </button>

          <button
            onClick={() => onScreenChange('delivery_earnings')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'delivery_earnings' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Pay</span>
          </button>

          <button
            onClick={() => onScreenChange('delivery_profile')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'delivery_profile' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button
            onClick={() => onScreenChange('delivery_auth')}
            className={`flex flex-col items-center gap-0.5 text-[9px] font-semibold transition-colors cursor-pointer ${
              activeScreen === 'delivery_auth' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
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
