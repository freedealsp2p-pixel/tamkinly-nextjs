import { NodeSSH } from 'node-ssh';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const ssh = new NodeSSH();

const config = {
  host: '192.3.218.191',
  port: 2222,
  username: 'root',
  password: 'g40d7KJfMyWrb2G3T1',
  readyTimeout: 30000
};

const localPath = '/home/z/my-project';
const remotePath = '/var/www/tamkinly';

// Critical files to upload
const filesToUpload = [
  'src/app/admin/page.tsx',
  'src/app/apps/decision-analysis/page.tsx',
  'src/app/apps/evidence-tracking/page.tsx',
  'src/app/apps/trial-planner/page.tsx',
  'src/app/api/access/generate/route.ts',
  'src/app/api/access/list/route.ts',
  'prisma/schema.prisma',
];

async function deploy() {
  console.log('Connecting to server...');
  await ssh.connect(config);
  console.log('Connected!');

  // Upload files using base64 encoding
  for (const file of filesToUpload) {
    const localFile = join(localPath, file);
    const remoteFile = join(remotePath, file);
    
    if (!existsSync(localFile)) {
      console.log(`  ⊘ ${file} - not found locally`);
      continue;
    }
    
    try {
      console.log(`Uploading ${file}...`);
      const content = readFileSync(localFile, 'utf-8');
      const base64 = Buffer.from(content).toString('base64');
      
      // Create directory and write file
      const dir = join(remotePath, file.split('/').slice(0, -1).join('/'));
      const mkdirResult = await ssh.execCommand(`mkdir -p ${dir}`);
      
      // Write file using base64
      const result = await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);
      
      if (result.stderr && !result.stderr.includes('warning')) {
        console.log(`  ✗ ${file}: ${result.stderr}`);
      } else {
        console.log(`  ✓ ${file}`);
      }
    } catch (err) {
      console.log(`  ✗ ${file}: ${err.message}`);
    }
  }

  // Run build and restart with full path
  console.log('\nRunning build...');
  const result = await ssh.execCommand(
    'cd /var/www/tamkinly && rm -rf .next && /root/.bun/bin/bun run build && pm2 restart tamkinly-nextjs',
    { execOptions: { maxBuffer: 1024 * 1024 * 10 } }
  );
  
  console.log('Build output:', result.stdout.slice(-4000));
  if (result.stderr) {
    console.log('Stderr:', result.stderr.slice(-2000));
  }

  ssh.dispose();
  console.log('\n✅ Deployment complete!');
}

deploy().catch(err => {
  console.error('Deployment failed:', err);
  process.exit(1);
});
