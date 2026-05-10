// ============================================
// BREVO (Sendinblue) API CLIENT
// Email Marketing & Automation Integration
// Tamkinly Identity Transformation Platform
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
    CUSTOMER_TYPE?: 'trial' | 'planner' | 'premium' | 'bundle';
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
// TEMPLATE IDs - From your Brevo Account
// ============================================

export const BREVO_TEMPLATES = {
  // Welcome & Onboarding
  WELCOME: 1,                    // "Welcome To Tamkinly" #1
  
  // Product Purchases
  TRIAL_PURCHASE: 2,             // "7 Days Identity System Trial" #2
  PLANNER_PURCHASE: 3,           // "Planner Purchase" #3
  PREMIUM_PURCHASE: 4,           // "Premium Purchase" #4
  BUNDLE_PURCHASE: 5,            // "Bundle Purchase (VIP)" #5
  
  // General Follow-ups
  FOLLOWUP_DAY_3: 6,             // "Follow-up Day 3" #6
  FOLLOWUP_DAY_7: 7,             // "Follow-up Day 7" #7
  FOLLOWUP_DAY_14: 8,            // "Follow-up Day 14 - Upgrade Offer" #8
  
  // Abandoned Cart
  ABANDONED_CART_1H: 9,          // "Abandoned Cart 1 Hour" #9
  ABANDONED_CART_24H: 10,        // "Abandoned Cart 24" #10
  
  // Account Management
  ACCOUNT_CREATED: 11,           // "Account Created" #11
  PASSWORD_RESET: 12,            // "Password Reset" #12
  EMAIL_VERIFICATION: 14,        // "Email Verification" #14
  
  // Support
  SUPPORT_RECEIVED: 15,          // "Support Ticket Received" #15
  SUPPORT_RESOLVED: 16,          // "Support Resolved" #16
  
  // Special Offers
  SPECIAL_OFFER: 17,             // "Special Offer" #17
  BIRTHDAY_OFFER: 18,            // "Birthday Offer" #18
  
  // Trial Follow-ups
  TRIAL_FOLLOWUP_DAY_3: 19,      // "Trial Follow-up Day 3" #19
  TRIAL_FOLLOWUP_DAY_7: 20,      // "Trial Follow-up Day 7" #20
  
  // Planner Follow-ups
  PLANNER_FOLLOWUP_DAY_3: 22,    // "Planner Follow-up Day 3" #22
  PLANNER_FOLLOWUP_DAY_7: 23,    // "Planner Follow-up Day 7" #23
  PLANNER_FOLLOWUP_DAY_14: 24,   // "Planner Follow-up Day 14" #24
  
  // Premium Follow-ups
  PREMIUM_FOLLOWUP_DAY_3: 25,    // "Premium Follow-up Day 3" #25
  PREMIUM_FOLLOWUP_DAY_7: 26,    // "Premium Follow-up Day 7" #26
  
  // Bundle Follow-ups
  BUNDLE_FOLLOWUP_DAY_3: 28,     // "Bundle Follow-up Day 3" #28
  BUNDLE_FOLLOWUP_DAY_7: 29,     // "Bundle Follow-up Day 7" #29
  BUNDLE_FOLLOWUP_DAY_14: 30,    // "Bundle Follow-up Day 14" #30

  // ============================================
  // NEW TEMPLATE IDs (Drip Sequence Templates)
  // ============================================

  // Quiz Results
  QUIZ_RESULTS: 31,              // "Quiz Results" #31

  // Identity Milestones
  MILESTONE_DAY_7: 32,           // "Milestone Day 7" #32
  MILESTONE_DAY_14: 33,          // "Milestone Day 14" #33
  MILESTONE_DAY_21: 34,          // "Milestone Day 21" #34
  MILESTONE_DAY_30: 35,          // "Milestone Day 30" #35

  // Re-engagement
  RE_ENGAGEMENT: 36,             // "Re-Engagement" #36
  RE_ENGAGEMENT_FOLLOWUP: 37,    // "Re-Engagement Follow-up" #37
  RE_ENGAGEMENT_OFFER: 38,       // "Re-Engagement Final Offer" #38

  // Purchase Confirmation (unified)
  PURCHASE_CONFIRMATION: 39,     // "Purchase Confirmation" #39

  // Abandoned Cart (branded versions)
  ABANDONED_CART_1H_BRANDED: 40, // "Abandoned Cart 1H Branded" #40
  ABANDONED_CART_24H_BRANDED: 41,// "Abandoned Cart 24H Branded" #41
} as const;

// List IDs
export const BREVO_LISTS = {
  ALL_CONTACTS: parseInt(process.env.BREVO_LIST_ALL || '1'),
  CUSTOMERS: parseInt(process.env.BREVO_LIST_CUSTOMERS || '2'),
  TRIAL_USERS: parseInt(process.env.BREVO_LIST_TRIAL || '3'),
  QUIZ_TAKERS: parseInt(process.env.BREVO_LIST_QUIZ || '4'),
  NEWSLETTER: parseInt(process.env.BREVO_LIST_NEWSLETTER || '5'),
  PREMIUM_CUSTOMERS: parseInt(process.env.BREVO_LIST_PREMIUM || '6'),
  BUNDLE_VIP: parseInt(process.env.BREVO_LIST_BUNDLE || '7'),
  INACTIVE_USERS: parseInt(process.env.BREVO_LIST_INACTIVE || '8'),
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

    const data = await response.json();

    if (!response.ok) {
      console.error('Brevo API Error:', data);
      return { error: data.message || `HTTP ${response.status}` };
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
        subject: email.subject,
        htmlContent: email.htmlContent,
        textContent: email.textContent,
        replyTo: email.replyTo,
        tags: email.tags,
        headers: email.headers,
        templateId: email.templateId,
        params: email.params,
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
    options?: { name?: string; replyTo?: string }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.send({
      to: [{ email: to, name: options?.name }],
      sender: { name: DEFAULT_SENDER_NAME, email: DEFAULT_SENDER_EMAIL },
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
  // WELCOME EMAIL (Template #1)
  // ============================================
  async sendWelcome(
    email: string,
    name: string,
    accessKey?: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.WELCOME, email, {
      NAME: name,
      ACCESS_KEY: accessKey || '',
    }, { name });
  },

  // ============================================
  // TRIAL PURCHASE EMAIL (Template #2)
  // ============================================
  async sendTrialPurchase(
    email: string,
    name: string,
    accessKey: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.TRIAL_PURCHASE, email, {
      NAME: name,
      ACCESS_KEY: accessKey,
      PRODUCT_NAME: '7-Day Identity System',
      DOWNLOAD_LINK: `${BASE_URL}/my-account/downloads/`,
      APPS_LINK: `${BASE_URL}/apps/?code=${accessKey}`,
    }, { name });
  },

  // ============================================
  // PLANNER PURCHASE EMAIL (Template #3)
  // ============================================
  async sendPlannerPurchase(
    email: string,
    name: string,
    accessKey: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.PLANNER_PURCHASE, email, {
      NAME: name,
      ACCESS_KEY: accessKey,
      PRODUCT_NAME: 'Identity Recode Planner',
      DOWNLOAD_LINK: `${BASE_URL}/my-account/downloads/`,
      APPS_LINK: `${BASE_URL}/apps/?code=${accessKey}`,
    }, { name });
  },

  // ============================================
  // PREMIUM PURCHASE EMAIL (Template #4)
  // ============================================
  async sendPremiumPurchase(
    email: string,
    name: string,
    accessKey: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.PREMIUM_PURCHASE, email, {
      NAME: name,
      ACCESS_KEY: accessKey,
      PRODUCT_NAME: 'Premium Transformation Package',
      DOWNLOAD_LINK: `${BASE_URL}/my-account/downloads/`,
      APPS_LINK: `${BASE_URL}/apps/?code=${accessKey}`,
    }, { name });
  },

  // ============================================
  // BUNDLE PURCHASE EMAIL (Template #5)
  // ============================================
  async sendBundlePurchase(
    email: string,
    name: string,
    accessKey: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.BUNDLE_PURCHASE, email, {
      NAME: name,
      ACCESS_KEY: accessKey,
      PRODUCT_NAME: 'Complete Bundle (VIP)',
      DOWNLOAD_LINK: `${BASE_URL}/my-account/downloads/`,
      APPS_LINK: `${BASE_URL}/apps/?code=${accessKey}`,
    }, { name });
  },

  // ============================================
  // FOLLOW-UP EMAILS
  // ============================================
  async sendFollowUp(
    email: string,
    name: string,
    day: 3 | 7 | 14,
    productType: 'trial' | 'planner' | 'premium' | 'bundle' | 'general'
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    let templateId: number;
    
    switch (productType) {
      case 'trial':
        templateId = day === 3 ? BREVO_TEMPLATES.TRIAL_FOLLOWUP_DAY_3 : BREVO_TEMPLATES.TRIAL_FOLLOWUP_DAY_7;
        break;
      case 'planner':
        templateId = day === 3 
          ? BREVO_TEMPLATES.PLANNER_FOLLOWUP_DAY_3 
          : day === 7 
            ? BREVO_TEMPLATES.PLANNER_FOLLOWUP_DAY_7 
            : BREVO_TEMPLATES.PLANNER_FOLLOWUP_DAY_14;
        break;
      case 'premium':
        templateId = day === 3 ? BREVO_TEMPLATES.PREMIUM_FOLLOWUP_DAY_3 : BREVO_TEMPLATES.PREMIUM_FOLLOWUP_DAY_7;
        break;
      case 'bundle':
        templateId = day === 3 
          ? BREVO_TEMPLATES.BUNDLE_FOLLOWUP_DAY_3 
          : day === 7 
            ? BREVO_TEMPLATES.BUNDLE_FOLLOWUP_DAY_7 
            : BREVO_TEMPLATES.BUNDLE_FOLLOWUP_DAY_14;
        break;
      default:
        templateId = day === 3 
          ? BREVO_TEMPLATES.FOLLOWUP_DAY_3 
          : day === 7 
            ? BREVO_TEMPLATES.FOLLOWUP_DAY_7 
            : BREVO_TEMPLATES.FOLLOWUP_DAY_14;
    }

    return this.sendTemplate(templateId, email, {
      NAME: name,
      DAYS_SINCE_PURCHASE: day,
      APPS_LINK: `${BASE_URL}/apps/`,
    }, { name });
  },

  // ============================================
  // ABANDONED CART
  // ============================================
  async sendAbandonedCart(
    email: string,
    name: string,
    hoursAgo: 1 | 24 = 1
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const templateId = hoursAgo === 1 
      ? BREVO_TEMPLATES.ABANDONED_CART_1H 
      : BREVO_TEMPLATES.ABANDONED_CART_24H;

    return this.sendTemplate(templateId, email, {
      NAME: name,
    }, { name });
  },

  // ============================================
  // QUIZ RESULTS (Template #31)
  // ============================================
  async sendQuizResults(
    email: string,
    name: string,
    quizType: string,
    score: number,
    insights?: string[]
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.QUIZ_RESULTS, email, {
      NAME: name,
      QUIZ_TYPE: quizType,
      QUIZ_SCORE: score,
      INSIGHTS: insights ? insights.join('; ') : '',
      APPS_LINK: `${BASE_URL}/apps/`,
    }, { name });
  },

  // ============================================
  // IDENTITY MILESTONE (Templates #32-35)
  // ============================================
  async sendIdentityMilestone(
    email: string,
    name: string,
    day: 7 | 14 | 21 | 30
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const milestoneTemplates: Record<number, number> = {
      7: BREVO_TEMPLATES.MILESTONE_DAY_7,
      14: BREVO_TEMPLATES.MILESTONE_DAY_14,
      21: BREVO_TEMPLATES.MILESTONE_DAY_21,
      30: BREVO_TEMPLATES.MILESTONE_DAY_30,
    };

    const templateId = milestoneTemplates[day] || BREVO_TEMPLATES.MILESTONE_DAY_7;

    return this.sendTemplate(templateId, email, {
      NAME: name,
      MILESTONE_DAY: day,
      APPS_LINK: `${BASE_URL}/apps/`,
    }, { name });
  },

  // ============================================
  // RE-ENGAGEMENT (Template #36)
  // ============================================
  async sendReEngagement(
    email: string,
    name: string,
    inactiveDays: number = 7
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.RE_ENGAGEMENT, email, {
      NAME: name,
      INACTIVE_DAYS: inactiveDays,
      APPS_LINK: `${BASE_URL}/apps/`,
    }, { name });
  },

  // ============================================
  // ACCOUNT MANAGEMENT
  // ============================================
  async sendAccountCreated(
    email: string,
    name: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.ACCOUNT_CREATED, email, {
      NAME: name,
      LOGIN_LINK: `${BASE_URL}/login/`,
    }, { name });
  },

  async sendPasswordReset(
    email: string,
    name: string,
    resetLink: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.PASSWORD_RESET, email, {
      NAME: name,
      RESET_LINK: resetLink,
    }, { name });
  },

  async sendEmailVerification(
    email: string,
    name: string,
    verifyLink: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.EMAIL_VERIFICATION, email, {
      NAME: name,
      VERIFY_LINK: verifyLink,
    }, { name });
  },

  // ============================================
  // SUPPORT EMAILS
  // ============================================
  async sendSupportReceived(
    email: string,
    name: string,
    ticketId: string,
    subject: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.SUPPORT_RECEIVED, email, {
      NAME: name,
      SUPPORT_TICKET_ID: ticketId,
      SUPPORT_SUBJECT: subject,
    }, { name });
  },

  async sendSupportResolved(
    email: string,
    name: string,
    ticketId: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.SUPPORT_RESOLVED, email, {
      NAME: name,
      SUPPORT_TICKET_ID: ticketId,
    }, { name });
  },

  // ============================================
  // SPECIAL OFFERS
  // ============================================
  async sendSpecialOffer(
    email: string,
    name: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.SPECIAL_OFFER, email, {
      NAME: name,
    }, { name });
  },

  async sendBirthdayOffer(
    email: string,
    name: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    return this.sendTemplate(BREVO_TEMPLATES.BIRTHDAY_OFFER, email, {
      NAME: name,
    }, { name });
  },

  // ============================================
  // GENERIC PURCHASE (auto-selects template)
  // ============================================
  async sendPurchaseConfirmation(
    email: string,
    name: string,
    productName: string,
    accessKey: string
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    const productLower = productName.toLowerCase();
    
    if (productLower.includes('trial') || productLower.includes('7 day')) {
      return this.sendTrialPurchase(email, name, accessKey);
    }
    if (productLower.includes('planner')) {
      return this.sendPlannerPurchase(email, name, accessKey);
    }
    if (productLower.includes('premium')) {
      return this.sendPremiumPurchase(email, name, accessKey);
    }
    if (productLower.includes('bundle') || productLower.includes('vip')) {
      return this.sendBundlePurchase(email, name, accessKey);
    }
    
    return this.sendWelcome(email, name, accessKey);
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
};

export default BrevoClient;
