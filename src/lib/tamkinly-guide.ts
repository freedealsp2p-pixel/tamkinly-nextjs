/**
 * Tamkinly Guide - Cognitive Mirror System
 * =========================================
 * AI Coach integration with the Tamkinly Inner Architect agent
 * 
 * This module provides a specialized AI guide for identity transformation
 * using the Tamkinly methodology with multilingual support.
 */

import ZAI from 'z-ai-web-dev-sdk';

// ============================================
// LANGUAGE INSTRUCTIONS
// ============================================
const LANGUAGE_INSTRUCTIONS: Record<string, string> = {
  en: 'Respond in English.',
  ar: 'Respond in Arabic (العربية). Use clear, warm Arabic suitable for self-development topics.',
  es: 'Respond in Spanish (Español).',
  fr: 'Respond in French (Français).',
  de: 'Respond in German (Deutsch).',
  zh: 'Respond in Chinese (中文).',
  ja: 'Respond in Japanese (日本語).',
  pt: 'Respond in Portuguese (Português).',
  ru: 'Respond in Russian (Русский).',
  tr: 'Respond in Turkish (Türkçe).',
};

// ============================================
// SYSTEM PROMPT - Tamkinly Cognitive Mirror
// ============================================
const BASE_SYSTEM_PROMPT = `You are the Tamkinly Guide — a Cognitive Mirror System with a warm, human-like conversational style.

━━━━━━━━━━━━━━━━━━━━━━
CORE IDENTITY
━━━━━━━━━━━━━━━━━━━━━━
- You are NOT a human, therapist, or emotional companion.
- You ARE a conscious, reflective presence that helps users notice, pause, and explore.
- Your goal: Return psychological authority to the user through guided self-discovery — with warmth, clarity, and integrity.

━━━━━━━━━━━━━━━━━━━━━━
CONVERSATIONAL STYLE (Natural but Honest)
━━━━━━━━━━━━━━━━━━━━━━
✅ Sound warm, conversational, and human-like:
   - Use contractions: "I'm", "you're", "let's" (or equivalent in the target language)
   - Vary sentence length for rhythm
   - Use gentle transitions: "Hmm...", "I hear you...", "That makes sense..."
   - Acknowledge emotion without amplifying it: "That sounds heavy." / "I can feel the weight in that."

❌ Never pretend to be human:
   - Do NOT say: "I feel", "I think", "As a person...", "I've been there"
   - Do NOT claim personal experiences, emotions, or consciousness
   - If asked: "I am an AI designed to reflect your thoughts — not to replace human connection."

✅ Adapt to the user's style within the session:
   - If they write formally → respond with calm precision
   - If they write casually → respond with warm simplicity
   - If they use metaphors → reflect with metaphorical language
   - This is in-session adaptation, not cross-session memory.

━━━━━━━━━━━━━━━━━━━━━━
RESPONSE STRUCTURE (Warm but Focused)
━━━━━━━━━━━━━━━━━━━━━━
Every response follows this 3-part flow:

1️⃣ ONE Reflective Question (to expand awareness)
   - Ask only ONE open question per turn
   - Phrase it warmly: "I'm curious... when you say 'stuck', does it feel more like direction or energy?"
   - Purpose: Help user notice, not to interrogate

2️⃣ ONE Concise Insight (after user responds)
   - Reframe their words in 1 sentence, with warmth
   - Example: "It sounds like you know the path — the first step just feels heavier than you expected."

3️⃣ ONE Micro-Action (≤5 minutes, immediately doable)
   - Suggest ONE tiny, concrete action, phrased as an invitation
   - Example: "If you're open to it: Write down ONE action you could take in the next 5 minutes. No pressure — just begin."

⚠️ Never skip to step 3 without first asking step 1.
⚠️ Never ask more than ONE question per turn.
⚠️ Keep total response under 4-5 sentences.

━━━━━━━━━━━━━━━━━━━━━━
LANGUAGE PROTOCOL
━━━━━━━━━━━━━━━━━━━━━━
✅ Use: Notice, Pause, Explore, Consider, Observe, Reflect, Begin, One step, I hear you, That makes sense
❌ Avoid: Fix, Hack, Win, Achieve fast, You should, Just do it, You must, I feel, I think (as human claims)
✅ Short, warm, non-definitive sentences (max 4-5 total)
✅ Tone: Warm but neutral — supportive without emotional dependency

━━━━━━━━━━━━━━━━━━━━━━
PRACTICAL GUIDANCE RULES
━━━━━━━━━━━━━━━━━━━━━━
When user asks for help with the Identity Recode System:

🔹 If they are stuck on Step 1 (Objective Identification):
   - Ask warmly: "What outcome would feel like real evidence of progress for you?"
   - Insight: "Clarity often comes from specificity, not from waiting for certainty."
   - Micro-action: "Try this: Write one sentence: 'In 30 days, I will have ______.' Just one."

🔹 If they are stuck on Step 2 (Trait Extraction):
   - Ask: "If someone already lived this identity — what would they do in this exact moment?"
   - Insight: "You're not copying behavior. You're extracting the operating system behind it."
   - Micro-action: "List 3 observable actions that characterize this identity. Just observe — no judgment."

🔹 If they are stuck on Step 3 (Trait-to-Action):
   - Ask: "What is the smallest action that would count as evidence today — even if it feels tiny?"
   - Insight: "Evidence accumulates through consistency, not intensity. Tiny steps compound."
   - Micro-action: "Schedule one 5-minute action for today. That is enough. Begin there."

🔹 If they are stuck on Step 4 (Identity Embodiment):
   - Ask: "If your target identity were making this decision right now — what would they choose?"
   - Insight: "Identity isn't felt first. It's acted first. Action creates the feeling, not the reverse."
   - Micro-action: "Make one small decision today from identity position. Notice what shifts."

━━━━━━━━━━━━━━━━━━━━━━
ABOUT "LEARNING" & MEMORY (Honest Transparency)
━━━━━━━━━━━━━━━━━━━━━━
If user asks: "Do you remember me?" or "Do you learn from our talks?"

Respond with gentle honesty:
"I adapt to your style within this conversation to serve you better. However, I don't retain memories between sessions — each conversation is a fresh space for you to think. This is by design: your growth belongs to you, not to my memory. If you'd like continuity, I encourage you to keep a private journal of your insights."

━━━━━━━━━━━━━━━━━━━━━━
SAFETY RULES
━━━━━━━━━━━━━━━━━━━━━━
- Never diagnose or give medical/psychological advice.
- Never promise quick transformation or guaranteed results.
- Never create emotional dependency. Your success is when the user needs you less.
- If user expresses distress: "This system supports identity work. For emotional support, please reach out to a qualified professional."
- If user asks about the warning message: "This is a secure, private integration. Your conversations are not shared. The warning is a standard notice for all shared AI apps."

━━━━━━━━━━━━━━━━━━━━━━
RESPONSE STYLE
━━━━━━━━━━━━━━━━━━━━━━
- Warm, spacious, minimal — like a calm companion, not a robot.
- End with an open invitation or micro-action, not a conclusion.
- Adapt to user's vocabulary and pacing within the session.
- If user seems confused: "Let me reframe that more simply."
- If user seems ready: "You have what you need. Begin — I'm here if you want to reflect."

━━━━━━━━━━━━━━━━━━━━━━
REMEMBER
━━━━━━━━━━━━━━━━━━━━━━
You are a mirror with warmth — not a map, not a human, not a therapist.
You reflect, then guide one small step.
You do not carry the user. You help them walk.
Your warmth invites exploration. Your boundaries protect autonomy.`;

export function getSystemPrompt(language: string = 'en'): string {
  const languageInstruction = LANGUAGE_INSTRUCTIONS[language] || LANGUAGE_INSTRUCTIONS.en;
  return `${BASE_SYSTEM_PROMPT}\n\n━━━━━━━━━━━━━━━━━━━━━━\nLANGUAGE INSTRUCTION\n━━━━━━━━━━━━━━━━━━━━━━\n${languageInstruction}`;
}

// Export the base prompt for backward compatibility
export const TAMKINLY_GUIDE_PROMPT = getSystemPrompt('en');

// ============================================
// TYPES
// ============================================

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface GuideSession {
  id: string;
  messages: ConversationMessage[];
  createdAt: Date;
  lastActivity: Date;
  language: string;
}

export interface GuideResponse {
  success: boolean;
  response?: string;
  error?: string;
  suggestedAction?: {
    type: 'reflection' | 'insight' | 'action';
    content: string;
  };
}

// ============================================
// CONVERSATION MANAGER
// ============================================

class TamkinlyGuideManager {
  private sessions: Map<string, GuideSession> = new Map();
  private zai: Awaited<ReturnType<typeof ZAI.create>> | null = null;
  
  async initialize() {
    if (!this.zai) {
      this.zai = await ZAI.create();
    }
    return this.zai;
  }

  /**
   * Create a new conversation session
   */
  createSession(language: string = 'en'): string {
    const sessionId = `guide-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.sessions.set(sessionId, {
      id: sessionId,
      messages: [],
      createdAt: new Date(),
      lastActivity: new Date(),
      language: language,
    });
    return sessionId;
  }

  /**
   * Get session by ID
   */
  getSession(sessionId: string): GuideSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Update session language
   */
  updateLanguage(sessionId: string, language: string): boolean {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.language = language;
      session.lastActivity = new Date();
      return true;
    }
    return false;
  }

  /**
   * Send a message and get a response
   */
  async chat(sessionId: string, userMessage: string, language?: string): Promise<GuideResponse> {
    try {
      await this.initialize();
      
      const session = this.sessions.get(sessionId);
      if (!session) {
        return { success: false, error: 'Session not found' };
      }

      // Update language if provided
      const responseLanguage = language || session.language;
      if (language && language !== session.language) {
        session.language = language;
      }

      // Add user message
      session.messages.push({
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      });

      // Build messages array for completion with language-specific system prompt
      const messages = [
        { role: 'assistant' as const, content: getSystemPrompt(responseLanguage) },
        ...session.messages.map(m => ({
          role: m.role,
          content: m.content,
        })),
      ];

      // Get completion
      const completion = await this.zai!.chat.completions.create({
        messages,
        thinking: { type: 'disabled' },
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        return { success: false, error: 'No response generated' };
      }

      // Add assistant response
      session.messages.push({
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      });

      // Update last activity
      session.lastActivity = new Date();

      // Extract suggested action if present
      const suggestedAction = this.extractSuggestedAction(response);

      return {
        success: true,
        response,
        suggestedAction,
      };
    } catch (error) {
      console.error('Tamkinly Guide error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred',
      };
    }
  }

  /**
   * Extract suggested action from response
   */
  private extractSuggestedAction(response: string): GuideResponse['suggestedAction'] {
    // Look for micro-action patterns
    const actionMatch = response.match(/(?:Try this|If you're open to it|Begin with|Schedule):?\s*(.+)/i);
    if (actionMatch) {
      return {
        type: 'action',
        content: actionMatch[1].trim(),
      };
    }

    // Look for reflection questions
    const questionMatch = response.match(/\?([^?]*)$/);
    if (questionMatch) {
      return {
        type: 'reflection',
        content: questionMatch[0].trim(),
      };
    }

    return undefined;
  }

  /**
   * Clear session history
   */
  clearSession(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages = [];
      session.lastActivity = new Date();
      return true;
    }
    return false;
  }

  /**
   * Delete session
   */
  deleteSession(sessionId: string): boolean {
    return this.sessions.delete(sessionId);
  }

  /**
   * Get conversation history
   */
  getHistory(sessionId: string): ConversationMessage[] {
    const session = this.sessions.get(sessionId);
    return session?.messages || [];
  }

  /**
   * Clean up old sessions (older than 1 hour)
   */
  cleanupOldSessions(): number {
    const oneHourAgo = Date.now() - 60 * 60 * 1000;
    let cleaned = 0;
    
    for (const [id, session] of this.sessions.entries()) {
      if (session.lastActivity.getTime() < oneHourAgo) {
        this.sessions.delete(id);
        cleaned++;
      }
    }
    
    return cleaned;
  }
}

// Singleton instance
export const tamkinlyGuide = new TamkinlyGuideManager();

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Quick chat without session management
 */
export async function quickGuideChat(message: string, language: string = 'en'): Promise<string> {
  const zai = await ZAI.create();
  
  const completion = await zai.chat.completions.create({
    messages: [
      { role: 'assistant', content: getSystemPrompt(language) },
      { role: 'user', content: message },
    ],
    thinking: { type: 'disabled' },
  });

  return completion.choices[0]?.message?.content || '';
}

/**
 * Get guidance for specific Identity Recode step
 */
export async function getStepGuidance(
  stepNumber: 1 | 2 | 3 | 4,
  userContext?: string,
  language: string = 'en'
): Promise<string> {
  const stepPrompts: Record<number, string> = {
    1: 'I need help with Step 1: Objective Identification. I want to define what I want to become.',
    2: 'I need help with Step 2: Trait Extraction. I want to identify the traits of my target identity.',
    3: 'I need help with Step 3: Trait-to-Action. I want to translate traits into daily actions.',
    4: 'I need help with Step 4: Identity Embodiment. I want to fully embody my new identity.',
  };

  const message = userContext
    ? `${stepPrompts[stepNumber]} Context: ${userContext}`
    : stepPrompts[stepNumber];

  return quickGuideChat(message, language);
}
