import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';

// ============================================
// Tamkinly AI Coach — Groq API + Config File
// Version: 6.0 — 2 free questions + PREMIUM/MASTERY access
// ============================================

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Cache the system prompt in memory
let cachedSystemPrompt: string | null = null;
let systemPromptLoadTime = 0;
const SYSTEM_PROMPT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Free question limit per session
const MAX_FREE_MESSAGES = 4; // 2 user messages + 2 AI responses = 2 conversation turns

async function getSystemPrompt(): Promise<string> {
  const now = Date.now();
  if (cachedSystemPrompt && (now - systemPromptLoadTime) < SYSTEM_PROMPT_CACHE_TTL) {
    return cachedSystemPrompt;
  }
  try {
    const configPath = join(process.cwd(), 'config', 'coach-config.md');
    const fileContent = await readFile(configPath, 'utf-8');
    const promptLines = fileContent
      .split('\n')
      .filter(line => !line.startsWith('#'))
      .join('\n')
      .trim();
    cachedSystemPrompt = promptLines;
    systemPromptLoadTime = now;
    console.log('[AI Coach] System prompt loaded from config file (' + promptLines.length + ' chars)');
    return cachedSystemPrompt;
  } catch (error) {
    console.error('[AI Coach] Failed to load config file:', error);
    const fallbackPrompt = `You are Tamkinly, a personal identity transformation coach. You help visitors understand and apply the Tamkinly system. You are warm, precise, and evidence-based. You speak the user's language. You never use hype or pressure. You help people close the gap between who they are and who they are becoming.`;
    if (!cachedSystemPrompt) {
      cachedSystemPrompt = fallbackPrompt;
      systemPromptLoadTime = now;
    }
    return cachedSystemPrompt;
  }
}

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

const MAX_HISTORY_MESSAGES = 20;

/**
 * Verify conversation ownership to prevent IDOR
 */
function verifyConversationOwnership(conversation: { userId: string | null } | null, user: { id: string } | null): boolean {
  if (!conversation) return true; // New conversation, allowed
  if (!conversation.userId) return true; // Unclaimed conversation, allowed
  if (!user) return false; // Anonymous trying to access claimed conversation
  return conversation.userId === user.id;
}

/**
 * Verify if an access code is valid and has PREMIUM+ tier
 */
async function verifyAccessCode(code: string): Promise<{ valid: boolean; tier?: string; error?: string }> {
  try {
    const access = await db.appAccess.findUnique({
      where: { code: code.toUpperCase() },
    });
    if (!access) {
      return { valid: false, error: 'Invalid access code' };
    }
    if (access.expiresAt && new Date() > access.expiresAt) {
      return { valid: false, error: 'Access code has expired' };
    }
    if (!access.isActive) {
      return { valid: false, error: 'Access code is no longer active' };
    }
    // Update usage
    await db.appAccess.update({
      where: { id: access.id },
      data: {
        isUsed: true,
        usedAt: access.usedAt || new Date(),
        lastUsedAt: new Date(),
        usageCount: { increment: 1 },
      },
    });
    return { valid: true, tier: access.tier };
  } catch (error) {
    console.error('[AI Coach] Access code verification error:', error);
    return { valid: false, error: 'Verification failed' };
  }
}

/**
 * Check if user has PREMIUM+ access (via auth session or access code)
 */
async function hasPremiumAccess(user: Awaited<ReturnType<typeof getCurrentUser>>, accessCode?: string): Promise<{ hasAccess: boolean; tier?: string }> {
  // Check access code first
  if (accessCode) {
    const result = await verifyAccessCode(accessCode);
    if (result.valid) {
      const TIER_HIERARCHY: Record<string, number> = { FREE: 0, BASIC: 1, PREMIUM: 3, MASTERY: 4 };
      const tierLevel = TIER_HIERARCHY[result.tier || 'FREE'] || 0;
      if (tierLevel >= TIER_HIERARCHY['PREMIUM']) {
        return { hasAccess: true, tier: result.tier };
      }
    }
  }
  
  // Check user session
  if (user?.accessTier) {
    const TIER_HIERARCHY: Record<string, number> = { FREE: 0, BASIC: 1, PREMIUM: 3, MASTERY: 4 };
    const userTierLevel = TIER_HIERARCHY[user.accessTier] || 0;
    if (userTierLevel >= TIER_HIERARCHY['PREMIUM']) {
      return { hasAccess: true, tier: user.accessTier };
    }
  }
  
  return { hasAccess: false };
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { sessionId, message, accessCode } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const systemPrompt = await getSystemPrompt();

    // Get or create conversation
    let conversation = await db.aICoachConversation.findUnique({
      where: { sessionId },
    });

    // Verify ownership of existing conversation
    if (conversation && !verifyConversationOwnership(conversation, user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let history: Message[] = [];
    if (conversation) {
      try {
        history = JSON.parse(conversation.messages);
      } catch {
        history = [];
      }
    } else {
      conversation = await db.aICoachConversation.create({
        data: {
          sessionId,
          userId: user?.id || null,
          messages: JSON.stringify([]),
          messageCount: 0,
        },
      });
    }

    // Count user messages (not system) to determine free usage
    const userMessageCount = history.filter(m => m.role === 'user').length;

    // Check access: after 2 free user messages, require access
    if (userMessageCount >= 2) {
      const access = await hasPremiumAccess(user, accessCode);
      if (!access.hasAccess) {
        return NextResponse.json({
          success: false,
          freeLimitReached: true,
          freeMessagesUsed: userMessageCount,
          maxFreeMessages: 2,
          message: 'You have used your 2 free questions. Get Premium ($17/mo) or Mastery ($27/mo) to continue.',
          redirectUrl: '/products',
        }, { status: 403 });
      }
    }

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    history.push(userMessage);

    const recentHistory = history.slice(-MAX_HISTORY_MESSAGES);
    const messagesForAI = [
      { role: 'system' as const, content: systemPrompt },
      ...recentHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    const completion = await groq.chat.completions.create({
      messages: messagesForAI,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 0.9,
    });

    const aiResponse = completion.choices[0]?.message?.content;
    if (!aiResponse) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 });
    }

    const assistantMessage: Message = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    };
    history.push(assistantMessage);

    await db.aICoachConversation.update({
      where: { sessionId },
      data: {
        messages: JSON.stringify(history),
        messageCount: history.filter(m => m.role !== 'system').length,
        lastMessageAt: new Date(),
        userId: user?.id || undefined,
      },
    });

    const newUserMessageCount = history.filter(m => m.role === 'user').length;
    const remainingFree = Math.max(0, 2 - newUserMessageCount);

    return NextResponse.json({
      success: true,
      response: aiResponse,
      messageCount: history.filter(m => m.role !== 'system').length,
      freeMessagesRemaining: remainingFree,
      freeLimitReached: newUserMessageCount >= 2,
    });
  } catch (error) {
    console.error('[AI Coach] Error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMsg.includes('API key') || errorMsg.includes('authentication')) {
      return NextResponse.json({ success: false, error: 'AI Coach configuration error. Please contact support.', unavailable: true }, { status: 503 });
    }
    if (errorMsg.includes('rate limit') || errorMsg.includes('quota')) {
      return NextResponse.json({ success: false, error: 'AI Coach is busy right now. Please try again in a moment.', unavailable: true }, { status: 429 });
    }
    
    return NextResponse.json({ success: false, error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    const conversation = await db.aICoachConversation.findUnique({
      where: { sessionId },
    });

    if (!conversation) {
      return NextResponse.json({ success: true, messages: [], messageCount: 0, freeMessagesRemaining: 2 });
    }

    if (!verifyConversationOwnership(conversation, user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const messages: Message[] = JSON.parse(conversation.messages);
    const userMessageCount = messages.filter(m => m.role === 'user').length;
    const remainingFree = Math.max(0, 2 - userMessageCount);

    return NextResponse.json({
      success: true,
      messages: messages.filter(m => m.role !== 'system'),
      messageCount: conversation.messageCount,
      userId: user?.id,
      freeMessagesRemaining: remainingFree,
      freeLimitReached: userMessageCount >= 2,
    });
  } catch (error) {
    console.error('[AI Coach] GET error:', error);
    return NextResponse.json({ error: 'Failed to get conversation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Verify ownership before deleting
    const conversation = await db.aICoachConversation.findUnique({
      where: { sessionId },
    });
    if (conversation && !verifyConversationOwnership(conversation, user)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await db.aICoachConversation.delete({ where: { sessionId } }).catch(() => {});
    return NextResponse.json({ success: true, message: 'Conversation cleared' });
  } catch (error) {
    console.error('[AI Coach] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete conversation' }, { status: 500 });
  }
}
