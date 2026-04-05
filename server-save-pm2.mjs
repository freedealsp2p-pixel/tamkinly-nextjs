import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function save() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Save PM2 config for startup
  console.log('=== Saving PM2 Configuration ===');
  const save = await ssh.execCommand('pm2 save');
  console.log(save.stdout);

  // Check if PM2 starts on boot
  console.log('\n=== PM2 Startup Status ===');
  const startup = await ssh.execCommand('pm2 startup');
  console.log(startup.stdout);
  console.log(startup.stderr);

  // Final status check
  console.log('\n=== Final Status ===');
  const status = await ssh.execCommand('pm2 list && echo "---" && ss -tlnp | grep 3001');
  console.log(status.stdout);

  ssh.dispose();
  console.log('\n✅ Done!');
}

save().catch(e => console.error('Error:', e.message));
