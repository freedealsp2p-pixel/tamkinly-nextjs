'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Tag,
  ArrowLeft,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { href: '/admin/content', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/content/articles', label: 'Articles', icon: FileText },
  { href: '/admin/content/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin/content/topics', label: 'Topics', icon: Tag },
];

export function ClientSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/admin/content') return pathname === '/admin/content';
    return pathname.startsWith(href);
  };

  const closeMobile = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 right-0 h-full w-64 bg-slate-900 text-white z-50
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-700">
          <Link href="/admin/content" onClick={closeMobile} className="text-lg font-bold tracking-tight">
            <span className="text-[#3DD4B0]">Tamkinly</span>{' '}
            <span className="text-slate-400 font-normal text-sm">Content</span>
          </Link>
          <button
            onClick={closeMobile}
            className="lg:hidden p-1 rounded hover:bg-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobile}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                  transition-colors duration-150
                  ${
                    active
                      ? 'bg-[#3DD4B0]/15 text-[#3DD4B0]'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}

          <div className="pt-4 mt-4 border-t border-slate-700">
            <Link
              href="/admin"
              onClick={closeMobile}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors duration-150"
            >
              <ArrowLeft size={18} />
              Back to Admin
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={20} className="text-slate-600" />
          </button>
          <span className="text-sm font-semibold text-slate-700">
            <span className="text-[#3DD4B0]">Tamkinly</span> Content
          </span>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
