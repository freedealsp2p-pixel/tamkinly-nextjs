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
  console.log('Connected!');

  // Run build in background with nohup
  const result = await ssh.execCommand(
    'cd /var/www/tamkinly && nohup bash -c "rm -rf .next && NODE_OPTIONS=\\"--max-old-space-size=768\\" /root/.bun/bin/bun run build && pm2 restart tamkinly-nextjs" > /tmp/build.log 2>&1 &'
  );
  console.log('Build started in background');

  // Wait a moment and check log
  await new Promise(r => setTimeout(r, 3000));
  const logResult = await ssh.execCommand('tail -20 /tmp/build.log 2>/dev/null || echo "Build still starting..."');
  console.log('Initial log:\n', logResult.stdout);

  ssh.dispose();
}

build().catch(err => console.error('Failed:', err.message));
