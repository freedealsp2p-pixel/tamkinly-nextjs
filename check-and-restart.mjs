import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkAndRestart() {
  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('✓ Connected!\n');

  // Check PM2 status
  console.log('=== PM2 Status ===');
  const statusResult = await ssh.execCommand('pm2 status');
  console.log(statusResult.stdout);

  // Check memory
  console.log('\n=== Memory Status ===');
  const memResult = await ssh.execCommand('free -h');
  console.log(memResult.stdout);

  // Check if build exists
  console.log('\n=== Build Check ===');
  const buildCheck = await ssh.execCommand('ls -la /var/www/tamkinly/.next/ 2>/dev/null | head -20 || echo "No .next folder"');
  console.log(buildCheck.stdout);

  // Check PM2 logs
  console.log('\n=== Recent PM2 Logs ===');
  const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 20 --nostream 2>&1');
  console.log(logsResult.stdout || logsResult.stderr);

  // Check for running build process
  console.log('\n=== Running Processes ===');
  const psResult = await ssh.execCommand('ps aux | grep -E "(next|node)" | grep -v grep | head -10');
  console.log(psResult.stdout);

  ssh.dispose();
}

checkAndRestart().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
