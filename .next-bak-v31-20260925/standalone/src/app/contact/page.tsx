'use client';

import { useState, FormEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MessageSquare, 
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield
} from "lucide-react";
import { Recaptcha } from "@/components/Recaptcha";
import { useTranslations } from "@/components/providers/LocaleProvider";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
  errors?: string[];
}

// Hero Section
function HeroSection() {
  const t = useTranslations("contactPage");
  
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
            {t("heroBadge")}
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {t("heroTitle")}&nbsp;<span className="text-accent">{t("heroHighlight")}</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            {t("heroSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}

// Contact Form Section
function ContactSection() {
  const t = useTranslations("contactPage");
  
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  const handleRecaptchaVerify = useCallback((token: string) => {
    setRecaptchaToken(token);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear errors when user starts typing
    if (status.type === 'error') {
      setStatus({ type: 'idle' });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ 
          type: 'success', 
          message: data.message || t("messageSent")
        });
        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
        setRecaptchaToken('');
      } else {
        setStatus({ 
          type: 'error', 
          message: data.error || t("sendFailed"),
          errors: data.errors 
        });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus({ 
        type: 'error', 
        message: t("unexpectedError")
      });
    }
  };

  const resetForm = () => {
    setStatus({ type: 'idle' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 lg:p-10">
              {status.type === 'success' ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-primary mb-2">
                    {t("messageSent")}
                  </h2>
                  <p className="text-slate-600 mb-6">
                    {status.message || t("thankYou")}
                  </p>
                  <Button onClick={resetForm} variant="outline">
                    {t("sendAnother")}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-2xl font-bold text-primary mb-2">
                      {t("formTitle")}
                    </h2>
                    <p className="text-slate-600">
                      {t("formSubtitle")}
                    </p>
                  </div>
                  
                  {status.type === 'error' && (
                    <div className="mb-6 p-4 bg-[#F8EEEF] border border-[#D4A8AE] rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-[#C97B7B] flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-[#A86565]">
                            {status.message || t("errorTitle")}
                          </p>
                          {status.errors && status.errors.length > 0 && (
                            <ul className="mt-2 text-sm text-[#C97B7B] list-disc list-inside">
                              {status.errors.map((error, index) => (
                                <li key={index}>{error}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">
                          {t("nameLabel")}
                        </label>
                        <Input 
                          id="name" 
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t("namePlaceholder")}
                          required
                          disabled={status.type === 'loading'}
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                          {t("emailLabel")}
                        </label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t("emailPlaceholder")}
                          required
                          disabled={status.type === 'loading'}
                          className="bg-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                        {t("subjectLabel")}
                      </label>
                      <Input 
                        id="subject" 
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder={t("subjectPlaceholder")}
                        required
                        disabled={status.type === 'loading'}
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-700">
                        {t("messageLabel")}
                      </label>
                      <Textarea 
                        id="message" 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={t("messagePlaceholder")}
                        rows={6}
                        required
                        disabled={status.type === 'loading'}
                        className="bg-white resize-none"
                      />
                    </div>
                    
                    {/* reCAPTCHA */}
                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                      <Shield className="h-4 w-4" />
                      <span>{t("protectedByRecaptcha")}</span>
                    </div>
                    <Recaptcha onVerify={handleRecaptchaVerify} action="contact_form" />
                    
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-accent text-primary hover:bg-accent/90"
                      disabled={status.type === 'loading'}
                    >
                      {status.type === 'loading' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("sending")}
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t("sendButton")}
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Alternative Contact Methods
function AlternativeSection() {
  const t = useTranslations("contactPage");
  
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">
            {t("otherWaysTitle")}
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{t("emailCard")}</h3>
              <a href="mailto:hello@tamkinly.com" className="text-accent hover:underline">
                hello@tamkinly.com
              </a>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-primary mb-2">{t("responseTimeCard")}</h3>
              <p className="text-slate-600 text-sm">
                {t("responseTimeDesc")}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function ContactPage() {
  return (
    <>
      <HeroSection />
      <ContactSection />
      <AlternativeSection />
    </>
  );
}
