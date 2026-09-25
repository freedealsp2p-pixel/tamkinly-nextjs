'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  CheckCircle2,
  FilePen,
  FolderOpen,
  Tag,
  ArrowRight,
  Loader2,
  AlertCircle,
  Globe,
} from 'lucide-react';

interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalCategories: number;
  totalTopics: number;
}

const defaultStats: Stats = {
  totalArticles: 0,
  publishedArticles: 0,
  draftArticles: 0,
  totalCategories: 0,
  totalTopics: 0,
};

export default function ContentDashboard() {
  const [stats, setStats] = useState<Stats>(defaultStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    setLoading(true);
    setError('');
    try {
      const [articlesRes, categoriesRes, topicsRes] = await Promise.all([
        fetch('/api/admin/articles'),
        fetch('/api/admin/categories'),
        fetch('/api/admin/topics'),
      ]);
      if (!articlesRes.ok || !categoriesRes.ok || !topicsRes.ok) {
        throw new Error('Failed to load data');
      }
      const articlesData = await articlesRes.json();
      const categoriesData = await categoriesRes.json();
      const topicsData = await topicsRes.json();

      const articles = articlesData.data || [];
      const categories = categoriesData.data || [];
      const topics = topicsData.data || [];

      setStats({
        totalArticles: articles.length,
        publishedArticles: articles.filter((a: any) => a.status === 'PUBLISHED').length,
        draftArticles: articles.filter((a: any) => a.status === 'DRAFT').length,
        totalCategories: categories.length,
        totalTopics: topics.length,
      });
    } catch (err: any) {
      setError(err.message || 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  }

  const statCards = [
    {
      label: 'Total Articles',
      value: stats.totalArticles,
      icon: FileText,
      color: 'bg-slate-50 text-slate-700',
      iconColor: 'text-slate-500',
    },
    {
      label: 'Published',
      value: stats.publishedArticles,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-700',
      iconColor: 'text-emerald-500',
    },
    {
      label: 'Drafts',
      value: stats.draftArticles,
      icon: FilePen,
      color: 'bg-amber-50 text-amber-700',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Categories',
      value: stats.totalCategories,
      icon: FolderOpen,
      color: 'bg-sky-50 text-sky-700',
      iconColor: 'text-sky-500',
    },
    {
      label: 'Topics',
      value: stats.totalTopics,
      icon: Tag,
      color: 'bg-violet-50 text-violet-700',
      iconColor: 'text-violet-500',
    },
  ];

  const quickLinks = [
    { href: '/admin/content/articles/new', label: 'Create New Article', icon: FileText },
    { href: '/admin/content/categories', label: 'Manage Categories', icon: FolderOpen },
    { href: '/admin/content/topics', label: 'Manage Topics', icon: Tag },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Content Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Manage articles, categories, and topics for Tamkinly.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={loadStats}
            className="ml-auto underline text-red-600 hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[#3DD4B0]" />
          <span className="ml-2 text-slate-500">Loading stats...</span>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      {card.label}
                    </span>
                    <Icon size={18} className={card.iconColor} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{card.value}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between p-4 rounded-lg border border-slate-200 hover:border-[#3DD4B0] hover:bg-[#3DD4B0]/5 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-[#3DD4B0]/10 transition-colors">
                        <Icon size={18} className="text-slate-600 group-hover:text-[#3DD4B0] transition-colors" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">
                        {link.label}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-400 group-hover:text-[#3DD4B0] transition-colors"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
