#!/usr/bin/env node
/**
 * Deploy SEO fixes to production server
 * - Blog article layouts
 * - App page layouts
 * - robots.txt sitemap reference
 */

import { execSync } from 'child_process';

const SERVER = 'root@192.3.218.191';
const PORT = '-p 2222';
const REMOTE_PATH = '/var/www/tamkinly';

console.log('🚀 Deploying SEO fixes to production...\n');

const commands = [
  // Sync new library files
  `rsync -avz -e "ssh ${PORT}" /home/z/my-project/src/lib/blog-articles.ts ${SERVER}:${REMOTE_PATH}/src/lib/`,
  `rsync -avz -e "ssh ${PORT}" /home/z/my-project/src/lib/app-pages.ts ${SERVER}:${REMOTE_PATH}/src/lib/`,
  
  // Sync robots.txt
  `rsync -avz -e "ssh ${PORT}" /home/z/my-project/public/robots.txt ${SERVER}:${REMOTE_PATH}/public/`,
  
  // Sync all blog article layouts
  `rsync -avz -e "ssh ${PORT}" /home/z/my-project/src/app/blog/*/layout.tsx ${SERVER}:${REMOTE_PATH}/src/app/blog/`,
  
  // Sync all app page layouts
  `rsync -avz -e "ssh ${PORT}" /home/z/my-project/src/app/apps/*/layout.tsx ${SERVER}:${REMOTE_PATH}/src/app/apps/`,
];

for (const cmd of commands) {
  console.log(`📦 Running: ${cmd}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Failed: ${cmd}`);
  }
}

console.log('\n🔄 Restarting PM2 process...');
try {
  execSync(`ssh ${PORT} ${SERVER} "cd ${REMOTE_PATH} && pm2 restart tamkinly-nextjs"`, { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to restart PM2');
}

console.log('\n✅ Deployment complete!');
