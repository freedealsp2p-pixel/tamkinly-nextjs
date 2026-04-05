import { NodeSSH } from 'node-ssh';
import { readFileSync } from 'fs';

const ssh = new NodeSSH();

async function fix() {
  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!');

  // Upload LocaleProvider
  console.log('Uploading LocaleProvider...');
  const file = 'src/components/providers/LocaleProvider.tsx';
  const content = readFileSync('/home/z/my-project/' + file, 'utf-8');
  const base64 = Buffer.from(content).toString('base64');
  await ssh.execCommand(`mkdir -p /var/www/tamkinly/src/components/providers`);
  await ssh.execCommand(`echo "${base64}" | base64 -d > "/var/www/tamkinly/${file}"`);
  console.log('✓ Uploaded');

  // Start build in background with nohup
  console.log('Starting build in background...');
  await ssh.execCommand('cd /var/www/tamkinly && nohup /root/.bun/bin/bun run build > /tmp/tamkinly-build.log 2>&1 & echo $!');
  
  console.log('Build started. Check /tmp/tamkinly-build.log on server for progress.');
  
  ssh.dispose();
}

fix().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
