import type { Metadata } from 'next';
import CrisisBar from '@/components/recovery/system/CrisisBar';

// Only set robots here; title/description are left for child layouts to define
// via generateMetadata. A static title here would override children's dynamic metadata.
export const metadata: Metadata = {
  robots: { index: true, follow: true },
};

export default function TrcLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <CrisisBar />
    </>
  );
}
