import { NodeSSH } from 'node-ssh';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ssh = new NodeSSH();

const config = {
  host: '192.3.218.191',
  port: 2222,
  username: 'root',
  password: 'g40d7KJfMyWrb2G3T1',
  readyTimeout: 60000
};

const localPath = '/home/z/my-project';
const remotePath = '/var/www/tamkinly';

// Files to upload - critical fixes
const filesToUpload = [
  // Quiz fixes
  'src/app/quiz/page.tsx',
  'src/app/quiz/results/page.tsx',

  // Contact API
  'src/app/api/contact/route.ts',
  'src/app/contact/page.tsx',

  // SEO
  'src/lib/seo-pages.ts',

  // Product pages
  'src/app/products/[slug]/page.tsx',
  'src/app/products/trial/page.tsx',
  'src/app/products/planner/page.tsx',
  'src/app/products/premium/page.tsx',
  'src/app/products/bundle/page.tsx',
  'src/app/products/page.tsx',

  // Header with search fix
  'src/components/layout/Header.tsx',

  // Translation files
  'messages/ar.json',
  'messages/en.json',

  // Layout files for SEO
  'src/app/products/layout.tsx',
  'src/app/apps/layout.tsx',
  'src/app/quiz/layout.tsx',
  'src/app/about/layout.tsx',
  'src/app/contact/layout.tsx',
  'src/app/blog/layout.tsx',
  'src/app/methodology/layout.tsx',
  'src/app/faq/layout.tsx',
  'src/app/privacy/layout.tsx',
  'src/app/terms/layout.tsx',
  'src/app/refund/layout.tsx',
  'src/app/cart/layout.tsx',
  'src/app/account/layout.tsx',

  // LocaleProvider fix
  'src/components/providers/LocaleProvider.tsx',

  // Main layout
  'src/app/layout.tsx',

  // next.config
  'next.config.ts',
];

async function deploy() {
  console.log('Connecting to server...');
  await ssh.connect(config);
  console.log('Connected!\n');

  let uploaded = 0;
  let failed = 0;

  for (const file of filesToUpload) {
    const localFile = join(localPath, file);
    const remoteFile = join(remotePath, file);

    try {
      const content = readFileSync(localFile, 'utf-8');
      const base64 = Buffer.from(content).toString('base64');

      // Create directory
      const dir = join(remotePath, file.split('/').slice(0, -1).join('/'));
      await ssh.execCommand(`mkdir -p ${dir}`);

      // Write file
      const result = await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);

      if (result.stderr && !result.stderr.includes('warning')) {
        console.log(`✗ ${file}: ${result.stderr}`);
        failed++;
      } else {
        console.log(`✓ ${file}`);
        uploaded++;
      }
    } catch (err) {
      console.log(`⊘ ${file}: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Uploaded: ${uploaded}`);
  console.log(`Failed: ${failed}`);

  // Restart server
  console.log('\n=== Restarting server ===');
  await ssh.execCommand('pm2 restart tamkinly-nextjs');

  await new Promise(r => setTimeout(r, 5000));

  const status = await ssh.execCommand('pm2 list && ss -tlnp | grep 3001');
  console.log(status.stdout);

  ssh.dispose();
  console.log('\n✅ Deployment complete!');
}

deploy().catch(err => {
  console.error('Deployment failed:', err);
  process.exit(1);
});
