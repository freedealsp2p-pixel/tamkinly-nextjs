import { NodeSSH } from 'node-ssh';
import { readFileSync } from 'fs';

const ssh = new NodeSSH();

async function deploy() {
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
  const file = 'src/components/providers/LocaleProvider.tsx';
  const localFile = '/home/z/my-project/' + file;
  const remoteFile = '/var/www/tamkinly/' + file;
  
  console.log(`Uploading ${file}...`);
  const content = readFileSync(localFile, 'utf-8');
  const base64 = Buffer.from(content).toString('base64');
  
  await ssh.execCommand(`mkdir -p /var/www/tamkinly/src/components/providers`);
  await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);
  console.log('✓ Uploaded LocaleProvider');

  ssh.dispose();
  console.log('Done! File uploaded. Run build manually on server if needed.');
}

deploy().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
