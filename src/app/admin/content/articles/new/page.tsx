'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  Star,
  ChevronDown,
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

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default function NewArticlePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState('');

  // Form fields
  const [title, setTitle] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [language, setLanguage] = useState('en');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredFilename, setFeaturedFilename] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [accessTier, setAccessTier] = useState('FREE');
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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    loadCategoriesAndTopics();
  }, []);

  async function loadCategoriesAndTopics() {
    try {
      const [catRes, topicRes] = await Promise.all([
        fetch('/api/admin/categories'),
        fetch('/api/admin/topics'),
      ]);
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData.data || []);
      }
      if (topicRes.ok) {
        const topicData = await topicRes.json();
        setTopics(topicData.data || []);
      }
    } catch {
      // Non-critical: categories and topics can be set later
    }
  }

  // Auto-generate slug from English title
  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value));
    }
    // Auto-fill meta title if empty
    if (!metaTitle) {
      setMetaTitle(value);
    }
  }

  function handleSlugChange(value: string) {
    setSlug(value);
    setSlugManuallyEdited(true);
  }

  // Image upload
  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
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

  // Toggle multi-select items
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

  // Save
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
      setError('Slug is required. Please provide an English title to auto-generate it.');
      return;
    }

    setSaving(true);
    try {
      const payload: any = {
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
        imageCaption: imageCaption || undefined,
        readTimeMinutes: readTimeMinutes ? parseInt(readTimeMinutes) : undefined,
      };

      const res = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to create article');
      }

      const data = await res.json();
      const articleId = data.data?.id;

      if (status === 'PUBLISHED') {
        setNotification('Article published successfully!');
        setTimeout(() => router.push('/admin/content/articles'), 1000);
      } else {
        setNotification('Draft saved successfully!');
        if (articleId) {
          setTimeout(() => router.push(`/admin/content/articles/${articleId}`), 1000);
        } else {
          setTimeout(() => router.push('/admin/content/articles'), 1000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save article');
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    'w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3DD4B0]/30 focus:border-[#3DD4B0] bg-white';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1.5';

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/content/articles')}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">New Article</h1>
            <p className="text-slate-500 text-sm mt-0.5">Create a new article for Tamkinly.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
                placeholder="auto-generated-from-title"
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
                  <span className="text-sm text-slate-500 mt-2">
                    Click to upload image
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    PNG, JPG, WebP up to 5MB
                  </span>
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
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Categories & Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Categories */}
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
                      <div className="px-3 py-2 text-sm text-slate-400">
                        No categories available
                      </div>
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
                            <span className="text-slate-400" dir="rtl">
                              {cat.nameAr}
                            </span>
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

            {/* Topics */}
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
                      <div className="px-3 py-2 text-sm text-slate-400">
                        No topics available
                      </div>
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
                            <span className="text-slate-400" dir="rtl">
                              {topic.nameAr}
                            </span>
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

        {/* Access & Featured */}
        <section className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            Access & Visibility
          </h2>
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
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            SEO (Search Engine Optimization)
          </h2>
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
              <p className="text-xs text-slate-400 mt-1">
                {metaTitle.length}/60 characters recommended
              </p>
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
              <p className="text-xs text-slate-400 mt-1">
                {metaDescription.length}/160 characters recommended
              </p>
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
              <p className="text-xs text-slate-400 mt-1">Comma-separated keywords</p>
            </div>
          </div>
        </section>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pb-8">
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
  );
}
