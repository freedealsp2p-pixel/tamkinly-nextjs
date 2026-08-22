import type { Metadata } from 'next';
import RecoveryPage from "@/components/recovery/RecoveryPage";
import { MedicalDisclaimer } from '@/components/recovery/system';


export const metadata: Metadata = {
  title: 'Recovery Journey | Tamkinly',
  description: 'A free, evidence-based recovery journey. Understand the behavioral loop, build practical tools (HALT, Trigger Journal, Emergency Plan), and become who you want to be — without self-blame.',
  keywords: [
    'recovery journey', 'behavior change', 'compulsive behavior recovery',
    'HALT check', 'trigger journal', 'relapse recovery',
    'identity transformation', 'self-help tools', 'recovery framework',
  ],
  alternates: {
    canonical: 'https://tamkinly.com/recovery/porn-recovery',
    languages: {
      'en-US': 'https://tamkinly.com/recovery/porn-recovery',
      'ar-SA': 'https://tamkinly.com/ar/recovery/porn-recovery',
      'x-default': 'https://tamkinly.com/recovery/porn-recovery',
    },
  },
  openGraph: {
    title: 'Recovery Journey — Begin Without Self-Blame',
    description: 'Understand what is happening inside your brain, build practical tools, and become who you want to be.',
    url: 'https://tamkinly.com/recovery/porn-recovery',
    siteName: 'Tamkinly',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <>
      <MedicalDisclaimer />
      <RecoveryPage />
    </>
  );
}


