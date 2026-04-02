'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Download,
  Star,
  Clock,
  FileText,
  Heart,
  Sparkles,
  Monitor,
  BookOpen,
  Calendar,
  Award,
  ExternalLink,
  Loader2,
  Target,
  Users,
  TrendingUp,
  Lock,
  Brain,
  Headphones,
  Sun,
  User,
  Home,
  GitBranch,
  BarChart3
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { JsonLd } from "@/components/seo/JsonLd";
import { generateProductSchema, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

// Product URLs mapping
const PRODUCT_URLS: Record<string, string> = {
  'trial': '/products/trial',
  'planner': '/products/planner',
  'premium': '/products/premium',
  'bundle': '/products/bundle',
};

// App icons mapping
const appIcons: Record<string, React.ElementType> = {
  'Brain': Brain,
  'Heart': Heart,
  'Sun': Sun,
  'Calendar': Calendar,
  'User': User,
  'Home': Home,
  'GitBranch': GitBranch,
  'TrendingUp': TrendingUp,
  'BarChart3': BarChart3,
  'Sparkles': Sparkles,
  'Users': Users,
  'Headphones': Headphones,
  'BookOpen': BookOpen,
  'FileText': FileText,
};

// Product data with access tiers
const products = [
  {
    id: "free",
    name: "Free Starter",
    shortName: "Free",
    price: 0,
    comparePrice: 0,
    tier: "FREE",
    description: "Start your transformation journey with free powerful tools. No credit card required.",
    features: [
      "Identity Gap Assessment",
      "Values Clarification Tool", 
      "Daily Reflection Prompt",
      "Basic progress tracking",
      "Email support"
    ],
    apps: ["identity-gap-quiz", "values-clarification", "daily-reflection"],
    highlights: [
      "Free forever",
      "No credit card",
      "Instant access"
    ],
    icon: Sparkles,
    color: "#3DD4B0",
    cta: "Start Free",
    popular: false
  },
  {
    id: "trial",
    name: "7-Day Trial",
    shortName: "Trial",
    price: 7,
    comparePrice: 15,
    tier: "TRIAL",
    description: "Experience the full Identity Recode system for 7 days. Perfect for testing the methodology.",
    features: [
      "7-Day Guided Journey",
      "Daily identity prompts",
      "Evidence tracking",
      "Progress dashboard",
      "Email support"
    ],
    apps: ["trial-planner", "identity-gap-quiz", "values-clarification", "daily-reflection"],
    highlights: [
      "Full system access",
      "7 days",
      "Low risk"
    ],
    icon: Clock,
    featured: false,
    popular: false
  },
  {
    id: "planner",
    name: "Identity Recode Planner",
    shortName: "The Planner",
    price: 17,
    comparePrice: 29,
    tier: "BASIC",
    description: "The complete 30-day transformation system with interactive apps and PDF downloads.",
    features: [
      "30-Day Identity Planner",
      "Executive Manual",
      "Identity Baseline Worksheet",
      "Environmental Audit",
      "Digital + Print PDFs",
      "Lifetime access"
    ],
    apps: ["executive-manual", "daily-planner", "identity-baseline", "environmental-audit"],
    highlights: [
      "Most popular",
      "Print included",
      "30-day journey"
    ],
    icon: Calendar,
    featured: true,
    popular: true
  },
  {
    id: "premium",
    name: "Premium Transformation",
    shortName: "Premium",
    price: 27,
    comparePrice: 44,
    tier: "PREMIUM",
    description: "Everything in Planner plus advanced analytics and decision tracking tools.",
    features: [
      "Everything in Planner ($17 value)",
      "Decision Pattern Analysis",
      "Evidence Tracking System",
      "Progress Dashboard",
      "Advanced analytics",
      "Priority support"
    ],
    apps: ["executive-manual", "daily-planner", "identity-baseline", "environmental-audit", "decision-analysis", "evidence-tracking", "progress-dashboard"],
    highlights: [
      "Best value",
      "Save $17",
      "Analytics included"
    ],
    icon: Award,
    featured: true,
    popular: false
  },
  {
    id: "bundle",
    name: "Complete Bundle",
    shortName: "Bundle",
    price: 47,
    comparePrice: 91,
    tier: "BUNDLE",
    description: "The ultimate package: All apps + AI coaching + community access + priority support.",
    features: [
      "All PDF products ($44 value)",
      "All Interactive Apps",
      "AI Identity Coach",
      "Transformation Community",
      "Emotion Regulation (ERQ)",
      "Priority Support (24hr response)",
      "Monthly live Q&A sessions",
      "Direct founder access"
    ],
    apps: ["executive-manual", "daily-planner", "identity-baseline", "environmental-audit", "decision-analysis", "evidence-tracking", "progress-dashboard", "emotion-regulation", "ai-identity-coach", "community-access", "priority-support"],
    highlights: [
      "Save $44",
      "AI coaching",
      "VIP access"
    ],
    icon: Monitor,
    featured: true,
    popular: false,
    isBundle: true
  }
];

// Hero Section
function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-16 lg:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 px-4 py-2 border-[#3DD4B0]/30 text-[#3DD4B0] bg-[#3DD4B0]/10">
            <Zap className="w-3.5 h-3.5 mr-2" />
            Value Ladder: Start Free, Upgrade Anytime
          </Badge>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Choose Your 
            <span className="text-[#3DD4B0]"> Transformation Path</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Start free with powerful identity tools, then upgrade as you grow. 
            <span className="text-white font-semibold">No pressure. No commitment.</span> 
            Real transformation at your pace.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm">
              <Users className="h-5 w-5 text-[#3DD4B0]" />
              <span className="text-white text-sm">
                <span className="font-bold">15</span> Interactive Apps
              </span>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#3DD4B0]" />
              <span>30-Day Money Back</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="h-4 w-4 text-[#3DD4B0]" />
              <span>Instant Access</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#3DD4B0]" />
              <span>Lifetime Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// App Access Matrix Section
function AppMatrixSection() {
  const allApps = [
    { name: "Identity Gap Assessment", free: true, trial: true, basic: true, premium: true, bundle: true },
    { name: "Values Clarification", free: true, trial: true, basic: true, premium: true, bundle: true },
    { name: "Daily Reflection", free: true, trial: true, basic: true, premium: true, bundle: true },
    { name: "7-Day Trial Planner", free: false, trial: true, basic: true, premium: true, bundle: true },
    { name: "Executive Manual", free: false, trial: false, basic: true, premium: true, bundle: true },
    { name: "30-Day Identity Planner", free: false, trial: false, basic: true, premium: true, bundle: true },
    { name: "Identity Baseline Worksheet", free: false, trial: false, basic: true, premium: true, bundle: true },
    { name: "Environmental Audit", free: false, trial: false, basic: true, premium: true, bundle: true },
    { name: "Decision Pattern Analysis", free: false, trial: false, basic: false, premium: true, bundle: true },
    { name: "Evidence Tracking System", free: false, trial: false, basic: false, premium: true, bundle: true },
    { name: "Progress Dashboard", free: false, trial: false, basic: false, premium: true, bundle: true },
    { name: "Emotion Regulation (ERQ)", free: false, trial: false, basic: false, premium: false, bundle: true },
    { name: "AI Identity Coach", free: false, trial: false, basic: false, premium: false, bundle: true },
    { name: "Transformation Community", free: false, trial: false, basic: false, premium: false, bundle: true },
    { name: "Priority Support", free: false, trial: false, basic: false, premium: false, bundle: true },
  ];

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
              <Monitor className="w-3 h-3 mr-1" />
              App Access Matrix
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
              See What&apos;s Included in Each Package
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Transparent pricing. Know exactly what you&apos;re getting before you buy.
            </p>
          </div>
          
          {/* Mobile View */}
          <div className="lg:hidden space-y-4">
            {products.map((product) => (
              <Card key={product.id} className={`border-2 ${product.popular ? 'border-[#3DD4B0]' : 'border-slate-200'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#0F1C2E]">{product.name}</h3>
                    <Badge style={{ backgroundColor: product.color, color: product.id === 'free' ? '#0F1C2E' : 'white' }}>
                      {product.price === 0 ? 'Free' : `$${product.price}`}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    {allApps.map((app, idx) => {
                      const hasAccess = product.tier === 'FREE' ? app.free :
                                       product.tier === 'TRIAL' ? app.trial :
                                       product.tier === 'BASIC' ? app.basic :
                                       product.tier === 'PREMIUM' ? app.premium :
                                       app.bundle;
                      return (
                        <div key={idx} className={`flex items-center gap-2 text-sm ${hasAccess ? 'text-slate-700' : 'text-slate-300'}`}>
                          {hasAccess ? (
                            <CheckCircle2 className="w-4 h-4 text-[#3DD4B0]" />
                          ) : (
                            <Lock className="w-4 h-4 text-slate-300" />
                          )}
                          <span>{app.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Desktop View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-[#0F1C2E]">Apps / Tools</th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#3DD4B0] font-bold">Free</div>
                    <div className="text-sm text-slate-500">$0</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-slate-600 font-bold">Trial</div>
                    <div className="text-sm text-slate-500">$7</div>
                  </th>
                  <th className="text-center py-4 px-4 bg-[#3DD4B0]/5 border-2 border-[#3DD4B0] rounded-t-lg">
                    <div className="text-[#3DD4B0] font-bold">BASIC</div>
                    <div className="text-sm text-slate-500">$17</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#1F6F78] font-bold">Premium</div>
                    <div className="text-sm text-slate-500">$27</div>
                  </th>
                  <th className="text-center py-4 px-4">
                    <div className="text-[#0F1C2E] font-bold">Bundle</div>
                    <div className="text-sm text-slate-500">$47</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allApps.map((app, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{app.name}</td>
                    <td className="text-center py-3 px-4">
                      {app.free ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.trial ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4 bg-[#3DD4B0]/5">
                      {app.basic ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.premium ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {app.bundle ? <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] mx-auto" /> : <span className="text-slate-300">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({ product }: { 
  product: typeof products[0]; 
}) {
  const Icon = product.icon;
  const isFree = product.price === 0;
  
  return (
    <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white ${
      product.popular ? 'ring-2 ring-[#3DD4B0]' : ''
    } ${product.isBundle ? 'md:col-span-2 lg:col-span-1' : ''}`}>
      {/* Popular Badge */}
      {product.popular && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-[#3DD4B0] text-[#0F1C2E] font-semibold">
            <Star className="w-3 h-3 mr-1 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}
      
      {/* Bundle Badge */}
      {product.isBundle && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-[#0F1C2E] text-white font-semibold">
            <Monitor className="w-3 h-3 mr-1" />
            Best Value
          </Badge>
        </div>
      )}
      
      <CardContent className="p-6 lg:p-8">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-4">
          <Icon className="h-6 w-6" />
        </div>
        
        {/* Header */}
        <div className="mb-4">
          <Badge variant="outline" className="mb-3 text-xs">
            {product.shortName}
          </Badge>
          <h3 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-2">
            {product.name}
          </h3>
          <p className="text-slate-600 leading-relaxed text-sm">
            {product.description}
          </p>
        </div>
        
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          {isFree ? (
            <span className="text-4xl font-bold text-[#3DD4B0]">Free</span>
          ) : (
            <>
              <span className="text-4xl font-bold text-[#0F1C2E]">${product.price}</span>
              {product.comparePrice && (
                <span className="text-lg text-slate-400 line-through">${product.comparePrice}</span>
              )}
            </>
          )}
        </div>
        
        {/* Savings Badge */}
        {!isFree && product.comparePrice && product.comparePrice > product.price && (
          <Badge className="bg-green-100 text-green-700 mb-4">
            Save ${product.comparePrice - product.price}
          </Badge>
        )}
        
        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.highlights.map((highlight, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {highlight}
            </Badge>
          ))}
        </div>
        
        {/* Features */}
        <ul className="space-y-2 mb-6">
          {product.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
              <span className="text-slate-700 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* CTA */}
        {isFree ? (
          <Link href="/apps" className="block">
            <Button 
              className={`w-full h-12 font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]`}
              size="lg"
            >
              Start Free Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Link href={PRODUCT_URLS[product.id] || '/products'} className="block">
            <Button 
              className={`w-full h-12 font-semibold ${product.popular 
                  ? 'bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]' 
                  : 'bg-[#0F1C2E] text-white hover:bg-[#1a2d47]'}`}
              size="lg"
            >
              View Details - ${product.price}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}

// Products Grid Section
function ProductsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            Value Ladder
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E] mb-4">
            Choose Your Transformation Path
          </h2>
          <p className="text-slate-600">
            Start free and upgrade as you grow. Each tier unlocks more powerful tools.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
            />
          ))}
        </div>
        
        {/* Payment Methods Note */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-500 mb-4">
            Secure checkout powered by Tamkinly. Multiple payment options available.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4" />
              SSL Secured
            </span>
            <span>|</span>
            <span>Wise / Bank Transfer</span>
            <span>|</span>
            <span>30-Day Refund Policy</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Guarantee Section
function GuaranteeSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-[#3DD4B0]/30 bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] shadow-lg">
            <CardContent className="p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3DD4B0]/20 text-[#3DD4B0] mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
                30-Day Money-Back Guarantee
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                We&apos;re confident in our products. If you&apos;re not completely satisfied within 30 days, 
                simply email us for a full refund — no questions asked, no hard feelings.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>No questions asked</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>Full refund</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#3DD4B0]" />
                  <span>Keep the product</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      q: "Can I start for free?",
      a: "Yes! Our Free Starter tier includes 3 powerful apps: Identity Gap Assessment, Values Clarification, and Daily Reflection. No credit card required."
    },
    {
      q: "What's the difference between tiers?",
      a: "FREE: 3 basic apps. TRIAL: 7-day full access. BASIC ($17): 4 core apps + PDFs. PREMIUM ($27): 7 apps + analytics. BUNDLE ($47): All 11 apps + AI Coach + Community + Priority Support."
    },
    {
      q: "How do I access the apps after purchase?",
      a: "After purchasing, you'll receive immediate access via your access key. Simply go to /apps and enter your key, or create an account with the same email."
    },
    {
      q: "Is there a money-back guarantee?",
      a: "Yes! We offer a 30-day money-back guarantee on all paid products. If you're not satisfied, simply contact us for a full refund—no questions asked."
    },
    {
      q: "Can I upgrade later?",
      a: "Absolutely! Start with any tier and upgrade anytime. You'll only pay the difference between your current and new tier."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F6F8FA]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F1C2E]">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="border-0 shadow-sm bg-white">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">{faq.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Start Your Transformation 
            <span className="text-[#3DD4B0]"> Today</span>
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Begin with our free tools. No credit card required. 
            Upgrade when you&apos;re ready for deeper transformation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/apps">
              <Button 
                size="lg" 
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 font-semibold shadow-xl"
              >
                Start Free Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/quiz">
              <Button variant="white" size="lg" className="px-8 h-14 font-semibold">
                Take Free Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Page
export default function ProductsPage() {
  // Generate product schemas for SEO
  const productSchemas = products.map((product) =>
    generateProductSchema({
      name: product.name,
      description: product.description,
      price: product.price,
      url: `/products`,
      category: 'Digital Product',
    })
  );

  // FAQ schema for pricing questions
  const faqSchema = generateFAQSchema([
    {
      question: "Can I start for free?",
      answer: "Yes! Our Free Starter tier includes 3 powerful apps: Identity Gap Assessment, Values Clarification, and Daily Reflection. No credit card required.",
    },
    {
      question: "What's the difference between tiers?",
      answer: "FREE: 3 basic apps. TRIAL: 7-day full access. BASIC ($17): 4 core apps + PDFs. PREMIUM ($27): 7 apps + analytics. BUNDLE ($47): All 11 apps + AI Coach + Community + Priority Support.",
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a 30-day money-back guarantee on all paid products. If you're not satisfied, simply contact us for a full refund—no questions asked.",
    },
  ]);

  // Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
  ]);

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <JsonLd data={[...productSchemas, faqSchema, breadcrumbSchema]} />
      
      <HeroSection />
      <AppMatrixSection />
      <ProductsSection />
      <GuaranteeSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
