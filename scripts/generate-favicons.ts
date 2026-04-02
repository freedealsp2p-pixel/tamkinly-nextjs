import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = '/home/z/my-project/public';
const uploadDir = '/home/z/my-project/upload';

// Source image - use the larger one for better quality
const sourceImage = join(uploadDir, 'iPhoneiPad(512 x 512 px) (180 x 180 px).png');

// Generate all required favicon sizes
const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-48x48.png', size: 48 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
];

async function generateFavicons() {
  console.log('Generating favicons...');
  
  // Get source image metadata
  const image = sharp(sourceImage);
  const metadata = await image.metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}`);
  
  // Generate each size
  for (const { name, size } of sizes) {
    await image
      .clone()
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(join(publicDir, name));
    console.log(`✓ Generated ${name}`);
  }
  
  // Generate favicon.ico (multi-resolution ICO with 16, 32, 48)
  // Create a PNG for favicon since ICO support is limited
  await image
    .clone()
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(join(publicDir, 'favicon.ico.png'));
  
  // Rename to favicon.png for compatibility
  await image
    .clone()
    .resize(32, 32, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toFile(join(publicDir, 'favicon.png'));
  console.log('✓ Generated favicon.png');
  
  // Generate site.webmanifest
  const manifest = {
    name: 'Tamkinly',
    short_name: 'Tamkinly',
    description: 'Identity Gap Assessment & Personal Transformation',
    start_url: '/',
    display: 'standalone',
    background_color: '#0F1C2E',
    theme_color: '#3DD4B0',
    icons: [
      { src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
  
  writeFileSync(join(publicDir, 'site.webmanifest'), JSON.stringify(manifest, null, 2));
  console.log('✓ Generated site.webmanifest');
  
  console.log('\n✅ All favicons generated successfully!');
}

generateFavicons().catch(console.error);
