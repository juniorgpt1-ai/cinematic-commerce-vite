/**
 * Image optimization script for Cinematic Commerce.
 * Uses sharp to resize and recompress WebP images for production.
 *
 * Run: node scripts/optimize-images.mjs
 *
 * Targets:
 *  - VOLMOB.webp: 2200x1829 → resize to 1200px wide (2x mobile display), quality 80
 *  - LISMOB.webp: 1131x941  → resize to 1000px wide, quality 80
 *  - malbecSMOB.webp: keep dimensions, recompress quality 75
 */

import sharp from "sharp";
import { stat } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");

const IMAGE_OPTIMIZATIONS = [
  {
    file: "VOLMOB.webp",
    width: 1200,
    quality: 80,
    effort: 6,
  },
  {
    file: "LISMOB.webp",
    width: 1000,
    quality: 80,
    effort: 6,
  },
  {
    // No resize target (dimensions already correct for mobile display), so there's
    // no width-based idempotency signal like the entries above. Guard against
    // re-encoding an already-optimized file on every build (webp->webp requality
    // compounds quality loss run after run) with a size floor instead.
    file: "malbecSMOB.webp",
    width: null,
    quality: 75,
    effort: 6,
    skipIfBelowKB: 130,
  },
];

async function optimizeImage({ file, width, quality, effort, skipIfBelowKB }) {
  const { readFile, writeFile } = await import("node:fs/promises");

  const inputPath = join(PUBLIC_DIR, file);

  const inputStats = await stat(inputPath);
  const inputSizeKB = (inputStats.size / 1024).toFixed(1);

  // Read file into buffer first to avoid file-locking issues on Windows
  const inputBuffer = await readFile(inputPath);
  const metadata = await sharp(inputBuffer).metadata();

  // Skip if already at or below target dimensions (prevents re-optimization quality loss)
  if (width && metadata.width <= width) {
    console.log(`  ${file}: ${inputSizeKB} KiB (already optimized, skipping)`);
    return;
  }

  // Skip quality-only (no resize) entries once already under the expected size,
  // so repeated builds don't keep re-encoding the same file at ever-lower quality.
  if (!width && skipIfBelowKB && inputStats.size / 1024 < skipIfBelowKB) {
    console.log(`  ${file}: ${inputSizeKB} KiB (already optimized, skipping)`);
    return;
  }

  let pipeline = sharp(inputBuffer);

  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  const outputBuffer = await pipeline.webp({ quality, effort }).toBuffer();
  await writeFile(inputPath, outputBuffer);

  const outputStats = await stat(inputPath);
  const outputSizeKB = (outputStats.size / 1024).toFixed(1);
  const savingsKB = (inputStats.size / 1024 - outputStats.size / 1024).toFixed(1);
  const percent = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(0);

  console.log(`  ${file}: ${inputSizeKB} KiB → ${outputSizeKB} KiB (${savingsKB} KiB saved, ${percent}%)`);
}

async function main() {
  console.log("Optimizing images...\n");

  for (const config of IMAGE_OPTIMIZATIONS) {
    try {
      await optimizeImage(config);
    } catch (err) {
      console.error(`  ✗ ${config.file}: ${err.message}`);
    }
  }

  console.log("\nDone.");
}

main();
