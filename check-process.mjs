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

  // Check running processes
  console.log('=== Running Processes ===');
  const psResult = await ssh.execCommand('ps aux | grep -E "(next|bun|node)" | grep -v grep');
  console.log(psResult.stdout || 'No matching processes');

  // Check memory
  console.log('\n=== Memory ===');
  const memResult = await ssh.execCommand('free -h');
  console.log(memResult.stdout);

  // Check full build log
  console.log('\n=== Full Build Log ===');
  const logResult = await ssh.execCommand('cat /tmp/tamkinly-build.log 2>/dev/null | tail -100');
  console.log(logResult.stdout || 'No build log');

  ssh.dispose();
}

check().catch(err => console.error('Error:', err.message));
