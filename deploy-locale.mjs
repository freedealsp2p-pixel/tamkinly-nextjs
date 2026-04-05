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
  const result = await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);
  console.log(result.stderr || '✓ Uploaded LocaleProvider');

  // Build in background and restart
  console.log('Starting build in background...');
  await ssh.execCommand('cd /var/www/tamkinly && nohup /root/.bun/bin/bun run build > /tmp/build.log 2>&1 &');
  
  // Wait a moment then restart
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Restarting PM2...');
  const restartResult = await ssh.execCommand('pm2 restart tamkinly-nextjs');
  console.log(restartResult.stdout || restartResult.stderr);

  ssh.dispose();
  console.log('Done! Build is running in background. Check /tmp/build.log on server for status.');
}

deploy().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
