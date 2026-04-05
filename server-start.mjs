import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function start() {
  console.log('Connecting...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!');

  // Run commands sequentially with short timeouts
  console.log('\n1. Killing old processes...');
  await ssh.execCommand('pkill -9 -f "next" 2>/dev/null');
  console.log('Done');

  console.log('\n2. Starting Next.js on port 3001...');
  await ssh.execCommand(`cd /var/www/tamkinly && NODE_OPTIONS='--max-old-space-size=384' nohup node node_modules/.bin/next dev -p 3001 > /tmp/next.log 2>&1 & disown`);
  console.log('Started in background');

  console.log('\n3. Saving PM2 config...');
  await ssh.execCommand(`pm2 save 2>/dev/null || true`);

  console.log('\n4. Quick port check...');
  await new Promise(r => setTimeout(r, 3000));
  const port = await ssh.execCommand('ss -tlnp 2>/dev/null | grep -E "300[01]" | head -2');
  console.log('Ports:', port.stdout || 'Waiting...');

  ssh.dispose();
  console.log('\n✅ Server should be starting on port 3001');
  console.log('Please wait 30-60 seconds and check https://tamkinly.com');
}

start().catch(e => console.error('Error:', e.message));
