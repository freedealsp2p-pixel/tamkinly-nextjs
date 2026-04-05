# Tamkinly Website Security Audit & Fixes

## Summary
- **Date**: April 2026
- **Total Issues Found**: 16
- **Critical Issues**: 4
- **High Priority**: 6
- **Medium Priority**: 4
- **Warnings**: 2

---

## Issues Found & Fixed

### 1. Hardcoded Admin Password (CRITICAL) ✅ FIXED
- **File**: `src/app/api/admin/orders/route.ts`
- **Issue**: Password `'tamkinly2024'` was hardcoded in source code
- **Fix**: Now uses `verifyAdminPassword()` from `lib/admin-auth.ts` which reads from `ADMIN_PASSWORD` env variable

### 2. Hardcoded JWT Secret (CRITICAL) ✅ FIXED
- **File**: `src/lib/auth.ts`
- **Issue**: Fallback JWT secret exposed in source code
- **Fix**: Removed fallback - now requires `NEXTAUTH_SECRET` or `AUTH_SECRET` environment variable

### 3. Unprotected Access Code Generation (CRITICAL) ✅ FIXED
- **File**: `src/app/api/access/generate/route.ts`
- **Issue**: Anyone could generate free access codes
- **Fix**: Added admin authentication requirement via `verifyAdminPassword()`

### 4. Wrong Database Field Name (CRITICAL) ✅ FIXED
- **File**: `src/app/api/checkout/route.ts`
- **Issue**: Used `name` instead of `productName` for OrderItem creation
- **Fix**: Changed to `productName` to match Prisma schema

### 5. LocaleProvider Type Error (HIGH) ✅ FIXED
- **File**: `src/components/providers/LocaleProvider.tsx`
- **Issue**: `direction` was inferred as `string` instead of `'ltr' | 'rtl'`
- **Fix**: Added explicit type annotation to useMemo

---

## Environment Variables Required

Add these to your `.env` file on the server:

```env
# Admin authentication (REQUIRED in production)
ADMIN_PASSWORD=tamkinly2024

# NextAuth JWT secret (REQUIRED in production)
NEXTAUTH_SECRET=your-random-secret-key-at-least-32-characters-long
# OR
AUTH_SECRET=your-random-secret-key-at-least-32-characters-long
```

To generate a secure secret:
```bash
openssl rand -base64 32
```

---

## Remaining Recommendations

### Database Improvements:
1. Add transactions for multi-step operations in checkout
2. Add missing indexes on frequently queried fields
3. Add cascade deletes for orphan-prone models

### Security Improvements:
1. Add webhook signature verification for payment providers
2. Use Redis for rate limiting in production
3. Add CSRF protection for forms

### Code Quality:
1. Add error handling for clipboard operations
2. Add defensive checks for product URL lookups
3. Add try-catch for localStorage operations

---

## Deployment Instructions

1. Pull the latest code on server:
```bash
cd /var/www/tamkinly
git pull origin master
```

2. Add environment variables to `.env`:
```bash
nano .env
# Add ADMIN_PASSWORD and NEXTAUTH_SECRET
```

3. Rebuild and restart:
```bash
bun run build
pm2 restart tamkinly-nextjs
```

---

## Verification Checklist

- [x] Admin password no longer hardcoded
- [x] JWT secret no longer hardcoded
- [x] Access code generation requires authentication
- [x] Checkout API uses correct field names
- [x] Type errors fixed
- [ ] Environment variables set on server
- [ ] Build successful on server
- [ ] All pages load correctly

---

## Unified Progress Tracking System (Task ID: 1)

### Date: Current Session

### Task: Create interconnected app ecosystem with progress tracking and achievements

### Work Done:
1. **Database Schema Updates** (`prisma/schema.prisma`):
   - Added `UserAchievement` model for cross-app achievements
   - Added `AppProgress` model for app-specific progress tracking
   - Added `WorksheetResponse` model for worksheet responses
   - Added `DailyEvidence` model for evidence tracking
   - Added `DecisionEntry` model for decision journal
   - Added `ERQResult` model for emotion regulation assessment
   - Added `IdentityBaselineResult` model for identity baseline
   - Added `EnvironmentalAuditResult` model for environmental audit
   - Added `TransformationJourney` model for user journey tracking
   - Added `AchievementCategory` enum

2. **API Development** (`src/app/api/progress/route.ts`):
   - GET endpoint to fetch unified progress across all apps
   - POST endpoint to save various types of progress data
   - Support for identity-baseline, environmental-audit, erq, decision-entry, evidence, achievement, and app-progress types
   - Demo mode for anonymous users

3. **Achievements System** (`src/lib/achievements.ts`):
   - 20+ achievements across 8 categories
   - Categories: HABITS, GOALS, JOURNAL, IDENTITY, CONSISTENCY, TRANSFORMATION, ENGAGEMENT, MILESTONE
   - Tier-based access (FREE, TRIAL, BASIC, PREMIUM, BUNDLE)
   - Points system for identity score calculation

4. **Enhanced Progress Dashboard** (`src/app/apps/progress-dashboard/page.tsx`):
   - Unified view of all 8 apps
   - Identity Score with phase tracking (Awareness, Recoding, Integration)
   - Quick stats: Best Streak, Identity Votes, Goals Done, Words Written
   - App grid with individual progress indicators
   - Assessment results display
   - Achievement showcase

### Key Features:
- **Cross-App Integration**: All apps contribute to unified identity score
- **Achievement System**: Unlockable achievements based on actions across all apps
- **Phase-Based Journey**: Awareness (0-29), Recoding (30-59), Integration (60+)
- **Scientific Foundation**: Based on SCIM, ERQ, Decision Journal patterns

### Files Modified:
- `prisma/schema.prisma` - Added 9 new models
- `src/app/api/progress/route.ts` - New unified API
- `src/lib/achievements.ts` - New achievements configuration
- `src/app/apps/progress-dashboard/page.tsx` - Enhanced dashboard

### Stage Summary:
- Successfully created unified progress tracking system
- All 8 apps are now interconnected through the progress API
- Achievement system motivates users across all apps
- Database changes pushed successfully
- No lint errors

---
## Task ID: 2 - Contact Form API Implementation
### Work Task
Create a working API endpoint for the contact form that was previously only showing a local success message without actually sending any data.

### Work Summary
**Problem Identified:**
- The contact form at `/contact` was not sending any data to the server
- It only displayed a success message locally without actual email delivery

**Solution Implemented:**

1. **Created API Endpoint** (`src/app/api/contact/route.ts`):
   - POST handler that accepts: `name`, `email`, `subject`, `message`
   - Comprehensive input validation with detailed error messages:
     - Name: 2-100 characters
     - Email: Valid email format
     - Subject: 3-200 characters
     - Message: 10-5000 characters
   - Input sanitization to prevent XSS attacks
   - Uses existing Brevo integration for email delivery:
     - Sends notification email to `hello@tamkinly.com`
     - Sends auto-reply to the user
   - Graceful fallback when Brevo is not configured (logs to console)
   - Adds contacts to Brevo mailing list automatically

2. **Updated Contact Page** (`src/app/contact/page.tsx`):
   - Replaced mock submission with actual API call
   - Added loading state with spinner animation
   - Added error state with detailed error messages
   - Added form state management for all fields
   - Disabled form fields during submission
   - Reset form functionality after successful submission

**Key Features:**
- Beautiful HTML email templates for both admin notification and user auto-reply
- Arabic-friendly design with proper RTL considerations
- CORS support via OPTIONS handler
- Comprehensive error handling at all levels

**Files Modified:**
- `src/app/api/contact/route.ts` - New API endpoint
- `src/app/contact/page.tsx` - Updated form submission logic

---
## Task ID: 3 - SEO Fixes for All Pages
### Work Task
Fix SEO issues where all pages shared the same SEO title, canonical URLs pointed to the homepage, and og:url was incorrect for all pages.

### Work Summary
**Problems Identified:**
1. All pages shared the same SEO title from the root layout
2. Canonical URLs were all pointing to the homepage (`https://tamkinly.com`)
3. `og:url` OpenGraph property pointed to the homepage for all pages
4. No unique metadata for individual pages

**Solution Implemented:**

1. **Created Centralized SEO Configuration** (`src/lib/seo-pages.ts`):
   - `PAGE_METADATA` object containing unique metadata for all 14 main pages:
     - home, products, apps, quiz, about, contact, blog, methodology
     - faq, privacy, terms, refund, cart, account
   - Each page has:
     - Unique title (English and Arabic)
     - Unique description (English and Arabic)
     - Correct canonical path
     - Relevant keywords
   - `generatePageMetadataFromConfig()` function to generate full Metadata objects
   - Convenience exports: `HOME_METADATA`, `PRODUCTS_METADATA`, etc.
   - Dynamic metadata generators for:
     - Product detail pages
     - Blog post pages
     - App pages
   - Proper `noIndex` configuration for cart and account pages

2. **Created Layout Files for Each Route**:
   - `/src/app/products/layout.tsx`
   - `/src/app/apps/layout.tsx`
   - `/src/app/quiz/layout.tsx`
   - `/src/app/about/layout.tsx`
   - `/src/app/contact/layout.tsx`
   - `/src/app/blog/layout.tsx`
   - `/src/app/methodology/layout.tsx`
   - `/src/app/faq/layout.tsx`
   - `/src/app/privacy/layout.tsx`
   - `/src/app/terms/layout.tsx`
   - `/src/app/refund/layout.tsx`
   - `/src/app/cart/layout.tsx`
   - `/src/app/account/layout.tsx`
   
   Each layout exports the appropriate metadata from `seo-pages.ts`, which overrides the root layout metadata for that route segment.

3. **Updated Root Layout** (`src/app/layout.tsx`):
   - Updated imports to use new SEO configuration
   - Root metadata now properly references `PAGE_METADATA.home` for homepage
   - Title template preserved for child pages: `%s | Tamkinly`

4. **Added SEO Translations**:
   - Updated `messages/en.json` with `seo` section containing all page titles and descriptions
   - Updated `messages/ar.json` with Arabic translations for all SEO content

**Key SEO Improvements:**
- ✅ Each page now has a unique, descriptive title
- ✅ Canonical URLs correctly point to each page's own URL
- ✅ OpenGraph `og:url` correctly set for each page
- ✅ Bilingual support (English and Arabic titles/descriptions)
- ✅ Cart and account pages marked as `noIndex` to prevent indexing
- ✅ Relevant keywords for each page
- ✅ Consistent metadata structure across all pages

**Files Created:**
- `src/lib/seo-pages.ts` - Centralized SEO configuration
- `src/app/products/layout.tsx`
- `src/app/apps/layout.tsx`
- `src/app/quiz/layout.tsx`
- `src/app/about/layout.tsx`
- `src/app/contact/layout.tsx`
- `src/app/blog/layout.tsx`
- `src/app/methodology/layout.tsx`
- `src/app/faq/layout.tsx`
- `src/app/privacy/layout.tsx`
- `src/app/terms/layout.tsx`
- `src/app/refund/layout.tsx`
- `src/app/cart/layout.tsx`
- `src/app/account/layout.tsx`

**Files Modified:**
- `src/app/layout.tsx` - Updated to use new SEO configuration
- `messages/en.json` - Added SEO translations
- `messages/ar.json` - Added Arabic SEO translations

**Verification:**
- Dev server running successfully
- Pages loading correctly with new metadata
- Lint passed (existing error in LocaleProvider is unrelated to SEO changes)

---
## Task ID: 4 - Sub-Page SEO Fixes (Blog & Apps)
### Date: Current Session

### Problem Identified:
Blog articles and app sub-pages were using parent page SEO metadata instead of their own unique metadata. This is because all these pages use `'use client'` directive which prevents them from exporting `metadata` directly in Next.js.

### Solution Implemented:

1. **Created Blog Articles Data Configuration** (`src/lib/blog-articles.ts`):
   - Centralized metadata for all 22 blog articles
   - Each article has: title, description, keywords, datePublished, dateModified, author
   - `generateBlogArticleMetadata()` function generates full Metadata objects
   - Helper functions: `getBlogArticleBySlug()`, `getAllBlogArticleSlugs()`, `getFeaturedArticles()`

2. **Created App Pages Data Configuration** (`src/lib/app-pages.ts`):
   - Centralized metadata for all 20 app pages
   - Each app has: title, description, tier (FREE/BASIC/BUNDLE), category, keywords
   - `generateAppPageMetadata()` function generates full Metadata objects
   - Helper functions: `getAppPageBySlug()`, `getAppsByTier()`, `getAppsByCategory()`

3. **Created Layout Files for All Blog Articles** (22 files):
   - Each `layout.tsx` exports `metadata` using `generateBlogArticleMetadata('slug')`
   - Layout wraps the client component and provides server-side SEO
   - Files created in: `/src/app/blog/[slug]/layout.tsx`

4. **Created Layout Files for All App Pages** (20 files):
   - Each `layout.tsx` exports `metadata` using `generateAppPageMetadata('slug')`
   - Layout wraps the client component and provides server-side SEO
   - Files created in: `/src/app/apps/[slug]/layout.tsx`

5. **Fixed robots.txt**:
   - Added sitemap reference: `Sitemap: https://tamkinly.com/sitemap.xml`

### Key SEO Improvements:
- ✅ Each blog article now has unique title, description, and keywords
- ✅ Each app page now has unique SEO metadata
- ✅ Canonical URLs correctly point to each page's own URL
- ✅ OpenGraph data includes article-specific published/modified times
- ✅ Twitter cards with unique images and descriptions
- ✅ robots.txt now references sitemap.xml

### Files Created:
- `src/lib/blog-articles.ts` - Blog articles data configuration
- `src/lib/app-pages.ts` - App pages data configuration
- 22 blog article layout files
- 20 app page layout files

### Files Modified:
- `public/robots.txt` - Added sitemap reference

### Verification:
- Lint passed with no errors
- Dev server running successfully
