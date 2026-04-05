/**
 * App Pages Data Configuration
 * Centralized metadata for all app pages
 * Enables unique SEO for each app
 */

import type { Metadata } from 'next';

// ============================================
// TYPES
// ============================================

export interface AppPage {
  slug: string;
  title: string;
  description: string;
  tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'BUNDLE';
  category: string;
  keywords: string[];
  image?: string;
}

// ============================================
// ALL APP PAGES
// ============================================

export const APP_PAGES: AppPage[] = [
  {
    slug: 'identity-gap-quiz',
    title: 'Identity Gap Quiz | Free 3-Minute Assessment',
    description: 'Discover the gap between who you are and who you want to become. Free research-backed assessment with instant personalized results.',
    tier: 'FREE',
    category: 'Assessment',
    keywords: ['identity gap quiz', 'free assessment', 'self-discovery', 'identity test', 'personal growth assessment'],
  },
  {
    slug: 'values-clarification',
    title: 'Values Clarification Tool | Discover Your Core Values',
    description: 'Scientific method to identify and clarify your core values. Based on ACT and positive psychology research. Free tool.',
    tier: 'FREE',
    category: 'Self-Discovery',
    keywords: ['values clarification', 'core values', 'ACT therapy', 'values exercise', 'personal values'],
  },
  {
    slug: 'daily-reflection',
    title: 'Daily Reflection Practice | Evidence-Based Journaling',
    description: 'Transform your identity through daily reflection. 7 themes with research-backed prompts that rewire neural pathways.',
    tier: 'FREE',
    category: 'Journaling',
    keywords: ['daily reflection', 'journaling prompts', 'daily journal', 'reflection practice', 'mindfulness journaling'],
  },
  {
    slug: 'habit-tracker',
    title: 'Habit Tracker | Build Identity-Based Habits',
    description: 'Track habits that align with your desired identity. Visual progress tracking and streak motivation. Free tool.',
    tier: 'FREE',
    category: 'Productivity',
    keywords: ['habit tracker', 'habit tracking', 'daily habits', 'streak tracking', 'habit builder'],
  },
  {
    slug: 'goal-system',
    title: 'Goal System | Identity-Aligned Goal Setting',
    description: 'Set goals that match who you want to become. Break down aspirations into actionable steps with progress tracking.',
    tier: 'FREE',
    category: 'Planning',
    keywords: ['goal setting', 'goal system', 'achievement planning', 'goal tracker', 'smart goals'],
  },
  {
    slug: 'identity-baseline',
    title: 'Identity Baseline Worksheet | Self-Concept Assessment',
    description: 'Measure your current self-concept clarity across 8 dimensions. Research-backed baseline for transformation tracking.',
    tier: 'BASIC',
    category: 'Assessment',
    keywords: ['identity baseline', 'self-concept', 'identity worksheet', 'baseline assessment', 'self-assessment'],
  },
  {
    slug: 'identity-recode-system',
    title: 'Identity Recode System | 30-Day Transformation Program',
    description: 'Complete identity transformation system with 6 interconnected components. Structured 30-day program with worksheets and trackers.',
    tier: 'BASIC',
    category: 'Transformation',
    keywords: ['identity recode', 'transformation program', '30-day challenge', 'identity change', 'personal transformation'],
  },
  {
    slug: 'environmental-audit',
    title: 'Environmental Audit | Design Your Growth Space',
    description: 'Audit your physical, social, and digital environments. Align your surroundings with your transformation goals.',
    tier: 'BASIC',
    category: 'Environment',
    keywords: ['environmental audit', 'environment design', 'growth environment', 'space optimization', 'environmental psychology'],
  },
  {
    slug: 'emotion-regulation',
    title: 'ERQ Emotion Regulation | Master Your Inner World',
    description: 'Based on Gross & John\'s ERQ research. Learn cognitive reappraisal vs. suppression for emotional intelligence.',
    tier: 'BASIC',
    category: 'Mental Health',
    keywords: ['emotion regulation', 'ERQ', 'emotional intelligence', 'cognitive reappraisal', 'emotional control'],
  },
  {
    slug: 'decision-analysis',
    title: 'Decision Pattern Analysis | Better Choices Framework',
    description: 'Analyze your decision-making patterns and identify cognitive biases. Make better choices aligned with your identity.',
    tier: 'BASIC',
    category: 'Decision Making',
    keywords: ['decision analysis', 'decision making', 'cognitive biases', 'choice architecture', 'better decisions'],
  },
  {
    slug: 'evidence-tracking',
    title: 'Evidence Tracking System | Document Your Transformation',
    description: 'Track evidence of your new identity. Capture moments that prove who you\'re becoming with this structured system.',
    tier: 'BASIC',
    category: 'Progress Tracking',
    keywords: ['evidence tracking', 'transformation evidence', 'progress documentation', 'identity proof', 'change tracking'],
  },
  {
    slug: 'daily-planner',
    title: 'Daily Planner | Identity-Based Time Management',
    description: 'Plan your day around who you want to become. Time blocking and priority setting aligned with your identity.',
    tier: 'BASIC',
    category: 'Planning',
    keywords: ['daily planner', 'time management', 'daily planning', 'time blocking', 'productivity planner'],
  },
  {
    slug: 'journal-system',
    title: 'Journal System | Structured Self-Reflection',
    description: 'Complete journaling system with templates for identity work, habit tracking, and transformation documentation.',
    tier: 'BASIC',
    category: 'Journaling',
    keywords: ['journal system', 'journaling templates', 'self-reflection', 'identity journal', 'structured journaling'],
  },
  {
    slug: 'worksheets',
    title: 'Worksheets Library | Transformation Tools Collection',
    description: 'Access all Tamkinly worksheets in one place. Identity exploration, habit building, and transformation exercises.',
    tier: 'BASIC',
    category: 'Worksheets',
    keywords: ['worksheets', 'transformation tools', 'self-improvement worksheets', 'identity exercises', 'personal development'],
  },
  {
    slug: 'ai-identity-coach',
    title: 'AI Identity Coach | 24/7 Personal Transformation Guide',
    description: 'AI-powered coaching for identity transformation. Personalized guidance for discovery, habits, and emotional regulation.',
    tier: 'BUNDLE',
    category: 'AI Coaching',
    keywords: ['AI coach', 'artificial intelligence coaching', 'identity coach', 'AI therapy', 'personal AI guide'],
  },
  {
    slug: 'progress-dashboard',
    title: 'Progress Dashboard | Unified Transformation Tracker',
    description: 'Track your progress across all Tamkinly apps. Unified view of identity score, achievements, and transformation journey.',
    tier: 'BUNDLE',
    category: 'Dashboard',
    keywords: ['progress dashboard', 'transformation tracker', 'identity score', 'achievement tracking', 'progress monitoring'],
  },
  {
    slug: 'executive-manual',
    title: 'Executive Manual | Complete Transformation Guide',
    description: 'Comprehensive guide for identity transformation. Step-by-step instructions for using all Tamkinly tools effectively.',
    tier: 'BUNDLE',
    category: 'Guide',
    keywords: ['executive manual', 'transformation guide', 'user guide', 'complete manual', 'transformation instructions'],
  },
  {
    slug: 'community-access',
    title: 'Community Access | Connect with Transformation Seekers',
    description: 'Join a community of people on their transformation journey. Share experiences, get support, and celebrate wins.',
    tier: 'BUNDLE',
    category: 'Community',
    keywords: ['community', 'transformation community', 'support group', 'accountability partner', 'growth community'],
  },
  {
    slug: 'priority-support',
    title: 'Priority Support | Personal Transformation Assistance',
    description: 'Get priority access to our transformation experts. Personal guidance and faster response times for your journey.',
    tier: 'BUNDLE',
    category: 'Support',
    keywords: ['priority support', 'personal assistance', 'transformation help', 'expert guidance', 'premium support'],
  },
  {
    slug: 'trial-planner',
    title: 'Trial Planner | Free Transformation Starter',
    description: 'Start your transformation journey with our free trial planner. Sample exercises from our premium tools.',
    tier: 'FREE',
    category: 'Planning',
    keywords: ['trial planner', 'free trial', 'transformation starter', 'free tools', 'beginner planning'],
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get app page by slug
 */
export function getAppPageBySlug(slug: string): AppPage | undefined {
  return APP_PAGES.find(app => app.slug === slug);
}

/**
 * Get all app slugs for static generation
 */
export function getAllAppSlugs(): string[] {
  return APP_PAGES.map(app => app.slug);
}

/**
 * Generate metadata for an app page
 */
export function generateAppPageMetadata(slug: string): Metadata {
  const app = getAppPageBySlug(slug);
  
  if (!app) {
    return {
      title: 'App Not Found | Tamkinly',
      description: 'The requested app could not be found.',
    };
  }
  
  const fullUrl = `https://tamkinly.com/apps/${app.slug}`;
  const imageUrl = app.image 
    ? `https://tamkinly.com${app.image}` 
    : 'https://tamkinly.com/og-image.png';
  
  const isFree = app.tier === 'FREE';
  const tierDescription = isFree 
    ? 'Free to use.' 
    : `Available in ${app.tier} package.`;
  
  return {
    title: `${app.title} | Tamkinly`,
    description: `${app.description} ${tierDescription}`,
    keywords: app.keywords,
    
    alternates: {
      canonical: fullUrl,
    },
    
    openGraph: {
      title: app.title,
      description: app.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: app.title,
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: app.title,
      description: app.description,
      site: '@tamkinly',
      images: [imageUrl],
    },
    
    other: {
      'app:tier': app.tier,
      'app:category': app.category,
    },
  };
}

/**
 * Get apps by tier
 */
export function getAppsByTier(tier: 'FREE' | 'BASIC' | 'PREMIUM' | 'BUNDLE'): AppPage[] {
  return APP_PAGES.filter(app => app.tier === tier);
}

/**
 * Get apps by category
 */
export function getAppsByCategory(category: string): AppPage[] {
  return APP_PAGES.filter(app => 
    app.category.toLowerCase().includes(category.toLowerCase())
  );
}
