'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  MessageSquare, 
  Send,
  CheckCircle2
} from "lucide-react";

// Hero Section
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-accent/30 text-accent bg-accent/10">
            Get in Touch
          </Badge>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Contact{" "}
            <span className="text-accent">Us</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Have questions about our products or methodology? We're here to help 
            you on your journey of transformation.
          </p>
        </div>
      </div>
    </section>
  );
}

// Contact Form Section
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In production, this would send to an API
    setSubmitted(true);
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 lg:p-10">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="font-serif text-2xl font-bold text-primary mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-slate-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24-48 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-serif text-2xl font-bold text-primary mb-2">
                      Send Us a Message
                    </h2>
                    <p className="text-slate-600">
                      Fill out the form below and we'll respond as soon as possible.
                    </p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">
                          Name
                        </label>
                        <Input 
                          id="name" 
                          name="name"
                          placeholder="Your name"
                          required
                          className="bg-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                          Email
                        </label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          required
                          className="bg-white"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                        Subject
                      </label>
                      <Input 
                        id="subject" 
                        name="subject"
                        placeholder="How can we help?"
                        required
                        className="bg-white"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-slate-700">
                        Message
                      </label>
                      <Textarea 
                        id="message" 
                        name="message"
                        placeholder="Tell us more about your question or feedback..."
                        rows={6}
                        required
                        className="bg-white resize-none"
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full bg-accent text-primary hover:bg-accent/90">
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
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
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-serif text-2xl font-bold text-primary mb-4">
            Other Ways to Reach Us
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-primary mb-2">Email</h3>
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
              <h3 className="font-semibold text-primary mb-2">Response Time</h3>
              <p className="text-slate-600 text-sm">
                We typically respond within 24-48 hours during business days.
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
