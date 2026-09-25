'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';

interface Notification {
  id: string;
  type: string;
  title: string;
  titleAr: string | null;
  message: string;
  messageAr: string | null;
  read: boolean;
  actionUrl: string | null;
  createdAt: string;
}

export function NotificationBell() {
  const { data: session } = useSession();
  const t = useTranslations('common');
  const { locale } = useLocale();
  const isRTL = locale === 'ar';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (session?.user) {
      fetchNotifications();
      // Poll every 30 seconds
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    }
  }, [session]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications?limit=5');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {}
  };

  const markAsRead = async (ids?: string[]) => {
    try {
      if (ids) {
        await fetch('/api/notifications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notificationIds: ids }),
        });
      } else {
        await fetch('/api/notifications', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ markAll: true }),
        });
      }
      fetchNotifications();
    } catch {}
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 1) return isRTL ? 'الآن' : 'just now';
    if (mins < 60) return isRTL ? `منذ ${mins} دقيقة` : `${mins}m ago`;
    if (hours < 24) return isRTL ? `منذ ${hours} ساعة` : `${hours}h ago`;
    return isRTL ? `منذ ${days} يوم` : `${days}d ago`;
  };

  if (!session?.user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-11 w-11 text-slate-600 hover:text-primary"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-5 min-w-[20px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden`} dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
            <h3 className="font-semibold text-sm text-[#0F1C2E]">
              {isRTL ? 'الإشعارات' : 'Notifications'}
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={() => markAsRead()}
                className="text-xs text-[#1F6F78] hover:text-[#0F1C2E] font-medium"
              >
                {isRTL ? 'تعيين الكل كمقروء' : 'Mark all read'}
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center">
                <Bell className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm text-slate-500">
                  {isRTL ? 'لا توجد إشعارات' : 'No notifications yet'}
                </p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                    !notif.read ? 'bg-[#3DD4B0]/5' : ''
                  }`}
                  onClick={() => {
                    if (!notif.read) markAsRead([notif.id]);
                    if (notif.actionUrl) window.location.href = notif.actionUrl;
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${!notif.read ? 'bg-[#3DD4B0]' : 'bg-transparent'}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#0F1C2E] truncate">
                        {isRTL && notif.titleAr ? notif.titleAr : notif.title}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                        {isRTL && notif.messageAr ? notif.messageAr : notif.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">{formatTime(notif.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
              <a href="/dashboard" className="flex items-center justify-center gap-1 text-xs text-[#1F6F78] hover:text-[#0F1C2E] font-medium">
                {isRTL ? 'عرض الكل' : 'View all'}
                <ArrowRight className={`h-3 w-3 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

