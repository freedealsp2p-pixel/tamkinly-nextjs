#!/usr/bin/env python3
"""Fix webhook: add JSON.parse back after signature check, wrapped in try/catch"""
path = '/var/www/tamkinly/src/app/api/webhook/tahweel/route.ts'
with open(path, 'r') as f:
    c = f.read()

# The current state has signature check but no body parsing
# Find the signature check closing, then add JSON.parse

old = """    if (!verifyTahweelSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }
    
    console.log"""

new = """    if (!verifyTahweelSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse body after signature verification
    let body: any;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    console.log"""

if old in c:
    c = c.replace(old, new)
    print('Added JSON.parse after signature check with try/catch')
else:
    print('Pattern not found, trying alternative...')
    # Find the signature check end
    idx = c.find("Invalid signature'")
    if idx >= 0:
        # Find the closing of the if block
        end = c.find('}', idx)
        end2 = c.find('}', end + 1)
        if end2 >= 0:
            insert_point = end2 + 1
            insert_text = '''\n\n    // Parse body after signature verification\n    let body: any;\n    try {\n      body = JSON.parse(rawBody);\n    } catch {\n      return NextResponse.json(\n        { error: \'Invalid JSON payload\' },\n        { status: 400 }\n      );\n    }'''
            c = c[:insert_point] + insert_text + c[insert_point:]
            print('Inserted JSON.parse using fallback method')

with open(path, 'w') as f:
    f.write(c)

# Verify no 'details: String(error)' remains
if 'details: String(error)' in c:
    print('WARNING: error details leakage still present!')
else:
    print('Error details: clean')

print('Done')
