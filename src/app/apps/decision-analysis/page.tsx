'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  BarChart3,
  Target,
  Brain
} from 'lucide-react';

const features = [
  'Track decisions across all areas of your life',
  'Identify decision-making patterns and biases',
  'Visual analytics showing decision quality over time',
  'Connect decisions to your identity goals',
  'Receive personalized insights and recommendations',
  'Compare decisions against your stated values'
];

export default function DecisionAnalysisPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-purple-100 text-purple-800">PREMIUM</Badge>
                <Badge className="bg-[#3DD4B0]/10 text-[#3DD4B0]">$27</Badge>
              </div>
              <h1 className="text-3xl font-bold text-white">Decision Pattern Analysis</h1>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <CardContent className="p-8 text-center">
              <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">
                Premium Feature
              </h2>
              <p className="text-slate-300 mb-6 max-w-xl mx-auto">
                Track and analyze your decisions to identify patterns, biases, and improve 
                decision quality. Available with the Premium Package or Complete Bundle.
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
                <BarChart3 className="w-5 h-5 text-[#3DD4B0]" />
                Why Decision Tracking Matters
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-lg">
                  <Target className="w-8 h-8 text-[#3DD4B0] mb-3" />
                  <h4 className="font-semibold text-[#0F1C2E] mb-2">Identify Patterns</h4>
                  <p className="text-sm text-slate-600">Discover recurring decision patterns that may be holding you back from your goals</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-lg">
                  <Brain className="w-8 h-8 text-[#1F6F78] mb-3" />
                  <h4 className="font-semibold text-[#0F1C2E] mb-2">Reduce Bias</h4>
                  <p className="text-sm text-slate-600">Recognize cognitive biases in your decision-making process and learn to overcome them</p>
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
