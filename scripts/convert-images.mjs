import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'public', 'assets');

async function convertImages() {
    const files = fs.readdirSync(assetsDir);

    for (const file of files) {
        const filePath = path.join(assetsDir, file);
        const ext = path.extname(file).toLowerCase();

        if (['.png', '.jpg', '.jpeg'].includes(ext)) {
            const name = path.basename(file, path.extname(file));
            const targetPath = path.join(assetsDir, `${name}.webp`);

            if (!fs.existsSync(targetPath)) {
                console.log(`Converting ${file} to WebP...`);
                try {
                    await sharp(filePath)
                        .webp({ quality: 80 })
                        .toFile(targetPath);
                    console.log(`Converted ${file} to ${name}.webp`);
                } catch (error) {
                    console.error(`Error converting ${file}:`, error);
                }
            } else {
                console.log(`${name}.webp already exists. Skipping.`);
            }
        }
    }
}

convertImages();
