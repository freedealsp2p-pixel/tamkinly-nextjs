'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/providers/LocaleProvider';
import { 
  Heart, 
  ArrowRight, 
  RotateCcw,
  Download,
  CheckCircle2,
  GripVertical,
  Star
} from 'lucide-react';

interface Value {
  id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  categoryEn: string;
  categoryAr: string;
}

const valuesList: Value[] = [
  // Personal Growth
  { id: 'growth', nameEn: 'Personal Growth', nameAr: 'النمو الشخصي', descriptionEn: 'Continuous learning and self-improvement', descriptionAr: 'التعلم المستمر والتحسن الذاتي', categoryEn: 'Personal Growth', categoryAr: 'النمو الشخصي' },
  { id: 'wisdom', nameEn: 'Wisdom', nameAr: 'الحكمة', descriptionEn: 'Seeking knowledge and understanding', descriptionAr: 'البحث عن المعرفة والفهم', categoryEn: 'Personal Growth', categoryAr: 'النمو الشخصي' },
  { id: 'creativity', nameEn: 'Creativity', nameAr: 'الإبداع', descriptionEn: 'Expressing yourself through new ideas', descriptionAr: 'التعبير عن نفسك بأفكار جديدة', categoryEn: 'Personal Growth', categoryAr: 'النمو الشخصي' },
  { id: 'curiosity', nameEn: 'Curiosity', nameAr: 'الفضول', descriptionEn: 'Exploring and discovering new things', descriptionAr: 'استكشاف واكتشاف أشياء جديدة', categoryEn: 'Personal Growth', categoryAr: 'النمو الشخصي' },
  
  // Achievement
  { id: 'achievement', nameEn: 'Achievement', nameAr: 'الإنجاز', descriptionEn: 'Accomplishing goals and success', descriptionAr: 'تحقيق الأهداف والنجاح', categoryEn: 'Achievement', categoryAr: 'الإنجاز' },
  { id: 'ambition', nameEn: 'Ambition', nameAr: 'الطموح', descriptionEn: 'Striving for excellence and advancement', descriptionAr: 'السعي نحو التميز والتقدم', categoryEn: 'Achievement', categoryAr: 'الإنجاز' },
  { id: 'competence', nameEn: 'Competence', nameAr: 'الكفاءة', descriptionEn: 'Being skilled and capable', descriptionAr: 'أن تكون ماهرًا وقادرًا', categoryEn: 'Achievement', categoryAr: 'الإنجاز' },
  { id: 'productivity', nameEn: 'Productivity', nameAr: 'الإنتاجية', descriptionEn: 'Making effective use of time and resources', descriptionAr: 'الاستخدام الفعال للوقت والموارد', categoryEn: 'Achievement', categoryAr: 'الإنجاز' },
  
  // Relationships
  { id: 'family', nameEn: 'Family', nameAr: 'العائلة', descriptionEn: 'Strong family bonds and relationships', descriptionAr: 'روابط وعلاقات أسرية قوية', categoryEn: 'Relationships', categoryAr: 'العلاقات' },
  { id: 'friendship', nameEn: 'Friendship', nameAr: 'الصداقة', descriptionEn: 'Meaningful connections with friends', descriptionAr: 'روابط هادفة مع الأصدقاء', categoryEn: 'Relationships', categoryAr: 'العلاقات' },
  { id: 'love', nameEn: 'Love', nameAr: 'الحب', descriptionEn: 'Deep emotional connections', descriptionAr: 'روابط عاطفية عميقة', categoryEn: 'Relationships', categoryAr: 'العلاقات' },
  { id: 'compassion', nameEn: 'Compassion', nameAr: 'التعاطف', descriptionEn: 'Empathy and kindness toward others', descriptionAr: 'التعاطف واللطف مع الآخرين', categoryEn: 'Relationships', categoryAr: 'العلاقات' },
  
  // Integrity
  { id: 'honesty', nameEn: 'Honesty', nameAr: 'الصدق', descriptionEn: 'Truthfulness and authenticity', descriptionAr: 'الصدق والأصالة', categoryEn: 'Integrity', categoryAr: 'النزاهة' },
  { id: 'integrity', nameEn: 'Integrity', nameAr: 'النزاهة', descriptionEn: 'Living in alignment with principles', descriptionAr: 'العيش وفقًا للمبادئ', categoryEn: 'Integrity', categoryAr: 'النزاهة' },
  { id: 'justice', nameEn: 'Justice', nameAr: 'العدالة', descriptionEn: 'Fairness and equality', descriptionAr: 'الإنصاف والمساواة', categoryEn: 'Integrity', categoryAr: 'النزاهة' },
  { id: 'responsibility', nameEn: 'Responsibility', nameAr: 'المسؤولية', descriptionEn: 'Being accountable for your actions', descriptionAr: 'تحمّل مسؤولية أفعالك', categoryEn: 'Integrity', categoryAr: 'النزاهة' },
  
  // Well-being
  { id: 'health', nameEn: 'Health', nameAr: 'الصحة', descriptionEn: 'Physical and mental well-being', descriptionAr: 'الرفاهية الجسدية والنفسية', categoryEn: 'Well-being', categoryAr: 'الرفاهية' },
  { id: 'balance', nameEn: 'Balance', nameAr: 'التوازن', descriptionEn: 'Harmony between different life areas', descriptionAr: 'الانسجام بين مجالات الحياة المختلفة', categoryEn: 'Well-being', categoryAr: 'الرفاهية' },
  { id: 'peace', nameEn: 'Inner Peace', nameAr: 'السلام الداخلي', descriptionEn: 'Calmness and serenity of mind', descriptionAr: 'الهدوء والسكينة الذهنية', categoryEn: 'Well-being', categoryAr: 'الرفاهية' },
  { id: 'freedom', nameEn: 'Freedom', nameAr: 'الحرية', descriptionEn: 'Independence and autonomy', descriptionAr: 'الاستقلالية والحرية', categoryEn: 'Well-being', categoryAr: 'الرفاهية' },
  
  // Contribution
  { id: 'service', nameEn: 'Service', nameAr: 'الخدمة', descriptionEn: 'Helping others and contributing', descriptionAr: 'مساعدة الآخرين والمساهمة', categoryEn: 'Contribution', categoryAr: 'المساهمة' },
  { id: 'legacy', nameEn: 'Legacy', nameAr: 'الإرث', descriptionEn: 'Leaving a lasting positive impact', descriptionAr: 'ترك أثر إيجابي دائم', categoryEn: 'Contribution', categoryAr: 'المساهمة' },
  { id: 'community', nameEn: 'Community', nameAr: 'المجتمع', descriptionEn: 'Building and supporting communities', descriptionAr: 'بناء ودعم المجتمعات', categoryEn: 'Contribution', categoryAr: 'المساهمة' },
  { id: 'mentoring', nameEn: 'Mentoring', nameAr: 'الإرشاد', descriptionEn: 'Guiding and developing others', descriptionAr: 'توجيه وتطوير الآخرين', categoryEn: 'Contribution', categoryAr: 'المساهمة' },
];

const categoryColors: Record<string, string> = {
  'Personal Growth': '#3DD4B0',
  'النمو الشخصي': '#3DD4B0',
  'Achievement': '#2A8A94',
  'الإنجاز': '#2A8A94',
  'Relationships': '#C97B7B',
  'العلاقات': '#C97B7B',
  'Integrity': '#2A8A94',
  'النزاهة': '#2A8A94',
  'Well-being': '#2A8A94',
  'الرفاهية': '#2A8A94',
  'Contribution': '#3DD4B0',
  'المساهمة': '#3DD4B0'
};

export default function ValuesClarificationPage() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [topFive, setTopFive] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [step, setStep] = useState<'select' | 'rank'>('select');

  const handleSelectValue = (valueId: string) => {
    if (selectedValues.includes(valueId)) {
      setSelectedValues(selectedValues.filter(id => id !== valueId));
    } else if (selectedValues.length < 10) {
      setSelectedValues([...selectedValues, valueId]);
    }
  };

  const moveToRanking = () => {
    if (selectedValues.length >= 5) {
      setTopFive(selectedValues.slice(0, 5));
      setStep('rank');
    }
  };

  const moveValueUp = (index: number) => {
    if (index > 0) {
      const newTopFive = [...topFive];
      [newTopFive[index - 1], newTopFive[index]] = [newTopFive[index], newTopFive[index - 1]];
      setTopFive(newTopFive);
    }
  };

  const moveValueDown = (index: number) => {
    if (index < topFive.length - 1) {
      const newTopFive = [...topFive];
      [newTopFive[index], newTopFive[index + 1]] = [newTopFive[index + 1], newTopFive[index]];
      setTopFive(newTopFive);
    }
  };

  const handleComplete = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedValues([]);
    setTopFive([]);
    setShowResults(false);
    setStep('select');
  };

  const getValue = (id: string) => valuesList.find(v => v.id === id);

  // Group values by category key for rendering
  const categoryGroups = [
    { key: 'growth', categoryEn: 'Personal Growth', categoryAr: 'النمو الشخصي' },
    { key: 'achievement', categoryEn: 'Achievement', categoryAr: 'الإنجاز' },
    { key: 'relationships', categoryEn: 'Relationships', categoryAr: 'العلاقات' },
    { key: 'integrity', categoryEn: 'Integrity', categoryAr: 'النزاهة' },
    { key: 'wellbeing', categoryEn: 'Well-being', categoryAr: 'الرفاهية' },
    { key: 'contribution', categoryEn: 'Contribution', categoryAr: 'المساهمة' },
  ];

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
              {getText('← Back to Apps', '→ العودة للتطبيقات')}
            </Link>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-10 h-10 rounded-xl bg-[#C97B7B]/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-[#C97B7B]" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{getText('Values Clarification Tool', 'أداة توضيح القيم')}</h1>
                <p className="text-slate-400 text-sm">{getText('FREE • 5 min', 'مجاني • ٥ دقائق')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#3DD4B0]/10 text-[#3DD4B0] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">{getText('Your Top 5 Core Values', 'أهم ٥ قيم أساسية لديك')}</h2>
            <p className="text-slate-400">{getText('The values that define who you are and guide your decisions', 'القيم التي تحدد هويتك وتوجه قراراتك')}</p>
          </div>

          {/* Top 5 Values Display */}
          <div className="space-y-4 mb-8">
            {topFive.map((valueId, index) => {
              const value = getValue(valueId);
              if (!value) return null;
              const categoryKey = locale === 'ar' ? value.categoryAr : value.categoryEn;
              return (
                <Card key={valueId} className="bg-white overflow-hidden">
                  <div 
                    className="h-2" 
                    style={{ backgroundColor: categoryColors[categoryKey] }}
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: categoryColors[categoryKey] }}
                      >
                        #{index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#0F1C2E]">{locale === 'ar' ? value.nameAr : value.nameEn}</h3>
                        <p className="text-[#8A94A6]">{locale === 'ar' ? value.descriptionAr : value.descriptionEn}</p>
                        <Badge 
                          className="mt-2"
                          style={{ backgroundColor: `${categoryColors[categoryKey]}20`, color: categoryColors[categoryKey] }}
                        >
                          {categoryKey}
                        </Badge>
                      </div>
                      {index === 0 && (
                        <div className="text-right">
                          <Star className="w-6 h-6 text-[#2A8A94] fill-[#2A8A94]" />
                          <p className="text-xs text-[#8A94A6]">{getText('Core Value', 'القيمة الأساسية')}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Reflection Questions */}
          <Card className="bg-white mb-8">
            <CardHeader>
              <CardTitle className="text-[#0F1C2E]">{getText('Reflection Questions', 'أسئلة للتأمل')}</CardTitle>
              <CardDescription>{getText('Use these questions to deepen your understanding of your values', 'استخدم هذه الأسئلة لتعميق فهمك لقيمك')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">{getText('How do your daily actions reflect your top value?', 'كيف تعكس أفعالك اليومية أهم قيمة لديك؟')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">{getText('When did you last make a decision that conflicted with these values?', 'متى اتخذت آخر قرار تعارض مع هذه القيم؟')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">{getText('What would your life look like if you fully embodied these values?', 'كيف ستبدو حياتك لو تجسدت هذه القيم بالكامل فيك؟')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-[#3DD4B0] mt-1 flex-shrink-0" />
                  <span className="text-[#2B2E34]">{getText('Which of these values needs more attention in your current life?', 'أي من هذه القيم تحتاج إلى مزيد من الاهتمام في حياتك الحالية؟')}</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-[#0F1C2E]">
            <CardContent className="p-6 text-center">
              <h3 className="text-white text-xl font-bold mb-2">{getText('Live Your Values Daily', 'عِش قيمك يوميًا')}</h3>
              <p className="text-slate-400 mb-4">
                {getText('The Identity Recode System helps you align your actions with your core values every day.', 'يساعدك نظام إعادة برمجة الهوية على محاذاة أفعالك مع قيمك الأساسية كل يوم.')}
              </p>
              <Link href="/products">
                <Button className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8">
                  {getText('Start Your Transformation', 'ابدأ تحولك')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-8">
            <Button onClick={handleReset} variant="secondary" className="shadow-md">
              <RotateCcw className="w-4 h-4 mr-2" />
              {getText('Start Over', 'ابدأ من جديد')}
            </Button>
            <Button 
              onClick={() => {
                const data = {
                  date: new Date().toISOString(),
                  topFiveValues: topFive.map((id, i) => {
                    const v = getValue(id);
                    return { rank: i + 1, ...v };
                  })
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `core-values-${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="bg-[#1F6F78] text-white hover:bg-[#1a5a62]"
            >
              <Download className="w-4 h-4 mr-2" />
              {getText('Export Results', 'تصدير النتائج')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F1C2E] via-[#0F1C2E] to-[#1F6F78]" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-[#0F1C2E] text-white py-6 px-4 border-b border-[#1F6F78]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/apps" className="text-[#3DD4B0] hover:underline text-sm mb-4 inline-block">
            {getText('← Back to Apps', '→ العودة للتطبيقات')}
          </Link>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-10 h-10 rounded-xl bg-[#C97B7B]/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#C97B7B]" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{getText('Values Clarification Tool', 'أداة توضيح القيم')}</h1>
              <p className="text-slate-400 text-sm">{getText('FREE • 5 min', 'مجاني • ٥ دقائق')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {step === 'select' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{getText('Step 1: Select Your Values', 'الخطوة ١: اختر قيمك')}</h2>
              <p className="text-slate-400">
                {getText("Choose 5-10 values that resonate most with you. You'll rank them in the next step.", 'اختر ٥-١٠ قيم تتوافق معك أكثر. سترتبها في الخطوة التالية.')}
              </p>
              <Badge className="mt-4 bg-[#3DD4B0]/10 text-[#3DD4B0]">
                {getText('Selected:', 'مختار:')} {selectedValues.length}/10
              </Badge>
            </div>

            {/* Values Grid by Category */}
            <div className="space-y-6 mb-8">
              {categoryGroups.map(group => {
                const categoryValues = valuesList.filter(v => v.categoryEn === group.categoryEn);
                const categoryKey = locale === 'ar' ? group.categoryAr : group.categoryEn;
                return (
                  <div key={group.key}>
                    <h3 
                      className="text-sm font-semibold uppercase tracking-wide mb-3"
                      style={{ color: categoryColors[group.categoryEn] }}
                    >
                      {categoryKey}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categoryValues.map(value => (
                        <button
                          key={value.id}
                          onClick={() => handleSelectValue(value.id)}
                          disabled={!selectedValues.includes(value.id) && selectedValues.length >= 10}
                          className={`p-4 rounded-xl text-left transition-all ${
                            selectedValues.includes(value.id)
                              ? 'ring-2'
                              : 'bg-white/5 hover:bg-white/10 disabled:opacity-50'
                          }`}
                          style={{
                            backgroundColor: selectedValues.includes(value.id) ? `${categoryColors[group.categoryEn]}20` : undefined,
                            borderColor: selectedValues.includes(value.id) ? categoryColors[group.categoryEn] : undefined,
                            '--tw-ring-color': selectedValues.includes(value.id) ? categoryColors[group.categoryEn] : undefined
                          } as React.CSSProperties}
                        >
                          <h4 className="font-semibold text-white mb-1">{locale === 'ar' ? value.nameAr : value.nameEn}</h4>
                          <p className="text-xs text-slate-400">{locale === 'ar' ? value.descriptionAr : value.descriptionEn}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Continue Button */}
            <div className="text-center">
              <Button
                onClick={moveToRanking}
                disabled={selectedValues.length < 5}
                className="bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] font-semibold px-8 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                {getText('Continue to Ranking', 'الاستمرار للترتيب')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}

        {step === 'rank' && (
          <>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{getText('Step 2: Rank Your Top 5', 'الخطوة ٢: رتّب أهم ٥ قيم')}</h2>
              <p className="text-slate-400">
                {getText('Drag to reorder. Your top value should be at #1.', 'أعد الترتيب. يجب أن تكون أهم قيمة في المرتبة الأولى.')}
              </p>
            </div>

            {/* Ranking List */}
            <Card className="bg-white mb-8">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {topFive.map((valueId, index) => {
                    const value = getValue(valueId);
                    if (!value) return null;
                    const categoryKey = locale === 'ar' ? value.categoryAr : value.categoryEn;
                    return (
                      <div 
                        key={valueId}
                        className="flex items-center gap-4 p-4 bg-[#F6F8FA] rounded-xl"
                      >
                        <GripVertical className="w-5 h-5 text-[#8A94A6] cursor-move" />
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: categoryColors[categoryKey] }}
                        >
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#0F1C2E]">{locale === 'ar' ? value.nameAr : value.nameEn}</h4>
                          <p className="text-xs text-[#8A94A6]">{locale === 'ar' ? value.descriptionAr : value.descriptionEn}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveValueUp(index)}
                            disabled={index === 0}
                            className="h-6 w-6 p-0"
                          >
                            ↑
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => moveValueDown(index)}
                            disabled={index === topFive.length - 1}
                            className="h-6 w-6 p-0"
                          >
                            ↓
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setStep('select')}
                variant="secondary"
                className="shadow-md"
              >
                {getText('← Back to Selection', '→ العودة للاختيار')}
              </Button>
              <Button
                onClick={handleComplete}
                variant="accent"
                className="font-semibold px-8 shadow-md"
              >
                {getText('Complete & See Results', 'إكمال ورؤية النتائج')}
                <CheckCircle2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
