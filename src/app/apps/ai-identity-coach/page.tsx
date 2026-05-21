import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import { AICoachLandingSSR } from '@/components/AICoachLandingSSR'
import { AICoachChatWrapper } from './AICoachChatWrapper'

export const metadata: Metadata = buildMetadata('aiCoach')

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
