#!/usr/bin/env python3
"""Fix B-3: Webhook - reorder sig check before parse + remove error leakage"""
path = '/var/www/tamkinly/src/app/api/webhook/tahweel/route.ts'
with open(path, 'r') as f:
    c = f.read()

# Fix 1: Reorder - verify signature BEFORE JSON.parse
old1 = "const rawBody = await request.text();\n    const body = JSON.parse(rawBody);\n    \n    // Verify signature"
new1 = "const rawBody = await request.text();\n\n    // Verify signature BEFORE parsing body"

if old1 in c:
    c = c.replace(old1, new1)
    print('Fix 1a: Reordered comment')
else:
    # Try without extra newline
    old1b = "const rawBody = await request.text();\n    const body = JSON.parse(rawBody);\n\n    // Verify signature"
    if old1b in c:
        c = c.replace(old1b, new1)
        print('Fix 1a: Reordered (alt spacing)')
    else:
        print('Fix 1a: NOT FOUND - checking content...')
        idx = c.find('rawBody = await request.text')
        if idx >= 0:
            print(f'  rawBody at char {idx}')
            print(f'  Context: {repr(c[idx:idx+200])}')

# Fix 1b: Wrap JSON.parse in try/catch
old_parse = 'const body = JSON.parse(rawBody);'
new_parse = '''let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: \'Invalid JSON payload\' },
        { status: 400 }
      );
    }'''

if old_parse in c:
    c = c.replace(old_parse, new_parse, 1)
    print('Fix 1b: Wrapped JSON.parse')
else:
    print('Fix 1b: NOT FOUND')

# Fix 2: Remove error details leakage
old_err = "details: String(error)"
if old_err in c:
    # Remove the entire "details" key-value pair
    c = c.replace("{ error: 'Webhook processing failed', details: String(error) }",
                    "{ error: 'Webhook processing failed' }")
    print('Fix 2: Removed error details')
else:
    print('Fix 2: NOT FOUND or already fixed')

with open(path, 'w') as f:
    f.write(c)

print('B-3 done')