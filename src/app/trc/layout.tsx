import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trauma Recovery Center | Tamkinly',
  description: 'Free, evidence-based tools for sexual harassment and abuse survivors. Grounding exercises, breathing techniques, and therapeutic resources.',
  robots: { index: true, follow: true },
};

export default function TrcLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
}
