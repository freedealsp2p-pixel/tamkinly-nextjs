# Download Architecture Report
**Date:** 2025-07-31

---

## Previous State (Violations)

```
public/downloads/
  └── recovery/          ← MIXED domain (violation)
      ├── REC-01-HALT-Worksheet.pdf
      ├── REC-01-HALT-Worksheet-EN.pdf
      ├── ... (all 22 REC files)
      ├── harassment/    ← empty
      └── pornography/   ← empty
```

All REC files were in a shared `recovery/` directory. No domain separation.

---

## New State (After Separation)

```
public/downloads/
  ├── porn-recovery/     ← Porn Recovery ONLY
  │   ├── REC-01-HALT-Worksheet.pdf
  │   ├── REC-01-HALT-Worksheet-EN.pdf
  │   ├── REC-02-Trigger-Journal.pdf
  │   ├── REC-02-Trigger-Journal-EN.pdf
  │   ├── REC-03-Emergency-Plan.pdf
  │   ├── REC-03-Emergency-Plan-EN.pdf
  │   ├── REC-04-Recovery-Review.pdf
  │   ├── REC-04-Recovery-Review-EN.pdf
  │   ├── REC-05-Pattern-Recognition.pdf
  │   ├── REC-05-Pattern-Recognition-EN.pdf
  │   ├── REC-06-Recovery-Loop-Map.pdf
  │   ├── REC-06-Recovery-Loop-Map-EN.pdf
  │   ├── REC-07-Reframe.pdf
  │   ├── REC-07-Reframe-EN.pdf
  │   ├── REC-08-Stage-Assessment.pdf
  │   ├── REC-08-Stage-Assessment-EN.pdf
  │   ├── REC-09-Relapse-Scenario-Review.pdf
  │   ├── REC-09-Relapse-Scenario-Review-EN.pdf
  │   ├── REC-10-Identity-Cards.pdf
  │   ├── REC-10-Identity-Cards-EN.pdf
  │   ├── REC-11-Future-Self-Letter.pdf
  │   └── REC-11-Future-Self-Letter-EN.pdf
  │
  └── trc/               ← TRC ONLY (empty — planned downloads)
      └── (future: grounding-pocket-card.pdf, a52-breathing-card.pdf, etc.)
```

---

## Rules

1. **All REC-01 through REC-11 files** → `downloads/porn-recovery/` ONLY
2. **Any future TRC downloadable** → `downloads/trc/` ONLY
3. **No file may appear in both directories**
4. **bilingual-files.ts** updated to point to `/downloads/porn-recovery/` instead of `/downloads/recovery/`
5. **Old `recovery/` directory** can be removed after verifying no broken links

---

## Updated Code Paths

### bilingual-files.ts
- **Before:** `/downloads/recovery/REC-01-HALT-Worksheet.pdf`
- **After:** `/downloads/porn-recovery/REC-01-HALT-Worksheet.pdf`

### RecoveryToolkitApps.tsx
- Uses `BilingualDownloadButton` component with `fileKey` parameter
- The `fileKey` maps to paths in `bilingual-files.ts`
- ✅ Already updated via bilingual-files.ts change

### Registry Paths
- `porn-recovery-assets.ts`: `path: 'REC-01-HALT-Worksheet.pdf'` (relative to `/downloads/porn-recovery/`)
- `trc-assets.ts`: `path: 'a52-breathing-card.pdf'` (relative to `/downloads/trc/`)

---

## Cleanup

- Remove empty `public/downloads/recovery/harassment/` directory
- Remove empty `public/downloads/recovery/pornography/` directory
- Remove `public/downloads/recovery/` directory after all REC files moved

