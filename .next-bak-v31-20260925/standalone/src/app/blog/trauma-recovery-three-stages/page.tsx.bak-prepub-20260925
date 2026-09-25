'use client';

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, User, ShieldCheck, TreePine, Waves, HeartHandshake, CalendarDays, Phone, Sparkles } from "lucide-react";
import { ArticleNavigation } from "@/components/blog/ArticleNavigation";
import { ArticleReferences } from '@/components/blog/ArticleReferences';
import { useLocale } from '@/components/providers/LocaleProvider';

import { BlogArticleCTA } from '@/components/blog/BlogArticleCTA';
import { BlogConversionSection } from '@/components/blog/BlogConversionSection';
import { MidArticleUpgrade } from '@/components/blog/MidArticleUpgrade';
import { BlogArticleJsonLd } from "@/components/seo/JsonLd";
import { ArticleFigure } from '@/components/blog/ArticleFigure';

export default function TraumaRecoveryThreeStagesArticle() {
  const { locale } = useLocale();
  const getText = (en: string, ar: string) => locale === 'ar' ? ar : en;

  const relatedArticles = [
    { slug: "vagus-nerve-breathing", title: getText("Vagus Nerve Breathing: The Science of Calming Your Body on Command", "تنفس العصب المبهم: علم تهدئة جسدك بقدرتك"), readTime: getText("9 min read", "٩ دقائق قراءة") },
    { slug: "erq-emotional-regulation-worksheet", title: getText("Emotional Regulation Worksheet: Master Your ERQ Skills", "ورقة عمل التنظيم العاطفي: أتقن مهاراتك في تنظيم المشاعر"), readTime: getText("8 min read", "٨ دقائق قراءة") },
    { slug: "dopamine-reset", title: getText("Dopamine Reset: Reclaiming Your Attention in a Hyperstimulating World", "إعادة ضبط الدوبامين: استعد انتباهك في عالم مفرط التحفيز"), readTime: getText("9 min read", "٩ دقائق قراءة") }
  ];

  return (
    <>
      <BlogArticleJsonLd
      headline="The Three Stages of Trauma Recovery: Safety, Regulation, Integration"
      headlineAr="مراحل التعافي من الصدمات: الأمان ثم التنظيم ثم التكامل"
      description="A clinical three-stage map of trauma recovery: stabilize your nervous system, learn regulation tools like grounding and paced breathing, then integrate the story without being flooded by it."
      slug="trauma-recovery-three-stages"
      datePublished="2026-09-16"
      dateModified="2026-09-16"
      author="Tamkinly Team"
      keywords={ ["trauma recovery stages", "trauma recovery", "nervous system regulation", "grounding techniques", "window of tolerance", "polyvagal theory", "stabilization"] }
        image="/uploads/articles/trauma-recovery-three-stages.webp"
    />
    <article className="min-h-screen" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-slate-900 py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Badge variant="outline" className="mb-4 px-4 py-2 border-accent/30 text-accent bg-accent/10">
              {getText("Recovery", "التعافي")}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              {getText("The Three Stages of Trauma Recovery: Safety, Regulation, Integration", "مراحل التعافي من الصدمات: الأمان ثم التنظيم ثم التكامل")}
            </h1>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {getText("12 min read", "١٢ دقيقة قراءة")}
              </span>
              <span className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {getText("Tamkinly Team", "فريق تمكينلي")}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto prose prose-lg">
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-medium">
              {getText(
                "Trauma does not live in the past. It lives in the body's present — in a nervous system that learned, somewhere along the way, that the world is dangerous and that staying on guard is how you survive. If you have ever wondered why you can 'know better' and still feel flooded, numb, or braced for disaster, this is the answer: your alarm system is still doing yesterday's job. The good news, established across decades of clinical work, is that recovery from trauma follows a map — and the map has three stages.",
                "الصدمة لا تسكن الماضي؛ إنها تسكن حاضر الجسد — في جهاز عصبي تعلّم، في مرحلة ما، أن العالم خطر وأن اليقظة الدائمة هي سبيل النجاة. إن سألت نفساً يوماً كيف «تعرف الأفضل» ومع ذلك تغرقك المشاعر أو تخدرك أو تشعر باستعداد دائم للكارثة، فهذا هو الجواب: نظام الإنذار لديك لا يزال يؤدي وظيفة الأمس. والخبر الجيد، الذي استقر في عقود من العمل السريري، أن التعافي من الصدمات يتبع خريطة — والخريطة لها ثلاث مراحل."
              )}
            </p>

            <div className="my-8 rounded-lg p-4 text-sm leading-relaxed" style={{ backgroundColor: '#FFF8F0', border: '1px solid #FDE68A', color: '#7C5E00' }}>
              {getText(
                "This guide is educational and free. Processing trauma — especially severe or childhood trauma — is deep work that deserves a trained professional alongside you. The tools here are a free companion for stabilization and daily practice, not a replacement for trauma-focused therapy.",
                "هذا الدليل تثقيفي ومجاني. معالجة الصدمة — خصوصاً إن كانت شديدة أو من الطفولة — عملٌ عميق يستحق معالجاً مدرّباً بجانبك. الأدوات هنا رفيقة مجانية للتثبيت والممارسة اليومية، وليست بديلاً عن العلاج الموجّه للصدمات."
              )}
            </div>
            <ArticleFigure
              src="/uploads/articles/trauma-recovery-three-stages.webp"
              width={1376}
              height={768}
              alt={{
                en: "Three ascending illuminated plateaus under a dawn gradient with a figure on the first",
                ar: "ثلاثة هضاب مضيئة متصاعدة تحت تدرّج فجر وشخصية على الأول",
              }}
              title={{
                en: "The Three Stages of Trauma Recovery",
                ar: "مراحل التعافي من الصدمات الثلاث",
              }}
              caption={{
                en: "Safety, then regulation, then integration — the order is the map.",
                ar: "الأمان ثم التنظيم ثم التكامل — الترتيب هو الخريطة.",
              }}
            />


            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("What Trauma Does to the Brain and Body", "ماذا تفعل الصدمة بالدماغ والجسد")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "When an experience overwhelms your capacity to cope, the brain does something practical: it files the memory in fragments — sensations, images, body states — rather than as a tidy story with a beginning and an end. Psychiatrist Bessel van der Kolk summarized decades of research in the phrase that named his famous book: the body keeps the score. The result is a nervous system that reacts to present-moment cues (a tone of voice, a smell, a crowded room) as if the old threat were happening now. That is why trauma is measured less by what happened and more by how much it still shapes your today.",
                "حين تتجاوز التجربة قدرة أنت على الاستيعاب، يفعل الدماغ شيئاً عملياً: يحفظ الذاكرة على شكل شذرات — إحساسات وصور وحالات جسدية — لا على شكل قصة مرتبة لها بداية ونهاية. لخّص الطبيب النفسي بيسل فان دير كولك عقوداً من البحث في العبارة التي سمّت كتابه الشهير: الجسد يحتسب النقاط. والنتيجة جهاز عصبي يستجيب لإشارات الحاضر (نبرة صوت، أو رائحة، أو غرفة مزدحمة) كأن الخطر القديم يقع الآن. لهذا لا تُقاس الصدمة بما حدث بقدر ما تُقاس بمقدار ما تشكّل حاضرك اليوم."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Two systems carry most of the load. The amygdala — the brain's smoke detector — becomes over-sensitive and fires alarms at harmless sparks. Meanwhile the hippocampus, which timestamps memories as past, and the prefrontal cortex, which provides perspective, get quieter under chronic stress. Stephen Porges' polyvagal theory adds the body's piece: your autonomic nervous system constantly scans for danger below conscious thought, and when it detects threat, it shifts you into fight, flight, or shutdown before you have a single word for what is happening. Trauma recovery is, at its core, the process of teaching these systems that the danger has passed.",
                "نظامان يحملان معظم العبء. اللوزة الدماغية — كاشف الدخان في الدماغ — تصبح شديدة الحساسية وتُطلق إنذارات على شرارات بلا خطر. وفي المقابل يخفت نشاط الحُصين الذي يختم الذاكرة بطابع «الماضي»، والقشرة الجبهية التي تمنح منظوراً أوسع، تحت الضغط المزمن. وتضيف نظرية العصب المتعدد لستيفن بورجز قطعة الجسد: جهازك العصبي الذاتي يمسح الخطر باستمرار دون وعي، وحين يكشف تهديداً ينقلك إلى القتال أو الهرب أو التجمّد قبل أن تجد كلمة واحدة لما يحدث. التعافي من الصدمة هو، في جوهره، عملية تعليم هذه الأنظمة أن الخطر قد انقضى."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("The Three-Stage Model: A Clinical Consensus", "نموذج المراحل الثلاث: توافق سريري راسخ")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The most influential framework comes from psychiatrist Judith Herman, whose 1992 work established that trauma recovery unfolds in stages — safety first, remembrance and mourning second, reconnection third. Modern trauma care, from phased trauma-focused CBT to EMDR protocols, keeps the same architecture under slightly different names: safety and stabilization, then regulation and processing, then integration and reconnection. Tamkinly's Trauma Recovery Journey follows this same clinical sequence. The order is not a suggestion; it is the load-bearing wall of the whole model.",
                "الإطار الأكثر تأثيراً يأتي من الطبيبة النفسية جوديث هيرمان، التي رسّخ عملها عام ١٩٩٢ أن التعافي من الصدمات يتكشّف على مراحل — الأمان أولاً، ثم الاستذكار والحداد، ثم إعادة الارتباط. وتحافظ الرعاية الحديثة للصدمات، من العلاج المعرفي السلوكي الموجّه للصدمات إلى بروتوكولات EMDR، على البنية نفسها بأسماء قريبة: الأمان والتثبيت، ثم التنظيم والمعالجة، ثم التكامل وإعادة الارتباط. ورحلة التعافي من الصدمات في تمكينلي تسير على هذا التسلسل السريري نفسه. والترتيب ليس اقتراحاً؛ إنه الجدار الحامل للنموذج كله."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 1 — Safety & Stabilization", "المرحلة الأولى — الأمان والتثبيت")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Before any story is told, the body needs to know it is allowed to exhale. Stage one is practical and unglamorous: sleep restored to something regular, meals that actually happen, physical safety secured, and — most importantly — tools that can bring you back to the present when the past arrives uninvited. Grounding is the anchor skill here. The classic 5-4-3-2-1 exercise walks your five senses back into the room: five things you can see, four you can touch, three you can hear, two you can smell, one you can taste. It sounds almost too simple to work; it works precisely because it gives the alarm system hard evidence of now.",
                "قبل أن تُروى أي قصة، يحتاج الجسد أن يعرف أنه مسموح له أن يتنفس. المرحلة الأولى عملية وغير لامعة: نومٌ يعود منتظماً، ووجبات تحدث فعلاً، وسلامة مادية مضمونة، والأهم — أدوات تعيدك إلى الحاضر حين يقتحم الماضي المكان بلا دعوة. التأريض هو مهارة المرساة هنا. تمرين ٥-٤-٣-٢-١ الكلاسيكي يعيد حواسك الخمس إلى الغرفة: خمسة أشياء تراها، وأربعة تلمسها، وثلاثة تسمعها، واثنان تشمّهما، وواحد تتذوقه. يبدو بسيطاً لدرجة الشك في فائدته؛ لكنه ينجح لأنه يقدّم لنظام الإنذار دليلاً مادياً قوياً على أننا في الآن."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Two more tools complete the stabilization kit. A guided body scan teaches you to notice where the threat lives in your body — clenched jaw, tight chest, braced shoulders — and to soften it without fear. And a 'safe place' exercise builds an internal refuge you can visit on demand: a vividly imagined location where your body knows it can rest. Practiced daily, these tools do not erase the past; they give you a reliable base camp for everything the next stages will ask of you. All three are available as free interactive tools inside Tamkinly's trauma journey.",
                "أداتان تكملان عدة التثبيت. المسح الجسدي الموجّه يعلّمك أن تلاحظ أين يسكن الخطر في جسدك — فك مشدود، أو صدر متقلّص، أو أكتاف متجهزة — وأن تُليّنه دون خوف. وتمرين «المكان الآمن» يبني ملجأً داخلياً تزوره عند الطلب: موقعاً تتخيله بوضوح بحيث يعرف جسدك أنه يمكنه الراحة فيه. وبالممارسة اليومية لا تمحو هذه الأدوات الماضي؛ لكنها تمنحك مخيماً موثوقاً لكل ما ستطلبه منك المراحل التالية. والأدوات الثلاث متاحة مجاناً كأدوات تفاعلية داخل رحلة الصدمات في تمكينلي."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 2 — Regulation: Widening the Window", "المرحلة الثانية — التنظيم: توسيع نافذة التحمّل")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Psychiatrist Daniel Siegel gave clinicians one of their most useful images: the window of tolerance — the band of arousal within which you can think, feel, and stay present. Trauma narrows that window violently. Small stressors push you above it into panic and rage, or below it into numbness and collapse, and both ends feel like losing control of your own reactions. Regulation is the discipline of widening the window: learning your early warning signs, and building a toolkit that walks you back inside it.",
                "منح الطبيب النفسي دانيال سيغل للمعالجين واحدة من أنفع الصور: نافذة التحمّل — الشريط من الإثارة الذي تستطيع داخله أن تفكر وتشعر وتبقى حاضراً. الصدمة تُضيّق هذه النافذة بعنف. مُحفّزات صغيرة تدفعك فوقها إلى الهلع والغضب، أو تحتها إلى الخدر والانهيار، وكلا الطرفين يشبه فقدان السيطرة على ردود فعلك. التنظيم هو الانضباط المتمثل في توسيع النافذة: أن تتعلم علاماتك المبكرة، وأن تبني عدة تمشي بك إلى الداخل من جديد."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The fastest lever is breath. Paced breathing — slowing the exhale until it is longer than the inhale — directly stimulates the vagus nerve, shifting the body out of its alarm state and back toward what Porges calls the social engagement system. Thought reframing, drawn from cognitive behavioral therapy, adds the mental layer: learning to catch catastrophic predictions ('I am in danger', 'this will never end') and answer them with grounded evidence. Neither tool requires you to feel calm first; both are designed to be used exactly when you are not. That is the quiet revolution of stage two — skills that work in the storm, not only after it.",
                "أسرع رافعة هي النفس. التنفس المُنظَّم — إبطاء الزفير حتى يصبح أطول من الشهيق — يحفّز العصب المبهم مباشرة، فينقل الجسد من حالة الإنذار إلى ما يسميه بورجز نظام الاندماج الاجتماعي. وإعادة صياغة الأفكار، المستمدة من العلاج المعرفي السلوكي، تضيف الطبقة الذهنية: أن تتعلم اقتناص التوقعات الكارثية («أنا في خطر»، «هذا لن ينتهي أبداً») وأن تجيبها بالأدلة الواقعة. لا تطلب أيٌّ من الأداتين أن تشعر بالهدوء أولاً؛ فكلتاهما مصمّمتان للاستخدام تماماً حين لست هادئاً. هذه هي الثورة الهادئة في المرحلة الثانية — مهارات تعمل في العاصفة، لا بعدها فقط."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Stage 3 — Integration: Making the Story Yours Again", "المرحلة الثالثة — التكامل: أن تعود القصة ملكك")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Integration is what the earlier stages made possible: turning fragments into a story you can hold without drowning. In Herman's framework this is the stage of remembrance and mourning — telling what happened, grieving what was lost, and reclaiming the chapters of your life the trauma had been editing. Journaling is the most accessible tool here: writing about the experience in a paced, deliberate way helps the brain file it as past, which is precisely what a fragmented trauma memory resists doing.",
                "التكامل هو ما جعلته المرحلتان السابقتان ممكناً: تحويل الشذرات إلى قصة تستطيع أن تحملها دون أن تغرق. في إطار هيرمان هذه هي مرحلة الاستذكار والحداد — أن ترو ما حدث، وتحزن على ما فُقد، وتستعيد فصول حياتك التي كانت الصدمة تعيد تحريرها. كتابة اليوميات أيسر الأدوات هنا: الكتابة عن التجربة بوتيرة مقصودة ومتأنية تساعد الدماغ على حفظها كماضٍ — وهذا بالضبط ما ترفضه ذاكرة الصدمة المجزّأة فعله."
              )}
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Integration also means facing the trauma's cruelest companion: shame — the conviction that what happened says something shameful about you. It does not. Shame survived because it hid; it dissolves in safe connection and self-compassion, the researched antidote of treating yourself with the same care you would offer someone you love. The final movement of stage three is reconnection: relationships, work, play, meaning. When you can be present with another human being while telling part of your truth, the trauma stops being the author of your story and becomes one chapter of it — a real chapter, but not the whole book.",
                "ويعني التكامل أيضاً مواجهة رفيق الصدمة الأقسى: الخجل — قناعةً بأن ما حدث يقول شيئاً مخجلاً عنك. وهو لا يقول. نجا الخجل لأنه اختفى؛ ويذوب في الارتباط الآمن والتعاطف مع الذات، وهو الترياق المدروس الذي يعني أن تعامل نفسك بالرعاية نفسها التي تمنحها لمن تحب. والحركة الأخيرة في المرحلة الثالثة إعادة الارتباط: علاقات، وعمل، ولعب، ومعنى. حين تستطيع أن تكون حاضراً مع إنسان آخر وأنت ترو جزءاً من حقيقتك، تتوقف الصدمة عن كاتبة قصتك وتصبح فصلاً واحداً فيها — فصلاً حقيقياً، لكنه ليس الكتاب كله."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Why the Order Matters More Than Anything", "لماذا الترتيب أهم من أي شيء آخر")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "The most common mistake in trauma recovery is starting at stage three. People rush to tell the story — in a journal, to a partner, sometimes under pressure from others — before their nervous system can hold it, and the result is flooding: reliving instead of remembering, days lost to triggers, a renewed conviction that facing the past is unbearable. Clinicians call this destabilization, and it is the reason phased therapy exists at all. If retelling leaves you wrecked for days, that is not proof you are too weak for recovery; it is proof you skipped a stage. Return to safety and regulation, build a stronger base camp, and the story will hold when you return to it.",
                "الخطأ الأكثر شيوعاً في التعافي من الصدمة هو البدء من المرحلة الثالثة. الناس يتعجّلون رواية القصة — في دفتر، أو لشريك، وأحياناً تحت ضغط من الآخرين — قبل أن يقدر جهازهم العصبي على حملها، والنتيجة الغرق: إعادة عيش بدل استذكار، وأيام تضيع في المحفزات، وقناعة متجددة بأن مواجهة الماضي لا تُحتمل. يسمّي السريريون هذا فقدان الاستقرار، وهو السبب في وجود العلاج المتدرّج أصلاً. إن تركت رواية القصة محطماً أيامك، فهذا ليس دليلاً على أنك أضعف من التعافي؛ بل دليل أنك تخطيت مرحلة. عُد إلى الأمان والتنظيم، وابنِ مخيماً أقوى، وستحمل القصة حين تعود إليها."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("When to Work With a Professional", "متى تعمل مع متخصص؟")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Free stabilization tools are a legitimate starting point, and for many survivors they make the difference between coping and not coping. That said, some situations call for trauma-focused therapy without delay: symptoms that have lasted months or intensified, dissociation, thoughts of harming yourself, trauma from childhood or prolonged abuse, or any stage-three work that keeps ending in flooding. Evidence-based options — trauma-focused CBT and EMDR among them — work with exactly the three-stage map described here, and choosing a therapist who follows a phased approach is worth asking about directly. Needing that help does not mean the free tools failed; it means you used them for what they are — a foundation, and a companion for the days between sessions.",
                "أدوات التثبيت المجانية نقطة انطلاق مشروعة، وكثيراً ما تصنع لكل ناجٍ الفرق بين التدبّر وعدمه. ومع ذلك، ثمة حالات تستدعي علاجاً موجّهاً للصدمات دون تأخير: أعراض تستمر شهوراً أو تتفاقم، أو ذوبان في الوعي، أو أفكار بإيذاء النفس، أو صدمة من الطفولة أو إساءة مطوّلة، أو عملٌ متكرر في المرحلة الثالثة ينتهي دائماً بالغرق. والخيارات المبنية على الأدلة — منها العلاج المعرفي السلوكي الموجّه للصدمات وEMDR — تعمل بالخريطة ثلاثية المراحل نفسها الموصوفة هنا، ومن المفيد أن تسأل مباشرة عن اختيار معالج يتبع نهجاً متدرجاً. حاجتك لتلك المساعدة لا تعني أن الأدوات المجانية فشلت؛ بل أنك استخدمتها لما هي عليه — أساس، ورفيق لأيام ما بين الجلسات."
              )}
            </p>

            <h2 className="font-serif text-2xl font-bold text-primary mt-12 mb-6">
              {getText("Your First Week of Stabilization", "أسبوعك الأول من التثبيت")}
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              {getText(
                "Stage one begins with small, repeatable acts. Day 1: choose one fixed wake-up time and protect it. Day 2: practice 5-4-3-2-1 grounding twice — once when calm, so the skill exists before you need it. Day 3: one paced-breathing session, five minutes, exhale longer than inhale. Day 4: a ten-minute body scan; just notice, do not fix. Day 5: build your safe-place image and visit it once. Day 6: write three sentences about today in a journal — no history, just today. Day 7: review the week and name one moment you came back to the present faster than you used to. That single data point is what recovery is made of.",
                "تبدأ المرحلة الأولى بأفعال صغيرة قابلة للتكرار. اليوم ١: اختر موعد استيقاظ ثابتاً واحمِه. اليوم ٢: تدرّب على تأريض ٥-٤-٣-٢-١ مرتين — مرة وأنت هادئ، كي توجد المهارة قبل حاجتها. اليوم ٣: جلسة تنفس منظّم واحدة، خمس دقائق، زفير أطول من شهيق. اليوم ٤: مسح جسدي عشر دقائق؛ لاحظ فقط، لا تُصلح. اليوم ٥: ابنِ صورتك للمكان الآمن وزرها مرة. اليوم ٦: اكتب ثلاث جمل عن اليوم في دفتر — لا تاريخ، اليوم فقط. اليوم ٧: راجع الأسبوع وسمِّ لحظة واحدة عدت فيها إلى الحاضر أسرع من المعتاد. تلك النقطة الواحدة هي ما يصنع التعافي."
              )}
            </p>

            {/* Free Journey CTA */}
            <div className="my-10 rounded-xl p-6 border" style={{ backgroundColor: '#F0F7F7', borderColor: '#1F6F78' }}>
              <h3 className="font-bold text-lg mb-2" style={{ color: '#0F1C2E' }}>
                {getText("Begin the Trauma Recovery Journey — free, private, at your pace", "ابدأ رحلة التعافي من الصدمات — مجانية وخاصة وبوتيرتك")}
              </h3>
              <p className="text-slate-600 mb-4">
                {getText(
                  "Tamkinly's Trauma Recovery Journey walks the three clinical stages with guided tools: grounding, paced breathing, a safe-place exercise, a body scan, thought reframing, and a trauma journal. 100% free, no account needed, progress stays private on your device.",
                  "رحلة التعافي من الصدمات في تمكينلي تسير بالمراحل السريرية الثلاث بأدوات موجّهة: التأريض، التنفس المنظّم، تمرين المكان الآمن، المسح الجسدي، إعادة صياغة الأفكار، ويوميات الصدمة. مجانية ١٠٠٪، بلا حساب، وتقدّمك يبقى خاصاً على جهازك."
                )}
              </p>
              <Link href="/recovery/trc">
                <Button className="text-white hover:opacity-90" style={{ backgroundColor: '#1F6F78' }}>
                  {getText("Start the Free Trauma Recovery Journey", "ابدأ رحلة التعافي من الصدمات المجانية")} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* References */}
      <ArticleReferences slug="trauma-recovery-three-stages" />

      <MidArticleUpgrade promoteTier="MASTERY" variant="minimal" />
      <BlogArticleCTA ctaType="recode" />

      <ArticleNavigation currentSlug="trauma-recovery-three-stages" />

      {/* Related Articles */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-semibold text-primary mb-6">{getText("Related Articles", "مقالات ذات صلة")}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full border-0 shadow-sm bg-white hover:shadow-md transition-all cursor-pointer">
                    <CardContent className="p-4">
                      <h4 className="font-medium text-primary text-sm mb-2 line-clamp-2">
                        {article.title}
                      </h4>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <BlogConversionSection />
    </article>

    </>
  );
}
