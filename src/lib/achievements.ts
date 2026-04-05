// Achievement System Configuration
// Based on Tamkinly's transformation journey milestones

export type AchievementCategory = 
  | 'HABITS' 
  | 'GOALS' 
  | 'JOURNAL' 
  | 'IDENTITY' 
  | 'CONSISTENCY' 
  | 'TRANSFORMATION' 
  | 'ENGAGEMENT' 
  | 'MILESTONE';

export type AccessTier = 'FREE' | 'TRIAL' | 'BASIC' | 'PREMIUM' | 'BUNDLE';

export interface Achievement {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  category: AchievementCategory;
  tier: AccessTier;
  icon: string; // Lucide icon name
  color: string;
  requirement: {
    type: 'count' | 'streak' | 'score' | 'completion' | 'composite';
    target: number;
    source: string; // Which metric to check
  };
  points: number; // Points towards identity score
  hidden?: boolean; // Hidden achievements
}

export const achievements: Achievement[] = [
  // ============================================
  // HABITS ACHIEVEMENTS
  // ============================================
  {
    id: 'first_habit',
    name: 'First Step',
    nameAr: 'الخطوة الأولى',
    description: 'Create your first habit',
    descriptionAr: 'أنشئ عادتك الأولى',
    category: 'HABITS',
    tier: 'FREE',
    icon: 'Zap',
    color: '#3DD4B0',
    requirement: { type: 'count', target: 1, source: 'habits_created' },
    points: 5,
  },
  {
    id: 'habit_week',
    name: 'Week Warrior',
    nameAr: 'محارب الأسبوع',
    description: 'Complete habits for 7 consecutive days',
    descriptionAr: 'أكمل العادات لمدة 7 أيام متتالية',
    category: 'HABITS',
    tier: 'FREE',
    icon: 'Flame',
    color: '#FF6B6B',
    requirement: { type: 'streak', target: 7, source: 'habit_streak' },
    points: 15,
  },
  {
    id: 'habit_month',
    name: 'Month Master',
    nameAr: 'سيد الشهر',
    description: 'Maintain a 30-day habit streak',
    descriptionAr: 'حافظ على سلسلة عادات لمدة 30 يوم',
    category: 'HABITS',
    tier: 'BASIC',
    icon: 'Award',
    color: '#FFB74D',
    requirement: { type: 'streak', target: 30, source: 'habit_streak' },
    points: 50,
  },
  {
    id: 'habit_100_votes',
    name: 'Identity Voter',
    nameAr: 'مصوت الهوية',
    description: 'Accumulate 100 identity votes through habits',
    descriptionAr: 'اجمع 100 صوت هوية من خلال العادات',
    category: 'HABITS',
    tier: 'PREMIUM',
    icon: 'Star',
    color: '#BA68C8',
    requirement: { type: 'count', target: 100, source: 'identity_votes' },
    points: 30,
  },

  // ============================================
  // GOALS ACHIEVEMENTS
  // ============================================
  {
    id: 'first_goal',
    name: 'Visionary',
    nameAr: 'صاحب رؤية',
    description: 'Set your first goal',
    descriptionAr: 'حدد هدفك الأول',
    category: 'GOALS',
    tier: 'FREE',
    icon: 'Target',
    color: '#64B5F6',
    requirement: { type: 'count', target: 1, source: 'goals_created' },
    points: 5,
  },
  {
    id: 'goal_complete',
    name: 'Goal Getter',
    nameAr: 'محقق الأهداف',
    description: 'Complete your first goal',
    descriptionAr: 'حقق هدفك الأول',
    category: 'GOALS',
    tier: 'FREE',
    icon: 'CheckCircle2',
    color: '#4CAF50',
    requirement: { type: 'count', target: 1, source: 'goals_completed' },
    points: 20,
  },
  {
    id: 'goal_5_complete',
    name: 'Achievement Hunter',
    nameAr: 'صياد الإنجازات',
    description: 'Complete 5 goals',
    descriptionAr: 'حقق 5 أهداف',
    category: 'GOALS',
    tier: 'BASIC',
    icon: 'Trophy',
    color: '#FFD700',
    requirement: { type: 'count', target: 5, source: 'goals_completed' },
    points: 50,
  },

  // ============================================
  // JOURNAL ACHIEVEMENTS
  // ============================================
  {
    id: 'first_entry',
    name: 'Reflection Starter',
    nameAr: 'بادئ التأمل',
    description: 'Write your first journal entry',
    descriptionAr: 'اكتب أول مدخلك في المذكرات',
    category: 'JOURNAL',
    tier: 'FREE',
    icon: 'BookOpen',
    color: '#E57373',
    requirement: { type: 'count', target: 1, source: 'journal_entries' },
    points: 5,
  },
  {
    id: 'journal_week',
    name: 'Weekly Reflector',
    nameAr: 'متأمل أسبوعي',
    description: 'Journal for 7 consecutive days',
    descriptionAr: 'اكتب في المذكرات لمدة 7 أيام متتالية',
    category: 'JOURNAL',
    tier: 'FREE',
    icon: 'Calendar',
    color: '#81C784',
    requirement: { type: 'streak', target: 7, source: 'journal_streak' },
    points: 15,
  },
  {
    id: 'writer_1000',
    name: 'Writer',
    nameAr: 'كاتب',
    description: 'Write 1,000 words total',
    descriptionAr: 'اكتب 1000 كلمة إجمالاً',
    category: 'JOURNAL',
    tier: 'FREE',
    icon: 'PenTool',
    color: '#7986CB',
    requirement: { type: 'count', target: 1000, source: 'total_words' },
    points: 10,
  },
  {
    id: 'writer_10000',
    name: 'Author',
    nameAr: 'مؤلف',
    description: 'Write 10,000 words total',
    descriptionAr: 'اكتب 10000 كلمة إجمالاً',
    category: 'JOURNAL',
    tier: 'PREMIUM',
    icon: 'FileText',
    color: '#9575CD',
    requirement: { type: 'count', target: 10000, source: 'total_words' },
    points: 40,
  },

  // ============================================
  // IDENTITY ASSESSMENT ACHIEVEMENTS
  // ============================================
  {
    id: 'baseline_complete',
    name: 'Self-Aware',
    nameAr: 'واعي بذاته',
    description: 'Complete the Identity Baseline assessment',
    descriptionAr: 'أكمل تقييم خط الأساس للهوية',
    category: 'IDENTITY',
    tier: 'FREE',
    icon: 'User',
    color: '#3DD4B0',
    requirement: { type: 'completion', target: 1, source: 'identity_baseline' },
    points: 15,
  },
  {
    id: 'audit_complete',
    name: 'Environment Designer',
    nameAr: 'مصمم البيئة',
    description: 'Complete the Environmental Audit',
    descriptionAr: 'أكمل تدقيق البيئة',
    category: 'IDENTITY',
    tier: 'BASIC',
    icon: 'Home',
    color: '#1F6F78',
    requirement: { type: 'completion', target: 1, source: 'environmental_audit' },
    points: 15,
  },
  {
    id: 'erq_complete',
    name: 'Emotional Explorer',
    nameAr: 'مستكشف المشاعر',
    description: 'Complete the ERQ assessment',
    descriptionAr: 'أكمل تقييم ERQ',
    category: 'IDENTITY',
    tier: 'BASIC',
    icon: 'Heart',
    color: '#E57373',
    requirement: { type: 'completion', target: 1, source: 'erq_assessment' },
    points: 15,
  },
  {
    id: 'all_assessments',
    name: 'Self-Scientist',
    nameAr: 'عالم النفس',
    description: 'Complete all assessment worksheets',
    descriptionAr: 'أكمل جميع أوراق عمل التقييم',
    category: 'IDENTITY',
    tier: 'PREMIUM',
    icon: 'Brain',
    color: '#BA68C8',
    requirement: { type: 'composite', target: 3, source: 'assessments_completed' },
    points: 40,
  },

  // ============================================
  // CONSISTENCY ACHIEVEMENTS
  // ============================================
  {
    id: 'first_evidence',
    name: 'Evidence Collector',
    nameAr: 'جامع الأدلة',
    description: 'Record your first piece of behavioral evidence',
    descriptionAr: 'سجل أول دليل سلوكي',
    category: 'CONSISTENCY',
    tier: 'FREE',
    icon: 'FileCheck',
    color: '#4CAF50',
    requirement: { type: 'count', target: 1, source: 'evidence_records' },
    points: 5,
  },
  {
    id: 'evidence_50',
    name: 'Proof Builder',
    nameAr: 'باني البراهين',
    description: 'Record 50 pieces of evidence',
    descriptionAr: 'سجل 50 دليلاً',
    category: 'CONSISTENCY',
    tier: 'PREMIUM',
    icon: 'Layers',
    color: '#26A69A',
    requirement: { type: 'count', target: 50, source: 'evidence_records' },
    points: 35,
  },
  {
    id: 'first_decision',
    name: 'Decision Logger',
    nameAr: 'مسجل القرارات',
    description: 'Log your first decision in the Decision Journal',
    descriptionAr: 'سجل قرارك الأول في مذكرات القرارات',
    category: 'CONSISTENCY',
    tier: 'FREE',
    icon: 'GitBranch',
    color: '#5C6BC0',
    requirement: { type: 'count', target: 1, source: 'decisions_logged' },
    points: 5,
  },
  {
    id: 'decision_30',
    name: 'Pattern Spotter',
    nameAr: 'كاشف الأنماط',
    description: 'Log 30 decisions',
    descriptionAr: 'سجل 30 قراراً',
    category: 'CONSISTENCY',
    tier: 'PREMIUM',
    icon: 'Search',
    color: '#7E57C2',
    requirement: { type: 'count', target: 30, source: 'decisions_logged' },
    points: 30,
  },

  // ============================================
  // TRANSFORMATION ACHIEVEMENTS
  // ============================================
  {
    id: 'identity_30',
    name: 'Identity Builder',
    nameAr: 'باني الهوية',
    description: 'Reach Identity Score of 30',
    descriptionAr: 'وصول درجة الهوية إلى 30',
    category: 'TRANSFORMATION',
    tier: 'FREE',
    icon: 'TrendingUp',
    color: '#3DD4B0',
    requirement: { type: 'score', target: 30, source: 'identity_score' },
    points: 10,
  },
  {
    id: 'identity_60',
    name: 'Transformer',
    nameAr: 'المحول',
    description: 'Reach Identity Score of 60',
    descriptionAr: 'وصول درجة الهوية إلى 60',
    category: 'TRANSFORMATION',
    tier: 'BASIC',
    icon: 'RefreshCw',
    color: '#1F6F78',
    requirement: { type: 'score', target: 60, source: 'identity_score' },
    points: 30,
  },
  {
    id: 'identity_80',
    name: 'Identity Master',
    nameAr: 'سيد الهوية',
    description: 'Reach Identity Score of 80',
    descriptionAr: 'وصول درجة الهوية إلى 80',
    category: 'TRANSFORMATION',
    tier: 'PREMIUM',
    icon: 'Crown',
    color: '#FFD700',
    requirement: { type: 'score', target: 80, source: 'identity_score' },
    points: 50,
  },
  {
    id: 'identity_100',
    name: 'Self-Actualized',
    nameAr: 'محقق الذات',
    description: 'Reach Identity Score of 100',
    descriptionAr: 'وصول درجة الهوية إلى 100',
    category: 'TRANSFORMATION',
    tier: 'BUNDLE',
    icon: 'Sparkles',
    color: '#FF6B6B',
    requirement: { type: 'score', target: 100, source: 'identity_score' },
    points: 100,
    hidden: true,
  },

  // ============================================
  // ENGAGEMENT ACHIEVEMENTS
  // ============================================
  {
    id: 'daily_active',
    name: 'Daily Active',
    nameAr: 'نشط يومياً',
    description: 'Use Tamkinly for 7 days in a row',
    descriptionAr: 'استخدم تمكينلي لمدة 7 أيام متتالية',
    category: 'ENGAGEMENT',
    tier: 'FREE',
    icon: 'Activity',
    color: '#4CAF50',
    requirement: { type: 'streak', target: 7, source: 'active_days' },
    points: 15,
  },
  {
    id: 'all_apps',
    name: 'App Explorer',
    nameAr: 'مستكشف التطبيقات',
    description: 'Use all available apps at least once',
    descriptionAr: 'استخدم جميع التطبيقات المتاحة مرة واحدة على الأقل',
    category: 'ENGAGEMENT',
    tier: 'PREMIUM',
    icon: 'Grid',
    color: '#3DD4B0',
    requirement: { type: 'composite', target: 8, source: 'apps_used' },
    points: 25,
  },

  // ============================================
  // MILESTONE ACHIEVEMENTS
  // ============================================
  {
    id: 'journey_start',
    name: 'Journey Begins',
    nameAr: 'بداية الرحلة',
    description: 'Start your 30-day transformation journey',
    descriptionAr: 'ابدأ رحلة التحول لمدة 30 يوم',
    category: 'MILESTONE',
    tier: 'FREE',
    icon: 'Flag',
    color: '#3DD4B0',
    requirement: { type: 'completion', target: 1, source: 'journey_started' },
    points: 10,
  },
  {
    id: 'phase_2',
    name: 'Recoding Active',
    nameAr: 'إعادة الترميز نشطة',
    description: 'Reach Phase 2: Recoding',
    descriptionAr: 'الوصول إلى المرحلة 2: إعادة الترميز',
    category: 'MILESTONE',
    tier: 'BASIC',
    icon: 'RefreshCw',
    color: '#BA68C8',
    requirement: { type: 'completion', target: 2, source: 'phase_reached' },
    points: 25,
  },
  {
    id: 'phase_3',
    name: 'Integration Mode',
    nameAr: 'وضع التكامل',
    description: 'Reach Phase 3: Integration',
    descriptionAr: 'الوصول إلى المرحلة 3: التكامل',
    category: 'MILESTONE',
    tier: 'PREMIUM',
    icon: 'Infinity',
    color: '#4CAF50',
    requirement: { type: 'completion', target: 3, source: 'phase_reached' },
    points: 40,
  },
  {
    id: 'journey_complete',
    name: 'Transformation Complete',
    nameAr: 'اكتمال التحول',
    description: 'Complete the 30-day transformation journey',
    descriptionAr: 'أكمل رحلة التحول لمدة 30 يوم',
    category: 'MILESTONE',
    tier: 'BUNDLE',
    icon: 'CheckCircle2',
    color: '#FFD700',
    requirement: { type: 'completion', target: 30, source: 'journey_days' },
    points: 100,
  },
];

// Helper function to get achievements by tier
export function getAchievementsByTier(tier: AccessTier): Achievement[] {
  const tierOrder = ['FREE', 'TRIAL', 'BASIC', 'PREMIUM', 'BUNDLE'];
  const tierIndex = tierOrder.indexOf(tier);
  return achievements.filter(a => tierOrder.indexOf(a.tier) <= tierIndex);
}

// Helper function to get achievements by category
export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return achievements.filter(a => a.category === category);
}

// Helper function to calculate total points
export function calculateTotalPoints(unlockedAchievements: string[]): number {
  return achievements
    .filter(a => unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0);
}

// Check if achievement should be unlocked
export function checkAchievementUnlock(
  achievementId: string, 
  stats: Record<string, number>
): { unlocked: boolean; progress: number } {
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return { unlocked: false, progress: 0 };

  const currentValue = stats[achievement.requirement.source] || 0;
  const target = achievement.requirement.target;
  const progress = Math.min(100, Math.round((currentValue / target) * 100));
  const unlocked = currentValue >= target;

  return { unlocked, progress };
}

// Export default for convenience
export default achievements;
