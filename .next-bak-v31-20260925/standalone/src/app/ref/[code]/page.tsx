import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export default async function RefRedirectPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  
  // Track the referral visit
  try {
    const referral = await db.referral.findUnique({
      where: { code: code.toUpperCase() },
    });
    
    if (referral) {
      // Increment visit count or log
      // For now, just redirect to signup with ref param
    }
  } catch {}
  
  redirect('/auth/signup?ref=' + code.toUpperCase());
}
