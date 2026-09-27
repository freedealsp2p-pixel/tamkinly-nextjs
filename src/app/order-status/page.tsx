'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { Loader2, PackageSearch, ShieldCheck } from 'lucide-react';

type OrderStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED' | 'REFUNDED';

interface OrderInfo {
  orderNumber: string;
  status: OrderStatus;
  createdAt: string;
  paidAt: string | null;
  total: number;
  currency: string;
  items: { productName: string; price: number; quantity: number }[];
  accessCodesCount: number;
}

export default function OrderStatusPage() {
  const { locale } = useLocale();
  const isAr = locale === 'ar';
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'found' | 'notfound' | 'error'>('idle');
  const [order, setOrder] = useState<OrderInfo | null>(null);

  const t = {
    title: isAr ? 'حالة الطلب' : 'Order Status',
    subtitle: isAr
      ? 'أدخل رقم طلبك وبريدك الإلكتروني لمعرفة حالته الفورية — دون الحاجة للتواصل معنا.'
      : 'Enter your order number and email to check its live status — no need to contact us.',
    orderNumber: isAr ? 'رقم الطلب (ORD-...)' : 'Order number (ORD-...)',
    email: isAr ? 'البريد الإلكتروني المستخدم في الطلب' : 'Email used for the order',
    check: isAr ? 'تحقق من الحالة' : 'Check Status',
    checking: isAr ? 'جارٍ التحقق...' : 'Checking...',
    notfound: isAr
      ? 'لم نجد طلباً مطابقاً. تأكد من رقم الطلب والبريد الإلكتروني.'
      : 'No matching order found. Please double-check the order number and email.',
    error: isAr ? 'حدث خطأ، حاول مرة أخرى.' : 'Something went wrong, please try again.',
    product: isAr ? 'المنتج' : 'Product',
    amount: isAr ? 'المبلغ' : 'Amount',
    date: isAr ? 'تاريخ الطلب' : 'Order date',
    yourCode: isAr
      ? 'رمز الوصول الخاص بك أُرسل إلى بريدك الإلكتروني.'
      : 'Your access code has been sent to your email.',
    pending: isAr
      ? 'طلبك بانتظار تأكيد الدفع. بمجرد التأكيد سيصلك رمز الوصول تلقائياً على بريدك الإلكتروني.'
      : 'Your order is awaiting payment confirmation. Once confirmed, your access code will be emailed to you automatically.',
    processing: isAr
      ? 'طلبك قيد المعالجة الآن.'
      : 'Your order is being processed.',
    cancelled: isAr ? 'تم إلغاء هذا الطلب.' : 'This order was cancelled.',
    refunded: isAr ? 'تم استرداد مبلغ هذا الطلب.' : 'This order was refunded.',
    codesNote: isAr
      ? 'رموز الوصول المرتبطة بهذا الطلب:'
      : 'Access codes linked to this order:',
    privacy: isAr
      ? 'تحقق خاص: نعرض الحالة فقط لمطابق رقم الطلب + البريد الإلكتروني.'
      : 'Private lookup: status is shown only for an exact order number + email match.',
    statusLabels: {
      PENDING: isAr ? 'بانتظار تأكيد الدفع' : 'Awaiting payment confirmation',
      PROCESSING: isAr ? 'قيد المعالجة' : 'Processing',
      COMPLETED: isAr ? 'مكتمل' : 'Completed',
      CANCELLED: isAr ? 'ملغى' : 'Cancelled',
      REFUNDED: isAr ? 'مُسترد' : 'Refunded',
    } as Record<OrderStatus, string>,
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const o = params.get('order');
    if (o) setOrderNumber(o);
  }, []);

  const statusColor: Record<OrderStatus, string> = {
    PENDING: '#E6A817',
    PROCESSING: '#2A8A94',
    COMPLETED: '#2BC49E',
    CANCELLED: '#C97B7B',
    REFUNDED: '#8A94A6',
  };

  function statusMessage(s: OrderStatus, codes: number): string {
    if (s === 'COMPLETED') return codes > 0 ? t.yourCode : t.processing;
    if (s === 'PENDING') return t.pending;
    if (s === 'PROCESSING') return t.processing;
    if (s === 'CANCELLED') return t.cancelled;
    return t.refunded;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber || !email || state === 'loading') return;
    setState('loading');
    try {
      const res = await fetch('/api/orders/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber: orderNumber.trim(), email: email.trim() }),
      });
      if (res.status === 404) {
        setState('notfound');
        setOrder(null);
        return;
      }
      if (!res.ok) throw new Error('failed');
      const data = await res.json();
      setOrder(data.order);
      setState('found');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="min-h-[70vh] bg-[#F6F8FA] py-16" dir={isAr ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#3DD4B0]/15 mb-5">
            <PackageSearch className="w-7 h-7 text-[#2BC49E]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-3">{t.title}</h1>
          <p className="text-slate-600 leading-relaxed">{t.subtitle}</p>
        </div>

        <form
          onSubmit={submit}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 space-y-4"
        >
          <div>
            <label htmlFor="ord" className="block text-sm font-medium text-[#0F1C2E] mb-1.5">{t.orderNumber}</label>
            <input
              id="ord"
              required
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="ORD-1790417239841-DBOGO"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/60"
            />
          </div>
          <div>
            <label htmlFor="eml" className="block text-sm font-medium text-[#0F1C2E] mb-1.5">{t.email}</label>
            <input
              id="eml"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/60"
            />
          </div>
          <button
            type="submit"
            disabled={state === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F6F78] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#185B62] transition-colors disabled:opacity-60"
          >
            {state === 'loading' && <Loader2 className="w-4 h-4 animate-spin" />}
            {state === 'loading' ? t.checking : t.check}
          </button>
          {state === 'notfound' && <p className="text-[#C97B7B] text-sm text-center">{t.notfound}</p>}
          {state === 'error' && <p className="text-[#C97B7B] text-sm text-center">{t.error}</p>}
          <p className="flex items-center justify-center gap-1.5 text-xs text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.privacy}
          </p>
        </form>

        {state === 'found' && order && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 mt-6">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
              <span className="font-mono text-sm text-slate-500">{order.orderNumber}</span>
              <span
                className="rounded-full px-4 py-1.5 text-sm font-semibold"
                style={{ backgroundColor: `${statusColor[order.status]}1A`, color: statusColor[order.status] }}
              >
                {t.statusLabels[order.status]}
              </span>
            </div>
            <p className="text-slate-700 leading-relaxed mb-6 rounded-xl bg-[#F6F8FA] border border-slate-100 p-4">
              {statusMessage(order.status, order.accessCodesCount)}
            </p>
            <div className="space-y-2 text-sm">
              {order.items.map((it, i) => (
                <div key={i} className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-600">{it.productName} × {it.quantity}</span>
                  <span className="font-semibold text-[#0F1C2E]">${it.price}</span>
                </div>
              ))}
              <div className="flex justify-between pt-1 font-semibold">
                <span>{t.amount}</span>
                <span className="text-[#1F6F78]">${order.total} {order.currency}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.date}</span>
                <span>{new Date(order.createdAt).toLocaleDateString(isAr ? 'ar' : 'en')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
