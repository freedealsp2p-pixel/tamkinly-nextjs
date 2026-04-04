import { NodeSSH } from 'node-ssh';
import { readFileSync } from 'fs';

const ssh = new NodeSSH();

const filesToUpload = [
  'src/lib/seo.ts',
  'src/app/sitemap.ts',
  'src/app/robots.ts',
  'src/app/layout.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/layout/Header.tsx',
  'src/components/seo/JsonLd.tsx',
  'src/components/providers/LocaleProvider.tsx',
  'messages/ar.json',
  'messages/en.json',
];

async function deploy() {
  console.log('Connecting to server...');
  await ssh.connect({
    host: '192.3.218.191',
    port: 2222,
    username: 'root',
    password: 'g40d7KJfMyWrb2G3T1',
    readyTimeout: 30000
  });
  console.log('Connected!\n');

  for (const file of filesToUpload) {
    console.log(`Uploading ${file}...`);
    const localFile = '/home/z/my-project/' + file;
    const remoteFile = '/var/www/tamkinly/' + file;
    
    try {
      const content = readFileSync(localFile, 'utf-8');
      const base64 = Buffer.from(content).toString('base64');
      
      // Create directory if needed
      const dir = remoteFile.substring(0, remoteFile.lastIndexOf('/'));
      await ssh.execCommand(`mkdir -p "${dir}"`);
      
      // Upload file
      await ssh.execCommand(`echo "${base64}" | base64 -d > "${remoteFile}"`);
      console.log(`✓ ${file} uploaded`);
    } catch (err) {
      console.log(`✗ Failed to upload ${file}: ${err}`);
    }
  }

  console.log('\n✓ All files uploaded!');
  console.log('\nServer is running in dev mode, changes should be reflected automatically.');
  
  ssh.dispose();
}

deploy().catch(err => {
  console.error('Failed:', err.message);
  process.exit(1);
});
