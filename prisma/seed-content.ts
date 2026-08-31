import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const categories = [
  { name: 'App Guides', nameAr: 'أدلة التطبيقات', slug: 'app-guides', description: 'Step-by-step guides for Tamkinly apps and tools', sortOrder: 1, isActive: true },
  { name: 'Worksheets', nameAr: 'أوراق العمل', slug: 'worksheets', description: 'Printable and interactive worksheets for self-development', sortOrder: 2, isActive: true },
  { name: 'Identity Shift', nameAr: 'تحوّل الهوية', slug: 'identity-shift', description: 'Articles about identity transformation and self-concept change', sortOrder: 3, isActive: true },
  { name: 'Transformation', nameAr: 'التحوّل الشخصي', slug: 'transformation', description: 'Deep transformation methodologies and frameworks', sortOrder: 4, isActive: true },
  { name: 'Mindset & Strategy', nameAr: 'العقلية والاستراتيجية', slug: 'mindset-strategy', description: 'Strategic thinking, mental models, and mindset shifts', sortOrder: 5, isActive: true },
  { name: 'Productivity & Growth', nameAr: 'الإنتاجية والنمو', slug: 'productivity-growth', description: 'Productivity systems, habit formation, and personal growth', sortOrder: 6, isActive: true },
  { name: 'Habit Formation', nameAr: 'بناء العادات', slug: 'habit-formation', description: 'Science and practice of building lasting habits', sortOrder: 7, isActive: true },
  { name: 'Emotional Regulation', nameAr: 'التنظيم العاطفي', slug: 'emotional-regulation', description: 'Techniques for managing emotions and building resilience', sortOrder: 8, isActive: true },
  { name: 'Recovery', nameAr: 'التعافي', slug: 'recovery', description: 'Content related to recovery journeys and therapeutic protocols', sortOrder: 9, isActive: true },
];

const topics = [
  { name: 'Memory Reconsolidation', nameAr: 'إعادة توحيد الذاكرة', slug: 'memory-reconsolidation', isActive: true },
  { name: 'Neural Pathways', nameAr: 'المسارات العصبية', slug: 'neural-pathways', isActive: true },
  { name: 'Pattern Interrupt', nameAr: 'قطع الأنماط', slug: 'pattern-interrupt', isActive: true },
  { name: 'Identity Transformation', nameAr: 'تحوّل الهوية', slug: 'identity-transformation', isActive: true },
  { name: 'Self-Authorship', nameAr: 'التفويض الذاتي', slug: 'self-authorship', isActive: true },
  { name: 'Therapeutic Protocols', nameAr: 'البروتوكولات العلاجية', slug: 'therapeutic-protocols', isActive: true },
  { name: 'Dopamine Regulation', nameAr: 'تنظيم الدوبامين', slug: 'dopamine-regulation', isActive: true },
  { name: 'Vagus Nerve', nameAr: 'العصب المبهم', slug: 'vagus-nerve', isActive: true },
  { name: 'Emotional Processing', nameAr: 'المعالجة العاطفية', slug: 'emotional-processing', isActive: true },
  { name: 'Habit Science', nameAr: 'علم العادات', slug: 'habit-science', isActive: true },
  { name: 'Values Clarification', nameAr: 'توضيح القيم', slug: 'values-clarification', isActive: true },
  { name: 'Environmental Design', nameAr: 'تصميم البيئة', slug: 'environmental-design', isActive: true },
];

async function main() {
  // Seed categories using upsert (won't duplicate if re-run)
  for (const cat of categories) {
    await db.articleCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    console.log(`Category: ${cat.name}`);
  }

  // Seed topics using upsert
  for (const topic of topics) {
    await db.articleTopic.upsert({
      where: { slug: topic.slug },
      update: {},
      create: topic,
    });
    console.log(`Topic: ${topic.name}`);
  }

  console.log('Content seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
