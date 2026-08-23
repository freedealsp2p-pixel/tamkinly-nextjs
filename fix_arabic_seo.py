#!/usr/bin/env python3
"""Fix Arabic SEO: Convert static metadata to generateMetadata across all pages"""
import os, re, glob

BASE = '/var/www/tamkinly/src'

# ======================
# STEP 1: Root Layout
# ======================
path = f'{BASE}/app/layout.tsx'
with open(path, 'r') as f:
    content = f.read()

# The root layout has a huge static metadata block.
# Strategy: Replace the entire static metadata with a generateMetadata function.

# Find the metadata block start and end
meta_start = content.find('export const metadata: Metadata = {')
if meta_start < 0:
    print('ERROR: Could not find metadata block in root layout')
else:
    # Find the matching closing brace
    # Simple brace counting
    depth = 0
    meta_end = meta_start
    started = False
    for i in range(meta_start, len(content)):
        if content[i] == '{':
            depth += 1
            started = True
        elif content[i] == '}':
            depth -= 1
            if started and depth == 0:
                meta_end = i + 1
                break
    
    # Find the end of the statement (including semicolons after the closing brace)
    while meta_end < len(content) and content[meta_end] in ('\n', ' ', '\t'):
        meta_end += 1
    if meta_end < len(content) and content[meta_end] == ';':
        meta_end += 1
    
    print(f'Root layout metadata: chars {meta_start}-{meta_end} ({meta_end - meta_start} chars)')
    
    replacement = '''export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocaleFromCookies();
  const pageMeta = generatePageMetadataFromConfig('home', locale);

  return {
    ...pageMeta,
    metadataBase: new URL(SEO_SITE_CONFIG.url),

    icons: [
      { url: "/favicon.ico?v=12", sizes: "any" },
      { url: "/favicon.png?v=12", sizes: "96x96", type: "image/png" },
      { url: "/favicon-32x32.png?v=12", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=12", sizes: "16x16", type: "image/png" },
      { apple: [{ url: "/apple-touch-icon.png?v=12", sizes: "180x180", type: "image/png" }] },
      { other: [{ rel: "mask-icon", url: "/logo-icon.svg", color: "#0F1C2E" }] },
    ],

    manifest: "/manifest.json",

    applicationName: locale === 'ar' ? SEO_SITE_CONFIG.nameAr : SEO_SITE_CONFIG.name,
    appleWebApp: {
      capable: true,
      title: locale === 'ar' ? SEO_SITE_CONFIG.nameAr : SEO_SITE_CONFIG.name,
      statusBarStyle: "black-translucent",
    },

    formatDetection: { telephone: false, email: true, address: false },

    other: {
      "mobile-web-app-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "theme-color": "#0F1C2E",
      "color-scheme": "light",
      "referrer": "origin-when-cross-origin",
    },

    appLinks: {
      web: { url: SEO_SITE_CONFIG.url, should_fallback: true },
    },
  };
}
'''

    content = content[:meta_start] + replacement + content[meta_end:]
    
    # Also need to keep metadataBase and viewport as static exports if they exist separately
    # Actually, metadataBase should be inside generateMetadata (already added above)
    
    with open(path, 'w') as f:
        f.write(content)
    print('Root layout: Converted to generateMetadata')

# ======================
# STEP 2: Sub-pages
# ======================

# Find all files that import *_METADATA from seo-pages and use static metadata export
get_locale_import = "import { getLocale } from '@/lib/get-locale';\n"

# Pattern: files that have both an import from seo-pages AND a static metadata export

# Map of page keys to find and replace
page_keys = {
    'products': ['PRODUCTS_METADATA'],
    'apps': ['APPS_METADATA'],
    'blog': ['BLOG_METADATA'],
    'quiz': ['QUIZ_METADATA'],
    'about': ['ABOUT_METADATA'],
    'faq': ['FAQ_METADATA'],
    'contact': ['CONTACT_METADATA'],
    'privacy': ['PRIVACY_METADATA'],
    'terms': ['TERMS_METADATA'],
    'refund': ['REFUND_METADATA'],
    'guides': ['GUIDES_METADATA'],
    'methodology': ['METHODOLOGY_METADATA'],
    'cart': ['CART_METADATA'],
    'account': ['ACCOUNT_METADATA'],
    'dashboard': ['DASHBOARD_METADATA'],
    'downloads': ['DOWNLOADS_METADATA'],
    'recovery': ['RECOVERY_METADATA'],
    'search': ['SEARCH_METADATA'],
    'checkout': ['CHECKOUT_METADATA'],
    'resources': ['RESOURCES_METADATA'],
}

fixed_files = []

# Search for layout.tsx files in app directory
for root, dirs, files in os.walk(BASE + '/app'):
    # Skip node_modules and .next
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.next')]
    
    for fname in files:
        if fname not in ('layout.tsx', 'page.tsx'):
            continue
        
        fpath = os.path.join(root, fname)
        try:
            with open(fpath, 'r') as f:
                fcontent = f.read()
        except:
            continue
        
        # Check if file has static metadata from seo-pages
        has_static_meta = bool(re.search(r'export\s+const\s+metadata\s*:\s*Metadata\s*=\s*\w+_METADATA', fcontent))
        if not has_static_meta:
            continue
        
        # Find which page key this is
        matched_key = None
        for key, metas in page_keys.items():
            for meta_name in metas:
                if f'export const metadata: Metadata = {meta_name}' in fcontent:
                    matched_key = key
                    break
                if f'export const metadata = {meta_name}' in fcontent:
                    matched_key = key
                    break
            if matched_key:
                break
        
        if not matched_key:
            # Try to detect from file path
            rel_path = os.path.relpath(fpath, BASE + '/app')
            for key in page_keys:
                if f'/{key}/' in rel_path or rel_path.startswith(f'{key}/'):
                    matched_key = key
                    break
        
        if not matched_key:
            print(f'  SKIP {fpath}: Could not determine page key')
            continue
        
        # Add getLocale import if not present
        if 'getLocale' not in fcontent and '@/lib/get-locale' not in fcontent:
            # Find the last import line and add after it
            import_lines = [(i, l) for i, l in enumerate(fcontent.split('\n')) if l.startswith('import ')]
            if import_lines:
                last_import_idx = import_lines[-1][0]
                flines = fcontent.split('\n')
                flines.insert(last_import_idx + 1, get_locale_import.strip())
                fcontent = '\n'.join(flines)
        
        # Add generatePageMetadataFromConfig import if not present
        if 'generatePageMetadataFromConfig' not in fcontent and 'seo-pages' not in fcontent:
            flines = fcontent.split('\n')
            for i, l in enumerate(flines):
                if l.startswith('import '):
                    flines.insert(i + 1, "import { generatePageMetadataFromConfig } from '@/lib/seo-pages';")
                    break
            fcontent = '\n'.join(flines)
        
        # Replace static metadata with generateMetadata
        # Pattern: export const metadata: Metadata = PAGE_METADATA;
        # Replace with: dynamic + generateMetadata function
        
        for meta_name in page_keys.get(matched_key, []):
            old_pattern = f'export const metadata: Metadata = {meta_name};'
            new_pattern = f'''export const dynamic = "force-dynamic";

export async function generateMetadata() {{
  const locale = await getLocale();
  return generatePageMetadataFromConfig('{matched_key}', locale);
}}'''
            if old_pattern in fcontent:
                fcontent = fcontent.replace(old_pattern, new_pattern)
                fixed_files.append(fpath)
                print(f'  FIXED {os.path.relpath(fpath, BASE)}: {matched_key}')
                break
            
            # Try without type annotation
            old_pattern2 = f'export const metadata = {meta_name};'
            if old_pattern2 in fcontent:
                fcontent = fcontent.replace(old_pattern2, new_pattern)
                fixed_files.append(fpath)
                print(f'  FIXED {os.path.relpath(fpath, BASE)}: {matched_key}')
                break
        
        with open(fpath, 'w') as f:
            f.write(fcontent)

print(f'\nTotal files fixed: {len(fixed_files)}')
