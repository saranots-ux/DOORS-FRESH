import React from 'react';
import {
  Building2,
  Boxes,
  Calendar,
  Receipt,
  Truck,
  Signal,
  Wifi,
  Battery,
  LogIn,
  LogOut,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  B2BBusinessProfile,
  B2BInvoice,
  B2BScreenType,
  B2BStandingOrder,
  B2BWholesaleItem,
} from '../../types';
import { B2BAuthScreen } from './B2BAuthScreen';
import { B2BConnectScreen } from './B2BConnectScreen';
import { B2BWholesaleCatalogScreen } from './B2BWholesaleCatalogScreen';
import { B2BStandingOrdersScreen } from './B2BStandingOrdersScreen';
import { B2BInvoicesScreen } from './B2BInvoicesScreen';
import { B2BLogisticsScreen } from './B2BLogisticsScreen';

interface B2BMobileFrameProps {
  client: B2BBusinessProfile;
  allClients: B2BBusinessProfile[];
  items: B2BWholesaleItem[];
  standingOrders: B2BStandingOrder[];
  invoices: B2BInvoice[];
  activeScreen: B2BScreenType;
  onScreenChange: (screen: B2BScreenType) => void;
  onSelectClient: (client: B2BBusinessProfile) => void;
  onRegisterClient: (client: B2BBusinessProfile) => void;
  onToggleStandingOrder?: (id: string) => void;
  onPayInvoice?: (id: string) => void;
}

export const B2BMobileFrame: React.FC<B2BMobileFrameProps> = ({
  client,
  allClients,
  items,
  standingOrders,
  invoices,
  activeScreen,
  onScreenChange,
  onSelectClient,
  onRegisterClient,
  onToggleStandingOrder,
  onPayInvoice,
}) => {
  return (
    <div className="relative mx-auto w-[385px] h-[790px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800">
      <div className="relative w-full h-full bg-slate-900 rounded-[40px] overflow-hidden flex flex-col border border-slate-800">
        {/* Device Status Bar */}
        <div className="h-7 bg-indigo-950 text-white flex items-center justify-between px-6 text-xs select-none z-30 shrink-0 border-b border-indigo-900/40">
          <span className="font-semibold text-[11px]">9:41</span>
          <div className="w-20 h-4 bg-indigo-900/60 rounded-b-xl mx-auto -mt-1.5" />
          <div className="flex items-center gap-1.5 text-indigo-300">
            <Signal className="w-3 h-3 text-emerald-400" />
            <Wifi className="w-3 h-3 text-emerald-400" />
            <Battery className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Corporate Receiving Desk Quick Switch Header */}
        {activeScreen !== 'b2b_auth' && (
          <div className="bg-slate-950/95 border-b border-slate-800/80 px-3 py-1.5 flex items-center justify-between text-xs shrink-0 z-20">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-white truncate block">{client.businessName}</span>
                <span className="text-[9px] text-slate-400 uppercase font-mono tracking-wider">{client.category} • {client.locality}</span>
              </div>
            </div>
            <button
              onClick={() => onScreenChange('b2b_auth')}
              className="px-2 py-1 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 rounded-lg text-[9px] font-bold text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              title="Switch business account or sign in"
            >
              <LogIn className="w-3 h-3" />
              <span>Auth / Switch</span>
            </button>
          </div>
        )}

        {/* Dynamic Screen View */}
        <div className="flex-1 overflow-hidden relative">
          {activeScreen === 'b2b_auth' && (
            <B2BAuthScreen
              currentClient={client}
              allClients={allClients}
              onLogin={(c) => {
                onSelectClient(c);
                onScreenChange('b2b_catalog');
              }}
              onRegisterNewClient={(newClient) => {
                onRegisterClient(newClient);
                onSelectClient(newClient);
                onScreenChange('b2b_catalog');
              }}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'b2b_connect' && (
            <B2BConnectScreen
              currentClient={client}
              allClients={allClients}
              onSelectClient={onSelectClient}
              onRegisterClient={onRegisterClient}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'b2b_catalog' && (
            <B2BWholesaleCatalogScreen
              currentClient={client}
              items={items}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'b2b_standing_orders' && (
            <B2BStandingOrdersScreen
              currentClient={client}
              standingOrders={standingOrders}
              onToggleStatus={onToggleStandingOrder}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'b2b_invoices' && (
            <B2BInvoicesScreen
              currentClient={client}
              invoices={invoices}
              onPayInvoice={onPayInvoice}
              onNavigate={onScreenChange}
            />
          )}

          {activeScreen === 'b2b_logistics' && (
            <B2BLogisticsScreen
              currentClient={client}
              onNavigate={onScreenChange}
            />
          )}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 px-1 py-1.5 flex items-center justify-around z-30 shadow-lg">
          <button
            onClick={() => onScreenChange('b2b_auth')}
            className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold transition-colors cursor-pointer px-1 ${
              activeScreen === 'b2b_auth' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Auth</span>
          </button>

          <button
            onClick={() => onScreenChange('b2b_connect')}
            className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold transition-colors cursor-pointer px-1 ${
              activeScreen === 'b2b_connect' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>

          <button
            onClick={() => onScreenChange('b2b_catalog')}
            className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold transition-colors cursor-pointer px-1 ${
              activeScreen === 'b2b_catalog' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Boxes className="w-3.5 h-3.5" />
            <span>Wholesale</span>
          </button>

          <button
            onClick={() => onScreenChange('b2b_standing_orders')}
            className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold transition-colors cursor-pointer px-1 ${
              activeScreen === 'b2b_standing_orders' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Drops</span>
          </button>

          <button
            onClick={() => onScreenChange('b2b_invoices')}
            className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold transition-colors cursor-pointer px-1 ${
              activeScreen === 'b2b_invoices' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Invoices</span>
          </button>

          <button
            onClick={() => onScreenChange('b2b_logistics')}
            className={`flex flex-col items-center gap-0.5 text-[8.5px] font-semibold transition-colors cursor-pointer px-1 ${
              activeScreen === 'b2b_logistics' ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Reefer</span>
          </button>
        </div>
      </div>
    </div>
  );
};
