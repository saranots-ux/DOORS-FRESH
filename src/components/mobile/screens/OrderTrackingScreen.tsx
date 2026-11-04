import React, { useState } from 'react';
import {
  Check,
  Phone,
  Clock,
  MapPin,
  ChevronRight,
  Package,
  Bike,
  CheckCircle2,
  FileText,
  Star,
  X,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { Order, ScreenType } from '../../../types';

interface OrderTrackingScreenProps {
  order: Order;
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onRateDeliveredProduct?: () => void;
  onSwitchToDeliveryApp?: () => void;
}

export const OrderTrackingScreen: React.FC<OrderTrackingScreenProps> = ({
  order,
  onBack,
  onNavigateScreen,
  onRateDeliveredProduct,
  onSwitchToDeliveryApp,
}) => {
  const [currentStatus, setCurrentStatus] = useState<Order['status']>(order.status);
  const [showCallModal, setShowCallModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);

  // Sync with prop when order updates from delivery app
  React.useEffect(() => {
    setCurrentStatus(order.status);
  }, [order.status]);

  const otpCode = order.deliveryOtp || '4821';

  const handleCopyOtp = () => {
    navigator.clipboard?.writeText(otpCode);
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  const steps = [
    { key: 'placed', label: 'Order Placed', time: '2:15 PM', isDone: true },
    { key: 'packed', label: 'Packed', time: '3:05 PM', isDone: true },
    { key: 'out_for_delivery', label: 'Out for Delivery', time: '3:40 PM', isDone: currentStatus === 'out_for_delivery' || currentStatus === 'delivered' },
    { key: 'delivered', label: 'Delivered', time: '4:00 PM', isDone: currentStatus === 'delivered' },
  ];

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800 relative">
      <MobileHeader
        title="Track Order"
        showBack={true}
        onBack={onBack}
        rightAction="none"
      />

      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Step Progress Tracker matching design board Screen 8 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{
                  width: currentStatus === 'delivered' ? '100%' : '66%',
                }}
              />
            </div>

            {steps.map((step, idx) => (
              <div key={step.key} className="flex flex-col items-center relative z-10">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    step.isDone
                      ? 'bg-emerald-600 text-white shadow-xs ring-4 ring-emerald-50'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {step.isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                </div>
                <span
                  className={`text-[10px] mt-1.5 font-bold tracking-tight text-center max-w-[62px] ${
                    step.isDone ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Delivery OTP Card - Critical Connection with Delivery Partner */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-2xl p-3.5 shadow-md border border-emerald-700/60 relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-radial from-emerald-500/20 to-transparent pointer-events-none" />
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">Customer Delivery OTP</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-emerald-100/90 mt-0.5">
                Share this 4-digit code with your rider to verify and receive delivery.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyOtp}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                title="Tap to copy OTP"
              >
                <span className="font-mono text-base font-black tracking-widest text-emerald-300">{otpCode}</span>
                <span className="text-[9px] text-white/80 font-semibold">{copiedOtp ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Vector Map matching design board Screen 8 */}
        <div className="bg-emerald-50/50 rounded-2xl overflow-hidden border border-emerald-100 shadow-xs relative h-48">
          {/* Simulated Chennai street grid */}
          <svg viewBox="0 0 400 240" className="w-full h-full object-cover">
            {/* Roads */}
            <path d="M-20 60 L420 60 M-20 140 L420 140 M-20 200 L420 200" stroke="#cbd5e1" strokeWidth="8" />
            <path d="M80 -20 L80 260 M220 -20 L220 260 M330 -20 L330 260" stroke="#cbd5e1" strokeWidth="8" />
            
            {/* Green parks and blocks */}
            <rect x="95" y="70" width="115" height="60" rx="8" fill="#dcfce7" opacity="0.8" />
            <rect x="235" y="70" width="85" height="60" rx="8" fill="#f1f5f9" />
            <rect x="95" y="150" width="115" height="40" rx="8" fill="#f1f5f9" />

            {/* Delivery Route (orange dashed line) */}
            <path
              d="M80 60 L220 60 L220 140 L310 140"
              stroke="#ea580c"
              strokeWidth="4"
              strokeDasharray="6 4"
              fill="none"
            />

            {/* Farm Origin Marker */}
            <g transform="translate(70, 48)">
              <circle cx="10" cy="12" r="8" fill="#16a34a" />
              <text x="10" y="15" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🌱</text>
            </g>

            {/* Destination House Marker (Green Park) */}
            <g transform="translate(300, 126)">
              <circle cx="10" cy="14" r="9" fill="#dc2626" />
              <text x="10" y="18" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">🏠</text>
            </g>

            {/* Electric Scooter Delivery Partner */}
            <g transform="translate(195, 85)">
              <circle cx="18" cy="18" r="18" fill="#ffffff" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))" />
              <circle cx="18" cy="18" r="14" fill="#15803d" />
              <text x="18" y="22" textAnchor="middle" fill="#fff" fontSize="13">🛵</text>
            </g>
          </svg>

          {/* Arriving in 20 min speech bubble matching board */}
          <div className="absolute top-4 right-4 bg-emerald-700 text-white px-3 py-1.5 rounded-xl shadow-md border border-emerald-600 flex items-center gap-1.5 animate-bounce">
            <Clock className="w-3.5 h-3.5 text-emerald-200" />
            <div className="text-left leading-none">
              <span className="text-[9px] block text-emerald-200 font-semibold uppercase">Live ETA</span>
              <span className="text-xs font-black">
                {currentStatus === 'delivered' ? 'Delivered' : order.eta}
              </span>
            </div>
          </div>

          <div className="absolute bottom-2 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-700 border border-slate-200 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-emerald-600" />
            <span>Near Anna Main Road, Chennai</span>
          </div>
        </div>

        {/* Connected Delivery Partner Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-sm border-2 border-emerald-300 overflow-hidden">
                  <span className="text-base font-black">VR</span>
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
              </div>

              <div>
                <div className="text-sm font-bold text-slate-900 leading-tight flex items-center gap-1.5">
                  <span>{order.deliveryPartner.name}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    EV Fleet
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {order.deliveryPartner.role}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold mt-0.5">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{order.deliveryPartner.rating} rating (1,248 trips)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCallModal(true)}
              className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 flex items-center justify-center transition-all active:scale-95 shadow-xs cursor-pointer"
              aria-label="Call Partner"
              title="Call Rider"
            >
              <Phone className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[10px]">
            <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
              <Bike className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[9px]">Vehicle</span>
                <span className="font-bold text-slate-800 truncate block">Ather 450X (78% EV)</span>
              </div>
            </div>
            <div className="bg-slate-50 p-2 rounded-xl flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-slate-400 block text-[9px]">Chilled Box</span>
                <span className="font-bold text-slate-800">5.2°C Temperature</span>
              </div>
            </div>
          </div>

          {/* Cross-App Bridge Button: Switch directly to Delivery Partner App */}
          {onSwitchToDeliveryApp && (
            <button
              onClick={onSwitchToDeliveryApp}
              className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer active:scale-[0.99]"
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Open Delivery Partner App (Live Cockpit View)</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Order Details Snippet matching design board Screen 8 */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 font-mono">
                Order {order.id}
              </span>
              <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                {order.deliverySlot ? order.deliverySlot.split('(')[0] : 'Evening 6-8 PM'}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Placed at {order.placedAt} · 3 Fresh Items · 1 Returnable Crate
            </div>
          </div>

          <button
            onClick={() => setShowDetailsModal(true)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            View Details
          </button>
        </div>

        {/* Demo Status Switcher */}
        <div className="pt-1 flex items-center justify-between text-xs px-1">
          <span className="text-slate-400 text-[11px]">Interactive Simulator:</span>
          {currentStatus !== 'delivered' ? (
            <button
              onClick={() => setCurrentStatus('delivered')}
              className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline text-[11px] cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Simulate Customer Confirmation
            </button>
          ) : (
            <button
              onClick={() => {
                if (onRateDeliveredProduct) {
                  onRateDeliveredProduct();
                } else {
                  onNavigateScreen('product_detail');
                }
              }}
              className="text-amber-700 hover:text-amber-800 font-bold flex items-center gap-1 hover:underline text-[11px] cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              Rate Tomato Purchase
            </button>
          )}
        </div>
      </div>

      {/* Direct Call Simulation Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-xs rounded-2xl p-5 text-center shadow-xl space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center text-xl font-bold animate-pulse">
              <Phone className="w-8 h-8 text-emerald-700" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Calling Vijay Raghavan...</h4>
            <p className="text-xs text-slate-500 font-mono">+91 97910 44211</p>
            <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-xl text-left border border-emerald-100">
              "Vanakkam Priya! I am on my Ather 450X EV, 4 minutes away at Green Park 3rd Cross with your chilled farm box."
            </p>
            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Invoice Details Modal */}
      {showDetailsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-end justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-sm font-bold text-slate-900">Order Invoice {order.id}</h4>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between py-1 border-b border-slate-50">
                  <div>
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-slate-500 ml-1">× {item.quantity} {item.unit}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800">₹{item.price * item.quantity}</span>
                </div>
              ))}

              <div className="pt-2 space-y-1 text-slate-600 text-[11px]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold">₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-mono font-bold">₹{order.deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-xs font-black text-emerald-900 pt-1 border-t">
                  <span>Total Paid ({order.paymentMethod.split(' ')[0]})</span>
                  <span className="font-mono text-sm">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-600 space-y-1">
              <div><strong className="text-slate-800">Delivery Slot:</strong> {order.deliverySlot}</div>
              <div><strong className="text-slate-800">Delivered to:</strong> {order.deliveryAddress.street}, {order.deliveryAddress.city}</div>
              <div><strong className="text-slate-800">Quality Certified:</strong> Zero Chemical Residue Spot Checked</div>
            </div>

            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
