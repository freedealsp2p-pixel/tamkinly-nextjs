import { getAdminSession } from '@/lib/admin-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';
import { ClientSidebar } from './client-sidebar';

export const metadata = {
  title: 'Content Management — Tamkinly',
};

export default async function AdminContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin');
  }

  return (
    <ClientSidebar>
      {children}
    </ClientSidebar>
  );
}
