import React, { useState } from 'react';
import {
  Bike,
  Package,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { FranchiseDispatchOrder } from '../../types';

interface FranchiseDispatchScreenProps {
  orders: FranchiseDispatchOrder[];
  onDispatchOrder?: (orderId: string) => void;
}

export const FranchiseDispatchScreen: React.FC<FranchiseDispatchScreenProps> = ({
  orders,
  onDispatchOrder,
}) => {
  const [orderList, setOrderList] = useState<FranchiseDispatchOrder[]>(orders);
  const [activeTab, setActiveTab] = useState<'all' | 'queued' | 'out_for_delivery' | 'delivered'>('all');

  const filteredOrders = orderList.filter((o) => {
    if (activeTab === 'all') return true;
    return o.status === activeTab;
  });

  const handleUpdateStatus = (orderId: string, nextStatus: FranchiseDispatchOrder['status']) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus, etaMinutes: nextStatus === 'delivered' ? 0 : 15 } : o))
    );
    if (onDispatchOrder) onDispatchOrder(orderId);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-teal-800 text-white px-4 pt-4 pb-5 rounded-b-2xl shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-base font-bold text-white">Local B2C Dispatch & Rider Fleet</h1>
            <p className="text-xs text-teal-200">Last-Mile Fulfillment & Route Optimization</p>
          </div>
          <span className="text-[10px] bg-teal-600 px-2 py-1 rounded-md font-semibold text-teal-100 border border-teal-500">
            8 EV Riders Active
          </span>
        </div>

        {/* Tab Filters */}
        <div className="flex bg-teal-900/60 p-1 rounded-xl text-xs font-medium mt-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'all' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-200 hover:text-white'
            }`}
          >
            All ({orderList.length})
          </button>
          <button
            onClick={() => setActiveTab('queued')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'queued' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-200 hover:text-white'
            }`}
          >
            Queued
          </button>
          <button
            onClick={() => setActiveTab('out_for_delivery')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'out_for_delivery' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-200 hover:text-white'
            }`}
          >
            Out (Live)
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
              activeTab === 'delivered' ? 'bg-white text-teal-900 font-bold shadow-xs' : 'text-teal-200 hover:text-white'
            }`}
          >
            Delivered
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-teal-300 transition-all"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{order.customerName}</span>
                  {order.isExpress ? (
                    <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                      Express 30m
                    </span>
                  ) : (
                    <span className="text-[9px] bg-slate-100 text-slate-600 font-medium px-1.5 py-0.2 rounded">
                      Scheduled Slot
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  📍 {order.addressArea} · {order.totalWeightKg} kg ({order.itemsCount} items)
                </p>
              </div>

              <div className="text-right">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    order.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : order.status === 'out_for_delivery'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {order.status === 'delivered'
                    ? 'Delivered'
                    : order.status === 'out_for_delivery'
                    ? `ETA ${order.etaMinutes}m`
                    : 'Awaiting Packing'}
                </span>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">{order.id}</div>
              </div>
            </div>

            {/* Rider Info Strip */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-[10px]">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 block text-xs">{order.riderName}</span>
                  <span className="text-[10px] text-slate-400">{order.riderPhone}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-1.5">
                {order.status === 'queued' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}
                    className="bg-teal-700 hover:bg-teal-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    Pack & Dispatch <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {order.status === 'packing' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    Handover to Rider <Bike className="w-3 h-3" />
                  </button>
                )}

                {order.status === 'out_for_delivery' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'delivered')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center gap-1"
                  >
                    Mark Delivered <CheckCircle2 className="w-3 h-3" />
                  </button>
                )}

                {order.status === 'delivered' && (
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded">
                    <CheckCircle2 className="w-3 h-3" /> Customer Verified
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
