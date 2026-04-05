import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fixProductionStart() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Fixing Production Start Command');
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

  // Stop and delete old PM2 process
  console.log('Stopping old PM2 process...');
  await ssh.execCommand('pm2 stop tamkinly-nextjs 2>/dev/null || true');
  await ssh.execCommand('pm2 delete tamkinly-nextjs 2>/dev/null || true');

  // Check if build exists
  console.log('Checking build...');
  const buildCheck = await ssh.execCommand('cat /var/www/tamkinly/.next/BUILD_ID 2>/dev/null');
  console.log('BUILD_ID:', buildCheck.stdout || 'Not found');

  if (buildCheck.stdout) {
    // Start with npx next start (not npm start which uses standalone)
    console.log('\nStarting PM2 with production command (npx next start)...');
    
    // Use npx next start -p 3001 in production mode
    const startResult = await ssh.execCommand(
      'cd /var/www/tamkinly && pm2 start npx --name "tamkinly-nextjs" -- next start -p 3001'
    );
    console.log(startResult.stdout || startResult.stderr);
    
    // Save PM2 config
    await ssh.execCommand('pm2 save');
    
    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check status
    console.log('\n=== PM2 Status ===');
    const statusResult = await ssh.execCommand('pm2 status');
    console.log(statusResult.stdout);
    
    // Check logs
    console.log('\n=== PM2 Logs ===');
    const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 15 --nostream');
    console.log(logsResult.stdout || logsResult.stderr);

    // Test if site is accessible
    console.log('\n=== Testing Site ===');
    const testResult = await ssh.execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/');
    console.log('HTTP Status:', testResult.stdout);
    
    // Check if running in production mode (no Turbopack in output)
    const htmlCheck = await ssh.execCommand('curl -s http://localhost:3001/ | grep -c "turbopack" || echo "0"');
    console.log('Contains Turbopack references:', htmlCheck.stdout.trim() === '0' ? 'No (Production!)' : 'Yes (Still Development)');
  } else {
    console.log('❌ No build found. Cannot start in production mode.');
    
    // Restart in dev mode as fallback
    console.log('Restarting in development mode...');
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

fixProductionStart().catch(err => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
