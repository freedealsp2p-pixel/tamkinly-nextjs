#!/bin/bash
cd /var/www/tamkinly
rm -rf .next
sync
echo 3 > /proc/sys/vm/drop_caches
echo "Build started at $(date)" > /var/www/tamkinly/build.log
NODE_OPTIONS=--max-old-space-size=768 npx next build >> /var/www/tamkinly/build.log 2>&1
echo "Build finished at $(date)" >> /var/www/tamkinly/build.log

if [ $? -eq 0 ]; then
  echo "Build SUCCESS" >> /var/www/tamkinly/build.log
  pm2 restart tamkinly-prod >> /var/www/tamkinly/build.log 2>&1
  echo "PM2 restarted" >> /var/www/tamkinly/build.log
else
  echo "Build FAILED" >> /var/www/tamkinly/build.log
  pm2 start tamkinly-prod >> /var/www/tamkinly/build.log 2>&1
fi