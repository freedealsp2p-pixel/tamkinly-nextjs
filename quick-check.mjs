import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function check() {
  try {
    await ssh.connect({
      host: '192.3.218.191',
      port: 2222,
      username: 'root',
      password: 'g40d7KJfMyWrb2G3T1'
    });
    
    const result = await ssh.execCommand('pm2 status');
    console.log(result.stdout);
  } finally {
    ssh.dispose();
  }
}

check();
