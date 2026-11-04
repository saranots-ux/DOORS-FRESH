import React, { useState } from 'react';
import {
  Navigation,
  ArrowLeft,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  QrCode,
  Camera,
  Compass,
  Volume2,
  Lock,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Warehouse,
  X,
  FileText,
  Battery,
  Radio,
  Package,
} from 'lucide-react';
import { DeliveryScreenType, DeliveryTask } from '../../types';

interface DeliveryNavigationScreenProps {
  task: DeliveryTask;
  onCompleteDelivery: (taskId: string) => void;
  onNavigate: (screen: DeliveryScreenType) => void;
  onSwitchToCustomerApp?: () => void;
  onInitiateReturn?: (taskId: string, reason: string) => void;
}

export const DeliveryNavigationScreen: React.FC<DeliveryNavigationScreenProps> = ({
  task,
  onCompleteDelivery,
  onNavigate,
  onSwitchToCustomerApp,
  onInitiateReturn,
}) => {
  const [enteredOtp, setEnteredOtp] = useState('4821');
  const [crateCollected, setCrateCollected] = useState(true);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(task.status === 'delivered');
  const [otpError, setOtpError] = useState(false);

  // Failed delivery & Return to franchise state
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [failedReason, setFailedReason] = useState('Customer phone unreachable after 3 attempts');
  const [returnManifestCreated, setReturnManifestCreated] = useState(false);
  const [returnManifestId, setReturnManifestId] = useState('');

  // Voice directions & Customer contact toast simulation
  const [inAppToast, setInAppToast] = useState<string | null>(null);

  const triggerToast = (text: string) => {
    setInAppToast(text);
    setTimeout(() => setInAppToast(null), 3500);
  };

  const handleFinish = () => {
    if (enteredOtp !== task.deliveryOtp && enteredOtp !== '4821' && enteredOtp !== '1234') {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setIsCompleted(true);
    onCompleteDelivery(task.id);
  };

  const handleConfirmFailedDelivery = () => {
    const returnId = `RET-CHN-${Math.floor(1000 + Math.random() * 9000)}`;
    setReturnManifestId(returnId);
    setReturnManifestCreated(true);
    setShowFailedModal(false);
    if (onInitiateReturn) {
      onInitiateReturn(task.id, failedReason);
    }
    triggerToast(`Return Crate Manifest ${returnId} initiated. Route set to Velachery Dark Store Dock Bay 3.`);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 overflow-y-auto pb-24 select-none">
      {/* Top GPS Navigation Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0 shadow-md">
        <button
          onClick={() => onNavigate('delivery_orders')}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 font-bold cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
          <span className="font-bold text-xs text-white">Google Maps Live Guidance</span>
        </div>

        <button
          onClick={() => triggerToast('Voice Navigation: "In 250 meters, turn left onto 3rd Main Road"')}
          className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-emerald-400 cursor-pointer"
          title="Voice Directions"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* LOCATION SHARING ACTIVE DURING ACTIVE DELIVERIES ONLY BADGE */}
      <div className="bg-emerald-950/90 border-b border-emerald-800/80 px-3 py-1.5 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-[10px] text-emerald-200 truncate flex items-center gap-1">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span>Live Location Sharing Active (Customer & Hub)</span>
          </span>
        </div>
        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-900 px-1.5 py-0.2 rounded border border-emerald-700">
          Encrypted GPS
        </span>
      </div>

      {/* Cross-App Customer Connection Strip */}
      {onSwitchToCustomerApp && (
        <div className="bg-slate-950 px-3 py-1.5 flex items-center justify-between text-xs border-b border-slate-800 shrink-0">
          <span className="text-[10px] text-slate-400 truncate">
            Linked Order: <strong className="text-white">{task.orderId}</strong> ({task.customerName})
          </span>
          <button
            onClick={onSwitchToCustomerApp}
            className="px-2 py-0.5 bg-blue-900/80 hover:bg-blue-800 text-blue-200 rounded-lg text-[9px] font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
            title="Switch to Customer App"
          >
            <span>View Customer Tracking</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Turn instruction Banner */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-800 text-white p-3.5 shadow-md flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white font-bold">
            <Navigation className="w-5 h-5 -rotate-45 fill-white" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">In 250 Meters</div>
            <div className="text-sm font-extrabold text-white">Turn Left onto 3rd Cross Road</div>
            <div className="text-[11px] text-emerald-100">Ram Nagar South, Velachery</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-base font-black text-amber-300">3 mins</div>
          <span className="text-[10px] text-emerald-200">850m remaining</span>
        </div>
      </div>

      {/* Simulated Live Route Map View with Pickup & Customer Locations */}
      <div className="h-44 w-full bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-800 shrink-0">
        {/* Vector Grid & Road Simulation */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Stylized Simulated Route Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 380 180">
          {/* Street Grid background lines */}
          <path d="M 0 50 L 380 50 M 0 110 L 380 110 M 100 0 L 100 180 M 240 0 L 240 180" stroke="#334155" strokeWidth="1" opacity="0.3" fill="none" />
          
          {/* Active GPS Route line */}
          <path
            d="M 50 140 Q 140 130 180 85 T 310 45"
            fill="none"
            stroke="#10b981"
            strokeWidth="6"
            strokeDasharray="8 4"
            className="animate-pulse"
          />
        </svg>

        {/* Pickup Franchise Hub Marker */}
        <div className="absolute left-10 bottom-6 z-10 flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg ring-2 ring-blue-400/40 text-[10px] font-bold">
            <Warehouse className="w-3.5 h-3.5" />
          </div>
          <span className="text-[8px] font-bold bg-slate-900/90 text-blue-300 px-1 rounded mt-0.5 border border-slate-800">
            Hub Bay 2
          </span>
        </div>

        {/* Current Driver Location EV Pin */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg ring-4 ring-emerald-400/30 font-bold">
            🛵
          </div>
          <span className="text-[9px] font-bold bg-slate-900/90 text-emerald-400 px-1.5 rounded mt-0.5 border border-emerald-800 flex items-center gap-1">
            <span>You (28 km/h)</span>
          </span>
        </div>

        {/* Destination Customer Pin */}
        <div className="absolute right-10 top-7 z-10 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg ring-4 ring-rose-400/30">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-bold bg-slate-900/90 text-white px-1.5 rounded mt-0.5 border border-slate-700">
            {task.customerName.split(' ')[0]}
          </span>
        </div>

        {/* Floating Telemetry Badge */}
        <div className="absolute bottom-2 left-3 z-10 bg-slate-900/90 backdrop-blur-xs text-[10px] text-slate-300 px-2 py-0.5 rounded border border-slate-800 flex items-center gap-2">
          <span>GPS Accuracy: 2.1m</span>
          <span>•</span>
          <span className="text-emerald-400 font-mono">12.9815° N, 80.2180° E</span>
        </div>
      </div>

      {/* In-app Toast message */}
      {inAppToast && (
        <div className="m-3 p-3 bg-slate-800 text-white border border-emerald-500 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xl animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{inAppToast}</span>
        </div>
      )}

      {/* RETURN-TO-FRANCHISE MANIFEST ALERT IF INITIATED */}
      {returnManifestCreated && (
        <div className="m-4 p-3.5 bg-amber-950/80 border-2 border-amber-500 rounded-2xl text-white space-y-2 animate-in zoom-in-95">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-amber-400" /> Return to Dark Store Active
            </span>
            <span className="text-[10px] font-mono font-bold bg-amber-900 px-2 py-0.5 rounded border border-amber-700">
              {returnManifestId}
            </span>
          </div>
          <p className="text-xs text-amber-100">
            Delivery marked as failed ({failedReason}). Return intact insulated produce box to <strong>Velachery Micro-Hub Dock Bay 3</strong>.
          </p>
          <div className="pt-1 flex items-center justify-between text-[11px] text-amber-200">
            <span>Seal Status: Sub-6°C Secure</span>
            <button
              onClick={() => onNavigate('delivery_orders')}
              className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold text-xs"
            >
              Return Confirmed
            </button>
          </div>
        </div>
      )}

      <div className="p-4 space-y-3.5">
        {/* Customer Address & Quick Contact Card */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                Customer Delivery Drop
              </span>
              <h3 className="text-sm font-bold text-white mt-0.5">{task.customerName}</h3>
              <p className="text-xs text-slate-300 mt-0.5">{task.deliveryAddress}</p>
              <div className="text-[11px] text-amber-300 mt-1 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-400" />
                <span>Gate Note: Ring bell, leave on front porch stand.</span>
              </div>
            </div>

            <span className="text-xs font-mono font-bold bg-slate-800 text-emerald-400 px-2 py-1 rounded-lg">
              ₹{task.totalAmount} ({task.paymentMethod.includes('Cash') ? 'Collect COD' : 'Prepaid'})
            </span>
          </div>

          {/* Quick Call & Message Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800">
            <button
              onClick={() => triggerToast(`Dialing masked bridge for ${task.customerName}: ${task.customerPhone}`)}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call Customer
            </button>
            <button
              onClick={() => triggerToast(`WhatsApp opened: "Hi ${task.customerName}, your fresh produce order is arriving in 3 mins."`)}
              className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp
            </button>
          </div>
        </div>

        {/* Delivery Drop Verification Form */}
        <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> Delivery Confirmation
            </h4>
            {/* Failed Delivery Action Trigger */}
            <button
              type="button"
              onClick={() => setShowFailedModal(true)}
              className="text-[10px] text-rose-400 hover:text-rose-300 font-bold underline cursor-pointer"
            >
              Unable to Deliver?
            </button>
          </div>

          {/* Crate Collection Checkbox */}
          <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={crateCollected}
              onChange={(e) => setCrateCollected(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-0 bg-slate-800 border-slate-700"
            />
            <div className="text-xs">
              <span className="font-bold text-white block">Returnable Crate Collected</span>
              <span className="text-[10px] text-slate-400">
                1 breathable green crate returned by customer (+₹20 loyalty credit)
              </span>
            </div>
          </label>

          {/* Customer OTP Verification */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-white">Enter Customer Delivery OTP</label>
              <button
                type="button"
                onClick={() => setEnteredOtp(task.deliveryOtp || '4821')}
                className="text-[10px] text-emerald-400 font-mono underline hover:text-emerald-300 cursor-pointer"
              >
                Auto-fill: {task.deliveryOtp || '4821'}
              </button>
            </div>
            <input
              type="text"
              maxLength={4}
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              placeholder="4-digit OTP"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-center text-lg font-mono font-black text-emerald-300 tracking-widest focus:outline-none focus:border-emerald-500"
            />
            {otpError && (
              <span className="text-[10px] text-rose-400 font-bold block mt-1">
                Invalid OTP. Ask customer for 4-digit code from SMS or WhatsApp.
              </span>
            )}
          </div>

          {/* Doorstep Delivery Photo Capture Simulation */}
          <div>
            {photoTaken ? (
              <div className="p-3 bg-emerald-950/70 border border-emerald-700 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold block">Doorstep Proof Photo Captured</span>
                    <span className="text-[10px] text-emerald-300/80">
                      Watermark: 12.9815° N • 09:44 AM • {task.orderId}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPhotoModalOpen(true)}
                  className="text-[10px] underline text-slate-300 hover:text-white cursor-pointer"
                >
                  View / Retake
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setPhotoModalOpen(true)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-dashed border-slate-700 rounded-xl text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
              >
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Take Doorstep Photo (Proof of Delivery)</span>
              </button>
            )}
          </div>

          {/* Complete Delivery Action Button */}
          {isCompleted ? (
            <div className="bg-emerald-600 text-white p-3.5 rounded-xl text-center shadow-lg animate-in zoom-in-95 space-y-2">
              <div className="text-sm font-black flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Order Successfully Delivered!
              </div>
              <p className="text-[11px] text-emerald-100">
                +₹{task.payoutEarnings} credited to your rider wallet · Customer App updated to 'Delivered'
              </p>
              <div className="flex items-center justify-center gap-3 pt-1">
                {onSwitchToCustomerApp && (
                  <button
                    onClick={onSwitchToCustomerApp}
                    className="px-3 py-1.5 bg-slate-900/80 hover:bg-slate-950 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>👀 View Customer App</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('delivery_orders')}
                  className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Next Trip →
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white rounded-xl text-xs font-black shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-wider"
            >
              <CheckCircle2 className="w-4 h-4" /> Verify OTP & Complete Drop (+₹{task.payoutEarnings})
            </button>
          )}
        </div>
      </div>

      {/* CAMERA VIEWFINDER MODAL FOR PROOF OF DELIVERY */}
      {photoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl">
            <div className="p-3 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Doorstep Proof of Delivery</span>
              </span>
              <button
                onClick={() => setPhotoModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulated Camera Viewfinder */}
            <div className="relative h-64 bg-slate-950 flex items-center justify-center overflow-hidden">
              {/* Camera reticle / grid */}
              <div className="absolute inset-4 border border-dashed border-white/30 rounded-2xl pointer-events-none" />
              <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-20 h-20 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 flex items-center justify-center mb-2">
                  <Package className="w-10 h-10 text-emerald-400" />
                </div>
                <span className="text-xs font-bold text-white">Insulated Box at Customer Doorstep</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Plot 12, Green Park Avenue</span>
              </div>

              {/* Watermark Overlay */}
              <div className="absolute bottom-2 left-3 right-3 bg-black/70 backdrop-blur-xs p-2 rounded-xl text-[9px] font-mono text-emerald-300 border border-emerald-500/30 flex justify-between">
                <span>GEO: 12.9815° N, 80.2180° E</span>
                <span>{task.orderId} • TODAY</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPhotoModalOpen(false)}
                className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhotoTaken(true);
                  setPhotoModalOpen(false);
                  triggerToast('Doorstep proof photo captured with GPS timestamp watermark.');
                }}
                className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Camera className="w-4 h-4" /> Snap Photo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FAILED DELIVERY REASON & RETURN-TO-FRANCHISE WORKFLOW MODAL */}
      {showFailedModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
          <div className="bg-slate-900 border border-rose-500/60 rounded-3xl w-full max-w-sm p-4 space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Mark Delivery as Failed</span>
              </h3>
              <button
                onClick={() => setShowFailedModal(false)}
                className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Choose the verified reason. This will trigger the Return-to-Franchise Hub workflow for produce preservation:
            </p>

            <div className="space-y-1.5 text-xs">
              {[
                'Customer phone unreachable after 3 attempts',
                'Premises locked / no security guard access',
                'Incorrect or unlocatable delivery address',
                'Customer requested cancellation / rescheduling',
              ].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                    failedReason === reason
                      ? 'bg-rose-950/60 border-rose-600 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="failedReason"
                    value={reason}
                    checked={failedReason === reason}
                    onChange={(e) => setFailedReason(e.target.value)}
                    className="text-rose-600 focus:ring-0"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-bold text-white flex items-center gap-1">
                <Warehouse className="w-3.5 h-3.5 text-blue-400" />
                <span>Return Destination:</span>
              </div>
              <p>Velachery Micro-Hub Cold Storage Bay Dock 3 (Sub-6°C Cold Room)</p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowFailedModal(false)}
                className="py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold"
              >
                Resume Attempt
              </button>
              <button
                type="button"
                onClick={handleConfirmFailedDelivery}
                className="py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Initiate Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
