'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export default function EnvironmentalAuditPage() {
  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      <div className="bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78] text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Badge className="bg-[#1F6F78]/20 text-[#3DD4B0] border border-[#3DD4B0]/30 mb-4">BASIC - $17</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Environmental Audit</h1>
          <p className="text-lg text-slate-300">Analyze how your physical, digital, and social environment supports or hinders your goals.</p>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl py-12 px-4">
        <Card className="border-2 border-[#3DD4B0]/30 shadow-lg mb-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#3DD4B0]/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-[#3DD4B0]" />
            </div>
            <CardTitle className="text-2xl">Access Required</CardTitle>
            <CardDescription>This app is included in the BASIC package ($17)</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4 mb-6">
              {['Physical environment assessment', 'Digital environment analysis', 'Social circle evaluation', 'Action plan for improvement'].map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-[#3DD4B0]" />
                  <span className="text-slate-700">{f}</span>
                </div>
              ))}
            </div>
            <Link href="/products/planner">
              <Button className="w-full h-12 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold">
                Get Access - $17 <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
