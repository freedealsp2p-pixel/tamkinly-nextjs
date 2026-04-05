import type { Metadata } from 'next';
import { QUIZ_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = QUIZ_METADATA;

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
