import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkSEO() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  console.log('=== Checking SEO Fixes ===\n');

  // Check 1: hreflang
  console.log('1. Checking hreflang fix (should be x-default)...');
  const hreflang = await ssh.execCommand('curl -s http://localhost:3001/ | grep -o \'hrefLang="[^"]*"\' | head -5');
  console.log('   Result:', hreflang.stdout || 'Not found');

  // Check 2: Skip navigation
  console.log('\n2. Checking Skip Navigation link...');
  const skipNav = await ssh.execCommand('curl -s http://localhost:3001/ | grep -o \'Skip to main content\' | head -1');
  console.log('   Result:', skipNav.stdout ? '✅ Found!' : '❌ Not found');

  // Check 3: main-content ID
  console.log('\n3. Checking main-content ID...');
  const mainContent = await ssh.execCommand('curl -s http://localhost:3001/ | grep -o \'id="main-content"\' | head -1');
  console.log('   Result:', mainContent.stdout ? '✅ Found!' : '❌ Not found');

  // Check 4: Privacy page - Google Analytics mention
  console.log('\n4. Checking Privacy page for Google Analytics mention...');
  const privacyGA = await ssh.execCommand('curl -s http://localhost:3001/privacy | grep -c "Google Analytics" || echo "0"');
  console.log('   Google Analytics mentions:', privacyGA.stdout.trim());

  // Check 5: Resources page title
  console.log('\n5. Checking Resources page SEO...');
  const resourcesTitle = await ssh.execCommand('curl -s http://localhost:3001/resources | grep -o \'<title>[^<]*</title>\' | head -1');
  console.log('   Title:', resourcesTitle.stdout);

  // Check 6: Products page title
  console.log('\n6. Checking Products page SEO...');
  const productsTitle = await ssh.execCommand('curl -s http://localhost:3001/products | grep -o \'<title>[^<]*</title>\' | head -1');
  console.log('   Title:', productsTitle.stdout);

  // Check 7: Response times for different pages
  console.log('\n7. Response times (production should be < 0.1s)...');
  const pages = ['/', '/products', '/privacy', '/resources', '/contact'];
  for (const page of pages) {
    const timeResult = await ssh.execCommand(`curl -s -o /dev/null -w "%{time_total}s" http://localhost:3001${page}`);
    console.log(`   ${page}: ${timeResult.stdout}`);
  }

  // Check 8: HTTP status for all major pages
  console.log('\n8. HTTP Status codes...');
  const allPages = ['/', '/products', '/apps', '/quiz', '/about', '/contact', '/blog', '/methodology', '/privacy', '/terms', '/refund', '/faq', '/resources'];
  for (const page of allPages) {
    const statusResult = await ssh.execCommand(`curl -s -o /dev/null -w "%{http_code}" http://localhost:3001${page}`);
    console.log(`   ${page}: ${statusResult.stdout}`);
  }

  ssh.dispose();
  console.log('\n=== Done ===');
}

checkSEO().catch(err => console.error('Failed:', err.message));
