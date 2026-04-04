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

  // Check Caddyfile
  console.log('=== Caddyfile ===');
  const caddy = await ssh.execCommand('cat /etc/caddy/Caddyfile 2>/dev/null || echo "Not found"');
  console.log(caddy.stdout.slice(0, 1000));

  // Check what port Next.js is configured for
  console.log('\n=== ecosystem.config.js ===');
  const eco = await ssh.execCommand('cat /var/www/tamkinly/ecosystem.config.js 2>/dev/null || echo "Not found"');
  console.log(eco.stdout.slice(0, 500));

  // Check running processes
  console.log('\n=== Node Processes ===');
  const ps = await ssh.execCommand('ps aux | grep -E "(next|node)" | grep -v grep');
  console.log(ps.stdout);

  // Check ports
  console.log('\n=== Listening Ports ===');
  const ports = await ssh.execCommand('ss -tlnp | grep -E "(3000|3001|80|443)"');
  console.log(ports.stdout);

  ssh.dispose();
}

check().catch(e => console.error('Error:', e.message));
