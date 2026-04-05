import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function start() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Kill everything
  console.log('=== Killing existing processes ===');
  await ssh.execCommand('pm2 delete all 2>/dev/null; pkill -9 -f "next" 2>/dev/null; sleep 2');

  // Check ecosystem config
  console.log('\n=== PM2 Ecosystem Config ===');
  const eco = await ssh.execCommand('cat /var/www/tamkinly/ecosystem.config.js');
  console.log(eco.stdout.slice(0, 800));

  // Create a minimal PM2 config for dev mode with low memory
  const pm2Config = `
module.exports = {
  apps: [{
    name: 'tamkinly-nextjs',
    script: 'node_modules/.bin/next',
    args: 'dev -p 3001',
    cwd: '/var/www/tamkinly',
    instances: 1,
    exec_mode: 'fork',
    max_memory_restart: '350M',
    node_args: '--max-old-space-size=300',
    env: {
      NODE_ENV: 'development',
      NEXT_PRIVATE_DISABLE_TURBOPACK: '1'
    },
    watch: false,
    autorestart: true,
    max_restarts: 10,
    restart_delay: 3000
  }]
};
`;

  console.log('\n=== Writing new PM2 config ===');
  const base64 = Buffer.from(pm2Config).toString('base64');
  await ssh.execCommand(`echo "${base64}" | base64 -d > /var/www/tamkinly/ecosystem.config.js`);

  console.log('\n=== Starting with PM2 ===');
  await ssh.execCommand('cd /var/www/tamkinly && pm2 start ecosystem.config.js');

  await new Promise(r => setTimeout(r, 5000));

  console.log('\n=== PM2 Status ===');
  const status = await ssh.execCommand('pm2 list');
  console.log(status.stdout);

  console.log('\n=== Port Check ===');
  const port = await ssh.execCommand('ss -tlnp | grep 3001');
  console.log(port.stdout || 'Not yet listening');

  ssh.dispose();
}

start().catch(e => console.error('Error:', e.message));
