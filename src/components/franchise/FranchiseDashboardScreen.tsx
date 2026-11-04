import React from 'react';
import {
  Thermometer,
  Droplets,
  PackageCheck,
  Bike,
  AlertCircle,
  TrendingUp,
  Clock,
  ChevronRight,
  ShieldCheck,
  QrCode,
  Sparkles,
  ArrowUpRight,
  Boxes,
} from 'lucide-react';
import {
  FranchiseDispatchOrder,
  FranchiseFinancialSummary,
  FranchiseHub,
  FranchiseInwardBatch,
  FranchiseScreenType,
} from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface FranchiseDashboardScreenProps {
  hub: FranchiseHub;
  inwardBatches: FranchiseInwardBatch[];
  orders: FranchiseDispatchOrder[];
  financials: FranchiseFinancialSummary;
  onNavigate: (screen: FranchiseScreenType) => void;
}

export const FranchiseDashboardScreen: React.FC<FranchiseDashboardScreenProps> = ({
  hub,
  inwardBatches,
  orders,
  financials,
  onNavigate,
}) => {
  const activeOrders = orders.filter((o) => o.status !== 'delivered');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Hub Header */}
      <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 text-white px-4 pt-4 pb-6 rounded-b-3xl shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DoorsFreshLogo size="sm" variant="icon" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                  Franchise Hub Ops
                </span>
                <span className="text-[10px] font-mono bg-teal-700/80 text-teal-100 px-1.5 py-0.5 rounded">
                  {hub.code}
                </span>
              </div>
              <h1 className="text-sm font-bold text-white leading-tight">{hub.name}</h1>
            </div>
          </div>
          <button
            onClick={() => onNavigate('franchise_margins')}
            className="text-right bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded-xl border border-white/15"
          >
            <div className="text-[10px] text-teal-200 uppercase font-medium">Daily Net Margin</div>
            <div className="text-sm font-extrabold text-white">₹{financials.netDailyProfit.toLocaleString()}</div>
          </button>
        </div>

        {/* Cold-Room Telemetry & Capacity Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15">
          <div className="flex items-center justify-between text-xs text-teal-100 mb-2">
            <span className="font-semibold">Cold Room & Hydro-Cooling Telemetry</span>
            <span className="text-emerald-300 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Optimal 4°C
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-teal-200 flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-cyan-300" /> Temperature
              </span>
              <span className="text-xs font-bold text-white">{hub.coldRoomTempCelsius}°C</span>
            </div>
            <div className="flex flex-col items-center border-x border-white/10">
              <span className="text-[10px] text-teal-200 flex items-center gap-1">
                <Droplets className="w-3 h-3 text-teal-300" /> Relative RH
              </span>
              <span className="text-xs font-bold text-white">{hub.humidityPercent}% RH</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-teal-200 flex items-center gap-1">
                <Boxes className="w-3 h-3 text-yellow-300" /> Stock Level
              </span>
              <span className="text-xs font-bold text-white">
                {hub.currentStockKg} / {hub.dailyCapacityKg} kg
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-2 space-y-3.5">
        {/* Hub Fast Action Strip */}
        <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-teal-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Scan Farmgate Inward Crate</div>
              <p className="text-[10px] text-slate-500">Auto-verify Reefer temperature & weight</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('franchise_inventory')}
            className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-2 rounded-xl flex items-center gap-1 shadow-xs active:scale-95 transition-all"
          >
            Inward <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 KPI Matrix */}
        <div className="grid grid-cols-2 gap-3">
          <div
            onClick={() => onNavigate('franchise_dispatch')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-teal-300 transition-colors"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium">B2C Active Orders</span>
              <Bike className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-lg font-bold text-slate-900">{activeOrders.length} in transit</div>
            <div className="text-[10px] text-teal-700 font-medium mt-0.5">
              Avg SLA: {hub.avgDeliveryTimeMinutes} mins
            </div>
          </div>

          <div
            onClick={() => onNavigate('franchise_spoilage')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs cursor-pointer hover:border-teal-300 transition-colors"
          >
            <div className="flex items-center justify-between text-slate-500 mb-1">
              <span className="text-[11px] font-medium">Zero-Waste Index</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-lg font-bold text-emerald-700">99.1% Fresh</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              Spoilage &lt; 0.9%
            </div>
          </div>
        </div>

        {/* Inward Farm Deliveries Queue */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Inward Farm Arrivals ({inwardBatches.length})
              </h3>
              <p className="text-[10px] text-slate-400">Direct harvest Reefer vans arriving at staging docks</p>
            </div>
            <button
              onClick={() => onNavigate('franchise_inventory')}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-0.5"
            >
              Inventory <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {inwardBatches.map((batch) => (
              <div
                key={batch.id}
                className="p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{batch.cropName}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1 rounded">
                      {batch.batchCode}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    From {batch.farmerName} · {batch.dispatchedKg} kg · {batch.arrivalTimestamp}
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      batch.status === 'sorted_stocked'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {batch.status === 'sorted_stocked' ? 'Stocked in 4°C' : 'Arriving (8m)'}
                  </span>
                  <div className="text-[10px] text-teal-700 font-medium mt-0.5">{batch.storageZone}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Customer Dispatch Queue */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Customer Delivery Fleet
              </h3>
              <p className="text-[10px] text-slate-400">{hub.activeRidersCount} active EV riders on Velachery routes</p>
            </div>
            <button
              onClick={() => onNavigate('franchise_dispatch')}
              className="text-xs text-teal-700 hover:text-teal-800 font-semibold flex items-center gap-0.5"
            >
              All Dispatches <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="p-2.5 rounded-xl border border-slate-100 flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-800">{order.customerName}</span>
                    {order.isExpress && (
                      <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                        Express 30m
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {order.addressArea} · {order.totalWeightKg} kg ({order.itemsCount} items)
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-800">{order.riderName}</div>
                  <span className="text-[10px] text-teal-700 font-semibold">
                    {order.status === 'out_for_delivery'
                      ? `ETA ${order.etaMinutes} mins`
                      : order.status === 'packing'
                      ? 'Packing crate'
                      : 'Delivered'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
