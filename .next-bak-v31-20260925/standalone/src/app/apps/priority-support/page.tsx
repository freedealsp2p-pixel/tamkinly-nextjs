'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Headphones, 
  ArrowRight,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Plus,
  ChevronRight,
  Zap,
  Shield,
  Users
} from 'lucide-react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  status: string;
  priority: string;
  createdAt: string;
  messages: { sender: string; message: string; date: string }[];
}

const categoryOptionsEn = [
  { value: 'TECHNICAL', label: 'Technical Issue', labelAr: 'مشكلة تقنية', icon: <Zap className="w-4 h-4" /> },
  { value: 'ACCESS', label: 'Access Problem', labelAr: 'مشكلة وصول', icon: <Shield className="w-4 h-4" /> },
  { value: 'BILLING', label: 'Billing Question', labelAr: 'استفسار فوترة', icon: <ArrowRight className="w-4 h-4" /> },
  { value: 'FEEDBACK', label: 'Feedback', labelAr: 'ملاحظات', icon: <MessageSquare className="w-4 h-4" /> },
  { value: 'GENERAL', label: 'General Inquiry', labelAr: 'استفسار عام', icon: <Users className="w-4 h-4" /> },
];

const priorityColors: Record<string, string> = {
  LOW: '#8A94A6',
  NORMAL: '#3DD4B0',
  HIGH: '#2A8A94',
  URGENT: '#C97B7B',
};

const statusColors: Record<string, { bg: string; text: string }> = {
  OPEN: { bg: '#3DD4B0/10', text: '#3DD4B0' },
  IN_PROGRESS: { bg: '#2A8A94/10', text: '#2A8A94' },
  WAITING: { bg: '#8A94A6/10', text: '#8A94A6' },
  RESOLVED: { bg: '#1F6F78/10', text: '#1F6F78' },
  CLOSED: { bg: '#0F1C2E/10', text: '#0F1C2E' },
};

export default function PrioritySupportPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const categoryOptions = categoryOptionsEn.map(cat => ({
    ...cat,
    label: locale === 'ar' ? cat.labelAr : cat.label
  }));

  const [showForm, setShowForm] = useState(false);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'GENERAL',
    message: ''
  });

  useEffect(() => {
    // Load tickets from localStorage
    const saved = localStorage.getItem('tamkinly-tickets');
    if (saved) {
      setTickets(JSON.parse(saved));
    }
  }, []);

  const handleSubmitTicket = async () => {
    if (!formData.email || !formData.subject || !formData.message) return;
    
    setLoading(true);
    
    try {
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const data = await response.json();
        const newTicket: Ticket = {
          id: data.ticket.id,
          ticketNumber: data.ticket.ticketNumber,
          subject: formData.subject,
          status: 'OPEN',
          priority: 'NORMAL',
          createdAt: new Date().toISOString(),
          messages: [{
            sender: getText('You', 'أنت'),
            message: formData.message,
            date: new Date().toISOString()
          }]
        };
        
        const updated = [newTicket, ...tickets];
        setTickets(updated);
        localStorage.setItem('tamkinly-tickets', JSON.stringify(updated));
        
        setFormData({ name: '', email: '', subject: '', category: 'GENERAL', message: '' });
        setShowForm(false);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Error submitting ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewMessage = (ticketId: string, message: string) => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [...t.messages, { sender: getText('You', 'أنت'), message, date: new Date().toISOString() }]
        };
      }
      return t;
    });
    setTickets(updated);
    localStorage.setItem('tamkinly-tickets', JSON.stringify(updated));
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {locale === 'ar' ? '→ العودة للتطبيقات' : '← Back to Apps'}
          </Link>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
                <Headphones className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <div>
                <Badge className="bg-[#0F1C2E] text-[#3DD4B0] border border-[#3DD4B0]">{getText('MASTERY', 'حزمة')}</Badge>
                <h1 className="text-xl font-bold">{getText('Priority Support', 'الدعم ذو الأولوية')}</h1>
              </div>
            </div>
            <Button
              onClick={() => setShowForm(true)}
              className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              <Plus className="w-4 h-4 mr-2" />
              {getText('New Ticket', 'تذكرة جديدة')}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                <Clock className="w-5 h-5 text-[#3DD4B0]" />
              </div>
              <h3 className="font-semibold text-[#0F1C2E] mb-1">{getText('24-Hour Response', 'رد خلال 24 ساعة')}</h3>
              <p className="text-xs text-[#8A94A6]">{getText('Guaranteed response within 24 hours', 'رد مضمون خلال 24 ساعة')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-3">
                <Shield className="w-5 h-5 text-[#1F6F78]" />
              </div>
              <h3 className="font-semibold text-[#0F1C2E] mb-1">{getText('Priority Handling', 'معاملة بأولوية')}</h3>
              <p className="text-xs text-[#8A94A6]">{getText('Your tickets get priority treatment', 'تذاكرك تحصل على معاملة بأولوية')}</p>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="pt-6 text-center">
              <div className="w-10 h-10 rounded-full bg-[#2A8A94]/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-5 h-5 text-[#2A8A94]" />
              </div>
              <h3 className="font-semibold text-[#0F1C2E] mb-1">{getText('Direct Support', 'دعم مباشر')}</h3>
              <p className="text-xs text-[#8A94A6]">{getText('Direct email support channel', 'قناة دعم مباشرة عبر البريد الإلكتروني')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {success && (
          <Card className="bg-[#3DD4B0]/10 border-[#3DD4B0] mb-8">
            <CardContent className="p-4 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
              <p className="text-[#3DD4B0]">{getText("Ticket submitted successfully! We'll respond within 24 hours.", 'تم إرسال التذكرة بنجاح! سنرد خلال 24 ساعة.')}</p>
            </CardContent>
          </Card>
        )}

        {/* New Ticket Form */}
        {showForm && (
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#3DD4B0]" />
                {getText('Submit a Support Ticket', 'إرسال تذكرة دعم')}
              </CardTitle>
              <CardDescription>
                {getText("Describe your issue and we'll get back to you within 24 hours", 'صف مشكلتك وسنعود إليك خلال 24 ساعة')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Name', 'الاسم')}</label>
                  <Input
                    placeholder={getText('Your name', 'اسمك')}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Email *', 'البريد الإلكتروني *')}</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Category', 'الفئة')}</label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <Badge
                      key={cat.value}
                      variant={formData.category === cat.value ? 'default' : 'outline'}
                      className={`cursor-pointer ${formData.category === cat.value ? 'bg-[#3DD4B0] text-[#0F1C2E]' : 'hover:bg-[#3DD4B0]/10'}`}
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                    >
                      {cat.icon}
                      <span className="ml-1">{cat.label}</span>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Subject *', 'الموضوع *')}</label>
                <Input
                  placeholder={getText('Brief description of your issue', 'وصف مختصر لمشكلتك')}
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#0F1C2E] mb-2">{getText('Message *', 'الرسالة *')}</label>
                <Textarea
                  placeholder={getText('Describe your issue in detail...', 'صف مشكلتك بالتفصيل...')}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  {getText('Cancel', 'إلغاء')}
                </Button>
                <Button
                  onClick={handleSubmitTicket}
                  disabled={!formData.email || !formData.subject || !formData.message || loading}
                  className="flex-1 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] disabled:opacity-50"
                >
                  {loading ? (
                    getText('Submitting...', 'جارٍ الإرسال...')
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {getText('Submit Ticket', 'إرسال التذكرة')}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tickets List */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-[#0F1C2E]">{getText('Your Tickets', 'تذاكرك')}</CardTitle>
            <CardDescription>
              {getText('Track and manage your support requests', 'تتبّع وأدِ طلبات الدعم الخاصة بك')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <Headphones className="w-12 h-12 text-[#8A94A6] mx-auto mb-4" />
                <p className="text-[#8A94A6]">{getText('No tickets yet. Need help? Submit a new ticket.', 'لا توجد تذاكر بعد. تحتاج مساعدة؟ أرسل تذكرة جديدة.')}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 bg-[#F6F8FA] rounded-lg cursor-pointer hover:bg-[#F6F8FA]/80 transition-colors"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#8A94A6]">{ticket.ticketNumber}</span>
                        <Badge 
                          style={{ 
                            backgroundColor: statusColors[ticket.status]?.bg || '#8A94A6/10',
                            color: statusColors[ticket.status]?.text || '#8A94A6'
                          }}
                        >
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#8A94A6]" />
                    </div>
                    <h4 className="font-medium text-[#0F1C2E]">{ticket.subject}</h4>
                    <p className="text-xs text-[#8A94A6] mt-1">
                      {new Date(ticket.createdAt).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US')} • {ticket.messages.length} {getText('messages', 'رسائل')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Ticket Detail Modal */}
        {selectedTicket && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white max-w-lg w-full max-h-[80vh] overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-[#0F1C2E] text-lg">{selectedTicket.subject}</CardTitle>
                    <p className="text-xs text-[#8A94A6]">{selectedTicket.ticketNumber}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedTicket(null)}>
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="overflow-y-auto max-h-[50vh]">
                <div className="space-y-4">
                  {selectedTicket.messages.map((msg, i) => (
                    <div key={i} className={`p-3 rounded-lg ${msg.sender === getText('You', 'أنت') ? 'bg-[#3DD4B0]/10' : 'bg-[#F6F8FA]'}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-[#0F1C2E]">{msg.sender}</span>
                        <span className="text-xs text-[#8A94A6]">
                          {new Date(msg.date).toLocaleString(locale === 'ar' ? 'ar-SA' : 'en-US')}
                        </span>
                      </div>
                      <p className="text-sm text-[#2B2E34]">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input placeholder={getText('Type your reply...', 'اكتب ردّك...')} className="flex-1" />
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
);
}
