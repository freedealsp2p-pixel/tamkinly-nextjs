/**
 * Arabic SEO Keyword Research Database for Tamkinly
 * Target: Arabic-speaking audience interested in self-development
 * Strategy: Low competition, high intent keywords
 */

export interface ArabicKeyword {
  keyword: string;
  category: ArabicContentCategory;
  searchVolume: "high" | "medium" | "low";
  competition: "high" | "medium" | "low";
  intent: "informational" | "transactional" | "navigational";
  suggestedArticle: string;
  internalLinks: string[];
}

export type ArabicContentCategory =
  | "تطوير الذات"
  | "بناء العادات"
  | "تحقيق الأهداف"
  | "الانضباط"
  | "إدارة الوقت"
  | "تغيير الهوية";

export const ARABIC_KEYWORDS: ArabicKeyword[] = [
  // تطوير الذات (Self Development)
  { keyword: "تطوير الذات", category: "تطوير الذات", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "دليل تطوير الذات الشامل: من أين تبدأ وكيف تستمر", internalLinks: ["/blog/automatic-change", "/apps/identity-baseline"] },
  { keyword: "كيف أطور نفسي", category: "تطوير الذات", searchVolume: "high", competition: "low", intent: "informational", suggestedArticle: "٥ خطوات عملية لتطوير نفسك بدون شعور بالضغط", internalLinks: ["/blog/becoming-exceptional", "/quiz"] },
  { keyword: "أدوات تطوير الذات", category: "تطوير الذات", searchVolume: "medium", competition: "low", intent: "transactional", suggestedArticle: "أفضل أدوات تطوير الذات المبنية على العلم", internalLinks: ["/products", "/apps"] },
  { keyword: "تغيير حياتي للأفضل", category: "تطوير الذات", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "كيف تغير حياتك فعلاً وليس فقط تتمنى", internalLinks: ["/blog/all-in-or-nothing", "/methodology"] },
  { keyword: "بناء شخصية قوية", category: "تطوير الذات", searchVolume: "medium", competition: "low", intent: "informational", suggestedArticle: "بناء الشخصية القوية يبدأ من فهم هويتك", internalLinks: ["/blog/identity-recode-system-guide", "/apps/ai-identity-coach"] },

  // بناء العادات (Habit Building)
  { keyword: "بناء العادات", category: "بناء العادات", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "الدليل العلمي لبناء عادات تدوم", internalLinks: ["/blog/automatic-change", "/apps/habit-tracker"] },
  { keyword: "كيف أكوّن عادة جديدة", category: "بناء العادات", searchVolume: "high", competition: "low", intent: "informational", suggestedArticle: "طريقة مضمونة لتكوين عادة جديدة في ٣٠ يوماً", internalLinks: ["/blog/identity-based-habits-worksheet", "/apps/habit-tracker"] },
  { keyword: "التخلص من العادات السيئة", category: "بناء العادات", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "لماذا تفشل في التخلص من العادات السيئة (والحل)", internalLinks: ["/blog/redefining-discipline", "/methodology"] },
  { keyword: "عادات الصباح", category: "بناء العادات", searchVolume: "medium", competition: "high", intent: "informational", suggestedArticle: "عادات الصباح التي يتبعها الأشخاص الاستثنائيون", internalLinks: ["/blog/becoming-exceptional", "/apps/daily-planner"] },
  { keyword: "الاستمرارية في العادات", category: "بناء العادات", searchVolume: "medium", competition: "low", intent: "informational", suggestedArticle: "سر الاستمرارية: لماذا تتوقف بعد أسبوع؟", internalLinks: ["/blog/and-the-bamboo-kept-growing", "/apps/habit-tracker"] },

  // تحقيق الأهداف (Goal Achievement)
  { keyword: "تحقيق الأهداف", category: "تحقيق الأهداف", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "نظام تحقيق الأهداف الذي يعمل فعلاً", internalLinks: ["/blog/speed-as-strategy", "/apps/goal-system"] },
  { keyword: "كيف أحقق أهدافي", category: "تحقيق الأهداف", searchVolume: "high", competition: "low", intent: "informational", suggestedArticle: "لماذا لا تحقق أهدافك (السبب ليس ما تعتقد)", internalLinks: ["/blog/magic-in-work-you-avoid", "/apps/goal-system"] },
  { keyword: "تحديد الأهداف الشخصية", category: "تحقيق الأهداف", searchVolume: "medium", competition: "low", intent: "informational", suggestedArticle: "كيف تحدد أهدافك الشخصية بطريقة تجعلك تلتزم بها", internalLinks: ["/blog/values-clarification-tool", "/apps/goal-system"] },
  { keyword: "خطة لتحقيق الأهداف", category: "تحقيق الأهداف", searchVolume: "medium", competition: "low", intent: "transactional", suggestedArticle: "ابنِ خطة تحقيق أهدافك خطوة بخطوة", internalLinks: ["/products", "/apps/daily-planner"] },

  // الانضباط (Discipline)
  { keyword: "الانضباط الذاتي", category: "الانضباط", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "الانضباط الذاتي ليس ما تعتقد — إليك الحقيقة", internalLinks: ["/blog/redefining-discipline", "/methodology"] },
  { keyword: "كيف أصبح منضبطاً", category: "الانضباط", searchVolume: "high", competition: "low", intent: "informational", suggestedArticle: "كيف تصبح منضبطاً بدون أن تكره نفسك", internalLinks: ["/blog/redefining-discipline", "/apps/habit-tracker"] },
  { keyword: "قوة الإرادة", category: "الانضباط", searchVolume: "medium", competition: "medium", intent: "informational", suggestedArticle: "لماذا قوة الإرادة لا تعمل (وما الذي يعمل بدلاً منها)", internalLinks: ["/blog/automatic-change", "/methodology"] },

  // إدارة الوقت (Time Management)
  { keyword: "إدارة الوقت", category: "إدارة الوقت", searchVolume: "high", competition: "high", intent: "informational", suggestedArticle: "إدارة الوقت الحقيقية: ليس أكثر إنجازاً بل إنجاز الأهم", internalLinks: ["/blog/ten-minute-block-system", "/apps/daily-planner"] },
  { keyword: "تنظيم الوقت اليومي", category: "إدارة الوقت", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "نظام تنظيم الوقت اليومي في ٣ خطوات", internalLinks: ["/blog/ten-minute-block-system", "/apps/daily-planner"] },
  { keyword: "التخلص من المماطلة", category: "إدارة الوقت", searchVolume: "high", competition: "medium", intent: "informational", suggestedArticle: "المماطلة ليست كسلاً — هذا هو السبب الحقيقي", internalLinks: ["/blog/magic-in-work-you-avoid", "/apps/goal-system"] },

  // تغيير الهوية (Identity Change)
  { keyword: "تغيير الهوية", category: "تغيير الهوية", searchVolume: "medium", competition: "low", intent: "informational", suggestedArticle: "تغيير الهوية: كيف تصبح شخصاً مختلفاً حقاً", internalLinks: ["/blog/identity-recode-system-guide", "/methodology"] },
  { keyword: "من أنا", category: "تغيير الهوية", searchVolume: "high", competition: "low", intent: "informational", suggestedArticle: "سؤال من أنا: كيف تكتشف هويتك الحقيقية", internalLinks: ["/blog/who-am-i-worksheet", "/quiz"] },
  { keyword: "فجوة الهوية", category: "تغيير الهوية", searchVolume: "low", competition: "low", intent: "informational", suggestedArticle: "ما هي فجوة الهوية وكيف تؤثر على كل شيء في حياتك", internalLinks: ["/quiz", "/methodology"] },
  { keyword: "إعادة برمجة الهوية", category: "تغيير الهوية", searchVolume: "medium", competition: "low", intent: "transactional", suggestedArticle: "نظام إعادة برمجة الهوية: دليل عملي", internalLinks: ["/blog/identity-recode-system-guide", "/products"] },
];

// Content Calendar - 12 weeks
export const ARABIC_CONTENT_CALENDAR = [
  { week: 1, title: "دليل تطوير الذات الشامل: من أين تبدأ", category: "تطوير الذات" as ArabicContentCategory, keywords: ["تطوير الذات", "كيف أطور نفسي"], priority: "high" as const },
  { week: 2, title: "الدليل العلمي لبناء عادات تدوم", category: "بناء العادات" as ArabicContentCategory, keywords: ["بناء العادات", "كيف أكوّن عادة جديدة"], priority: "high" as const },
  { week: 3, title: "لماذا لا تحقق أهدافك (السبب ليس ما تعتقد)", category: "تحقيق الأهداف" as ArabicContentCategory, keywords: ["تحقيق الأهداف", "كيف أحقق أهدافي"], priority: "high" as const },
  { week: 4, title: "الانضباط الذاتي ليس ما تعتقد", category: "الانضباط" as ArabicContentCategory, keywords: ["الانضباط الذاتي", "كيف أصبح منضبطاً"], priority: "high" as const },
  { week: 5, title: "سؤال من أنا: كيف تكتشف هويتك الحقيقية", category: "تغيير الهوية" as ArabicContentCategory, keywords: ["من أنا", "فجوة الهوية"], priority: "high" as const },
  { week: 6, title: "إدارة الوقت الحقيقية: إنجاز الأهم", category: "إدارة الوقت" as ArabicContentCategory, keywords: ["إدارة الوقت", "تنظيم الوقت اليومي"], priority: "medium" as const },
  { week: 7, title: "٥ خطوات عملية لتطوير نفسك بدون ضغط", category: "تطوير الذات" as ArabicContentCategory, keywords: ["تطوير الذات", "تغيير حياتي للأفضل"], priority: "medium" as const },
  { week: 8, title: "طريقة مضمونة لتكوين عادة جديدة في ٣٠ يوماً", category: "بناء العادات" as ArabicContentCategory, keywords: ["كيف أكوّن عادة جديدة", "الاستمرارية في العادات"], priority: "medium" as const },
  { week: 9, title: "المماطلة ليست كسلاً — السبب الحقيقي", category: "إدارة الوقت" as ArabicContentCategory, keywords: ["التخلص من المماطلة", "قوة الإرادة"], priority: "medium" as const },
  { week: 10, title: "تغيير الهوية: كيف تصبح شخصاً مختلفاً حقاً", category: "تغيير الهوية" as ArabicContentCategory, keywords: ["تغيير الهوية", "إعادة برمجة الهوية"], priority: "medium" as const },
  { week: 11, title: "بناء الشخصية القوية يبدأ من فهم هويتك", category: "تطوير الذات" as ArabicContentCategory, keywords: ["بناء شخصية قوية", "أدوات تطوير الذات"], priority: "low" as const },
  { week: 12, title: "نظام إعادة برمجة الهوية: دليل عملي", category: "تغيير الهوية" as ArabicContentCategory, keywords: ["إعادة برمجة الهوية", "فجوة الهوية"], priority: "low" as const },
];

export function getKeywordsByCategory(category: ArabicContentCategory): ArabicKeyword[] {
  return ARABIC_KEYWORDS.filter(k => k.category === category);
}

export function getHighPriorityKeywords(): ArabicKeyword[] {
  return ARABIC_KEYWORDS.filter(k => k.competition === "low" && k.searchVolume === "high");
}

export function getContentCalendarWeek(week: number) {
  return ARABIC_CONTENT_CALENDAR.find(c => c.week === week);
}

