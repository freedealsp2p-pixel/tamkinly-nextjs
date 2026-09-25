'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Send,
  Trash2,
  Plus,
  ArrowLeft,
  ArrowRight,
  Loader2,
  Bot,
  User,
  AlertCircle,
  RefreshCw,
  MessageCircle,
  Shield,
  Brain,
  Heart,
  Target,
  CheckCircle2,
  Lock,
  Gift,
  Zap,
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

// ============================================
// Types
// ============================================
interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

// ============================================
// Tier hierarchy for access check
// ============================================
const TIER_HIERARCHY: Record<string, number> = {
  FREE: 0, BASIC: 1, PREMIUM: 2, MASTERY: 3,
};

// ============================================
// Generate a unique session ID
// ============================================
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

// ============================================
// Chat Message Bubble Component
// ============================================
function ChatMessage({ message, locale }: { message: Message; locale: string }) {
  const isUser = message.role === 'user';
  const isRTL = locale === 'ar';

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'} mb-4`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-[#0F1C2E] text-white'
            : 'bg-[#3DD4B0]/20 text-[#1F6F78]'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? 'bg-[#0F1C2E] text-white rounded-tr-sm'
            : 'bg-white text-[#0F1C2E] border border-slate-200 rounded-tl-sm shadow-sm'
        }`}
        dir={isRTL && !isUser ? 'rtl' : 'ltr'}
      >
        {message.content}
      </div>
    </div>
  );
}

// ============================================
// Typing Indicator Component
// ============================================
function TypingIndicator({ locale }: { locale: string }) {
  return (
    <div className="flex gap-3 flex-row mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-[#3DD4B0]/20 text-[#1F6F78]">
        <Bot className="w-4 h-4" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0ms]" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:150ms]" />
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Free Limit Reached Component
// ============================================
function FreeLimitReached({ locale, onAccessGranted }: { locale: string; onAccessGranted: () => void }) {
  const isRTL = locale === 'ar';
  const getText = (en: string, ar: string) => (isRTL ? ar : en);
  const [accessCode, setAccessCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [codeError, setCodeError] = useState('');

  const handleVerify = async () => {
    if (!accessCode.trim()) return;
    setVerifying(true);
    setCodeError('');
    try {
      const response = await fetch('/api/access/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: accessCode.trim() }),
      });
      const data = await response.json();
      if (response.ok && data.valid) {
        const TIER_HIERARCHY_LOCAL: Record<string, number> = { FREE: 0, BASIC: 1, PREMIUM: 2, MASTERY: 3 };
        const tierLevel = TIER_HIERARCHY_LOCAL[data.tier] || 0;
        if (tierLevel >= TIER_HIERARCHY_LOCAL['PREMIUM']) {
          localStorage.setItem('tamkinly_access', JSON.stringify({
            tier: data.tier || 'MASTERY',
            code: accessCode.trim(),
            verifiedAt: new Date().toISOString(),
          }));
          onAccessGranted();
        } else {
          setCodeError(getText('This code does not include AI Coach access. You need the Mastery plan ($27/mo).', 'هذا الرمز لا يشمل وصول المدرب الذكي. تحتاج باقة الإتقان ($27/شهر).'));
        }
      } else {
        setCodeError(data.error || getText('Invalid access code', 'رمز الوصول غير صالح'));
      }
    } catch {
      setCodeError(getText('Verification failed', 'فشل التحقق'));
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="max-w-lg w-full border-2 border-[#3DD4B0]/30 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-6">
            <Gift className="w-8 h-8 text-[#3DD4B0]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-3">
            {getText('You\'ve Used Your 2 Free Questions!', 'لقد استخدمت سؤاليك المجانيين!')}
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            {getText(
              'Every visitor gets 2 free questions with the AI Identity Coach. To continue, get Mastery ($27/mo) — your personal code will be sent to you.',
              'يحصل كل زائر على سؤالين مجانيين مع مدرب الهوية الذكي. لمواصلة رحلة التحوّل مع وصول غير محدود، احصل على الباقة الشاملة — سيتم إرسال رمزك الشخصي إليك.'
            )}
          </p>

          {/* Access Code Input */}
          <div className="bg-[#F6F8FA] rounded-xl p-4 mb-6">
            <p className="text-sm font-medium text-[#0F1C2E] mb-3">
              {getText('Already have an access code?', 'لديك رمز وصول بالفعل؟')}
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="TMLY-XXXX-XXXX"
                className="flex-1 px-4 py-2.5 border border-slate-200 rounded-lg focus:border-[#3DD4B0] focus:outline-none font-mono text-sm"
                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
              />
              <Button onClick={handleVerify} disabled={verifying || !accessCode.trim()} className="bg-[#0F1C2E] hover:bg-[#1a2d42] text-white">
                {verifying ? <Loader2 className="w-4 h-4 animate-spin" /> : getText('Verify', 'تحقق')}
              </Button>
            </div>
            {codeError && <p className="text-sm text-[#C97B7B] mt-2">{codeError}</p>}
          </div>

          {/* CTA Button */}
          <Link href="/products/mastery">
            <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-bold h-12 text-base">
              <Zap className={`w-5 h-5 ${isRTL ? 'ml-2' : 'mr-2'}`} />
              {getText('Mastery — $27/mo', 'احصل على الإتقان — $27/شهر')}
            </Button>
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            {getText('Mastery: AI Coach + all 20 tools + personal access token.', 'يشمل المدرب الذكي + جميع الأدوات الـ 15 + رمز الوصول الشخصي')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================
// Landing Page Component (visible to all visitors)
// ============================================
function AICoachLanding({ locale, onStartChat }: { locale: string; onStartChat: () => void }) {
  const isRTL = locale === 'ar';
  const getText = (en: string, ar: string) => (isRTL ? ar : en);

  const features = [
    { icon: Brain, en: 'Identity Clarity', ar: 'وضوح الهوية', desc_en: 'Understand who you are and who you want to become', desc_ar: 'افهم من أنت ومن تريد أن تصبح' },
    { icon: Heart, en: 'Emotional Regulation', ar: 'تنظيم المشاعر', desc_en: 'Navigate difficult emotions with evidence-based strategies', desc_ar: 'تعامل مع المشاعر الصعبة باستراتيجيات مبنية على الأدلة' },
    { icon: Target, en: 'Decision Quality', ar: 'جودة القرارات', desc_en: 'Make choices aligned with your true identity', desc_ar: 'اتخذ خيارات متوافقة مع هويتك الحقيقية' },
  ];

  const starters = [
    { en: "I feel stuck and don't know how to move forward", ar: 'أشعر بالتعثر ولا أعرف كيف أتحرك للأمام' },
    { en: 'Help me understand my identity gap', ar: 'ساعدني في فهم فجوة هويتي' },
    { en: "I want to build better habits but keep failing", ar: 'أريد بناء عادات أفضل لكنني أفشل دائماً' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Link href="/apps" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
              <ArrowLeft className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} `} />
              {getText('Back to Apps', 'العودة للتطبيقات')}
            </Link>
            <div className="w-20 h-20 rounded-2xl bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-8">
              <Sparkles className="w-10 h-10 text-[#3DD4B0]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6">
              {getText('AI Identity Coach', 'مدرب الهوية الذكي')}
            </h1>
            <p className="text-lg text-slate-300 mb-4 max-w-2xl mx-auto">
              {getText(
                'Your personal transformation companion powered by AI. Ask anything about identity change, habits, or the Tamkinly system.',
                'رفيق تحوّلك الشخصي المدعوم بالذكاء الاصطناعي. اسأل أي شيء عن تغيير الهوية أو العادات أو نظام تمكينلي.'
              )}
            </p>
            {/* Free questions badge */}
            <div className="inline-flex items-center gap-2 bg-[#3DD4B0]/10 border border-[#3DD4B0]/30 rounded-full px-4 py-2 mb-8">
              <Gift className="w-4 h-4 text-[#3DD4B0]" />
              <span className="text-[#3DD4B0] text-sm font-medium">
                {getText('2 free questions for every visitor', 'سؤالان مجانيان لكل زائر')}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 text-lg font-bold"
                onClick={onStartChat}
              >
                <MessageCircle className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {getText('Start Chatting — 2 Free Questions', 'ابدأ المحادثة — سؤالان مجانيان')}
              </Button>
              <Link href="/quiz">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 h-14"
                >
                  {getText('Take Free Quiz', 'خذ الكويز المجاني')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl font-bold text-[#0F1C2E] mb-4 text-center">
              {getText('What Your Coach Helps With', 'ما يساعدك فيه المدرب')}
            </h2>
            <p className="text-slate-600 mb-12 text-center max-w-2xl mx-auto">
              {getText(
                'Grounded in psychology and neuroscience, your AI coach provides evidence-based guidance for real transformation.',
                'مبني على علم النفس والعلوم العصبية، يقدم مدربك إرشادات مبنية على الأدلة لتحول حقيقي.'
              )}
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
                      <f.icon className="h-7 w-7 text-[#3DD4B0]" />
                    </div>
                    <h3 className="font-semibold text-[#0F1C2E] mb-2">{getText(f.en, f.ar)}</h3>
                    <p className="text-sm text-slate-600">{getText(f.desc_en, f.desc_ar)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sample Questions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-8 text-center">
              {getText('Try Asking...', 'جرّب أن تسأل...')}
            </h2>
            <div className="space-y-4">
              {starters.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-[#F6F8FA] rounded-xl">
                  <MessageCircle className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700">{getText(s.en, s.ar)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#3DD4B0]" />
                <span className="text-sm text-slate-600">{getText('Private & Secure', 'خاص وآمن')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#3DD4B0]" />
                <span className="text-sm text-slate-600">{getText('2 Free Questions', 'سؤالان مجانيان')}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0F1C2E] to-slate-900 rounded-2xl p-8 text-white">
              <Lock className="w-8 h-8 text-[#3DD4B0] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                {getText('Unlimited Access from $27', 'وصول غير محدود مع الباقة الشاملة')}
              </h3>
              <p className="text-slate-300 mb-6">
                {getText(
                  'After your 2 free questions, continue with unlimited access. The Mastery subscription ($27/month) includes AI Coach + all 20 transformation tools. Your personal access token is sent after purchase confirmation.',
                  'بعد سؤاليك المجانيين، واصل مع وصول غير محدود. الباقة الشاملة تتضمن المدرب الذكي بالإضافة إلى جميع أدوات التحول الـ 15+. يتم إرسال رمز الوصول الشخصي بعد الشراء.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products/mastery">
                  <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-bold">
                    {getText('Get Access - from $27/mo', 'احصل على الباقة - $27/شهر')}
                    <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8"
                  onClick={onStartChat}
                >
                  {getText('Try 2 Free Questions', 'جرّب سؤالين مجاناً')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
// Main AI Coach Chat Page
// ============================================
export default function AIIdentityCoachPage() {
  const { locale } = useLocale();
  const isRTL = locale === 'ar';
  const getText = (en: string, ar: string) => (isRTL ? ar : en);

  // View state: 'landing' | 'chat' | 'limitReached'
  const [view, setView] = useState<'landing' | 'chat' | 'limitReached'>('landing');

  // Chat state
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [freeMessagesRemaining, setFreeMessagesRemaining] = useState(2);
  const [hasFullAccess, setHasFullAccess] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  // Check if user has full access (MASTERY tier)
  const checkFullAccess = useCallback(async (): Promise<boolean> => {
    try {
      // Check localStorage
      const storedAccess = localStorage.getItem('tamkinly_access');
      if (storedAccess) {
        const access = JSON.parse(storedAccess);
        const tierLevel = TIER_HIERARCHY[access.tier] || 0;
        if (tierLevel >= TIER_HIERARCHY['PREMIUM']) {
          setHasFullAccess(true);
          return true;
        }
      }
      // Check session
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data?.user?.accessTier) {
          const userTierLevel = TIER_HIERARCHY[data.user.accessTier] || 0;
          if (userTierLevel >= TIER_HIERARCHY['PREMIUM']) {
            setHasFullAccess(true);
            return true;
          }
        }
      }
    } catch {
      // No access
    }
    return false;
  }, []);

  // Start chat (from landing page)
  const startChat = useCallback(async () => {
    const hasAccess = await checkFullAccess();
    setHasFullAccess(hasAccess);
    initChat();
    setView('chat');
  }, [checkFullAccess]);

  // Initialize chat session
  const initChat = useCallback(() => {
    const existingSessionId = localStorage.getItem('tamkinly_coach_session');
    if (existingSessionId) {
      setSessionId(existingSessionId);
      loadConversation(existingSessionId);
    } else {
      const newId = generateSessionId();
      setSessionId(newId);
      localStorage.setItem('tamkinly_coach_session', newId);
    }
  }, []);

  // Load conversation from API
  const loadConversation = useCallback(async (sid: string) => {
    try {
      const res = await fetch(`/api/ai-coach?sessionId=${sid}`);
      if (res.ok) {
        const data = await res.json();
        if (data.messages && data.messages.length > 0) {
          setMessages(data.messages);
        }
        if (data.freeMessagesRemaining !== undefined) {
          setFreeMessagesRemaining(data.freeMessagesRemaining);
        }
        if (data.freeLimitReached && !hasFullAccess) {
          const hasAccess = await checkFullAccess();
          if (!hasAccess) {
            setView('limitReached');
          }
        }
      }
    } catch {
      // Start fresh
    }
  }, [hasFullAccess, checkFullAccess]);

  // Get access code from localStorage
  const getAccessCode = useCallback((): string | undefined => {
    try {
      const storedAccess = localStorage.getItem('tamkinly_access');
      if (storedAccess) {
        const access = JSON.parse(storedAccess);
        return access.code;
      }
    } catch {}
    return undefined;
  }, []);

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading || !sessionId) return;
      const trimmedContent = content.trim();
      setInputValue('');
      setError(null);
      const userMessage: Message = { role: 'user', content: trimmedContent, timestamp: new Date().toISOString() };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      try {
        const res = await fetch('/api/ai-coach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            message: trimmedContent,
            accessCode: hasFullAccess ? getAccessCode() : undefined,
          }),
        });
        const data = await res.json();

        // Handle free limit reached
        if (res.status === 403 && data.freeLimitReached) {
          setMessages((prev) => prev.slice(0, -1));
          setFreeMessagesRemaining(0);
          if (!hasFullAccess) {
            setView('limitReached');
            return;
          }
        }

        if (!res.ok) {
          if (data.unavailable) {
            setError(getText('AI Coach is temporarily unavailable. Please try again.', 'مدرب الهوية غير متاح مؤقتاً. يرجى المحاولة مرة أخرى.'));
          } else {
            setError(getText('Something went wrong. Please try again.', 'حدث خطأ ما. يرجى المحاولة مرة أخرى.'));
          }
          setMessages((prev) => prev.slice(0, -1));
          return;
        }

        const assistantMessage: Message = { role: 'assistant', content: data.response, timestamp: new Date().toISOString() };
        setMessages((prev) => [...prev, assistantMessage]);

        // Update free message count
        if (data.freeMessagesRemaining !== undefined) {
          setFreeMessagesRemaining(data.freeMessagesRemaining);
        }
      } catch {
        setError(getText('Network error. Please check your connection.', 'خطأ في الاتصال. يرجى التحقق من اتصالك.'));
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading, getText, hasFullAccess, getAccessCode]
  );

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(inputValue); };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(inputValue); }
  };

  const startNewConversation = () => {
    const newId = generateSessionId();
    setSessionId(newId);
    setMessages([]);
    setError(null);
    setFreeMessagesRemaining(2);
    localStorage.setItem('tamkinly_coach_session', newId);
  };

  const clearConversation = async () => {
    if (!sessionId) return;
    try { await fetch(`/api/ai-coach?sessionId=${sessionId}`, { method: 'DELETE' }); } catch {}
    startNewConversation();
  };

  // Handle access granted from limit reached screen
  const handleAccessGranted = useCallback(async () => {
    setHasFullAccess(true);
    setView('chat');
  }, []);

  // Landing page
  if (view === 'landing') {
    return <AICoachLanding locale={locale} onStartChat={startChat} />;
  }

  // Free limit reached
  if (view === 'limitReached') {
    return <FreeLimitReached locale={locale} onAccessGranted={handleAccessGranted} />;
  }

  // Chat interface
  const hasMessages = messages.length > 0;
  const userMsgCount = messages.filter(m => m.role === 'user').length;
  const starters = [
    { en: "I feel stuck and don't know how to move forward", ar: 'أشعر بالتعثر ولا أعرف كيف أتحرك للأمام' },
    { en: 'Help me understand my identity gap', ar: 'ساعدني في فهم فجوة هويتي' },
    { en: "I want to build better habits but keep failing", ar: 'أريد بناء عادات أفضل لكنني أفشل دائماً' },
    { en: 'How does the Tamkinly system work?', ar: 'كيف يعمل نظام تمكينلي؟' },
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/apps/ai-identity-coach" className="text-slate-500 hover:text-[#0F1C2E] transition-colors" onClick={() => setView('landing')}>
                <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''} `} />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#3DD4B0]" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-[#0F1C2E] leading-tight">{getText('AI Identity Coach', 'مدرب الهوية الذكي')}</h1>
                  <p className="text-[10px] text-slate-500 leading-tight">{getText('Powered by Tamkinly', 'مدعوم من تمكينلي')}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasFullAccess ? (
                <Badge variant="outline" className="text-[10px] border-[#3DD4B0]/50 text-[#1F6F78] bg-[#3DD4B0]/10">
                  {getText('FULL ACCESS', 'الباقة الشاملة')}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] border-[#cde7e9] text-[#2A8A94] bg-[#e6f3f4]">
                  {freeMessagesRemaining > 0
                    ? getText(`${freeMessagesRemaining} free left`, `\u0645\u062a\u0628\u0642\u064a ${freeMessagesRemaining} \u0645\u062c\u0627\u0646\u0627\u064b`)
                    : getText('Free limit reached', '\u0627\u0646\u062a\u0647\u062a \u0627\u0644\u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u0645\u062c\u0627\u0646\u064a\u0629')
                  }
                </Badge>
              )}
              {hasMessages && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#C97B7B]" onClick={clearConversation} title={getText('Clear', 'مسح')}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#3DD4B0]" onClick={startNewConversation} title={getText('New', 'جديد')}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Free trial notice */}
      {!hasFullAccess && freeMessagesRemaining > 0 && userMsgCount > 0 && (
        <div className="bg-[#3DD4B0]/5 border-b border-[#3DD4B0]/20 px-4 py-2 text-center">
          <p className="text-xs text-[#1F6F78]">
            <Gift className="w-3 h-3 inline mr-1" />
            {getText(
              `You have ${freeMessagesRemaining} free question${freeMessagesRemaining > 1 ? 's' : ''} remaining. Get Mastery ($27/mo) for unlimited access.`,
              `\u0645\u062a\u0628\u0642\u064a ${freeMessagesRemaining} \u0633\u0624\u0627\u0644${freeMessagesRemaining > 1 ? '\u0627\u0646' : ''} \u0645\u062c\u0627\u0646\u0627\u064b. \u0627\u062d\u0635\u0644 \u0639\u0644\u0649 \u0627\u0644\u0628\u0627\u0642\u0629 \u0627\u0644\u0634\u0627\u0645\u0644\u0629 \u0644\u0648\u0635\u0648\u0644 \u063a\u064a\u0631 \u0645\u062d\u062f\u0648\u062f.`
            )}
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-4">
          {!hasMessages ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
              <div className="max-w-lg w-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-[#3DD4B0]" />
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-3">{getText('AI Identity Coach', 'مدرب الهوية الذكي')}</h2>
                {!hasFullAccess && (
                  <p className="text-[#1F6F78] text-sm mb-2 font-medium">
                    <Gift className="w-4 h-4 inline mr-1" />
                    {getText('You have 2 free questions', 'لديك سؤالان مجانيان')}
                  </p>
                )}
                <p className="text-slate-600 mb-8">{getText('Your personal transformation companion. Ask anything about identity change, habits, or the Tamkinly system.', 'رفيق تحوّلك الشخصي. اسأل أي شيء عن تغيير الهوية أو العادات أو نظام تمكينلي.')}</p>
                <div className="space-y-3">
                  {starters.map((s, i) => (
                    <button key={i} onClick={() => sendMessage(isRTL ? s.ar : s.en)} className="w-full text-left rtl:text-right px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-[#3DD4B0] hover:bg-[#3DD4B0]/5 transition-all text-sm text-slate-700 hover:text-[#0F1C2E]">
                      <span className="text-[#3DD4B0] font-medium">{getText('Try:', 'جرّب:')} </span>{getText(s.en, s.ar)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, i) => <ChatMessage key={i} message={msg} locale={locale} />)}
              {isLoading && <TypingIndicator locale={locale} />}
            </>
          )}
          {error && (
            <div className="flex items-center gap-3 bg-[#F8EEEF] border border-[#D4A8AE] rounded-xl px-4 py-3 mb-4">
              <AlertCircle className="w-5 h-5 text-[#C97B7B] flex-shrink-0" />
              <p className="text-sm text-[#A86565] flex-1">{error}</p>
              <Button variant="ghost" size="sm" className="text-[#C97B7B] hover:text-[#A86565] hover:bg-[#F0E0E2]" onClick={() => { setError(null); const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user'); if (lastUserMsg) { setMessages((prev) => prev.slice(0, -1)); sendMessage(lastUserMsg.content); } }}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-3">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea ref={textareaRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder={getText('Ask your coach anything...', 'اسأل مدربك أي شيء...')} className="w-full min-h-[44px] max-h-[120px] resize-none bg-slate-50 border-slate-200 focus:border-[#3DD4B0] focus:ring-[#3DD4B0]/20 rounded-xl text-sm pr-4 pl-4 py-3" rows={1} disabled={isLoading} />
            </div>
            <Button type="submit" disabled={!inputValue.trim() || isLoading} className="bg-[#0F1C2E] hover:bg-[#1a2d42] text-white rounded-xl h-11 w-11 p-0 flex items-center justify-center flex-shrink-0 disabled:opacity-40">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''} `} />}
            </Button>
          </form>
          <p className="text-[10px] text-slate-400 mt-1.5 text-center">
            {hasFullAccess
              ? getText('AI Coach provides guidance, not therapy. Press Enter to send, Shift+Enter for new line.', 'يوفر المدرب إرشادات وليس علاجاً. اضغط Enter للإرسال، Shift+Enter لسطر جديد.')
              : getText(
                  `${freeMessagesRemaining} free question${freeMessagesRemaining !== 1 ? 's' : ''} remaining`,
                  `\u0645\u062a\u0628\u0642\u064a ${freeMessagesRemaining} \u0633\u0624\u0627\u0644${freeMessagesRemaining !== 1 ? '\u0627\u0646' : ''} \u0645\u062c\u0627\u0646\u0627\u064b`
                )
            }
          </p>
        </div>
      </div>
    </div>
  );
}
