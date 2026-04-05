import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function verify() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Test the website locally on the server
  console.log('=== Testing Website Response ===');
  const test = await ssh.execCommand('curl -s -o /dev/null -w "%{http_code}" http://localhost:3001/ 2>/dev/null || echo "failed"');
  console.log('HTTP Status:', test.stdout);

  // Check PM2 logs
  console.log('\n=== PM2 Logs (last 10 lines) ===');
  const logs = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 10 --nostream 2>/dev/null');
  console.log(logs.stdout.slice(-1000));

  // Check memory
  console.log('\n=== Current Memory ===');
  const mem = await ssh.execCommand('free -m | head -2');
  console.log(mem.stdout);

  // PM2 Status
  console.log('\n=== PM2 Status ===');
  const status = await ssh.execCommand('pm2 list');
  console.log(status.stdout);

  ssh.dispose();
}

verify().catch(e => console.error('Error:', e.message));
