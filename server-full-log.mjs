import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function check() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Full log
  console.log('=== Full Next.js Log ===');
  const log = await ssh.execCommand('cat /tmp/next.log');
  console.log(log.stdout);

  // Check for errors
  console.log('\n=== System Messages ===');
  const dmesg = await ssh.execCommand('dmesg | tail -20 2>/dev/null || journalctl -xe --no-pager | tail -20');
  console.log(dmesg.stdout);

  ssh.dispose();
}

check().catch(e => console.error('Error:', e.message));
