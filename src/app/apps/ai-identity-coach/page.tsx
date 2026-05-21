import { AICoachLandingSSR } from '@/components/AICoachLandingSSR';
import { AICoachChatWrapper } from './AICoachChatWrapper';

export default function AIIdentityCoachPage() {
  return (
    <>
      {/* Server-rendered landing - visible to crawlers and users */}
      <AICoachLandingSSR locale="en" />
      
      {/* Client-side interactive chat - loads after hydration */}
      <AICoachChatWrapper />
    </>
  );
}
