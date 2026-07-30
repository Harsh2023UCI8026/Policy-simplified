const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const pngToIco = require('png-to-ico');

async function run() {
  const root = path.resolve(__dirname, '..');
  const publicDir = path.join(root, 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');

  if (!fs.existsSync(svgPath)) {
    console.error('favicon.svg not found in public/. Please add it first.');
    process.exit(1);
  }

  const sizes = [16, 32, 48, 64, 128, 256, 512];
  const pngPaths = [];

  for (const size of sizes) {
    const out = path.join(publicDir, `favicon-${size}.png`);
    console.log('Generating', out);
    await sharp(svgPath)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(out);
    pngPaths.push(out);
  }

  const icoOut = path.join(publicDir, 'favicon.ico');
  console.log('Generating', icoOut);
  const icoBuffer = await pngToIco([path.join(publicDir, 'favicon-16.png'), path.join(publicDir, 'favicon-32.png'), path.join(publicDir, 'favicon-48.png'), path.join(publicDir, 'favicon-64.png')]);
  fs.writeFileSync(icoOut, icoBuffer);

  console.log('Done. Generated files:', pngPaths.concat([icoOut]).join(', '));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
