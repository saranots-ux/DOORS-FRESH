import React from 'react';
import {
  Bell,
  X,
  Package,
  AlertTriangle,
  Clock,
  Sparkles,
  CheckCircle2,
  Bike,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface DeliveryNotification {
  id: string;
  type: 'assignment' | 'cancellation' | 'reminder' | 'customer' | 'incentive';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  orderId?: string;
  actionLabel?: string;
}

interface DeliveryNotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: DeliveryNotification[];
  onMarkAllAsRead: () => void;
  onActionClick?: (notif: DeliveryNotification) => void;
}

export const DeliveryNotificationsModal: React.FC<DeliveryNotificationsModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onActionClick,
}) => {
  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-sm max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>Rider Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[10px] bg-emerald-500 text-slate-950 px-1.5 py-0.2 rounded-full font-extrabold">
                    {unreadCount} new
                  </span>
                )}
              </h2>
              <p className="text-[10px] text-slate-400">Order alerts, hub dispatches & incentives</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[10px] text-emerald-400 hover:text-emerald-300 font-medium underline cursor-pointer"
              >
                Mark read
              </button>
            )}
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="p-3.5 space-y-2.5 overflow-y-auto flex-1 text-xs">
          {notifications.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-xs">
              No notifications yet. You're all caught up!
            </div>
          ) : (
            notifications.map((notif) => {
              let icon = <Bell className="w-4 h-4 text-emerald-400" />;
              let borderColor = 'border-slate-800';
              let badgeBg = 'bg-slate-800 text-slate-300';

              if (notif.type === 'assignment') {
                icon = <Package className="w-4 h-4 text-blue-400" />;
                borderColor = notif.isRead ? 'border-slate-800' : 'border-blue-500/50';
                badgeBg = 'bg-blue-950 text-blue-300 border border-blue-800';
              } else if (notif.type === 'cancellation') {
                icon = <AlertTriangle className="w-4 h-4 text-rose-400" />;
                borderColor = notif.isRead ? 'border-slate-800' : 'border-rose-500/50';
                badgeBg = 'bg-rose-950 text-rose-300 border border-rose-800';
              } else if (notif.type === 'reminder') {
                icon = <Clock className="w-4 h-4 text-amber-400" />;
                borderColor = notif.isRead ? 'border-slate-800' : 'border-amber-500/50';
                badgeBg = 'bg-amber-950 text-amber-300 border border-amber-800';
              } else if (notif.type === 'incentive') {
                icon = <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />;
                borderColor = notif.isRead ? 'border-slate-800' : 'border-emerald-500/60';
                badgeBg = 'bg-emerald-950 text-emerald-300 border border-emerald-800';
              }

              return (
                <div
                  key={notif.id}
                  className={`p-3 rounded-2xl bg-slate-950/80 border ${borderColor} transition-all space-y-1.5 ${
                    !notif.isRead ? 'ring-1 ring-emerald-500/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                        {icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded ${badgeBg}`}>
                            {notif.type}
                          </span>
                          {!notif.isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          )}
                        </div>
                        <h3 className="text-xs font-bold text-white mt-0.5">{notif.title}</h3>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 whitespace-nowrap">{notif.time}</span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug pl-9">{notif.message}</p>

                  {notif.actionLabel && onActionClick && (
                    <div className="pt-1 pl-9 flex justify-end">
                      <button
                        onClick={() => {
                          onActionClick(notif);
                          onClose();
                        }}
                        className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-lg text-[10px] font-bold border border-emerald-500/40 transition-colors cursor-pointer"
                      >
                        {notif.actionLabel} →
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Dispatch Radio Link: Online
          </span>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
