import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';

// ============================================
// Tamkinly AI Coach — Groq API + Config File
// Version: 4.0
// ============================================

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Cache the system prompt in memory (read once, reuse)
let cachedSystemPrompt: string | null = null;
let systemPromptLoadTime = 0;
const SYSTEM_PROMPT_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Load system prompt from config file with caching
 */
async function getSystemPrompt(): Promise<string> {
  const now = Date.now();
  
  // Return cached prompt if still fresh
  if (cachedSystemPrompt && (now - systemPromptLoadTime) < SYSTEM_PROMPT_CACHE_TTL) {
    return cachedSystemPrompt;
  }

  try {
    const configPath = join(process.cwd(), 'config', 'coach-config.md');
    const fileContent = await readFile(configPath, 'utf-8');
    
    // Extract only the prompt content (skip comment lines starting with #)
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
    
    // Fallback to a minimal prompt if file is not found
    const fallbackPrompt = `You are Tamkinly (تَمكينلي), a personal identity transformation coach. You help visitors understand and apply the Tamkinly system. You are warm, precise, and evidence-based. You speak the user\'s language. You never use hype or pressure. You help people close the gap between who they are and who they are becoming.`;
    
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

// Maximum conversation history to send to AI (to stay within token limits)
const MAX_HISTORY_MESSAGES = 20;

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    const { sessionId, message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Get the system prompt
    const systemPrompt = await getSystemPrompt();

    // Get or create conversation from database
    let conversation = await db.aICoachConversation.findUnique({
      where: { sessionId },
    });

    let history: Message[] = [];
    
    if (conversation) {
      try {
        history = JSON.parse(conversation.messages);
      } catch {
        history = [];
      }
    } else {
      // Create new conversation
      conversation = await db.aICoachConversation.create({
        data: {
          sessionId,
          userId: user?.id || null,
          messages: JSON.stringify([]),
          messageCount: 0,
        },
      });
    }

    // Add user message to history
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    history.push(userMessage);

    // Prepare messages for Groq API
    // Take only recent messages to stay within token limits
    const recentHistory = history.slice(-MAX_HISTORY_MESSAGES);
    
    const messagesForAI = [
      { role: 'system' as const, content: systemPrompt },
      ...recentHistory.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    ];

    // Call Groq API
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

    // Add AI response to history
    const assistantMessage: Message = {
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date().toISOString(),
    };
    history.push(assistantMessage);

    // Update conversation in database
    await db.aICoachConversation.update({
      where: { sessionId },
      data: {
        messages: JSON.stringify(history),
        messageCount: history.filter(m => m.role !== 'system').length,
        lastMessageAt: new Date(),
        userId: user?.id || undefined,
      },
    });

    return NextResponse.json({
      success: true,
      response: aiResponse,
      messageCount: history.filter(m => m.role !== 'system').length,
    });
  } catch (error) {
    console.error('[AI Coach] Error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    
    if (errorMsg.includes('API key') || errorMsg.includes('authentication')) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI Coach configuration error. Please contact support.',
          unavailable: true,
        },
        { status: 503 }
      );
    }
    
    if (errorMsg.includes('rate limit') || errorMsg.includes('quota')) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI Coach is busy right now. Please try again in a moment.',
          unavailable: true,
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    );
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
      return NextResponse.json({
        success: true,
        messages: [],
        messageCount: 0,
      });
    }

    const messages: Message[] = JSON.parse(conversation.messages);

    return NextResponse.json({
      success: true,
      messages: messages.filter(m => m.role !== 'system'),
      messageCount: conversation.messageCount,
      userId: user?.id,
    });
  } catch (error) {
    console.error('[AI Coach] GET error:', error);
    return NextResponse.json(
      { error: 'Failed to get conversation' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await getCurrentUser();
    
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    await db.aICoachConversation.delete({
      where: { sessionId },
    }).catch(() => {
      // Ignore if not found
    });

    return NextResponse.json({ success: true, message: 'Conversation cleared' });
  } catch (error) {
    console.error('[AI Coach] DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    );
  }
}

