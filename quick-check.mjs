import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function check() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  // Quick check
  const logResult = await ssh.execCommand('tail -20 /tmp/tamkinly-build.log 2>/dev/null');
  console.log('Build Log:\n', logResult.stdout);

  const checkResult = await ssh.execCommand('ls /var/www/tamkinly/.next/standalone/server.js 2>&1');
  if (checkResult.stdout.includes('server.js')) {
    console.log('\n✓ Build complete!');
    await ssh.execCommand('pm2 restart tamkinly-nextjs');
    console.log('PM2 restarted');
  } else {
    console.log('\n⏳ Build still in progress...');
  }

  ssh.dispose();
}

check().catch(err => console.error('Error:', err.message));
