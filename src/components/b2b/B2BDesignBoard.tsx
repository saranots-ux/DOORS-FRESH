import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Minimize2,
  Building2,
  Boxes,
  Calendar,
  Receipt,
  Truck,
  ShieldCheck,
  CheckCircle,
  Sparkles,
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
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface B2BDesignBoardProps {
  client: B2BBusinessProfile;
  allClients: B2BBusinessProfile[];
  items: B2BWholesaleItem[];
  standingOrders: B2BStandingOrder[];
  invoices: B2BInvoice[];
  onSelectScreenForInteractive: (screen: B2BScreenType) => void;
  onSelectClient: (client: B2BBusinessProfile) => void;
  onRegisterClient: (client: B2BBusinessProfile) => void;
  onToggleStandingOrder?: (id: string) => void;
  onPayInvoice?: (id: string) => void;
}

export const B2BDesignBoard: React.FC<B2BDesignBoardProps> = ({
  client,
  allClients,
  items,
  standingOrders,
  invoices,
  onSelectScreenForInteractive,
  onSelectClient,
  onRegisterClient,
  onToggleStandingOrder,
  onPayInvoice,
}) => {
  const [scale, setScale] = useState(0.85);

  const screens: {
    id: B2BScreenType;
    number: string;
    title: string;
    description: string;
    component: React.ReactNode;
    features: string[];
    tag: string;
  }[] = [
    {
      id: 'b2b_auth',
      number: '01',
      title: 'B2B Corporate Sign In & Business Sign Up',
      description: 'Enterprise credentials sign in with 1-click accounts (Hotel, Restaurant, Hostel, Shop), PIN/OTP verification, and institutional onboarding.',
      features: ['1-Click verified enterprise demo accounts', 'Registered Corporate Mobile & Security PIN', 'Instant Credit & Commercial Terms Sign Up'],
      tag: 'Corporate Auth',
      component: (
        <B2BAuthScreen
          currentClient={client}
          allClients={allClients}
          onLogin={(c) => {
            onSelectClient(c);
            onSelectScreenForInteractive('b2b_catalog');
          }}
          onRegisterNewClient={(newClient) => {
            onRegisterClient(newClient);
            onSelectClient(newClient);
            onSelectScreenForInteractive('b2b_catalog');
          }}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'b2b_connect',
      number: '02',
      title: 'B2B Connect & GST Onboarding',
      description: 'Institutional profile switcher for Hotels, Restaurants, Hostels & Shops with GSTIN verification, credit terms, and 1-click presets.',
      features: ['GSTIN & FSSAI verification', '15-day credit line approval', 'Hotel / Resto / Hostel / Shop profiles'],
      tag: 'B2B Onboarding',
      component: (
        <B2BConnectScreen
          currentClient={client}
          allClients={allClients}
          onSelectClient={onSelectClient}
          onRegisterClient={onRegisterClient}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'b2b_catalog',
      number: '03',
      title: 'Wholesale Crate & Bag Marketplace',
      description: 'Chef-grade produce in 25kg crates and 50kg gunny bags with real-time APMC mandi benchmarks and 25-30% bulk savings.',
      features: ['25kg/50kg crate bulk lots', 'Live Mandi price radar comparison', 'Instant 04:30 AM Reefer dispatch'],
      tag: 'Crate Wholesale',
      component: (
        <B2BWholesaleCatalogScreen
          currentClient={client}
          items={items}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'b2b_standing_orders',
      number: '04',
      title: 'Kitchen Standing Orders (Daily Drops)',
      description: 'Automated daily sunrise kitchen supplies, one-click weekend banquet surges (+30%), and recurring morning timetable.',
      features: ['Automated daily morning supply', 'Weekend banquet volume surge (+30%)', 'Zero missed deliveries guarantee'],
      tag: 'Standing Orders',
      component: (
        <B2BStandingOrdersScreen
          currentClient={client}
          standingOrders={standingOrders}
          onToggleStatus={onToggleStandingOrder}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'b2b_invoices',
      number: '05',
      title: 'Commercial Invoicing & Credit Ledger',
      description: 'Downloadable GST tax invoices, Input Tax Credit (ITC) compliance, 15-day commercial credit line health, and NEFT settlements.',
      features: ['Official GST tax invoice (PDF)', '15-day credit usage gauge', 'Direct NEFT/RTGS settlement'],
      tag: 'GST & Commercials',
      component: (
        <B2BInvoicesScreen
          currentClient={client}
          invoices={invoices}
          onPayInvoice={onPayInvoice}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
    {
      id: 'b2b_logistics',
      number: '06',
      title: 'Reefer Truck & Kitchen Dock Telemetry',
      description: 'Live 4.2°C cold-chain sensor telemetry, GPS route tracking, driver contact, and circular returnable crate handshake.',
      features: ['IoT Reefer 4°C sensor telemetry', 'Direct kitchen dock delivery GPS', 'Circular returnable crate tracker'],
      tag: 'Cold Logistics',
      component: (
        <B2BLogisticsScreen
          currentClient={client}
          onNavigate={onSelectScreenForInteractive}
        />
      ),
    },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* Board Top HUD */}
      <div className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-3 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <DoorsFreshLogo size="sm" variant="image" />
          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Doors Fresh B2B Supply Portal</span>
              </span>
              <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800 px-2 py-0.5 rounded-full font-semibold">
                Hotels · Restaurants · Hostels · Shops
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              6-Screen Wholesale Architecture · Enterprise Sign In/Sign Up, Crate Procurement, Standing Kitchen Drops & GST Credit Ledger
            </p>
          </div>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700 text-xs">
            <button
              onClick={() => setScale((s) => Math.max(0.55, s - 0.1))}
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[11px] font-semibold text-slate-300">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.2, s + 0.1))}
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setScale(0.85)}
              className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white cursor-pointer ml-1"
              title="Reset Zoom"
            >
              <Minimize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Click any artboard to launch full interactive test</span>
          </div>
        </div>
      </div>

      {/* Canvas Area with horizontal scroll for screens */}
      <div className="flex-1 overflow-x-auto overflow-y-auto p-8 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40">
        <div
          className="flex gap-8 items-start transition-transform origin-top-left"
          style={{ transform: `scale(${scale})` }}
        >
          {screens.map((screen) => (
            <div key={screen.id} className="flex flex-col gap-3 shrink-0">
              {/* Artboard Info Card */}
              <div className="w-[380px] bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-400 font-mono bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-800/60">
                      SCREEN {screen.number}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                      {screen.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectScreenForInteractive(screen.id)}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Test Screen</span>
                    <CheckCircle className="w-3 h-3" />
                  </button>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{screen.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  {screen.description}
                </p>

                {/* Features Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {screen.features.map((feat, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded-md border border-slate-800"
                    >
                      ✓ {feat}
                    </span>
                  ))}
                </div>
              </div>

              {/* Physical Mobile Device Preview */}
              <div
                onClick={() => onSelectScreenForInteractive(screen.id)}
                className="w-[380px] h-[780px] bg-slate-900 rounded-[48px] p-3 shadow-2xl ring-1 ring-slate-800 border border-slate-700/50 cursor-pointer hover:ring-2 hover:ring-indigo-500 transition-all group overflow-hidden"
              >
                <div className="relative w-full h-full bg-slate-900 rounded-[40px] overflow-hidden flex flex-col border border-slate-800 pointer-events-none group-hover:pointer-events-auto">
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
