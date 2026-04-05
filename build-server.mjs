import { NodeSSH } from 'node-ssh';

async function build() {
  const ssh = new NodeSSH();
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected! Starting build...');

  const result = await ssh.execCommand(
    'cd /var/www/tamkinly && rm -rf .next && NODE_OPTIONS="--max-old-space-size=768" /root/.bun/bin/bun run build 2>&1',
    { execOptions: { maxBuffer: 1024 * 1024 * 10 } }
  );
  
  console.log('Build output:');
  console.log(result.stdout.slice(-5000));
  if (result.stderr) {
    console.log('Stderr:', result.stderr.slice(-2000));
  }

  console.log('\nRestarting PM2...');
  const restartResult = await ssh.execCommand('pm2 restart tamkinly-nextjs');
  console.log(restartResult.stdout || 'Restarted');

  ssh.dispose();
  console.log('\n✅ Build complete!');
}

build().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
