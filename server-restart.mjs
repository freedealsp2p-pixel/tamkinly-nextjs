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
  console.log('Connected!\n');

  // Kill all node processes and restart fresh
  console.log('=== Killing existing processes ===');
  await ssh.execCommand('pkill -9 -f "next" || true');
  await ssh.execCommand('pm2 delete all || true');
  await new Promise(r => setTimeout(r, 2000));

  console.log('=== Starting fresh ===');
  const start = await ssh.execCommand('cd /var/www/tamkinly && pm2 start npm --name "tamkinly-nextjs" -- run dev -- -p 3001');
  console.log(start.stdout);
  console.log(start.stderr);

  await new Promise(r => setTimeout(r, 3000));

  console.log('\n=== Checking port ===');
  const port = await ssh.execCommand('ss -tlnp | grep 3001 || echo "Not running"');
  console.log(port.stdout);

  ssh.dispose();
  console.log('\n✅ Done!');
}

restart().catch(e => console.error('Error:', e.message));
