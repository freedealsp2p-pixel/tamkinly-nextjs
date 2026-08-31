'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Star,
  Loader2,
  AlertCircle,
  X,
  Globe,
  Eye,
  EyeOff,
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  language: string;
  status: string;
  isFeatured: boolean;
  accessTier?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ArticlesListPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [notification, setNotification] = useState('');

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (languageFilter) params.set('language', languageFilter);
      if (searchQuery) params.set('search', searchQuery);
      const query = params.toString() ? `?${params.toString()}` : '';
      const res = await fetch(`/api/admin/articles${query}`);
      if (!res.ok) throw new Error('Failed to fetch articles');
      const json = await res.json();
      setArticles(json.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, languageFilter, searchQuery]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearchQuery(searchInput);
  }

  function clearSearch() {
    setSearchInput('');
    setSearchQuery('');
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setDeleteTarget(null);
      setNotification('Article deleted successfully');
      fetchArticles();
    } catch (err: any) {
      alert('Failed to delete article: ' + (err.message || 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm flex items-center gap-2">
          <CheckIcon />
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Articles</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage and publish content for Tamkinly.
          </p>
        </div>
        <Link
          href="/admin/content/articles/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3DD4B0] text-white text-sm font-medium rounded-lg hover:bg-[#35bfa0] transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-9 pr-8 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0]"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Search
            </button>
          </form>

          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0]"
            >
              <option value="">All Status</option>
              <option value="PUBLISHED">Published</option>
              <option value="DRAFT">Draft</option>
            </select>

            <select
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0]"
            >
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={fetchArticles}
            className="ml-auto underline text-red-600 hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[#3DD4B0]" />
          <span className="ml-2 text-slate-500">Loading articles...</span>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <FileTextIcon />
          <h3 className="mt-4 text-lg font-medium text-slate-700">No articles found</h3>
          <p className="mt-1 text-sm text-slate-500">
            {searchQuery || statusFilter || languageFilter
              ? 'Try adjusting your filters.'
              : 'Create your first article to get started.'}
          </p>
          {!searchQuery && !statusFilter && !languageFilter && (
            <Link
              href="/admin/content/articles/new"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#3DD4B0] text-white text-sm font-medium rounded-lg hover:bg-[#35bfa0] transition-colors"
            >
              <Plus size={16} />
              Create Article
            </Link>
          )}
        </div>
      ) : (
        /* Articles Table */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Slug
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Language
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-center px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Featured
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Date
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 max-w-xs truncate">
                        {article.title}
                      </div>
                      {article.titleAr && (
                        <div
                          className="text-xs text-slate-400 max-w-xs truncate mt-0.5"
                          dir="rtl"
                        >
                          {article.titleAr}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-500 text-xs font-mono max-w-[150px] truncate block">
                        {article.slug}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium">
                        <Globe size={12} className="text-slate-400" />
                        {article.language === 'ar' ? 'Arabic' : 'English'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {article.status === 'PUBLISHED' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                          <Eye size={12} />
                          Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                          <EyeOff size={12} />
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {article.isFeatured ? (
                        <Star size={16} className="text-amber-400 fill-amber-400 mx-auto" />
                      ) : (
                        <Star size={16} className="text-slate-300 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-slate-500 text-xs">
                      {formatDate(article.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => router.push(`/admin/content/articles/${article.id}`)}
                          className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(article.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Article</h3>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this article? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteTarget)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleting && <Loader2 size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-emerald-500">
      <path d="M13.25 4.75L6 12L2.75 8.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileTextIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto text-slate-300">
      <rect x="8" y="4" width="32" height="40" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16H32M16 24H28M16 32H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
