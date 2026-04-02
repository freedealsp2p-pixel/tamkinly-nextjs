import sharp from 'sharp';
import { join } from 'path';

const publicDir = '/home/z/my-project/public';
const uploadDir = '/home/z/my-project/upload';

// Source image - the portrait photo
const sourceImage = join(uploadDir, 'photo_2026-03-30_21-50-13.jpg');

async function processFounderImage() {
  console.log('Processing founder image...');
  
  // Get source image metadata
  const image = sharp(sourceImage);
  const metadata = await image.metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}`);
  
  // Create a circular cropped version (square crop from center, then circular)
  const size = Math.min(metadata.width || 600, metadata.height || 600);
  
  // Process the image - crop to square and resize
  await image
    .clone()
    .extract({
      left: Math.floor(((metadata.width || 600) - size) / 2),
      top: Math.floor(((metadata.height || 1200) - size) / 2),
      width: size,
      height: size
    })
    .resize(600, 600, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'founder-portrait.png'));
  console.log('✓ Generated founder-portrait.png (600x600)');
  
  // Also create a smaller version for cards
  await image
    .clone()
    .extract({
      left: Math.floor(((metadata.width || 600) - size) / 2),
      top: Math.floor(((metadata.height || 1200) - size) / 2),
      width: size,
      height: size
    })
    .resize(400, 400, { fit: 'cover' })
    .png()
    .toFile(join(publicDir, 'founder-small.png'));
  console.log('✓ Generated founder-small.png (400x400)');
  
  console.log('\n✅ Founder images processed successfully!');
}

processFounderImage().catch(console.error);
