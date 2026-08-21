import type { Metadata } from 'next'
import { AICoachLandingSSR } from '@/components/AICoachLandingSSR'
import { AICoachChatWrapper } from './AICoachChatWrapper'

export const metadata: Metadata = {
  title: 'AI Identity Coach | Personal Transformation Companion',
  description: 'Talk to your AI identity coach — grounded in psychology and self-authorship. Ask about identity change, habits, and the Tamkinly system. Available now.',
  keywords: 'AI identity coach, AI coaching, \u0645\u062f\u0631\u0628 \u0627\u0644\u0647\u0648\u064a\u0629 \u0627\u0644\u0630\u0643\u064a',
  alternates: {
    canonical: 'https://tamkinly.com/apps/ai-identity-coach',
  },
  openGraph: {
    title: 'AI Identity Coach | Personal Transformation Companion',
    description: 'Talk to your AI identity coach — grounded in psychology and self-authorship. Available 24/7 with personalized guidance.',
    url: 'https://tamkinly.com/apps/ai-identity-coach',
    siteName: 'Tamkinly',
    type: 'website',
    images: [{
      url: 'https://tamkinly.com/apps/ai-identity-coach/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'AI Identity Coach | Tamkinly',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Identity Coach | Personal Transformation Companion',
    description: 'Talk to your AI identity coach — grounded in psychology and self-authorship. Available 24/7.',
    site: '@tamkinly',
    images: ['https://tamkinly.com/apps/ai-identity-coach/opengraph-image'],
  },
  other: {
    'DC.description': 'Talk to your AI identity coach — grounded in psychology and self-authorship. Available 24/7 with personalized guidance for identity change, habits, and self-authorship.',
    'DC.title': 'AI Identity Coach | Tamkinly',
  },
}

export default function AIIdentityCoachPage() {
  return (
    <>
      {/* Server-rendered landing - visible to crawlers and users */}
      <AICoachLandingSSR locale="en" />
      
      {/* Client-side interactive chat - loads after hydration */}
      <AICoachChatWrapper />
    </>
  )
}

