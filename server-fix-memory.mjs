import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function fix() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 20000
  });

  // Check swap
  console.log('=== Checking Swap ===');
  const swap = await ssh.execCommand('swapon --show');
  console.log(swap.stdout || 'No swap configured');

  // Create swap if not exists (helps with memory)
  console.log('\n=== Creating Swap (if needed) ===');
  const createSwap = `
    if [ ! -f /swapfile ]; then
      fallocate -l 1G /swapfile &&
      chmod 600 /swapfile &&
      mkswap /swapfile &&
      swapon /swapfile &&
      echo '/swapfile none swap sw 0 0' >> /etc/fstab &&
      echo 'Swap created';
    else
      echo 'Swap already exists';
    fi
  `;
  const swapResult = await ssh.execCommand(createSwap);
  console.log(swapResult.stdout);

  // Check memory again
  console.log('\n=== Memory Status ===');
  const mem = await ssh.execCommand('free -m');
  console.log(mem.stdout);

  // Start Next.js with very low memory
  console.log('\n=== Starting Next.js with Low Memory ===');
  const startCmd = `
    pkill -9 -f "next" 2>/dev/null || true
    cd /var/www/tamkinly
    NODE_OPTIONS='--max-old-space-size=300' nohup node node_modules/.bin/next dev -p 3001 > /tmp/next.log 2>&1 &
    disown
    echo 'Started'
  `;
  await ssh.execCommand(startCmd);

  // Wait and check
  await new Promise(r => setTimeout(r, 5000));

  const port = await ssh.execCommand('ss -tlnp | grep 3001');
  console.log('Port 3001:', port.stdout || 'Checking...');

  const ps = await ssh.execCommand('ps aux | grep "next" | grep -v grep | head -2');
  console.log('Process:', ps.stdout || 'Starting...');

  ssh.dispose();
}

fix().catch(e => console.error('Error:', e.message));
