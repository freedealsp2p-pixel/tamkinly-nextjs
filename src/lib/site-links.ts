/**
 * Site Links — single source of truth for footer & contact page
 * (Task: founder directive 2026-10-21 — contact page mirrors footer logic)
 *
 * SOCIAL_LINKS: community/social profiles (icon = lucide key mapped in components)
 * PRODUCT_LINKS: all product entry points (same logic as footer productLinks)
 *
 * NOTE (2026-10-21): Telegram channel switched from t.me/tamkinly to the
 * English channel t.me/tamkinlyenglish (founder directive).
 * Tribute PAYMENT links (t.me/tribute/...) live in tribute.ts /
 * protocol-access.ts — never put payment links here.
 */

export type SocialIconKey = 'telegram' | 'instagram' | 'linkedin' | 'youtube' | 'email';
export type ProductIconKey = 'store' | 'planner' | 'mastery' | 'protocolsHub' | 'protocol';

export interface SocialLink {
  href: string;
  icon: SocialIconKey;
  /** i18n key inside the "footer" namespace */
  labelKey: string;
}

export interface ProductLink {
  href: string;
  icon: ProductIconKey;
  /** i18n key inside the "footer" namespace */
  labelKey: string;
  /** Optional price chip (already V2 one-time pricing) */
  price?: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { href: 'https://t.me/tamkinlyenglish', icon: 'telegram', labelKey: 'socialTelegram' },
  { href: 'https://instagram.com/tamkinly', icon: 'instagram', labelKey: 'socialInstagram' },
  { href: 'https://linkedin.com/company/tamkinly', icon: 'linkedin', labelKey: 'socialLinkedin' },
  { href: 'https://youtube.com/@tamkinly', icon: 'youtube', labelKey: 'socialYoutube' },
  { href: 'mailto:hello@tamkinly.com', icon: 'email', labelKey: 'socialEmail' },
];

export const PRODUCT_LINKS: ProductLink[] = [
  { href: '/products', icon: 'store', labelKey: 'allProducts' },
  { href: '/products/premium', icon: 'planner', labelKey: 'plannerProduct', price: '$9.99' },
  { href: '/products/mastery', icon: 'mastery', labelKey: 'masteryProduct', price: '$27' },
  { href: '/apps/therapeutic-protocols', icon: 'protocolsHub', labelKey: 'protocolsHub', price: '$99' },
  { href: '/apps/therapeutic-protocols/temporal-decoupling', icon: 'protocol', labelKey: 'temporalDecoupling' },
  { href: '/apps/therapeutic-protocols/white-mirror', icon: 'protocol', labelKey: 'whiteMirror' },
  { href: '/apps/therapeutic-protocols/alternative-code', icon: 'protocol', labelKey: 'alternativeCode' },
];
