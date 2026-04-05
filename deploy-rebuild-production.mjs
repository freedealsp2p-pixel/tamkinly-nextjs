import { NodeSSH } from 'node-ssh';
import { readFileSync } from 'fs';

const ssh = new NodeSSH();

async function deployAndRebuild() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Deploying Config & Rebuilding');
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

  // Upload next.config.ts
  console.log('Uploading next.config.ts...');
  const configContent = readFileSync('/home/z/my-project/next.config.ts', 'utf-8');
  const configBase64 = Buffer.from(configContent).toString('base64');
  await ssh.execCommand(`echo "${configBase64}" | base64 -d > /var/www/tamkinly/next.config.ts`);
  console.log('✓ Uploaded');

  // Upload resources layout (just in case)
  console.log('Uploading resources layout...');
  const layoutContent = readFileSync('/home/z/my-project/src/app/resources/layout.tsx', 'utf-8');
  const layoutBase64 = Buffer.from(layoutContent).toString('base64');
  await ssh.execCommand(`mkdir -p /var/www/tamkinly/src/app/resources && echo "${layoutBase64}" | base64 -d > /var/www/tamkinly/src/app/resources/layout.tsx`);
  console.log('✓ Uploaded');

  // Stop PM2
  console.log('\nStopping PM2...');
  await ssh.execCommand('pm2 stop tamkinly-nextjs 2>/dev/null || true');
  await ssh.execCommand('pm2 delete tamkinly-nextjs 2>/dev/null || true');

  // Clean old build
  console.log('Cleaning old build...');
  await ssh.execCommand('rm -rf /var/www/tamkinly/.next');

  // Check memory
  console.log('\n=== Memory Status ===');
  const memResult = await ssh.execCommand('free -h');
  console.log(memResult.stdout);

  // Build
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Building (2-3 minutes)...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const buildResult = await ssh.execCommand(
    'cd /var/www/tamkinly && NODE_OPTIONS="--max-old-space-size=768" npm run build 2>&1',
    { execOptions: { maxBuffer: 50 * 1024 * 1024, timeout: 600000 } }
  );

  // Show build result (last 50 lines)
  const lines = buildResult.stdout.split('\n');
  console.log(lines.slice(-50).join('\n'));

  // Check if build succeeded
  const buildCheck = await ssh.execCommand('cat /var/www/tamkinly/.next/BUILD_ID 2>/dev/null || echo "FAILED"');
  console.log('\nBUILD_ID:', buildCheck.stdout);

  if (buildCheck.stdout !== 'FAILED' && buildCheck.stdout.trim()) {
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Starting Production Server');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Start with npx next start -p 3001
    const startResult = await ssh.execCommand(
      'cd /var/www/tamkinly && pm2 start npx --name "tamkinly-nextjs" -- next start -p 3001'
    );
    console.log(startResult.stdout || startResult.stderr);

    await ssh.execCommand('pm2 save');

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Check status
    console.log('\n=== PM2 Status ===');
    const statusResult = await ssh.execCommand('pm2 status');
    console.log(statusResult.stdout);

    // Check logs
    console.log('\n=== PM2 Logs ===');
    const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 10 --nostream');
    console.log(logsResult.stdout || logsResult.stderr);

    // Test if running in production
    console.log('\n=== Testing Production Mode ===');
    const htmlCheck = await ssh.execCommand('curl -s http://localhost:3001/ | grep -c "turbopack" || echo "0"');
    const isProduction = htmlCheck.stdout.trim() === '0';
    console.log('Production mode:', isProduction ? '✅ YES!' : '❌ Still Development');

    // Test HTTP
    const httpCheck = await ssh.execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/');
    console.log('HTTP Status:', httpCheck.stdout);
  } else {
    console.log('\n❌ Build failed. Restarting in development mode...');
    await ssh.execCommand(
      'cd /var/www/tamkinly && pm2 start npm --name "tamkinly-nextjs" -- run dev -- -p 3001'
    );
    await ssh.execCommand('pm2 save');
  }

  ssh.dispose();
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Done!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

deployAndRebuild().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
