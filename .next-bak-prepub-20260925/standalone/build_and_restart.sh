#!/bin/bash
cd /var/www/tamkinly
echo "Build started at $(date)" > /var/www/tamkinly/build.log
pm2 stop tamkinly-prod >> /var/www/tamkinly/build.log 2>&1
rm -rf .next
sync
echo 3 > /proc/sys/vm/drop_caches
NODE_OPTIONS=--max-old-space-size=1024 npx next build >> /var/www/tamkinly/build.log 2>&1
BUILD_RC=$?
echo "Build finished at $(date) rc=$BUILD_RC" >> /var/www/tamkinly/build.log

if [ $BUILD_RC -eq 0 ] && [ -f .next/standalone/server.js ]; then
  cp -r .next/static .next/standalone/.next/static
  cp -r public .next/standalone/ 2>/dev/null
  echo "Build SUCCESS" >> /var/www/tamkinly/build.log
  pm2 restart tamkinly-prod >> /var/www/tamkinly/build.log 2>&1
  echo "PM2 restarted" >> /var/www/tamkinly/build.log
else
  echo "Build FAILED (rc=$BUILD_RC server_js=$([ -f .next/standalone/server.js ] && echo present || echo missing))" >> /var/www/tamkinly/build.log
  pm2 start tamkinly-prod >> /var/www/tamkinly/build.log 2>&1
fi
