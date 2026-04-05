import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function check() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Check if production build exists
  console.log('=== Checking for Production Build ===');
  const build = await ssh.execCommand('ls -la /var/www/tamkinly/.next/standalone/ 2>/dev/null | head -5 || echo "No standalone build"');
  console.log(build.stdout);

  // Check .next folder
  console.log('\n=== .next folder ===');
  const next = await ssh.execCommand('ls -la /var/www/tamkinly/.next/ | head -10');
  console.log(next.stdout);

  // Check dmesg for recent OOM kills
  console.log('\n=== Recent OOM Kills ===');
  const oom = await ssh.execCommand('dmesg | grep -i "oom\\|killed" | tail -5');
  console.log(oom.stdout || 'No recent OOM kills');

  ssh.dispose();
}

check().catch(e => console.error('Error:', e.message));
