#!/bin/bash
cd /var/www/tamkinly
rm -rf .next
NODE_OPTIONS=--max-old-space-size=768 npx next build >> /var/www/tamkinly/build.log2 2>&1
if [ $? -eq 0 ]; then
  echo BUILD_SUCCESS >> /var/www/tamkinly/build.log2
  pm2 restart tamkinly-prod >> /var/www/tamkinly/build.log2 2>&1
fi
echo BUILD_FAILED >> /var/www/tamkinly/build.log2 2>&1
