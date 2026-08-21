import type { Metadata } from 'next'

const pagePaths: Record<string, string> = {
  home: '/',
  apps: '/apps',
  quiz: '/quiz',
  methodology: '/methodology',
  products: '/products',
  about: '/about',
  aiCoach: '/apps/ai-identity-coach',
}

export const siteMetadata = {
  home: {
    title: 'Tamkinly | Return to Your Center',
    description:
      "You don't have a discipline problem. You have an identity gap. Discover it free in 3 minutes \u2014 no email required.",
    keywords: 'identity transformation, identity gap, identity recode, self-authorship, values clarification, \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0647\u0648\u064a\u0629, \u0641\u062c\u0648\u0629 \u0627\u0644\u0647\u0648\u064a\u0629',
  },
  apps: {
    title: 'Tamkinly Apps | Identity Transformation Tools',
    description:
      'Free and premium tools for identity transformation \u2014 identity assessment, values clarification, daily reflection, and more. Start free, no email required.',
    keywords: 'identity tools, values clarification, daily reflection, identity baseline, \u0623\u062f\u0648\u0627\u062a \u0627\u0644\u0647\u0648\u064a\u0629',
  },
  quiz: {
    title: 'Identity Gap Quiz | Free 3-Minute Assessment',
    description:
      'Take our free 3-minute identity gap assessment. 12 questions. Instant visual results across 6 dimensions. No email, no sign-up.',
    keywords: 'identity gap quiz, free identity assessment, \u0627\u062e\u062a\u0628\u0627\u0631 \u0641\u062c\u0648\u0629 \u0627\u0644\u0647\u0648\u064a\u0629',
  },
  methodology: {
    title: 'Methodology | Evidence-Based Identity Transformation',
    description:
      'Our methodology combines neuroplasticity, self-authorship theory, and the Maintain IT Model for lasting identity transformation \u2014 not habit change.',
    keywords: 'identity methodology, self-authorship, neuroplasticity, Maintain IT model',
  },
  products: {
    title: 'Products & Pricing',
    description:
      'Start free with powerful identity tools, then upgrade as you grow. One-time payments. 30-day satisfaction guarantee. No subscriptions.',
    keywords: 'identity transformation products, identity planner, \u062a\u062d\u0648\u064a\u0644 \u0627\u0644\u0647\u0648\u064a\u0629',
  },
  about: {
    title: 'About Tamkinly | Return to Who You Already Are',
    description:
      "Tamkinly was built on one realization: people chase goals when they should be architecting identities. Meet the team behind the methodology.",
    keywords: 'about tamkinly, identity transformation team',
  },
  aiCoach: {
    title: 'AI Identity Coach | Personal Transformation Companion',
    description:
      'Talk to your AI identity coach \u2014 grounded in psychology and self-authorship. Ask about identity change, habits, and the Tamkinly system. Available now.',
    keywords: 'AI identity coach, AI coaching, \u0645\u062f\u0631\u0628 \u0627\u0644\u0647\u0648\u064a\u0629 \u0627\u0644\u0630\u0643\u064a',
  },
} satisfies Record<string, { title: string; description: string; keywords: string }>

export function buildMetadata(page: keyof typeof siteMetadata): Metadata {
  const m = siteMetadata[page]
  const path = pagePaths[page] || '/'
  const fullUrl = 'https://tamkinly.com' + path
  const imageUrl = 'https://tamkinly.com/opengraph-image'
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: fullUrl,
      siteName: 'Tamkinly',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: m.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [imageUrl],
    },
  }
}
