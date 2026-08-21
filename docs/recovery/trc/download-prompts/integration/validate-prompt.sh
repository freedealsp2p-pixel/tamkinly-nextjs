#!/usr/bin/env bash
#
# validate-prompt.sh — Quick validation for TRC downloadable companion production
#
# Usage: ./validate-prompt.sh <asset-id> <language>
#   asset-id  : e.g. grounding-54321, a52, safe-place, body-scan
#   language  : ar | en
#
# Checks:
#   1. Asset spec exists at docs/recovery/trc/download-prompts/asset-specs/{asset-id}.md
#   2. AR prompt exists at docs/recovery/trc/download-prompts/prompts/{asset-id}-AR.md
#   3. EN prompt exists at docs/recovery/trc/download-prompts/prompts/{asset-id}-EN.md
#   4. Reports word count for each file
#   5. Flags files below 800 words (likely incomplete)
#

set -euo pipefail

# ── Config ──────────────────────────────────────────────────────────
BASE_DIR="/var/www/tamkinly/docs/recovery/trc/download-prompts"
SPECS_DIR="${BASE_DIR}/asset-specs"
PROMPTS_DIR="${BASE_DIR}/prompts"
MIN_WORDS=800

# ── Args ───────────────────────────────────────────────────────────
if [[ $# -lt 1 ]]; then
  echo "❌ Usage: $0 <asset-id> [language]"
  echo "   asset-id : grounding-54321, a52, safe-place, body-scan, trigger-mapping, safety-plan"
  echo "   language : ar | en  (default: checks both)"
  exit 1
fi

ASSET_ID="$1"
LANG="${2:-both}"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  TRC Downloadable Validation — ${ASSET_ID}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# ── Track results ──────────────────────────────────────────────────
OVERALL_OK=true
MISSING_COUNT=0
LOW_WORD_COUNT=0

# ── Helper: check file ─────────────────────────────────────────────
check_file() {
  local label="$1"
  local filepath="$2"

  if [[ -f "$filepath" ]]; then
    WORDS=$(wc -w < "$filepath")
    LINES=$(wc -l < "$filepath")
    printf "  ✅ %-30s %5d words  %4d lines\n" "$label" "$WORDS" "$LINES"
    if [[ $WORDS -lt $MIN_WORDS ]]; then
      echo "     ⚠️  Below minimum word count (${MIN_WORDS})"
      LOW_WORD_COUNT=$((LOW_WORD_COUNT + 1))
    fi
  else
    printf "  ❌ %-30s MISSING\n" "$label"
    MISSING_COUNT=$((MISSING_COUNT + 1))
    OVERALL_OK=false
  fi
}

# ── Step 1: Check asset spec ───────────────────────────────────────
echo "── Asset Specification ──────────────────────────────────────────"
SPEC_FILE="${SPECS_DIR}/${ASSET_ID}.md"
check_file "Spec: ${ASSET_ID}.md" "$SPEC_FILE"
echo ""

# ── Step 2: Check prompts ─────────────────────────────────────────
echo "── Production Prompts ──────────────────────────────────────────"

if [[ "$LANG" == "ar" || "$LANG" == "both" ]]; then
  AR_FILE="${PROMPTS_DIR}/${ASSET_ID}-AR.md"
  check_file "AR Prompt: ${ASSET_ID}-AR.md" "$AR_FILE"
fi

if [[ "$LANG" == "en" || "$LANG" == "both" ]]; then
  EN_FILE="${PROMPTS_DIR}/${ASSET_ID}-EN.md"
  check_file "EN Prompt: ${ASSET_ID}-EN.md" "$EN_FILE"
fi

echo ""

# ── Summary ────────────────────────────────────────────────────────
echo "── Summary ─────────────────────────────────────────────────────"
if [[ "$OVERALL_OK" == true ]]; then
  echo "  ✅ All required files present"
else
  echo "  ❌ ${MISSING_COUNT} file(s) missing"
fi

if [[ $LOW_WORD_COUNT -gt 0 ]]; then
  echo "  ⚠️  ${LOW_WORD_COUNT} file(s) below ${MIN_WORDS} words"
else
  echo "  ✅ All files meet minimum word count (${MIN_WORDS})"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Exit with error if files missing
if [[ "$OVERALL_OK" != true ]]; then
  exit 1
fi
exit 0
