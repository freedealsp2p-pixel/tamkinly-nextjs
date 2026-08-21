# Navigation Architecture Report
**Date:** 2025-07-31

---

## Current State

### Main Navigation (Header.tsx)
- Recovery is **NOT** in the main navigation
- Searchable pages do not include `/recovery`
- Users can only find Recovery via direct URL or footer links

### Recovery Hub (`/recovery`)
- ✅ Already has two cards: TRC and Porn Recovery
- ✅ Uses `recoveryHub` translation keys
- ✅ Has MedicalDisclaimer banner
- ✅ Has breadcrumb navigation

### TRC Hub (`/recovery/trc`)
- ✅ Shows 5 tools: Grounding, A52, Safe Place, Body Scan, Article
- ✅ Uses `RecoveryCard` component
- ✅ Has breadcrumb back to Recovery Hub

### Porn Recovery Page (`/recovery/porn-recovery`)
- ✅ Single-page experience with 11 sections
- ✅ Has MedicalDisclaimer
- ✅ Uses `RecoveryPage` component

---

## Required Changes

### 1. Add Recovery to Main Navigation
**File:** `src/components/layout/Header.tsx`

Add to navigation links:
```typescript
{ titleKey: "navigation.recovery", path: "/recovery", keywords: ["recovery", "healing", "trauma", "تعافي", "صدمة"] }
```

### 2. Add Recovery to Searchable Pages
**File:** `src/components/layout/Header.tsx`

Add to `searchablePages` array:
```typescript
{ titleKey: "search.recovery", path: "/recovery", keywords: ["recovery", "healing", "trauma", "porn", "تعافي", "صدمة"] }
```

### 3. Public Discovery Architecture

```
Main Navigation
  → Recovery (Hub)
      → Porn Recovery (full page with 11 sections)
      → Trauma Recovery Center (Hub)
          → Grounding
          → A52 Breathing
          → Safe Place
          → Body Scan
          → What Trauma Does To The Body (article)
```

- TRC tools and Porn Recovery tools are NOT shown on the homepage
- Entry is only through the Recovery Hub or via assessment recommendations
- No cross-domain links between the two programs

---

## Translation Keys Needed

### Arabic (ar.json)
```json
{
  "navigation": {
    "recovery": "التعافي"
  },
  "search": {
    "recovery": "مركز التعافي"
  }
}
```

### English (en.json)
```json
{
  "navigation": {
    "recovery": "Recovery"
  },
  "search": {
    "recovery": "Recovery Center"
  }
}
```

