import { PrismaClient, AccessTier, AppCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding apps...');

  // ============================================
  // APPS DATA - Based on $100M Money Models
  // ============================================

  const apps = [
    // ==========================================
    // FREE TIER - Lead Magnet Apps
    // ==========================================
    {
      slug: 'identity-gap-quiz',
      name: 'Identity Gap Assessment',
      nameAr: 'تقييم فجوة الهوية',
      description: 'Discover the gap between who you are and who you want to become. This 3-minute assessment reveals your dominant growth area and provides personalized recommendations.',
      descriptionAr: 'اكتشف الفجوة بين من أنت ومن تريد أن تكون. هذا التقييم يكشف منطقة نموك المهيمنة ويوفر توصيات مخصصة.',
      minTier: AccessTier.FREE,
      isFreeApp: true,
      icon: 'Brain',
      color: '#3DD4B0',
      category: AppCategory.ASSESSMENT,
      features: JSON.stringify([
        '8 revealing questions',
        '5-dimension analysis',
        'Personalized roadmap',
        'Product recommendations'
      ]),
      shortDescription: '3-minute assessment to discover your identity gap',
      sortOrder: 1,
      isFeatured: true
    },
    {
      slug: 'values-clarification',
      name: 'Values Clarification Tool',
      nameAr: 'أداة توضيح القيم',
      description: 'Free interactive tool to identify your top 5 core values. Understand what truly drives your decisions and behavior.',
      descriptionAr: 'أداة تفاعلية مجانية لتحديد أهم 5 قيم أساسية لديك. افهم ما يحرك قراراتك وسلوكك حقاً.',
      minTier: AccessTier.FREE,
      isFreeApp: true,
      icon: 'Heart',
      color: '#E57373',
      category: AppCategory.ASSESSMENT,
      features: JSON.stringify([
        '15 value cards to sort',
        'Top 5 values identification',
        'Values conflict detection',
        'Downloadable results'
      ]),
      shortDescription: 'Discover your top 5 core values',
      sortOrder: 2,
      isFeatured: false
    },
    {
      slug: 'daily-reflection',
      name: 'Daily Reflection Prompt',
      nameAr: 'موجه التأمل اليومي',
      description: 'Get a free daily identity-focused reflection prompt to build self-awareness. No account required.',
      descriptionAr: 'احصل على موجه تأمل يومي مجاني يركز على الهوية لبناء الوعي الذاتي.',
      minTier: AccessTier.FREE,
      isFreeApp: true,
      icon: 'Sun',
      color: '#FFB74D',
      category: AppCategory.TRACKING,
      features: JSON.stringify([
        'Daily identity prompt',
        'Save your reflections',
        'Weekly insights',
        'No account needed'
      ]),
      shortDescription: 'Free daily identity reflection prompt',
      sortOrder: 3,
      isFeatured: false
    },

    // ==========================================
    // TRIAL TIER - 7-Day Access
    // ==========================================
    {
      slug: 'trial-planner',
      name: '7-Day Trial Planner',
      nameAr: 'مخطط تجريبي 7 أيام',
      description: 'Experience the full Identity Recode system for 7 days with guided daily prompts and evidence tracking.',
      descriptionAr: 'جرب نظام إعادة تشفير الهوية الكامل لمدة 7 أيام مع موجهات يومية وتتبع الأدلة.',
      minTier: AccessTier.TRIAL,
      isFreeApp: false,
      icon: 'Calendar',
      color: '#1F6F78',
      category: AppCategory.PLANNING,
      features: JSON.stringify([
        '7-day guided journey',
        'Daily identity prompts',
        'Evidence tracking',
        'Progress tracking'
      ]),
      shortDescription: '7-day trial of the full system',
      sortOrder: 4,
      isFeatured: false
    },

    // ==========================================
    // BASIC TIER - Core Apps ($7-17)
    // ==========================================
    {
      slug: 'executive-manual',
      name: 'Executive Manual',
      nameAr: 'الدليل التنفيذي',
      description: 'Complete implementation framework with 6 core protocols for identity transformation.',
      descriptionAr: 'إطار تنفيذ كامل مع 6 بروتوكولات أساسية لتحويل الهوية.',
      minTier: AccessTier.BASIC,
      isFreeApp: false,
      icon: 'BookOpen',
      color: '#1F6F78',
      category: AppCategory.WORKSHEET,
      features: JSON.stringify([
        'Identity Baseline Assessment',
        '4-Step Recode Framework',
        'Daily Evidence Cycle',
        'Weekly Integration',
        'Monthly Lock Protocol',
        'Failure Recovery'
      ]),
      shortDescription: 'Complete implementation framework',
      sortOrder: 5,
      isFeatured: true
    },
    {
      slug: 'daily-planner',
      name: '30-Day Identity Planner',
      nameAr: 'مخطط الهوية 30 يوم',
      description: 'Interactive 30-day planner with identity prompts, non-negotiable actions, and evidence tracking.',
      descriptionAr: 'مخطط تفاعلي لمدة 30 يوما مع موجهات الهوية والإجراءات غير القابلة للتفاوض وتتبع الأدلة.',
      minTier: AccessTier.BASIC,
      isFreeApp: false,
      icon: 'Calendar',
      color: '#3DD4B0',
      category: AppCategory.PLANNING,
      features: JSON.stringify([
        '30-day guided journey',
        'Daily identity prompts',
        'Non-negotiable actions',
        'Evidence logging',
        'Progress tracking',
        'Streak monitoring'
      ]),
      shortDescription: 'Interactive 30-day transformation planner',
      sortOrder: 6,
      isFeatured: true
    },
    {
      slug: 'identity-baseline',
      name: 'Identity Baseline Worksheet',
      nameAr: 'ورقة أساس الهوية',
      description: 'Comprehensive assessment of your identity across 8 key dimensions with personalized insights.',
      descriptionAr: 'تقييم شامل لهويتك عبر 8 أبعاد رئيسية مع رؤى مخصصة.',
      minTier: AccessTier.BASIC,
      isFreeApp: false,
      icon: 'User',
      color: '#3DD4B0',
      category: AppCategory.WORKSHEET,
      features: JSON.stringify([
        '8-dimension assessment',
        'Personalized insights',
        'Action recommendations',
        'Downloadable PDF report'
      ]),
      shortDescription: '8-dimension identity assessment',
      sortOrder: 7,
      isFeatured: false
    },
    {
      slug: 'environmental-audit',
      name: 'Environmental Audit',
      nameAr: 'تدقيق البيئة',
      description: 'Analyze how your physical, digital, and social environment supports or hinders your goals.',
      descriptionAr: 'حلل كيف تدعم بيئتك المادية والرقمية والاجتماعية أهدافك أو تعيقها.',
      minTier: AccessTier.BASIC,
      isFreeApp: false,
      icon: 'Home',
      color: '#1F6F78',
      category: AppCategory.WORKSHEET,
      features: JSON.stringify([
        '6-category audit',
        'Environmental friction detection',
        'Optimization recommendations',
        'Weekly review prompts'
      ]),
      shortDescription: 'Audit your environment for goal alignment',
      sortOrder: 8,
      isFeatured: false
    },

    // ==========================================
    // PREMIUM TIER - Advanced Apps ($27)
    // ==========================================
    {
      slug: 'decision-analysis',
      name: 'Decision Pattern Analysis',
      nameAr: 'تحليل أنماط القرار',
      description: 'Track and analyze your decisions to identify patterns, biases, and improve decision quality.',
      descriptionAr: 'تتبع وحلل قراراتك لتحديد الأنماط والتحيزات وتحسين جودة القرار.',
      minTier: AccessTier.PREMIUM,
      isFreeApp: false,
      icon: 'GitBranch',
      color: '#64B5F6',
      category: AppCategory.ANALYTICS,
      features: JSON.stringify([
        'Decision logging',
        'Pattern detection',
        'Bias identification',
        'Quality scoring',
        'Trend analysis'
      ]),
      shortDescription: 'Track decisions and identify patterns',
      sortOrder: 9,
      isFeatured: false
    },
    {
      slug: 'evidence-tracking',
      name: 'Evidence Tracking System',
      nameAr: 'نظام تتبع الأدلة',
      description: 'Log and track behavioral evidence that supports your identity transformation.',
      descriptionAr: 'سجل وتتبع الأدلة السلوكية التي تدعم تحول هويتك.',
      minTier: AccessTier.PREMIUM,
      isFreeApp: false,
      icon: 'TrendingUp',
      color: '#FFB74D',
      category: AppCategory.TRACKING,
      features: JSON.stringify([
        'Daily evidence logging',
        'Category organization',
        'Milestone tracking',
        'Visual progress',
        'Weekly summaries'
      ]),
      shortDescription: 'Track evidence of your transformation',
      sortOrder: 10,
      isFeatured: false
    },
    {
      slug: 'progress-dashboard',
      name: 'Progress Dashboard',
      nameAr: 'لوحة التقدم',
      description: 'Advanced analytics dashboard tracking your transformation metrics and milestones.',
      descriptionAr: 'لوحة تحليلات متقدمة تتتبع مقاييس تحولك والمعالم.',
      minTier: AccessTier.PREMIUM,
      isFreeApp: false,
      icon: 'BarChart3',
      color: '#8A94A6',
      category: AppCategory.ANALYTICS,
      features: JSON.stringify([
        '30-day dashboard',
        'Weekly reports',
        'Consistency metrics',
        'Transformation milestones',
        'Export capabilities'
      ]),
      shortDescription: 'Advanced progress tracking',
      sortOrder: 11,
      isFeatured: false
    },

    // ==========================================
    // BUNDLE TIER - Exclusive Apps ($47)
    // ==========================================
    {
      slug: 'emotion-regulation',
      name: 'Emotion Regulation (ERQ)',
      nameAr: 'تنظيم العواطف',
      description: 'Assess your emotional regulation strategies based on the validated ERQ questionnaire.',
      descriptionAr: 'قيّم استراتيجيات تنظيم العواطف لديك بناءً على استبيان ERQ المعتمد.',
      minTier: AccessTier.BUNDLE,
      isFreeApp: false,
      icon: 'Heart',
      color: '#E57373',
      category: AppCategory.WORKSHEET,
      features: JSON.stringify([
        'Validated ERQ assessment',
        'Reappraisal vs suppression',
        'Personalized strategies',
        'Progress tracking'
      ]),
      shortDescription: 'Assess emotional regulation patterns',
      sortOrder: 12,
      isFeatured: false
    },
    {
      slug: 'ai-identity-coach',
      name: 'AI Identity Coach',
      nameAr: 'مدرب الهوية الذكي',
      description: 'Get personalized coaching insights and recommendations powered by AI. Your 24/7 transformation companion.',
      descriptionAr: 'احصل على رؤى وتوصيات تدريب مخصصة مدعومة بالذكاء الاصطناعي.',
      minTier: AccessTier.BUNDLE,
      isFreeApp: false,
      icon: 'Sparkles',
      color: '#3DD4B0',
      category: AppCategory.COACHING,
      features: JSON.stringify([
        'Personalized insights',
        'Goal recommendations',
        'Obstacle analysis',
        'Daily motivation',
        '24/7 availability'
      ]),
      shortDescription: 'AI-powered identity coaching',
      sortOrder: 13,
      isFeatured: true
    },
    {
      slug: 'community-access',
      name: 'Transformation Community',
      nameAr: 'مجتمع التحول',
      description: 'Connect with others on the same journey. Share wins, get support, and stay accountable.',
      descriptionAr: 'تواصل مع الآخرين في نفس الرحلة. شارك الانتصارات واحصل على الدعم.',
      minTier: AccessTier.BUNDLE,
      isFreeApp: false,
      icon: 'Users',
      color: '#1F6F78',
      category: AppCategory.COMMUNITY,
      features: JSON.stringify([
        'Private community access',
        'Daily check-ins',
        'Win celebrations',
        'Accountability partners',
        'Expert Q&A sessions'
      ]),
      shortDescription: 'Private transformation community',
      sortOrder: 14,
      isFeatured: false
    },
    {
      slug: 'priority-support',
      name: 'Priority Support',
      nameAr: 'الدعم المتميز',
      description: 'Get priority access to our support team with guaranteed 24-hour response time plus exclusive monthly live sessions.',
      descriptionAr: 'احصل على وصول ذو أولوية إلى فريق الدعم مع ضمان الرد خلال 24 ساعة.',
      minTier: AccessTier.BUNDLE,
      isFreeApp: false,
      icon: 'Headphones',
      color: '#0F1C2E',
      category: AppCategory.COACHING,
      features: JSON.stringify([
        '24-hour response guarantee',
        'Priority ticket handling',
        'Monthly live Q&A',
        'Exclusive workshops',
        'Direct founder access'
      ]),
      shortDescription: 'Premium support and exclusive access',
      sortOrder: 15,
      isFeatured: false
    }
  ];

  // Clear existing apps
  await prisma.app.deleteMany({});

  // Seed apps
  for (const app of apps) {
    await prisma.app.create({
      data: app
    });
    console.log(`✅ Created app: ${app.name}`);
  }

  console.log(`\n🎉 Successfully seeded ${apps.length} apps!`);

  // Summary
  console.log('\n📊 Access Tier Summary:');
  console.log('━'.repeat(50));
  
  const tierCounts = {
    FREE: apps.filter(a => a.minTier === AccessTier.FREE).length,
    TRIAL: apps.filter(a => a.minTier === AccessTier.TRIAL).length,
    BASIC: apps.filter(a => a.minTier === AccessTier.BASIC).length,
    PREMIUM: apps.filter(a => a.minTier === AccessTier.PREMIUM).length,
    BUNDLE: apps.filter(a => a.minTier === AccessTier.BUNDLE).length,
  };
  
  console.log(`🆓 FREE (Lead Magnet): ${tierCounts.FREE} apps`);
  console.log(`⏳ TRIAL (7-Day): ${tierCounts.TRIAL} apps`);
  console.log(`📦 BASIC ($7-17): ${tierCounts.BASIC} apps`);
  console.log(`⭐ PREMIUM ($27): ${tierCounts.PREMIUM} apps`);
  console.log(`💎 BUNDLE ($47): ${tierCounts.BUNDLE} apps`);
  console.log('━'.repeat(50));
  console.log(`   TOTAL: ${apps.length} apps`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
