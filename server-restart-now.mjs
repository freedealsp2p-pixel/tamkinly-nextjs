import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function restart() {
  console.log('Connecting...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!');

  // Kill old processes
  console.log('\n1. Killing old processes...');
  await ssh.execCommand('pkill -9 -f "next" 2>/dev/null || true');
  await new Promise(r => setTimeout(r, 1500));

  // Start fresh on port 3001
  console.log('\n2. Starting Next.js on port 3001...');
  await ssh.execCommand(`cd /var/www/tamkinly && NODE_OPTIONS='--max-old-space-size=512' nohup node node_modules/.bin/next dev -p 3001 > /tmp/next.log 2>&1 & disown`);

  // Wait and check
  console.log('\n3. Waiting for startup...');
  await new Promise(r => setTimeout(r, 5000));

  const port = await ssh.execCommand('ss -tlnp | grep 3001');
  console.log('Port 3001:', port.stdout || 'Not ready yet');

  const log = await ssh.execCommand('tail -5 /tmp/next.log 2>/dev/null');
  console.log('Log:', log.stdout);

  ssh.dispose();
  console.log('\n✅ Done!');
}

restart().catch(e => console.error('Error:', e.message));
