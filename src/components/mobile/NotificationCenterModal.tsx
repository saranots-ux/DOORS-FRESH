import React, { useState } from 'react';
import {
  X,
  Bell,
  CheckCheck,
  ShoppingBag,
  Tag,
  Sprout,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { NotificationItem, ScreenType } from '../../types';

interface NotificationCenterModalProps {
  notifications: NotificationItem[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
  onTriggerDemoNotification: () => void;
  onOpenSettings: () => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAllAsRead,
  onSelectNotification,
  onTriggerDemoNotification,
  onOpenSettings,
}) => {
  const [filter, setFilter] = useState<'all' | 'order' | 'offer' | 'arrival'>('all');

  if (!isOpen) return null;

  const filtered = notifications.filter(
    (n) => filter === 'all' || n.type === filter
  );

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'order':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'offer':
        return <Tag className="w-4 h-4 text-amber-600" />;
      case 'arrival':
        return <Sprout className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Push Notifications</h3>
              <p className="text-[10px] text-slate-500">Live farm & delivery updates</p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onMarkAllAsRead}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-emerald-700 text-xs font-semibold"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 border-b border-slate-100 flex items-center gap-1.5 bg-slate-50/60 overflow-x-auto no-scrollbar">
          {(['all', 'order', 'offer', 'arrival'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-bold capitalize whitespace-nowrap transition-all ${
                filter === t
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {t === 'all' ? 'All Alerts' : t === 'order' ? 'Orders' : t === 'offer' ? 'Special Offers' : 'New Harvests'}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No notifications in this category.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectNotification(item)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  !item.isRead
                    ? 'bg-emerald-50/30 border-emerald-200 hover:bg-emerald-50/50'
                    : 'bg-white border-slate-100 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    item.type === 'order'
                      ? 'bg-emerald-100'
                      : item.type === 'offer'
                      ? 'bg-amber-100'
                      : 'bg-teal-100'
                  }`}
                >
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </h4>
                    {!item.isRead && (
                      <span className="w-2 h-2 bg-emerald-600 rounded-full shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 inline-block">
                    {item.time}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={onTriggerDemoNotification}
            className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 hover:underline text-[11px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Simulate Push Notification
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenSettings();
            }}
            className="text-slate-500 hover:text-slate-800 font-semibold text-[11px]"
          >
            Configure Preferences →
          </button>
        </div>
      </div>
    </div>
  );
};
