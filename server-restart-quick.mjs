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

  // Create a restart script on the server
  const script = `#!/bin/bash
pkill -9 -f "next" 2>/dev/null
sleep 1
cd /var/www/tamkinly
NODE_OPTIONS='--max-old-space-size=384' nohup node node_modules/.bin/next dev -p 3001 > /tmp/next.log 2>&1 &
sleep 2
echo "Port check:"
ss -tlnp | grep 3001 || echo "Starting..."
`;

  console.log('\nCreating restart script...');
  const base64 = Buffer.from(script).toString('base64');
  await ssh.execCommand(`echo "${base64}" | base64 -d > /tmp/restart.sh && chmod +x /tmp/restart.sh`);

  console.log('Running restart script in background...');
  // Run script and disconnect
  await ssh.execCommand('nohup /tmp/restart.sh > /tmp/restart-out.log 2>&1 &');

  // Quick check
  await new Promise(r => setTimeout(r, 4000));
  const check = await ssh.execCommand('cat /tmp/restart-out.log 2>/dev/null | tail -10');
  console.log('Output:', check.stdout);

  ssh.dispose();
  console.log('\n✅ Restart script executed!');
  console.log('Check https://tamkinly.com in 30-60 seconds');
}

restart().catch(e => console.error('Error:', e.message));
