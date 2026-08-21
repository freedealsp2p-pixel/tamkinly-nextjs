import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { nanoid } from 'nanoid';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';

// Generate a unique ticket number
function generateTicketNumber(): string {
  return `TKT-${nanoid(6).toUpperCase()}`;
}

// POST - Create a new support ticket
export async function POST(request: NextRequest) {
  try {
  // Security: CSRF + rate limit
  const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;


    const body = await request.json();
    const { name, email, subject, category, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: 'Email, subject, and message are required' },
        { status: 400 }
      );
    }

    const ticketNumber = generateTicketNumber();

    const ticket = await db.supportTicket.create({
      data: {
        ticketNumber,
        email,
        name: name || null,
        subject,
        message,
        category: category || 'GENERAL',
        status: 'OPEN',
        priority: 'NORMAL',
      }
    });

    // Create the first message
    await db.ticketMessage.create({
      data: {
        ticketId: ticket.id,
        senderType: 'CUSTOMER',
        senderName: name || null,
        senderEmail: email,
        message: message
      }
    });

    return NextResponse.json({
      success: true,
      ticket: {
        id: ticket.id,
        ticketNumber: ticket.ticketNumber,
        subject: ticket.subject,
        status: ticket.status
      }
    });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}

// GET - List tickets (for admin or user lookup)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const status = searchParams.get('status');

    const where: Record<string, unknown> = {};
    if (email) where.email = email;
    if (status) where.status = status;

    const tickets = await db.supportTicket.findMany({
      where,
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    });

    return NextResponse.json({
      success: true,
      tickets
    });
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}
