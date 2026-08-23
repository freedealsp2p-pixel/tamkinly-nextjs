"use client";

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import { useLocale } from '@/components/providers/LocaleProvider';
import { RecoveryBreadcrumb } from '@/components/recovery/system';
import { MedicalDisclaimer } from '@/components/recovery/system';
import { SafetyResponse } from '@/components/recovery/system';
import { TherapeuticExit } from '@/components/recovery/system';
import { DistressCheckIn } from '@/components/recovery/system/DistressCheckIn';
import EnhancedSuggestedNextStep from '@/components/recovery/system/EnhancedSuggestedNextStep';
import {
  Brain, Shield, Wind, Activity, Heart, Zap, Eye,
  Snowflake, Handshake, CloudFog, ArrowRight, ArrowLeft,
  BookOpen, AlertTriangle, Compass, Users, TreePine,
  Flame, Bird, Lock, Siren, LifeBuoy
} from 'lucide-react';

// ─── Animation helpers ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as any } },
};

function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      className={`mb-14 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Bilingual content ──────────────────────────────────────
interface Bilingual { ar: string; en: string }

interface SectionData {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg?: string;
  heading: Bilingual;
  body: Bilingual[];
  callout?: { icon: React.ComponentType<{ className?: string }>; heading: Bilingual; body: Bilingual };
  protocol?: Bilingual;
}

const sections: SectionData[] = [
  // ─── 1. What Are Trauma Responses? ────────────────────────
  {
    id: 'intro',
    icon: Brain,
    heading: { ar: 'ما هي استجابات الصدمة؟', en: 'What Are Trauma Responses?' },
    body: [
      { ar: 'استجابات الصدمة هي ردود فعل جسدية وعصبية وعاطفية تلقائية يُفعّلها الجهاز العصبي عندما يرصد تهديداً — حقيقياً أو مُتخيّلاً. هذه الاستجابات ليست خيارات واعية، بل هي برمجة بقاء عميقة تشترك فيها كل الثدييات تقريباً.', en: 'Trauma responses are involuntary physical, neural, and emotional reactions that the nervous system activates when it detects a threat — real or perceived. These responses are not conscious choices; they are deep survival programming shared by nearly all mammals.' },
      { ar: 'عندما يرصد جهازك العصبي خطراً، تُفعّل اللوزة الدماغية (Amygdala) في أجزاء من الثانية — قبل أن تتحمّل القشرة الجبهية (Prefrontal Cortex) وقتاً في التفكير. هذا يعني أن استجابتك تحدث قبل أن «تقرر» أي شيء. جسدك يقرر نيابةً عنك — وهذا ليس ضعفاً، بل هو كيف صُمّم نظام البقاء.', en: 'When your nervous system detects danger, the amygdala activates in fractions of a second — before the prefrontal cortex has time to think. This means your response happens before you "decide" anything. Your body decides for you — and this is not weakness, it is how the survival system was designed.' },
      { ar: 'هناك أربع استجابات رئيسية: القتال (Fight)، الهروب (Flight)، التجمد (Freeze)، والإرضاء (Fawn). بعض الناس يُضيفون التفارق (Dissociation) كاستجابة خامسة أو كصورة متقدمة من التجمد. كل استجابة لها غرض واحد: البقاء.', en: 'There are four primary responses: Fight, Flight, Freeze, and Fawn. Some consider Dissociation as a fifth response or an advanced form of freeze. Every response serves one purpose: survival.' },
    ],
    callout: {
      icon: Eye,
      heading: { ar: 'ماذا يعني ذلك لك؟', en: 'What does this mean for you?' },
      body: { ar: 'كل استجابة من هذه الاستجابات ليست دليلاً على الضعف أو العجز — بل هي دليل على أن نظام حمايتك يعمل. المشكلة ليست فيك، بل في أن هذا النظام يعمل بجهد زائد بعد الصدمة.', en: 'Every one of these responses is not evidence of weakness or inadequacy — it is evidence that your protection system is working. The problem is not you; it is that this system is working overtime after trauma.' },
    },
  },

  // ─── 2. Fight Response ────────────────────────────────────
  {
    id: 'fight',
    icon: Flame,
    heading: { ar: 'استجابة القتال (Fight)', en: 'The Fight Response' },
    body: [
      { ar: 'استجابة القتال هي استعداد الجسد لمواجهة التهديد والدفاع عن النفس. عندما تُفعّل اللوزة الدماغية إشارة الخطر، يُفرز الجسم الأدرينالين والنورأدرينالين بكميات كبيرة، ما يُعدّ الجسد للمعركة: سرعة نبض، ارتفاع ضغط الدم، شد عضلي، وتحدّد حاد.', en: 'The fight response is the body\'s preparation to confront the threat and defend itself. When the amygdala activates the danger signal, the body floods with adrenaline and noradrenaline, preparing for combat: rapid heartbeat, elevated blood pressure, muscle tension, and sharp focus.' },
      { ar: 'العلامات الشائعة: قبضات محكمة، ارتفاع الصوت، رغبة في المواجهة، غضب مفاجئ، تهيّج، شعور بأنك تحتاج أن «تفعل شيئاً»، دفاعية مفرطة عن النفس أو الآخرين.', en: 'Common signs: clenched fists, raised voice, urge to confront, sudden anger, irritability, feeling you need to "do something," excessive defensiveness about yourself or others.' },
      { ar: 'لماذا تحدث؟ عندما يُرصد تهديد ولا يمكن الهروب منه (جسدياً أو اجتماعياً)، يُحوّل الجهاز العصبي الطاقة إلى المواجهة. هذا ليس اختياراً — بل هو مسار عصبي سريع يتفوّق على التفكير الواعي.', en: 'Why it happens: When a threat is detected and escape isn\'t possible (physically or socially), the nervous system redirects energy toward confrontation. This is not a choice — it is a fast neural pathway that overrides conscious thought.' },
    ],
    callout: {
      icon: Shield,
      heading: { ar: 'إعادة التأطير: القتال ليس عدواناً', en: 'Reframe: Fight is NOT aggression' },
      body: { ar: 'استجابة القتال ليست عدواناً ولا سلوكاً سيئاً — بل هي محاولة الجسد لحمايتك. غضبك في لحظات التهديد هو درع حماية، ليس عيباً في الشخصية. الفرق بين القتال كاستجابة صدمية والعدوان كنمط سلوكي هو أن الأول تلقائي ومُوجه نحو الحماية، بينما الثاني اختياري ومُوجه نحو الإيذاء.', en: 'The fight response is not aggression or bad behavior — it is your body\'s attempt to protect you. Your anger in moments of threat is a shield, not a character flaw. The difference between fight as a trauma response and aggression as a behavior pattern is that the former is automatic and aimed at protection, while the latter is voluntary and aimed at harm.' },
    },
  },

  // ─── 3. Flight Response ───────────────────────────────────
  {
    id: 'flight',
    icon: Bird,
    heading: { ar: 'استجابة الهروب (Flight)', en: 'The Flight Response' },
    body: [
      { ar: 'استجابة الهروب هي استعداد الجسد للابتعاد عن التهديد بأسرع ما يمكن. نفس تفعّل الجهاز العصبي الودّي (Sympathetic Nervous System) الذي يُعدّ الجسد للقتال، لكن الطاقة تُوجّه نحو المغادرة بدلاً من المواجهة.', en: 'The flight response is the body\'s preparation to move away from the threat as fast as possible. It uses the same sympathetic nervous system activation that prepares for fight, but energy is directed toward leaving rather than confronting.' },
      { ar: 'العلامات الشائعة: أرق حركي، رغبة ملحة في المغادرة، مشي متواصل أو أرجحة القدم، قلق شديد، تسارع نبض، فرط التيقّظ، شعور بأنك تحتاج أن «تهرب» حتى لو لم يكن هناك خطر ظاهر.', en: 'Common signs: restlessness, urgent desire to leave, pacing or fidgeting, severe anxiety, rapid heartbeat, hypervigilance, feeling you need to "escape" even when there is no visible danger.' },
      { ar: 'لماذا تحدث؟ الهروب هو الاستجابة المفضّلة عندما يُرصد التهديد ولا يزال هناك مسار للإفلات. الجهاز العصبي يُحسب: هل المواجهة ممكنة؟ إذا لم تكن، هل الهروب ممكن؟ إذا كان، ففعّل طاقة الهروب.', en: 'Why it happens: Flight is the preferred response when a threat is detected and there is still an escape route. The nervous system calculates: is confrontation possible? If not, is escape possible? If yes, activate escape energy.' },
    ],
    callout: {
      icon: Wind,
      heading: { ar: 'إعادة التأطير: الهروب ليس جبناً', en: 'Reframe: Wanting to leave is NOT cowardice' },
      body: { ar: 'رغبتك في المغادرة ليست جبناً ولا ضعفاً — بل هي جسدك يبحث عن الأمان. في لحظة الصدمة، المغادرة كانت الاستراتيجية الأكثر أماناً. ولمّا تعلّم جهازك العصبي هذه الاستراتيجية، أصبح يُفعّلها حتى في مواقف لا تحتاج هروباً فعلياً. هذا لا يعني أنك تهرب من الحياة — بل يعني أن جسدك تحتاج أن يتعلم أن الأمان ممكن هنا، الآن.', en: 'Your desire to leave is not cowardice or weakness — it is your body seeking safety. In the moment of trauma, leaving was the safest strategy. Since your nervous system learned this strategy, it activates it even in situations that don\'t require actual escape. This doesn\'t mean you\'re running from life — it means your body needs to learn that safety is possible here, now.' },
    },
  },

  // ─── 4. Freeze Response ───────────────────────────────────
  {
    id: 'freeze',
    icon: Snowflake,
    heading: { ar: 'استجابة التجمد (Freeze)', en: 'The Freeze Response' },
    body: [
      { ar: 'استجابة التجمد هي «تظاهر بالموت» — الجسد يتوقّف عن الحركة والكلام والاستجابة. عندما لا يكون القتال ممكناً ولا الهروب ممكناً، يُفعّل الجهاز العصبي الجارفي (Parasympathetic Nervous System) المسار الظهري المبهمي (Dorsal Vagal) — ما يُسبب انخفاض معدل نبض القلب، شلل عضلي، وانفصال عن الألم.', en: 'The freeze response is "playing dead" — the body stops moving, speaking, and responding. When neither fight nor flight is possible, the parasympathetic nervous system activates the dorsal vagal pathway — causing decreased heart rate, muscular paralysis, and disconnection from pain.' },
      { ar: 'العلامات الشائعة: شلل أو عجز عن الحركة، صمت، عدم القدرة على التصرف، شعور بالعلق أو «التعليق»، عدم القدرة على الكلام، برودة الأطراف، شعور بأن الجسد ثقيل جداً أو بعيد.', en: 'Common signs: paralysis or inability to move, silence, inability to act, feeling stuck or "suspended," inability to speak, cold extremities, feeling the body is very heavy or distant.' },
      { ar: 'لماذا تحدث؟ التجمد هو الاستجابة الأخيرة في سلسلة البقاء. عندما يُدرك الجهاز العصبي أن القتال والهروب كلاهما مستحيلان، يُفعّل «فرامل الطوارئ» — إيقاف كل شيء لتقليل الأضرار. في الطبيعة، هذا يُنجي الحيوان لأن المفترس يفقد الاهتمام بفريسة باردة ساكنة.', en: 'Why it happens: Freeze is the last resort in the survival chain. When the nervous system realizes both fight and flight are impossible, it activates the "emergency brake" — shutting everything down to minimize harm. In nature, this saves the animal because predators lose interest in cold, still prey.' },
    ],
    callout: {
      icon: Shield,
      heading: { ar: 'إعادة التأطير: التجمد ليس موافقة ولا ضعفاً', en: 'Reframe: Freezing is NOT consent or weakness' },
      body: { ar: 'التجمد هو أعمق استجابات البقاء — وليس دليلاً على أنك «استسلمت» أو «وافقت». جسدك اختار الاستجابة الوحيدة الممكنة في تلك اللحظة: التظاهر بالموت للنجاة. هذا لا يعني أنك كنت تريد ما حدث — بل يعني أن جسدك فعل كل ما في وسعه للبقاء.', en: 'Freeze is the deepest survival response — not evidence that you "gave up" or "consented." Your body chose the only possible response in that moment: playing dead to survive. This does not mean you wanted what happened — it means your body did everything it could to survive.' },
    },
    protocol: { ar: 'بروتوكول التجمد — إذا كنت تمر بالتجمد الآن: لا تُجبر نفسك على الحركة. ركّز على التنفس أولاً (تمرين A52). اسمح بحركات صغيرة جداً — حركة إصبع، تحريك عين. لا تحكم على نفسك. التجمّد سيمر بسلامة إذا أعطيته الوقت.', en: 'Freeze Protocol — If you are experiencing freeze right now: Do NOT force movement. Focus on breathing first (A52 exercise). Allow very small movements — a finger, an eye shift. Do not judge yourself. The freeze will pass safely if given time.' },
  },

  // ─── 5. Fawn Response ─────────────────────────────────────
  {
    id: 'fawn',
    icon: Handshake,
    heading: { ar: 'استجابة الإرضاء (Fawn)', en: 'The Fawn Response' },
    body: [
      { ar: 'استجابة الإرضاء هي محاولة تهدئة مصدر التهديد أو إرضائه لتقليل الأذى. بدلاً من القتال أو الهروب أو التجمد، يستخدم الشخص الامتثال، المجاملة، وتلبية احتياجات الآخر على حساب احتياجاته الخاصة.', en: 'The fawn response is the attempt to appease or please the threat source to minimize harm. Instead of fighting, fleeing, or freezing, the person uses compliance, flattery, and meeting the other\'s needs at the expense of their own.' },
      { ar: 'العلامات الشائعة: الامتثال التلقائي، إرضاء الناس على حساب النفس، صعوبة قول «لا»، فقدان الحدود الشخصية، التبرير عن سلوك المعتدي، شعور أن قيمتك مرتبطة بخدمة الآخرين.', en: 'Common signs: automatic compliance, people-pleasing at your own expense, difficulty saying "no," loss of personal boundaries, justifying the aggressor\'s behavior, feeling your worth depends on serving others.' },
      { ar: 'لماذا تحدث؟ الإرضاء يتطوّر عندما تكون الاستجابات الأخرى غير آمنة — مثلاً عندما يُعاقب الطفل على الغضب (قتال)، أو يُمنع من المغادرة (هروب)، أو يكون التجمد غير كافٍ للنجاة. في هذه الحالة، يتعلم الجهاز العصبي أن أسلم طريق هو إرضاء مصدر الخطر.', en: 'Why it happens: Fawning develops when other responses are unsafe — for example, when a child is punished for anger (fight), prevented from leaving (flight), or freezing isn\'t enough to survive. In these cases, the nervous system learns that the safest path is appeasing the source of danger.' },
    ],
    callout: {
      icon: Heart,
      heading: { ar: 'إعادة التأطير: الإرضاء ليس خيانة ولا ضعفاً', en: 'Reframe: Fawning is NOT betrayal or weakness' },
      body: { ar: 'الإرضاء ليس ضعفاً في الشخصية ولا خيانة لنفسك — بل هو استراتيجية بقاء تعلّمها جسدك في ظروف لم تكن فيها الاستجابات الأخرى آمنة. فهم هذا يُحرّرك من الذنب ويفتح الباب لتعلّم أن قول «لا» آمن الآن.', en: 'Fawning is not a character weakness or self-betrayal — it is a survival strategy your body learned under conditions where other responses were not safe. Understanding this frees you from guilt and opens the door to learning that saying "no" is safe now.' },
    },
  },

  // ─── 6. Dissociation ──────────────────────────────────────
  {
    id: 'dissociation',
    icon: CloudFog,
    heading: { ar: 'التفارق (Dissociation)', en: 'Dissociation' },
    body: [
      { ar: 'التفارق هو انفصال عن الجسد أو المشاعر أو الواقع — كأنك تراقب نفسك من الخارج، أو كأن العالم ليس حقيقياً، أو كأن الزمن توقّف أو تسارع بشكل غريب. التفارق يتراوح من خفيف (شرود ذهني) إلى شديد (انفصال كامل عن الهوية أو الواقع).', en: 'Dissociation is disconnection from the body, emotions, or reality — as if you\'re watching yourself from outside, or the world isn\'t real, or time has stopped or accelerated strangely. Dissociation ranges from mild (daydreaming) to severe (complete disconnection from identity or reality).' },
      { ar: 'العلامات الشائعة: الشعور بأنك خارج جسدك، تشوّه الزمن، خدر عاطفي، الشعور بأن العالم «ليس حقيقياً»، نسيان أجزاء من ما حدث، صعوبة البقاء في اللحظة الحالية.', en: 'Common signs: feeling outside your body, time distortion, emotional numbness, feeling the world is "unreal," forgetting parts of what happened, difficulty staying in the present moment.' },
      { ar: 'لماذا يحدث؟ التفارق هو «فرامل الطوارئ» للعقل — عندما يكون الألم أكبر من قدرة الجسد على تحمّله، يُنشئ العقل مسافة بينك وبين التجربة كآلية حماية أخيرة. هذه ليست جنوناً — بل هي نظام حماية ذكي يعمل عندما تكون كل الاستجابات الأخرى قد استُنفدت.', en: 'Why it happens: Dissociation is the mind\'s "emergency brake" — when pain exceeds the body\'s capacity to bear it, the mind creates distance between you and the experience as a last protective mechanism. This is not going crazy — it is a smart protection system that activates when all other responses are exhausted.' },
    ],
    callout: {
      icon: Shield,
      heading: { ar: 'إعادة التأطير: التفارق ليس جنوناً', en: 'Reframe: Dissociation is NOT going crazy' },
      body: { ar: 'التفارق ليس دليلاً على أنك تفقد عقلك — بل هو فرامل الطوارئ التي يُفعّلها عقلك لحمايتك من ألم لا تحتمله. فهم هذا يُخفّف الخوف من التفارق نفسه — والخوف من التفارق يزيد التفارق.', en: 'Dissociation is not evidence that you\'re losing your mind — it is the emergency brake your mind activates to protect you from unbearable pain. Understanding this reduces fear of dissociation itself — and fear of dissociation worsens dissociation.' },
    },
    protocol: { ar: 'بروتوكول التفارق — إذا كنت تفارق الآن: أوقف قراءة هذا المحتوى فوراً. جرّب التأريض 5-4-3-2-1: سمّ 5 أشياء تراها، 4 تسمعها، 3 تلمسها، 2 تشمّها، 1 تتذوّقها. خذ 3 أنفاس A52. إذا لم يقلّ التفارق خلال 5 دقائق — اطلب مساعدة متخصصة.', en: 'Dissociation Protocol — If you are dissociating right now: Stop reading this content immediately. Try 5-4-3-1 grounding: name 5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste. Take 3 A52 breaths. If dissociation does not decrease within 5 minutes — seek professional help.' },
  },

  // ─── 7. Why Body Responses Happen (Neuroscience) ──────────
  {
    id: 'neuroscience',
    icon: Activity,
    heading: { ar: 'لماذا تحدث استجابات الجسد؟ العلم العصبي بلغة مبسّطة', en: 'Why Do Body Responses Happen? The Neuroscience in Simple Language' },
    body: [
      { ar: 'اللوزة الدماغية (Amygdala) هي جهاز الإنذار في الدماغ — بحجم حبة اللوز، تُرصد التهديدات وتُفعّل استجابات البقاء قبل أن تعي ما يحدث. بعد الصدمة، تصبح اللوزة مفرطة النشاط — كإنذار حريق لا يتوقف عن الرنين.', en: 'The amygdala is the brain\'s alarm system — almond-sized, it detects threats and activates survival responses before you\'re even aware. After trauma, it becomes hyperactive — like a fire alarm that won\'t stop ringing.' },
      { ar: 'محور HPA (Hypothalamic-Pituitary-Adrenal Axis) هو نظام التوتر الأساسي في الجسم. عندما تُرصد اللوزة خطراً، تُرسل إشارة عبر محور HPA تُفرز الكورتيزول (هرمون التوتر) والأدرينالين. في الحالة الطبيعية، يرتفع الكورتيزول ثم ينخفض. بعد الصدمة المزمنة، يبقى مرتفعاً — ما يُفسد النوم، الهضم، المناعة، والذاكرة.', en: 'The HPA axis (Hypothalamic-Pituitary-Adrenal) is the body\'s primary stress system. When the amygdala detects danger, it signals through the HPA axis to release cortisol (stress hormone) and adrenaline. Normally, cortisol rises then falls. After chronic trauma, it stays elevated — disrupting sleep, digestion, immunity, and memory.' },
      { ar: 'الجسد يخزن الصدمة — كما يقول بيسيل فان دير كولك: «الجسد يحتفظ بالنتيجة» (The Body Keeps the Score). الصدمة لا تُختزن كقصة في الذاكرة فقط، بل كأنماط عصبية وعضلية وهرمونية تتكرر حتى بعد انتهاء التهديد.', en: 'The body stores trauma — as Bessel van der Kolk says: "The Body Keeps the Score." Trauma is not stored as just a story in memory, but as neural, muscular, and hormonal patterns that repeat even after the threat has ended.' },
      { ar: 'نظرية متعدد الأعصاب الحائرية (Polyvagal Theory) لستيفن بورجز تشرح أن الجهاز العصبي لديه ثلاث حالات: (1) الارتباط الاجتماعي — عندما نشعر بالأمان ونتواصل مع الآخرين، (2) الجهاز الودّي — القتال أو الهروب عندما نرصد خطراً يمكن التعامل معه، (3) الجهاز الجارفي الظهري — التجمد والانفصال عندما يكون الخطر فوق القدرة.', en: 'Stephen Porges\' Polyvagal Theory explains that the nervous system has three states: (1) Social engagement — when we feel safe and connect with others, (2) Sympathetic — fight or flight when we detect manageable danger, (3) Dorsal parasympathetic — freeze and disconnection when danger overwhelms capacity.' },
    ],
    callout: {
      icon: Brain,
      heading: { ar: 'النقطة المفتاحية', en: 'Key Insight' },
      body: { ar: 'استجاباتك الجسدية ليست «في رأسك» — بل هي عمليات عصبية وهرمونية حقيقية وقابلة للقياس. هذا يعني أن التعافي ليس مسألة «إرادة أقوى» بل إعادة تنظيم جهاز عصبي حقيقي — وهذا ممكن بالعلم والأدوات الصحيحة.', en: 'Your bodily responses are not "all in your head" — they are real, measurable neural and hormonal processes. This means recovery is not about "stronger willpower" but about re-regulating a real nervous system — and this is possible with science and the right tools.' },
    },
  },

  // ─── 8. Responses ≠ Weak ──────────────────────────────────
  {
    id: 'not-weak',
    icon: Lock,
    heading: { ar: 'الاستجابات لا تعني أنك ضعيف', en: 'Responses Do NOT Mean You Are Weak' },
    body: [
      { ar: 'ربما سمعت — من الآخرين أو من نفسك —: «لماذا لا تتجاوز الأمر؟» أو «الآخرون مرّوا بأصعب ونجحوا» أو «لماذا تتأثر بعد كل هذا الوقت؟». هذه الرسائل خاطئة علمياً وعميقة الأذى عاطفياً.', en: 'You may have heard — from others or from yourself —: "Why can\'t you just get over it?" or "Others went through worse and are fine" or "Why are you still affected after all this time?" These messages are scientifically wrong and emotionally harmful.' },
      { ar: 'استجابات الصدمة ليست عيوباً في الشخصية ولا نقصاً في الإرادة ولا اختيارات واعية. اللوزة الدماغية لا تسأل إذنك قبل أن تُفعّل الإنذار. الجهاز العصبي لا ينتظر قرارك الواعي قبل أن يُفرز الأدرينالين. هذه عمليات بيولوجية تحدث في أجزاء من الثانية — قبل أن تستطيع حتى صياغة فكرة.', en: 'Trauma responses are not character flaws, willpower deficits, or conscious choices. The amygdala doesn\'t ask permission before activating the alarm. The nervous system doesn\'t wait for your conscious decision before releasing adrenaline. These are biological processes that happen in fractions of a second — before you can even form a thought.' },
      { ar: 'جسدك فعل ما تحتاجه للبقاء. النقطة ليست «قتال أصعب» — بل إخبار جسدك أن الأمان ممكن الآن. التعافي ليس معركة ضد نفسك — بل هو حوار مع جهازك العصبي.', en: 'Your body did what it needed to survive. The point is not to "fight harder" — but to tell your body that safety is possible now. Recovery is not a battle against yourself — it is a conversation with your nervous system.' },
    ],
    callout: {
      icon: Heart,
      heading: { ar: 'تذكّر', en: 'Remember' },
      body: { ar: 'أقوى المحاربين ليس من لا يُصاب — بل من يتعافى. والتعافي يبدأ بفهم أن أعراضك ليست دليل ضعف، بل دليل بقاء.', en: 'The strongest warriors are not those who are never wounded — but those who recover. And recovery begins with understanding that your symptoms are not evidence of weakness, but evidence of survival.' },
    },
  },

  // ─── 9. Relation to Regulation ────────────────────────────
  {
    id: 'regulation',
    icon: Compass,
    heading: { ar: 'العلاقة بالتنظيم: كيف يُساعد الفهم على التعافي', en: 'How This Relates to Regulation' },
    body: [
      { ar: 'فهم استجاباتك هو الخطوة الأولى نحو تنظيمها. عندما تعرف أن سرعة نبضك هي استجابة هروب — وليس «نوبة هلع» بدون سبب — يتغيّر تعاملك معها. بدلاً من مقاومتها، تبدأ بإخبار جسدك أنك آمن.', en: 'Understanding your responses is the first step toward regulating them. When you know your rapid heartbeat is a flight response — not a "panic attack for no reason" — your relationship with it changes. Instead of fighting it, you begin telling your body you are safe.' },
      { ar: 'التأريض (Grounding) يُرسل للدماغ رسالة مباشرة: «أنا هنا الآن، وهنا آمن». عندما تُسمّي ما تراه وتسمعه وتلمسه، تُعطّل اللوزة الدماغية وتُفعّل القشرة الجبهية — أي تُعيد الدماغ من «طور الطوارئ» إلى «طور التفكير».', en: 'Grounding sends the brain a direct message: "I am here now, and this is safe." When you name what you see, hear, and touch, you deactivate the amygdala and activate the prefrontal cortex — shifting the brain from "emergency mode" to "thinking mode."' },
      { ar: 'التنفس يُفعّل العصب الحائر (Vagus Nerve) — الجسر بين الجسد والدماغ الذي يُساعد على إرخاء الجهاز العصبي. كل نفس بطيء وعميق يُخبر الجسد: «لا يوجد خطر الآن».', en: 'Breathing activates the vagus nerve — the bridge between body and brain that helps calm the nervous system. Every slow, deep breath tells the body: "There is no danger right now."' },
      { ar: 'مع الممارسة المنتظمة، يتّسع «إطار التحمل» (Window of Tolerance) — المدى الذي تستطيع فيه التعامل مع التوتر دون أن تُغادر إلى استجابة صدمية. هذا لا يعني أنك لن تنشط أبداً — بل يعني أنك ستستعيد توازنك أسرع.', en: 'With regular practice, your "window of tolerance" expands — the range within which you can handle stress without shifting into a trauma response. This doesn\'t mean you\'ll never activate — it means you\'ll recover balance faster.' },
    ],
  },

  // ─── 10. When to Use Grounding & Regulation ───────────────
  {
    id: 'when-grounding',
    icon: TreePine,
    heading: { ar: 'متى تستخدم أدوات الارتكاز والتنظيم', en: 'When to Use Grounding & Regulation' },
    body: [
      { ar: 'قتال أو هروب نشطان → ابدأ بتنفس A52 ثم تأريض 5-4-3-2-1. التنفس أولاً لأنه يُخفّض سرعة نبض القلب، ثم التأريض يُعيدك للحاضر.', en: 'Fight or Flight activation → Start with A52 breathing then 5-4-3-2-1 grounding. Breathing first because it lowers heart rate, then grounding returns you to the present.' },
      { ar: 'تجمد → تنفس A52 مع حركات صغيرة جداً. لا تُجبر نفسك على الحركة الكبيرة. ابدأ بتحريك إصبع، ثم عين، ثم كتف. الانتقال من الداخل إلى الخارج.', en: 'Freeze → A52 breathing with very small movements. Don\'t force large movement. Start with moving a finger, then an eye, then a shoulder. Move from inside outward.' },
      { ar: 'إرضاء → ممارسة الحدود + إعادة الاتصال بالنفس. ابدأ بقول «لا» في مواقف صغيرة وآمنة. ذكّر نفسك أن احتياجاتك مهمة أيضاً.', en: 'Fawn → Boundary practice + self-connection. Start by saying "no" in small, safe situations. Remind yourself that your needs matter too.' },
      { ar: 'تفارق → تأريض 5-4-3-2-1 فوراً + توجيه (Orienting): انظر حولك ببطء وسمّ ما تراه. هذا يُعيد الدماغ للبيئة الحالية. إذا استمر التفارق أكثر من 5 دقائق — اطلب مساعدة.', en: 'Dissociation → 5-4-3-2-1 grounding immediately + orienting: look around slowly and name what you see. This returns the brain to the current environment. If dissociation persists beyond 5 minutes — seek help.' },
    ],
    callout: {
      icon: Compass,
      heading: { ar: 'القاعدة العامة', en: 'General Rule' },
      body: { ar: 'التنفس هو الأساس دائماً. التأريض يأتي ثانياً. إذا لم تنجح واحدة، جرّب الأخرى. لا تُجبر نفسك على شيء يزيد الضيق. يمكنك دائماً التوقف والمحاولة لاحقاً.', en: 'Breathing is always the foundation. Grounding comes second. If one doesn\'t work, try the other. Don\'t force anything that increases distress. You can always stop and try again later.' },
    },
  },

  // ─── 11. When to Seek Professional Help ───────────────────
  {
    id: 'seek-help',
    icon: LifeBuoy,
    heading: { ar: 'متى تطلب مساعدة متخصصة', en: 'When to Seek Professional Help' },
    body: [
      { ar: 'هذه المقالة ومجموعة الأدوات المتاحة مساندة وليست بديلاً عن العلاج المهني. هناك علامات واضحة تستوجب طلب المساعدة من معالج متخصّص في الصدمات:', en: 'This article and the available toolkit are supportive, not a replacement for professional treatment. There are clear signs that warrant seeking help from a trauma-specialized therapist:' },
      { ar: '• تفارق لا يقلّ بالتأريض أو التنفس — أو يحدث بشكل متكرر دون مُحفز واضح', en: '• Dissociation that does not decrease with grounding or breathing — or occurs frequently without a clear trigger' },
      { ar: '• ذكريات اقتحامية (Flashbacks) لا تقلّ حدّتها مع الوقت أو الأدوات', en: '• Intrusive memories (flashbacks) that do not diminish with time or tools' },
      { ar: '• أفكار إيذاء النفس أو شعور بأنك لا تستحق الحياة', en: '• Thoughts of self-harm or feeling you don\'t deserve to live' },
      { ar: '• عجز عن أداء المهام اليومية (عمل، علاقات، رعاية ذاتية) لفترة ممتدة', en: '• Inability to perform daily tasks (work, relationships, self-care) for an extended period' },
      { ar: '• استخدام مواد أو سلوكيات لتجنّب المشاعر (شرب، أكل عاطفي، عزل تام)', en: '• Using substances or behaviors to avoid feelings (drinking, emotional eating, total isolation)' },
      { ar: 'طلب المساعدة ليس ضعفاً — بل هو أصبح قرار يمكنك أن تتخذه عندما تكون جاهزاً. والمعالج المتخصّص يُساعدك على إعادة تنظيم جهازك العصبي بطرق لا يمكن للأدوات وحدها أن تُحققها.', en: 'Seeking help is not weakness — it is the strongest decision you can make when you are ready. A specialized therapist helps you re-regulate your nervous system in ways tools alone cannot achieve.' },
    ],
  },
];

// ─── Page Component ──────────────────────────────────────────
export default function TraumaResponsesPage() {
  const { locale, direction } = useLocale();
  const isAr = locale === 'ar';
  const router = useRouter();
  const [showDistressCheck, setShowDistressCheck] = useState(false);

  // Show comfort check-in after scrolling past first few sections
  useEffect(() => {
    const timer = setTimeout(() => setShowDistressCheck(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  const label = (b: Bilingual) => (isAr ? b.ar : b.en);
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-screen bg-[#F0F7F7]" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <RecoveryBreadcrumb
            items={[
              { label: isAr ? 'التعافي' : 'Recovery', href: '/recovery' },
              { label: isAr ? 'مركز التعافي من الصدمة' : 'Trauma Recovery Center', href: '/recovery/trc' },
              { label: isAr ? 'ماذا يحدث خلال استجابات الصدمة' : 'What Happens During Trauma Responses' },
            ]}
          />

          {/* Medical Disclaimer */}
          <MedicalDisclaimer />
      <DistressCheckIn
        type="comfort"
        visible={showDistressCheck}
        onContinue={() => setShowDistressCheck(false)}
        onPause={() => setShowDistressCheck(false)}
        onStop={() => router.push('/recovery/trc')}
        onGrounding={() => router.push('/recovery/trc/grounding')}
        questionAr="هذا المحتوى قد يكون مثقلاً. هل تشعر بالراحة للمتابعة؟"
        questionEn="This content may be heavy. Are you comfortable enough to continue?"
      />

          {/* Hero Section */}
          <header className="mb-12 mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1F6F78]/10 flex items-center justify-center">
                <Brain className="w-6 h-6 text-[#1F6F78]" />
              </div>
              <span className="text-sm font-medium text-[#1F6F78] bg-[#1F6F78]/8 px-3 py-1 rounded-full">
                {isAr ? 'محتوى تعليمي نفسي' : 'Psychoeducation'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F1C2E] leading-tight mb-5">
              {isAr ? 'ماذا يحدث خلال استجابات الصدمة' : 'What Happens During Trauma Responses'}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              {isAr
                ? 'استجابات الصدمة — القتال، الهروب، التجمد، الإرضاء، والتفارق — ليست اختيارات ولا عيوباً في الشخصية. بل هي ردود فعل بيولوجية يُفعّلها جهازك العصبي للحماية. فهمها هو المفتاح الأول لتنظيمها.'
                : 'Trauma responses — fight, flight, freeze, fawn, and dissociation — are not choices or character flaws. They are biological reactions your nervous system activates for protection. Understanding them is the first key to regulating them.'}
            </p>
          </header>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* Content Sections with AnimatePresence                              */}
          {/* ═══════════════════════════════════════════════════════════ */}
          {sections.map((sec) => {
            const Icon = sec.icon;
            return (
              <Section key={sec.id}>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 lg:p-10">
                  {/* Section Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#1F6F78]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1C2E]">
                      {label(sec.heading)}
                    </h2>
                  </div>

                  {/* Section Body */}
                  <div className="space-y-5 text-slate-700 leading-[1.9]">
                    {sec.body.map((para, i) => (
                      <p key={i}>{label(para)}</p>
                    ))}
                  </div>

                  {/* Protocol Box */}
                  {sec.protocol && (
                    <div className="mt-8 bg-[#E8685A]/8 border border-[#E8685A]/20 rounded-xl p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-[#E8685A]" />
                        <h3 className="font-bold text-[#E8685A]">
                          {isAr ? 'بروتوكول السلامة' : 'Safety Protocol'}
                        </h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{label(sec.protocol)}</p>
                    </div>
                  )}

                  {/* Callout / Insight Box */}
                  {sec.callout && (
                    <div className="mt-8 bg-[#1F6F78]/5 border border-[#1F6F78]/15 rounded-xl p-5 sm:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        {(() => { const CI = sec.callout.icon; return <CI className="w-5 h-5 text-[#1F6F78]" />; })()}
                        <h3 className="font-bold text-[#1F6F78]">{label(sec.callout.heading)}</h3>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{label(sec.callout.body)}</p>
                    </div>
                  )}
                </div>
              </Section>
            );
          })}

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* Regulation Toolkit Link                                           */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <Section>
            <div className="bg-gradient-to-l from-[#1F6F78] to-[#1F6F78]/90 rounded-2xl p-6 sm:p-8 lg:p-10 text-white">
              <div className="flex items-center gap-3 mb-3">
                <Compass className="w-6 h-6 text-[#3DD4B0]" />
                <h2 className="text-2xl sm:text-3xl font-bold">
                  {isAr ? 'جرّب الآن' : 'Try Now'}
                </h2>
              </div>
              <p className="text-white/80 mb-8 leading-relaxed">
                {isAr
                  ? 'الفهم هو الخطوة الأولى. الخطوة الثانية هي إرسال إشارات أمان فعلية لجهازك العصبي. هذه الأدوات مصمّمة خصيصاً لهذا الغرض:'
                  : 'Understanding is the first step. The second step is sending real safety signals to your nervous system. These tools are designed exactly for this:'}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Grounding Card */}
                <Link href="/recovery/trc/grounding" className="group block">
                  <div className="bg-white/10 hover:bg-white/20 rounded-xl p-5 transition-all duration-200 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Eye className="w-5 h-5 text-[#3DD4B0]" />
                      <h3 className="font-bold text-white">{isAr ? 'التأريض 5-4-3-2-1' : '5-4-3-2-1 Grounding'}</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {isAr ? 'أعد تواصلك مع اللحظة الحالية عبر حواسك الخمس.' : 'Reconnect with the present moment through your five senses.'}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#3DD4B0] text-sm font-medium">
                      <span>{isAr ? 'ابدأ الآن' : 'Start now'}</span>
                      <Arrow className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* A52 Breathing Card */}
                <Link href="/recovery/trc/a52" className="group block">
                  <div className="bg-white/10 hover:bg-white/20 rounded-xl p-5 transition-all duration-200 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Wind className="w-5 h-5 text-[#3DD4B0]" />
                      <h3 className="font-bold text-white">{isAr ? 'تنفس A52' : 'A52 Breathing'}</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {isAr ? 'تنفس بطيء ومنظم يُفعّل العصب الحائر ويُهدّئ الجهاز العصبي.' : 'Slow regulated breathing that activates the vagus nerve and calms the nervous system.'}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#3DD4B0] text-sm font-medium">
                      <span>{isAr ? 'ابدأ الآن' : 'Start now'}</span>
                      <Arrow className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* Regulation Toolkit Card */}
                <Link href="/recovery/trc/regulation-toolkit" className="group block">
                  <div className="bg-white/10 hover:bg-white/20 rounded-xl p-5 transition-all duration-200 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Compass className="w-5 h-5 text-[#3DD4B0]" />
                      <h3 className="font-bold text-white">{isAr ? 'أدوات التنظيم' : 'Regulation Toolkit'}</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {isAr ? 'اختر الأداة الأنسب بناءً على حالتك الآن — مقاربة مُوجّهة لتنظيم الجهاز العصبي.' : 'Choose the most suitable tool based on your current state — a guided approach to nervous system regulation.'}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#3DD4B0] text-sm font-medium">
                      <span>{isAr ? 'افتح الأدوات' : 'Open toolkit'}</span>
                      <Arrow className="w-4 h-4" />
                    </div>
                  </div>
                </Link>

                {/* Secondary Trauma Card — supporting content for caregivers/parents */}
                <Link href="/recovery/trc/secondary-trauma" className="group block">
                  <div className="bg-white/10 hover:bg-white/20 rounded-xl p-5 transition-all duration-200 border border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-[#3DD4B0]" />
                      <h3 className="font-bold text-white">{isAr ? 'الصدمة الثانوية' : 'Secondary Trauma'}</h3>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                      {isAr ? 'إذا كنت تتأثر بصدمة شخص آخر — كوالد أو شريك — فهذا ليس ضعفاً. تعرف على الصدمة الثانوية وكيف تتعامل معها.' : 'If you are affected by another\'s trauma — as a parent or partner — this is not weakness. Learn about secondary trauma and how to cope.'}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[#3DD4B0] text-sm font-medium">
                      <span>{isAr ? 'اقرأ المزيد' : 'Read more'}</span>
                      <Arrow className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* "If activated now" CTA                                            */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <Section>
            <div className="bg-[#E8685A]/8 border border-[#E8685A]/20 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-3">
                <Siren className="w-6 h-6 text-[#E8685A]" />
                <h2 className="text-xl sm:text-2xl font-bold text-[#E8685A]">
                  {isAr ? 'إذا كنت تشعر بالاستيقاظ الآن' : 'If you are feeling activated right now'}
                </h2>
              </div>
              <p className="text-slate-700 leading-relaxed mb-4">
                {isAr
                  ? 'قراءة عن الصدمة يمكن أن تُنشط الجهاز العصبي. إذا كنت تشعر بأي من الاستجابات التي قرأت عنها الآن — توقف عن القراءة وجرّب:'
                  : 'Reading about trauma can activate the nervous system. If you are experiencing any of the responses you just read about right now — stop reading and try:'}
              </p>
              <Link
                href="/recovery/trc/grounding"
                className="inline-flex items-center gap-2 bg-[#1F6F78] hover:bg-[#1a5e66] text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
              >
                <Eye className="w-5 h-5" />
                {isAr ? 'تمرين التأريض 5-4-3-2-1' : '5-4-3-2-1 Grounding Exercise'}
              </Link>
            </div>
          </Section>

          {/* ═══════════════════════════════════════════════════════════ */}
          {/* EnhancedSuggestedNextStep                                         */}
          {/* ═══════════════════════════════════════════════════════════ */}
          <div className="mt-6">
            <EnhancedSuggestedNextStep program="trc" currentStepId="trauma-responses" />
          </div>

        </div>{/* max-w-3xl */}
      </div>{/* container */}

      {/* Floating Safety + Exit Buttons */}
      <SafetyResponse program="trc" assetId="trc-trauma-responses" />
      <TherapeuticExit fallbackHref="/recovery/trc" />
    </div>
  );
}
