'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Target,
  RefreshCw,
  Brain,
  Feather,
  Search,
  Layers,
  Hammer,
  CheckCircle2,
  BookOpen,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

// ═══════════════════════════════════════════════════════════════
// Official site content (verbatim from messages/en.json + messages/ar.json
// methodologyPage — recovery of /methodology/self-authorship, no new claims)
// ═══════════════════════════════════════════════════════════════
const OFFICIAL = {"en":{"heroBadge":"The Framework","concepts":[{"title":"Identity vs Behavior","description":"Behavior is what you do. Identity is who you are. Lasting change happens at the identity level."},{"title":"The Maintain IT Model","description":"A research framework showing how centered identity reduces executive function burden for sustainable change."},{"title":"Neuroplasticity","description":"Your brain can rewire itself. Repeated identity-aligned actions create new neural pathways that become automatic."},{"title":"Self-Authorship","description":"Moving from external influence to internal voice—consciously designing who you become."}],"phases":[{"number":"01","title":"Discover","subtitle":"Days 1-7","description":"Understand where you truly are—not where you think you should be. Identity audit, values excavation, pattern recognition.","activities":["Identity baseline assessment","Values exploration","Current pattern mapping"]},{"number":"02","title":"Deconstruct","subtitle":"Days 8-14","description":"Peel back layers of conditioning, expectations, and inherited beliefs. Release what isn't authentically you.","activities":["Identify borrowed identities","Challenge should narratives","Release outdated beliefs"]},{"number":"03","title":"Reconstruct","subtitle":"Days 15-21","description":"Build your authentic identity. Create new narratives, align values with actions, establish identity-based habits.","activities":["Define core identity","Create empowering narratives","Build evidence log"]},{"number":"04","title":"Integrate","subtitle":"Days 22-30","description":"Make your new identity automatic. Environment alignment, daily practices, resilience protocols.","activities":["Daily embodiment","Environment optimization","Setback recovery plan"]}],"coreShiftFrom":"From","coreShiftFromText":"I want to exercise more","coreShiftTo":"To","coreShiftToText":"I am someone who moves my body"},"ar":{"heroBadge":"الإطار","concepts":[{"title":"الهوية مقابل السلوك","description":"السلوك هو ما تفعله. الهوية هي من أنت. التغيير الدائم يحدث على مستوى الهوية."},{"title":"نموذج Maintain IT","description":"إطار بحثي يوضح كيف تقلل الهوية المتمركزة من عبء الوظيفة التنفيذية للتغيير المستدام."},{"title":"اللدونة العصبية","description":"دماغك يمكنه إعادة توصيل نفسه. الأفعال المتكررة المتوافقة مع الهوية تخلق مسارات عصبية جديدة تصبح تلقائية."},{"title":"تأليف الذات","description":"الانتقال من التأثير الخارجي إلى الصوت الداخلي—تصميم من تصبح عليه بوعي."}],"phases":[{"number":"01","title":"اكتشف","subtitle":"الأيام 1-7","description":"افهم أين أنت حقاً—وليس حيث تعتقد أنه يجب أن تكون. تدقيق الهوية، استكشاف القيم، التعرف على الأنماط.","activities":["تقييم خط الأساس للهوية","استكشاف القيم","رسم خريطة الأنماط الحالية"]},{"number":"02","title":"فكّك","subtitle":"الأيام 8-14","description":"انزع طبقات التكييف والتوقعات والمعتقدات الموروثة. اطلق ما ليس أنت حقاً.","activities":["تحديد الهويات المستعارة","تحدي روايات الـ يجب","التخلي عن المعتقدات القديمة"]},{"number":"03","title":"أعد البناء","subtitle":"الأيام 15-21","description":"ابنِ هويتك الأصيلة. أنشئ روايات جديدة، وافق بين القيم والأفعال، أسّس عادات مبنية على الهوية.","activities":["تحديد الهوية الجوهرية","إنشاء روايات تمكينية","بناء سجل الأدلة"]},{"number":"04","title":"دمج","subtitle":"الأيام 22-30","description":"اجعل هويتك الجديدة تلقائية. توافق البيئة، الممارسات اليومية، بروتوكولات المرونة.","activities":["التجسيد اليومي","تحسين البيئة","خطة التعافي من النكسات"]}],"coreShiftFrom":"من","coreShiftFromText":"أريد أن أتمرن أكثر","coreShiftTo":"إلى","coreShiftToText":"أنا شخص يحرك جسده"}} as const;

const PHASE_ICONS = [Search, Layers, Hammer, CheckCircle2];
const PILLAR_ICONS = [Target, RefreshCw, Brain, Feather];

export default function SelfAuthorshipPage() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const c = isAr ? OFFICIAL.ar : OFFICIAL.en;
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const selfAuthEn = OFFICIAL.en.concepts[3];
  const selfAuthAr = OFFICIAL.ar.concepts[3];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="bg-[#0F1C2E] py-20 lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 px-4 py-2">
              {c.heroBadge}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {isAr ? "تأليف الذات" : "Self-Authorship"}
            </h1>
            {isAr && (
              <p className="text-sm text-[#3DD4B0] tracking-wide mb-4" dir="ltr">Self-Authorship</p>
            )}
            <p className="text-lg text-[#8A94A6] leading-relaxed max-w-2xl mx-auto">
              {isAr ? selfAuthAr.description : selfAuthEn.description}
            </p>
          </div>
        </div>
      </section>

      {/* CORE SHIFT */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <Card className="border-slate-200">
                <CardContent className="p-8 text-center">
                  <p className="text-sm font-medium text-[#8A94A6] mb-3">{c.coreShiftFrom}</p>
                  <p className="font-serif text-xl text-slate-700 leading-relaxed">
                    &ldquo;{c.coreShiftFromText}&rdquo;
                  </p>
                </CardContent>
              </Card>
              <div className="flex justify-center">
                <Arrow className="h-8 w-8 text-[#3DD4B0]" aria-hidden="true" />
              </div>
              <Card className="border-[#3DD4B0]/40 bg-[#3DD4B0]/5">
                <CardContent className="p-8 text-center">
                  <p className="text-sm font-medium text-[#3DD4B0] mb-3">{c.coreShiftTo}</p>
                  <p className="font-serif text-xl text-slate-900 leading-relaxed">
                    &ldquo;{c.coreShiftToText}&rdquo;
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS CONTEXT */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {isAr ? "المفاهيم الأساسية للمنهجية" : "Core Concepts of the Methodology"}
            </h2>
            <p className="text-[#8A94A6] text-center mb-12">
              {isAr
                ? "تأليف الذات هو المفهوم الرابع في منهجية إعادة ترميز الهوية."
                : "Self-Authorship is the fourth concept of the Identity Recode methodology."}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {c.concepts.map((concept, idx) => {
                const Icon = PILLAR_ICONS[idx] ?? Feather;
                const active = idx === 3;
                return (
                  <Card
                    key={concept.title}
                    className={active ? "border-[#3DD4B0] bg-white shadow-md" : "border-slate-200 bg-white"}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={active
                          ? "h-10 w-10 rounded-lg bg-[#3DD4B0]/15 flex items-center justify-center"
                          : "h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center"}>
                          <Icon className={active ? "h-5 w-5 text-[#3DD4B0]" : "h-5 w-5 text-slate-500"} aria-hidden="true" />
                        </div>
                        <h3 className="font-semibold text-slate-900">
                          {concept.title}
                          {active && (
                            <Badge className="ms-3 bg-[#3DD4B0] text-[#0F1C2E] border-0">
                              {isAr ? "هذه الصفحة" : "This page"}
                            </Badge>
                          )}
                        </h3>
                      </div>
                      <p className="text-sm text-[#8A94A6] leading-relaxed">{concept.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH FOUNDATION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Card className="border-slate-200">
              <CardContent className="p-8 flex items-start gap-5">
                <div className="h-12 w-12 shrink-0 rounded-lg bg-[#0F1C2E] flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-[#3DD4B0]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#8A94A6] mb-1">
                    {isAr ? "الأساس العلمي" : "Research foundation"}
                  </p>
                  <p className="text-slate-900 font-semibold">
                    {isAr
                      ? <>روبرت كيغان — نظرية تأليف الذات <span dir="ltr" className="text-[#8A94A6] font-normal">(Robert Kegan — Self-Authorship Theory)</span></>
                      : "Robert Kegan — Self-Authorship Theory"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 30-DAY PROTOCOL */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-4 text-center">
              {isAr ? "بروتوكول التحول خلال 30 يوماً" : "30-Day Transformation Protocol"}
            </h2>
            <p className="text-[#8A94A6] text-center mb-12">
              {isAr ? "أربع مراحل." : "Four phases."}
            </p>
            <div className="space-y-6">
              {c.phases.map((phase, idx) => {
                const Icon = PHASE_ICONS[idx] ?? CheckCircle2;
                return (
                  <Card key={phase.number} className="border-slate-200 bg-white">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                        <div className="flex items-center gap-4 sm:w-56 shrink-0">
                          <div className="h-12 w-12 shrink-0 rounded-lg bg-[#3DD4B0]/15 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-[#3DD4B0]" aria-hidden="true" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-[#3DD4B0] font-serif">{phase.number}</p>
                            <p className="font-semibold text-slate-900">{phase.title}</p>
                            <p className="text-xs text-[#8A94A6]">{phase.subtitle}</p>
                          </div>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{phase.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-24 bg-[#0F1C2E]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">
              {isAr ? "ابدأ بتصميم من تكون" : "Start designing who you become"}
            </h2>
            <p className="text-[#8A94A6] leading-relaxed mb-8">
              {isAr
                ? "خذ اختبار فجوة الهوية لتكتشف نقطة انطلاقك."
                : "Take the identity gap quiz to discover your starting point."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quiz">
                <Button className="bg-[#3DD4B0] hover:bg-[#3DD4B0]/90 text-[#0F1C2E] font-semibold px-8 py-3 h-auto">
                  {isAr ? "ابدأ الاختبار" : "Take the quiz"}
                </Button>
              </Link>
              <Link href="/methodology" className="text-[#8A94A6] hover:text-white transition-colors text-sm underline underline-offset-4">
                {isAr ? "العودة إلى المنهجية" : "Back to Methodology"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
