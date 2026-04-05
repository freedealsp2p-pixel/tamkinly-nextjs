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

  // Check all ports
  console.log('=== All Listening Ports ===');
  const ports = await ssh.execCommand('ss -tlnp | head -20');
  console.log(ports.stdout);

  // Check processes
  console.log('\n=== Node Processes ===');
  const ps = await ssh.execCommand('ps aux | grep -E "node|next" | grep -v grep');
  console.log(ps.stdout || 'No node processes');

  // Memory
  console.log('\n=== Memory ===');
  const mem = await ssh.execCommand('free -m | head -2');
  console.log(mem.stdout);

  // Last log
  console.log('\n=== Last Log Lines ===');
  const log = await ssh.execCommand('tail -20 /tmp/next.log');
  console.log(log.stdout);

  ssh.dispose();
}

check().catch(e => console.error('Error:', e.message));
