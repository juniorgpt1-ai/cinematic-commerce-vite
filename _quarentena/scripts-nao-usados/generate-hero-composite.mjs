/**
 * Gera os assets da nova composição da Hero (fundo + frasco recortado por cima):
 *
 *  - malbecs1.png chega como PNG opaco (fundo branco uniforme, sem alpha). Extraímos
 *    um canal alpha por chroma-key (distância do branco) e exportamos como WebP com
 *    transparência preservada.
 *  - fundo.png (1071x1469 nativo) vira o fundo da Hero nos dois breakpoints. No
 *    desktop isso exige upscale (fonte só tem 1071px de largura) — limitado a ~1.8x
 *    no máximo, nunca além disso, para não recriar o blur corrigido antes.
 *  - Frasco recortado nunca precisa de upscale: fonte tem 1198px de altura, bem
 *    acima de qualquer tamanho de exibição necessário.
 *
 * Run: node scripts/generate-hero-composite.mjs
 */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");
const QUALITY = 82;
const EFFORT = 6;

async function extractOnWhite() {
  const inputPath = join(PUBLIC_DIR, "malbecs1.png");
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * channels];
    const g = data[i * channels + 1];
    const b = data[i * channels + 2];
    // distância do branco puro -> quanto mais perto do branco, mais transparente
    const distFromWhite = Math.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2);
    const maxDist = Math.sqrt(3 * 255 ** 2);
    let alpha = Math.min(255, Math.max(0, (distFromWhite / maxDist) * 255 * 3.2)); // feather com ganho
    out[i * 4] = r;
    out[i * 4 + 1] = g;
    out[i * 4 + 2] = b;
    out[i * 4 + 3] = Math.round(alpha);
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

async function makeBottleVariant(sourceSharp, outFile, height) {
  const outputPath = join(PUBLIC_DIR, outFile);
  const buf = await sourceSharp
    .clone()
    .resize({ height, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: EFFORT, alphaQuality: 100 })
    .toBuffer();
  await sharp(buf).toFile(outputPath);
  const meta = await sharp(buf).metadata();
  console.log(`  ${outFile}: ${meta.width}x${meta.height}, alpha=${meta.hasAlpha}, ${(buf.length / 1024).toFixed(1)} KiB`);
}

async function makeBgVariant(sourceFile, outFile, width) {
  const inputPath = join(PUBLIC_DIR, sourceFile);
  const outputPath = join(PUBLIC_DIR, outFile);
  const buf = await sharp(inputPath)
    .resize({ width }) // upscaling intencional e limitado no desktop; sem withoutEnlargement aqui
    .webp({ quality: QUALITY, effort: EFFORT })
    .toBuffer();
  await sharp(buf).toFile(outputPath);
  const meta = await sharp(buf).metadata();
  console.log(`  ${outFile}: ${meta.width}x${meta.height}, ${(buf.length / 1024).toFixed(1)} KiB`);
}

async function main() {
  console.log("Frasco recortado (malbecs1.png -> alpha extraído):");
  const bottle = await extractOnWhite();
  await makeBottleVariant(bottle, "malbec-bottle-cutout-mob-1x.webp", 440);
  await makeBottleVariant(bottle, "malbec-bottle-cutout-mob-2x.webp", 880);
  await makeBottleVariant(bottle, "malbec-bottle-cutout-mob-3x.webp", 1198); // nativo, sem upscale
  await makeBottleVariant(bottle, "malbec-bottle-cutout-desk-1x.webp", 560);
  await makeBottleVariant(bottle, "malbec-bottle-cutout-desk-2x.webp", 1120);
  await makeBottleVariant(bottle, "malbec-bottle-cutout-desk-3x.webp", 1198); // nativo, teto

  console.log("\nFundo (fundo.png, nativo 1071x1469):");
  await makeBgVariant("fundo.png", "hero-fundo-mob-1x.webp", 430);
  await makeBgVariant("fundo.png", "hero-fundo-mob-2x.webp", 860);
  await makeBgVariant("fundo.png", "hero-fundo-mob-3x.webp", 1071); // nativo
  await makeBgVariant("fundo.png", "hero-fundo-desk-1x.webp", 1440); // ~1.34x upscale
  await makeBgVariant("fundo.png", "hero-fundo-desk-2x.webp", 1900); // ~1.77x upscale, teto
  await makeBgVariant("fundo.png", "hero-fundo-desk-3x.webp", 1900); // reaproveita o teto, sem piorar

  console.log("\nDone.");
}

main();
