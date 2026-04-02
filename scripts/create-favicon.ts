import sharp from 'sharp';
import { join } from 'path';

const publicDir = '/home/z/my-project/public';
const uploadDir = '/home/z/my-project/upload';

async function createFavicon() {
  console.log('Creating optimized favicon...');
  
  // Create a simple, bold "T" favicon that's visible at small sizes
  // Using the brand colors
  
  // Create SVG with a bold T letter - optimized for small sizes
  const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <!-- Background circle -->
  <circle cx="16" cy="16" r="16" fill="#0F1C2E"/>
  <!-- Accent ring -->
  <circle cx="16" cy="16" r="15" fill="none" stroke="#3DD4B0" stroke-width="1.5"/>
  <!-- Bold T letter -->
  <text x="16" y="23" 
        font-family="Georgia, serif" 
        font-size="22" 
        font-weight="bold" 
        fill="#3DD4B0" 
        text-anchor="middle">T</text>
</svg>`;

  // Save SVG
  const fs = await import('fs');
  fs.writeFileSync(join(publicDir, 'favicon.svg'), svgFavicon);
  fs.writeFileSync(join(publicDir, 'icon.svg'), svgFavicon);
  console.log('✓ Created favicon.svg');

  // Create PNG versions from the uploaded logo
  const sourceImage = join(uploadDir, 'logo.png');
  const image = sharp(sourceImage);
  
  // Generate multiple sizes with padding for better visibility
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'favicon.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await image
      .clone()
      .resize(size, size, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(join(publicDir, name));
    console.log(`✓ Created ${name} (${size}x${size})`);
  }

  // Create a special small favicon with the T letter only for maximum visibility
  const smallFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <rect width="16" height="16" rx="3" fill="#0F1C2E"/>
  <text x="8" y="13" 
        font-family="Georgia, serif" 
        font-size="13" 
        font-weight="bold" 
        fill="#3DD4B0" 
        text-anchor="middle">T</text>
</svg>`;

  // Convert SVG to PNG for favicon-16x16
  const smallBuffer = await sharp(Buffer.from(smallFaviconSvg))
    .resize(16, 16)
    .png()
    .toBuffer();
  
  fs.writeFileSync(join(publicDir, 'favicon-16x16.png'), smallBuffer);
  console.log('✓ Created optimized favicon-16x16.png with T letter');

  // Create 32x32 with T letter
  const mediumFaviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="6" fill="#0F1C2E"/>
  <text x="16" y="25" 
        font-family="Georgia, serif" 
        font-size="24" 
        font-weight="bold" 
        fill="#3DD4B0" 
        text-anchor="middle">T</text>
</svg>`;

  const mediumBuffer = await sharp(Buffer.from(mediumFaviconSvg))
    .resize(32, 32)
    .png()
    .toBuffer();
  
  fs.writeFileSync(join(publicDir, 'favicon-32x32.png'), mediumBuffer);
  fs.writeFileSync(join(publicDir, 'favicon.png'), mediumBuffer);
  console.log('✓ Created optimized favicon-32x32.png with T letter');

  console.log('\n✅ All favicons created successfully!');
}

createFavicon().catch(console.error);
