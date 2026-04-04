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
  console.log('Connected!');

  // Check current state
  const result = await ssh.execCommand('cd /var/www/tamkinly && ls -la src/app/admin/page.tsx && head -5 src/app/admin/page.tsx');
  console.log('Current admin page:\n', result.stdout);

  ssh.dispose();
}

check().catch(err => console.error('Failed:', err.message));
