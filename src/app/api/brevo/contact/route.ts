// ============================================
// BREVO CONTACT API
// Add/Update contacts in Brevo for email sequences
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import BrevoClient, { BREVO_LISTS } from '@/lib/brevo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, type, accessKey, quizScore, listIds } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if Brevo is configured
    if (!BrevoClient.account.isConfigured()) {
      return NextResponse.json(
        { error: 'Brevo API key not configured' },
        { status: 500 }
      );
    }

    // Determine which lists to add the contact to
    const targetLists = listIds || [BREVO_LISTS.ALL_CONTACTS];
    
    // Add to specific list based on type
    if (type === 'trial') {
      targetLists.push(BREVO_LISTS.TRIAL_USERS);
      targetLists.push(BREVO_LISTS.CUSTOMERS);
    } else if (type === 'planner' || type === 'premium' || type === 'bundle') {
      targetLists.push(BREVO_LISTS.CUSTOMERS);
    } else if (type === 'quiz') {
      targetLists.push(BREVO_LISTS.QUIZ_TAKERS);
    }

    // Create contact attributes
    const attributes: Record<string, string | number | undefined> = {};
    
    if (name) {
      const nameParts = name.split(' ');
      attributes.FIRSTNAME = nameParts[0];
      attributes.NAME = name;
      if (nameParts.length > 1) {
        attributes.LASTNAME = nameParts.slice(1).join(' ');
      }
    }
    
    if (type) {
      attributes.CUSTOMER_TYPE = type;
    }
    
    if (accessKey) {
      attributes.ACCESS_KEY = accessKey;
    }
    
    if (quizScore !== undefined) {
      attributes.QUIZ_SCORE = quizScore;
    }
    
    attributes.LAST_ACTIVITY = new Date().toISOString().split('T')[0];

    // Upsert contact in Brevo
    const result = await BrevoClient.contacts.upsert({
      email,
      attributes,
      listIds: [...new Set(targetLists)], // Remove duplicates
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to create contact' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: result.id,
      message: 'Contact added to Brevo successfully',
    });
  } catch (error) {
    console.error('Brevo contact error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter is required' },
        { status: 400 }
      );
    }

    if (!BrevoClient.account.isConfigured()) {
      return NextResponse.json(
        { error: 'Brevo API key not configured' },
        { status: 500 }
      );
    }

    const contact = await BrevoClient.contacts.get(email);

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      contact,
    });
  } catch (error) {
    console.error('Brevo contact lookup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
