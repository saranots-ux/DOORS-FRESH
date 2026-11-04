import React, { useState, useEffect } from 'react';
import {
  Bike,
  Power,
  Thermometer,
  BatteryCharging,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  Navigation,
  PhoneCall,
  AlertTriangle,
  Package,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  Bell,
  X,
  Volume2,
  DollarSign,
  Flame,
} from 'lucide-react';
import { DeliveryPartnerProfile, DeliveryScreenType, DeliveryTask } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';
import { DeliveryNotificationsModal, DeliveryNotification } from './DeliveryNotificationsModal';

interface DeliveryDashboardScreenProps {
  rider: DeliveryPartnerProfile;
  tasks: DeliveryTask[];
  onToggleOnline: () => void;
  onNavigate: (screen: DeliveryScreenType) => void;
  onSelectTask: (task: DeliveryTask) => void;
  onAcceptTask?: (taskId: string) => void;
  onRejectTask?: (taskId: string, reason: string) => void;
}

export const DeliveryDashboardScreen: React.FC<DeliveryDashboardScreenProps> = ({
  rider,
  tasks,
  onToggleOnline,
  onNavigate,
  onSelectTask,
  onAcceptTask,
  onRejectTask,
}) => {
  const activeTask = tasks.find((t) => t.status === 'in_transit' || t.status === 'accepted' || t.status === 'picked_from_hub');
  const pendingAssigned = tasks.find((t) => t.status === 'assigned');
  const completedTasks = tasks.filter((t) => t.status === 'delivered');

  // New incoming request simulation state
  const [incomingRequestTimer, setIncomingRequestTimer] = useState<number>(45);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Low vehicle battery / charging needed');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<DeliveryNotification[]>([
    {
      id: 'N-1',
      type: 'incentive',
      title: '⚡ Fresh Morning Surge Active',
      message: '+₹15 surge per drop active in Velachery & OMR zone until 10:30 AM.',
      time: '5m ago',
      isRead: false,
    },
    {
      id: 'N-2',
      type: 'assignment',
      title: '📦 New Harvest Box Assignment',
      message: 'Order #ORD-8941 assigned from Velachery Micro-Hub Bay 2 to Ram Nagar South.',
      time: '12m ago',
      isRead: false,
      orderId: 'ORD-8941',
      actionLabel: 'View Task',
    },
    {
      id: 'N-3',
      type: 'reminder',
      title: '❄️ Cold-Box Temperature Check',
      message: 'Internal temperature calibrated at 4.8°C. Maintain sealed lock during transit.',
      time: '25m ago',
      isRead: true,
    },
  ]);

  // Request countdown timer when a task is assigned and rider is online
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (rider.isOnline && pendingAssigned && incomingRequestTimer > 0) {
      interval = setInterval(() => {
        setIncomingRequestTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [rider.isOnline, pendingAssigned, incomingRequestTimer]);

  const handleAcceptAssignment = (taskId: string) => {
    if (onAcceptTask) {
      onAcceptTask(taskId);
    }
    const target = tasks.find((t) => t.id === taskId);
    if (target) {
      onSelectTask({ ...target, status: 'accepted' });
      onNavigate('delivery_navigation');
    }
  };

  const handleConfirmReject = () => {
    if (pendingAssigned && onRejectTask) {
      onRejectTask(pendingAssigned.id, rejectReason);
    }
    setShowRejectModal(false);
  };

  const unreadNotifCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto pb-24 select-none">
      {/* Top Rider Header */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white px-4 pt-4 pb-5 border-b border-slate-800 shadow-md shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-bold text-sm shadow-xs">
              {rider.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  {rider.id}
                </span>
                <span className="text-[10px] bg-emerald-900/80 text-emerald-200 border border-emerald-700/60 px-1.5 py-0.2 rounded font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> {rider.rating} ★
                </span>
              </div>
              <h1 className="text-sm font-bold text-white leading-tight mt-0.5">{rider.name}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Notification Bell Button */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[9px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Online/Offline Availability Toggle Button */}
            <button
              onClick={onToggleOnline}
              className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95 ${
                rider.isOnline
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400/40'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              <span>{rider.isOnline ? 'ONLINE' : 'OFFLINE'}</span>
            </button>
          </div>
        </div>

        {/* Offline Notice Banner if Rider is Offline */}
        {!rider.isOnline && (
          <div className="mb-2 p-2.5 bg-amber-950/70 border border-amber-800/80 rounded-xl flex items-center gap-2 text-xs text-amber-200 animate-in fade-in">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="leading-snug">
              <span className="font-bold">You are currently OFFLINE.</span> Tap 'OFFLINE' to go ON DUTY and receive incoming delivery assignments!
            </div>
          </div>
        )}

        {/* Assigned Hub & Insulated Cold Box Telemetry */}
        <div className="bg-slate-950/80 rounded-2xl p-3 border border-slate-800/90 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1 font-semibold text-white">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{rider.assignedHubName}</span>
            </span>
            <span className="font-mono text-[11px] text-emerald-400 font-bold bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
              {rider.assignedHubCode}
            </span>
          </div>

          {/* Cold Bag & EV Telemetry Strip */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
              <Thermometer className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
                  Insulated Cold Box
                </span>
                <span className="text-xs font-bold text-cyan-300">{rider.coldBagTempCelsius}°C (Sub-6°C)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800">
              <BatteryCharging className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-medium">
                  {rider.vehicleModel.split(' ')[0]} EV
                </span>
                <span className="text-xs font-bold text-white">{rider.batteryPercent}% ({rider.rangeKmRemaining} km)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3.5">
        {/* NEW DELIVERY REQUEST CARD (WITH TIMER, ACCEPT & REJECT) */}
        {rider.isOnline && pendingAssigned && (
          <div className="bg-gradient-to-br from-amber-950/90 via-slate-900 to-slate-950 border-2 border-amber-500 rounded-3xl p-4 shadow-xl text-white animate-in zoom-in-95 relative overflow-hidden">
            {/* Progress countdown bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
              <div
                className="h-full bg-amber-400 transition-all duration-1000 ease-linear"
                style={{ width: `${(incomingRequestTimer / 45) * 100}%` }}
              />
            </div>

            <div className="flex items-center justify-between pb-2 mb-2 border-b border-amber-900/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400" /> New Delivery Request!
                </span>
              </div>
              <div className="flex items-center gap-1 bg-amber-950 text-amber-300 border border-amber-700/60 px-2 py-0.5 rounded-full text-xs font-mono font-bold">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{incomingRequestTimer}s</span>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white">{pendingAssigned.customerName}</h3>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate max-w-[200px]">{pendingAssigned.deliveryAddress}</span>
                </p>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                  <span>Distance: <strong className="text-white">{pendingAssigned.distanceKm} km</strong></span>
                  <span>•</span>
                  <span>ETA: <strong className="text-white">{pendingAssigned.estimatedMinutes} mins</strong></span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-emerald-400">₹{pendingAssigned.payoutEarnings}</div>
                <span className="text-[10px] text-slate-400 block font-medium">Guaranteed Pay</span>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
                  {pendingAssigned.items.length} Fresh Items
                </span>
              </div>
            </div>

            {/* Action Buttons: Accept & Reject */}
            <div className="grid grid-cols-2 gap-2.5 mt-3.5 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                className="py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 border border-rose-900/40"
              >
                <X className="w-4 h-4" /> Reject
              </button>

              <button
                type="button"
                onClick={() => handleAcceptAssignment(pendingAssigned.id)}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-xs font-black transition-all cursor-pointer shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-1 uppercase tracking-wider"
              >
                <CheckCircle2 className="w-4 h-4" /> Accept (₹{pendingAssigned.payoutEarnings})
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE DELIVERIES IN-TRANSIT CARD */}
        {activeTask && (
          <div className="bg-gradient-to-br from-emerald-900/90 to-teal-950 border-2 border-emerald-500 rounded-3xl p-4 shadow-lg text-white">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-600 px-2 py-0.5 rounded-full text-white flex items-center gap-1">
                    <Navigation className="w-3 h-3 fill-white" /> Active Delivery
                  </span>
                  {activeTask.isExpress && (
                    <span className="text-[10px] bg-rose-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                      Express 30m
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white mt-1.5">{activeTask.customerName}</h3>
                <p className="text-[11px] text-emerald-200 mt-0.5 leading-snug">
                  {activeTask.deliveryAddress}
                </p>
              </div>

              <div className="text-right">
                <div className="text-base font-extrabold text-emerald-300">₹{activeTask.payoutEarnings}</div>
                <span className="text-[10px] text-slate-300 font-medium">Earning</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-emerald-800/80 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-200">
                <Clock className="w-3.5 h-3.5" />
                <span>ETA: <strong>{activeTask.estimatedMinutes} mins</strong> ({activeTask.distanceKm} km)</span>
              </div>
              <div className="text-right font-mono text-emerald-300 font-bold">
                {activeTask.paymentMethod.includes('Cash') ? 'Collect Cash' : 'Prepaid Online'}
              </div>
            </div>

            <button
              onClick={() => {
                onSelectTask(activeTask);
                onNavigate('delivery_navigation');
              }}
              className="mt-3 w-full py-2.5 bg-white text-slate-950 hover:bg-emerald-50 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Navigation className="w-3.5 h-3.5 fill-slate-950" />
              <span>Resume GPS Turn-by-Turn Navigation</span>
            </button>
          </div>
        )}

        {/* TODAY'S EARNINGS SUMMARY METRIC CARD */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Today's Earnings Summary
              </span>
              <div className="text-2xl font-black text-white mt-0.5">
                ₹{rider.isOnline ? 385 + completedTasks.length * 65 : 385}
              </div>
            </div>

            <button
              onClick={() => onNavigate('delivery_earnings')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800"
            >
              <span>View Breakdown</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
            <div className="bg-slate-900 p-2 rounded-xl">
              <span className="text-[9px] text-slate-400 block font-medium">Completed</span>
              <span className="font-bold text-white text-xs">{completedTasks.length + 6} Drops</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl">
              <span className="text-[9px] text-slate-400 block font-medium">Distance</span>
              <span className="font-bold text-emerald-400 text-xs">28.4 km</span>
            </div>
            <div className="bg-slate-900 p-2 rounded-xl">
              <span className="text-[9px] text-slate-400 block font-medium">Tips</span>
              <span className="font-bold text-amber-300 text-xs">₹60</span>
            </div>
          </div>
        </div>

        {/* QUICK SHORTCUTS GRID */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onNavigate('delivery_orders')}
            className="p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-2">
              <Package className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-blue-300">Order Tasks Queue</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {tasks.filter((t) => t.status !== 'delivered').length} pending dispatch
            </p>
          </button>

          <button
            onClick={() => onNavigate('delivery_earnings')}
            className="p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-850 border border-slate-800 text-left transition-all group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-white group-hover:text-emerald-300">Instant Daily Cashout</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">UPI IMPS nodal payout</p>
          </button>
        </div>

        {/* COMPLETED DELIVERIES TODAY PREVIEW */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <h4 className="font-bold text-white">Recent Completed Deliveries</h4>
            <span className="text-[10px] text-emerald-400 font-semibold">Cold-Chain Compliant</span>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Dr. A. Nithya (ORD-7819)</span>
                  <span className="text-[10px] text-slate-400">Besant Nagar • 1 Crate collected</span>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-300">+₹65</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">K. Ramesh (ORD-7812)</span>
                  <span className="text-[10px] text-slate-400">Adyar • Fresh box verified</span>
                </div>
              </div>
              <span className="font-mono font-bold text-emerald-300">+₹55</span>
            </div>
          </div>
        </div>
      </div>

      {/* REJECT DELIVERY MODAL */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm p-4 space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Reject Delivery Assignment?</span>
              </h3>
              <button
                onClick={() => setShowRejectModal(false)}
                className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Please select reason for rejecting this assignment so hub dispatch can re-assign to another EV rider:
            </p>

            <div className="space-y-1.5 text-xs">
              {[
                'Low vehicle battery / charging needed',
                'Out of my designated delivery cluster',
                'Heavy rain / waterlogged road',
                'Hub packaging delay',
              ].map((r) => (
                <label
                  key={r}
                  className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-colors ${
                    rejectReason === r
                      ? 'bg-rose-950/60 border-rose-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="rejectReason"
                    value={r}
                    checked={rejectReason === r}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="text-rose-600 focus:ring-0"
                  />
                  <span>{r}</span>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={handleConfirmReject}
                className="py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NOTIFICATIONS MODAL */}
      <DeliveryNotificationsModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => {
          setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
        }}
        onActionClick={(notif) => {
          if (notif.orderId) {
            onNavigate('delivery_orders');
          }
        }}
      />
    </div>
  );
};
