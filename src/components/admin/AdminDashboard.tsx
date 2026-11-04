import React, { useState } from 'react';
import {
  Activity,
  Layers,
  Users,
  Building2,
  ShoppingBag,
  TrendingUp,
  Coins,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Search,
  RefreshCw,
  Sliders,
  DollarSign,
  Truck,
  Thermometer,
  Boxes,
  Sparkles,
  ChevronRight,
  Download,
  Check,
  X,
  Play,
  RotateCcw,
  Bike,
  Calendar,
  Ticket,
  MessageSquare,
  Headphones,
  Tag,
  CreditCard,
  UserPlus,
  Tractor,
  Leaf,
  MapPin,
  Phone,
} from 'lucide-react';
import {
  AdminTabType,
  AdminTelemetry,
  DeliveryPartnerProfile,
  DeliveryTask,
  FarmerBatch,
  FarmerProfile,
  FranchiseDispatchOrder,
  FranchiseHub,
  FranchiseInwardBatch,
  MandiRate,
  Product,
  SystemAuditLog,
} from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';
import { NewFarmerRegistrationModal } from '../farmer/NewFarmerRegistrationModal';

interface AdminDashboardProps {
  telemetry: AdminTelemetry;
  systemLogs: SystemAuditLog[];
  farmers: FarmerProfile[];
  farmerBatches: FarmerBatch[];
  franchiseHubs: FranchiseHub[];
  franchiseInwards: FranchiseInwardBatch[];
  orders: FranchiseDispatchOrder[];
  products: Product[];
  mandiRates: MandiRate[];
  deliveryProfile?: DeliveryPartnerProfile;
  deliveryTasks?: DeliveryTask[];
  onAddNewFarmer?: (newFarmer: FarmerProfile) => void;
  onApproveFarmerBatch: (batchId: string) => void;
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onUpdateProcurementRate: (cropName: string, newRate: number) => void;
  onReleaseFarmerPayout: (batchId: string) => void;
  onSwitchAppView?: (view: 'customer' | 'b2b' | 'farmer' | 'franchise' | 'delivery') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  telemetry,
  systemLogs,
  farmers,
  farmerBatches,
  franchiseHubs,
  franchiseInwards,
  orders,
  products,
  mandiRates,
  deliveryProfile,
  deliveryTasks = [],
  onAddNewFarmer,
  onApproveFarmerBatch,
  onUpdateProductPrice,
  onUpdateProcurementRate,
  onReleaseFarmerPayout,
  onSwitchAppView,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);
  const [showAddFarmerModal, setShowAddFarmerModal] = useState(false);

  const showNotification = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-900 text-slate-100 overflow-hidden select-none">
      {/* Top Admin Navigation Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-3.5 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-4">
          <DoorsFreshLogo size="sm" variant="image" />
          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">
                Centralised Ecosystem Command
              </span>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Governing Customer App · Farmer Procurement App · Franchise Hub Dark Stores
            </p>
          </div>
        </div>

        {/* Global Quick Actions */}
        <div className="flex items-center gap-3">
          {actionNotice && (
            <div className="bg-emerald-900/90 border border-emerald-600 text-emerald-200 text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{actionNotice}</span>
            </div>
          )}

          <div className="hidden lg:flex items-center gap-2 text-xs bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">Direct Inspect:</span>
            {onSwitchAppView && (
              <>
                <button
                  onClick={() => onSwitchAppView('customer')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Customer
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => onSwitchAppView('farmer')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Farmer
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => onSwitchAppView('franchise')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Franchise
                </button>
                <span className="text-slate-600">·</span>
                <button
                  onClick={() => onSwitchAppView('delivery')}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  Delivery
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Admin Body Layout: Sidebar + Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-slate-950/70 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-3 mb-2">
              Operations Control
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Live Ecosystem Ops</span>
            </button>

            <button
              onClick={() => setActiveTab('farmers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'farmers'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-amber-400" />
                <span>Farmer Network</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                {farmers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('franchises')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'franchises'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-teal-400" />
                <span>Franchise Hubs</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                {franchiseHubs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('b2b_horeca')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'b2b_horeca'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span>B2B HORECA Supply</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-indigo-300 px-1.5 py-0.5 rounded font-mono">
                4 Key
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-blue-400" />
                <span>Customer Orders</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
                {telemetry.dailyOrdersCount}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('delivery_fleet')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'delivery_fleet'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Bike className="w-4 h-4 text-emerald-400" />
                <span>Delivery Fleet</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono">
                {deliveryProfile?.isOnline ? 'Active' : 'Standby'}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('subscriptions')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'subscriptions'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Subscriptions</span>
              </div>
              <span className="text-[10px] bg-slate-800 text-purple-300 px-1.5 py-0.5 rounded font-mono">
                1,420
              </span>
            </button>

            <button
              onClick={() => setActiveTab('promotions_support')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'promotions_support'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Headphones className="w-4 h-4 text-rose-400" />
                <span>Promos & Support</span>
              </div>
              <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 py-0.5 rounded font-mono border border-rose-800">
                2 Open
              </span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'pricing'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <Sliders className="w-4 h-4 text-yellow-400" />
              <span>Pricing & Margins</span>
            </button>

            <button
              onClick={() => setActiveTab('finances')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'finances'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Settlement & DBT</span>
            </button>
          </div>

          {/* Infrastructure Health Micro Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                System Status
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> All Nominal
              </span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Cold Chain SLA</span>
                <span className="text-emerald-400 font-semibold">99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Spoilage</span>
                <span className="text-emerald-400 font-semibold">0.84%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Active Transit</span>
                <span className="text-white font-semibold">4.8 Tons</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Operational Canvas */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900/60">
          {/* TAB 1: OVERVIEW & ECOSYSTEM PIPELINE */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* 4 Big Executive KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold">Procurement Tonnage Today</span>
                    <Truck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    {telemetry.totalProcurementTonnageToday} Metric Tons
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> +14.2% from 148 contracted farms
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold">Daily B2C Customer GMV</span>
                    <DollarSign className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white">
                    ₹{telemetry.grossMerchandiseValue.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-teal-400 font-medium mt-1">
                    {telemetry.dailyOrdersCount} deliveries across Chennai
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold">Franchise Cold-Chain Health</span>
                    <Thermometer className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-cyan-300">
                    {telemetry.hubColdStorageFulfillmentRate}%
                  </div>
                  <div className="text-[11px] text-cyan-400 font-medium mt-1">
                    All 14 dark stores within 3.5°C - 5.0°C
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-semibold">Farmer Payouts Disbursed</span>
                    <Coins className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-amber-300">
                    ₹{telemetry.farmerPayoutDisbursedToday.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-amber-400 font-medium mt-1">
                    100% Direct RBI NEFT/IMPS (Zero cuts)
                  </div>
                </div>
              </div>

              {/* End-to-End Supply Chain Visual Pipeline */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" /> Live Cross-Application Pipeline Telemetry
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Visual orchestration connecting Farmer Harvests ➔ Transit Reefer Fleet ➔ Franchise Dark Stores ➔ Customer Deliveries
                    </p>
                  </div>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg font-mono">
                    Updated 2s ago
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                  {/* Step 1: Farmer App */}
                  <div className="bg-slate-900/90 border border-emerald-900/40 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-emerald-400 font-bold mb-1">
                        <span>1. Farmer App</span>
                        <span className="text-[10px] bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                          Origin
                        </span>
                      </div>
                      <div className="text-lg font-bold text-white mt-1">148 Active Farms</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Kanchipuram & Chengalpattu belt</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-emerald-300">
                      ✓ 18.6 Tons Harvested Today
                    </div>
                  </div>

                  {/* Step 2: Transit Cold Logistics */}
                  <div className="bg-slate-900/90 border border-blue-900/40 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-blue-400 font-bold mb-1">
                        <span>2. Reefer Logistics</span>
                        <span className="text-[10px] bg-blue-950 px-1.5 py-0.5 rounded border border-blue-800">
                          In-Transit
                        </span>
                      </div>
                      <div className="text-lg font-bold text-white mt-1">18 Cold Vans</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">GPS Tracked · Temp 4.0°C</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-blue-300">
                      ✓ 4.8 Tons Enroute to Hubs
                    </div>
                  </div>

                  {/* Step 3: Franchise Hubs */}
                  <div className="bg-slate-900/90 border border-teal-900/40 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-teal-400 font-bold mb-1">
                        <span>3. Franchise Hubs</span>
                        <span className="text-[10px] bg-teal-950 px-1.5 py-0.5 rounded border border-teal-800">
                          Cold Stores
                        </span>
                      </div>
                      <div className="text-lg font-bold text-white mt-1">14 Dark Stores</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">QC Inwarding & Sorting</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-teal-300">
                      ✓ 99.2% Fill Rate (2,180 kg/hub)
                    </div>
                  </div>

                  {/* Step 4: Customer App Deliveries */}
                  <div className="bg-slate-900/90 border border-purple-900/40 rounded-xl p-3.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-purple-400 font-bold mb-1">
                        <span>4. Customer Deliveries</span>
                        <span className="text-[10px] bg-purple-950 px-1.5 py-0.5 rounded border border-purple-800">
                          Last-Mile
                        </span>
                      </div>
                      <div className="text-lg font-bold text-white mt-1">1,842 Orders</div>
                      <p className="text-[11px] text-slate-400 mt-0.5">Morning & Evening slots</p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-800 text-[11px] text-purple-300">
                      ✓ Avg Delivery Time: 24 mins
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Audit Log & System Alerts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" /> Live Cross-Application Activity Stream
                  </h3>

                  <div className="space-y-2.5">
                    {systemLogs.map((log) => (
                      <div
                        key={log.id}
                        className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 flex items-start justify-between text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                              {log.sourceApp}
                            </span>
                            <span className="font-bold text-white">{log.action}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{log.timestamp}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1">{log.details}</p>
                        </div>

                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                            log.severity === 'warning'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}
                        >
                          {log.severity.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Operations Fast Actions Panel */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-teal-400" /> Master Overrides
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      <button
                        onClick={() => showNotification('Emergency Reefer Van dispatched to Kanchipuram farm!')}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-white">Dispatch Cold Truck #09</div>
                          <div className="text-[10px] text-slate-400">Route: Chengalpattu ➔ Velachery Hub</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => showNotification('Bulk instant DBT approved for 12 awaiting farmer lots!')}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-emerald-400">Release Farmer Batch Payouts</div>
                          <div className="text-[10px] text-slate-400">Total: ₹1,54,200 via RBI NEFT</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <button
                        onClick={() => showNotification('Velachery Hub capacity increased for Evening Slot!')}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between transition-colors"
                      >
                        <div>
                          <div className="font-semibold text-amber-400">Expand Delivery Slot Cap</div>
                          <div className="text-[10px] text-slate-400">+150 orders for Evening Slot</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400">
                    Doors Fresh Central Admin Version 4.2 · Real-Time Orchestration
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FARMER NETWORK & HARVEST BATCHES */}
          {activeTab === 'farmers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Tractor className="w-4 h-4 text-emerald-400" /> Farmer Network & Harvest Intake
                  </h2>
                  <p className="text-xs text-slate-400">Verify farmer KYC, onboard new partners, approve harvest lots, and schedule cold pickups</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg">
                    {farmers.length} Contracted Organic Farmers
                  </span>
                  <button
                    onClick={() => setShowAddFarmerModal(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> + Onboard New Farmer
                  </button>
                </div>
              </div>

              {/* Contracted Farmers Roster Grid */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-emerald-400" /> Active Contracted Farmers ({farmers.length})
                  </h3>
                  <span className="text-[11px] text-slate-400">100% Direct DBT Linked</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {farmers.map((f) => (
                    <div
                      key={f.id}
                      className="bg-slate-900 border border-slate-800 hover:border-emerald-600/60 rounded-xl p-3.5 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-700/30 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center text-xs">
                              {f.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white text-xs">{f.name}</span>
                                {f.kycVerified && (
                                  <span title="KYC Verified">
                                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] font-mono text-emerald-400">{f.id}</div>
                            </div>
                          </div>
                          <span className="text-[10px] bg-slate-800 text-amber-300 font-bold px-1.5 py-0.5 rounded">
                            ★ {f.rating}
                          </span>
                        </div>

                        <div className="mt-2.5 space-y-1 text-[11px] text-slate-300">
                          <div className="flex items-center gap-1.5 text-slate-400 truncate">
                            <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                            <span className="truncate">{f.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                            <span>{f.phone}</span>
                          </div>
                          <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-800/80">
                            <span>Land: <strong className="text-white">{f.farmSizeAcres} Acres</strong></span>
                            <span>Sold: <strong className="text-emerald-400">{f.totalTonnageSold} T</strong></span>
                          </div>
                        </div>

                        {/* Crops Pills */}
                        <div className="flex flex-wrap gap-1 mt-2">
                          {f.primaryCrops.slice(0, 3).map((crop, idx) => (
                            <span
                              key={idx}
                              className="text-[9px] bg-slate-950 text-slate-300 px-1.5 py-0.5 rounded border border-slate-800"
                            >
                              {crop}
                            </span>
                          ))}
                          {f.primaryCrops.length > 3 && (
                            <span className="text-[9px] text-slate-500">
                              +{f.primaryCrops.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* DBT Banking Badge */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-400 font-mono">A/c •••• {f.bankAccountLast4}</span>
                        <span className="text-emerald-400 font-mono">{f.upiId}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Batches Awaiting Admin Approval */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                  Harvest Batches Requiring Central Dispatch Clearance
                </h3>

                <div className="space-y-3">
                  {farmerBatches.map((batch) => (
                    <div
                      key={batch.id}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-400">{batch.id}</span>
                          <span className="font-bold text-white">{batch.cropName}</span>
                          <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                            {batch.grade}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Yield: {batch.quantityKg} kg · Harvest: {batch.expectedHarvestDate} · Destination: {batch.hubDestination}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="font-bold text-emerald-400">₹{batch.offeredPricePerKg}/kg</div>
                          <div className="text-[10px] text-slate-400">
                            Total: ₹{(batch.quantityKg * batch.offeredPricePerKg).toLocaleString()}
                          </div>
                        </div>

                        {batch.status === 'pending_approval' ? (
                          <button
                            onClick={() => {
                              onApproveFarmerBatch(batch.id);
                              showNotification(`Batch ${batch.id} approved! Cold Reefer van dispatched.`);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve & Dispatch Reefer
                          </button>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2.5 py-1 rounded-lg">
                            {batch.status.replace(/_/g, ' ').toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FRANCHISE HUBS */}
          {activeTab === 'franchises' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">Franchise Hub Network & Cold-Chain Stores</h2>
                  <p className="text-xs text-slate-400">Monitor dark store cold rooms, stock fill rates, and delivery SLAs</p>
                </div>
                <span className="text-xs font-semibold bg-teal-950 text-teal-300 border border-teal-800 px-2.5 py-1 rounded-lg">
                  14 Hubs Operational in Greater Chennai
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {franchiseHubs.map((hub) => (
                  <div
                    key={hub.id}
                    className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{hub.name}</span>
                          <span className="text-[10px] font-mono text-teal-400 bg-teal-950 px-1.5 py-0.5 rounded border border-teal-800">
                            {hub.code}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">Manager: {hub.managerName} · {hub.contactNumber}</p>
                      </div>

                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <Thermometer className="w-3.5 h-3.5" /> {hub.coldRoomTempCelsius}°C
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Stock In Hand</span>
                        <span className="font-bold text-white">{hub.currentStockKg} / {hub.dailyCapacityKg} kg</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Active EV Riders</span>
                        <span className="font-bold text-white">{hub.activeRidersCount} Riders</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Turnaround SLA</span>
                        <span className="font-bold text-emerald-400">{hub.avgDeliveryTimeMinutes} mins</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">Central Order Logistics & Fulfillment</h2>
                  <p className="text-xs text-slate-400">Live stream of customer orders dispatched across micro-hubs</p>
                </div>
                <span className="text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800 px-2.5 py-1 rounded-lg">
                  {orders.length} Active Dispatches
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-400">{order.id}</span>
                        <span className="font-bold text-white">{order.customerName}</span>
                        {order.isExpress && (
                          <span className="text-[9px] bg-rose-950 text-rose-300 font-bold px-1.5 py-0.2 rounded border border-rose-800">
                            Express 30m
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        📍 {order.addressArea} · {order.itemsCount} items ({order.totalWeightKg} kg)
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-semibold text-slate-300">{order.riderName}</span>
                        <div className="text-[10px] text-teal-400">
                          {order.status === 'out_for_delivery'
                            ? `ETA ${order.etaMinutes}m`
                            : order.status.replace(/_/g, ' ')}
                        </div>
                      </div>

                      <button
                        onClick={() => showNotification(`Customer Order ${order.id} re-routed to priority queue!`)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-2.5 py-1 rounded-lg border border-slate-700"
                      >
                        Override Route
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: MASTER PRICING ENGINE */}
          {activeTab === 'pricing' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">Dynamic Pricing & Margin Engine</h2>
                  <p className="text-xs text-slate-400">
                    Real-time cross-app control: set Consumer Retail Price, Farmer Guaranteed Rate, and Franchise Margin
                  </p>
                </div>
                <span className="text-xs font-semibold bg-yellow-950 text-yellow-300 border border-yellow-800 px-2.5 py-1 rounded-lg">
                  Automated Spread Optimizer
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-2.5">Produce Item</th>
                      <th>Consumer Retail Price (Customer App)</th>
                      <th>Guaranteed Farmgate Rate (Farmer App)</th>
                      <th>Mandi APMC Benchmark</th>
                      <th>Farmer Premium</th>
                      <th>Franchise Margin</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {products.slice(0, 6).map((product) => {
                      const mandiItem = mandiRates.find((m) =>
                        product.name.toLowerCase().includes(m.cropName.toLowerCase().split(' ')[0])
                      ) || mandiRates[0];
                      const farmerRate = mandiItem.doorsFreshRate;
                      const spread = product.price - farmerRate;

                      return (
                        <tr key={product.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-3 font-bold text-white">{product.name}</td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-white text-sm">₹{product.price}</span>
                              <span className="text-[10px] text-slate-400">/{product.unit}</span>
                            </div>
                          </td>
                          <td className="font-bold text-emerald-400">₹{farmerRate} / kg</td>
                          <td className="text-slate-400">₹{mandiItem.mandiApmcRate} / kg</td>
                          <td>
                            <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded font-bold">
                              +₹{farmerRate - mandiItem.mandiApmcRate}/kg (+{mandiItem.changePercent}%)
                            </span>
                          </td>
                          <td className="font-semibold text-teal-400">₹3.50/kg + 8%</td>
                          <td className="text-right">
                            <button
                              onClick={() => {
                                onUpdateProductPrice(product.id, product.price + 2);
                                showNotification(`Retail price updated for ${product.name}! Propagated to Customer App.`);
                              }}
                              className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-semibold px-2.5 py-1 rounded-lg transition-colors"
                            >
                              Adjust +₹2
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: FINANCIAL SETTLEMENTS */}
          {activeTab === 'finances' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">Direct Financial Settlements & RBI Banking</h2>
                  <p className="text-xs text-slate-400">
                    Direct Benefit Transfer (DBT) to farmers and weekly franchise margin clearing
                  </p>
                </div>
                <span className="text-xs font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg">
                  Nodal Escrow Active
                </span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Pending Farmer Direct Benefit Transfers (DBT)
                  </h3>
                  <button
                    onClick={() => showNotification('All pending farmer payouts processed via RBI NEFT batch!')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs transition-colors flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Release All Awaiting Batches
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Thiru Selvam K. (Kanchipuram)</div>
                      <div className="text-[11px] text-slate-400">
                        Batch #BATCH-8821 · 454 kg Roma Tomato @ ₹28/kg + Quality Bonus
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-emerald-400 text-sm">₹13,012</div>
                        <div className="text-[10px] text-slate-400">A/c •••• 4821</div>
                      </div>
                      <button
                        onClick={() => {
                          onReleaseFarmerPayout('BATCH-8821');
                          showNotification('₹13,012 instant IMPS released to Thiru Selvam!');
                        }}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Release IMPS
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-white">Lakshmi Narayanan (Chengalpattu)</div>
                      <div className="text-[11px] text-slate-400">
                        Batch #BATCH-8819 · 178 kg Palak & Greens @ ₹22/kg
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="font-bold text-emerald-400 text-sm">₹3,916</div>
                        <div className="text-[10px] text-slate-400">A/c •••• 1928</div>
                      </div>
                      <button
                        onClick={() => {
                          showNotification('₹3,916 instant IMPS released to Lakshmi Narayanan!');
                        }}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Release IMPS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: B2B HORECA & WHOLESALE SUPPLY */}
          {activeTab === 'b2b_horeca' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-400" /> B2B HORECA & Wholesale Institutional Desk
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    How Hotels, Restaurants, Hostels & Retail Shops connect for farmgate crate supply, 15-day credit & morning Reefer drops
                  </p>
                </div>
                {onSwitchAppView && (
                  <button
                    onClick={() => onSwitchAppView('b2b')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm self-start cursor-pointer"
                  >
                    <Building2 className="w-4 h-4" /> Open B2B Supply Portal Live
                  </button>
                )}
              </div>

              {/* B2B Telemetry KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Commercial Buyers</span>
                  <div className="text-xl font-black text-white mt-1">4 Enrolled</div>
                  <div className="text-[11px] text-indigo-400 mt-0.5 flex items-center gap-1">
                    Hotels · Restos · Hostels · Shops
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Daily B2B Tonnage</span>
                  <div className="text-xl font-black text-cyan-300 mt-1">2.48 Tons</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">Direct farmgate-to-kitchen</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Credit Exposure</span>
                  <div className="text-xl font-black text-amber-300 mt-1">₹3.04L / ₹9.25L</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">32.8% credit utilization</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Morning Delivery SLA</span>
                  <div className="text-xl font-black text-emerald-400 mt-1">100% On-Time</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Dispatched before 05:30 AM</div>
                </div>
              </div>

              {/* Client Roster Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Connected Commercial Accounts (Hotels, Hostels, Restaurants & Shops)
                  </h3>
                  <button
                    onClick={() => showNotification('Synchronized B2B Reefer dispatch routes for tomorrow!')}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Sync Morning Manifest
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: 'The Grand Chola Banquet & Luxury Kitchens',
                      category: '5-Star Hotel',
                      contact: 'Executive Chef Vikramaditya',
                      tonnage: '450 kg/day',
                      credit: '₹68.4k used of ₹250k (15d)',
                      hub: 'Chennai Central Hub',
                      slot: '04:30 AM',
                    },
                    {
                      name: 'Anjappar Chettinad Restaurant (OMR Corridor)',
                      category: 'Restaurant & Cloud Kitchen',
                      contact: 'Chef Saravanan',
                      tonnage: '280 kg/day',
                      credit: '₹32.6k used of ₹100k (7d)',
                      hub: 'Velachery Hub',
                      slot: '05:00 AM',
                    },
                    {
                      name: 'SRM Institute Mega Hostel Dining & Mess',
                      category: 'University Hostel Mess',
                      contact: 'Dr. Narayanan (Warden)',
                      tonnage: '1,400 kg/day',
                      credit: '₹184.5k used of ₹500k (30d)',
                      hub: 'Tambaram Hub',
                      slot: '04:00 AM',
                    },
                    {
                      name: 'Kannan Fresh Produce & Organic Mart',
                      category: 'Retail Vegetable Shop',
                      contact: 'Kannan Velu (Owner)',
                      tonnage: '350 kg/day',
                      credit: '₹18.2k used of ₹75k (7d)',
                      hub: 'Velachery Hub',
                      slot: '05:30 AM',
                    },
                  ].map((client, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{client.name}</span>
                          <span className="text-[10px] px-2 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                            {client.category}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          Contact: {client.contact} · Assigned Hub: {client.hub}
                        </div>
                        <div className="text-slate-400 text-[11px] font-mono">
                          Daily Volume: <strong className="text-emerald-400">{client.tonnage}</strong> · Morning Slot: <strong className="text-cyan-300">{client.slot}</strong>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-indigo-300 font-bold font-mono">{client.credit}</div>
                          <div className="text-[10px] text-emerald-400">GST Invoice Verified</div>
                        </div>
                        <button
                          onClick={() => showNotification(`Opened account review for ${client.name}`)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold cursor-pointer"
                        >
                          Manage Credit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB: DELIVERY FLEET & COLD-CHAIN OVERSIGHT */}
          {activeTab === 'delivery_fleet' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Bike className="w-5 h-5 text-emerald-400" /> Delivery Fleet & Cold-Chain Logistics Hub
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time Ather/Ola EV telemetry, IoT insulated box temperatures, route drops & returnable crate tracking
                  </p>
                </div>
                {onSwitchAppView && (
                  <button
                    onClick={() => onSwitchAppView('delivery')}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors shadow-sm self-start"
                  >
                    <Bike className="w-4 h-4" /> Open Rider App Live
                  </button>
                )}
              </div>

              {/* Fleet Telemetry KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Riders</span>
                  <div className="text-xl font-black text-white mt-1">28 On-Duty</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Zero-Emission EV
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cold-Chain Bag SLA</span>
                  <div className="text-xl font-black text-cyan-300 mt-1">5.1°C Avg</div>
                  <div className="text-[11px] text-cyan-400 mt-0.5">99.4% within 4-8°C optimal range</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Avg Delivery Speed</span>
                  <div className="text-xl font-black text-amber-300 mt-1">18.4 Mins</div>
                  <div className="text-[11px] text-amber-400 mt-0.5">Micro-hub proximity advantage</div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Crates Recycled</span>
                  <div className="text-xl font-black text-emerald-400 mt-1">142 Crates</div>
                  <div className="text-[11px] text-emerald-400 mt-0.5">₹2,840 customer credits awarded</div>
                </div>
              </div>

              {/* Live Fleet Roster Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Bike className="w-4 h-4 text-emerald-400" /> On-Duty Delivery Partners (Velachery & Central Hubs)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Simulated GPS Live</span>
                </div>

                <div className="space-y-3">
                  {/* Rider 1: Active Rider Vijay Raghavan */}
                  <div className="bg-slate-900 border border-emerald-900/40 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 font-bold flex items-center justify-center text-lg">
                        {deliveryProfile?.avatarText || 'VR'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{deliveryProfile?.name || 'Vijay Raghavan'}</span>
                          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded">
                            {deliveryProfile?.id || 'DRV-CHN-0842'}
                          </span>
                          <span className="text-[10px] font-bold text-amber-300">★ {deliveryProfile?.rating || 4.96}</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                          <span>{deliveryProfile?.vehicleModel || 'Ather 450X EV'} ({deliveryProfile?.vehiclePlate || 'TN-07-EA-4921'})</span>
                          <span>·</span>
                          <span className="text-emerald-400 font-semibold">{deliveryProfile?.batteryPercent || 78}% Battery ({deliveryProfile?.rangeKmRemaining || 68} km)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Thermal Box Sensor</span>
                        <span className="font-bold text-cyan-300 font-mono">{deliveryProfile?.coldBagTempCelsius || 5.2}°C (Compliant)</span>
                      </div>
                      <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Active Destination</span>
                        <span className="font-bold text-white">Ananya S. (Velachery)</span>
                      </div>
                      <span className="text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-xl">
                        IN TRANSIT (ETA 12m)
                      </span>
                    </div>
                  </div>

                  {/* Rider 2 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-teal-600/20 border border-teal-500/40 text-teal-400 font-bold flex items-center justify-center text-lg">
                        KR
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">Karthik Raja</span>
                          <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                            DRV-CHN-0843
                          </span>
                          <span className="text-[10px] font-bold text-amber-300">★ 4.91</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                          <span>Ola S1 Pro (TN-09-CB-1102)</span>
                          <span>·</span>
                          <span className="text-emerald-400 font-semibold">92% Battery (98 km)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Thermal Box Sensor</span>
                        <span className="font-bold text-cyan-300 font-mono">4.8°C (Optimal)</span>
                      </div>
                      <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Assigned Order</span>
                        <span className="font-bold text-white">Kishore Kumar (Express 30m)</span>
                      </div>
                      <span className="text-xs font-bold bg-teal-950 text-teal-300 border border-teal-800 px-3 py-1.5 rounded-xl">
                        PICKED FROM HUB
                      </span>
                    </div>
                  </div>

                  {/* Rider 3 */}
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 text-slate-300 font-bold flex items-center justify-center text-lg">
                        SK
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">Suresh Kumar</span>
                          <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                            DRV-CHN-0844
                          </span>
                          <span className="text-[10px] font-bold text-amber-300">★ 4.88</span>
                        </div>
                        <div className="text-xs text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
                          <span>TVS iQube (TN-11-FA-8819)</span>
                          <span>·</span>
                          <span className="text-emerald-400 font-semibold">65% Battery (52 km)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Thermal Box Sensor</span>
                        <span className="font-bold text-cyan-300 font-mono">5.0°C (Calibrated)</span>
                      </div>
                      <div className="bg-slate-950 px-3 py-2 rounded-xl border border-slate-800">
                        <span className="text-[10px] text-slate-400 block font-medium">Staging Status</span>
                        <span className="font-bold text-emerald-400">Micro-Hub Dock 2 Standby</span>
                      </div>
                      <button
                        onClick={() => showNotification('Dispatched automated batch routing alert to Suresh Kumar!')}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl transition-colors font-semibold"
                      >
                        Assign Priority Drop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SUBSCRIPTION MANAGEMENT */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" /> Subscription Management & Recurring Deliveries
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Daily morning farm-fresh milk, organic greens & weekly veggie baskets with holiday pause controls
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-purple-950 text-purple-300 border border-purple-800 px-3 py-1.5 rounded-xl font-bold">
                    MRR: ₹9,94,000 / month
                  </span>
                </div>
              </div>

              {/* Subscription Plans Roster */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 border border-purple-900/40 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Morning Daily Box</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      840 Active
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Pure A2 Cow Milk & Spinach</h4>
                  <p className="text-xs text-slate-400 mt-1">Daily 6:00 AM Sunrise Drop. Chilled thermal crate with 100% glass bottles.</p>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs">
                    <span className="text-slate-400">Churn Rate: 1.2%</span>
                    <span className="font-bold text-white">₹1,850/mo</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Bi-Weekly Box</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      420 Active
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Organic Kitchen Staples Basket</h4>
                  <p className="text-xs text-slate-400 mt-1">Wednesday & Saturday 8:00 AM delivery. 8 kg sorted Grade A vegetables.</p>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs">
                    <span className="text-slate-400">Churn Rate: 0.9%</span>
                    <span className="font-bold text-white">₹2,400/mo</span>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Wellness Box</span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      160 Active
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">Detox Fruit & Citrus Box</h4>
                  <p className="text-xs text-slate-400 mt-1">Every Monday & Thursday. Fresh papaya, pomegranate, oranges & tender coconut.</p>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between text-xs">
                    <span className="text-slate-400">Churn Rate: 1.8%</span>
                    <span className="font-bold text-white">₹3,100/mo</span>
                  </div>
                </div>
              </div>

              {/* Subscribers List Table */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Active Subscriptions Queue & Dispatch Schedules
                  </h3>
                  <button
                    onClick={() => showNotification('Dispatched morning milk & vegetable route manifest to dispatch hubs!')}
                    className="text-xs bg-purple-700 hover:bg-purple-600 text-white font-bold px-3 py-1.5 rounded-xl transition-colors"
                  >
                    Sync Tomorrow Manifest
                  </button>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-white">Ananya Sundaram (Velachery, Chennai)</div>
                      <div className="text-slate-400 text-[11px]">
                        Plan: Morning Farm Fresh Milk & Palak · 7 Days / Week · Door 8, Bhuvaneshwari Nagar
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                        ACTIVE · Next: Tomorrow 06:15 AM
                      </span>
                      <button
                        onClick={() => showNotification('Applied 3-day holiday pause for Ananya Sundaram')}
                        className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                      >
                        Pause
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-white">Karthikeyan Venkat (Adyar, Chennai)</div>
                      <div className="text-slate-400 text-[11px]">
                        Plan: Organic Kitchen Staples (Wed & Sat) · Gandhi Nagar 2nd Main Rd
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-400 font-bold bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800">
                        ACTIVE · Next: Wednesday 08:00 AM
                      </span>
                      <button
                        onClick={() => showNotification('Applied holiday pause for Karthikeyan')}
                        className="text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                      >
                        Pause
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-white">Dr. Priya Raman (Besant Nagar)</div>
                      <div className="text-slate-400 text-[11px]">
                        Plan: Detox Fruit & Citrus Box · 4th Seaward Road
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-amber-400 font-bold bg-amber-950 px-2.5 py-1 rounded-lg border border-amber-800">
                        PAUSED (Resumes Nov 5)
                      </span>
                      <button
                        onClick={() => showNotification('Resumed subscription for Dr. Priya Raman')}
                        className="text-emerald-400 hover:text-emerald-300 px-2 py-1 rounded bg-slate-800 font-bold"
                      >
                        Resume
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PROMOTIONS & CUSTOMER SUPPORT */}
          {activeTab === 'promotions_support' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <Headphones className="w-5 h-5 text-rose-400" /> Promotions & Customer Support Desk
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Coupon vouchers, customer disputes, returnable crate credit adjustments & live resolution
                  </p>
                </div>
              </div>

              {/* Top Promo Coupons Section */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-400" /> Active Marketing Promotions & Coupons
                  </h3>
                  <button
                    onClick={() => showNotification('New promotional coupon code generated!')}
                    className="text-xs bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl transition-colors"
                  >
                    + Create Promo Code
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <div className="bg-slate-900 border border-emerald-900/50 rounded-xl p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-emerald-400 text-base">FRESH50</span>
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800 font-bold">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">50% off on first organic order up to ₹150</p>
                    <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                      <span>Redeemed: 342 times</span>
                      <span className="text-emerald-400 font-bold">₹24,100 GMV</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-teal-400 text-base">HARVEST100</span>
                      <span className="text-[10px] bg-teal-950 text-teal-300 px-2 py-0.5 rounded border border-teal-800 font-bold">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">Flat ₹100 off on fresh harvest orders above ₹500</p>
                    <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                      <span>Redeemed: 128 times</span>
                      <span className="text-teal-400 font-bold">₹64,000 GMV</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-amber-400 text-base">CRATERETURN20</span>
                      <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800 font-bold">
                        AUTO-CREDIT
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">₹20 wallet cashback when returning breathable crate to rider</p>
                    <div className="mt-3 pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
                      <span>Recycled: 142 crates</span>
                      <span className="text-amber-400 font-bold">100% Zero-Plastic</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Support Tickets Desk */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-rose-400" /> Customer Support Disputes & Escalations
                  </h3>
                  <span className="text-xs text-slate-400">Average First Response: 2.4 Mins</span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-slate-900 rounded-xl border border-rose-900/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-rose-400 font-bold text-xs">#TKT-4891</span>
                        <span className="font-bold text-white">Meera Sundar (Adyar)</span>
                        <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-bold">
                          OPEN DISPUTE
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        "One bunch of palak greens was slightly wilted during noon slot transit."
                      </p>
                      <div className="text-[11px] text-slate-400">Order: ORD-9901 · Rider: Vijay Raghavan · Cold Bag: 5.2°C</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => showNotification('₹35 instant refund issued to Meera Sundar wallet!')}
                        className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Refund ₹35 Item
                      </button>
                      <button
                        onClick={() => showNotification('Replacement greens scheduled for 6 AM sunrise batch')}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700"
                      >
                        Send Replacement
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold text-xs">#TKT-4889</span>
                        <span className="font-bold text-white">Karthikeyan (Velachery)</span>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold">
                          RESOLVED
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs">
                        "Requested delivery slot adjustment from 6 PM to 7:30 PM due to office commute."
                      </p>
                      <div className="text-[11px] text-slate-400">Order: ORD-9902 · Route updated by Velachery Dispatcher</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[11px] text-slate-400 font-mono">Resolved in 1.8 mins · CSAT: 5/5 ★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Farmer Registration Modal */}
      <NewFarmerRegistrationModal
        isOpen={showAddFarmerModal}
        onClose={() => setShowAddFarmerModal(false)}
        onRegisterFarmer={(newFarmer) => {
          onAddNewFarmer?.(newFarmer);
          showNotification(`🌾 ${newFarmer.name} successfully registered & verified into Doors Fresh!`);
        }}
      />
    </div>
  );
};
