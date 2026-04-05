import { NodeSSH } from 'node-ssh';

const ssh = new NodeSSH();

async function checkHTML() {
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });

  // Get the HTML and analyze what's making it large
  console.log('=== Analyzing HTML Content ===\n');

  // Check for dev-specific scripts
  console.log('1. Checking for dev scripts...');
  const devCheck = await ssh.execCommand('curl -s http://localhost:3001/ | grep -o \'src="/_next/[^"]*\' | head -20');
  console.log(devCheck.stdout);

  // Check script sizes
  console.log('\n2. Script sources in HTML...');
  const scriptsCheck = await ssh.execCommand('curl -s http://localhost:3001/ | grep -o \'<script[^>]*>\' | head -15');
  console.log(scriptsCheck.stdout);

  // Check for turbopack specifically
  console.log('\n3. Finding Turbopack reference...');
  const turboFind = await ssh.execCommand('curl -s http://localhost:3001/ | grep -i "turbo"');
  console.log(turboFind.stdout || 'Not found');

  // Check what makes HTML large
  console.log('\n4. HTML breakdown...');
  const htmlBreakdown = await ssh.execCommand(`
    curl -s http://localhost:3001/ > /tmp/page.html
    echo "Total size: $(wc -c < /tmp/page.html) bytes"
    echo "Script tags: $(grep -c '<script' /tmp/page.html)"
    echo "Style tags: $(grep -c '<style' /tmp/page.html)"
    echo "Inline scripts: $(grep -c '<script>' /tmp/page.html)"
    echo "External scripts: $(grep -c 'src="/_next' /tmp/page.html)"
  `);
  console.log(htmlBreakdown.stdout);

  // Check for development indicator
  console.log('\n5. Development mode indicators...');
  const devIndicator = await ssh.execCommand('curl -s http://localhost:3001/ | grep -E "(next-dev|__NEXT_DATA__.*development)" | head -5');
  console.log(devIndicator.stdout || 'No development indicators found');

  // Check NEXT_DATA
  console.log('\n6. __NEXT_DATA__ check...');
  const nextData = await ssh.execCommand('curl -s http://localhost:3001/ | grep -o "__NEXT_DATA__.*" | head -c 500');
  console.log(nextData.stdout);

  ssh.dispose();
}

checkHTML().catch(err => console.error('Failed:', err.message));
