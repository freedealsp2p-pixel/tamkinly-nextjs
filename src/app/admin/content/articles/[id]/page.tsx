'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Upload,
  X,
  Loader2,
  Star,
  ChevronDown,
  Trash2,
  Link2,
  Unlink,
  AlertCircle,
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
}

interface Topic {
  id: string;
  name: string;
  nameAr?: string;
  slug: string;
}

interface Article {
  id: string;
  title: string;
  titleAr?: string;
  slug: string;
  language: string;
  status: string;
  excerpt: string;
  body: string;
  featuredImage: string;
  isFeatured: boolean;
  accessTier: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  categoryIds?: string[];
  topicIds?: string[];
  imageCaption?: string;
  readTimeMinutes?: number;
  linkedArticleId?: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Relationship {
  id: string;
  articleId: string;
  linkedArticleId: string;
  type: string;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function EditArticlePage() {
  const params = useParams();
  const router = useRouter();
  const articleId = params.id as string;

  const [initialLoading, setInitialLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Form fields
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(true);
  const [language, setLanguage] = useState('en');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredFilename, setFeaturedFilename] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [accessTier, setAccessTier] = useState('FREE');
  const [currentStatus, setCurrentStatus] = useState('DRAFT');
  const [imageCaption, setImageCaption] = useState('');
  const [readTimeMinutes, setReadTimeMinutes] = useState('');

  // SEO
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  // Multi-select
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);

  // Language version linking
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [linkedArticleId, setLinkedArticleId] = useState<string | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linking, setLinking] = useState(false);


  // Related content
  const [relationships, setRelationships] = useState<any[]>([]);
  const [showRelModal, setShowRelModal] = useState(false);
  const [relForm, setRelForm] = useState({ targetType: 'THERAPEUTIC_PROTOCOL', targetSlug: '', label: '' });

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const loadArticle = useCallback(async () => {
    setInitialLoading(true);
    setLoadError('');
    try {
      const res = await fetch('/api/admin/articles');
      if (!res.ok) throw new Error('Failed to fetch articles');
      const json = await res.json();
      const articles: Article[] = Array.isArray(json) ? json : (json.data || []);
      setAllArticles(articles);

      const article = articles.find((a) => a.id === articleId);
      if (!article) {
        setLoadError('Article not found');
        return;
      }

      // Populate form
      setTitle(article.title || '');
      setTitleAr(article.titleAr || '');
      setSlug(article.slug || '');
      setLanguage(article.language || 'en');
      setExcerpt(article.excerpt || '');
      setBody(article.body || '');
      setFeaturedImage(article.featuredImage || '');
      setIsFeatured(article.isFeatured || false);
      setAccessTier(article.accessTier || 'FREE');
      setCurrentStatus(article.status || 'DRAFT');
      setMetaTitle(article.metaTitle || '');
      setMetaDescription(article.metaDescription || '');
      setMetaKeywords(article.metaKeywords || '');
      setSelectedCategoryIds(article.categoryIds || []);
      setSelectedTopicIds(article.topicIds || []);
      setImageCaption(article.imageCaption || '');
      setReadTimeMinutes(article.readTimeMinutes?.toString() || '');
      // Fetch content relationships
      try {
        const relRes = await fetch(`/api/admin/content-relationships?sourceType=ARTICLE&sourceId=${article.id}`);
        if (relRes.ok) {
          const relData = await relRes.json();
          setRelationships(relData);
        }
      } catch (e) { console.error('Failed to load relationships'); }
    } catch (err: any) {
      setLoadError(err.message || 'Failed to load article');
    } finally {
      setInitialLoading(false);
    }


  }, [articleId]);

  useEffect(() => {
    loadArticle();
    loadCategoriesAndTopics();
    loadTranslationLink();
  }, [loadArticle]);

  async function loadCategoriesAndTopics() {
    try {
      const [catRes, topicRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/topics'),
      ]);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(Array.isArray(catData) ? catData : (catData.data || []));
      }
      if (topicRes.ok) {
        const topicData = await topicRes.json();
        setTopics(Array.isArray(topicData) ? topicData : (topicData.data || []));
      }
    } catch {
      // Non-critical
    }
  }

  async function loadTranslationLink() {
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const json = await res.json();
        const all: Article[] = Array.isArray(json) ? json : (json.data || []);
        // Find if any article links back to this one
        const linked = all.find(a => a.linkedArticleId === articleId);
        if (linked) {
          setLinkedArticleId(linked.id);
        }
      }
    } catch {
      // Non-critical
    }
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugManuallyEdited(true);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setFeaturedImage(data.url);
      setFeaturedFilename(data.filename || file.name);
      if (!imageCaption && data.filename) {
        setImageCaption(data.filename);
      }
    } catch (err: any) {
      setError('Failed to upload image: ' + (err.message || 'Unknown error'));
    } finally {
      setUploading(false);
    }
    e.target.value = '';
  }

  function removeImage() {
    setFeaturedImage('');
    setFeaturedFilename('');
  }

  function toggleCategory(id: string) {
    setSelectedCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  function toggleTopic(id: string) {
    setSelectedTopicIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  async function handleSave(status: 'DRAFT' | 'PUBLISHED') {
    setError('');

    if (!title.trim() && !titleAr.trim()) {
      setError('At least one title field (English or Arabic) is required.');
      return;
    }

    if (language === 'en' && !title.trim()) {
      setError('English title is required for English articles.');
      return;
    }

    if (!slug.trim()) {
      setError('Slug is required.');
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
        id: articleId,
        title: title.trim(),
        titleAr: titleAr.trim(),
        slug: slug.trim(),
        language,
        status,
        excerpt: excerpt.trim(),
        body: body.trim(),
        featuredImage,
        isFeatured,
        accessTier,
        metaTitle: metaTitle.trim(),
        metaDescription: metaDescription.trim(),
        metaKeywords: metaKeywords.trim(),
        categoryIds: selectedCategoryIds,
        topicIds: selectedTopicIds,
        imageCaption: imageCaption || null,
        readTimeMinutes: readTimeMinutes ? parseInt(readTimeMinutes) : null,
      };

      const res = await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to update article');
      }

      setCurrentStatus(status);
      setNotification(
        status === 'PUBLISHED' ? 'Article published!' : 'Draft saved!'
      );
    } catch (err: any) {
      setError(err.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/articles?id=${articleId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      router.push('/admin/content/articles');
    } catch (err: any) {
      setError('Failed to delete: ' + (err.message || 'Unknown error'));
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  }

  // Language version linking
  const otherLanguage = language === 'en' ? 'ar' : 'en';
  const candidateArticles = allArticles.filter(
    (a) => a.language === otherLanguage && a.id !== articleId
  );
  const linkedArticle = allArticles.find((a) => a.id === linkedArticleId);

  async function handleLinkVersion(targetArticleId: string) {
    setLinking(true);
    try {
      await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: articleId, linkedArticleId: targetArticleId }),
      });
      await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: targetArticleId, linkedArticleId: articleId }),
      });
      setLinkedArticleId(targetArticleId);
      setShowLinkModal(false);
      setNotification('Language version linked!');
    } catch {
      setError('Failed to link version');
    } finally {
      setLinking(false);
    }
  }

  async function handleUnlinkVersion() {
    if (!linkedArticleId) return;
    try {
      // Unlink the other article too
      await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: linkedArticleId, linkedArticleId: null }),
      });
      await fetch('/api/admin/articles', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: articleId, linkedArticleId: null }),
      });
      setLinkedArticleId(null);
      setNotification('Language version unlinked.');
    } catch {
      setError('Failed to unlink version');
    }
  }



  // Related content handlers
  const handleAddRelation = async () => {
    if (!relForm.targetSlug || !articleId) return;
    try {
      const res = await fetch('/api/admin/content-relationships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceType: 'ARTICLE',
          sourceId: articleId,
          targetType: relForm.targetType,
          targetSlug: relForm.targetSlug,
          label: relForm.label || relForm.targetSlug,
          sortOrder: relationships.length,
        }),
      });
      if (res.ok) {
        const newRel = await res.json();
        setRelationships(prev => [...prev, newRel]);
        setRelForm({ targetType: 'THERAPEUTIC_PROTOCOL', targetSlug: '', label: '' });
        setShowRelModal(false);
      }
    } catch (e) { console.error('Failed to add relationship'); }
  };

  const handleDeleteRelation = async (relId: string) => {
    try {
      const res = await fetch(`/api/admin/content-relationships?id=${relId}`, { method: 'DELETE' });
      if (res.ok) {
        setRelationships(prev => prev.filter(r => r.id !== relId));
      }
    } catch (e) { console.error('Failed to delete relationship'); }
  };
  const inputClass =
    'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0] bg-white';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

  // Initial loading state
  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-[#3DD4B0]" />
        <span className="ml-2 text-slate-500">Loading article...</span>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="text-center py-20">
        <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
        <h3 className="text-lg font-medium text-slate-700">Error</h3>
        <p className="text-sm text-slate-500 mt-1">{loadError}</p>
        <button
          onClick={() => router.push('/admin/content/articles')}
          className="mt-4 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
        >
          Back to Articles
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      {/* Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
          {notification}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/content/articles')}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Edit Article</h1>
            <p className="text-slate-500 text-sm mt-0.5">
              Status:{' '}
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
                  currentStatus === 'PUBLISHED'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {currentStatus}
              </span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-1.5"
          >
            <Trash2 size={14} />
            Delete
          </button>
          <button
            onClick={() => handleSave('DRAFT')}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Save Draft
          </button>
          <button
            onClick={() => handleSave('PUBLISHED')}
            disabled={saving}
            className="px-4 py-2 text-sm font-medium text-white bg-[#3DD4B0] rounded-lg hover:bg-[#35bfa0] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {saving && <Loader2 size={14} className="animate-spin" />}
            Publish
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Language Version Linking */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-3 flex items-center gap-2">
            <Link2 size={16} />
            Language Version
          </h2>
          {linkedArticle ? (
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Linked to:{' '}
                  <button
                    onClick={() => router.push(`/admin/content/articles/${linkedArticle.id}`)}
                    className="text-[#3DD4B0] hover:underline"
                  >
                    {linkedArticle.title || linkedArticle.titleAr || 'Untitled'}
                  </button>
                </p>
                <p className="text-xs text-slate-400">
                  {linkedArticle.language === 'ar' ? 'Arabic' : 'English'} version
                </p>
              </div>
              <button
                onClick={handleUnlinkVersion}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Unlink version"
              >
                <Unlink size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <p className="text-sm text-slate-500">
                No {otherLanguage === 'ar' ? 'Arabic' : 'English'} version linked.
              </p>
              <button
                onClick={() => setShowLinkModal(true)}
                className="px-3 py-1.5 text-sm font-medium text-[#3DD4B0] bg-[#3DD4B0]/10 rounded-lg hover:bg-[#3DD4B0]/20 transition-colors flex items-center gap-1.5"
              >
                <Link2 size={14} />
                Link Version
              </button>
            </div>
          )}
        </section>

        {/* Basic Info */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>
                Title (English) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter English title"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Title (Arabic)</label>
              <input
                type="text"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                placeholder="أدخل العنوان بالعربية"
                dir="rtl"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className={labelClass}>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => handleSlugChange(e.target.value)}
                className={inputClass + ' font-mono text-xs'}
              />
            </div>
            <div>
              <label className={labelClass}>Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={inputClass}
              >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief description of the article..."
              rows={3}
              className={inputClass + ' resize-none'}
            />
          </div>
        </section>

        {/* Body (Markdown) */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Body Content (Markdown)
          </h2>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your article content in Markdown..."
            className="font-mono text-sm min-h-[400px] w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0] resize-y bg-slate-50"
          />
        </section>

        {/* Featured Image */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Featured Image</h2>
          {featuredImage ? (
            <div className="relative inline-block">
              <img
                src={featuredImage}
                alt="Featured preview"
                className="max-h-48 rounded-lg border border-slate-200 object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-white border border-slate-200 rounded-full shadow-sm hover:bg-red-50 hover:border-red-200 text-slate-500 hover:text-red-600 transition-colors"
              >
                <X size={14} />
              </button>
              {featuredFilename && (
                <p className="text-xs text-slate-400 mt-2">{featuredFilename}</p>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#3DD4B0] hover:bg-[#3DD4B0]/5 transition-colors">
              {uploading ? (
                <>
                  <Loader2 size={24} className="animate-spin text-[#3DD4B0]" />
                  <span className="text-sm text-slate-500 mt-2">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload size={24} className="text-slate-400" />
                  <span className="text-sm text-slate-500 mt-2">Click to upload image</span>
                  <span className="text-xs text-slate-400 mt-1">PNG, JPG, WebP up to 5MB</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          )}
        </section>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image Caption (filename shown under image)</label>
            <input
              type="text"
              value={imageCaption}
              onChange={(e) => setImageCaption(e.target.value)}
              placeholder="Auto-filled from filename if empty"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Read Time (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={readTimeMinutes}
              onChange={(e) => setReadTimeMinutes(e.target.value)}
              placeholder="e.g. 5"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Categories & Topics */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Categories & Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Categories</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-left flex items-center justify-between hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0]"
                >
                  <span className={selectedCategoryIds.length ? 'text-slate-900' : 'text-slate-400'}>
                    {selectedCategoryIds.length
                      ? `${selectedCategoryIds.length} selected`
                      : 'Select categories'}
                  </span>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {categories.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-slate-400">No categories</div>
                    ) : (
                      categories.map((cat) => (
                        <label
                          key={cat.id}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCategoryIds.includes(cat.id)}
                            onChange={() => toggleCategory(cat.id)}
                            className="rounded border-slate-300 text-[#3DD4B0] focus:ring-[#3DD4B0]"
                          />
                          <span className="text-slate-700">{cat.name}</span>
                          {cat.nameAr && (
                            <span className="text-slate-400" dir="rtl">{cat.nameAr}</span>
                          )}
                        </label>
                      ))
                    )}
                  </div>
                )}
              </div>
              {selectedCategoryIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedCategoryIds.map((id) => {
                    const cat = categories.find((c) => c.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs"
                      >
                        {cat?.name || id}
                        <button
                          type="button"
                          onClick={() => toggleCategory(id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
            <div>
              <label className={labelClass}>Topics</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowTopicDropdown(!showTopicDropdown)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white text-left flex items-center justify-between hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0]"
                >
                  <span className={selectedTopicIds.length ? 'text-slate-900' : 'text-slate-400'}>
                    {selectedTopicIds.length
                      ? `${selectedTopicIds.length} selected`
                      : 'Select topics'}
                  </span>
                  <ChevronDown size={16} className="text-slate-400" />
                </button>
                {showTopicDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {topics.length === 0 ? (
                      <div className="px-3 py-2 text-sm text-slate-400">No topics</div>
                    ) : (
                      topics.map((topic) => (
                        <label
                          key={topic.id}
                          className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 cursor-pointer text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTopicIds.includes(topic.id)}
                            onChange={() => toggleTopic(topic.id)}
                            className="rounded border-slate-300 text-[#3DD4B0] focus:ring-[#3DD4B0]"
                          />
                          <span className="text-slate-700">{topic.name}</span>
                          {topic.nameAr && (
                            <span className="text-slate-400" dir="rtl">{topic.nameAr}</span>
                          )}
                        </label>
                      ))
                    )}
                  </div>
                )}
              </div>
              {selectedTopicIds.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedTopicIds.map((id) => {
                    const topic = topics.find((t) => t.id === id);
                    return (
                      <span
                        key={id}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs"
                      >
                        {topic?.name || id}
                        <button
                          type="button"
                          onClick={() => toggleTopic(id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
        {/* Related Content */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Related Content</h3>
            <button
              type="button"
              onClick={() => setShowRelModal(true)}
              className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-700"
            >
              + Add Link
            </button>
          </div>

          {relationships.length === 0 ? (
            <p className="text-sm text-gray-500">No related content linked yet.</p>
          ) : (
            <div className="space-y-2 mt-4">
              {relationships.map((rel) => (
                <div key={rel.id} className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
                  <div>
                    <span className="inline-block rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-700">{rel.targetType}</span>
                    <span className="ml-2 text-sm text-gray-900">{rel.label || rel.targetSlug}</span>
                    <span className="ml-2 text-xs text-gray-500">→ {rel.targetSlug}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDeleteRelation(rel.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Access & Featured */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">Access & Visibility</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Access Tier</label>
              <select
                value={accessTier}
                onChange={(e) => setAccessTier(e.target.value)}
                className={inputClass}
              >
                <option value="FREE">FREE</option>
                <option value="BASIC">BASIC</option>
                <option value="PREMIUM">PREMIUM</option>
                <option value="MASTERY">MASTERY</option>
                <option value="NONE">None</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-3 cursor-pointer py-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={isFeatured}
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isFeatured ? 'bg-[#3DD4B0]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isFeatured ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <div>
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                    <Star size={14} className={isFeatured ? 'text-amber-400 fill-amber-400' : 'text-slate-400'} />
                    Featured Article
                  </span>
                  <p className="text-xs text-slate-400">Highlighted on the homepage</p>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">SEO</h2>
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Override page title for search engines"
                className={inputClass}
              />
              <p className="text-xs text-slate-400 mt-1">{metaTitle.length}/60 characters</p>
            </div>
            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Brief description for search engine results"
                rows={3}
                className={inputClass + ' resize-none'}
              />
              <p className="text-xs text-slate-400 mt-1">{metaDescription.length}/160 characters</p>
            </div>
            <div>
              <label className={labelClass}>Meta Keywords</label>
              <input
                type="text"
                value={metaKeywords}
                onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pb-8">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center gap-2"
          >
            <Trash2 size={14} />
            Delete Article
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/admin/content/articles')}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave('DRAFT')}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Save Draft
            </button>
            <button
              onClick={() => handleSave('PUBLISHED')}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#3DD4B0] rounded-lg hover:bg-[#35bfa0] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {saving && <Loader2 size={14} className="animate-spin" />}
              Publish
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Article</h3>
            <p className="text-sm text-slate-600 mb-1">
              Are you sure you want to delete this article?
            </p>
            <p className="text-sm text-red-600 font-medium mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

      {/* Link Version Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Link {otherLanguage === 'ar' ? 'Arabic' : 'English'} Version
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Select the {otherLanguage === 'ar' ? 'Arabic' : 'English'} article to link as a translation.
            </p>
            {candidateArticles.length === 0 ? (
              <p className="text-sm text-slate-400 py-4 text-center">
                No {otherLanguage === 'ar' ? 'Arabic' : 'English'} articles available to link.
              </p>
            ) : (
              <div className="max-h-60 overflow-y-auto space-y-1 mb-4">
                {candidateArticles.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => handleLinkVersion(article.id)}
                    disabled={linking}
                    className="w-full text-left p-3 rounded-lg hover:bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors disabled:opacity-50"
                  >
                    <p className="text-sm font-medium text-slate-700">
                      {article.title || article.titleAr || 'Untitled'}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {article.slug} · {article.status}
                    </p>
                  </button>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Add Relationship Modal */}
      {showRelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Related Content</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Type</label>
                <select
                  value={relForm.targetType}
                  onChange={(e) => setRelForm(prev => ({ ...prev, targetType: e.target.value, targetSlug: '', label: '' }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="THERAPEUTIC_PROTOCOL">Therapeutic Protocol</option>
                  <option value="TOOL">Tool / App</option>
                  <option value="ARTICLE">Related Article</option>
                  <option value="RECOVERY_SECTION">Recovery Section</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Slug</label>
                <input
                  type="text"
                  value={relForm.targetSlug}
                  onChange={(e) => setRelForm(prev => ({ ...prev, targetSlug: e.target.value }))}
                  placeholder={relForm.targetType === 'THERAPEUTIC_PROTOCOL' ? 'temporal-decoupling' : relForm.targetType === 'TOOL' ? 'identity-gap-quiz' : 'article-slug'}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  {relForm.targetType === 'THERAPEUTIC_PROTOCOL' && 'Options: temporal-decoupling, alternative-code, white-mirror'}
                  {relForm.targetType === 'TOOL' && 'App slug from /apps/ URL (e.g. identity-gap-quiz)'}
                  {relForm.targetType === 'ARTICLE' && 'Article slug from /blog/ URL'}
                  {relForm.targetType === 'RECOVERY_SECTION' && 'Recovery section slug'}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Label</label>
                <input
                  type="text"
                  value={relForm.label}
                  onChange={(e) => setRelForm(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Auto-filled from slug if empty"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRelModal(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddRelation}
                disabled={!relForm.targetSlug}
                className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:opacity-50"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
