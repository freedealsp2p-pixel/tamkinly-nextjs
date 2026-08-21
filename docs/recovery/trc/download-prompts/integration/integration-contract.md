# Integration Contract: TRC Download-Prompt Re-Integration

> **Purpose** — Canonical 18-step process for re-integrating a validated TRC download-prompt
> asset into the production Tamkinly application. Every step must complete successfully before
> proceeding to the next. A failure at any step halts the process and requires manual remediation.

---

## Type Mapping

| Spec Type          | Registry Value |
|--------------------|-----------------|
| `PRINTABLE_CARD`   | `card`          |
| `WORKSHEET`        | `worksheet`     |
| `GUIDE`            | `pdf`           |
| `PLAN`             | `card`          |
| `JOURNAL`          | `worksheet`     |
| `REFERENCE`        | `pdf`           |
| `COMPANION`        | `pdf`           |

---

## The 18-Step Re-Integration Process

### Step 1 — Identify Asset

Verify the **Asset ID** exists in the TRC asset manifest.

- Look up `assetId` in `docs/recovery/trc/download-prompts/manifest.json`
- Confirm the entry exists and is not marked `deprecated`
- Record the asset's `filename`, `companionType`, `parentTool`, and `locales`

> **Gate:** Asset ID must resolve to exactly one manifest entry.

---

### Step 2 — Validate Language

Verify the `lang` attribute on the root `<html>` element matches the declared locale.

- For English files: `lang="en"` must be present
- For Arabic files: `lang="ar"` must be present
- The `lang` value must match the locale suffix in the filename (e.g., `-ar.html` → `ar`)

> **Gate:** `lang` attribute must exactly match the intended locale.

---

### Step 3 — Validate Companion Type

Verify the companion type matches the specification.

- Read `companionType` from the manifest entry
- Confirm it is one of: `PRINTABLE_CARD`, `WORKSHEET`, `GUIDE`, `PLAN`, `JOURNAL`, `REFERENCE`, `COMPANION`
- Apply the type mapping to determine the registry value:
  - `PRINTABLE_CARD` → `card`
  - `WORKSHEET` → `worksheet`
  - `GUIDE` → `pdf`
  - `PLAN` → `card`
  - `JOURNAL` → `worksheet`
  - `REFERENCE` → `pdf`
  - `COMPANION` → `pdf`

> **Gate:** Companion type must be valid and map to a known registry value.

---

### Step 4 — Validate Parent Tool

Verify the parent tool exists in the application's tool registry.

- Read `parentTool` from the manifest entry
- Confirm `parentTool` exists as a key in `src/data/trc-assets.ts` tool registry
- Confirm the parent tool is not deprecated or hidden

> **Gate:** Parent tool must be a live, registered tool.

---

### Step 5 — Validate Content

Verify all required sections are present in the HTML document.

- **Header section** — tool name, companion title present
- **Body sections** — all content areas defined in the spec are present
- **Safety section** — must be included; verify `.safety` or `#safety` element exists
- **Footer section** — tool ID, version, and copyright present
- No section may be empty or contain placeholder text (e.g., `{{...}}`, `TBD`, `FIXME`)

> **Gate:** All required sections present; safety section explicitly included; no placeholders.

---

### Step 6 — Validate Empty Fields

Verify that no writing/input fields contain pre-filled user data.

- Scan all `<textarea>`, `<input>`, and contenteditable elements
- Each must have an empty `value` attribute or no inner text
- Any instructional placeholder text (via `placeholder` attr) is acceptable
- Pre-filled sample responses, names, or dates are **not** acceptable

> **Gate:** All user-facing fields must be empty of pre-filled data.

---

### Step 7 — Validate Print Behavior

Verify `@media print` rules are correctly defined.

- `@media print` block must exist in the document's `<style>` or linked stylesheet
- Page size must be set to **A4** (`size: A4`)
- Margins must be appropriate for A4 printing
- Elements with `.no-print` class must have `display: none` in print context
- No unintended page breaks within content sections
- Background colors and borders must be preserved where specified (`-webkit-print-color-adjust: exact`)

> **Gate:** Document renders correctly when printed to A4; `.no-print` elements are suppressed.

---

### Step 8 — Place File

Copy the validated file to the public download directory.

```
cp <source-file> /public/downloads/trc/<filename>
```

- Destination: `/public/downloads/trc/<filename>`
- The filename must follow the naming convention: `{tool-slug}-{companion-suffix}-{locale}.html`
- File permissions: `644`
- Verify the file exists at the destination after copy

> **Gate:** File is present at the correct public path with correct permissions.

---

### Step 9 — Update Registry

Set the asset's `downloadable` status to `'built'` in `trc-assets.ts`.

- Open `src/data/trc-assets.ts`
- Locate the asset entry by `assetId`
- Set `status: 'built'` (was `'draft'` or `'validated'`)
- Set `downloadable: true`
- Set `filename` to match the placed file name
- Save and verify the TypeScript file still compiles cleanly

> **Gate:** Registry entry reflects `status: 'built'` and `downloadable: true`.

---

### Step 10 — Update i18n

Add any new internationalization keys introduced by this asset.

- Compare keys used in the asset against existing keys in:
  - `messages/en.json`
  - `messages/ar.json`
- Add any missing keys with appropriate translations
- Do **not** overwrite existing keys
- Maintain alphabetical ordering within each JSON section

> **Gate:** All i18n keys used by the asset exist in both locale files.

---

### Step 11 — Sync Messages

Copy updated message files to the standalone build directory.

```
cp messages/en.json .next/standalone/messages/en.json
cp messages/ar.json .next/standalone/messages/ar.json
```

- This ensures the running standalone server has the latest translations
- Verify file sizes match between source and destination

> **Gate:** Standalone messages directory contains the latest locale files.

---

### Step 12 — Update Downloads Page

The downloads page automatically reflects changes from the registry.

- The downloads page reads from `trc-assets.ts` at build time
- No manual page update is required
- Verify the asset appears in the downloads listing by checking the registry entry's `downloadable` flag is `true`

> **Gate:** Asset will appear on the downloads page after build/deploy.

---

### Step 13 — Build

Run the production build if any source files were changed.

```
npm run build
```

- Required if Steps 9, 10, or 11 modified source files
- Not required if only Step 8 (file placement) was performed
- Build must complete with exit code `0`
- Note any build warnings; critical warnings must be resolved

> **Gate:** Build completes successfully with no errors.

---

### Step 14 — Sync Standalone

Synchronize built assets to the standalone server directory.

```
rsync -a .next/static/ .next/standalone/.next/static/
rsync -a public/ .next/standalone/public/
rsync -a messages/ .next/standalone/messages/
```

- Ensures the standalone server has the latest:
  - Static JS/CSS bundles (`.next/static/`)
  - Public assets including downloads (`public/`)
  - Message files (`messages/`)
- Verify the placed file from Step 8 is reachable at `.next/standalone/public/downloads/trc/<filename>`

> **Gate:** Standalone directory contains all updated static, public, and message files.

---

### Step 15 — Deploy

Restart the production application server.

```
pm2 restart tamkinly-prod
```

- Wait for PM2 to report the process as `online`
- Check `pm2 status` to confirm `tamkinly-prod` is running
- If restart fails, do **not** proceed; investigate and remediate

> **Gate:** Application process is `online` and stable after restart.

---

### Step 16 — HTTP Verify

Confirm the asset is accessible via HTTP for both locales.

```bash
curl -s -o /dev/null -w "%{http_code}" https://tamkinly.com/downloads/trc/<filename-en>
curl -s -o /dev/null -w "%{http_code}" https://tamkinly.com/downloads/trc/<filename-ar>
```

- Both requests must return HTTP `200`
- Optionally verify `Content-Type: text/html; charset=utf-8`
- If either locale returns non-200, halt and investigate

> **Gate:** Both EN and AR locale files return HTTP 200.

---

### Step 17 — Mark Built

Update the asset status in the registry to reflect successful deployment.

- In `src/data/trc-assets.ts`, confirm `status: 'built'` is set
- Set `deployedAt` timestamp to current ISO 8601 datetime
- If a separate deployment log or database exists, update it as well

> **Gate:** Registry reflects `status: 'built'` with a valid `deployedAt` timestamp.

---

### Step 18 — Log

Record the completed integration in the worklog.

- Append entry to `docs/recovery/trc/download-prompts/worklog.md` with:
  - `assetId`
  - `companionType`
  - `parentTool`
  - `locales` (EN, AR)
  - `timestamp` (ISO 8601)
  - `result`: `SUCCESS`
  - `deployedBy`: operator name or CI system
- Include any notes about warnings, overrides, or manual interventions

> **Gate:** Worklog entry exists and is complete.

---

## Failure Handling

If any step fails:

1. **Do not proceed** to the next step
2. Record the failure in the worklog with the failing step number and error details
3. If the failure occurred after Step 8 (file placement), consider whether a rollback is needed
4. If the failure occurred after Step 15 (deploy), verify the application is still healthy
5. Remediate the issue and re-run from the failing step (or from Step 1 if a fundamental issue is found)

---

## Quick Reference

| Step | Name              | Key Action                                      |
|------|-------------------|-------------------------------------------------|
| 1    | Identify Asset    | Verify Asset ID in manifest                     |
| 2    | Validate Language | `lang` attr matches locale                      |
| 3    | Validate Type     | Companion type matches spec + map to registry   |
| 4    | Validate Parent   | Parent tool exists in registry                  |
| 5    | Validate Content  | All sections present, safety included            |
| 6    | Validate Empty    | No pre-filled user data                         |
| 7    | Validate Print    | `@media print` rules, A4                        |
| 8    | Place File        | Copy to `/public/downloads/trc/`               |
| 9    | Update Registry   | Set `status: 'built'`, `downloadable: true`     |
| 10   | Update i18n       | Add new keys to `messages/en.json` & `ar.json` |
| 11   | Sync Messages     | Copy to `.next/standalone/messages/`            |
| 12   | Update Downloads  | Auto via registry                               |
| 13   | Build             | `npm run build` if source changed               |
| 14   | Sync Standalone   | Rsync static + public + messages                |
| 15   | Deploy            | `pm2 restart tamkinly-prod`                     |
| 16   | HTTP Verify       | `curl` both locales, confirm 200                |
| 17   | Mark Built        | Set `deployedAt` timestamp in registry          |
| 18   | Log               | Record in worklog                               |
