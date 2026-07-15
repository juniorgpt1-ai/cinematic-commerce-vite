/**
 * Converte os fundos da Hero (malbecS.png mobile / MalbecD.png desktop) para
 * WebP em alta qualidade, sem resize/upscale — mantém a resolução nativa de
 * cada fonte para evitar qualquer blur introduzido por reamostragem.
 *
 * Run: node scripts/generate-hero-images.mjs
 */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");
const QUALITY = 92;
const EFFORT = 6;

async function convert(sourceFile, outFile) {
  const inputPath = join(PUBLIC_DIR, sourceFile);
  const outputPath = join(PUBLIC_DIR, outFile);
  const buf = await sharp(inputPath).webp({ quality: QUALITY, effort: EFFORT }).toBuffer();
  await sharp(buf).toFile(outputPath);
  const meta = await sharp(buf).metadata();
  console.log(`  ${outFile}: ${meta.width}x${meta.height}, ${(buf.length / 1024).toFixed(1)} KiB (from ${sourceFile})`);
}

async function main() {
  console.log("Hero mobile (malbecS.png -> malbecSMOB.webp):");
  await convert("malbecS.png", "malbecSMOB.webp");

  console.log("\nHero desktop (MalbecD.png -> malbecDDESK.webp):");
  await convert("MalbecD.png", "malbecDDESK.webp");

  console.log("\nDone.");
}

main();
