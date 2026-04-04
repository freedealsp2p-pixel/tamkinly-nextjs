import { NodeSSH } from 'node-ssh';

async function check() {
  const ssh = new NodeSSH();
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  // Check if build is running
  const psResult = await ssh.execCommand('ps aux | grep -E "bun|next" | grep -v grep');
  console.log('Running processes:\n', psResult.stdout || 'None');

  // Check build log
  const logResult = await ssh.execCommand('tail -50 /tmp/build.log 2>/dev/null || echo "No build log"');
  console.log('\nBuild log:\n', logResult.stdout);

  ssh.dispose();
}

check().catch(err => console.error('Failed:', err.message));
