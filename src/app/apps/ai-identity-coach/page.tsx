'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Send,
  Trash2,
  Plus,
  ArrowLeft,
  Loader2,
  Bot,
  User,
  AlertCircle,
  RefreshCw,
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
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser
            ? 'bg-[#0F1C2E] text-white'
            : 'bg-[#3DD4B0]/20 text-[#1F6F78]'
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Bubble */}
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
  const isRTL = locale === 'ar';
  return (
    <div className={`flex gap-3 flex-row mb-4`} dir={isRTL ? 'rtl' : 'ltr'}>
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
// Welcome Screen Component
// ============================================
function WelcomeScreen({ locale, onStart }: { locale: string; onStart: () => void }) {
  const isRTL = locale === 'ar';
  const getText = (en: string, ar: string) => (isRTL ? ar : en);

  const starters = [
    {
      en: "I feel stuck and don't know how to move forward",
      ar: 'أشعر بالتعثر ولا أعرف كيف أتحرك للأمام',
    },
    {
      en: 'Help me understand my identity gap',
      ar: 'ساعدني في فهم فجوة هويتي',
    },
    {
      en: "I want to build better habits but keep failing",
      ar: 'أريد بناء عادات أفضل لكنني أفشل دائماً',
    },
    {
      en: "How does the Tamkinly system work?",
      ar: 'كيف يعمل نظام تمكينلي؟',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg w-full text-center">
        {/* Logo Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#3DD4B0]/20 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-8 h-8 text-[#3DD4B0]" />
        </div>

        <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-3">
          {getText('AI Identity Coach', 'مدرب الهوية الذكي')}
        </h2>

        <p className="text-slate-600 mb-8">
          {getText(
            'Your personal transformation companion. Ask anything about identity change, habits, or the Tamkinly system.',
            'رفيق تحوّلك الشخصي. اسأل أي شيء عن تغيير الهوية أو العادات أو نظام تمكينلي.'
          )}
        </p>

        {/* Conversation Starters */}
        <div className="space-y-3">
          {starters.map((starter, index) => (
            <button
              key={index}
              onClick={() => onStart(isRTL ? starter.ar : starter.en)}
              className="w-full text-left rtl:text-right px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-[#3DD4B0] hover:bg-[#3DD4B0]/5 transition-all text-sm text-slate-700 hover:text-[#0F1C2E]"
            >
              <span className="text-[#3DD4B0] font-medium">{getText('Try:', 'جرّب:')}</span>{' '}
              {getText(starter.en, starter.ar)}
            </button>
          ))}
        </div>
      </div>
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

  // State
  const [sessionId, setSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Initialize session
  useEffect(() => {
    const existingSessionId = localStorage.getItem('tamkinly_coach_session');
    if (existingSessionId) {
      setSessionId(existingSessionId);
      // Load existing conversation
      loadConversation(existingSessionId);
    } else {
      const newId = generateSessionId();
      setSessionId(newId);
      localStorage.setItem('tamkinly_coach_session', newId);
    }
    setIsInitialized(true);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

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
      // Silently fail - start fresh
    }
  }, []);

  // Send message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading || !sessionId) return;

      const trimmedContent = content.trim();
      setInputValue('');
      setError(null);

      // Add user message immediately
      const userMessage: Message = {
        role: 'user',
        content: trimmedContent,
        timestamp: new Date().toISOString(),
      };
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
            setError(
              getText(
                'AI Coach is temporarily unavailable. Please try again in a moment.',
                'مدرب الهوية غير متاح مؤقتاً. يرجى المحاولة مرة أخرى.'
              )
            );
          } else {
            setError(
              getText(
                'Something went wrong. Please try again.',
                'حدث خطأ ما. يرجى المحاولة مرة أخرى.'
              )
            );
          }
          // Remove the user message if the request failed
          setMessages((prev) => prev.slice(0, -1));
          return;
        }

        // Add AI response
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } catch {
        setError(
          getText(
            'Network error. Please check your connection and try again.',
            'خطأ في الاتصال. يرجى التحقق من اتصالك والمحاولة مرة أخرى.'
          )
        );
        setMessages((prev) => prev.slice(0, -1));
      } finally {
        setIsLoading(false);
      }
    },
    [sessionId, isLoading, getText]
  );

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  // Handle textarea key press (Enter to send, Shift+Enter for newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  // Start new conversation
  const startNewConversation = () => {
    const newId = generateSessionId();
    setSessionId(newId);
    setMessages([]);
    setError(null);
    localStorage.setItem('tamkinly_coach_session', newId);
  };

  // Clear conversation
  const clearConversation = async () => {
    if (!sessionId) return;
    try {
      await fetch(`/api/ai-coach?sessionId=${sessionId}`, { method: 'DELETE' });
    } catch {
      // Ignore errors
    }
    startNewConversation();
  };

  // Handle starter click
  const handleStarterClick = (text: string) => {
    sendMessage(text);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  if (!isInitialized) {
    return (
<div className="min-h-screen bg-[#F6F8FA] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#3DD4B0] animate-spin" />
      </div>
);
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen bg-[#F6F8FA] flex flex-col" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Left: Back + Title */}
            <div className="flex items-center gap-3">
              <Link
                href="/apps"
                className="text-slate-500 hover:text-[#0F1C2E] transition-colors"
              >
                <ArrowLeft className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#3DD4B0]" />
                </div>
                <div>
                  <h1 className="text-sm font-bold text-[#0F1C2E] leading-tight">
                    {getText('AI Identity Coach', 'مدرب الهوية الذكي')}
                  </h1>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {getText('Powered by Tamkinly', 'مدعوم من تمكينلي')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="text-[10px] border-[#3DD4B0]/50 text-[#1F6F78] bg-[#3DD4B0]/10"
              >
                {getText('BUNDLE', 'الباقة الشاملة')}
              </Badge>
              {hasMessages && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-[#FC6D26]"
                    onClick={clearConversation}
                    title={getText('Clear conversation', 'مسح المحادثة')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-[#3DD4B0]"
                    onClick={startNewConversation}
                    title={getText('New conversation', 'محادثة جديدة')}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-4">
          {!hasMessages ? (
            <WelcomeScreen locale={locale} onStart={handleStarterClick} />
          ) : (
            <>
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg} locale={locale} />
              ))}
              {isLoading && <TypingIndicator locale={locale} />}
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-3 bg-[#FFF3E8] border border-[#FFB088] rounded-xl px-4 py-3 mb-4">
              <AlertCircle className="w-5 h-5 text-[#FC6D26] flex-shrink-0" />
              <p className="text-sm text-[#E55A10] flex-1">{error}</p>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#FC6D26] hover:text-[#C44D0A] hover:bg-[#FFE4CC]"
                onClick={() => {
                  setError(null);
                  // Retry last user message
                  const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
                  if (lastUserMsg) {
                    setMessages((prev) => prev.slice(0, -1)); // Remove failed message
                    sendMessage(lastUserMsg.content);
                  }
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-white border-t border-slate-200 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-3">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={getText(
                  'Ask your coach anything...',
                  'اسأل مدربك أي شيء...'
                )}
                className="w-full min-h-[44px] max-h-[120px] resize-none bg-slate-50 border-slate-200 focus:border-[#3DD4B0] focus:ring-[#3DD4B0]/20 rounded-xl text-sm pr-4 pl-4 py-3"
                rows={1}
                disabled={isLoading}
              />
            </div>
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-[#0F1C2E] hover:bg-[#1a2d42] text-white rounded-xl h-11 w-11 p-0 flex items-center justify-center flex-shrink-0 disabled:opacity-40"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              )}
            </Button>
          </form>
          <p className="text-[10px] text-slate-400 mt-1.5 text-center">
            {getText(
              'AI Coach provides guidance, not therapy. Press Enter to send, Shift+Enter for new line.',
              'يوفر المدرب إرشادات وليس علاجاً. اضغط Enter للإرسال، Shift+Enter لسطر جديد.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}