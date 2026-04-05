import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkServer() {
  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('✓ Connected!\n');

  // Check PM2 status
  console.log('=== PM2 Status ===');
  const pm2Result = await ssh.execCommand('pm2 status');
  console.log(pm2Result.stdout);

  // Check memory
  console.log('\n=== Memory Status ===');
  const memResult = await ssh.execCommand('free -h');
  console.log(memResult.stdout);

  // Check PM2 logs (last 20 lines)
  console.log('\n=== Recent PM2 Logs ===');
  const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 20 --nostream');
  console.log(logsResult.stdout || logsResult.stderr);

  // Check if running in dev or production mode
  console.log('\n=== PM2 Process Info ===');
  const infoResult = await ssh.execCommand('pm2 show tamkinly-nextjs | grep -E "(script|exec_mode|instances|restarts)"');
  console.log(infoResult.stdout);

  ssh.dispose();
}

checkServer().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
