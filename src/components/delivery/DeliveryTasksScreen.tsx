import React, { useState } from 'react';
import {
  Package,
  MapPin,
  Clock,
  Phone,
  Navigation,
  CheckCircle2,
  AlertCircle,
  QrCode,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Coins,
  Warehouse,
  Thermometer,
  ShieldCheck,
  CheckSquare,
  Square,
  X,
  MessageCircle,
} from 'lucide-react';
import { DeliveryScreenType, DeliveryTask } from '../../types';

interface DeliveryTasksScreenProps {
  tasks: DeliveryTask[];
  onSelectTask: (task: DeliveryTask) => void;
  onUpdateTaskStatus: (taskId: string, status: DeliveryTask['status']) => void;
  onNavigate: (screen: DeliveryScreenType) => void;
  onRejectTask?: (taskId: string, reason: string) => void;
}

export const DeliveryTasksScreen: React.FC<DeliveryTasksScreenProps> = ({
  tasks,
  onSelectTask,
  onUpdateTaskStatus,
  onNavigate,
  onRejectTask,
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [expandedTaskId, setExpandedTaskId] = useState<string>(tasks[0]?.id || '');
  
  // Pickup item verification state: mapping taskId -> Set of verified item indices
  const [verifiedItemsMap, setVerifiedItemsMap] = useState<Record<string, number[]>>({
    [tasks[0]?.id || '']: [0, 1], // default partially verified for demo
  });

  // Call / WhatsApp simulator toast
  const [simulatedActionMessage, setSimulatedActionMessage] = useState<string | null>(null);

  const filteredTasks = tasks.filter((t) => {
    if (activeTab === 'active') return t.status !== 'delivered';
    return t.status === 'delivered';
  });

  const toggleItemVerified = (taskId: string, index: number) => {
    setVerifiedItemsMap((prev) => {
      const current = prev[taskId] || [];
      const updated = current.includes(index)
        ? current.filter((i) => i !== index)
        : [...current, index];
      return { ...prev, [taskId]: updated };
    });
  };

  const verifyAllItemsForTask = (task: DeliveryTask) => {
    const allIndices = task.items.map((_, i) => i);
    setVerifiedItemsMap((prev) => ({
      ...prev,
      [task.id]: allIndices,
    }));
  };

  const handleStartTrip = (task: DeliveryTask) => {
    onUpdateTaskStatus(task.id, 'in_transit');
    onSelectTask({ ...task, status: 'in_transit' });
    onNavigate('delivery_navigation');
  };

  const handlePickupStatusAdvance = (task: DeliveryTask) => {
    if (task.status === 'assigned') {
      onUpdateTaskStatus(task.id, 'accepted');
    } else if (task.status === 'accepted') {
      onUpdateTaskStatus(task.id, 'picked_from_hub');
    } else if (task.status === 'picked_from_hub') {
      handleStartTrip(task);
    }
  };

  const showSimulatedToast = (msg: string) => {
    setSimulatedActionMessage(msg);
    setTimeout(() => setSimulatedActionMessage(null), 3500);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto pb-24 select-none">
      {/* Top Header */}
      <div className="bg-slate-950 px-4 pt-4 pb-4 border-b border-slate-800 shadow-xs shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-base font-bold text-white">Order Dispatch Management</h1>
            <p className="text-xs text-slate-400">Dark store pickup, item verification & customer delivery</p>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2.5 py-1 rounded-lg font-mono font-bold">
            {tasks.filter((t) => t.status !== 'delivered').length} Active
          </span>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-900 p-1 rounded-xl text-xs font-semibold border border-slate-800">
          <button
            onClick={() => setActiveTab('active')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === 'active'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending / In-Transit ({tasks.filter((t) => t.status !== 'delivered').length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer ${
              activeTab === 'completed'
                ? 'bg-emerald-600 text-white font-bold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Delivered Today ({tasks.filter((t) => t.status === 'delivered').length})
          </button>
        </div>
      </div>

      {/* Simulated Call/Message Toast */}
      {simulatedActionMessage && (
        <div className="m-3 p-3 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg animate-in slide-in-from-top-2">
          <Phone className="w-4 h-4 shrink-0" />
          <span>{simulatedActionMessage}</span>
        </div>
      )}

      <div className="p-4 space-y-3.5">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-xs">
            No orders in this queue. Stay online to receive fresh drops!
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isExpanded = expandedTaskId === task.id;
            const verifiedIndices = verifiedItemsMap[task.id] || [];
            const isAllVerified = task.items.length > 0 && verifiedIndices.length >= task.items.length;

            return (
              <div
                key={task.id}
                className={`bg-slate-950 rounded-2xl border transition-all overflow-hidden ${
                  task.status === 'in_transit'
                    ? 'border-emerald-500 shadow-lg ring-1 ring-emerald-500/30'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Task Header Bar */}
                <div
                  onClick={() => setExpandedTaskId(isExpanded ? '' : task.id)}
                  className="p-4 cursor-pointer flex items-start justify-between bg-slate-950 hover:bg-slate-900/60 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">
                        {task.orderId}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          task.status === 'in_transit'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : task.status === 'picked_from_hub'
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                            : task.status === 'accepted'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : task.status === 'assigned'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {task.status.replace(/_/g, ' ').toUpperCase()}
                      </span>
                      {task.isExpress && (
                        <span className="text-[9px] bg-rose-950 text-rose-300 font-bold px-1.5 py-0.2 rounded border border-rose-800">
                          Express 30m
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1.5">{task.customerName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 truncate max-w-[210px]">
                      {task.deliveryAddress}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-black text-emerald-400">₹{task.payoutEarnings}</div>
                    <span className="text-[10px] text-slate-400 font-medium">Payout</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">
                      {task.distanceKm} km • {task.estimatedMinutes}m
                    </span>
                  </div>
                </div>

                {/* Collapsible Order Management Details */}
                {isExpanded && (
                  <div className="p-4 pt-1 space-y-3.5 border-t border-slate-800/80 bg-slate-900/40 text-xs">
                    {/* PICKUP POINT (FRANCHISE DARK STORE) */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-blue-400 flex items-center gap-1">
                          <Warehouse className="w-3.5 h-3.5" /> Pickup Point (Franchise Dark Store)
                        </span>
                        <span className="text-[10px] font-mono text-cyan-300 font-bold bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">
                          Bay Dock 2
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">Velachery Micro-Hub (DF-CHN-VEL)</h4>
                      <p className="text-[11px] text-slate-300">
                        Plot 14, 100 Feet Bypass Rd, Velachery, Chennai
                      </p>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-800 text-[10px] text-slate-400">
                        <span>Hub Manager: Sundar Rajan</span>
                        <button
                          type="button"
                          onClick={() => showSimulatedToast('Calling Velachery Dark Store Hub Manager: +91 94440 22109')}
                          className="text-blue-400 hover:text-blue-300 underline font-semibold cursor-pointer"
                        >
                          Call Hub (+91 94440 22109)
                        </button>
                      </div>
                    </div>

                    {/* CUSTOMER DETAILS & CALL/WHATSAPP */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> Customer Drop Details
                        </span>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {task.paymentMethod}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{task.customerName}</h4>
                      <p className="text-[11px] text-slate-300">{task.deliveryAddress}</p>
                      <p className="text-[10px] text-amber-300">Landmark: {task.landmark}</p>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => showSimulatedToast(`Connecting masked call to ${task.customerName}: ${task.customerPhone}`)}
                          className="py-1.5 px-2 bg-slate-800 hover:bg-slate-750 text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <Phone className="w-3 h-3 text-emerald-400" /> Call Customer
                        </button>
                        <button
                          type="button"
                          onClick={() => showSimulatedToast(`WhatsApp opened with ${task.customerName}: "Hi, Doors Fresh rider is at pickup hub."`)}
                          className="py-1.5 px-2 bg-slate-800 hover:bg-slate-750 text-white rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-400" /> WhatsApp
                        </button>
                      </div>
                    </div>

                    {/* VERIFY PRODUCTS AND QUANTITIES AT PICKUP */}
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Verify Products & Quantities at Pickup</span>
                          </h4>
                          <p className="text-[10px] text-slate-400">
                            Check items before sealing in insulated bag
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => verifyAllItemsForTask(task)}
                          className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 px-2 py-0.5 rounded font-bold cursor-pointer"
                        >
                          Verify All ({task.items.length})
                        </button>
                      </div>

                      <div className="space-y-1.5">
                        {task.items.map((item, idx) => {
                          const checked = verifiedIndices.includes(idx);
                          return (
                            <div
                              key={idx}
                              onClick={() => toggleItemVerified(task.id, idx)}
                              className={`p-2 rounded-lg border flex items-center justify-between cursor-pointer transition-colors ${
                                checked
                                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-300'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {checked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-500 shrink-0" />
                                )}
                                <div>
                                  <span className="font-semibold block text-white text-[11px]">
                                    {item.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    Qty: <strong className="text-white">{item.quantity} {item.unit}</strong>
                                    {item.isColdRefrigerated && ' • Sub-6°C Chilled'}
                                  </span>
                                </div>
                              </div>

                              <span className="text-[10px] font-bold text-slate-400">
                                {checked ? 'Checked' : 'Verify'}
                              </span>
                            </div>
                          );
                        })}

                        {/* Cold-Gel Pack verification */}
                        <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/80 flex items-center justify-between text-cyan-200 text-[10px]">
                          <span className="flex items-center gap-1.5 font-bold">
                            <Thermometer className="w-3.5 h-3.5 text-cyan-400" /> Insulated Box Cold-Chain Seal: 4.8°C
                          </span>
                          <span className="bg-cyan-900 text-cyan-300 px-1.5 py-0.2 rounded font-bold">
                            OK
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* STATUS PROGRESS STEPPER & ACTION BUTTONS */}
                    <div className="pt-1 space-y-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                        <span>Pickup Status:</span>
                        <span className="text-emerald-400 font-bold uppercase">
                          {task.status.replace(/_/g, ' ')}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {task.status === 'assigned' && (
                          <button
                            type="button"
                            onClick={() => handlePickupStatusAdvance(task)}
                            className="py-2.5 px-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Accept Order
                          </button>
                        )}

                        {task.status === 'accepted' && (
                          <button
                            type="button"
                            onClick={() => handlePickupStatusAdvance(task)}
                            className="py-2.5 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <Warehouse className="w-3.5 h-3.5" /> Arrived at Dark Store
                          </button>
                        )}

                        {task.status === 'picked_from_hub' && (
                          <button
                            type="button"
                            onClick={() => handleStartTrip(task)}
                            disabled={!isAllVerified}
                            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                              isAllVerified
                                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            <Navigation className="w-3.5 h-3.5 fill-white" />
                            <span>{isAllVerified ? 'Depart Hub / Start Trip' : 'Verify Items First'}</span>
                          </button>
                        )}

                        {task.status === 'in_transit' && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectTask(task);
                              onNavigate('delivery_navigation');
                            }}
                            className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                          >
                            <Navigation className="w-3.5 h-3.5 fill-white" /> Open Navigation
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            onSelectTask(task);
                            onNavigate('delivery_navigation');
                          }}
                          className="py-2.5 px-3 bg-slate-800 hover:bg-slate-750 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Full Trip View</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
