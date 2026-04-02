'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Send, 
  RotateCcw,
  User,
  Bot,
  Loader2,
  Lightbulb,
  Target,
  Heart,
  Brain
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  {
    category: 'Identity Discovery',
    icon: <User className="w-4 h-4" />,
    prompts: [
      'How do I discover my true identity?',
      'What\'s the difference between who I am and who I want to be?',
      'How can I define my target identity?'
    ]
  },
  {
    category: 'Habit Formation',
    icon: <Target className="w-4 h-4" />,
    prompts: [
      'How does identity-based habit formation work?',
      'What are "identity votes" and how do I use them?',
      'How do I make habits stick?'
    ]
  },
  {
    category: 'Self-Authorship',
    icon: <Brain className="w-4 h-4" />,
    prompts: [
      'What is self-authorship and why does it matter?',
      'How do I develop my internal voice?',
      'Am I following external formulas or my own path?'
    ]
  },
  {
    category: 'Emotion Regulation',
    icon: <Heart className="w-4 h-4" />,
    prompts: [
      'How can I better regulate my emotions?',
      'What is cognitive reappraisal?',
      'How do emotions affect identity change?'
    ]
  }
];

export default function AIIdentityCoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText?: string) => {
    const text = messageText || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: text
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        const errorMessage: Message = {
          role: 'assistant',
          content: 'I apologize, but I encountered an error. Please try again.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I\'m having trouble connecting right now. Please check your connection and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearConversation = async () => {
    try {
      await fetch(`/api/ai-coach?sessionId=${sessionId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error clearing conversation:', error);
    }
    setMessages([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            ← Back to Apps
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0]/50 mb-1">BUNDLE</Badge>
                <h1 className="text-xl font-bold">AI Identity Coach</h1>
                <p className="text-slate-400 text-sm">Your 24/7 transformation companion</p>
              </div>
            </div>
            <Button
              onClick={handleClearConversation}
              variant="accent"
              className="shadow-md"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white h-[600px] flex flex-col">
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <div>
                      <Sparkles className="w-12 h-12 text-[#3DD4B0] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#0F1C2E] mb-2">
                        Welcome to AI Identity Coach
                      </h3>
                      <p className="text-[#8A94A6] mb-4 max-w-sm mx-auto">
                        I'm here to help you discover, define, and become the person you want to be.
                        Ask me anything about identity transformation.
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">Identity Change</Badge>
                        <Badge className="bg-[#1F6F78]/10 text-[#1F6F78]">Habits</Badge>
                        <Badge className="bg-[#BA68C8]/10 text-[#BA68C8]">Self-Authorship</Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-[#3DD4B0]" />
                          </div>
                        )}
                        <div
                          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                            msg.role === 'user'
                              ? 'bg-[#0F1C2E] text-white'
                              : 'bg-[#F6F8FA] text-[#0F1C2E]'
                          }`}
                        >
                          <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                          <p className={`text-xs mt-1 ${
                            msg.role === 'user' ? 'text-white/60' : 'text-[#8A94A6]'
                          }`}>
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-8 h-8 rounded-lg bg-[#0F1C2E] flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-[#3DD4B0]" />
                        </div>
                        <div className="bg-[#F6F8FA] rounded-2xl px-4 py-3">
                          <Loader2 className="w-4 h-4 animate-spin text-[#3DD4B0]" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </CardContent>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about identity transformation, habits, or self-authorship..."
                    className="min-h-[44px] max-h-32 resize-none border-[#1F6F78]/20 focus:border-[#3DD4B0]"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] h-11"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Suggested Prompts */}
          <div className="space-y-4">
            <Card className="bg-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-[#0F1C2E] flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#FFB74D]" />
                  Suggested Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedPrompts.map((category, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-[#8A94A6]">{category.icon}</div>
                      <span className="text-sm font-medium text-[#0F1C2E]">{category.category}</span>
                    </div>
                    <div className="space-y-2">
                      {category.prompts.map((prompt, pIndex) => (
                        <button
                          key={pIndex}
                          onClick={() => handleSend(prompt)}
                          className="w-full text-left text-xs p-2 bg-[#F6F8FA] rounded-lg hover:bg-[#3DD4B0]/10 transition-colors text-[#2B2E34]"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="bg-[#0F1C2E]">
              <CardContent className="p-4">
                <h4 className="text-white font-medium mb-2">About AI Identity Coach</h4>
                <p className="text-slate-400 text-xs mb-3">
                  Powered by evidence-based psychology frameworks including Atomic Habits, 
                  Self-Authorship Theory, and Cognitive Behavioral approaches.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#3DD4B0]">
                  <Sparkles className="w-3 h-3" />
                  BUNDLE Exclusive Feature
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
