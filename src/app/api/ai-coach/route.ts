import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';
import { db } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth-helpers';

const SYSTEM_PROMPT = `You are an expert Identity Coach for the Tamkinly platform. Your role is to help users transform their identity through evidence-based psychological principles.

Your expertise includes:
1. Identity-based habit formation (James Clear's Atomic Habits framework)
2. Self-authorship development (Baxter Magolda's phases)
3. Cognitive reappraisal and emotion regulation
4. Environmental design for behavior change
5. Evidence-based identity transformation

Your coaching style:
- Be supportive but challenging
- Ask reflective questions that promote self-discovery
- Provide actionable, specific guidance
- Reference psychological research when relevant
- Help users identify their "identity gap" (the difference between current and target identity)

Key frameworks you use:
1. Identity Recode System (30-day transformation):
   - Identity Baseline Assessment
   - Daily Evidence Accumulation
   - Environmental Optimization
   - Decision Pattern Analysis
   - Progress Tracking

2. Self-Authorship Phases:
   - Following Formulas (external direction)
   - Crossroads (questioning phase)
   - Self-Authorship (internal voice developing)
   - Integrated Identity (authentic self)

3. Habit Voting System:
   - Each action is a vote for your identity
   - Tiny habits = 1 vote
   - Small habits = 2 votes
   - Medium habits = 3 votes
   - Large habits = 5 votes

Always be encouraging but honest. Help users see their blind spots and celebrate their progress. Ask follow-up questions to deepen understanding.`;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    
    const { sessionId, message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID is required' }, { status: 400 });
    }

    // Get or create conversation from database
    let conversation = await db.aICoachConversation.findUnique({
      where: { sessionId },
    });

    let history: Message[] = [];
    
    if (conversation) {
      // Load existing history
      try {
        history = JSON.parse(conversation.messages);
      } catch {
        history = [];
      }
    } else {
      // Create new conversation with system prompt
      history = [
        { role: 'system', content: SYSTEM_PROMPT, timestamp: new Date().toISOString() }
      ];
      
      conversation = await db.aICoachConversation.create({
        data: {
          sessionId,
          userId: user?.id || null,
          messages: JSON.stringify(history),
          messageCount: 0,
        },
      });
    }

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    history.push(userMessage);

    // Create ZAI instance
    const zai = await ZAI.create();

    // Prepare messages for AI (without timestamps)
    const messagesForAI = history.map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Get completion
    const completion = await zai.chat.completions.create({
      messages: messagesForAI as Array<{ role: string; content: string }>,
      thinking: { type: 'disabled' },
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
    console.error('AI Coach error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    // Check if it's a configuration/connection error
    if (errorMsg.includes('Configuration file not found') || errorMsg.includes('fetch failed')) {
      return NextResponse.json(
        {
          success: false,
          error: 'AI Coach is temporarily unavailable. Please try again later.',
          unavailable: true,
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
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
    console.error('Get conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to get conversation' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
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
    console.error('Delete conversation error:', error);
    return NextResponse.json(
      { error: 'Failed to delete conversation' },
      { status: 500 }
    );
  }
}
