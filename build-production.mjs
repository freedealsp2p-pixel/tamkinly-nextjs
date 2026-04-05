import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function buildAndStartProduction() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Building Production & Starting Server');
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

  // Stop PM2 first
  console.log('Stopping PM2...');
  await ssh.execCommand('pm2 stop tamkinly-nextjs 2>/dev/null || true');
  await ssh.execCommand('pm2 delete tamkinly-nextjs 2>/dev/null || true');

  // Check memory
  console.log('\n=== Memory Status ===');
  const memResult = await ssh.execCommand('free -h');
  console.log(memResult.stdout);

  // Clean old build
  console.log('\nCleaning old build...');
  await ssh.execCommand('rm -rf /var/www/tamkinly/.next');

  // Build with npm (not bun since it's not available)
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Building (this takes 2-3 minutes)...');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const buildResult = await ssh.execCommand(
    'cd /var/www/tamkinly && NODE_OPTIONS="--max-old-space-size=768" npm run build 2>&1',
    { execOptions: { maxBuffer: 50 * 1024 * 1024, timeout: 600000 } }
  );
  
  // Show build output (last 100 lines)
  const buildLines = buildResult.stdout.split('\n');
  console.log(buildLines.slice(-100).join('\n'));

  if (buildResult.stderr && !buildResult.stdout.includes('Build successful')) {
    console.log('\n⚠ Build stderr:', buildResult.stderr.slice(-500));
  }

  // Check if build succeeded
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Checking Build Result');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const buildCheck = await ssh.execCommand('ls -la /var/www/tamkinly/.next/standalone/server.js 2>/dev/null && echo "BUILD EXISTS" || echo "NO BUILD"');
  console.log(buildCheck.stdout);

  if (buildCheck.stdout.includes('BUILD EXISTS')) {
    // Start in production mode
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('  Starting in Production Mode');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Use ecosystem.config.js if it exists, otherwise create PM2 command
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
    
    // Wait and check logs
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    console.log('\n=== PM2 Logs ===');
    const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 15 --nostream');
    console.log(logsResult.stdout || logsResult.stderr);
  } else {
    console.log('\n❌ Build failed. Restarting in development mode...');
    
    // Restart in dev mode as fallback
    await ssh.execCommand(
      'cd /var/www/tamkinly && pm2 start npm --name "tamkinly-nextjs" -- run dev -- -p 3001'
    );
    await ssh.execCommand('pm2 save');
    
    const statusResult = await ssh.execCommand('pm2 status');
    console.log(statusResult.stdout);
  }

  ssh.dispose();
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ Done!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

buildAndStartProduction().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
