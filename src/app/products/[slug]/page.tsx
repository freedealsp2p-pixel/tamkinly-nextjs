'use client';

import React, { useState, use } from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowRight, 
  ArrowLeft,
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
  BarChart3,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Complete product data
const productsData: Record<string, {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  price: number;
  comparePrice: number;
  tier: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: { title: string; description: string }[];
  apps: { name: string; description: string }[];
  testimonials: { name: string; role: string; content: string }[];
  highlights: string[];
  icon: React.ElementType;
  color: string;
  cta: string;
  popular: boolean;
  includes: { name: string; value: string }[];
  specifications: { name: string; value: string }[];
  faqs: { q: string; a: string }[];
}> = {
  'trial': {
    id: "trial",
    slug: "trial",
    name: "7-Day Trial",
    shortName: "Trial",
    price: 7,
    comparePrice: 15,
    tier: "TRIAL",
    description: "Experience the full Identity Recode system for 7 days. Perfect for testing the methodology.",
    longDescription: "Not sure if the Identity Recode system is right for you? Try our 7-day trial to experience the full power of transformation before committing. You'll get access to the core methodology and see real results in just one week.",
    features: [
      "7-Day Guided Journey",
      "Daily identity prompts",
      "Evidence tracking system",
      "Progress dashboard",
      "Email support",
      "PDF worksheets included"
    ],
    benefits: [
      { title: "Test Before Committing", description: "Experience the full methodology without a long-term commitment" },
      { title: "See Real Results", description: "Many users report breakthrough insights within the first 3 days" },
      { title: "Full System Access", description: "Try all core features of the planner system" }
    ],
    apps: [
      { name: "7-Day Trial Planner", description: "A condensed version of our 30-day system" },
      { name: "Identity Gap Assessment", description: "Discover your identity gap score" },
      { name: "Values Clarification", description: "Identify your core values" },
      { name: "Daily Reflection", description: "Guided daily prompts" }
    ],
    testimonials: [
      { name: "Ahmed M.", role: "Engineer", content: "The 7-day trial convinced me. I upgraded to the full planner on day 4 because I was already seeing results." },
      { name: "Sarah K.", role: "Teacher", content: "Perfect way to test the system. The daily prompts were eye-opening." }
    ],
    highlights: [
      "Full system access",
      "7 days",
      "Low risk"
    ],
    icon: Clock,
    color: "#64B5F6",
    cta: "Start 7-Day Trial",
    popular: false,
    includes: [
      { name: "Duration", value: "7 Days" },
      { name: "Apps Access", value: "4 Core Apps" },
      { name: "PDF Downloads", value: "Yes" },
      { name: "Support", value: "Email" },
      { name: "Updates", value: "7 Days" }
    ],
    specifications: [
      { name: "Format", value: "Digital + Interactive" },
      { name: "Device", value: "Any Device" },
      { name: "Languages", value: "English" },
      { name: "Access", value: "Instant" }
    ],
    faqs: [
      { q: "What happens after 7 days?", a: "Your access will expire, but you can upgrade to any paid plan to continue your journey." },
      { q: "Can I extend the trial?", a: "The trial is a one-time offer per customer. We recommend upgrading to continue your progress." },
      { q: "Is my progress saved?", a: "Yes! If you upgrade within 30 days, all your trial data will be preserved." }
    ]
  },
  'planner': {
    id: "planner",
    slug: "planner",
    name: "Identity Recode Planner",
    shortName: "The Planner",
    price: 17,
    comparePrice: 29,
    tier: "BASIC",
    description: "The complete 30-day transformation system with interactive apps and PDF downloads.",
    longDescription: "The Identity Recode Planner is our flagship 30-day transformation system. Based on evidence-based psychology and identity science, this planner guides you through a structured journey of self-discovery and lasting change. Includes both digital interactive apps and printable PDF versions.",
    features: [
      "30-Day Identity Planner",
      "Executive Manual (50+ pages)",
      "Identity Baseline Worksheet",
      "Environmental Audit Template",
      "Digital + Print PDFs",
      "Lifetime access",
      "All future updates included"
    ],
    benefits: [
      { title: "Structured Transformation", description: "A clear 30-day roadmap from confusion to clarity" },
      { title: "Evidence-Based Design", description: "Built on psychology, neuroscience, and proven methods" },
      { title: "Print & Digital", description: "Use on any device or print for pen-and-paper work" }
    ],
    apps: [
      { name: "Executive Manual", description: "Comprehensive guide to identity transformation" },
      { name: "30-Day Daily Planner", description: "Interactive daily prompts and tracking" },
      { name: "Identity Baseline Worksheet", description: "Establish your starting point" },
      { name: "Environmental Audit", description: "Assess your surroundings for growth" }
    ],
    testimonials: [
      { name: "Fatima A.", role: "Marketing Director", content: "The 30-day planner became my morning ritual. It's not about motivation—it's about identity. Life-changing." },
      { name: "James K.", role: "Entrepreneur", content: "I've done many personality tests, but this one actually told me what to DO. Worth every penny." },
      { name: "Michael T.", role: "Software Engineer", content: "3 months later, I'm a different person. The planner helped me understand my self-sabotage patterns." }
    ],
    highlights: [
      "Most popular",
      "Print included",
      "30-day journey"
    ],
    icon: Calendar,
    color: "#3DD4B0",
    cta: "Get The Planner",
    popular: true,
    includes: [
      { name: "Duration", value: "Lifetime" },
      { name: "Apps Access", value: "4 Core Apps" },
      { name: "PDF Downloads", value: "Yes - All" },
      { name: "Support", value: "Email" },
      { name: "Updates", value: "Free Forever" }
    ],
    specifications: [
      { name: "Format", value: "Digital + Print PDF" },
      { name: "Pages", value: "50+ Pages" },
      { name: "Device", value: "Any Device" },
      { name: "Languages", value: "English" }
    ],
    faqs: [
      { q: "Is this a physical product?", a: "No, this is a digital product. You'll receive instant access to interactive apps and downloadable PDFs that you can print." },
      { q: "How long do I have access?", a: "Lifetime! Purchase once, access forever, including all future updates." },
      { q: "Can I print the materials?", a: "Yes! All PDFs are print-ready. Many users prefer the pen-and-paper experience." }
    ]
  },
  'premium': {
    id: "premium",
    slug: "premium",
    name: "Premium Transformation",
    shortName: "Premium",
    price: 27,
    comparePrice: 44,
    tier: "PREMIUM",
    description: "Everything in Planner plus advanced analytics and decision tracking tools.",
    longDescription: "The Premium package includes everything in the Planner, plus powerful analytics tools to track your transformation journey. Understand your decision patterns, track evidence of your growth, and visualize your progress over time. Perfect for those who want data-driven insights into their transformation.",
    features: [
      "Everything in Planner ($17 value)",
      "Decision Pattern Analysis",
      "Evidence Tracking System",
      "Progress Dashboard",
      "Advanced analytics",
      "Priority support",
      "Export your data"
    ],
    benefits: [
      { title: "Data-Driven Growth", description: "See your transformation with clear metrics and trends" },
      { title: "Pattern Recognition", description: "Identify decision patterns that help or hinder you" },
      { title: "Evidence Collection", description: "Build proof of your growth over time" }
    ],
    apps: [
      { name: "Everything in Planner", description: "All 4 core apps included" },
      { name: "Decision Pattern Analysis", description: "Understand how you make choices" },
      { name: "Evidence Tracking System", description: "Document your transformation proof" },
      { name: "Progress Dashboard", description: "Visualize your growth journey" }
    ],
    testimonials: [
      { name: "David L.", role: "Professor", content: "As someone who studies behavioral psychology, I'm impressed by the scientific grounding. The analytics are powerful." },
      { name: "Amira H.", role: "Therapist", content: "I recommend this to clients. The decision pattern analysis alone is worth the upgrade." }
    ],
    highlights: [
      "Best value",
      "Save $17",
      "Analytics included"
    ],
    icon: Award,
    color: "#1F6F78",
    cta: "Get Premium",
    popular: false,
    includes: [
      { name: "Duration", value: "Lifetime" },
      { name: "Apps Access", value: "7 Apps" },
      { name: "PDF Downloads", value: "Yes - All" },
      { name: "Support", value: "Priority Email" },
      { name: "Updates", value: "Free Forever" },
      { name: "Analytics", value: "Yes" }
    ],
    specifications: [
      { name: "Format", value: "Digital + Print PDF" },
      { name: "Analytics", value: "Advanced" },
      { name: "Export", value: "CSV/PDF" },
      { name: "Dashboard", value: "Interactive" }
    ],
    faqs: [
      { q: "What's different from the Planner?", a: "Premium includes 3 additional apps: Decision Analysis, Evidence Tracking, and Progress Dashboard—perfect for data-driven transformation." },
      { q: "Can I upgrade from Planner?", a: "Yes! Contact us and we'll apply your $17 purchase toward Premium." },
      { q: "Is the analytics worth it?", a: "Users with Premium are 2.5x more likely to complete the 30-day program based on our data." }
    ]
  },
  'bundle': {
    id: "bundle",
    slug: "bundle",
    name: "Complete Bundle",
    shortName: "Bundle",
    price: 47,
    comparePrice: 91,
    tier: "BUNDLE",
    description: "The ultimate package: All apps + AI coaching + community access + priority support.",
    longDescription: "The Complete Bundle is our most comprehensive offering. Get everything we've built: all products, all apps, AI-powered identity coaching, access to our transformation community, and priority support with 24-hour response time. This is the fastest path to transformation.",
    features: [
      "All PDF products ($44 value)",
      "All Interactive Apps",
      "AI Identity Coach (GPT-4 powered)",
      "Transformation Community",
      "Emotion Regulation (ERQ)",
      "Priority Support (24hr response)",
      "Monthly live Q&A sessions",
      "Direct founder access",
      "Early access to new features"
    ],
    benefits: [
      { title: "Complete Transformation", description: "Every tool, every resource, every support option" },
      { title: "AI-Powered Guidance", description: "Get personalized coaching from our AI identity coach" },
      { title: "Community Connection", description: "Connect with others on the same journey" }
    ],
    apps: [
      { name: "All Core Apps", description: "Everything in Premium (7 apps)" },
      { name: "AI Identity Coach", description: "GPT-4 powered coaching anytime" },
      { name: "Emotion Regulation (ERQ)", description: "Advanced emotional intelligence training" },
      { name: "Community Access", description: "Private transformation community" }
    ],
    testimonials: [
      { name: "Sarah M.", role: "Life Coach", content: "I've recommended the Bundle to 20+ clients. The AI coach alone provides incredible value between sessions." },
      { name: "Omar R.", role: "Executive", content: "The community and live Q&As made the difference. Worth every dollar for the support alone." }
    ],
    highlights: [
      "Save $44",
      "AI coaching",
      "VIP access"
    ],
    icon: Monitor,
    color: "#0F1C2E",
    cta: "Get Complete Bundle",
    popular: false,
    includes: [
      { name: "Duration", value: "Lifetime" },
      { name: "Apps Access", value: "All 15 Apps" },
      { name: "PDF Downloads", value: "Yes - All" },
      { name: "Support", value: "Priority (24hr)" },
      { name: "AI Coach", value: "Unlimited" },
      { name: "Community", value: "Lifetime Access" },
      { name: "Live Q&A", value: "Monthly" }
    ],
    specifications: [
      { name: "AI Coach", value: "GPT-4 Powered" },
      { name: "Community", value: "Private Discord" },
      { name: "Support Hours", value: "24hr Response" },
      { name: "Bonus", value: "Founder Access" }
    ],
    faqs: [
      { q: "Is the AI Coach actually helpful?", a: "Our AI Coach uses GPT-4 with custom training on identity transformation. Users report it provides breakthrough insights between sessions." },
      { q: "What's the community like?", a: "A private Discord with 500+ members on transformation journeys. Weekly challenges, accountability partners, and genuine support." },
      { q: "How do I contact the founder?", a: "Bundle members get a direct email line to Abdallah with 48-hour response time." }
    ]
  }
};

// Product page component
export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const product = productsData[slug];
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F8FA]">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold text-[#0F1C2E] mb-4">Product Not Found</h1>
            <p className="text-slate-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const Icon = product.icon;
  
  const handleBuyNow = async () => {
    setIsProcessing(true);
    
    toast({
      title: "Redirecting to checkout...",
      description: `Preparing ${product.name} for purchase`,
    });

    // Redirect to checkout with product info
    setTimeout(() => {
      window.location.href = `/checkout?product=${product.id}`;
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/products" className="inline-flex items-center text-sm text-slate-600 hover:text-[#3DD4B0] transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] py-12 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(61, 212, 176, 0.15) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              {/* Product Icon/Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Icon className="w-16 h-16 lg:w-20 lg:h-20 text-[#3DD4B0]" />
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-[#3DD4B0]/20 text-[#3DD4B0] border border-[#3DD4B0]/30">
                    {product.tier}
                  </Badge>
                  {product.popular && (
                    <Badge className="bg-[#3DD4B0] text-[#0F1C2E]">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Most Popular
                    </Badge>
                  )}
                  {product.comparePrice > product.price && (
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                      Save ${product.comparePrice - product.price}
                    </Badge>
                  )}
                </div>
                
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                
                <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Price */}
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl lg:text-5xl font-bold text-white">${product.price}</span>
                  {product.comparePrice > product.price && (
                    <span className="text-xl text-slate-400 line-through">${product.comparePrice}</span>
                  )}
                  <Badge variant="outline" className="text-slate-300 border-slate-600">
                    One-time payment
                  </Badge>
                </div>
                
                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.highlights.map((highlight, idx) => (
                    <Badge key={idx} variant="secondary" className="bg-white/10 text-white border-white/20">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-[#3DD4B0]" />
                      {highlight}
                    </Badge>
                  ))}
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={handleBuyNow}
                    disabled={isProcessing}
                    className="h-14 px-8 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] shadow-xl"
                    size="lg"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {product.cta}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                  <Link href="/apps">
                    <Button variant="outline" className="h-14 px-8 text-lg border-white/30 text-white hover:bg-white/10">
                      Try Free Version
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 mt-6 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#3DD4B0]" />
                    <span>30-Day Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-[#3DD4B0]" />
                    <span>Instant Access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#3DD4B0]" />
                    <span>Lifetime Updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-4">
                      About This Product
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg">
                      {product.longDescription}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Benefits */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      Key Benefits
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {product.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                            <Check className="w-5 h-5 text-[#3DD4B0]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0F1C2E] mb-1">{benefit.title}</h3>
                            <p className="text-sm text-slate-600">{benefit.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Features */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      What&apos;s Included
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {product.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Apps Included */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      Apps Included
                    </h2>
                    <div className="space-y-4">
                      {product.apps.map((app, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50">
                          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#3DD4B0]/10 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-[#3DD4B0]" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-[#0F1C2E]">{app.name}</h3>
                            <p className="text-sm text-slate-600">{app.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Testimonials */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      What Users Say
                    </h2>
                    <div className="space-y-6">
                      {product.testimonials.map((testimonial, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-50 border-l-4 border-[#3DD4B0]">
                          <p className="text-slate-700 italic mb-3">&ldquo;{testimonial.content}&rdquo;</p>
                          <div>
                            <p className="font-semibold text-[#0F1C2E]">{testimonial.name}</p>
                            <p className="text-sm text-slate-500">{testimonial.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* FAQs */}
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6 lg:p-8">
                    <h2 className="font-serif text-2xl font-bold text-[#0F1C2E] mb-6">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                      {product.faqs.map((faq, idx) => (
                        <div key={idx} className="p-4 rounded-lg bg-slate-50">
                          <h3 className="font-semibold text-[#0F1C2E] mb-2">{faq.q}</h3>
                          <p className="text-slate-600 text-sm">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Purchase Card - Sticky */}
                <div className="sticky top-24">
                  <Card className="border-2 border-[#3DD4B0]/20 shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <div className="flex items-baseline justify-center gap-2 mb-2">
                          <span className="text-4xl font-bold text-[#0F1C2E]">${product.price}</span>
                          {product.comparePrice > product.price && (
                            <span className="text-lg text-slate-400 line-through">${product.comparePrice}</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500">One-time payment • Lifetime access</p>
                      </div>
                      
                      <Button 
                        onClick={handleBuyNow}
                        disabled={isProcessing}
                        className="w-full h-14 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
                        size="lg"
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            {product.cta}
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                      
                      <Separator className="my-6" />
                      
                      {/* Includes */}
                      <div className="space-y-3">
                        {product.includes.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-600">{item.name}</span>
                            <span className="font-medium text-[#0F1C2E]">{item.value}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="my-6" />
                      
                      {/* Guarantee */}
                      <div className="text-center">
                        <Shield className="w-10 h-10 text-[#3DD4B0] mx-auto mb-2" />
                        <p className="text-sm font-semibold text-[#0F1C2E] mb-1">30-Day Money-Back</p>
                        <p className="text-xs text-slate-500">No questions asked</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Specifications */}
                  <Card className="border-0 shadow-sm mt-6">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-[#0F1C2E] mb-4">Specifications</h3>
                      <div className="space-y-3">
                        {product.specifications.map((spec, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-600">{spec.name}</span>
                            <span className="font-medium text-[#0F1C2E]">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom CTA */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Identity?
            </h2>
            <p className="text-slate-300 mb-6">
              Join thousands who have already discovered their identity gap and started their transformation journey.
            </p>
            <Button 
              onClick={handleBuyNow}
              disabled={isProcessing}
              className="h-14 px-10 text-lg font-semibold bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E]"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {product.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
