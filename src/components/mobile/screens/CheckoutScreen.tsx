import React, { useState } from 'react';
import {
  MapPin,
  Calendar,
  CreditCard,
  Check,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Leaf,
  Sunrise,
  Sun,
  Sunset,
  Zap,
  Info,
  X,
  CheckCircle2,
  AlertCircle,
  Truck,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { DeliverySlotOption, ScreenType } from '../../../types';
import { DEFAULT_DELIVERY_SLOTS } from '../../../data/mockData';

interface CheckoutScreenProps {
  totalAmount: number;
  onPaymentSuccess: (slot?: string) => void;
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
  initialSlot?: string;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  totalAmount = 87,
  onPaymentSuccess,
  onBack,
  initialSlot = 'Today, 6 PM - 8 PM (Evening Fresh Box)',
}) => {
  const [selectedAddress, setSelectedAddress] = useState(
    '#123, Green Park, Chennai - 600028'
  );
  const [selectedSlotText, setSelectedSlotText] = useState(initialSlot);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-today-evening');
  const [activeDayTab, setActiveDayTab] = useState<'today' | 'tomorrow' | 'day_after'>('today');
  
  // Delivery preferences
  const [ecoMode, setEcoMode] = useState(true);
  const [contactlessDrop, setContactlessDrop] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('Ring bell once, handle delicate tomatoes with care');

  const [selectedPayment, setSelectedPayment] = useState<
    'upi' | 'card' | 'netbanking' | 'wallet' | 'cod'
  >('upi');

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [slotToastMessage, setSlotToastMessage] = useState<string | null>(null);

  const addresses = [
    {
      id: 'addr-1',
      title: 'Home (Default)',
      address: '#123, Green Park, Chennai - 600028',
      landmark: 'Near Green Park Community Hall',
      phone: '+91 98401 23456',
    },
    {
      id: 'addr-2',
      title: 'Mom’s Apartment',
      address: 'Flat 4B, Sunflower Apts, T. Nagar, Chennai - 600017',
      landmark: 'Opposite Shiva Temple',
      phone: '+91 98401 23456',
    },
    {
      id: 'addr-3',
      title: 'Office',
      address: 'Wishore Tech Hub, Guindy Industrial Estate, Chennai - 600032',
      landmark: 'Block 2, Level 4',
      phone: '+91 98401 23456',
    },
  ];

  const handleSelectSlot = (slot: DeliverySlotOption) => {
    if (!slot.isAvailable) return;
    setSelectedSlotId(slot.id);
    const formatted = `${slot.dayTitle}, ${slot.timeRange}`;
    setSelectedSlotText(formatted);
    setShowSlotModal(false);
    
    // Show confirmation toast
    setSlotToastMessage(`Delivery slot set to: ${formatted}`);
    setTimeout(() => {
      setSlotToastMessage(null);
    }, 2800);
  };

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(selectedSlotText);
    }, 1200);
  };

  // Find current slot object for rich summary display
  const currentSlotObj = DEFAULT_DELIVERY_SLOTS.find(
    (s) => s.id === selectedSlotId
  ) || DEFAULT_DELIVERY_SLOTS[0];

  const filteredSlots = DEFAULT_DELIVERY_SLOTS.filter(
    (s) => s.dayKey === activeDayTab
  );

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800 relative">
      <MobileHeader
        title="Checkout"
        showBack={true}
        onBack={onBack}
        rightAction="none"
      />

      {/* Floating slot updated toast */}
      {slotToastMessage && (
        <div className="absolute top-14 left-4 right-4 z-40 bg-emerald-900 text-white px-3.5 py-2.5 rounded-xl text-xs font-semibold shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="truncate">{slotToastMessage}</span>
          </div>
          <button
            onClick={() => setSlotToastMessage(null)}
            className="text-white/70 hover:text-white ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Delivery Address Section matching board Screen 7 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              Delivery Address
            </span>
            <button
              onClick={() => setShowAddressModal(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
            >
              Change
            </button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 leading-snug">
                {selectedAddress}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Contact: Priya Sharma (+91 98401 23456)
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Delivery Slot Section matching board Screen 7 with rich interactive features */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              Delivery Slot
            </span>
            <button
              onClick={() => setShowSlotModal(true)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer flex items-center gap-0.5"
            >
              Change
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              {currentSlotObj.period === 'morning' ? (
                <Sunrise className="w-4 h-4 text-amber-600" />
              ) : currentSlotObj.period === 'midday' ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Sunset className="w-4 h-4 text-amber-700" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-slate-900 leading-snug">
                  {selectedSlotText}
                </span>
                {currentSlotObj.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {currentSlotObj.badge}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                {currentSlotObj.harvestNote}
              </p>

              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-[10px]">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                  <Leaf className="w-3 h-3 text-emerald-600" />
                  Eco Electric Van Delivery
                </span>
                <span className="flex items-center gap-1 text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-md">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Free (Gold Harvester)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Slot Selector Chips directly on screen */}
          <div className="mt-3.5 pt-3 border-t border-slate-100">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Quick Farm Slots</span>
              <span className="text-[10px] text-emerald-700 font-semibold">Cold crate guaranteed</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  const s = DEFAULT_DELIVERY_SLOTS.find((x) => x.id === 'slot-today-evening');
                  if (s) handleSelectSlot(s);
                }}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSlotId === 'slot-today-evening'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="text-[10px] text-slate-500 font-medium">Today</div>
                <div className="text-xs font-bold truncate">6 - 8 PM</div>
                <div className="text-[9px] text-emerald-700 font-bold mt-0.5">Fastest</div>
              </button>

              <button
                onClick={() => {
                  const s = DEFAULT_DELIVERY_SLOTS.find((x) => x.id === 'slot-tomorrow-morning');
                  if (s) handleSelectSlot(s);
                }}
                className={`py-2 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedSlotId === 'slot-tomorrow-morning'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                <div className="text-[10px] text-slate-500 font-medium">Tomorrow</div>
                <div className="text-xs font-bold truncate">6 - 8 AM</div>
                <div className="text-[9px] text-amber-600 font-bold mt-0.5">Fresh Pick</div>
              </button>

              <button
                onClick={() => setShowSlotModal(true)}
                className="py-2 px-2 rounded-xl border border-dashed border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50/40 text-center transition-all cursor-pointer flex flex-col items-center justify-center text-emerald-800"
              >
                <div className="text-[10px] font-bold">+ More Slots</div>
                <div className="text-[9px] text-emerald-600 mt-0.5">View 8 Slots</div>
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Section matching board Screen 7 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
            Payment Method
          </h4>

          <div className="space-y-2.5">
            {/* UPI */}
            <label
              onClick={() => setSelectedPayment('upi')}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                selectedPayment === 'upi'
                  ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === 'upi'}
                  onChange={() => setSelectedPayment('upi')}
                  className="w-4 h-4 text-emerald-600 accent-emerald-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    UPI (GPay, PhonePe, Paytm)
                  </div>
                  <div className="text-[10px] text-slate-500">Fast instant payment via UPI apps</div>
                </div>
              </div>
              <div className="px-2 py-0.5 bg-slate-100 rounded text-[10px] font-mono font-bold text-slate-700">
                UPI⚡
              </div>
            </label>

            {/* Cards */}
            <label
              onClick={() => setSelectedPayment('card')}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                selectedPayment === 'card'
                  ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === 'card'}
                  onChange={() => setSelectedPayment('card')}
                  className="w-4 h-4 text-emerald-600 accent-emerald-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Cards (Visa, MasterCard, RuPay)
                  </div>
                  <div className="text-[10px] text-slate-500">Debit / Credit card with 3D Secure</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-5 h-3.5 bg-blue-600 rounded-xs text-[7px] text-white font-bold flex items-center justify-center">
                  VISA
                </span>
                <span className="w-5 h-3.5 bg-amber-600 rounded-xs text-[7px] text-white font-bold flex items-center justify-center">
                  MC
                </span>
              </div>
            </label>

            {/* Net Banking */}
            <label
              onClick={() => setSelectedPayment('netbanking')}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                selectedPayment === 'netbanking'
                  ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === 'netbanking'}
                  onChange={() => setSelectedPayment('netbanking')}
                  className="w-4 h-4 text-emerald-600 accent-emerald-600"
                />
                <div className="text-xs font-bold text-slate-900">Net Banking</div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </label>

            {/* Wallet */}
            <label
              onClick={() => setSelectedPayment('wallet')}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                selectedPayment === 'wallet'
                  ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === 'wallet'}
                  onChange={() => setSelectedPayment('wallet')}
                  className="w-4 h-4 text-emerald-600 accent-emerald-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Wallet & Rewards</div>
                  <div className="text-[10px] text-emerald-700 font-semibold font-mono">
                    Balance: ₹125 available
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </label>

            {/* Cash on Delivery */}
            <label
              onClick={() => setSelectedPayment('cod')}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                selectedPayment === 'cod'
                  ? 'border-emerald-600 bg-emerald-50/40 ring-1 ring-emerald-500/30'
                  : 'border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="payment"
                  checked={selectedPayment === 'cod'}
                  onChange={() => setSelectedPayment('cod')}
                  className="w-4 h-4 text-emerald-600 accent-emerald-600"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">Cash on Delivery</div>
                  <div className="text-[10px] text-slate-500">Pay cash or UPI at delivery doorstep</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </label>
          </div>
        </div>

        {/* Safety & Organic Guarantee */}
        <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="text-[11px] leading-tight">
            <strong>100% Quality & Harvest Guarantee:</strong> If any vegetable or fruit doesn't meet your freshness expectations, get an instant refund to your wallet within 15 minutes.
          </div>
        </div>
      </div>

      {/* Sticky Bottom Pay Button matching board: "Pay ₹87" */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100 p-4 shadow-lg">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-75 text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Confirming Harvest Order...</span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full px-4">
              <div className="text-left">
                <span className="text-[10px] block opacity-80 uppercase tracking-wider">Scheduled Delivery</span>
                <span className="text-xs font-bold">{selectedSlotText.split('(')[0]}</span>
              </div>
              <span className="text-base font-black font-mono">Pay ₹{totalAmount}</span>
            </div>
          )}
        </button>
      </div>

      {/* Address Picker Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-3.5">
            <div className="flex items-center justify-between border-b pb-2">
              <h4 className="text-sm font-bold text-slate-900">Choose Delivery Address</h4>
              <button
                onClick={() => setShowAddressModal(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              {addresses.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedAddress(item.address);
                    setShowAddressModal(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-start justify-between cursor-pointer ${
                    item.address === selectedAddress
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">{item.title}</div>
                    <div className="text-slate-600 leading-snug">{item.address}</div>
                    <div className="text-[10px] text-slate-400">{item.landmark}</div>
                  </div>
                  {item.address === selectedAddress && (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddressModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Delivery Slot Picker Modal / Sheet */}
      {showSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
            {/* Sheet Header */}
            <div className="flex items-start justify-between border-b pb-3 shrink-0">
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Select Delivery Slot
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Farm-harvested produce dispatched in chilled eco crates
                </p>
              </div>
              <button
                onClick={() => setShowSlotModal(false)}
                className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Day Selector Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
              <button
                onClick={() => setActiveDayTab('today')}
                className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                  activeDayTab === 'today'
                    ? 'bg-white text-emerald-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="text-xs">Today</div>
                <div className="text-[9px] text-emerald-700 font-semibold">2 Nov (Sat)</div>
              </button>

              <button
                onClick={() => setActiveDayTab('tomorrow')}
                className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                  activeDayTab === 'tomorrow'
                    ? 'bg-white text-emerald-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="text-xs">Tomorrow</div>
                <div className="text-[9px] text-emerald-700 font-semibold">3 Nov (Sun)</div>
              </button>

              <button
                onClick={() => setActiveDayTab('day_after')}
                className={`py-2 px-1 text-center rounded-lg transition-all cursor-pointer ${
                  activeDayTab === 'day_after'
                    ? 'bg-white text-emerald-950 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                }`}
              >
                <div className="text-xs">Monday</div>
                <div className="text-[9px] text-emerald-700 font-semibold">4 Nov (Mon)</div>
              </button>
            </div>

            {/* Slot List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-0.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Available Harvest Windows</span>
                <span className="text-emerald-700 font-semibold">Free for Gold Tier</span>
              </div>

              {filteredSlots.map((slot) => {
                const isSelected = selectedSlotId === slot.id;
                return (
                  <div
                    key={slot.id}
                    onClick={() => {
                      if (slot.isAvailable) {
                        handleSelectSlot(slot);
                      }
                    }}
                    className={`p-3 rounded-2xl border transition-all text-left relative ${
                      !slot.isAvailable
                        ? 'opacity-50 bg-slate-50 border-slate-200 cursor-not-allowed'
                        : isSelected
                        ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500/30 cursor-pointer shadow-xs'
                        : 'border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-3">
                        {/* Time Period Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            slot.period === 'morning'
                              ? 'bg-amber-100 text-amber-800'
                              : slot.period === 'midday'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {slot.period === 'morning' ? (
                            <Sunrise className="w-4 h-4" />
                          ) : slot.period === 'midday' ? (
                            <Sun className="w-4 h-4" />
                          ) : (
                            <Sunset className="w-4 h-4" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-slate-900">
                              {slot.timeRange}
                            </span>
                            {slot.badge && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                  slot.badgeColor === 'emerald'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : slot.badgeColor === 'blue'
                                    ? 'bg-blue-100 text-blue-800'
                                    : slot.badgeColor === 'purple'
                                    ? 'bg-purple-100 text-purple-800'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {slot.badge}
                              </span>
                            )}
                          </div>

                          <div className="text-[11px] font-semibold text-slate-700 mt-0.5">
                            {slot.windowTitle.split('(')[0]}
                          </div>

                          <div className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                            <Truck className="w-3 h-3 text-slate-400" />
                            {slot.harvestNote}
                          </div>

                          {slot.cutoffText && (
                            <div className="text-[10px] font-medium text-amber-700 mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" />
                              {slot.cutoffText}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Selection Radio / Check Indicator */}
                      <div className="shrink-0 pt-0.5">
                        {slot.isAvailable ? (
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                              isSelected
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        ) : (
                          <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-200 px-1.5 py-0.5 rounded">
                            Closed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Eco & Delivery Preferences */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Delivery Preferences
                </span>

                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ecoMode}
                    onChange={(e) => setEcoMode(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Eco-route Batching</span>
                    <p className="text-[10px] text-slate-500">
                      Bundle delivery with neighbors on your street to save 0.4kg CO₂.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contactlessDrop}
                    onChange={(e) => setContactlessDrop(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex-1">
                    <span className="font-semibold text-slate-800">Contactless Cold Crate Drop</span>
                    <p className="text-[10px] text-slate-500">
                      Leave sanitized crate at door and send SMS photo proof.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="pt-2 border-t border-slate-100 shrink-0 flex items-center gap-2">
              <button
                onClick={() => setShowSlotModal(false)}
                className="w-1/3 py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const targetSlot = DEFAULT_DELIVERY_SLOTS.find((s) => s.id === selectedSlotId);
                  if (targetSlot) handleSelectSlot(targetSlot);
                  setShowSlotModal(false);
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-900/10 transition-colors"
              >
                Confirm Delivery Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
