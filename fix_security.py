#!/usr/bin/env python3
"""Fix API Security Regressions B-1, B-2, B-3"""
import re

# B-1: /api/progress - Return 401 instead of demo data
path = '/var/www/tamkinly/src/app/api/progress/route.ts'
with open(path, 'r') as f:
    content = f.read()

# Replace demo data return with 401
old = '''    if (!userId) {
      // Return demo data for anonymous users
      return NextResponse.json({
        success: true,
        isDemo: true,
        progress: getDemoProgress(),
      });
    }'''

new = '''    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }'''

if old in content:
    content = content.replace(old, new)
    print('B-1 GET: Fixed')
else:
    print('B-1 GET: Pattern not found')

# Also fix POST handler demo mode (around line 188-193)
old_post = '''      if (!userId) {
        return NextResponse.json({
          success: true,
          isDemo: true,
          message: 'Demo mode: ' + body.message,
          response: 'This is a demo response. Sign in to use the full AI-powered progress analysis.',
        });
      }'''
new_post = '''      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'Authentication required' },
          { status: 401 }
        );
      }'''

if old_post in content:
    content = content.replace(old_post, new_post)
    print('B-1 POST: Fixed')
else:
    print('B-1 POST: Pattern not found')

with open(path, 'w') as f:
    f.write(content)

# B-2: /api/user/progress - Return 401 instead of demo data
path2 = '/var/www/tamkinly/src/app/api/user/progress/route.ts'
with open(path2, 'r') as f:
    content2 = f.read()

# Find and replace the demo data block
# Pattern: if (!session?.user?.id) { return ... demo data ... }
old2_pattern = r"if \(!session\?\.user\.id\) \{[\s\S]*?isAuthenticated: false[\s\S]*?\}\);?[\s\S]*?\}"
new2 = "if (!session?.user?.id) {\n    return NextResponse.json(\n      { error: 'Authentication required' },\n      { status: 401 }\n    );\n  }"

result = re.sub(old2_pattern, new2, content2, count=1)
if result != content2:
    content2 = result
    print('B-2: Fixed')
else:
    print('B-2: Pattern not found, trying alternative')
    # Try line-by-line approach
    lines = content2.split('\n')
    new_lines = []
    in_block = False
    brace_count = 0
    for i, line in enumerate(lines):
        if 'if (!session?.user?.id)' in line and not in_block:
            in_block = True
            brace_count = line.count('{') - line.count('}')
            new_lines.append("  if (!session?.user?.id) {")
            new_lines.append("    return NextResponse.json(")
            new_lines.append("      { error: 'Authentication required' },")
            new_lines.append("      { status: 401 }")
            new_lines.append("    );")
            continue
        if in_block:
            brace_count += line.count('{') - line.count('}')
            if brace_count <= 0:
                in_block = False
                new_lines.append('  }')
            continue
        new_lines.append(line)
    content2 = '\n'.join(new_lines)
    if 'Authentication required' in content2:
        print('B-2: Fixed (alternative)')
    else:
        print('B-2: FAILED')

with open(path2, 'w') as f:
    f.write(content2)

# B-3: /api/webhook/tahweel - Fix error handling
path3 = '/var/www/tamkinly/src/app/api/webhook/tahweel/route.ts'
with open(path3, 'r') as f:
    content3 = f.read()

# Fix 1: Move signature verification before JSON parse
# Current: rawBody -> JSON.parse -> verify signature
# Fixed: rawBody -> verify signature -> JSON.parse

old_webhook = '''    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    // Verify webhook signature
    const signature = request.headers.get('x-tahweel-signature') ||
                      request.headers.get('x-webhook-signature');

    if (!verifyTahweelSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }'''

new_webhook = '''    let rawBody: string;
    try {
      rawBody = await request.text();
    } catch {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Verify webhook signature BEFORE parsing
    const signature = request.headers.get('x-tahweel-signature') ||
                      request.headers.get('x-webhook-signature');

    if (!verifyTahweelSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }'''

if old_webhook in content3:
    content3 = content3.replace(old_webhook, new_webhook)
    print('B-3 signature order: Fixed')
else:
    print('B-3 signature order: Pattern not found')

# Fix 2: Remove error details leakage
old_err = '''      return NextResponse.json(
        { error: 'Webhook processing failed', details: String(error) },
        { status: 500 }
      );'''
new_err = '''      console.error(\'Tahweel webhook error:\', error);
      return NextResponse.json(
        { error: 'Webhook processing failed' },
        { status: 500 }
      );'''

if old_err in content3:
    content3 = content3.replace(old_err, new_err)
    print('B-3 error leakage: Fixed')
else:
    print('B-3 error leakage: Pattern not found')

with open(path3, 'w') as f:
    f.write(content3)

print('\nAll security fixes applied.')