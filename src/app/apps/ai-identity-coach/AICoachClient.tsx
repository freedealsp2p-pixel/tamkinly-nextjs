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
  FREE: 0, TRIAL: 1, BASIC: 2, PREMIUM: 3, BUNDLE: 4,
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
// Landing Page Component (visible to all visitors)
// ============================================
function AICoachLanding({ locale, onAccessCheck }: { locale: string; onAccessCheck: () => void }) {
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
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              {getText(
                'Your personal transformation companion powered by AI. Ask anything about identity change, habits, or the Tamkinly system. Available 24/7 with personalized guidance.',
                'رفيق تحوّلك الشخصي المدعوم بالذكاء الاصطناعي. اسأل أي شيء عن تغيير الهوية أو العادات أو نظام تمكينلي. متاح على مدار الساعة مع إرشادات مخصصة.'
              )}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 text-lg font-bold"
                onClick={onAccessCheck}
              >
                <MessageCircle className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {getText('Start Chatting', 'ابدأ المحادثة')}
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
                <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                <span className="text-sm text-slate-600">{getText('No Email Required', 'بدون بريد إلكتروني')}</span>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#0F1C2E] to-slate-900 rounded-2xl p-8 text-white">
              <Lock className="w-8 h-8 text-[#3DD4B0] mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold mb-3">
                {getText('Available with Complete Bundle', 'متاح مع الباقة الشاملة')}
              </h3>
              <p className="text-slate-300 mb-6">
                {getText(
                  'The AI Identity Coach is part of the Complete Bundle, our most popular package. Get unlimited access to the coach plus all 15+ transformation tools.',
                  'مدرب الهوية الذكي جزء من الباقة الشاملة، أكثر باقاتنا شعبية. احصل على وصول غير محدود للمدرب بالإضافة إلى جميع أدوات التحول الـ 15+.'
                )}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/products/bundle">
                  <Button size="lg" className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 font-bold">
                    {getText('Get Bundle - $47', 'احصل على الباقة - $47')}
                    <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-5 w-5`} />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8"
                  onClick={onAccessCheck}
                >
                  {getText('I Have Access', 'لدي وصول')}
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
// Access Gate Component (shown when user doesn't have BUNDLE access)
// ============================================
function AccessGate({ locale, onAccessGranted }: { locale: string; onAccessGranted: () => void }) {
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
        localStorage.setItem('tamkinly_access', JSON.stringify({
          tier: data.tier || 'BUNDLE',
          code: accessCode.trim(),
          verifiedAt: new Date().toISOString(),
        }));
        onAccessGranted();
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
    <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <Card className="max-w-md w-full border-2 border-[#3DD4B0]/30 shadow-lg">
        <CardContent className="p-8 text-center">
          <Lock className="w-12 h-12 text-[#3DD4B0] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-2">
            {getText('Unlock AI Coach', 'فتح المدرب الذكي')}
          </h2>
          <p className="text-slate-600 mb-6">
            {getText('Enter your access code or get the Complete Bundle', 'أدخل رمز الوصول أو احصل على الباقة الشاملة')}
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              placeholder="TMLY-XXXX-XXXX"
              className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:border-[#3DD4B0] focus:outline-none font-mono text-sm"
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <Button onClick={handleVerify} disabled={verifying || !accessCode.trim()} className="bg-[#0F1C2E] hover:bg-[#1a2d42] text-white">
              {verifying ? '...' : getText('Verify', 'تحقق')}
            </Button>
          </div>
          {codeError && <p className="text-sm text-[#FC6D26] mb-4">{codeError}</p>}
          <Link href="/products/bundle">
            <Button className="w-full bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
              {getText('Get Complete Bundle - $47', 'احصل على الباقة الشاملة - $47')}
            </Button>
          </Link>
        </CardContent>
      </Card>
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

  // View state: 'landing' | 'gate' | 'chat'
  const [view, setView] = useState<'landing' | 'gate' | 'chat'>('landing');
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);

  // Chat state
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Check if user has BUNDLE access
  const checkAccess = useCallback(async () => {
    setIsCheckingAccess(true);
    try {
      // Check localStorage
      const storedAccess = localStorage.getItem('tamkinly_access');
      if (storedAccess) {
        const access = JSON.parse(storedAccess);
        const tierLevel = TIER_HIERARCHY[access.tier] || 0;
        if (tierLevel >= TIER_HIERARCHY['BUNDLE']) {
          setView('chat');
          initChat();
          return;
        }
      }
      // Check session
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        if (data?.user?.accessTier) {
          const userTierLevel = TIER_HIERARCHY[data.user.accessTier] || 0;
          if (userTierLevel >= TIER_HIERARCHY['BUNDLE']) {
            setView('chat');
            initChat();
            return;
          }
        }
      }
      // No access - show gate
      setView('gate');
    } catch {
      setView('gate');
    } finally {
      setIsCheckingAccess(false);
    }
  }, []);

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
      }
    } catch {
      // Start fresh
    }
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
          body: JSON.stringify({ sessionId, message: trimmedContent }),
        });
        const data = await res.json();
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
      } catch {
        setError(getText('Network error. Please check your connection.', 'خطأ في الاتصال. يرجى التحقق من اتصالك.'));
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading, getText]
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
    localStorage.setItem('tamkinly_coach_session', newId);
  };

  const clearConversation = async () => {
    if (!sessionId) return;
    try { await fetch(`/api/ai-coach?sessionId=${sessionId}`, { method: 'DELETE' }); } catch {}
    startNewConversation();
  };

  // Loading state while checking access
  if (isCheckingAccess) {
    return (
      <div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3DD4B0] animate-spin" />
      </div>
    );
  }

  // Landing page - SSR handles the visual landing, auto-check access here
  if (view === 'landing') {
    // Auto-trigger access check since the SSR component handles the visual landing
    if (!isCheckingAccess) {
      checkAccess();
    }
    return null;
  }

  // Access gate
  if (view === 'gate') {
    return <AccessGate locale={locale} onAccessGranted={() => { setView('chat'); initChat(); }} />;
  }

  // Chat interface
  const hasMessages = messages.length > 0;
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
              <Badge variant="outline" className="text-[10px] border-[#3DD4B0]/50 text-[#1F6F78] bg-[#3DD4B0]/10">
                {getText('BUNDLE', 'الباقة الشاملة')}
              </Badge>
              {hasMessages && (
                <>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#FC6D26]" onClick={clearConversation} title={getText('Clear', 'مسح')}>
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
            <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#FFB088] rounded-xl px-4 py-3 mb-4">
              <AlertCircle className="w-5 h-5 text-[#FC6D26] flex-shrink-0" />
              <p className="text-sm text-[#E55A10] flex-1">{error}</p>
              <Button variant="ghost" size="sm" className="text-[#FC6D26] hover:text-[#C44D0A] hover:bg-[#FFE4CC]" onClick={() => { setError(null); const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user'); if (lastUserMsg) { setMessages((prev) => prev.slice(0, -1)); sendMessage(lastUserMsg.content); } }}>
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
            {getText('AI Coach provides guidance, not therapy. Press Enter to send, Shift+Enter for new line.', 'يوفر المدرب إرشادات وليس علاجاً. اضغط Enter للإرسال، Shift+Enter لسطر جديد.')}
          </p>
        </div>
      </div>
    </div>
  );
}
