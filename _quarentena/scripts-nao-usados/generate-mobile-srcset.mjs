/**
 * Gera variantes mobile 1x/2x corretamente dimensionadas para DPR, a partir da
 * imagem de maior resolução disponível de cada seção (nunca upscaling de um
 * arquivo mobile já reduzido).
 *
 * Contexto: as imagens mobile do site eram um único arquivo por breakpoint,
 * sem variação por densidade de pixel — em telas DPR 2x/3x (a maioria dos
 * celulares) o navegador esticava essa imagem única, gerando o borrão
 * reportado. Larguras abaixo foram medidas a partir do container CSS real de
 * cada seção em mobile (~342–390px).
 *
 * Run: node scripts/generate-mobile-srcset.mjs
 */

import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, "..", "client", "public");
const QUALITY = 80;
const EFFORT = 6;

const TARGETS = [
  { source: "malbec1-opt.webp",              out1x: "malbec1-mob.webp",              out2x: "malbec1-mob-2x.webp",              w1x: 440, w2x: 880 },
  { source: "hair-care-volume-opt.webp",      out1x: "hair-care-volume-mob.webp",     out2x: "hair-care-volume-mob-2x.webp",     w1x: 380, w2x: 760 },
  { source: "hair-care-liso-opt.webp",        out1x: "hair-care-liso-mob.webp",       out2x: "hair-care-liso-mob-2x.webp",       w1x: 380, w2x: 760 },
  { source: "consultora-opt.webp",            out1x: "consultora-mob.webp",           out2x: "consultora-mob-2x.webp",           w1x: 360, w2x: 720 },
  { source: "malbec-lifestyle-opt.webp",      out1x: "malbec-lifestyle-mob.webp",     out2x: "malbec-lifestyle-mob-2x.webp",     w1x: 380, w2x: 760 },
  { source: "malbec-collage-opt.webp",        out1x: "malbec-collage-mob.webp",       out2x: "malbec-collage-mob-2x.webp",       w1x: 360, w2x: 720 },
  { source: "floratta-red-lifestyle-opt.webp",out1x: "floratta-red-lifestyle-mob.webp",out2x: "floratta-red-lifestyle-mob-2x.webp",w1x: 380, w2x: 760 },
  { source: "floratta.webp",                  out1x: "floratta-mob.webp",             out2x: "floratta-mob-2x.webp",             w1x: 380, w2x: 760 },
];

async function generate({ source, out1x, out2x, w1x, w2x }) {
  const inputPath = join(PUBLIC_DIR, source);
  const inputBuffer = await sharp(inputPath).toBuffer();

  for (const [outName, width] of [[out1x, w1x], [out2x, w2x]]) {
    const outputPath = join(PUBLIC_DIR, outName);
    const outputBuffer = await sharp(inputBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: EFFORT })
      .toBuffer();
    await sharp(outputBuffer).toFile(outputPath);
    const meta = await sharp(outputBuffer).metadata();
    console.log(`  ${outName}: ${meta.width}x${meta.height}, ${(outputBuffer.length / 1024).toFixed(1)} KiB (from ${source})`);
  }
}

async function main() {
  console.log("Gerando variantes mobile 1x/2x...\n");
  for (const target of TARGETS) {
    try {
      await generate(target);
    } catch (err) {
      console.error(`  ✗ ${target.source}: ${err.message}`);
    }
  }
  console.log("\nDone.");
}

main();
