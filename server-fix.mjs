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

  // Execute commands that run in background
  console.log('=== Stopping old processes ===');
  await ssh.execCommand('pm2 stop all 2>/dev/null; pm2 delete all 2>/dev/null; pkill -f "next dev" 2>/dev/null');

  await new Promise(r => setTimeout(r, 2000));

  console.log('=== Starting server in background ===');
  // Use nohup and redirect output to avoid hanging
  await ssh.execCommand('cd /var/www/tamkinly && nohup pm2 start npm --name "tamkinly-nextjs" -- run dev -- -p 3001 > /tmp/pm2-start.log 2>&1 &');

  await new Promise(r => setTimeout(r, 5000));

  console.log('=== Checking if server started ===');
  const port = await ssh.execCommand('ss -tlnp 2>/dev/null | grep 3001 | head -1 || echo "Checking..."');
  console.log('Port check:', port.stdout || 'No output');

  const ps = await ssh.execCommand('ps aux | grep "next" | grep -v grep | head -2 || echo "No process"');
  console.log('Process check:', ps.stdout);

  ssh.dispose();
  console.log('\n✅ Commands sent! Server should be starting.');
  console.log('Please wait 30-60 seconds and check https://tamkinly.com');
}

fix().catch(e => console.error('Error:', e.message));
