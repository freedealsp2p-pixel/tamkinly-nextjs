import { NodeSSH } from 'node-ssh';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const filesToUpload = [
  'src/app/apps/decision-analysis/page.tsx',
  'src/app/apps/evidence-tracking/page.tsx',
  'src/app/apps/trial-planner/page.tsx',
  'src/app/api/access/generate/route.ts',
  'src/app/api/access/list/route.ts',
];

async function upload() {
  const ssh = new NodeSSH();
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!');

  for (const file of filesToUpload) {
    const localFile = '/home/z/my-project/' + file;
    const remoteFile = '/var/www/tamkinly/' + file;
    
    if (!existsSync(localFile)) {
      console.log(`⊘ ${file} - not found`);
      continue;
    }
    
    const content = readFileSync(localFile, 'utf-8');
    const base64 = Buffer.from(content).toString('base64');
    
    const dir = '/var/www/tamkinly/' + file.split('/').slice(0, -1).join('/');
    await ssh.execCommand(`mkdir -p "${dir}"`);
    await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);
    console.log(`✓ ${file}`);
  }

  ssh.dispose();
  console.log('All files uploaded!');
}

upload().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
