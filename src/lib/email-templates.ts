// ============================================
// EMAIL TEMPLATES - HTML Content
// Tamkinly Identity Transformation Platform
// ============================================

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tamkinly.com';

// ============================================
// WELCOME EMAIL (General Subscriber)
// ============================================
export function getWelcomeEmailHtml(name: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .content p { color: #444; line-height: 1.7; font-size: 16px; }
    .content ul { color: #444; line-height: 1.8; }
    .button { display: inline-block; background: linear-gradient(135deg, #e94560 0%, #d63384 100%); color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .footer { background-color: #1a1a2e; padding: 30px; text-align: center; }
    .footer p { color: #888; font-size: 13px; margin: 5px 0; }
    .footer a { color: #e94560; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to Tamkinly! 🎯</h1>
    </div>
    <div class="content">
      <h2>You're In! Thank You for Subscribing</h2>
      <p>Dear ${name},</p>
      <p>Welcome to the Tamkinly community! You've just taken the first step toward transforming your identity and achieving your goals.</p>
      <p>As a subscriber, you'll receive:</p>
      <ul>
        <li>Weekly insights on personal development</li>
        <li>Exclusive tips and strategies</li>
        <li>Early access to new products and special offers</li>
      </ul>
      <p style="text-align: center;">
        <a href="${BASE_URL}/shop/" class="button">Explore Our Products</a>
      </p>
      <p>Ready to start your transformation journey?</p>
    </div>
    <div class="footer">
      <p>© 2026 Tamkinly. All rights reserved.</p>
      <p><a href="${BASE_URL}/privacy-policy/">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// TRIAL PURCHASE EMAIL (7-Day System)
// ============================================
export function getTrialPurchaseEmailHtml(name: string, accessKey: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .content p { color: #444; line-height: 1.7; font-size: 16px; }
    .access-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
    .access-box h3 { color: #e94560; margin: 0 0 15px 0; font-size: 18px; }
    .access-box .code { color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 3px; font-family: monospace; }
    .access-box p { color: #aaa; font-size: 14px; margin-top: 15px; }
    .download-box { background: #f8f9fa; border-left: 4px solid #e94560; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    .download-box h3 { color: #1a1a2e; margin: 0 0 10px 0; }
    .download-box a { color: #e94560; font-weight: bold; }
    .button { display: inline-block; background: linear-gradient(135deg, #e94560 0%, #d63384 100%); color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .apps-box { background: #e8f5e9; border: 2px solid #4caf50; border-radius: 12px; padding: 20px; margin: 25px 0; }
    .apps-box h3 { color: #2e7d32; margin: 0 0 15px 0; }
    .apps-box ul { margin: 0; padding-left: 20px; color: #444; }
    .apps-box li { margin-bottom: 8px; }
    .footer { background-color: #1a1a2e; padding: 30px; text-align: center; }
    .footer p { color: #888; font-size: 13px; margin: 5px 0; }
    .footer a { color: #e94560; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase! 🙏</h1>
    </div>
    <div class="content">
      <h2>Your 7-Day Identity System</h2>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Tamkinly! Your 7-Day Identity System is ready. You now have access to our transformation tools.</p>
      
      <div class="access-box">
        <h3>🔑 Your Access Key</h3>
        <div class="code">${accessKey}</div>
        <p>Use this key to access your apps below</p>
      </div>
      
      <div class="apps-box">
        <h3>📱 Apps You Can Access (Trial Tier):</h3>
        <ul>
          <li>Identity Gap Assessment</li>
          <li>Values Clarification Tool</li>
          <li>7-Day Guided Journey</li>
        </ul>
      </div>
      
      <div class="download-box">
        <h3>📥 Your Download:</h3>
        <p><strong>7-Day Identity System</strong><br>
        <a href="${BASE_URL}/my-account/downloads/">Download Your Files</a></p>
      </div>
      
      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/?code=${accessKey}" class="button">Access Your Apps Now</a>
      </p>
      
      <p>This is just the beginning of your transformation journey. If you're ready to go deeper, check out our complete planner and premium packages.</p>
      
      <p>Questions? Reply to this email or contact us at support@tamkinly.com</p>
    </div>
    <div class="footer">
      <p>© 2026 Tamkinly. All rights reserved.</p>
      <p><a href="${BASE_URL}/privacy-policy/">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// PLANNER PURCHASE EMAIL (Main Product)
// ============================================
export function getPlannerPurchaseEmailHtml(name: string, accessKey: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .content p { color: #444; line-height: 1.7; font-size: 16px; }
    .access-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
    .access-box h3 { color: #e94560; margin: 0 0 15px 0; font-size: 18px; }
    .access-box .code { color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 3px; font-family: monospace; }
    .access-box p { color: #aaa; font-size: 14px; margin-top: 15px; }
    .download-box { background: #f8f9fa; border-left: 4px solid #e94560; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    .download-box h3 { color: #1a1a2e; margin: 0 0 15px 0; }
    .download-box ul { margin: 0; padding-left: 20px; }
    .download-box li { margin-bottom: 10px; }
    .download-box a { color: #e94560; font-weight: bold; }
    .button { display: inline-block; background: linear-gradient(135deg, #e94560 0%, #d63384 100%); color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .apps-box { background: #e8f5e9; border: 2px solid #4caf50; border-radius: 12px; padding: 20px; margin: 25px 0; }
    .apps-box h3 { color: #2e7d32; margin: 0 0 15px 0; }
    .apps-box ul { margin: 0; padding-left: 20px; color: #444; }
    .apps-box li { margin-bottom: 8px; }
    .footer { background-color: #1a1a2e; padding: 30px; text-align: center; }
    .footer p { color: #888; font-size: 13px; margin: 5px 0; }
    .footer a { color: #e94560; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase! 🙏</h1>
    </div>
    <div class="content">
      <h2>Your Identity Recode Planner</h2>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Tamkinly! Your Identity Recode Planner files are ready for download, and you now have access to our transformation apps.</p>
      
      <div class="access-box">
        <h3>🔑 Your Access Key</h3>
        <div class="code">${accessKey}</div>
        <p>Use this key to access your apps below</p>
      </div>
      
      <div class="apps-box">
        <h3>📱 Apps You Can Access (Basic Tier):</h3>
        <ul>
          <li>Identity Gap Assessment</li>
          <li>Values Clarification Tool</li>
          <li>30-Day Transformation Journey</li>
          <li>Daily Planner & Tracker</li>
        </ul>
      </div>
      
      <div class="download-box">
        <h3>📥 Your Downloads:</h3>
        <ul>
          <li><a href="${BASE_URL}/my-account/downloads/">Identity Recode Planner - Digital Version</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Identity Recode Planner - Print Ready</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Executive Manual</a></li>
        </ul>
      </div>
      
      <p>We recommend starting with the digital version for interactive use, and the print-ready version for a physical copy.</p>
      
      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/?code=${accessKey}" class="button">Access Your Apps Now</a>
      </p>
      
      <p>Questions? Reply to this email or contact us at support@tamkinly.com</p>
    </div>
    <div class="footer">
      <p>© 2026 Tamkinly. All rights reserved.</p>
      <p><a href="${BASE_URL}/privacy-policy/">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// PREMIUM PURCHASE EMAIL
// ============================================
export function getPremiumPurchaseEmailHtml(name: string, accessKey: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .content p { color: #444; line-height: 1.7; font-size: 16px; }
    .access-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
    .access-box h3 { color: #e94560; margin: 0 0 15px 0; font-size: 18px; }
    .access-box .code { color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 3px; font-family: monospace; }
    .access-box p { color: #aaa; font-size: 14px; margin-top: 15px; }
    .download-box { background: #f8f9fa; border-left: 4px solid #e94560; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    .download-box h3 { color: #1a1a2e; margin: 0 0 15px 0; }
    .download-box ul { margin: 0; padding-left: 20px; }
    .download-box li { margin-bottom: 10px; }
    .download-box a { color: #e94560; font-weight: bold; }
    .button { display: inline-block; background: linear-gradient(135deg, #e94560 0%, #d63384 100%); color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .apps-box { background: #fff3e0; border: 2px solid #ff9800; border-radius: 12px; padding: 20px; margin: 25px 0; }
    .apps-box h3 { color: #e65100; margin: 0 0 15px 0; }
    .apps-box ul { margin: 0; padding-left: 20px; color: #444; }
    .apps-box li { margin-bottom: 8px; }
    .footer { background-color: #1a1a2e; padding: 30px; text-align: center; }
    .footer p { color: #888; font-size: 13px; margin: 5px 0; }
    .footer a { color: #e94560; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Purchase! 🌟</h1>
    </div>
    <div class="content">
      <h2>Your Premium Transformation Package</h2>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Tamkinly! Your Premium Transformation Package is ready, including advanced analytics and decision tracking tools.</p>
      
      <div class="access-box">
        <h3>🔑 Your Access Key</h3>
        <div class="code">${accessKey}</div>
        <p>Use this key to access your apps below</p>
      </div>
      
      <div class="apps-box">
        <h3>📱 Apps You Can Access (Premium Tier):</h3>
        <ul>
          <li>Identity Gap Assessment</li>
          <li>Values Clarification Tool</li>
          <li>30-Day Transformation Journey</li>
          <li>Daily Planner & Tracker</li>
          <li>Decision Pattern Analysis</li>
          <li>Evidence Tracking System</li>
          <li>Progress Dashboard</li>
        </ul>
      </div>
      
      <div class="download-box">
        <h3>📥 Your Downloads:</h3>
        <ul>
          <li><a href="${BASE_URL}/my-account/downloads/">Identity Recode Planner - Digital Version</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Identity Recode Planner - Print Ready</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Executive Manual</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Decision Analysis Templates</a></li>
        </ul>
      </div>
      
      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/?code=${accessKey}" class="button">Access Your Apps Now</a>
      </p>
      
      <p>Questions? Reply to this email or contact us at support@tamkinly.com</p>
    </div>
    <div class="footer">
      <p>© 2026 Tamkinly. All rights reserved.</p>
      <p><a href="${BASE_URL}/privacy-policy/">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// BUNDLE PURCHASE EMAIL (VIP)
// ============================================
export function getBundlePurchaseEmailHtml(name: string, accessKey: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
    .header p { color: #ffd700; margin-top: 10px; font-size: 16px; }
    .content { padding: 40px 30px; }
    .content h2 { color: #1a1a2e; font-size: 24px; margin-bottom: 20px; }
    .content p { color: #444; line-height: 1.7; font-size: 16px; }
    .access-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 12px; padding: 25px; margin: 25px 0; text-align: center; }
    .access-box h3 { color: #ffd700; margin: 0 0 15px 0; font-size: 18px; }
    .access-box .code { color: #ffffff; font-size: 28px; font-weight: bold; letter-spacing: 3px; font-family: monospace; }
    .access-box p { color: #aaa; font-size: 14px; margin-top: 15px; }
    .download-box { background: #f8f9fa; border-left: 4px solid #e94560; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    .download-box h3 { color: #1a1a2e; margin: 0 0 15px 0; }
    .download-box ul { margin: 0; padding-left: 20px; }
    .download-box li { margin-bottom: 10px; }
    .download-box a { color: #e94560; font-weight: bold; }
    .button { display: inline-block; background: linear-gradient(135deg, #e94560 0%, #d63384 100%); color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
    .apps-box { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border: 2px solid #ffd700; border-radius: 12px; padding: 20px; margin: 25px 0; }
    .apps-box h3 { color: #ffd700; margin: 0 0 15px 0; }
    .apps-box ul { margin: 0; padding-left: 20px; color: #ffffff; }
    .apps-box li { margin-bottom: 8px; }
    .vip-badge { display: inline-block; background: #ffd700; color: #1a1a2e; padding: 5px 15px; border-radius: 20px; font-weight: bold; font-size: 12px; }
    .footer { background-color: #1a1a2e; padding: 30px; text-align: center; }
    .footer p { color: #888; font-size: 13px; margin: 5px 0; }
    .footer a { color: #e94560; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to VIP! 👑</h1>
      <p><span class="vip-badge">BUNDLE MEMBER</span></p>
    </div>
    <div class="content">
      <h2>Your Complete Bundle Package</h2>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Tamkinly! As a VIP Bundle member, you have access to everything we offer - all products, apps, AI coaching, and priority support.</p>
      
      <div class="access-box">
        <h3>🔑 Your VIP Access Key</h3>
        <div class="code">${accessKey}</div>
        <p>Use this key to access all your VIP apps</p>
      </div>
      
      <div class="apps-box">
        <h3>📱 All Apps Included (VIP Access):</h3>
        <ul>
          <li>✓ Identity Gap Assessment</li>
          <li>✓ Values Clarification Tool</li>
          <li>✓ 30-Day Transformation Journey</li>
          <li>✓ Daily Planner & Tracker</li>
          <li>✓ Decision Pattern Analysis</li>
          <li>✓ Evidence Tracking System</li>
          <li>✓ Progress Dashboard</li>
          <li>✓ AI Identity Coach</li>
          <li>✓ Transformation Community</li>
        </ul>
      </div>
      
      <div class="download-box">
        <h3>📥 Your Downloads:</h3>
        <ul>
          <li><a href="${BASE_URL}/my-account/downloads/">All PDF Products</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Identity Recode Planner - Digital & Print</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Executive Manual</a></li>
          <li><a href="${BASE_URL}/my-account/downloads/">Decision Analysis Templates</a></li>
        </ul>
      </div>
      
      <p style="text-align: center;">
        <a href="${BASE_URL}/apps/?code=${accessKey}" class="button">Access Your VIP Apps Now</a>
      </p>
      
      <p>As a VIP member, you also have priority support. Questions? Reply to this email or contact us at support@tamkinly.com</p>
    </div>
    <div class="footer">
      <p>© 2026 Tamkinly. All rights reserved.</p>
      <p><a href="${BASE_URL}/privacy-policy/">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`;
}

// ============================================
// EXPORT
// ============================================
const EmailTemplates = {
  welcome: getWelcomeEmailHtml,
  trialPurchase: getTrialPurchaseEmailHtml,
  plannerPurchase: getPlannerPurchaseEmailHtml,
  premiumPurchase: getPremiumPurchaseEmailHtml,
  bundlePurchase: getBundlePurchaseEmailHtml,
};

export default EmailTemplates;
