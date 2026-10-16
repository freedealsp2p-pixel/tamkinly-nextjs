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
  Quote,
  Compass,
  Scale,
  PenLine,
  ShieldCheck,
  Users,
  GraduationCap,
  ListChecks,
} from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";

// ═══════════════════════════════════════════════════════════════
// Official site content (verbatim from messages/en.json + messages/ar.json
// methodologyPage — recovery of /methodology/self-authorship, no new claims)
// ═══════════════════════════════════════════════════════════════
const OFFICIAL = {"en":{"heroBadge":"The Framework","concepts":[{"title":"Identity vs Behavior","description":"Behavior is what you do. Identity is who you are. Lasting change happens at the identity level."},{"title":"The Maintain IT Model","description":"A research framework showing how centered identity reduces executive function burden for sustainable change."},{"title":"Neuroplasticity","description":"Your brain can rewire itself. Repeated identity-aligned actions create new neural pathways that become automatic."},{"title":"Self-Authorship","description":"Moving from external influence to internal voice—consciously designing who you become."}],"phases":[{"number":"01","title":"Discover","subtitle":"Days 1-7","description":"Understand where you truly are—not where you think you should be. Identity audit, values excavation, pattern recognition.","activities":["Identity baseline assessment","Values exploration","Current pattern mapping"]},{"number":"02","title":"Deconstruct","subtitle":"Days 8-14","description":"Peel back layers of conditioning, expectations, and inherited beliefs. Release what isn't authentically you.","activities":["Identify borrowed identities","Challenge should narratives","Release outdated beliefs"]},{"number":"03","title":"Reconstruct","subtitle":"Days 15-21","description":"Build your authentic identity. Create new narratives, align values with actions, establish identity-based habits.","activities":["Define core identity","Create empowering narratives","Build evidence log"]},{"number":"04","title":"Integrate","subtitle":"Days 22-30","description":"Make your new identity automatic. Environment alignment, daily practices, resilience protocols.","activities":["Daily embodiment","Environment optimization","Setback recovery plan"]}],"coreShiftFrom":"From","coreShiftFromText":"I want to exercise more","coreShiftTo":"To","coreShiftToText":"I am someone who moves my body"},"ar":{"heroBadge":"الإطار","concepts":[{"title":"الهوية مقابل السلوك","description":"السلوك هو ما تفعله. الهوية هي من أنت. التغيير الدائم يحدث على مستوى الهوية."},{"title":"نموذج Maintain IT","description":"إطار بحثي يوضح كيف تقلل الهوية المتمركزة من عبء الوظيفة التنفيذية للتغيير المستدام."},{"title":"اللدونة العصبية","description":"دماغك يمكنه إعادة توصيل نفسه. الأفعال المتكررة المتوافقة مع الهوية تخلق مسارات عصبية جديدة تصبح تلقائية."},{"title":"تأليف الذات","description":"الانتقال من التأثير الخارجي إلى الصوت الداخلي—تصميم من تصبح عليه بوعي."}],"phases":[{"number":"01","title":"اكتشف","subtitle":"الأيام 1-7","description":"افهم أين أنت حقاً—وليس حيث تعتقد أنه يجب أن تكون. تدقيق الهوية، استكشاف القيم، التعرف على الأنماط.","activities":["تقييم خط الأساس للهوية","استكشاف القيم","رسم خريطة الأنماط الحالية"]},{"number":"02","title":"فكّك","subtitle":"الأيام 8-14","description":"انزع طبقات التكييف والتوقعات والمعتقدات الموروثة. اطلق ما ليس أنت حقاً.","activities":["تحديد الهويات المستعارة","تحدي روايات الـ يجب","التخلي عن المعتقدات القديمة"]},{"number":"03","title":"أعد البناء","subtitle":"الأيام 15-21","description":"ابنِ هويتك الأصيلة. أنشئ روايات جديدة، وافق بين القيم والأفعال، أسّس عادات مبنية على الهوية.","activities":["تحديد الهوية الجوهرية","إنشاء روايات تمكينية","بناء سجل الأدلة"]},{"number":"04","title":"دمج","subtitle":"الأيام 22-30","description":"اجعل هويتك الجديدة تلقائية. توافق البيئة، الممارسات اليومية، بروتوكولات المرونة.","activities":["التجسيد اليومي","تحسين البيئة","خطة التعافي من النكسات"]}],"coreShiftFrom":"من","coreShiftFromText":"أريد أن أتمرن أكثر","coreShiftTo":"إلى","coreShiftToText":"أنا شخص يحرك جسده"}} as const;

const PHASE_ICONS = [Search, Layers, Hammer, CheckCircle2];
const PILLAR_ICONS = [Target, RefreshCw, Brain, Feather];

// ═══════════════════════════════════════════════════════════════
// Published research (Hermes reference sweep — Self-Authorship):
// Baxter Magolda 20+ yr longitudinal phases, 3 dimensions, LPM,
// Future Authoring documented outcomes. Publicly published material —
// safe to cite. Tamkinly mapping uses ONLY officially live content.
// ═══════════════════════════════════════════════════════════════
const SCIENCE = {
  en: {
    badge: "The research",
    title: "What self-authorship means",
    quote: "The internal capacity to define one's own beliefs, identity, and social relationships — instead of borrowing them from an external authority (Baxter Magolda, 2001).",
    dimsTitle: "Three dimensions",
    dims: [
      ["Cognitive", "How do I know? — from absolute certainty to contextual judgment."],
      ["Intrapersonal", "Who am I? — identity and capability, from within."],
      ["Interpersonal", "How do I relate? — built from one's own identity, not others' expectations."],
    ],
    phasesTitle: "Four phases of becoming the author of your life",
    phasesBy: "Marcia Baxter Magolda — a 20-year longitudinal study (1986–2006, 39 participants)",
    phases: [
      ["Following formulas", "Reliance on external opinions for values and beliefs."],
      ["Crossroads", "Experiences that shake the old balance and force a review of beliefs."],
      ["Authoring your life", "Building an independent personal identity — and acting on it."],
      ["Internal foundations", "A settled inner authority that organizes thinking and relationships."],
    ],
    phasesGoal: "The end goal: contextual knowing — seeing knowledge in its context and evaluating claims with informed judgment.",
    lpmTitle: "Learning Partnerships Model",
    lpmBy: "Six dynamics distilled into three principles",
    lpm: [
      "Learners are trusted to build knowledge, not just receive it.",
      "Learning is situated in the learner's own experience.",
      "Meaning is built mutually — exchanging perspectives, constructing together.",
    ],
    faTitle: "Future Authoring — documented outcomes",
    faVisionTitle: "Step 1 — Vision",
    faVision: "A positive future vision (3–5 years) + a negative one (what if bad habits take over).",
    faPlanTitle: "Step 2 — Plan",
    faPlan: "Analyze the vision, set and justify goals, anticipate obstacles, track progress.",
    faBody: "Documented results (HEQCO + Erasmus): dropout reduced by 3.3–4.3 percentage points; study abandonment fell from 14.8% (control) to ~11% (participants).",
    faBy: "Jordan B. Peterson — Future Authoring program",
    mapTitle: "From the research to our 30-day protocol",
    mapIntro: "The same arc, mapped onto the Identity Recode phases.",
    map: [
      ["Following formulas", "Behavior-only change stays fragile without a deeper self-concept."],
      ["Crossroads", "Deconstruct — days 8–14: name borrowed identities and challenge inherited “shoulds”."],
      ["Authoring your life", "Reconstruct — days 15–21: build the identity you choose to move toward."],
      ["Internal foundations", "Integrate — days 22–30: daily embodiment and environment optimization."],
    ],
  },
  ar: {
    badge: "البحث العلمي",
    title: "ماذا يعني تأليف الذات؟",
    quote: "القدرة الداخلية على تعريف معتقدات الشخص وهويته وعلاقاته الاجتماعية — بدل استعارتها من سلطة خارجية (أب، معلم، مجتمع) — باكستر ماغولدا، 2001.",
    dimsTitle: "ثلاثة أبعاد",
    dims: [
      ["المعرفي", "كيف أعرف؟ — من اليقين المطلق إلى الحكم السياقي."],
      ["الشخصي", "من أنا؟ — الهوية والقدرة، من الداخل."],
      ["البين-شخصي", "كيف أرتبط؟ — علاقات تُبنى من هوية الشخص لا من توقعات الآخرين."],
    ],
    phasesTitle: "أربع مراحل لتصبح مؤلّف حياتك",
    phasesBy: "مارشيا باكستر ماغولدا — دراسة طولية استغرقت 20 عاماً (1986–2006، 39 مشاركاً من 18 إلى 40 سنة)",
    phases: [
      ["اتباع الوصفات", "الاعتماد على الآراء الخارجية في القيم والمعتقدات."],
      ["التقاطع", "تجارب تهز التوازن وتجبر الشخص على مراجعة معتقداته."],
      ["كتابة الحياة", "بناء هوية شخصية مستقلة — والتصرف وفقها."],
      ["الأسس الداخلية", "سلطة داخلية راسخة تنظم التفكير والعلاقات."],
    ],
    phasesGoal: "الهدف النهائي: المعرفة السياقية — رؤية المعرفة في سياقها النسبي وتقييم الادعاءات بالحكم المستنير.",
    lpmTitle: "نموذج شراكات التعلم",
    lpmBy: "ستة ديناميكيات تجمع في ثلاثة مبادئ",
    lpm: [
      "المتعلم مبني للمعرفة — تصديق قدرته على بناء المعرفة لا تلقّيها.",
      "التعلم في الخبرة — المعرفة توضع في سياق خبرة المتعلم الشخصية.",
      "بناء معنى متبادل — تبادل وجهات النظر وبناء المعنى اجتماعياً.",
    ],
    faTitle: "برنامج تأليف المستقبل — نتائج موثقة",
    faVisionTitle: "المرحلة الأولى — الرؤية",
    faVision: "رؤية إيجابية للمستقبل (3–5 سنوات) + رؤية سلبية (ماذا لو سيطرت العادات السيئة).",
    faPlanTitle: "المرحلة الثانية — الخطة",
    faPlan: "تحليل الرؤية، تحديد الأهداف وترتيبها وتبريرها، توقع العقبات، مراقبة التقدم.",
    faBody: "النتائج الموثقة (HEQCO + Erasmus): انخفاض التسرب 3.3–4.3 نقطة مئوية؛ ترك الدراسة هبط من 14.8% (ضابط) إلى ~11% (مشاركون).",
    faBy: "جوردان ب. بيترسن — برنامج Future Authoring",
    mapTitle: "من البحث إلى بروتوكول الـ 30 يوماً",
    mapIntro: "القوس نفسه، مرسوماً على مراحل إعادة ترميز الهوية.",
    map: [
      ["اتباع الوصفات", "التغيير السلوكي وحده يبقى هشاً دون مفهوم أعمق للذات."],
      ["التقاطع", "فكّك — الأيام 8-14: تحديد الهويات المستعارة وتحدي روايات الـ«يجب»."],
      ["كتابة الحياة", "أعد البناء — الأيام 15-21: بناء الهوية التي تختار التقدم نحوها."],
      ["الأسس الداخلية", "دمج — الأيام 22-30: التجسيد اليومي وتحسين البيئة."],
    ],
  },
} as const;

const SCI_PHASE_ICONS = [Compass, Scale, PenLine, ShieldCheck];

export default function SelfAuthorshipPage() {
  const { locale } = useLocale();
  const isAr = locale === "ar";
  const c = isAr ? OFFICIAL.ar : OFFICIAL.en;
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const selfAuthEn = OFFICIAL.en.concepts[3];
  const selfAuthAr = OFFICIAL.ar.concepts[3];
  const s = isAr ? SCIENCE.ar : SCIENCE.en;

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

      {/* THE SCIENCE — definition + three dimensions */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-6 bg-[#3DD4B0]/10 text-[#3DD4B0] border-0 px-4 py-2">
              {s.badge}
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-8">
              {s.title}
            </h2>
            <div className="relative bg-white border border-slate-200 rounded-xl p-8 sm:p-10 shadow-sm">
              <Quote className="h-8 w-8 text-[#3DD4B0] mb-4 mx-auto" aria-hidden="true" />
              <p className="font-serif text-xl sm:text-2xl text-slate-800 leading-relaxed">
                {s.quote}
              </p>
            </div>
            <div className="mt-8 grid sm:grid-cols-3 gap-4 text-start">
              {s.dims.map((d) => (
                <div key={d[0]} className="bg-white border border-slate-200 rounded-xl p-5">
                  <p className="font-semibold text-slate-900 mb-2">{d[0]}</p>
                  <p className="text-sm text-[#8A94A6] leading-relaxed">{d[1]}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#8A94A6]">{s.dimsTitle}</p>
          </div>
        </div>
      </section>

      {/* BAXTER MAGOLDA — FOUR PHASES */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                {s.phasesTitle}
              </h2>
              <p className="text-sm text-[#8A94A6]">{s.phasesBy}</p>
            </div>
            <div className="space-y-6">
              {s.phases.map((phase, idx) => {
                const Icon = SCI_PHASE_ICONS[idx] ?? Feather;
                return (
                  <Card key={phase[0]} className="border-slate-200 bg-white">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start gap-5">
                        <div className="h-12 w-12 shrink-0 rounded-lg bg-[#0F1C2E] flex items-center justify-center">
                          <Icon className="h-6 w-6 text-[#3DD4B0]" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#3DD4B0] font-serif mb-1">0{idx + 1}</p>
                          <h3 className="font-semibold text-slate-900 mb-2">{phase[0]}</h3>
                          <p className="text-slate-600 leading-relaxed">{phase[1]}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <p className="mt-8 text-center text-sm text-[#8A94A6] max-w-2xl mx-auto">{s.phasesGoal}</p>
          </div>
        </div>
      </section>

      {/* EVIDENCE — LPM + Future Authoring */}
      <section className="py-20 lg:py-28 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <Card className="border-slate-200 bg-white">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-[#3DD4B0]/15 flex items-center justify-center mb-5">
                  <Users className="h-6 w-6 text-[#3DD4B0]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">{s.lpmTitle}</h3>
                <p className="text-sm text-[#8A94A6] mb-5">{s.lpmBy}</p>
                <ul className="space-y-3">
                  {s.lpm.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                      <ListChecks className="h-5 w-5 shrink-0 text-[#3DD4B0] mt-0.5" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-[#3DD4B0]/40 bg-white">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-[#3DD4B0]/15 flex items-center justify-center mb-5">
                  <GraduationCap className="h-6 w-6 text-[#3DD4B0]" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-1">{s.faTitle}</h3>
                <p className="text-sm text-[#8A94A6] mb-5">{s.faBy}</p>
                <p className="text-sm font-semibold text-slate-900 mb-1">{s.faVisionTitle}</p>
                <p className="text-slate-600 leading-relaxed mb-4">{s.faVision}</p>
                <p className="text-sm font-semibold text-slate-900 mb-1">{s.faPlanTitle}</p>
                <p className="text-slate-600 leading-relaxed mb-5">{s.faPlan}</p>
                <div className="rounded-lg bg-[#3DD4B0]/5 border border-[#3DD4B0]/30 p-4">
                  <p className="text-slate-800 text-sm leading-relaxed font-medium">{s.faBody}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MAPPING — research arc onto official protocol phases */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
                {s.mapTitle}
              </h2>
              <p className="text-[#8A94A6]">{s.mapIntro}</p>
            </div>
            <div className="space-y-6">
              {s.map.map((row, idx) => {
                const Icon = SCI_PHASE_ICONS[idx] ?? Feather;
                return (
                  <div key={row[0]} className="grid sm:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                    <Card className="border-slate-200">
                      <CardContent className="p-5 flex items-center gap-3">
                        <Icon className="h-5 w-5 shrink-0 text-[#8A94A6]" aria-hidden="true" />
                        <p className="font-semibold text-slate-700 text-sm">{row[0]}</p>
                      </CardContent>
                    </Card>
                    <Arrow className="h-5 w-5 text-[#3DD4B0] justify-self-center" aria-hidden="true" />
                    <Card className="border-[#3DD4B0]/40 bg-[#3DD4B0]/5">
                      <CardContent className="p-5">
                        <p className="text-slate-800 text-sm leading-relaxed">{row[1]}</p>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
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
