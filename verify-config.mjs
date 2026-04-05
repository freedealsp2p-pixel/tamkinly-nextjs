import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function verifyConfig() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  console.log('=== next.config.ts on server ===');
  const configResult = await ssh.execCommand('cat /var/www/tamkinly/next.config.ts');
  console.log(configResult.stdout);

  console.log('\n=== Package.json build script ===');
  const pkgResult = await ssh.execCommand('cat /var/www/tamkinly/package.json | grep -A2 "build"');
  console.log(pkgResult.stdout);

  ssh.dispose();
}

verifyConfig().catch(err => console.error('Failed:', err.message));
