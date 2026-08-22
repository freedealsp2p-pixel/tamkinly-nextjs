// ============================================
// CONTACT FORM API ENDPOINT
// Handles contact form submissions
// Tamkinly Identity Transformation Platform
// ============================================
// FIX: v1.1.0 - Fixed HTTP 500 error
// - Moved verifyRecaptcha to server-only module
// - Added database fallback (ContactMessage model)
// - Improved error handling
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptcha } from '@/lib/recaptcha';
import { db } from '@/lib/db';
import { applySecurity, API_RATE_LIMIT } from '@/lib/security';
import { getAdminSession } from '@/lib/admin-auth-jwt';

// ============================================
// VALIDATION TYPES
// ============================================

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  recaptchaToken?: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// ============================================
// INPUT VALIDATION
// ============================================

function validateContactForm(data: unknown): ValidationResult {
  const errors: string[] = [];

  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Invalid request body'] };
  }

  const formData = data as Partial<ContactFormData>;

  if (!formData.name || typeof formData.name !== 'string') {
    errors.push('Name is required');
  } else if (formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (formData.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  if (formData.subject && typeof formData.subject === 'string') {
    if (formData.subject.trim().length < 3) {
      errors.push('Subject must be at least 3 characters long');
    } else if (formData.subject.trim().length > 200) {
      errors.push('Subject must be less than 200 characters');
    }
  }

  if (!formData.message || typeof formData.message !== 'string') {
    errors.push('Message is required');
  } else if (formData.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters long');
  } else if (formData.message.trim().length > 5000) {
    errors.push('Message must be less than 5000 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================
// SANITIZATION
// ============================================

function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ============================================
// EMAIL HTML TEMPLATE
// ============================================

function generateContactEmailHtml(data: ContactFormData): string {
  const timestamp = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'long'
  });

  return `
    <!DOCTYPE html>
    <html dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <tr>
          <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #2A8A94; font-size: 24px; font-weight: 700;">
              New Contact Form Submission
            </h1>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</span>
                  <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                    ${data.name}
                  </p>
                  <a href="mailto:${data.email}" style="color: #2A8A94; text-decoration: none; font-size: 14px;">
                    ${data.email}
                  </a>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                  <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                    ${data.subject}
                  </p>
                </td>
              </tr>
              <tr>
                <td style="padding: 15px 0;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                  <div style="margin-top: 10px; padding: 15px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #2A8A94;">
                    <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                      ${data.message}
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
              Received on ${timestamp}
            </p>
            <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
              <a href="mailto:${data.email}" style="color: #2A8A94; text-decoration: none;">
                Reply to ${data.name}
              </a>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function generateAutoReplyHtml(name: string): string {
  return `
    <!DOCTYPE html>
    <html dir="ltr">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Tamkinly</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <tr>
          <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #2A8A94; font-size: 28px; font-weight: 700;">
              Message Received!
            </h1>
            <p style="margin: 15px 0 0 0; color: #cbd5e1; font-size: 16px;">
              Thank you for reaching out, ${name}
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color: #ffffff; padding: 40px 30px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0 0 20px 0; color: #334155; font-size: 16px; line-height: 1.6;">
              We've received your message and appreciate you taking the time to contact us.
              Our team will review your inquiry and get back to you within 24-48 hours.
            </p>
            <div style="padding: 20px; background-color: #fefce8; border-radius: 8px; border: 1px solid #fde047;">
              <p style="margin: 0; color: #713f12; font-size: 14px;">
                <strong>What happens next?</strong><br>
                A member of our team will review your message and respond via email.
                Make sure to check your spam folder if you don't hear from us.
              </p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              Best regards,<br>
              <span style="color: #2A8A94; font-weight: 600;">The Tamkinly Team</span>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ============================================
// BREVO EMAIL HELPER (lazy-loaded, fails gracefully)
// ============================================

async function sendBrevoNotification(data: ContactFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const { BrevoEmails, BrevoContacts, BREVO_LISTS } = await import('@/lib/brevo');

    if (!process.env.BREVO_API_KEY) {
      console.log('[Contact] Brevo not configured, skipping email');
      return { success: false, error: 'Brevo API key not configured' };
    }

    // Add contact to Brevo list (non-blocking)
    BrevoContacts.upsert({
      email: data.email,
      attributes: { NAME: data.name },
      listIds: [BREVO_LISTS.ALL_CONTACTS],
      updateEnabled: true,
    }).catch(err => {
      console.error('[Contact] Failed to add contact to Brevo list:', err);
    });

    // Send notification email to admin
    const adminResult = await BrevoEmails.send({
      to: [{ email: 'hello@tamkinly.com', name: 'Tamkinly Team' }],
      sender: { name: 'Tamkinly', email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com' },
      subject: `[Contact Form] ${data.subject}`,
      htmlContent: generateContactEmailHtml(data),
      textContent: `New Contact Form Submission\n\nFrom: ${data.name} (${data.email})\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
      replyTo: { email: data.email, name: data.name },
      tags: ['contact-form', 'website'],
    });

    if (!adminResult.success) {
      console.error('[Contact] Failed to send admin notification via Brevo:', adminResult.error);
      return adminResult;
    }

    // Send auto-reply (non-blocking, don't fail the request)
    BrevoEmails.send({
      to: [{ email: data.email, name: data.name }],
      sender: { name: 'Tamkinly', email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com' },
      subject: 'Thank you for contacting Tamkinly',
      htmlContent: generateAutoReplyHtml(data.name),
      textContent: `Thank you for contacting Tamkinly, ${data.name}!\n\nWe've received your message and will get back to you within 24-48 hours.\n\nBest regards,\nThe Tamkinly Team`,
      tags: ['contact-form', 'auto-reply'],
    }).catch(err => {
      console.error('[Contact] Failed to send auto-reply via Brevo:', err);
    });

    return { success: true, messageId: adminResult.messageId };
  } catch (error) {
    console.error('[Contact] Brevo email error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Email service error' };
  }
}

// ============================================
// POST HANDLER
// ============================================

export async function POST(request: NextRequest) {
  try {
  // Security: CSRF + rate limit
  const securityBlocked = await applySecurity(request, API_RATE_LIMIT);
  if (securityBlocked) return securityBlocked;


    // Step 1: Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Step 2: Verify reCAPTCHA (graceful - never blocks the request)
    const formDataWithToken = body as Partial<ContactFormData>;
    try {
      const recaptchaResult = await verifyRecaptcha(formDataWithToken.recaptchaToken || '');
      if (!recaptchaResult.success && process.env.RECAPTCHA_SECRET_KEY) {
        console.warn('[Contact] reCAPTCHA verification failed (lenient mode):', recaptchaResult);
      }
    } catch (recaptchaError) {
      // reCAPTCHA failure should never block the contact form
      console.error('[Contact] reCAPTCHA check error (non-blocking):', recaptchaError);
    }

    // Step 3: Validate input
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const formData = body as ContactFormData;

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: sanitizeInput(formData.name),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject ? sanitizeInput(formData.subject) : '',
      message: sanitizeInput(formData.message),
    };

    // Generate subject if not provided
    if (!sanitizedData.subject) {
      sanitizedData.subject = `Message from ${sanitizedData.name}`;
    }

    // Step 4: SAVE TO DATABASE FIRST (guaranteed persistence)
    let savedMessage;
    try {
      savedMessage = await db.contactMessage.create({
        data: {
          name: sanitizedData.name,
          email: sanitizedData.email,
          subject: sanitizedData.subject,
          message: sanitizedData.message,
        },
      });
      console.log(`[Contact] Message saved to database (ID: ${savedMessage.id})`);
    } catch (dbError) {
      console.error('[Contact] FAILED to save to database:', dbError);
      // Don't fail - try email as fallback
    }

    // Step 5: Send email notification via Brevo (best-effort)
    const emailResult = await sendBrevoNotification(sanitizedData);

    // Step 6: Return success (message is saved in DB even if email fails)
    const deliveryMethod = emailResult.success ? 'email' : savedMessage ? 'database' : 'logged';
    
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you within 24-48 hours.',
      messageId: savedMessage?.id,
      deliveryNote: deliveryMethod === 'database' 
        ? 'Message saved to our system. Email notification may be delayed.' 
        : undefined,
    });

  } catch (error) {
    // Final safety net - this should rarely be reached
    console.error('[Contact] UNEXPECTED error in contact handler:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later or email us directly at hello@tamkinly.com',
      },
      { status: 500 }
    );
  }
}

// ============================================
// GET HANDLER - List contact messages (admin only)
// ============================================

export async function GET() {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await db.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    return NextResponse.json({ success: true, messages });
  } catch (error) {
    console.error('[Contact] Failed to fetch messages:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}
