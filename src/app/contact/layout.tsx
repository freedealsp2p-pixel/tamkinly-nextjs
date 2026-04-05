import type { Metadata } from 'next';
import { CONTACT_METADATA } from '@/lib/seo-pages';

export const metadata: Metadata = CONTACT_METADATA;

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
