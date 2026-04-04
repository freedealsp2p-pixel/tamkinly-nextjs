import { NodeSSH } from 'node-ssh';
import { readFileSync } from 'fs';
import { join } from 'path';

const ssh = new NodeSSH();

const config = {
  host: '192.3.218.191',
  port: 2222,
  username: 'root',
  password: 'g40d7KJfMyWrb2G3T1',
  readyTimeout: 60000
};

const localPath = '/home/z/my-project';
const remotePath = '/var/www/tamkinly';

// Critical files to fix translation
const filesToUpload = [
  'src/components/providers/LocaleProvider.tsx',
  'src/app/layout.tsx',
];

async function deploy() {
  console.log('Connecting to server...');
  try {
    await ssh.connect(config);
    console.log('Connected!');

    // Upload files using base64 encoding
    for (const file of filesToUpload) {
      const localFile = join(localPath, file);
      const remoteFile = join(remotePath, file);

      console.log(`Uploading ${file}...`);
      const content = readFileSync(localFile, 'utf-8');
      const base64 = Buffer.from(content).toString('base64');

      // Create directory and write file
      const dir = join(remotePath, file.split('/').slice(0, -1).join('/'));
      await ssh.execCommand(`mkdir -p ${dir}`);

      // Write file using base64
      const result = await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);

      if (result.stderr && !result.stderr.includes('warning')) {
        console.log(`  ✗ ${file}: ${result.stderr}`);
      } else {
        console.log(`  ✓ ${file}`);
      }
    }

    // Check PM2 status
    console.log('\n=== Checking PM2 status ===');
    const pm2Status = await ssh.execCommand('pm2 status');
    console.log(pm2Status.stdout);

    // Restart the dev server (not build since memory is low)
    console.log('\n=== Restarting server ===');
    const restartResult = await ssh.execCommand('pm2 restart tamkinly-nextjs');
    console.log(restartResult.stdout);

    // Wait a moment and check if it's running
    await new Promise(r => setTimeout(r, 3000));
    const statusResult = await ssh.execCommand('pm2 status');
    console.log(statusResult.stdout);

    ssh.dispose();
    console.log('\n✅ Deployment complete!');
  } catch (err) {
    console.error('Deployment failed:', err.message);
    process.exit(1);
  }
}

deploy();
