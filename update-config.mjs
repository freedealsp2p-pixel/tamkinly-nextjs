import { NodeSSH } from 'node-ssh';
import { readFileSync } from 'fs';

const ssh = new NodeSSH();

async function update() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Upload next.config.ts
  console.log('=== Uploading next.config.ts ===');
  const content = readFileSync('/home/z/my-project/next.config.ts', 'utf-8');
  const base64 = Buffer.from(content).toString('base64');
  await ssh.execCommand(`echo "${base64}" | base64 -d > /var/www/tamkinly/next.config.ts`);
  console.log('Uploaded');

  // Restart PM2
  console.log('\n=== Restarting PM2 ===');
  await ssh.execCommand('pm2 restart tamkinly-nextjs');
  console.log('Restarted');

  await new Promise(r => setTimeout(r, 5000));

  // Check status
  console.log('\n=== Status ===');
  const status = await ssh.execCommand('pm2 list');
  console.log(status.stdout);

  ssh.dispose();
}

update().catch(e => console.error('Error:', e.message));
