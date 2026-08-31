#!/bin/bash
cd /var/www/tamkinly
rm -rf .next
export NODE_OPTIONS="--max-old-space-size=768"
exec npx next build > /tmp/build10.log 2>&1
EXIT_CODE=$?
echo "EXIT_CODE=$EXIT_CODE" >> /tmp/build10.log
