import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function quick() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Single command to restart
  const cmd = `pkill -9 -f "next" 2>/dev/null; cd /var/www/tamkinly && NODE_OPTIONS='--max-old-space-size=512' nohup node node_modules/.bin/next dev -p 3001 > /tmp/next.log 2>&1 &`;
  await ssh.execCommand(cmd);

  ssh.dispose();
  console.log('Restart command sent!');
}

quick().catch(e => console.error('Error:', e.message));
