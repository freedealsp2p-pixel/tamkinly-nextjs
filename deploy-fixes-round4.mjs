import { NodeSSH } from 'node-ssh';
import { readFileSync, existsSync } from 'fs';

const ssh = new NodeSSH();

// Server configuration
const SERVER = {
  host: '192.3.218.191',
  port: 2222,
  username: 'root',
  password: 'g40d7KJfMyWrb2G3T1',
  readyTimeout: 30000
};

const APP_DIR = '/var/www/tamkinly';

// Files to upload
const FILES_TO_UPLOAD = [
  'src/lib/seo-pages.ts',
  'src/app/layout.tsx',
  'src/app/resources/layout.tsx',
  'src/app/privacy/page.tsx',
];

async function deploy() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Deploying Round 4 Fixes to Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('Connecting to server...');
  await ssh.connect(SERVER);
  console.log('✓ Connected!\n');

  // Upload each file
  for (const file of FILES_TO_UPLOAD) {
    const localPath = '/home/z/my-project/' + file;
    const remotePath = APP_DIR + '/' + file;
    
    if (!existsSync(localPath)) {
      console.log(`⚠ Skipping ${file} (not found locally)`);
      continue;
    }

    console.log(`Uploading ${file}...`);
    
    // Create directory if needed
    const dir = remotePath.substring(0, remotePath.lastIndexOf('/'));
    await ssh.execCommand(`mkdir -p "${dir}"`);
    
    // Read and encode file
    const content = readFileSync(localPath, 'utf-8');
    const base64 = Buffer.from(content).toString('base64');
    
    // Upload via base64
    const result = await ssh.execCommand(`echo "${base64}" | base64 -d > "${remotePath}"`);
    
    if (result.stderr && !result.stderr.includes('warning')) {
      console.log(`  ✗ Error: ${result.stderr}`);
    } else {
      console.log(`  ✓ Uploaded`);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Restarting Server');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Restart PM2 to apply changes
  console.log('Restarting PM2 process...');
  const restartResult = await ssh.execCommand('pm2 restart tamkinly-nextjs');
  console.log(restartResult.stdout || restartResult.stderr);

  // Check PM2 status
  console.log('\nChecking PM2 status...');
  const statusResult = await ssh.execCommand('pm2 status');
  console.log(statusResult.stdout);

  ssh.dispose();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Deployment Complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('🌐 Website: https://tamkinly.com');
  console.log('⏳ Wait 30 seconds for server to restart...\n');
}

deploy().catch(err => {
  console.error('❌ Deployment failed:', err.message);
  process.exit(1);
});
