import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function testProduction() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  console.log('=== Testing Production Mode ===\n');

  // Test 1: Check for Turbopack in HTML
  console.log('1. Checking for Turbopack references in HTML...');
  const turbopackCheck = await ssh.execCommand('curl -s http://localhost:3001/ | grep -c "turbopack" || echo "0"');
  console.log('   Turbopack count:', turbopackCheck.stdout.trim());

  // Test 2: Check HTML size (dev mode is much larger)
  console.log('\n2. Checking HTML size...');
  const sizeCheck = await ssh.execCommand('curl -s http://localhost:3001/ | wc -c');
  console.log('   HTML size:', sizeCheck.stdout.trim(), 'bytes');
  console.log('   (Production is typically 20-50KB, Dev can be 100-200KB+)');

  // Test 3: Check for development scripts
  console.log('\n3. Checking for development scripts...');
  const devScriptsCheck = await ssh.execCommand('curl -s http://localhost:3001/ | grep -c "webpack" || echo "0"');
  console.log('   Webpack references:', devScriptsCheck.stdout.trim());

  // Test 4: Check server process
  console.log('\n4. Checking server process...');
  const psResult = await ssh.execCommand('ps aux | grep "next" | grep -v grep');
  console.log(psResult.stdout);

  // Test 5: PM2 logs
  console.log('\n5. Recent PM2 logs...');
  const logsResult = await ssh.execCommand('pm2 logs tamkinly-nextjs --lines 5 --nostream 2>&1');
  console.log(logsResult.stdout);

  // Test 6: Response time
  console.log('\n6. Response time test...');
  const timeResult = await ssh.execCommand('curl -s -o /dev/null -w "Total time: %{time_total}s\\n" http://localhost:3001/');
  console.log(timeResult.stdout);

  // Test 7: HTTP headers
  console.log('\n7. HTTP headers...');
  const headersResult = await ssh.execCommand('curl -s -I http://localhost:3001/ | head -15');
  console.log(headersResult.stdout);

  // Test specific pages
  console.log('\n8. Testing specific pages...');
  const pages = ['/', '/products', '/privacy', '/resources'];
  for (const page of pages) {
    const pageCheck = await ssh.execCommand(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3001${page}`);
    console.log(`   ${page}: ${pageCheck.stdout}`);
  }

  ssh.dispose();
}

testProduction().catch(err => console.error('Failed:', err.message));
