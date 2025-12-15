const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Define path to assets
const assetsDir = path.join(__dirname, '../assets/days');

// Configuration
const MAX_WIDTH = 1200; // Resize images wider than this
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

async function optimizeImages() {
  if (!fs.existsSync(assetsDir)) {
    console.error(`${colors.red}Directory not found: ${assetsDir}${colors.reset}`);
    process.exit(1);
  }

  console.log(`${colors.cyan}🎄 Starting Christmas Image Optimization...${colors.reset}\n`);
  
  const files = fs.readdirSync(assetsDir);
  let totalSaved = 0;

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const filePath = path.join(assetsDir, file);
      const tempPath = path.join(assetsDir, `temp_${file}`);
      
      try {
        const originalStats = fs.statSync(filePath);
        const originalSizeKB = originalStats.size / 1024;

        const image = sharp(filePath);
        const metadata = await image.metadata();

        const pipeline = image;

        // Resize if needed
        if (metadata.width > MAX_WIDTH) {
          pipeline.resize({ width: MAX_WIDTH });
        }

        // Compress
        if (file.toLowerCase().endsWith('.png')) {
          pipeline.png({ quality: PNG_QUALITY, compressionLevel: 8 });
        } else {
          pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
        }

        await pipeline.toFile(tempPath);

        const newStats = fs.statSync(tempPath);
        const newSizeKB = newStats.size / 1024;
        
        // Only replace if we actually saved space
        if (newSizeKB < originalSizeKB) {
            fs.unlinkSync(filePath);
            fs.renameSync(tempPath, filePath);
            const saved = originalSizeKB - newSizeKB;
            totalSaved += saved;
            console.log(`${colors.green}✔ ${file}${colors.reset} | ${(originalSizeKB).toFixed(1)}KB -> ${(newSizeKB).toFixed(1)}KB | Saved: ${saved.toFixed(1)}KB`);
        } else {
            fs.unlinkSync(tempPath);
            console.log(`${colors.yellow}• ${file}${colors.reset} | Already optimized`);
        }

      } catch (err) {
        console.error(`${colors.red}✘ Error processing ${file}:${colors.reset}`, err.message);
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
      }
    }
  }

  console.log(`\n${colors.cyan}✨ Optimization Complete! Total space saved: ${(totalSaved / 1024).toFixed(2)} MB${colors.reset}`);
}

optimizeImages();