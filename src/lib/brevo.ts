// ============================================
// BREVO (Sendinblue) API CLIENT — v2 (rewired 2026-09-28)
// Bilingual templates (AR/EN) + per-topic senders
// Tamkinly Identity Transformation Platform
// ============================================
// TEMPLATE MAP — live Brevo IDs verified via API:
//   AR pack TK-01..TK-23 -> IDs 34-56
//   EN pack TK-EN-01..23 -> IDs 57-79
//   Legacy functional kept: 12 (password reset), 14 (email verification),
//   15 (support received), 16 (support resolved) — until redesigned.
// ============================================

// ============================================
// TYPES
// ============================================

export interface BrevoContact {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
    NAME?: string;
    PHONE?: string;
    // NEW lineup only (legacy trial/planner/bundle removed 2026-09-28)
    CUSTOMER_TYPE?: 'free' | 'basic' | 'premium' | 'mastery' | 'protocol' | 'recovery' | 'app';
    PURCHASE_DATE?: string;
    ACCESS_KEY?: string;
    PRODUCT_NAME?: string;
    PRODUCT_TIER?: string;
    DOWNLOAD_LINK?: string;
    APPS_LINK?: string;
    QUIZ_SCORE?: number;
    QUIZ_TYPE?: string;
    STREAK_DAYS?: number;
    LAST_ACTIVITY?: string;
    DAYS_SINCE_PURCHASE?: number;
    SUPPORT_TICKET_ID?: string;
    SUPPORT_SUBJECT?: string;
    RESET_LINK?: string;
    VERIFY_LINK?: string;
    LOGIN_LINK?: string;
    INACTIVE_DAYS?: number;
    CART_ITEMS?: string;
    UPGRADE_TIER?: string;
  };
  listIds?: number[];
  updateEnabled?: boolean;
  smtpBlacklistSender?: string[];
}

export interface BrevoEmail {
  to: Array<{ email: string; name?: string }>;
  sender: { name: string; email: string };
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: { email: string; name?: string };
  tags?: string[];
  headers?: Record<string, string>;
  templateId?: number;
  params?: Record<string, string | number>;
}

export interface BrevoTemplate {
  id: number;
  name: string;
  subject: string;
  isActive: boolean;
  testPreviewUrl?: string;
}

export interface BrevoList {
  id: number;
  name: string;
  totalSubscribers: number;
  createdAt: string;
}

// ============================================
// CONFIGURATION
// ============================================

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';
const DEFAULT_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com';
const DEFAULT_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Tamkinly';
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';

// ============================================
// SENDERS — one sender per email topic
// (must each be verified in Brevo dashboard -> Senders)
// ============================================

export const BREVO_SENDERS = {
  TECH:      { name: 'Tamkinly Tech',    email: 'noreply@tamkinly.com' }, // codes, security, billing
  MARKETING: { name: 'Tamkinly Team',    email: 'team@tamkinly.com' },    // welcome, nurture, offers
  SUPPORT:   { name: 'Tamkinly Support', email: 'support@tamkinly.com' }, // tickets
} as const;

export type SenderKey = keyof typeof BREVO_SENDERS;

// ============================================
// TEMPLATE IDs — bilingual { ar, en }
// ============================================

export type BilangTemplate = { ar: number; en: number };

/** Pick template ID by user locale (users.locale column: 'ar' | 'en', default 'ar') */
export const templateFor = (t: BilangTemplate, locale?: string): number =>
  locale === 'en' ? t.en : t.ar;

export const BREVO_TEMPLATES = {
  // Welcome & Nurture (marketing)
  WELCOME:                { ar: 34, en: 57 }, // TK-01
  FREE_GIFT_TSQ:          { ar: 43, en: 66 }, // TK-10
  NURTURE_1:              { ar: 46, en: 69 }, // TK-13 Day 0 story
  NURTURE_2:              { ar: 47, en: 70 }, // TK-14 Day 2 identity clarity
  NURTURE_3:              { ar: 48, en: 71 }, // TK-15 Day 4 protocols
  NURTURE_4:              { ar: 49, en: 72 }, // TK-16 Day 6 objections
  NURTURE_5:              { ar: 50, en: 73 }, // TK-17 Day 8 closing invitation
  WINBACK:                { ar: 54, en: 77 }, // TK-21

  // Quiz (marketing)
  QUIZ_RESULTS:           { ar: 35, en: 58 }, // TK-02

  // Access codes / purchase delivery (tech)
  CODE_BASIC:             { ar: 36, en: 59 }, // TK-03 $7/mo
  CODE_PREMIUM:           { ar: 37, en: 60 }, // TK-04 $17/mo
  CODE_MASTERY:           { ar: 38, en: 61 }, // TK-05 $27/mo
  CODE_PROTOCOL:          { ar: 39, en: 62 }, // TK-06 $99 one-time
  RENEWAL_CONFIRMED:      { ar: 40, en: 63 }, // TK-07
  ORDER_PENDING:          { ar: 41, en: 64 }, // TK-08
  ACCOUNT_CREATED:        { ar: 42, en: 65 }, // TK-09

  // Upsells / cross-sells (marketing)
  UPSELL_BASIC_PREMIUM:   { ar: 51, en: 74 }, // TK-18
  UPSELL_PREMIUM_MASTERY: { ar: 52, en: 75 }, // TK-19
  PROTOCOL_TO_SUB:        { ar: 53, en: 76 }, // TK-20

  // Recovery centers (marketing)
  RECOVERY_PORN:          { ar: 55, en: 78 }, // TK-22
  RECOVERY_TRAUMA:        { ar: 56, en: 79 }, // TK-23

  // Abandoned cart (marketing)
  CART_1H:                { ar: 44, en: 67 }, // TK-11
  CART_24H:               { ar: 45, en: 68 }, // TK-12

  // ===== Legacy functional templates (single-language, kept until redesigned) =====
  PASSWORD_RESET: 12,        // old #12 — params: NAME, RESET_LINK
  EMAIL_VERIFICATION: 14,    // old #14 — params: NAME, VERIFY_LINK
  SUPPORT_RECEIVED: 15,      // old #15 — params: NAME, SUPPORT_TICKET_ID, SUPPORT_SUBJECT
  SUPPORT_RESOLVED: 16,      // old #16 — params: NAME, SUPPORT_TICKET_ID
} as const;

/** Sender per template event (see BREVO_SENDERS) */
export const EVENT_SENDERS: Record<string, SenderKey> = {
  WELCOME: 'MARKETING', QUIZ_RESULTS: 'MARKETING', FREE_GIFT_TSQ: 'MARKETING',
  NURTURE_1: 'MARKETING', NURTURE_2: 'MARKETING', NURTURE_3: 'MARKETING',
  NURTURE_4: 'MARKETING', NURTURE_5: 'MARKETING', WINBACK: 'MARKETING',
  UPSELL_BASIC_PREMIUM: 'MARKETING', UPSELL_PREMIUM_MASTERY: 'MARKETING',
  PROTOCOL_TO_SUB: 'MARKETING', RECOVERY_PORN: 'MARKETING', RECOVERY_TRAUMA: 'MARKETING',
  CART_1H: 'MARKETING', CART_24H: 'MARKETING',
  CODE_BASIC: 'TECH', CODE_PREMIUM: 'TECH', CODE_MASTERY: 'TECH', CODE_PROTOCOL: 'TECH',
  RENEWAL_CONFIRMED: 'TECH', ORDER_PENDING: 'TECH', ACCOUNT_CREATED: 'TECH',
  PASSWORD_RESET: 'TECH', EMAIL_VERIFICATION: 'TECH',
  SUPPORT_RECEIVED: 'SUPPORT', SUPPORT_RESOLVED: 'SUPPORT',
};

export const senderFor = (event: string): { name: string; email: string } =>
  BREVO_SENDERS[EVENT_SENDERS[event] || 'TECH'];

// ============================================
// V3 SEQUENCE TEMPLATES (deployed 2026-09-30) — created via Brevo API, ids verified
// AR ids 80-137, EN ids 138-195. 58 messages x 2 languages.
// TRC files, REC files, protocol welcomes + 9-day companions, 20 app activations, 3 nudges.
// ============================================

export const BREVO_SEQ_SENDER = { name: 'Tamkinly Team', email: 'team@tamkinly.com' } as const;

export const SEQ_TEMPLATES = {
  RECOVERY_TRC_01: { ar: 80, en: 138 },
  RECOVERY_TRC_02: { ar: 81, en: 139 },
  RECOVERY_TRC_03: { ar: 82, en: 140 },
  RECOVERY_TRC_04: { ar: 83, en: 141 },
  RECOVERY_TRC_05: { ar: 84, en: 142 },
  RECOVERY_TRC_06: { ar: 85, en: 143 },
  RECOVERY_TRC_07: { ar: 86, en: 144 },
  RECOVERY_TRC_08: { ar: 87, en: 145 },
  RECOVERY_TRC_09: { ar: 88, en: 146 },
  RECOVERY_TRC_10: { ar: 89, en: 147 },
  RECOVERY_TRC_11: { ar: 90, en: 148 },
  RECOVERY_TRC_12: { ar: 91, en: 149 },
  RECOVERY_REC_01: { ar: 92, en: 150 },
  RECOVERY_REC_02: { ar: 93, en: 151 },
  RECOVERY_REC_03: { ar: 94, en: 152 },
  RECOVERY_REC_04: { ar: 95, en: 153 },
  RECOVERY_REC_05: { ar: 96, en: 154 },
  RECOVERY_REC_06: { ar: 97, en: 155 },
  RECOVERY_REC_07: { ar: 98, en: 156 },
  RECOVERY_REC_08: { ar: 99, en: 157 },
  RECOVERY_REC_09: { ar: 100, en: 158 },
  RECOVERY_REC_10: { ar: 101, en: 159 },
  RECOVERY_REC_11: { ar: 102, en: 160 },
  PROTO_TD: { ar: 103, en: 161 },
  PROTO_AC: { ar: 104, en: 162 },
  PROTO_WM: { ar: 105, en: 163 },
  PROTO_DAY_1: { ar: 106, en: 164 },
  PROTO_DAY_2: { ar: 107, en: 165 },
  PROTO_DAY_3: { ar: 108, en: 166 },
  PROTO_DAY_4: { ar: 109, en: 167 },
  PROTO_DAY_5: { ar: 110, en: 168 },
  PROTO_DAY_6: { ar: 111, en: 169 },
  PROTO_DAY_7: { ar: 112, en: 170 },
  PROTO_DAY_8: { ar: 113, en: 171 },
  PROTO_DAY_9: { ar: 114, en: 172 },
  APP_IDENTITY_BASELINE: { ar: 115, en: 173 },
  APP_EXECUTIVE_MANUAL: { ar: 116, en: 174 },
  APP_DAILY_PLANNER: { ar: 117, en: 175 },
  APP_JOURNAL_SYSTEM: { ar: 118, en: 176 },
  APP_GOAL_SYSTEM: { ar: 119, en: 177 },
  APP_HABIT_TRACKER: { ar: 120, en: 178 },
  APP_DAILY_REFLECTION: { ar: 121, en: 179 },
  APP_ENVIRONMENTAL_AUDIT: { ar: 122, en: 180 },
  APP_DECISION_ANALYSIS: { ar: 123, en: 181 },
  APP_EVIDENCE_TRACKING: { ar: 124, en: 182 },
  APP_PROGRESS_DASHBOARD: { ar: 125, en: 183 },
  APP_IDENTITY_RECODE: { ar: 126, en: 184 },
  APP_WORKSHEETS: { ar: 127, en: 185 },
  APP_EMOTION_REGULATION: { ar: 128, en: 186 },
  APP_COMMUNITY: { ar: 129, en: 187 },
  APP_PRIORITY_SUPPORT: { ar: 130, en: 188 },
  APP_AI_COACH: { ar: 131, en: 189 },
  APP_VALUES: { ar: 132, en: 190 },
  APP_TRIAL_PLANNER: { ar: 133, en: 191 },
  APP_QUIZ: { ar: 134, en: 192 },
  NUDGE_1: { ar: 135, en: 193 },
  NUDGE_3: { ar: 136, en: 194 },
  NUDGE_7: { ar: 137, en: 195 },
} as const;

export type SeqTemplateKey = keyof typeof SEQ_TEMPLATES;

export const seqTemplateId = (k: SeqTemplateKey, locale?: string): number =>
  (locale === 'en' ? SEQ_TEMPLATES[k].en : SEQ_TEMPLATES[k].ar);

// ============================================
// LIST IDs — matched to live Brevo lists (verified via API 2026-09-28)
// ============================================

export const BREVO_LISTS = {
  ALL_CONTACTS:    parseInt(process.env.BREVO_LIST_ALL || '7'),
  CUSTOMERS:       parseInt(process.env.BREVO_LIST_CUSTOMERS || '6'),
  NEWSLETTER:      parseInt(process.env.BREVO_LIST_NEWSLETTER || '5'),
  FREE_USERS:      parseInt(process.env.BREVO_LIST_FREE || '8'),
  BASIC:           parseInt(process.env.BREVO_LIST_BASIC || '9'),
  PREMIUM:         parseInt(process.env.BREVO_LIST_PREMIUM || '10'),
  MASTERY:         parseInt(process.env.BREVO_LIST_MASTERY || '11'),
  QUIZ_TAKERS:     parseInt(process.env.BREVO_LIST_QUIZ || '12'),
  ABANDONED_CART:  parseInt(process.env.BREVO_LIST_CART || '13'),
  INACTIVE_USERS:  parseInt(process.env.BREVO_LIST_INACTIVE || '14'),
  // Legacy aliases (kept for compile compatibility with old callers)
  TRIAL_USERS:       8,
  PREMIUM_CUSTOMERS: 10,
  BUNDLE_VIP:        11,
};

// ============================================
// API CLIENT
// ============================================

async function brevoFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data?: T; error?: string }> {
  if (!BREVO_API_KEY) {
    return { error: 'BREVO_API_KEY is not configured' };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}${endpoint}`, {
      ...options,
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
        ...options.headers,
      },
    });

    const text = await response.text();
    let data: T | undefined;
    if (text && text.trim()) {
      try {
        data = JSON.parse(text);
      } catch {
        data = undefined;
      }
    }

    if (!response.ok) {
      console.error('Brevo API Error:', data || text);
      const errorMsg = (data as Record<string, string>)?.message || `HTTP ${response.status}`;
      return { error: errorMsg };
    }

    return { data };
  } catch (error) {
    console.error('Brevo API Exception:', error);
    return { error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// ============================================
// CONTACTS API
// ============================================

export const BrevoContacts = {
  async upsert(contact: BrevoContact): Promise<{ success: boolean; id?: string; error?: string }> {
    const { data, error } = await brevoFetch<{ id?: string }>('/contacts', {
      method: 'POST',
      body: JSON.stringify({
        email: contact.email,
        attributes: contact.attributes,
        listIds: contact.listIds || [],
        updateEnabled: contact.updateEnabled ?? true,
      }),
    });

    if (error) {
      if (error.includes('already exists')) {
        const updateResult = await this.update(contact.email, contact);
        return updateResult;
      }
      return { success: false, error };
    }

    return { success: true, id: data?.id?.toString() };
  },

  async update(
    email: string,
    contact: Partial<BrevoContact>
  ): Promise<{ success: boolean; error?: string }> {
    const { error } = await brevoFetch(`/contacts/${encodeURIComponent(email)}`, {
      method: 'PUT',
      body: JSON.stringify({
        attributes: contact.attributes,
        listIds: contact.listIds,
      }),
    });

    return { success: !error, error };
  },

  async get(email: string): Promise<BrevoContact | null> {
    const { data, error } = await brevoFetch<BrevoContact>(
      `/contacts/${encodeURIComponent(email)}`
    );

    if (error) return null;
    return data || null;
  },
};

// ============================================
// EMAIL SENDING API
// ============================================

export const BrevoEmails = {
  async send(email: BrevoEmail): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const { data, error } = await brevoFetch<{ messageId: string }>('/smtp/email', {
      method: 'POST',
      body: JSON.stringify({
        sender: email.sender || { name: DEFAULT_SENDER_NAME, email: DEFAULT_SENDER_EMAIL },
        to: email.to,
        ...(email.subject ? { subject: email.subject } : {}),
        ...(email.templateId ? {} : { htmlContent: email.htmlContent }),
        textContent: email.textContent || undefined,
        replyTo: email.replyTo,
        tags: email.tags,
        headers: email.headers,
        ...(email.templateId ? { templateId: email.templateId } : {}),
        ...(email.params ? { params: email.params } : {}),
      }),
    });

    return {
      success: !error,
      messageId: data?.messageId,
      error,
    };
  },

  async sendTemplate(
    templateId: number,
    to: string,
    params: Record<string, string | number | undefined>,
    options?: { name?: string; replyTo?: string; sender?: { name: string; email: string } }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.send({
      to: [{ email: to, name: options?.name }],
      sender: options?.sender || { name: DEFAULT_SENDER_NAME, email: DEFAULT_SENDER_EMAIL },
      subject: '',
      htmlContent: '',
      templateId,
      params: Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      ) as Record<string, string | number>,
      replyTo: options?.replyTo ? { email: options.replyTo } : undefined,
    });
  },

  // ============================================
  // EVENT WRAPPERS — bilingual + per-topic sender
  // (legacy function names kept: external callers exist)
  // ============================================

  async sendWelcome(
    email: string,
    name: string,
    accessKey?: string,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.WELCOME, locale), email,
      { NAME: name, ...(accessKey ? { CODE: accessKey } : {}) },
      { name, sender: senderFor('WELCOME') }
    );
  },

  // Legacy aliases -> new lineup templates
  async sendTrialPurchase( // old trial product retired -> Basic delivery
    email: string, name: string, accessKey: string, locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.CODE_BASIC, locale), email,
      { NAME: name, CODE: accessKey, PRODUCT: 'Basic Plan' },
      { name, sender: senderFor('CODE_BASIC') }
    );
  },

  async sendPlannerPurchase( // old planner retired -> protocol (one-time) delivery
    email: string, name: string, accessKey: string, locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.CODE_PROTOCOL, locale), email,
      { NAME: name, CODE: accessKey, PRODUCT: 'Therapeutic Protocol' },
      { name, sender: senderFor('CODE_PROTOCOL') }
    );
  },

  async sendPremiumPurchase(
    email: string, name: string, accessKey: string, locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.CODE_PREMIUM, locale), email,
      { NAME: name, CODE: accessKey, PRODUCT: 'Premium Plan' },
      { name, sender: senderFor('CODE_PREMIUM') }
    );
  },

  async sendBundlePurchase( // old bundle -> Mastery
    email: string, name: string, accessKey: string, locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.CODE_MASTERY, locale), email,
      { NAME: name, CODE: accessKey, PRODUCT: 'Mastery Plan' },
      { name, sender: senderFor('CODE_MASTERY') }
    );
  },

  async sendFollowUp(
    email: string,
    name: string,
    day: 3 | 7 | 14,
    _productType?: string,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const tpl = day === 14
      ? BREVO_TEMPLATES.UPSELL_BASIC_PREMIUM
      : day === 7
        ? BREVO_TEMPLATES.NURTURE_2
        : BREVO_TEMPLATES.NURTURE_1;
    return this.sendTemplate(
      templateFor(tpl, locale), email,
      { NAME: name, APPS_LINK: `${BASE_URL}/apps` },
      { name, sender: senderFor(day === 14 ? 'UPSELL_BASIC_PREMIUM' : 'NURTURE_1') }
    );
  },

  async sendAbandonedCart(
    email: string,
    name: string,
    hoursAgo: 1 | 24 = 1,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const event = hoursAgo === 1 ? 'CART_1H' : 'CART_24H';
    return this.sendTemplate(
      templateFor(hoursAgo === 1 ? BREVO_TEMPLATES.CART_1H : BREVO_TEMPLATES.CART_24H, locale),
      email, { NAME: name }, { name, sender: senderFor(event) }
    );
  },

  async sendQuizResults(
    email: string,
    name: string,
    quizType: string,
    score: number,
    insights?: string[],
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.QUIZ_RESULTS, locale), email,
      { NAME: name, QUIZ_TYPE: quizType, QUIZ_SCORE: score, INSIGHTS: insights ? insights.join('; ') : '' },
      { name, sender: senderFor('QUIZ_RESULTS') }
    );
  },

  // Temporary mapping until dedicated milestone templates are designed:
  // day 7 -> NURTURE_2, 14 -> NURTURE_3, 21 -> NURTURE_4, 30 -> NURTURE_5
  async sendIdentityMilestone(
    email: string,
    name: string,
    day: 7 | 14 | 21 | 30,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const map: Record<number, BilangTemplate> = {
      7: BREVO_TEMPLATES.NURTURE_2, 14: BREVO_TEMPLATES.NURTURE_3,
      21: BREVO_TEMPLATES.NURTURE_4, 30: BREVO_TEMPLATES.NURTURE_5,
    };
    const tpl = map[day] || BREVO_TEMPLATES.NURTURE_2;
    return this.sendTemplate(
      templateFor(tpl, locale), email,
      { NAME: name, MILESTONE_DAY: day, APPS_LINK: `${BASE_URL}/apps` },
      { name, sender: senderFor('NURTURE_2') }
    );
  },

  async sendReEngagement(
    email: string,
    name: string,
    inactiveDays: number = 7,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.WINBACK, locale), email,
      { NAME: name, INACTIVE_DAYS: inactiveDays, APPS_LINK: `${BASE_URL}/apps` },
      { name, sender: senderFor('WINBACK') }
    );
  },

  async sendAccountCreated(
    email: string,
    name: string,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.ACCOUNT_CREATED, locale), email,
      { NAME: name, LOGIN_LINK: `${BASE_URL}/account` },
      { name, sender: senderFor('ACCOUNT_CREATED') }
    );
  },

  async sendPasswordReset(
    email: string,
    name: string,
    resetLink: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      BREVO_TEMPLATES.PASSWORD_RESET, email,
      { NAME: name, RESET_LINK: resetLink },
      { name, sender: senderFor('PASSWORD_RESET') }
    );
  },

  async sendEmailVerification(
    email: string,
    name: string,
    verifyLink: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      BREVO_TEMPLATES.EMAIL_VERIFICATION, email,
      { NAME: name, VERIFY_LINK: verifyLink },
      { name, sender: senderFor('EMAIL_VERIFICATION') }
    );
  },

  async sendSupportReceived(
    email: string,
    name: string,
    ticketId: string,
    subject: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      BREVO_TEMPLATES.SUPPORT_RECEIVED, email,
      { NAME: name, SUPPORT_TICKET_ID: ticketId, SUPPORT_SUBJECT: subject },
      { name, sender: senderFor('SUPPORT_RECEIVED') }
    );
  },

  async sendSupportResolved(
    email: string,
    name: string,
    ticketId: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      BREVO_TEMPLATES.SUPPORT_RESOLVED, email,
      { NAME: name, SUPPORT_TICKET_ID: ticketId },
      { name, sender: senderFor('SUPPORT_RESOLVED') }
    );
  },

  // Placeholders (old dedicated templates deleted) — mapped to closest live templates
  async sendSpecialOffer(
    email: string, name: string, locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.NURTURE_5, locale), email,
      { NAME: name }, { name, sender: senderFor('NURTURE_5') }
    );
  },

  async sendBirthdayOffer(
    email: string, name: string, locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.FREE_GIFT_TSQ, locale), email,
      { NAME: name }, { name, sender: senderFor('FREE_GIFT_TSQ') }
    );
  },

  // Generic purchase routing by NEW lineup keywords
  async sendPurchaseConfirmation(
    email: string,
    name: string,
    productName: string,
    accessKey: string,
    locale: string = 'ar'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const p = productName.toLowerCase();

    if (/(protocol|decoupling|white mirror|alternative code|بروتوكول|تفكيك|مرآة|شفرة)/.test(p)) {
      return this.sendTemplate(
        templateFor(BREVO_TEMPLATES.CODE_PROTOCOL, locale), email,
        { NAME: name, CODE: accessKey, PRODUCT: productName },
        { name, sender: senderFor('CODE_PROTOCOL') }
      );
    }
    if (/(mastery|إتقان)/.test(p)) {
      return this.sendTemplate(
        templateFor(BREVO_TEMPLATES.CODE_MASTERY, locale), email,
        { NAME: name, CODE: accessKey, PRODUCT: productName },
        { name, sender: senderFor('CODE_MASTERY') }
      );
    }
    if (/(premium|مميز)/.test(p)) {
      return this.sendTemplate(
        templateFor(BREVO_TEMPLATES.CODE_PREMIUM, locale), email,
        { NAME: name, CODE: accessKey, PRODUCT: productName },
        { name, sender: senderFor('CODE_PREMIUM') }
      );
    }
    if (/(trauma|صدم)/.test(p)) {
      return this.sendTemplate(
        templateFor(BREVO_TEMPLATES.RECOVERY_TRAUMA, locale), email,
        { NAME: name, PRODUCT: productName },
        { name, sender: senderFor('RECOVERY_TRAUMA') }
      );
    }
    if (/(porn|إباحية|recovery|تعافي)/.test(p)) {
      return this.sendTemplate(
        templateFor(BREVO_TEMPLATES.RECOVERY_PORN, locale), email,
        { NAME: name, PRODUCT: productName },
        { name, sender: senderFor('RECOVERY_PORN') }
      );
    }
    // default: Basic plan
    return this.sendTemplate(
      templateFor(BREVO_TEMPLATES.CODE_BASIC, locale), email,
      { NAME: name, CODE: accessKey, PRODUCT: productName },
      { name, sender: senderFor('CODE_BASIC') }
    );
  },
};

// ============================================
// LISTS API
// ============================================

export const BrevoLists = {
  async getAll(): Promise<BrevoList[]> {
    const { data, error } = await brevoFetch<{ lists: BrevoList[] }>('/contacts/lists');
    if (error || !data) return [];
    return data.lists || [];
  },
};

// ============================================
// ACCOUNT API
// ============================================

export const BrevoAccount = {
  async getInfo(): Promise<{ email?: string; firstName?: string; lastName?: string; error?: string }> {
    const { data, error } = await brevoFetch<{ email: string; firstName: string; lastName: string }>('/account');
    if (error) return { error };
    return data || {};
  },

  isConfigured(): boolean {
    return Boolean(BREVO_API_KEY);
  },
};

// ============================================
// EXPORT DEFAULT
// ============================================

const BrevoClient = {
  contacts: BrevoContacts,
  emails: BrevoEmails,
  lists: BrevoLists,
  account: BrevoAccount,
  LISTS: BREVO_LISTS,
  TEMPLATES: BREVO_TEMPLATES,
  SENDERS: BREVO_SENDERS,
};

export default BrevoClient;
