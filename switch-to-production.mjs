import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function switchToProduction() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Switching to Production Mode');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('✓ Connected!\n');

  // Check if production build exists
  console.log('Checking if production build exists...');
  const buildCheck = await ssh.execCommand('ls -la /var/www/tamkinly/.next/BUILD_ID');
  console.log(buildCheck.stdout || buildCheck.stderr);

  // Check memory
  console.log('\n=== Memory Status ===');
  const memResult = await ssh.execCommand('free -h');
  console.log(memResult.stdout);

  // Stop current PM2 process
  console.log('\nStopping current PM2 process...');
  const stopResult = await ssh.execCommand('pm2 stop tamkinly-nextjs');
  console.log(stopResult.stdout || stopResult.stderr);

  // Check if we need to build
  if (!buildCheck.stdout.includes('BUILD_ID')) {
    console.log('\n⚠ No production build found. Attempting to build...');
    
    // Set memory limit for build
    console.log('Building with limited memory (this may take a few minutes)...');
    const buildResult = await ssh.execCommand(
      'cd /var/www/tamkinly && NODE_OPTIONS="--max-old-space-size=768" bun run build',
      { execOptions: { maxBuffer: 10 * 1024 * 1024, timeout: 300000 } }
    );
    console.log(buildResult.stdout.slice(-2000) || buildResult.stderr);
  }

  // Start PM2 with production command
  console.log('\nStarting PM2 in production mode...');
  
  // First, delete old process
  await ssh.execCommand('pm2 delete tamkinly-nextjs 2>/dev/null || true');
  
  // Start with production command
  const startResult = await ssh.execCommand(
    'cd /var/www/tamkinly && pm2 start npm --name "tamkinly-nextjs" -- start -- -p 3001'
  );
  console.log(startResult.stdout || startResult.stderr);

  // Save PM2 config
  await ssh.execCommand('pm2 save');

  // Check status
  console.log('\n=== PM2 Status ===');
  const statusResult = await ssh.execCommand('pm2 status');
  console.log(statusResult.stdout);

  // Wait a moment then check if it's running
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('\n=== PM2 Logs (last 10 lines) ===');
  const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 10 --nostream');
  console.log(logsResult.stdout || logsResult.stderr);

  ssh.dispose();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Switch Complete!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

switchToProduction().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
