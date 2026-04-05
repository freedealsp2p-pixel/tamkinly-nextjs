import { NodeSSH } from 'node-ssh';

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

  // Run build and restart
  console.log('Running build and restart...');
  const result = await ssh.execCommand('cd /var/www/tamkinly && /root/.bun/bin/bun run build && pm2 restart tamkinly-nextjs', {
    execOptions: { timeout: 300000 }
  });
  console.log(result.stdout);
  if (result.stderr) console.log('stderr:', result.stderr);

  ssh.dispose();
  console.log('Done!');
}

deploy().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
