'use client';

import dynamic from 'next/dynamic';

const AICoachChat = dynamic(
  () => import('./AICoachClient'),
  { 
    ssr: false,
    loading: () => null,
  }
);

export function AICoachChatWrapper() {
  return <AICoachChat />;
}
