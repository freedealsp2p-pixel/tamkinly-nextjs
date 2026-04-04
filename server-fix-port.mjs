import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fix() {
  console.log('Connecting...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!\n');

  // Kill all node processes
  console.log('=== Stopping all processes ===');
  await ssh.execCommand('pkill -9 -f "next" 2>/dev/null || true');
  await ssh.execCommand('pm2 delete all 2>/dev/null || true');
  await new Promise(r => setTimeout(r, 2000));

  // Start on correct port 3001
  console.log('=== Starting Next.js on port 3001 ===');
  const startCmd = `cd /var/www/tamkinly && NEXT_PRIVATE_DISABLE_TURBOPACK=1 NODE_OPTIONS='--max-old-space-size=384' nohup node node_modules/.bin/next dev -p 3001 > /tmp/next.log 2>&1 &`;
  await ssh.execCommand(startCmd);

  await new Promise(r => setTimeout(r, 5000));

  console.log('=== Checking port 3001 ===');
  const port = await ssh.execCommand('ss -tlnp | grep 3001');
  console.log(port.stdout || 'Port 3001 not found yet, waiting more...');

  if (!port.stdout) {
    await new Promise(r => setTimeout(r, 5000));
    const port2 = await ssh.execCommand('ss -tlnp | grep 3001');
    console.log(port2.stdout || 'Still starting...');
  }

  // Check process
  console.log('\n=== Running processes ===');
  const ps = await ssh.execCommand('ps aux | grep "next" | grep -v grep | head -3');
  console.log(ps.stdout);

  ssh.dispose();
  console.log('\n✅ Done! Check https://tamkinly.com');
}

fix().catch(e => console.error('Error:', e.message));
