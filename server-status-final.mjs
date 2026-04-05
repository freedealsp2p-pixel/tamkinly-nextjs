import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function check() {
  console.log('Connecting...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!\n');

  // Check port
  console.log('=== Port Status ===');
  const port = await ssh.execCommand('ss -tlnp | grep 3001');
  console.log(port.stdout || 'Port 3001 not found');

  // Check Next.js log
  console.log('\n=== Next.js Log (last 15 lines) ===');
  const log = await ssh.execCommand('tail -15 /tmp/next.log 2>/dev/null || echo "No log yet"');
  console.log(log.stdout);

  // Check process
  console.log('\n=== Process ===');
  const ps = await ssh.execCommand('ps aux | grep "next" | grep -v grep | head -2');
  console.log(ps.stdout);

  ssh.dispose();
}

check().catch(e => console.error('Error:', e.message));
