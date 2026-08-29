/**
 * Crop status bar + bottom nav from Path phone screenshots, trim, export large.
 * Run: node scripts/process-path-screenshots.mjs
 */
import sharp from "sharp";
import path from "path";
import fs from "fs";

const SRC_DIR =
  "C:/Users/raych/AppData/Roaming/Cursor/User/workspaceStorage/dfbcc36ed933028a1f748938dc645c53/images";
const OUT_DIR = path.resolve("public/images/screenshots/path");

/** top/bottom = pixels to remove (912×2048 source) */
const JOBS = [
  {
    src: "image-cfa006a9-bfd2-4b87-9263-f7768057c728.png",
    out: "path-create-time-based.png",
    top: 172,
    bottom: 228,
    trim: true,
  },
  {
    src: "image-7b38dade-1d30-4e8a-8c0c-b34f92806ece.png",
    out: "path-create-checkoffs.png",
    top: 172,
    bottom: 228,
    trim: true,
  },
  {
    src: "image-0263c2b6-d03b-4940-8c36-4203d9b171c5.png",
    out: "path-timeline.png",
    top: 168,
    bottom: 418,
    trim: false,
  },
  {
    src: "image-6eba0358-c3d5-4ae9-ac52-d496aa68c9b9.png",
    out: "path-today.png",
    top: 168,
    bottom: 408,
    trim: false,
  },
  {
    src: "image-07d09958-9a3e-4b9e-b36f-447adfd5ab22.png",
    out: "path-linked-goal.png",
    top: 168,
    bottom: 408,
    trim: false,
  },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const job of JOBS) {
  const input = path.join(SRC_DIR, job.src);
  const output = path.join(OUT_DIR, job.out);
  const meta = await sharp(input).metadata();
  const width = meta.width;
  const height = meta.height;
  const cropHeight = height - job.top - job.bottom;

  if (cropHeight <= 0) {
    throw new Error(`Invalid crop for ${job.out}`);
  }

  let pipeline = sharp(input).extract({ left: 0, top: job.top, width, height: cropHeight });

  if (job.trim) {
    pipeline = pipeline.trim({ threshold: 18 });
  }

  await pipeline
    .resize(900, null, { fit: "inside", withoutEnlargement: false })
    .modulate({ brightness: 1.03, saturation: 1.05 })
    .sharpen({ sigma: 0.65 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  console.log(`${job.out}: ${outMeta.width}×${outMeta.height}`);
}

const STILLS = [
  { src: "path-timeline.png", out: "path-timeline-still.png", top: 428, bottom: 16 },
  { src: "path-create-time-based.png", out: "path-time-based-still.png", top: 418, bottom: 88 },
  { src: "path-create-checkoffs.png", out: "path-checkoffs-still.png", top: 418, bottom: 88 },
];

for (const job of STILLS) {
  const input = path.join(OUT_DIR, job.src);
  const output = path.join(OUT_DIR, job.out);
  const meta = await sharp(input).metadata();
  const width = meta.width;
  const height = meta.height;
  const cropHeight = height - job.top - job.bottom;

  await sharp(input)
    .extract({ left: 0, top: job.top, width, height: cropHeight })
    .modulate({ brightness: 1.02, saturation: 1.03 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  const outMeta = await sharp(output).metadata();
  console.log(`${job.out}: ${outMeta.width}×${outMeta.height}`);
}

console.log("Done →", OUT_DIR);
