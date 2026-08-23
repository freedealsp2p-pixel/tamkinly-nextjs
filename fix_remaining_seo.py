#!/usr/bin/env python3
"""Fix remaining 4 key layouts: apps, blog, recovery, guides"""
import os

BASE = '/var/www/tamkinly/src/app'

get_locale_import = "import { getLocale } from '@/lib/get-locale';"
seo_pages_import = "import { generatePageMetadataFromConfig } from '@/lib/seo-pages';"

def fix_layout(filepath, page_key):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Check if it uses inline metadata (not imported METADATA)
    has_inline = 'export const metadata: Metadata = {' in content
    
    if not has_inline:
        print(f'  SKIP {os.path.relpath(filepath, "/var/www/tamkinly/src")}: no inline metadata')
        return False
    
    # Check if already has generateMetadata
    if 'generateMetadata' in content:
        print(f'  SKIP {os.path.relpath(filepath, "/var/www/tamkinly/src")}: already has generateMetadata')
        return False
    
    # Find the metadata block and replace it
    lines = content.split('\n')
    new_lines = []
    skip = False
    brace_depth = 0
    
    for i, line in enumerate(lines):
        if 'export const metadata: Metadata = {' in line:
            # Add the dynamic version
            # Add imports if needed
            if 'getLocale' not in content:
                new_lines.append(get_locale_import)
            if 'generatePageMetadataFromConfig' not in content and 'seo-pages' not in content:
                new_lines.append(seo_pages_import)
            new_lines.append('export const dynamic = "force-dynamic";')
            new_lines.append('')
            new_lines.append('export async function generateMetadata() {')
            new_lines.append(f'  const locale = await getLocale();')
            new_lines.append(f'  return generatePageMetadataFromConfig(\'{page_key}\', locale);')
            new_lines.append('}')
            skip = True
            brace_depth = line.count('{') - line.count('}')
            if brace_depth <= 0:
                skip = False
            continue
        
        if skip:
            brace_depth += line.count('{') - line.count('}')
            if brace_depth <= 0:
                skip = False
            continue
        
        new_lines.append(line)
    
    with open(filepath, 'w') as f:
        f.write('\n'.join(new_lines))
    
    print(f'  FIXED {os.path.relpath(filepath, "/var/www/tamkinly/src")}: {page_key}')
    return True

# Fix the 4 key layouts
fixes = [
    (f'{BASE}/apps/layout.tsx', 'apps'),
    (f'{BASE}/blog/layout.tsx', 'blog'),
    (f'{BASE}/recovery/layout.tsx', 'recovery'),
    (f'{BASE}/guides/layout.tsx', 'guides'),
]

for filepath, key in fixes:
    if os.path.exists(filepath):
        fix_layout(filepath, key)
    else:
        print(f'  NOT FOUND: {filepath}')

print('\nDone')
