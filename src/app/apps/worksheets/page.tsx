'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  User, 
  Target, 
  Heart, 
  Brain,
  Home,
  ArrowRight,
  Lock
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Import worksheets dynamically
const WhoAmIWorksheet = dynamic(() => import('@/components/apps/worksheets/WhoAmIWorksheet'), { ssr: false });
const IdentityBasedHabitsWorksheet = dynamic(() => import('@/components/apps/worksheets/IdentityBasedHabitsWorksheet'), { ssr: false });
const SelfAuthorshipWorksheet = dynamic(() => import('@/components/apps/worksheets/SelfAuthorshipWorksheet'), { ssr: false });
const IdentityBaselineWorksheet = dynamic(() => import('@/components/apps/worksheets/IdentityBaselineWorksheet'), { ssr: false });
const EnvironmentalAuditTemplate = dynamic(() => import('@/components/apps/worksheets/EnvironmentalAuditTemplate'), { ssr: false });
const EmotionRegulationAssessment = dynamic(() => import('@/components/apps/worksheets/EmotionRegulationAssessment'), { ssr: false });

const worksheets = [
  {
    id: 'whoami',
    name: 'Who Am I? Worksheet',
    description: 'Explore your identity through roles, traits, values, and goals',
    icon: <User className="w-5 h-5" />,
    color: '#3DD4B0',
    tier: 'FREE'
  },
  {
    id: 'habits',
    name: 'Identity-Based Habits',
    description: 'Create habits that vote for your new identity (Atomic Habits method)',
    icon: <Target className="w-5 h-5" />,
    color: '#FFB74D',
    tier: 'FREE'
  },
  {
    id: 'selfauthorship',
    name: 'Self-Authorship Journey',
    description: 'Map your journey from external formulas to internal identity',
    icon: <Brain className="w-5 h-5" />,
    color: '#64B5F6',
    tier: 'FREE'
  },
  {
    id: 'baseline',
    name: 'Identity Baseline (8 Dimensions)',
    description: 'Comprehensive assessment across 8 identity dimensions',
    icon: <FileText className="w-5 h-5" />,
    color: '#1F6F78',
    tier: 'BASIC'
  },
  {
    id: 'environment',
    name: 'Environmental Audit',
    description: 'Analyze how your environment supports or hinders your growth',
    icon: <Home className="w-5 h-5" />,
    color: '#81C784',
    tier: 'BASIC'
  },
  {
    id: 'emotion',
    name: 'Emotion Regulation (ERQ)',
    description: 'Assess your cognitive reappraisal and expressive suppression',
    icon: <Heart className="w-5 h-5" />,
    color: '#E57373',
    tier: 'BUNDLE'
  }
];

export default function WorksheetsPage() {
  const [activeWorksheet, setActiveWorksheet] = useState('whoami');

  return (
    <div className="min-h-screen bg-[#F6F8FA]">
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-8 px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            ← Back to Apps
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <FileText className="w-7 h-7 text-[#3DD4B0]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Assessment Worksheets</h1>
              <p className="text-slate-400">Evidence-based tools for self-discovery and transformation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Worksheet Selector */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {worksheets.map((ws) => (
              <button
                key={ws.id}
                onClick={() => setActiveWorksheet(ws.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeWorksheet === ws.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: activeWorksheet === ws.id ? ws.color : undefined
                }}
              >
                {ws.icon}
                <span className="font-medium">{ws.name}</span>
                <Badge 
                  variant="outline" 
                  className={`ml-1 text-xs ${activeWorksheet === ws.id ? 'border-white/30 text-white' : ''}`}
                >
                  {ws.tier}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Worksheet Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {activeWorksheet === 'whoami' && <WhoAmIWorksheet />}
          {activeWorksheet === 'habits' && <IdentityBasedHabitsWorksheet />}
          {activeWorksheet === 'selfauthorship' && <SelfAuthorshipWorksheet />}
          {activeWorksheet === 'baseline' && <IdentityBaselineWorksheet />}
          {activeWorksheet === 'environment' && <EnvironmentalAuditTemplate />}
          {activeWorksheet === 'emotion' && <EmotionRegulationAssessment />}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-[#8A94A6] text-sm">
            Assessment Worksheets — Part of Tamkinly Identity Transformation Platform
          </p>
        </div>
      </div>
    </div>
  );
}
