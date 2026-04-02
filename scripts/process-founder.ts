import sharp from 'sharp';
import { join } from 'path';

const publicDir = '/home/z/my-project/public';
const sourceImage = '/home/z/my-project/upload/organized/founder/founde.png';

async function processFounder() {
  console.log('Processing founder image...');
  
  const image = sharp(sourceImage);
  const metadata = await image.metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}`);
  
  // For landscape image, crop from center (square)
  const size = Math.min(metadata.width || 768, metadata.height || 768);
  const left = Math.floor(((metadata.width || 1344) - size) / 2);
  const top = Math.floor(((metadata.height || 768) - size) / 2);
  
  console.log(`Cropping: left=${left}, top=${top}, size=${size}`);
  
  // Create portrait version (600x600)
  await image
    .clone()
    .extract({ left, top, width: size, height: size })
    .resize(600, 600, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'founder-portrait.png'));
  console.log('✓ Created founder-portrait.png (600x600)');
  
  // Create small version (400x400)
  await image
    .clone()
    .extract({ left, top, width: size, height: size })
    .resize(400, 400, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'founder-small.png'));
  console.log('✓ Created founder-small.png (400x400)');
  
  // Also update the main founder.png
  await image
    .clone()
    .extract({ left, top, width: size, height: size })
    .resize(600, 600, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'founder.png'));
  console.log('✓ Updated founder.png (600x600)');
  
  console.log('\n✅ Founder image processed successfully!');
}

processFounder().catch(console.error);
