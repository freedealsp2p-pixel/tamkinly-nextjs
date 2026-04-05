import type { Metadata } from 'next';
import { PRIVACY_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = PRIVACY_METADATA;

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
