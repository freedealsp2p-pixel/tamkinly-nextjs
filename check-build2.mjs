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

  // Check build log
  const logResult = await ssh.execCommand('tail -50 /tmp/tamkinly-build.log 2>/dev/null || echo "No build log found"');
  console.log('Build Log:\n', logResult.stdout);

  // Check if server.js exists
  const checkResult = await ssh.execCommand('ls -la /var/www/tamkinly/.next/standalone/server.js 2>&1');
  console.log('\nServer.js check:', checkResult.stdout);

  ssh.dispose();
}

check().catch(err => console.error('Error:', err.message));
