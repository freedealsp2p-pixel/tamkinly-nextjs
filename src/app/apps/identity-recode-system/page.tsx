'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Calendar, 
  FileText, 
  BarChart3,
  ArrowRight,
  Lock
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useLocale } from '@/components/providers/LocaleProvider';

// Import worksheets dynamically to avoid SSR issues
const DailyPlanner = dynamic(() => import('@/components/apps/DailyPlanner'), { ssr: false });
const IdentityBaselineWorksheet = dynamic(() => import('@/components/apps/worksheets/IdentityBaselineWorksheet'), { ssr: false });
const EnvironmentalAuditTemplate = dynamic(() => import('@/components/apps/worksheets/EnvironmentalAuditTemplate'), { ssr: false });
const DecisionPatternAnalysis = dynamic(() => import('@/components/apps/worksheets/DecisionPatternAnalysis'), { ssr: false });
const EvidenceTrackingSystem = dynamic(() => import('@/components/apps/worksheets/EvidenceTrackingSystem'), { ssr: false });
const EmotionRegulationAssessment = dynamic(() => import('@/components/apps/worksheets/EmotionRegulationAssessment'), { ssr: false });

export default function IdentityRecodeSystemPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;
  const [activeTab, setActiveTab] = useState('manual');

  const manualContent = [
    {
      title: getText('Identity Baseline Assessment', 'تقييم خط الأساس الهويّة'),
      content: getText(
        'Complete diagnostic protocol establishing current identity parameters and measurable reference points for transformation.',
        'بروتوكول تشخيصي كامل يؤسس معلمات الهوية الحالية ونقاط المرجعية القابلة للقياس للتحول.'
      )
    },
    {
      title: getText('The 4-Step Identity Recode Framework', 'إطار إعادة برمجة الهوية في 4 خطوات'),
      content: getText(
        'Systematic protocol for converting objectives into operational identities through empirical evidence accumulation.',
        'بروتوكول منهجي لتحويل الأهداف إلى هويات تشغيلية من خلال تراكم الأدلة التجريبية.'
      )
    },
    {
      title: getText('Daily Evidence Accumulation Cycle', 'دورة تراكم الأدلة اليومية'),
      content: getText(
        'Daily protocols for identity prompt review, non-negotiable action execution, and evidence logging.',
        'بروتوكولات يومية لمراجعة محفزات الهوية، وتنفيذ الإجراءات غير القابلة للتفاوض، وتسجيل الأدلة.'
      )
    },
    {
      title: getText('Weekly Integration Protocol', 'بروتوكول التكامل الأسبوعي'),
      content: getText(
        '7-day review cycles for system calibration, consistency scoring, and environmental optimization.',
        'دورات مراجعة مدتها 7 أيام لمعايرة النظام وتسجيل درجات الاتساق والتحسين البيئي.'
      )
    },
    {
      title: getText('Monthly Identity Lock Protocol', 'بروتوكول قفل الهوية الشهري'),
      content: getText(
        '30-day transformation cycles culminating in identity statement rewriting and next-level objective selection.',
        'دورات تحول مدتها 30 يومًا تتوج بإعادة كتابة بيان الهوية واختيار الأهداف للمستوى التالي.'
      )
    },
    {
      title: getText('System Failure Recovery', 'استعادة النظام من الفشل'),
      content: getText(
        'Protocols for chain break scenarios, 24-hour reset rules, and identity collapse prevention.',
        'بروتوكولات لسيناريوهات انقطاع السلسلة، وقواعد إعادة التعيين خلال 24 ساعة، ومنع انهيار الهوية.'
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6F8FA]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-8 px-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {locale === 'ar' ? '→ العودة للتطبيقات' : '← Back to Apps'}
          </Link>
          <div className="flex items-center gap-4 mt-2">
            <div className="w-14 h-14 rounded-xl bg-[#3DD4B0]/20 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-[#3DD4B0]" />
            </div>
            <div>
              <Badge className="bg-[#1F6F78]/20 text-[#1F6F78] border border-[#1F6F78]/50 mb-2">{getText('BASIC', 'أساسي')}</Badge>
              <h1 className="text-2xl font-bold">{getText('Identity Recode System', 'نظام إعادة برمجة الهوية')}</h1>
              <p className="text-slate-400">{getText('Complete 30-day transformation framework', 'إطار تحوّل كامل مدته 30 يومًا')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent h-14 gap-1">
              <TabsTrigger 
                value="manual" 
                className="data-[state=active]:bg-[#3DD4B0] data-[state=active]:text-[#0F1C2E] px-4 py-2 rounded-lg"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                {getText('Executive Manual', 'الدليل التنفيذي')}
              </TabsTrigger>
              <TabsTrigger 
                value="planner" 
                className="data-[state=active]:bg-[#3DD4B0] data-[state=active]:text-[#0F1C2E] px-4 py-2 rounded-lg"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {getText('Daily Planner', 'المخطط اليومي')}
              </TabsTrigger>
              <TabsTrigger 
                value="worksheets" 
                className="data-[state=active]:bg-[#3DD4B0] data-[state=active]:text-[#0F1C2E] px-4 py-2 rounded-lg"
              >
                <FileText className="w-4 h-4 mr-2" />
                {getText('Worksheets', 'أوراق العمل')}
              </TabsTrigger>
              <TabsTrigger 
                value="tracking" 
                className="data-[state=active]:bg-[#3DD4B0] data-[state=active]:text-[#0F1C2E] px-4 py-2 rounded-lg"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                {getText('Tracking', 'التتبّع')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="manual" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
                  {getText('Executive Implementation Manual', 'دليل التنفيذ التنفيذي')}
                </h2>
                <p className="text-[#8A94A6] max-w-2xl mx-auto text-lg">
                  {getText(
                    'The complete operational framework for identity recalibration through evidence-based action protocols.',
                    'الإطار التشغيلي الكامل لإعادة معايرة الهوية من خلال بروتوكولات العمل القائمة على الأدلة.'
                  )}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {manualContent.map((section, index) => (
                  <Card key={index} className="border border-[#1F6F78]/20 hover:border-[#1F6F78]/40 transition-colors">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#3DD4B0]/20 flex items-center justify-center text-[#3DD4B0] font-bold">
                          {index + 1}
                        </div>
                        <CardTitle className="text-[#1F6F78] text-lg">
                          {section.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#2B2E34] leading-relaxed">
                        {section.content}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="planner" className="mt-0">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
                  {getText('30-Day Identity Recode Planner', 'مخطط إعادة برمجة الهوية لـ 30 يومًا')}
                </h2>
                <p className="text-[#8A94A6] max-w-2xl mx-auto text-lg">
                  {getText(
                    'Daily implementation system with identity prompts, non-negotiable actions, and evidence tracking.',
                    'نظام تنفيذ يومي مع محفزات الهوية والإجراءات غير القابلة للتفاوض وتتبع الأدلة.'
                  )}
                </p>
              </div>
              <DailyPlanner days={30} />
            </div>
          </TabsContent>

          <TabsContent value="worksheets" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
                  {getText('Assessment Worksheets', 'أوراق عمل التقييم')}
                </h2>
                <p className="text-[#8A94A6] max-w-2xl mx-auto text-lg">
                  {getText(
                    'Comprehensive assessment tools for measuring identity alignment and transformation progress.',
                    'أدوات تقييم شاملة لقياس محاذاة الهوية وتقدّم التحول.'
                  )}
                </p>
              </div>
              
              <Tabs defaultValue="identity" className="w-full">
                <TabsList className="w-full justify-start bg-transparent mb-6 gap-2 flex-wrap">
                  <TabsTrigger value="identity" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
                    {getText('Identity Baseline', 'خط أساس الهوية')}
                  </TabsTrigger>
                  <TabsTrigger value="environment" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
                    {getText('Environmental Audit', 'التدقيق البيئي')}
                  </TabsTrigger>
                  <TabsTrigger value="emotion" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
                    {getText('Emotion Regulation', 'تنظيم المشاعر')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="identity">
                  <IdentityBaselineWorksheet />
                </TabsContent>
                <TabsContent value="environment">
                  <EnvironmentalAuditTemplate />
                </TabsContent>
                <TabsContent value="emotion">
                  <EmotionRegulationAssessment />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="mt-0">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-[#0F1C2E] mb-4">
                  {getText('Progress Tracking Systems', 'أنظمة تتبع التقدّم')}
                </h2>
                <p className="text-[#8A94A6] max-w-2xl mx-auto text-lg">
                  {getText(
                    'Track your decisions, collect evidence, and measure your transformation.',
                    'تتبّع قراراتك، واجمع الأدلة، وقيّس تحوّلك.'
                  )}
                </p>
              </div>
              
              <Tabs defaultValue="evidence" className="w-full">
                <TabsList className="w-full justify-start bg-transparent mb-6 gap-2">
                  <TabsTrigger value="evidence" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
                    {getText('Evidence Tracking', 'تتبع الأدلة')}
                  </TabsTrigger>
                  <TabsTrigger value="decisions" className="data-[state=active]:bg-[#0F1C2E] data-[state=active]:text-white">
                    {getText('Decision Journal', 'مذكرة القرارات')}
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="evidence">
                  <EvidenceTrackingSystem />
                </TabsContent>
                <TabsContent value="decisions">
                  <DecisionPatternAnalysis />
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-[#8A94A6] text-sm">
            {getText('Identity Recode System — Part of Tamkinly', 'نظام إعادة برمجة الهوية — جزء من تمكينلي')}
          </p>
          <p className="text-[#8A94A6] text-xs mt-2">
            {getText(
              'This system combines behavioral psychology, identity theory, and evidence-based execution protocols.',
              'يجمع هذا النظام بين علم النفس السلوكي ونظرية الهوية وبروتوكولات التنفيذ القائمة على الأدلة.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
