const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'public', 'images');
const outputDir = path.join(__dirname, 'public', 'images-optimized');

// Creează folder pentru imagini optimizate
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Funcție pentru a optimiza o imagine
async function optimizeImage(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .resize(1920, null, { // Max width 1920px, păstrează aspect ratio
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ 
        quality: 80, // Calitate bună dar comprimate
        progressive: true,
        mozjpeg: true 
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = info.size;
    const savedPercent = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)}: ${(originalSize/1024).toFixed(0)} KB → ${(newSize/1024).toFixed(0)} KB (salvat ${savedPercent}%)`);
  } catch (error) {
    console.error(`❌ Eroare la ${path.basename(inputPath)}:`, error.message);
  }
}

// Procesează toate imaginile .jpg și .png
async function processAllImages() {
  console.log('🚀 Începe optimizarea imaginilor...\n');
  
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  console.log(`📸 Găsite ${imageFiles.length} imagini de optimizat\n`);
  
  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.jpg'));
    await optimizeImage(inputPath, outputPath);
  }
  
  console.log('\n✨ Optimizare completă!');
  console.log(`📁 Imaginile optimizate sunt în: ${outputDir}`);
  console.log('\n💡 Următorii pași:');
  console.log('1. Verifică imaginile în folderul images-optimized');
  console.log('2. Dacă arată bine, șterge imaginile vechi din images/');
  console.log('3. Mută imaginile optimizate din images-optimized/ în images/');
  console.log('4. Șterge folderul images-optimized/');
}

processAllImages().catch(console.error);
