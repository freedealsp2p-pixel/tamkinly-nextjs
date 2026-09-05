'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  Shield,
  CheckCircle2,
  Lock,
  Loader2,
  ArrowLeft,
  Package,
  Mail,
  User,
  AlertCircle,
  Sparkles,
  Calendar,
  Award,
  Monitor,
  Clock,
  Copy,
  Check,
  ExternalLink,
  CreditCard
} from 'lucide-react';
import { useTranslations, useLocale } from '@/components/providers/LocaleProvider';
import { getCart, type CartData } from '@/lib/cart-client';

// Payment Configuration
const WISE_CONFIG = {
  paymentLink: 'https://wise.com/pay/me/abdallahc60',
  accountName: 'Abdallah Chouaf'
};

const CRYPTO_CONFIG = {
  usdcAddress: '0x81b36f47a10565eb9d00a0fdf7fd084b83d5f3a9',
  usdtAddress: '0x81b36f47a10565eb9d00a0fdf7fd084b83d5f3a9',
  network: 'BEP20 (Binance Smart Chain)'
};

const BANK_CONFIG = {
  accountName: 'Abdallah Chouaf',
  accountNumber: '8313147497',
  routingNumber: '026073150',
  swiftBic: 'CMFGUS33',
  bankName: 'Community Federal Savings Bank',
  bankAddress: '89-16 Jamaica Ave, Woodhaven, NY, 11421, United States'
};

// Product data with bilingual support — NEW MODEL: 3 monthly subscription tiers
// (FREE is shown separately as "Get started free" lead magnet, not here)
const productsData: Record<string, {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  comparePrice: number;
  icon: React.ElementType;
  tier: string;
  tierAr: string;
  features: string[];
  featuresAr: string[];
  billingPeriod: 'monthly';
}> = {
  'basic': {
    id: "basic",
    name: "Basic (Monthly)",
    nameAr: "أساسي (شهري)",
    price: 7,
    comparePrice: 0,
    icon: Clock,
    tier: "BASIC",
    tierAr: "أساسي",
    features: ["7-Day Guided Discipline Journey", "Daily identity prompts", "Evidence tracking basics", "Progress dashboard", "7 Days System PDF (downloadable)", "Cancel anytime"],
    featuresAr: ["رحلة انضباط موجهة لمدة 7 أيام", "مطالبات الهوية اليومية", "أساسيات تتبع الأدلة", "لوحة تتبع التقدم", "PDF نظام 7 أيام (قابل للتحميل)", "إلغاء في أي وقت"],
    billingPeriod: "monthly"
  },
  'premium': {
    id: "premium",
    name: "Premium (Monthly)",
    nameAr: "مميز (شهري)",
    price: 17,
    comparePrice: 0,
    icon: Calendar,
    tier: "PREMIUM",
    tierAr: "مميز",
    features: ["Everything in Basic", "30-Day Identity Planner", "Executive Manual", "Identity Baseline Worksheet", "Digital + Print PDFs", "Decision Pattern Analysis", "Cancel anytime"],
    featuresAr: ["كل ما في الباقة الأساسية", "مخطط الهوية لمدة 30 يوم", "الدليل التنفيذي", "ورقة عمل خط الأساس للهوية", "PDF رقمي + للطباعة", "تحليل أنماط القرارات", "إلغاء في أي وقت"],
    billingPeriod: "monthly"
  },
  'mastery': {
    id: "mastery",
    name: "Mastery (Monthly)",
    nameAr: "إتقان (شهري)",
    price: 27,
    comparePrice: 0,
    icon: Award,
    tier: "MASTERY",
    tierAr: "إتقان",
    features: ["Everything in Premium", "All Interactive Apps", "AI Identity Coach", "Transformation Community", "Priority Support", "Emotion Regulation Toolkit", "Cancel anytime"],
    featuresAr: ["كل ما في الباقة المميزة", "جميع التطبيقات التفاعلية", "مدرب الهوية بالذكاء الاصطناعي", "مجتمع التحول", "دعم ذو أولوية", "أدوات تنظيم المشاعر", "إلغاء في أي وقت"],
    billingPeriod: "monthly"
  },
  // Legacy aliases — for backward compatibility with old links/bookmarks
  'trial': {
    id: "basic",
    name: "Basic (Monthly)",
    nameAr: "أساسي (شهري)",
    price: 7,
    comparePrice: 0,
    icon: Clock,
    tier: "BASIC",
    tierAr: "أساسي",
    features: ["7-Day Guided Discipline Journey", "Daily identity prompts", "Evidence tracking basics", "Progress dashboard", "Cancel anytime"],
    featuresAr: ["رحلة انضباط موجهة لمدة 7 أيام", "مطالبات الهوية اليومية", "أساسيات تتبع الأدلة", "لوحة تتبع التقدم", "إلغاء في أي وقت"],
    billingPeriod: "monthly"
  },
  'planner': {
    id: "premium",
    name: "Premium (Monthly)",
    nameAr: "مميز (شهري)",
    price: 17,
    comparePrice: 0,
    icon: Calendar,
    tier: "PREMIUM",
    tierAr: "مميز",
    features: ["Everything in Basic", "30-Day Identity Planner", "Executive Manual", "Identity Baseline Worksheet", "Digital + Print PDFs", "Decision Pattern Analysis", "Cancel anytime"],
    featuresAr: ["كل ما في الباقة الأساسية", "مخطط الهوية لمدة 30 يوم", "الدليل التنفيذي", "ورقة عمل خط الأساس للهوية", "PDF رقمي + للطباعة", "تحليل أنماط القرارات", "إلغاء في أي وقت"],
    billingPeriod: "monthly"
  }
};

type CartCheckoutItem = {
  id: string;
  productId: string;
  name: string;
  price: number;
  comparePrice?: number;
  image?: string;
  quantity: number;
  subtotal: number;
};

function CheckoutContentInner({ productId }: { productId: string | null }) {
  const router = useRouter();
  const t = useTranslations('checkoutPage');
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string>('');
  const [accessCode, setAccessCode] = useState<string>('');
  const [paymentStep, setPaymentStep] = useState<'info' | 'payment' | 'confirm'>('info');
  const [cartItems, setCartItems] = useState<CartCheckoutItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartLoading, setCartLoading] = useState(true);

  // Get product directly from productId prop
  const product = productId && productsData[productId] ? productsData[productId] : null;

  // Load cart items from localStorage on mount
  React.useEffect(() => {
    if (!product) {
      try {
        const cartData: CartData = getCart();
        if (cartData.items && cartData.items.length > 0) {
          setCartItems(cartData.items.map(item => ({
            id: item.id || item.productId,
            productId: item.productId,
            name: item.name,
            price: item.price,
            comparePrice: item.comparePrice,
            quantity: item.quantity || 1,
            subtotal: item.price * (item.quantity || 1),
          })));
          setCartTotal(cartData.total);
          setCartLoading(false);
          return;
        }
      } catch (e) {
        console.error('Failed to load localStorage cart:', e);
      }

      fetch('/api/cart')
        .then(res => res.json())
        .then(data => {
          if (data.items && data.items.length > 0) {
            setCartItems(data.items);
            setCartTotal(data.total);
          }
        })
        .catch(() => {})
        .finally(() => setCartLoading(false));
    } else {
      setCartLoading(false);
    }
  }, [product]);

  // Form state
  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      const userStored = localStorage.getItem('tamkinly_user');
      if (userStored) {
        try {
          const user = JSON.parse(userStored);
          return {
            name: user.name || '',
            email: user.email || '',
            transactionId: '',
            notes: ''
          };
        } catch {}
      }
    }
    return { name: '', email: '', transactionId: '', notes: '' };
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    try {
      const body: Record<string, unknown> = {
        email: formData.email,
        name: formData.name,
        transactionId: formData.transactionId || undefined,
        notes: formData.notes || undefined,
      };

      if (product) {
        body.productId = product.id;
        body.productName = getText(product.name, product.nameAr);
        body.price = product.price;
      } else if (cartItems.length > 0) {
        body.cartItems = cartItems.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        }));
      }

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      localStorage.setItem('tamkinly_user', JSON.stringify({
        name: formData.name,
        email: formData.email
      }));

      try {
        localStorage.removeItem('tamkinly_cart');
        window.dispatchEvent(new CustomEvent('cart-updated'));
      } catch (e) {
        console.error('Failed to clear cart:', e);
      }

      setOrderNumber(data.orderNumber);
      // Access code no longer exposed - sent via email after payment confirmation
      setSuccess(true);
    } catch (err) {
      console.error('Confirmation error:', err);
      setError(err instanceof Error ? err.message : 'Submit error');
    } finally {
      setProcessing(false);
    }
  };

  // Loading cart
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1F6F78] mx-auto mb-4" />
          <p className="text-[#8A94A6]">{t('loadingCheckout')}</p>
        </div>
      </div>
    );
  }

  // No product and no cart items
  if (!product && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-24 h-24 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-[#1F6F78]" />
            </div>
            <h1 className="text-3xl font-bold text-[#0F1C2E] mb-4">{t('selectProduct')}</h1>
            <p className="text-[#8A94A6] mb-8">{t('selectProductDesc')}</p>
            <Link href="/products">
              <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12 px-8">
                {t('browseProducts')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCartCheckout = !product && cartItems.length > 0;
  const checkoutTotal = isCartCheckout ? cartTotal : (product?.price || 0);

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#F6F8FA]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-lg mx-auto text-center">
            {/* Awaiting confirmation - amber icon instead of green check */}
            <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
              <Clock className="w-12 h-12 text-amber-600" />
            </div>
            <h1 className="text-3xl font-bold text-[#0F1C2E] mb-4">{getText('Order Submitted', 'تم إرسال الطلب')}</h1>
            <p className="text-[#8A94A6] mb-8">{getText('Your order has been received and is awaiting payment confirmation.', 'تم استلام طلبك وهو بانتظار تأكيد الدفع.')}</p>

            <Card className="border-2 border-amber-300 shadow-sm mb-6 bg-gradient-to-br from-white to-amber-50">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-amber-700" />
                </div>
                <p className="text-sm font-medium text-amber-800 mb-2">{getText('Access Token Will Be Sent After Payment Verification', 'سيتم إرسال رمز الوصول بعد التحقق من الدفع')}</p>
                <div className="bg-[#0F1C2E] rounded-lg px-4 py-3 mb-3">
                  <p className="text-white font-medium">{formData.email}</p>
                </div>
                <p className="text-xs text-[#8A94A6] mb-3">
                  {getText(
                    'IMPORTANT: Your access token will ONLY be sent after your payment is verified. This typically takes a few minutes for card payments, or up to 24 hours for bank transfers. Do NOT share your order reference with anyone.',
                    'مهم: سيتم إرسال رمز الوصول فقط بعد التحقق من دفعك. يستغرق ذلك عادةً بضع دقائق للبطاقات، أو حتى 24 ساعة للتحويل البنكي. لا تشارك مرجع طلبك مع أحد.'
                  )}
                </p>
                <div className="flex items-center justify-center gap-2 text-amber-700">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">{getText('Payment Verification Required', 'يتطلب التحقق من الدفع')}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm mb-8">
              <CardContent className="p-6">
                <p className="text-sm text-[#8A94A6] mb-2">{t('orderReference')}</p>
                <p className="text-xl font-mono font-bold text-[#0F1C2E]">{orderNumber}</p>
                <p className="text-xs text-[#8A94A6] mt-2">{t('saveReference')}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apps">
                <Button className="bg-[#1F6F78] text-white hover:bg-[#154d54] h-12 px-8">
                  {getText('Browse Free Apps', 'تصفح التطبيقات المجانية')}
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="h-12 px-8">{getText('Contact Support', 'اتصل بالدعم')}</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Icon = product?.icon || Package;

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href={product ? `/products/${product.id}` : '/cart'} className="inline-flex items-center text-[#1F6F78] hover:text-[#3DD4B0] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {product ? t('backToProduct') : t('backToCart')}
          </Link>
          <h1 className="text-3xl font-bold text-[#0F1C2E]">{t('checkout')}</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {paymentStep === 'info' && (
              <Card className="border-0 shadow-sm mb-6">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3DD4B0] text-[#0F1C2E] flex items-center justify-center font-bold">1</div>
                    <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                      <User className="w-5 h-5 text-[#3DD4B0]" />
                      {t('customerInfo')}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34]">{t('fullName')}</label>
                    <Input type="text" placeholder={t('namePlaceholder')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2B2E34]">{t('emailAddress')}</label>
                    <Input type="email" placeholder={t('emailPlaceholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" />
                    <p className="text-xs text-[#8A94A6]">{t('emailNote')}</p>
                  </div>
                  <Button onClick={() => setPaymentStep('payment')} disabled={!formData.name || !formData.email} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-12">
                    {t('continueToPayment')}
                  </Button>
                </CardContent>
              </Card>
            )}

            {paymentStep === 'payment' && (
              <form onSubmit={handleConfirmPayment}>
                <Card className="border-0 shadow-sm mb-6">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3DD4B0] text-[#0F1C2E] flex items-center justify-center font-bold">2</div>
                      <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-[#3DD4B0]" />
                        {t('paymentViaWise')}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="bg-gradient-to-br from-[#00B9FF] to-[#0066B2] rounded-xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-2xl font-bold">W</span></div>
                        <div><p className="font-bold text-lg">{t('wisePayment')}</p><p className="text-white/70 text-sm">{t('wiseFastLowCost')}</p></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('amountToSend')}</p><p className="text-2xl font-bold">${checkoutTotal} USD</p></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('accountHolder')}</p><p className="font-semibold">{WISE_CONFIG.accountName}</p></div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <a href={WISE_CONFIG.paymentLink} target="_blank" rel="noopener noreferrer" className="block">
                        <Button type="button" className="w-full bg-[#00B9FF] hover:bg-[#0099DD] text-white h-14 text-lg font-semibold">
                          <ExternalLink className="w-5 h-5 mr-2" />{t('payWithWise').replace('{amount}', String(checkoutTotal))}
                        </Button>
                      </a>
                      <p className="text-center text-sm text-[#8A94A6]">{t('openWiseTab')}</p>
                    </div>
                    <div className="relative my-6"><Separator /><span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm font-medium text-[#0F1C2E]">{t('or')}</span></div>
                    <div className="bg-gradient-to-br from-[#8B5CF6] to-[#6366F1] rounded-xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-2xl">⚡</span></div>
                        <div><p className="font-bold text-lg">{t('payWithCrypto')}</p><p className="text-white/70 text-sm">{t('cryptoInstant')}</p></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3"><div className="flex items-center justify-between mb-2"><p className="text-sm font-semibold">USDC</p><Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(CRYPTO_CONFIG.usdcAddress)} className="text-white hover:bg-white/20 h-7 px-2">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button></div><p className="font-mono text-xs break-all">{CRYPTO_CONFIG.usdcAddress}</p></div>
                        <div className="bg-white/10 rounded-lg p-3"><div className="flex items-center justify-between mb-2"><p className="text-sm font-semibold">USDT</p><Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(CRYPTO_CONFIG.usdtAddress)} className="text-white hover:bg-white/20 h-7 px-2">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button></div><p className="font-mono text-xs break-all">{CRYPTO_CONFIG.usdtAddress}</p></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('network')}</p><p className="font-semibold text-sm">{CRYPTO_CONFIG.network}</p></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('amountToSendCrypto')}</p><p className="text-2xl font-bold">${checkoutTotal} USDC/USDT</p></div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-[#8A94A6] mt-2">{t('sendCryptoNote')}</p>
                    <div className="relative my-6"><Separator /><span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm font-medium text-[#0F1C2E]">{t('or')}</span></div>
                    <div className="bg-gradient-to-br from-[#1F6F78] to-[#0F4F56] rounded-xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center"><span className="text-2xl font-bold">🏦</span></div>
                        <div><p className="font-bold text-lg">{t('bankTransfer')}</p><p className="text-white/70 text-sm">{t('bankWire')}</p></div>
                      </div>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('accountName')}</p><div className="flex items-center justify-between gap-2"><p className="font-semibold">{BANK_CONFIG.accountName}</p><Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(BANK_CONFIG.accountName)} className="text-white hover:bg-white/20 h-7 px-2">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button></div></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('accountNumber')}</p><div className="flex items-center justify-between gap-2"><p className="font-mono font-semibold">{BANK_CONFIG.accountNumber}</p><Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(BANK_CONFIG.accountNumber)} className="text-white hover:bg-white/20 h-7 px-2">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button></div></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('routingNumber')}</p><div className="flex items-center justify-between gap-2"><p className="font-mono font-semibold">{BANK_CONFIG.routingNumber}</p><Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(BANK_CONFIG.routingNumber)} className="text-white hover:bg-white/20 h-7 px-2">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button></div></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('swiftBic')}</p><div className="flex items-center justify-between gap-2"><p className="font-mono font-semibold">{BANK_CONFIG.swiftBic}</p><Button type="button" variant="ghost" size="sm" onClick={() => copyToClipboard(BANK_CONFIG.swiftBic)} className="text-white hover:bg-white/20 h-7 px-2">{copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}</Button></div></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('bankName')}</p><p className="font-semibold text-sm">{BANK_CONFIG.bankName}</p></div>
                        <div className="bg-white/10 rounded-lg p-3"><p className="text-xs text-white/60 mb-1">{t('amountToSend')}</p><p className="text-2xl font-bold">${checkoutTotal} USD</p></div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-[#8A94A6] mt-2">{t('bankTransferTime')}</p>

                    {/* ============================================ */}
                    {/* TRIBUTE PAYMENT (Telegram) */}
                    {/* ============================================ */}
                    <div className="relative my-6"><Separator /><span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm font-medium text-[#0F1C2E]">{getText('Pay via Telegram (Tribute)', 'ادفع عبر تيليجرام (Tribute)')}</span></div>
                    
                    <div className="bg-gradient-to-br from-[#0088cc] to-[#005580] rounded-xl p-6 text-white">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.643.135-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
                        </div>
                        <div>
                          <p className="font-bold text-lg">{getText('Pay with Tribute', 'ادفع عبر Tribute')}</p>
                          <p className="text-white/70 text-sm">{getText('Secure payment via Telegram — Card, Telegram Stars, or Wallet', 'دفع آمن عبر تيليجرام — بطاقة أو Stars أو المحفظة')}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Generate Tribute payment links dynamically */}
                        {product ? (
                          <a 
                            href={`/api/tribute/redirect?tier=${product.id}&amount=${checkoutTotal}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block"
                          >
                            <button
                              type="button"
                              className="w-full bg-white text-[#0088cc] hover:bg-white/90 h-14 text-lg font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.643.135-.953l11.566-4.458c.538-.196 1.006.128.832.941z"/></svg>
                              {getText(`Pay $${checkoutTotal} with Tribute`, `ادفع $${checkoutTotal} عبر Tribute`)}
                            </button>
                          </a>
                        ) : (
                          // Cart checkout — show all 3 options
                          <div className="space-y-2">
                            {cartItems.length > 0 && (
                              <p className="text-white/70 text-sm text-center mb-2">
                                {getText('Select a tier to pay via Tribute:', 'اختر طبقة للدفع عبر Tribute:')}
                              </p>
                            )}
                          </div>
                        )}
                        
                        <p className="text-center text-xs text-white/60 mt-2">
                          {getText('After payment, you\'ll receive your access code via Telegram. Then return here to unlock your apps.', 'بعد الدفع، ستستلم رمز الوصول عبر تيليجرام. ثم ارجع هنا لفتح تطبيقاتك.')}
                        </p>
                      </div>
                    </div>


                    <div className="relative"><Separator /><span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-[#8A94A6]">{t('alreadyPaid')}</span></div>
                    <div className="space-y-4">
                      <p className="font-medium text-[#0F1C2E]">{t('confirmPayment')}</p>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">{t('transactionId')}</label>
                        <Input type="text" placeholder={t('transactionPlaceholder')} value={formData.transactionId} onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })} className="border-[#1F6F78]/20 focus:border-[#3DD4B0]" />
                        <p className="text-xs text-[#8A94A6]">{t('transactionNote')}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-[#2B2E34]">{t('additionalNotes')}</label>
                        <Textarea placeholder={t('notesPlaceholder')} value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="border-[#1F6F78]/20 focus:border-[#3DD4B0] min-h-[80px]" />
                      </div>
                    </div>
                    {error && (
                      <div className="flex items-center gap-2 text-[#C97B7B] text-sm bg-[#F8EEEF] p-4 rounded-lg">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />{error}
                      </div>
                    )}
                    <Button type="submit" disabled={processing} className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-14 text-lg font-semibold">
                      {processing ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" />{t('processing')}</> : <><CheckCircle2 className="w-4 h-4 mr-2" />{t('confirmOrder')}</>}
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setPaymentStep('info')} className="w-full">
                      <ArrowLeft className="w-4 h-4 mr-2" />{t('backToCustomerInfo')}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-[#8A94A6]">
              <div className="flex items-center gap-2"><Shield className="h-4 w-4 text-[#3DD4B0]" /><span>{t('securePayment')}</span></div>
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" /><span>{t('thirtyDayMoneyBack')}</span></div>
              <div className="flex items-center gap-2"><Lock className="h-4 w-4 text-[#3DD4B0]" /><span>{t('verifiedByWise')}</span></div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-0 shadow-sm sticky top-24">
              <CardHeader><CardTitle className="text-[#0F1C2E]">{t('orderSummary')}</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {product ? (
                  <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="w-12 h-12 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0"><Icon className="w-6 h-6 text-[#3DD4B0]" /></div>
                    <div className="flex-1">
                      <Badge variant="outline" className="text-xs mb-1">{getText(product.tier, product.tierAr)}</Badge>
                      <p className="font-semibold text-[#0F1C2E]">{getText(product.name, product.nameAr)}</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-bold text-[#3DD4B0]">${product.price}</span>
                        {product.comparePrice > product.price && <span className="text-sm text-slate-400 line-through">${product.comparePrice}</span>}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.productId} className="flex gap-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center flex-shrink-0"><Package className="w-5 h-5 text-[#3DD4B0]" /></div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[#0F1C2E] text-sm truncate">{item.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-baseline gap-1"><span className="font-bold text-[#3DD4B0] text-sm">${item.price}</span>{item.comparePrice && item.comparePrice > item.price && <span className="text-xs text-slate-400 line-through">${item.comparePrice}</span>}</div>
                            <span className="text-xs text-slate-500">x{item.quantity}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {product && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-[#2B2E34]">{t('includes')}</p>
                    {(locale === 'ar' ? product.featuresAr : product.features).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" /><span>{feature}</span></div>
                    ))}
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-[#8A94A6]"><span>{t('subtotal')}</span><span>${checkoutTotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#8A94A6]"><span>{getText('Tax', 'الضريبة')}</span><span>$0.00</span></div>
                {product && product.comparePrice > product.price && <div className="flex justify-between text-green-600"><span>{t('youSave')}</span><span>-${(product.comparePrice - product.price).toFixed(2)}</span></div>}
                <Separator />
                <div className="flex justify-between text-lg font-bold text-[#0F1C2E]"><span>{getText('Total', 'الإجمالي')}</span><span>${checkoutTotal.toFixed(2)} USD</span></div>
                <div className="pt-4 space-y-3 border-t">
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]"><CheckCircle2 className="w-4 w-4 text-[#3DD4B0]" /><span>{t('instantAccessAfter')}</span></div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]"><Shield className="w-4 w-4 text-[#3DD4B0]" /><span>{t('accessCodeSent')}</span></div>
                  <div className="flex items-center gap-2 text-sm text-[#8A94A6]"><Sparkles className="w-4 w-4 text-[#3DD4B0]" /><span>{t('monthlyAccess')}</span></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// Wrapper component that reads search params inside Suspense
function CheckoutContentWithParams() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('product');
  return <CheckoutContentInner productId={productId} />;
}

export default function CheckoutPage() {
  const t = useTranslations('checkoutPage');
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-[#1F6F78] mx-auto mb-4" />
          <p className="text-[#8A94A6]">{t('loadingCheckout')}</p>
        </div>
      </div>
    }>
      <CheckoutContentWithParams />
    </Suspense>
  );
}


