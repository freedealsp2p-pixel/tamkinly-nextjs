import { NodeSSH } from 'node-ssh';
import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, basename } from 'path';

const ssh = new NodeSSH();

const SERVER_CONFIG = {
  host: '192.3.218.191',
  port: 2222,
  username: 'root',
  password: 'g40d7KJfMyWrb2G3T1',
  readyTimeout: 30000
};

const REMOTE_PATH = '/var/www/tamkinly';

async function uploadFile(ssh, localPath, remotePath) {
  const content = readFileSync(localPath, 'utf-8');
  const base64 = Buffer.from(content).toString('base64');
  const remoteDir = remotePath.substring(0, remotePath.lastIndexOf('/'));
  await ssh.execCommand(`mkdir -p ${remoteDir}`);
  await ssh.execCommand(`echo "${base64}" | base64 -d > "${remotePath}"`);
  console.log(`  ✓ ${basename(localPath)}`);
}

async function deploy() {
  console.log('🚀 Deploying SEO fixes to production...\n');
  
  console.log('Connecting to server...');
  await ssh.connect(SERVER_CONFIG);
  console.log('Connected!\n');

  // 1. Upload library files
  console.log('📦 Uploading library files...');
  await uploadFile(ssh, 
    '/home/z/my-project/src/lib/blog-articles.ts',
    `${REMOTE_PATH}/src/lib/blog-articles.ts`
  );
  await uploadFile(ssh,
    '/home/z/my-project/src/lib/app-pages.ts',
    `${REMOTE_PATH}/src/lib/app-pages.ts`
  );

  // 2. Upload robots.txt
  console.log('\n📦 Uploading robots.txt...');
  await uploadFile(ssh,
    '/home/z/my-project/public/robots.txt',
    `${REMOTE_PATH}/public/robots.txt`
  );

  // 3. Upload blog article layouts
  console.log('\n📦 Uploading blog article layouts...');
  const blogDir = '/home/z/my-project/src/app/blog';
  const blogFolders = readdirSync(blogDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  let blogCount = 0;
  for (const folder of blogFolders) {
    const layoutPath = join(blogDir, folder, 'layout.tsx');
    if (existsSync(layoutPath)) {
      await uploadFile(ssh, layoutPath, `${REMOTE_PATH}/src/app/blog/${folder}/layout.tsx`);
      blogCount++;
    }
  }
  console.log(`  Total: ${blogCount} blog layouts`);

  // 4. Upload app page layouts
  console.log('\n📦 Uploading app page layouts...');
  const appsDir = '/home/z/my-project/src/app/apps';
  const appsFolders = readdirSync(appsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);
  
  let appsCount = 0;
  for (const folder of appsFolders) {
    const layoutPath = join(appsDir, folder, 'layout.tsx');
    if (existsSync(layoutPath)) {
      await uploadFile(ssh, layoutPath, `${REMOTE_PATH}/src/app/apps/${folder}/layout.tsx`);
      appsCount++;
    }
  }
  console.log(`  Total: ${appsCount} app layouts`);

  // 5. Restart PM2
  console.log('\n🔄 Restarting PM2 process...');
  const result = await ssh.execCommand(`cd ${REMOTE_PATH} && pm2 restart tamkinly-nextjs`);
  console.log(result.stdout || result.stderr);

  ssh.dispose();
  console.log('\n✅ Deployment complete!');
  console.log(`   - ${blogCount} blog article layouts`);
  console.log(`   - ${appsCount} app page layouts`);
  console.log('   - Library files uploaded');
  console.log('   - robots.txt updated');
}

deploy().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
