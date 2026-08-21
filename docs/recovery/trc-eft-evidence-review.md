# TRC EFT Evidence Review
# مراجعة الأدلة العلمية لـ EFT

**Date:** 2026-08-12
**Scope:** Scientific claims audit in EFT implementation and i18n
**Method:** Full-text search of codebase for unsupported clinical claims

---

## Claims Found in TRC Pages

### grounding-guide/page.tsx — Line 16
**Claim (EN):** "Research shows grounding techniques significantly reduce anxiety, depression, and PTSD symptoms."
**Assessment:** This is a general statement about grounding (not EFT). However, "significantly reduce PTSD symptoms" is a strong clinical claim that needs citation.
**Status:** ⚠️ NEEDS CITATION — The claim about "significant reduction in PTSD symptoms" requires a specific study reference.
**Recommendation:** Add citation (e.g., Najavits, 2007; or van der Kolk, 2014) or soften to "Research suggests grounding techniques may help reduce..."

### regulation-guide/page.tsx — Line 30
**Claim (EN):** "cortisol jumps at any trigger" + "HPA axis dysregulates"
**Assessment:** This is psychoeducation about the stress response system. The HPA axis/cortisol mechanism is well-established in trauma literature (van der Kolk, 2014; Yehuda, 2002). This is informational, not a treatment claim.
**Status:** ✅ ACCEPTABLE — Standard psychoeducation with established scientific basis.

### what-happens-during-trauma-responses/page.tsx — Line 168
**Claim (AR+EN):** HPA axis description with cortisol
**Assessment:** Same as above — standard neurobiology of trauma explanation.
**Status:** ✅ ACCEPTABLE — Standard psychoeducation.

### secondary-trauma/page.tsx — Line 22-23
**Claim (EN):** "Three symptom clusters — like PTSD but from indirect exposure"
**Assessment:** This accurately describes secondary/vicarious trauma, which is recognized in the literature (Figley, 1995). The comparison to PTSD symptom clusters is clinically accurate.
**Status:** ✅ ACCEPTABLE — Accurate description of recognized condition.

---

## EFT-Specific Claims Audit

### EFT Page (eft-tapping/page.tsx)
- **PTSD claims:** ❌ NONE FOUND — Good
- **Cortisol claims:** ❌ NONE FOUND — Good
- **Success rate claims:** ❌ NONE FOUND — Good
- **Treatment claims:** ❌ NONE FOUND — Good
- **"Proven" / "cure" language:** ❌ NONE FOUND — Good

### EFT i18n (recoveryAssets.trcEftTapping)
- **PTSD claims:** ❌ NONE FOUND
- **Cortisol claims:** ❌ NONE FOUND
- **Efficacy claims:** ❌ NONE FOUND
- **Treatment claims:** ❌ NONE FOUND
- All language correctly frames EFT as "أداة دعم ذاتي" (self-support tool), not treatment

---

## Claims That Need Action

| # | Location | Claim | Issue | Recommendation |
|---|----------|-------|-------|----------------|
| 1 | grounding-guide/page.tsx L16 | "Research shows grounding techniques significantly reduce anxiety, depression, and PTSD symptoms" | Strong clinical claim without citation | Add citation OR soften to "Research suggests grounding may help reduce..." |
| 2 | All EFT content | No unsupported claims found | N/A | ✅ No action needed |

---

## EFT Evidence Base (What Exists in Literature)

EFT has a growing but still limited evidence base:

1. **Meta-analyses:** Church et al. (2013) found moderate effect sizes for anxiety and depression, but sample sizes were small
2. **PTSD-specific:** Some pilot studies (Church & Brooks, 2010) show promise, but no large-scale RCTs
3. **APA status:** EFT is NOT recognized by APA as an evidence-based treatment for PTSD
4. **NICE status:** Not reviewed or recommended by NICE guidelines
5. **Key limitation:** Most studies have methodological issues (small N, no active control, no long-term follow-up)

**Conclusion:** EFT may be helpful as a self-help regulation tool, but it CANNOT be presented as:
- An evidence-based treatment for PTSD
- A replacement for trauma-focused therapy
- A technique with proven efficacy for trauma recovery

The current implementation correctly reflects this by:
- Marking EFT as clinical-review
- Using "self-help tool" language
- Including "not a substitute for therapy" disclaimers
- Not making any PTSD/cortisol/efficacy claims

---

## Verdict

EFT content is **COMPLIANT** with the evidence base. No unsupported clinical claims were found in EFT-specific content.

One claim in grounding-guide needs citation softening (not EFT-specific).