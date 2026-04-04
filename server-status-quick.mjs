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

  // Check PM2 status
  console.log('=== PM2 Status ===');
  const pm2 = await ssh.execCommand('pm2 list --no-color');
  console.log(pm2.stdout);

  // Check port
  console.log('\n=== Port 3001 ===');
  const port = await ssh.execCommand('ss -tlnp | grep 3001 || echo "Port 3001 not in use"');
  console.log(port.stdout);

  // Quick restart if needed
  if (!port.stdout.includes('3001')) {
    console.log('\n=== Starting server ===');
    const start = await ssh.execCommand('cd /var/www/tamkinly && pm2 start npm --name "tamkinly-nextjs" -- run dev -- -p 3001');
    console.log(start.stdout);
  } else {
    console.log('\n=== Server is running, restarting ===');
    const restart = await ssh.execCommand('pm2 restart tamkinly-nextjs');
    console.log(restart.stdout);
  }

  ssh.dispose();
}

check().catch(e => console.error('Error:', e.message));
