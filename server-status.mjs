import { NodeSSH } from 'node-ssh';

async function status() {
  const ssh = new NodeSSH();
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  const result = await ssh.execCommand('pm2 status && curl -s -o /dev/null -w "%{http_code}" http://localhost:3001');
  console.log(result.stdout);
  console.log('HTTP Status:', result.stderr);

  ssh.dispose();
}

status().catch(err => console.error('Failed:', err.message));
