/**
 * Image optimization script — process ALL project WebP images.
 * Quality 90, effort 6 (maximum), no upscaling.
 *
 * Run: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import { readFile, writeFile, stat as fsStat, readdir } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");

// Target widths: null = keep original dimensions, recompress only.
// All targets use { quality: 90, effort: 6, withoutEnlargement: true }.
const IMAGE_TARGETS = {
  // Hero — LCP critical, keep dimensions, recompress quality 90
  "malbecDDESK.webp":         { width: null },
  "malbecSMOB.webp":          { width: null },
  "malbec-signatureA.webp":   { width: null },

  // Lifestyle / Collage — cap at 2400px wide max
  "malbec-lifestyle.webp":    { width: 2400 },
  "malbec-collage.webp":      { width: 2400 },
  "floratta-red-lifestyle.webp": { width: 2400 },
  "hair-care-volume.webp":    { width: 2200 },
  "hair-care-liso.webp":      { width: 1672 },
  "consultora.webp":          { width: 1200 },
  "floratta.webp":            { width: 1024 },
  "malbec1.webp":             { width: 2400 },

  // Mobile variants — keep dimensions, recompress
  "malbec-lifestyle-mob.webp":       { width: null },
  "malbec-lifestyle-mob-2x.webp":    { width: null },
  "malbec-collage-mob.webp":         { width: null },
  "malbec-collage-mob-2x.webp":      { width: null },
  "floratta-red-lifestyle-mob.webp": { width: null },
  "floratta-red-lifestyle-mob-2x.webp": { width: null },
  "hair-care-volume-mob.webp":       { width: null },
  "hair-care-volume-mob-2x.webp":    { width: null },
  "hair-care-liso-mob.webp":         { width: null },
  "hair-care-liso-mob-2x.webp":      { width: null },
  "consultora-mob.webp":             { width: null },
  "consultora-mob-2x.webp":          { width: null },
  "floratta-mob.webp":               { width: null },
  "floratta-mob-2x.webp":            { width: null },
  "malbec1-mob.webp":                { width: null },
  "malbec1-mob-2x.webp":             { width: null },
};

async function optimizeImage(filePath, target) {
  const inputBuffer = await readFile(filePath);
  const metadata = await sharp(inputBuffer).metadata();
  const inputSizeKB = ((await fsStat(filePath)).size / 1024).toFixed(1);

  const { width } = target;

  // Idempotency: skip if already at or below target dimensions
  if (width && metadata.width && metadata.width <= width) {
    console.log(`  ${basename(filePath)}: ${inputSizeKB} KiB (at target width, skipping)`);
    return;
  }

  let pipeline = sharp(inputBuffer);

  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  const outputBuffer = await pipeline.webp({ quality: 95, effort: 6 }).toBuffer();
  await writeFile(filePath, outputBuffer);

  const outputSizeKB = ((await fsStat(filePath)).size / 1024).toFixed(1);
  const delta = (outputSizeKB - inputSizeKB).toFixed(1);
  const sign = delta > 0 ? "+" : "";
  console.log(`  ${basename(filePath)}: ${inputSizeKB} KiB → ${outputSizeKB} KiB (${sign}${delta} KiB)`);
}

async function main() {
  console.log("Optimizing all WebP images (quality 95, effort 6)...\n");

  const allFiles = await readdir(PUBLIC_DIR, { recursive: true });
  const webpFiles = allFiles
    .filter(f => f.endsWith(".webp"))
    .filter(f => !f.includes("node_modules"));

  let count = 0;
  let skipped = 0;

  for (const relPath of webpFiles.sort()) {
    const absPath = join(PUBLIC_DIR, relPath);
    const target = IMAGE_TARGETS[basename(relPath)];

    if (!target) {
      continue; // silently skip files not in the target map
    }

    try {
      await optimizeImage(absPath, target);
      count++;
    } catch (err) {
      console.error(`  ✗ ${basename(relPath)}: ${err.message}`);
    }
  }

  console.log(`\nDone. ${count} images optimized.`);
}

main();
