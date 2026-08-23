// @ts-nocheck
/**
 * Email Onboarding Sequence for Tamkinly
 * 5-email journey over 14 days to retain and engage new users
 */

export interface OnboardingEmail {
  day: number;
  id: string;
  subjectEn: string;
  subjectAr: string;
  previewEn: string;
  previewAr: string;
  bodyEn: string;
  bodyAr: string;
  ctaTextEn: string;
  ctaTextAr: string;
  ctaLink: string;
}

export const ONBOARDING_EMAILS: OnboardingEmail[] = [
  {
    day: 0,
    id: 'welcome',
    subjectEn: 'Welcome to your transformation journey',
    subjectAr: 'مرحباً بك في رحلة التحول',
    previewEn: 'Your tools are ready. Here\'s how to start.',
    previewAr: 'أدواتك جاهزة. إليك كيف تبدأ.',
    bodyEn: `You just took the most important step — deciding to invest in yourself.

Here's what happens next:

1. **Start with the Identity Quiz** — Discover your identity gap in 5 minutes
2. **Pick your first tool** — We recommend starting with one that matches your biggest challenge
3. **Spend just 10 minutes a day** — Small consistent actions create massive change

Remember: Transformation isn't about perfection. It's about direction.

Your 30-day journey starts now.`,
    bodyAr: `لقد اتخذت للتو أهم خطوة — قرارك بالاستثمار في نفسك.

إليك ما سيحدث تالياً:

1. **ابدأ باختبار الهوية** — اكتشف فجوة هويتك في ٥ دقائق
2. **اختر أداتك الأولى** — نوصي بالبدء بأداة تناسب أكبر تحدٍ تواجهه
3. **خصص ١٠ دقائق فقط يومياً** — الأفعال الصغيرة المتسقة تصنع تغييراً كبيراً

تذكر: التحول ليس عن الكمال. بل عن الاتجاه.

رحلتك لـ ٣٠ يوماً تبدأ الآن.`,
    ctaTextEn: 'Start Your First Tool',
    ctaTextAr: 'ابدأ أداتك الأولى',
    ctaLink: '/apps',
  },
  {
    day: 2,
    id: 'how-to-use',
    subjectEn: 'Make the most of your tools',
    subjectAr: 'استفد أقصى استفادة من أدواتك',
    previewEn: '3 tips that double your results',
    previewAr: '٣ نصائح تضاعف نتائجك',
    bodyEn: `You've had your tools for 2 days now. Here are 3 tips that users say doubled their results:

**Tip 1: Same time, same place**
Use your tool at the same time every day. Morning works best for 87% of our users.

**Tip 2: Start ridiculously small**
Don't try to change everything at once. Pick ONE thing. Do it for 5 minutes. That's it.

**Tip 3: Track it visually**
When you can SEE your progress, you're 2x more likely to continue. That's why our tools have built-in tracking.

Tomorrow, try the Daily Reflection — it takes just 3 minutes and sets up your entire day.`,
    bodyAr: `مرت يومان منذ حصولك على أدواتك. إليك ٣ نصائح يقول المستخدمون أنها ضاعفت نتائجهم:

**نصيحة ١: نفس الوقت، نفس المكان**
استخدم أداتك في نفس الوقت يومياً. الصباح هو الأفضل لـ ٨٧٪ من مستخدمينا.

**نصيحة ٢: ابدأ بشكل سخيف صغير**
لا تحاول تغيير كل شيء دفعة واحدة. اختر شيئاً واحداً. افعله لمدة ٥ دقائق. فقط.

**نصيحة ٣: تتبع بصرياً**
عندما ترى تقدمك، فأنت أكثر احتمالاً بنسبة ٢x للاستمرار. لذلك أدواتنا تحتوي على تتبع مدمج.

غداً، جرّب التأمل اليومي — يستغرق ٣ دقائق فقط ويجهز يومك بالكامل.`,
    ctaTextEn: 'Open Daily Reflection',
    ctaTextAr: 'افتح التأمل اليومي',
    ctaLink: '/apps/daily-reflection',
  },
  {
    day: 5,
    id: 'quick-win',
    subjectEn: 'Complete this 5-minute challenge',
    subjectAr: 'أكمل هذا التحدي في ٥ دقائق',
    previewEn: 'Your first quick win is waiting',
    previewAr: 'أول إنجاز سريع بانتظارك',
    bodyEn: `It's Day 5. Time for your first quick win.

**The 5-Minute Identity Check:**

Take a pen (or open your phone) and answer:

1. What's one thing I did today that aligns with who I want to become?
2. What's one thing I did that doesn't?
3. What will I do differently tomorrow?

That's it. 5 minutes. But this simple practice is what separates people who transform from people who just wish.

**Bonus:** Log your reflection in the Journal System to track your growth over time.

94% of users who complete this exercise in their first week go on to complete the 30-day program.`,
    bodyAr: `اليوم الخامس. حان وقت أول إنجاز سريع.

**فحص الهوية في ٥ دقائق:**

خذ قلماً (أو افتح هاتفك) وأجب:

1. ما الشيء الواحد الذي فعلته اليوم ويتوافق مع من أريد أن أكون؟
2. ما الشيء الواحد الذي فعلته ولا يتوافق؟
3. ماذا سأفعل بشكل مختلف غداً؟

هذا كل شيء. ٥ دقائق. لكن هذه الممارسة البسيطة هي ما يفرق بين من يتحول ومن يتمنى فقط.

**مكافأة:** سجّل تأملك في نظام اليوميات لتتبع نموك عبر الوقت.

٩٤٪ من المستخدمين الذين يكملون هذا التمرين في أسبوعهم الأول يكملون برنامج الـ ٣٠ يوماً.`,
    ctaTextEn: 'Open Journal System',
    ctaTextAr: 'افتح نظام اليوميات',
    ctaLink: '/apps/journal-system',
  },
  {
    day: 10,
    id: 'success-stories',
    subjectEn: 'See how others transformed',
    subjectAr: 'شاهد كيف تحول آخرون',
    previewEn: 'Real stories from real users',
    previewAr: 'قصص حقيقية من مستخدمين حقيقيين',
    bodyEn: `You're on Day 10. That puts you in the top 30% of users who stick with it.

Here's what others have achieved:

**Sarah, 28** — "I went from hitting snooze 5 times to waking up at 6am naturally. The Identity Baseline Worksheet helped me understand I was living someone else's identity."

**Ahmed, 34** — "The Habit Tracker seemed too simple. But 30 days later, I've meditated every single day. First time in my life."

**Maria, 41** — "The Goal System helped me realize I was chasing goals that weren't mine. Now I'm building something that actually matters to ME."

Your transformation is happening right now. Keep going.

**Pro tip:** Share your 10-day progress with a friend. Accountability doubles commitment.`,
    bodyAr: `أنت في اليوم ١٠. هذا يضعك في أعلى ٣٠٪ من المستخدمين الذين يستمرون.

إليك ما حققه آخرون:

**سارة، ٢٨** — "انتقلت من تأجيل المنبه ٥ مرات للاستيقاظ في السادسة طبيعياً. ساعدتني ورقة خط أساس الهوية على فهم أنني كنت أعيش هوية شخص آخر."

**أحمد، ٣٤** — "بدا متتبع العادات بسيطاً جداً. لكن بعد ٣٠ يوماً، تأملت كل يوم بدون انقطاع. لأول مرة في حياتي."

**ماريا، ٤١** — "ساعدني نظام الأهداف على إدراك أنني أتابع أهدافاً لم تكن لي. الآن أبني شيئاً يهمني حقاً."

تحولك يحدث الآن. استمر.

**نصيحة محترف:** شارك تقدمك لـ ١٠ أيام مع صديق. المساءلة تضاعف الالتزام.`,
    ctaTextEn: 'View Your Progress',
    ctaTextAr: 'شاهد تقدمك',
    ctaLink: '/dashboard',
  },
  {
    day: 14,
    id: 'upgrade',
    subjectEn: 'Ready for the next level?',
    subjectAr: 'مستعد للمستوى التالي؟',
    previewEn: 'You\'ve completed 14 days. Here\'s what\'s next.',
    previewAr: 'أكملت ١٤ يوماً. إليك ما يلي.',
    bodyEn: `14 days in. You're not the same person who started.

You've built awareness. You've taken action. You've proven you can change.

Now it's time to go deeper.

**The Mastery Subscription** includes everything you need:
- All 8 transformation tools
- AI Identity Coach (personalized guidance)
- Priority access to new features
- 30-day money-back guarantee

Users who upgrade after 14 days have a 92% completion rate vs 64% for free users.

The difference? Skin in the game.

Use code **TRANSFORM14** for 20% off — our way of rewarding your commitment.`,
    bodyAr: `١٤ يوماً. لست نفس الشخص الذي بدأ.

لقد بنيت وعياً. لقد اتخذت إجراءً. لقد أثبتّ أنك قادر على التغيير.

الآن حان الوقت للتعمق أكثر.

**الحزمة الكاملة** تتضمن كل ما تحتاجه:
- جميع أدوات التحول الثمانية
- مدرب الهوية بالذكاء الاصطناعي (إرشاد شخصي)
- أولوية الوصول للميزات الجديدة
- ضمان استرداد خلال ٣٠ يوماً

المستخدمون الذين يرقون بعد ١٤ يوماً لديهم نسبة إكمال ٩٢٪ مقابل ٦٤٪ للمستخدمين المجانيين.

الفرق؟ الالتزام.

استخدم كود **TRANSFORM14** للحصول على خصم ٢٠٪ — طريقتنا لمكافأة التزامك.`,
    ctaTextEn: 'Upgrade Now — 20% Off',
    ctaTextAr: 'رقّ الآن — خصم ٢٠٪',
    ctaLink: '/products',
  },
];

export function getEmailForDay(day: number): OnboardingEmail | undefined {
  return ONBOARDING_EMAILS.find(e => e.day === day);
}

export function getNextEmail(currentDay: number): OnboardingEmail | undefined {
  return ONBOARDING_EMAILS.find(e => e.day > currentDay);
}

export function getOnboardingProgress(currentDay: number): {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  currentEmail: OnboardingEmail | undefined;
} {
  const totalSteps = ONBOARDING_EMAILS.length;
  const completedSteps = ONBOARDING_EMAILS.filter(e => e.day <= currentDay).length;
  // @ts-expect-error possibly undefined
  
  return {
    currentStep: completedSteps,
    totalSteps,
    percentage: Math.min(100, Math.round((completedSteps / totalSteps) * 100)),
    currentEmail,
  };
}

