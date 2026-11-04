import React from 'react';
import { X, Bell, Truck, Tag, Sprout, Sun, MessageSquare, Smartphone } from 'lucide-react';
import { NotificationSettings } from '../../types';

interface NotificationSettingsModalProps {
  settings: NotificationSettings;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSettings: (newSettings: NotificationSettings) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  settings,
  isOpen,
  onClose,
  onUpdateSettings,
}) => {
  if (!isOpen) return null;

  const toggle = (key: keyof Omit<NotificationSettings, 'channels'>) => {
    onUpdateSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const toggleChannel = (channel: 'push' | 'sms' | 'whatsapp') => {
    onUpdateSettings({
      ...settings,
      channels: {
        ...settings.channels,
        [channel]: !settings.channels[channel],
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notification Settings</h3>
              <p className="text-[10px] text-slate-500">Configure delivery alerts & harvest news</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Master Switch */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
          <div>
            <div className="text-xs font-bold text-emerald-950">Push Notifications</div>
            <div className="text-[10px] text-emerald-700">Allow instant alerts on this device</div>
          </div>
          <button
            type="button"
            onClick={() => toggle('pushEnabled')}
            className={`w-11 h-6 rounded-full transition-colors p-0.5 ${
              settings.pushEnabled ? 'bg-emerald-600' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                settings.pushEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Category Toggles */}
        <div className="space-y-3 pt-1">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Alert Categories
          </h4>

          {/* Order Updates */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Order Status Updates</div>
                <div className="text-[10px] text-slate-500">Packed, Out for Delivery, Delivered</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle('orderUpdates')}
              className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                settings.orderUpdates ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.orderUpdates ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Special Offers */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Tag className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Special Offers & Deals</div>
                <div className="text-[10px] text-slate-500">20% off coupons, weekend specials</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle('specialOffers')}
              className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                settings.specialOffers ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.specialOffers ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* New Product Arrivals */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <Sprout className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">New Product Arrivals</div>
                <div className="text-[10px] text-slate-500">Exotic veggies, fresh milk & berries</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle('newArrivals')}
              className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                settings.newArrivals ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.newArrivals ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Morning Harvest Summary */}
          <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 hover:bg-slate-50">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-yellow-100 text-yellow-700 flex items-center justify-center">
                <Sun className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Daily Morning Harvest Bulletin</div>
                <div className="text-[10px] text-slate-500">7:00 AM freshly picked summary</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => toggle('morningSummary')}
              className={`w-9 h-5 rounded-full transition-colors p-0.5 ${
                settings.morningSummary ? 'bg-emerald-600' : 'bg-slate-200'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.morningSummary ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Communication Channels */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Active Delivery Channels
          </h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => toggleChannel('push')}
              className={`p-2 rounded-xl border text-center transition-all ${
                settings.channels.push
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-200 text-slate-500'
              }`}
            >
              <Smartphone className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <span className="text-[10px] block">In-App Push</span>
            </button>

            <button
              onClick={() => toggleChannel('sms')}
              className={`p-2 rounded-xl border text-center transition-all ${
                settings.channels.sms
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-200 text-slate-500'
              }`}
            >
              <MessageSquare className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
              <span className="text-[10px] block">SMS Alerts</span>
            </button>

            <button
              onClick={() => toggleChannel('whatsapp')}
              className={`p-2 rounded-xl border text-center transition-all ${
                settings.channels.whatsapp
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                  : 'border-slate-200 text-slate-500'
              }`}
            >
              <span className="text-base block mb-0.5">💬</span>
              <span className="text-[10px] block">WhatsApp</span>
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};
