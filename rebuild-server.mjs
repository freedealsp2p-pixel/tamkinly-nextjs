import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function rebuild() {
  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!');

  // First check if LocaleProvider needs to be uploaded
  console.log('\n=== Uploading LocaleProvider ===');
  const { readFileSync } = await import('fs');
  const file = 'src/components/providers/LocaleProvider.tsx';
  const localFile = '/home/z/my-project/' + file;
  const remoteFile = '/var/www/tamkinly/' + file;
  const content = readFileSync(localFile, 'utf-8');
  const base64 = Buffer.from(content).toString('base64');
  await ssh.execCommand(`mkdir -p /var/www/tamkinly/src/components/providers`);
  await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);
  console.log('✓ LocaleProvider uploaded');

  // Run build
  console.log('\n=== Running build ===');
  const buildResult = await ssh.execCommand('cd /var/www/tamkinly && /root/.bun/bin/bun run build 2>&1', {
    execOptions: { timeout: 300000 }
  });
  console.log(buildResult.stdout.slice(-2000));
  if (buildResult.stderr) console.log('Build stderr:', buildResult.stderr.slice(-500));

  // Restart PM2
  console.log('\n=== Restarting PM2 ===');
  const restartResult = await ssh.execCommand('pm2 restart tamkinly-nextjs');
  console.log(restartResult.stdout);

  // Wait a moment and check status
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('\n=== Final Status ===');
  const statusResult = await ssh.execCommand('pm2 status && netstat -tlnp | grep 3001');
  console.log(statusResult.stdout);

  ssh.dispose();
  console.log('\nDone!');
}

rebuild().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
