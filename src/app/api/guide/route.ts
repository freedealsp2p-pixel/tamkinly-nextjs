import { NextRequest, NextResponse } from 'next/server';
import { tamkinlyGuide, quickGuideChat, getStepGuidance } from '@/lib/tamkinly-guide';

/**
 * Tamkinly Guide API
 * ===================
 * POST /api/guide/chat - Send a message to the guide
 * POST /api/guide/session - Create a new session
 * GET /api/guide/history - Get conversation history
 * DELETE /api/guide/session - Clear session
 */

// Chat with the guide
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, sessionId, message, step, context } = body;

    // Create new session
    if (action === 'create_session') {
      const newSessionId = tamkinlyGuide.createSession();
      return NextResponse.json({
        success: true,
        sessionId: newSessionId,
      });
    }

    // Get step guidance
    if (action === 'get_step_guidance' && step) {
      const guidance = await getStepGuidance(step as 1 | 2 | 3 | 4, context);
      return NextResponse.json({
        success: true,
        response: guidance,
      });
    }

    // Quick chat (no session)
    if (action === 'quick_chat' && message) {
      const response = await quickGuideChat(message);
      return NextResponse.json({
        success: true,
        response,
      });
    }

    // Chat with session
    if (!sessionId || !message) {
      return NextResponse.json(
        { error: 'sessionId and message are required' },
        { status: 400 }
      );
    }

    const result = await tamkinlyGuide.chat(sessionId, message);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      response: result.response,
      suggestedAction: result.suggestedAction,
    });
  } catch (error) {
    console.error('Guide API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get conversation history
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    const history = tamkinlyGuide.getHistory(sessionId);
    const session = tamkinlyGuide.getSession(sessionId);

    return NextResponse.json({
      success: true,
      history,
      sessionInfo: session ? {
        createdAt: session.createdAt,
        lastActivity: session.lastActivity,
        messageCount: session.messages.length,
      } : null,
    });
  } catch (error) {
    console.error('Guide API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Delete/clear session
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const clear = searchParams.get('clear') === 'true';

    if (!sessionId) {
      return NextResponse.json(
        { error: 'sessionId is required' },
        { status: 400 }
      );
    }

    if (clear) {
      const success = tamkinlyGuide.clearSession(sessionId);
      return NextResponse.json({
        success,
        message: success ? 'Session cleared' : 'Session not found',
      });
    } else {
      const success = tamkinlyGuide.deleteSession(sessionId);
      return NextResponse.json({
        success,
        message: success ? 'Session deleted' : 'Session not found',
      });
    }
  } catch (error) {
    console.error('Guide API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
