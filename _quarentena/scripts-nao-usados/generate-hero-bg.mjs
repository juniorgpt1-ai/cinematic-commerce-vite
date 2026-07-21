/**
 * Gera as variantes de fundo da Hero com srcset 1x/2x/3x real (sem upscaling além
 * do disponível na fonte nativa):
 *
 *  - Mobile: malbecS.png (1075x1463, nativo) — cabe bem em 1x/2x mobile; o "3x"
 *    é a própria resolução nativa (honesto, sem inventar pixels).
 *  - Desktop: malbec1-opt.webp (2400x1792, já usado e limpo) — segue com
 *    resolução de sobra para 1x/2x reais; "3x" reaproveita o nativo como teto.
 *
 * Run: node scripts/generate-hero-bg.mjs
 */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");
const QUALITY = 82;
const EFFORT = 6;

async function makeVariant(sourceFile, outFile, width) {
  const inputPath = join(PUBLIC_DIR, sourceFile);
  const outputPath = join(PUBLIC_DIR, outFile);
  const buf = await sharp(inputPath)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: EFFORT })
    .toBuffer();
  await sharp(buf).toFile(outputPath);
  const meta = await sharp(buf).metadata();
  console.log(`  ${outFile}: ${meta.width}x${meta.height}, ${(buf.length / 1024).toFixed(1)} KiB`);
}

async function main() {
  console.log("Mobile (malbecS.png, nativo 1075x1463):");
  await makeVariant("malbecS.png", "hero-bg-mob-1x.webp", 430);
  await makeVariant("malbecS.png", "hero-bg-mob-2x.webp", 860);
  await makeVariant("malbecS.png", "hero-bg-mob-3x.webp", 1075); // nativo, sem upscale

  console.log("\nDesktop (malbec1-opt.webp, nativo 2400x1792):");
  await makeVariant("malbec1-opt.webp", "hero-bg-desk-1x.webp", 1440);
  await makeVariant("malbec1-opt.webp", "hero-bg-desk-2x.webp", 2400); // ~1.67x real, não 2x exato
  await makeVariant("malbec1-opt.webp", "hero-bg-desk-3x.webp", 2400); // teto nativo, reaproveitado

  console.log("\nDone.");
}

main();
