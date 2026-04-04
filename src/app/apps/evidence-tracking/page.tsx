'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Target,
  Sparkles
} from 'lucide-react';

const features = [
  'Log daily evidence of your transformation',
  'Track behavioral changes over time',
  'Connect actions to identity shifts',
  'Visual progress charts and insights',
  'Milestone tracking and celebrations',
  'Export reports for reflection'
];

export default function EvidenceTrackingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-100 text-purple-800">PREMIUM</Badge>
                <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">$27</Badge>
              </div>
              <h1 className="text-3xl font-bold text-white">Evidence Tracking System</h1>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <CardContent className="p-8 text-center">
              <Lock className="w-16 h-16 text-amber-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Premium Feature
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                Log and track behavioral evidence that supports your identity transformation. 
                Available with the Premium Package or Complete Bundle.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-2xl mx-auto mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#3DD4B0] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/checkout?product=premium">
                  <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] px-8 h-14 text-lg font-semibold">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Get Premium - $27
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/checkout?product=bundle">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14">
                    Get Complete Bundle - $47
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-xl mb-8">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-[#0F1C2E] mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#3DD4B0]" />
                Track Your Transformation Evidence
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-[#3DD4B0]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">Log Daily</h3>
                  <p className="text-sm text-slate-600">Record evidence of actions aligned with your target identity</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-[#1F6F78]/10 flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="w-6 h-6 text-[#1F6F78]" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">Visualize</h3>
                  <p className="text-sm text-slate-600">See patterns and trends in your transformation journey</p>
                </div>
                <div className="text-center p-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-[#0F1C2E] mb-2">Celebrate</h3>
                  <p className="text-sm text-slate-600">Milestone tracking keeps you motivated and on track</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-slate-300">
            <p className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
              30-day money-back guarantee • Lifetime access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
