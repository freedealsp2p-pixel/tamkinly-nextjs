// ============================================
// CONTACT FORM API ENDPOINT
// Handles contact form submissions
// Tamkinly Identity Transformation Platform
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { BrevoEmails, BrevoContacts, BREVO_LISTS } from '@/lib/brevo';
import { verifyRecaptcha } from '@/components/Recaptcha';

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

  // Check if data is an object
  if (!data || typeof data !== 'object') {
    return { isValid: false, errors: ['Invalid request body'] };
  }

  const formData = data as Partial<ContactFormData>;

  // Validate name
  if (!formData.name || typeof formData.name !== 'string') {
    errors.push('Name is required');
  } else if (formData.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  } else if (formData.name.trim().length > 100) {
    errors.push('Name must be less than 100 characters');
  }

  // Validate email
  if (!formData.email || typeof formData.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      errors.push('Please provide a valid email address');
    }
  }

  // Validate subject
  if (!formData.subject || typeof formData.subject !== 'string') {
    errors.push('Subject is required');
  } else if (formData.subject.trim().length < 3) {
    errors.push('Subject must be at least 3 characters long');
  } else if (formData.subject.trim().length > 200) {
    errors.push('Subject must be less than 200 characters');
  }

  // Validate message
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
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #f59e0b; font-size: 24px; font-weight: 700;">
              New Contact Form Submission
            </h1>
          </td>
        </tr>
        
        <!-- Content -->
        <tr>
          <td style="background-color: #ffffff; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
              <!-- From -->
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</span>
                  <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                    ${data.name}
                  </p>
                  <a href="mailto:${data.email}" style="color: #f59e0b; text-decoration: none; font-size: 14px;">
                    ${data.email}
                  </a>
                </td>
              </tr>
              
              <!-- Subject -->
              <tr>
                <td style="padding: 15px 0; border-bottom: 1px solid #f1f5f9;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</span>
                  <p style="margin: 5px 0 0 0; color: #1e293b; font-size: 16px; font-weight: 600;">
                    ${data.subject}
                  </p>
                </td>
              </tr>
              
              <!-- Message -->
              <tr>
                <td style="padding: 15px 0;">
                  <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                  <div style="margin-top: 10px; padding: 15px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #f59e0b;">
                    <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">
                      ${data.message}
                    </p>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #94a3b8; font-size: 12px;">
              Received on ${timestamp}
            </p>
            <p style="margin: 10px 0 0 0; color: #64748b; font-size: 14px;">
              <a href="mailto:${data.email}" style="color: #f59e0b; text-decoration: none;">
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
        <!-- Header -->
        <tr>
          <td style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; color: #f59e0b; font-size: 28px; font-weight: 700;">
              Message Received!
            </h1>
            <p style="margin: 15px 0 0 0; color: #cbd5e1; font-size: 16px;">
              Thank you for reaching out, ${name}
            </p>
          </td>
        </tr>
        
        <!-- Content -->
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
        
        <!-- Footer -->
        <tr>
          <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; border-top: none;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              Best regards,<br>
              <span style="color: #f59e0b; font-weight: 600;">The Tamkinly Team</span>
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// ============================================
// POST HANDLER
// ============================================

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA (if configured)
    const formDataWithToken = body as Partial<ContactFormData>;
    const recaptchaResult = await verifyRecaptcha(formDataWithToken.recaptchaToken || '');
    
    // If reCAPTCHA verification failed and it's configured, reject
    if (!recaptchaResult.success && process.env.RECAPTCHA_SECRET_KEY) {
      console.warn('reCAPTCHA verification failed:', recaptchaResult);
      // For low scores, we can either reject or flag for review
      // Here we're lenient - we just log but don't reject
      // To be more strict, uncomment the following:
      // return NextResponse.json(
      //   { success: false, error: 'reCAPTCHA verification failed. Please try again.' },
      //   { status: 400 }
      // );
    }

    // Validate input
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
      subject: sanitizeInput(formData.subject),
      message: sanitizeInput(formData.message)
    };

    // Check if Brevo is configured
    const isBrevoConfigured = Boolean(process.env.BREVO_API_KEY);

    if (isBrevoConfigured) {
      // Add contact to Brevo list (non-blocking)
      BrevoContacts.upsert({
        email: sanitizedData.email,
        attributes: {
          NAME: sanitizedData.name,
        },
        listIds: [BREVO_LISTS.ALL_CONTACTS],
        updateEnabled: true,
      }).catch(err => {
        console.error('Failed to add contact to Brevo:', err);
        // Don't fail the request if contact sync fails
      });

      // Send notification email to admin
      const adminEmailResult = await BrevoEmails.send({
        to: [{ email: 'hello@tamkinly.com', name: 'Tamkinly Team' }],
        sender: { name: 'Tamkinly', email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com' },
        subject: `[Contact Form] ${sanitizedData.subject}`,
        htmlContent: generateContactEmailHtml(sanitizedData),
        textContent: `
New Contact Form Submission

From: ${sanitizedData.name} (${sanitizedData.email})
Subject: ${sanitizedData.subject}

Message:
${sanitizedData.message}
        `.trim(),
        replyTo: { email: sanitizedData.email, name: sanitizedData.name },
        tags: ['contact-form', 'website'],
      });

      if (!adminEmailResult.success) {
        console.error('Failed to send admin notification:', adminEmailResult.error);
        return NextResponse.json(
          { success: false, error: 'Failed to send message. Please try again later.' },
          { status: 500 }
        );
      }

      // Send auto-reply to the user
      await BrevoEmails.send({
        to: [{ email: sanitizedData.email, name: sanitizedData.name }],
        sender: { name: 'Tamkinly', email: process.env.BREVO_SENDER_EMAIL || 'noreply@tamkinly.com' },
        subject: 'Thank you for contacting Tamkinly',
        htmlContent: generateAutoReplyHtml(sanitizedData.name),
        textContent: `
Thank you for contacting Tamkinly, ${sanitizedData.name}!

We've received your message and will get back to you within 24-48 hours.

Best regards,
The Tamkinly Team
        `.trim(),
        tags: ['contact-form', 'auto-reply'],
      }).catch(err => {
        console.error('Failed to send auto-reply:', err);
        // Don't fail the request if auto-reply fails
      });

      return NextResponse.json({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you within 24-48 hours.',
        messageId: adminEmailResult.messageId
      });
    } else {
      // Brevo not configured - log the message for manual handling
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('CONTACT FORM SUBMISSION (Brevo not configured)');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(`Name: ${sanitizedData.name}`);
      console.log(`Email: ${sanitizedData.email}`);
      console.log(`Subject: ${sanitizedData.subject}`);
      console.log(`Message: ${sanitizedData.message}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      // Return success anyway (for development/testing)
      return NextResponse.json({
        success: true,
        message: 'Your message has been recorded. We will get back to you within 24-48 hours.',
        note: 'Email service not configured - message logged to console'
      });
    }

  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// ============================================
// OPTIONS HANDLER (CORS)
// ============================================

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
