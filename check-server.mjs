import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function check() {
  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!');

  // Check PM2 status
  console.log('\n=== PM2 Status ===');
  const pm2Result = await ssh.execCommand('pm2 status');
  console.log(pm2Result.stdout);

  // Check if port 3001 is listening
  console.log('\n=== Port 3001 ===');
  const portResult = await ssh.execCommand('netstat -tlnp | grep 3001');
  console.log(portResult.stdout || 'No process on port 3001');

  // Check recent logs
  console.log('\n=== PM2 Logs (last 20 lines) ===');
  const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 20 --nostream');
  console.log(logsResult.stdout);

  ssh.dispose();
}

check().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
