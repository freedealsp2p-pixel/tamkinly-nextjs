import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Referral Program | Invite Friends & Earn Rewards - Tamkinly',
  description: 'Share Tamkinly with friends and earn rewards. Get free trial extensions, app access, and premium bundles for every successful referral.',
  openGraph: {
    title: 'Tamkinly Referral Program - Invite Friends, Earn Rewards',
    description: 'Share Tamkinly with friends and earn rewards. Both you and your friends benefit!',
    url: 'https://tamkinly.com/referral',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamkinly Referral Program - Invite Friends, Earn Rewards',
    description: 'Share Tamkinly with friends and earn rewards for every successful referral.',
  },
};

export default function ReferralLayout({ children }: { children: React.ReactNode }) {
  return children;
}

