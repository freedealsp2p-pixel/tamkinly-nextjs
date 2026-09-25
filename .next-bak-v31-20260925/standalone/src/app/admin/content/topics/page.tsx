'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Trash2,
  Loader2,
  AlertCircle,
  X,
  Tag,
} from 'lucide-react';

interface Topic {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
  _count?: { articles: number };
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  // Form state
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formNameAr, setFormNameAr] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/topics');
      if (!res.ok) throw new Error('Failed to fetch topics');
      const json = await res.json();
      setTopics(json.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to load topics');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  function resetForm() {
    setShowForm(false);
    setFormName('');
    setFormNameAr('');
    setFormSlug('');
    setSlugEdited(false);
    setFormError('');
  }

  function openAddForm() {
    resetForm();
    setShowForm(true);
  }

  function handleNameChange(value: string) {
    setFormName(value);
    if (!slugEdited) {
      setFormSlug(generateSlug(value));
    }
  }

  async function handleSave() {
    setFormError('');
    if (!formName.trim()) {
      setFormError('Topic name is required.');
      return;
    }
    if (!formSlug.trim()) {
      setFormError('Slug is required.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        name: formName.trim(),
        nameAr: formNameAr.trim(),
        slug: formSlug.trim(),
      };

      const res = await fetch('/api/admin/topics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create topic');
      }

      setNotification('Topic created!');
      resetForm();
      fetchTopics();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/topics?id=${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setDeleteTarget(null);
      setNotification('Topic deleted.');
      fetchTopics();
    } catch (err: any) {
      alert('Failed to delete: ' + (err.message || 'Unknown error'));
    } finally {
      setDeleting(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0] bg-white';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  return (
    <div>
      {/* Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Topics</h1>
          <p className="text-slate-500 text-sm mt-1">
            Tag articles with topics for better organization.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#3DD4B0] text-white text-sm font-medium rounded-lg hover:bg-[#35bfa0] transition-colors"
        >
          <Plus size={16} />
          Add Topic
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          <AlertCircle size={16} />
          {error}
          <button
            onClick={fetchTopics}
            className="ml-auto underline text-red-600 hover:text-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-900">New Topic</h2>
            <button
              onClick={resetForm}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Name (English) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formName}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Topic name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Name (Arabic)</label>
              <input
                type="text"
                value={formNameAr}
                onChange={(e) => setFormNameAr(e.target.value)}
                placeholder="اسم الموضوع"
                dir="rtl"
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={labelClass}>Slug</label>
            <input
              type="text"
              value={formSlug}
              onChange={(e) => {
                setFormSlug(e.target.value);
                setSlugEdited(true);
              }}
              className={inputClass + ' font-mono text-xs'}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={resetForm}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#3DD4B0] rounded-lg hover:bg-[#35bfa0] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Create Topic
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 size={24} className="animate-spin text-[#3DD4B0]" />
          <span className="ml-2 text-slate-500">Loading topics...</span>
        </div>
      ) : topics.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
          <Tag size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-lg font-medium text-slate-700">No topics yet</h3>
          <p className="text-sm text-slate-500 mt-1">Create your first topic to tag articles.</p>
          <button
            onClick={openAddForm}
            className="mt-4 px-4 py-2 bg-[#3DD4B0] text-white text-sm font-medium rounded-lg hover:bg-[#35bfa0] transition-colors"
          >
            Add Topic
          </button>
        </div>
      ) : (
        /* Topics Table */
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Name</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Name (Arabic)</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-600">Slug</th>
                  <th className="text-center px-4 py-3 font-medium text-slate-600">Articles</th>
                  <th className="text-right px-4 py-3 font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topics.map((topic) => (
                  <tr key={topic.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-900">{topic.name}</td>
                    <td className="px-4 py-3 text-slate-500" dir="rtl">
                      {topic.nameAr || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-slate-500 text-xs font-mono">{topic.slug}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-600">
                      {topic._count?.articles || 0}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setDeleteTarget(topic.id)}
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

      {/* Delete Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Topic</h3>
            <p className="text-sm text-slate-600 mb-6">
              Are you sure you want to delete this topic? Articles tagged with this topic will not be deleted.
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
