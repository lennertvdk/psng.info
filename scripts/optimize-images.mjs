import sharp from "sharp";
import path from "path";
import fs from "fs";

const dir = path.resolve("src/assets");

// [filename, maxDimension, quality]
const targets = [
  ["PSNG-Logo-centered.png", 120, 85],
  ["PSNG-Logo-centered-transparent.png", 640, 85],
  ["hero-bg.png", 1920, 80],
  ["ALPS-Logo.png", 400, 85],
  ["SPSN-Logo.png", 400, 85],
  ["UNEPSI-Logo.png", 400, 85],
  ["PsychedeliCare-Logo.png", 400, 85],
  ["Psychedelic-Germany-Logo.png", 400, 85],
  ["Nachtschatten-Logo.png", 400, 85],
  ["Psychedelia-Stiftung-Logo.png", 400, 85],
  ["Cameron.png", 400, 85],
  ["Ivana.png", 400, 85],
  ["Lennert.png", 400, 85],
  ["Meta.png", 400, 85],
  ["Stela.png", 400, 85],
  ["tryp-1.jpg", 1200, 80],
  ["icpr-1.jpg", 1200, 80],
  // Wird mit 105x105 gerendert – 240px reicht auch auf Retina-Displays.
  ["PSNG-BPSA-Logo.png", 240, 88],
  // Hinweis: Torsten-Passie.webp entsteht nicht hier. Das Talk-Asset zeigt den
  // Speaker klein und aus der Mitte gerückt; ein reines Verkleinern würde im
  // 105px-Rahmen überwiegend Hintergrund zeigen. Der Zuschnitt ist deshalb von
  // Hand gesetzt (Quadrat 944px ab 300/220) und wird bei einem neuen Foto
  // einmalig neu bestimmt.
];

for (const [file, maxDim, quality] of targets) {
  const input = path.join(dir, file);
  if (!fs.existsSync(input)) {
    console.log(`skip (missing): ${file}`);
    continue;
  }
  const ext = path.extname(file);
  const output = path.join(dir, path.basename(file, ext) + ".webp");
  const before = fs.statSync(input).size;

  await sharp(input)
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);

  const after = fs.statSync(output).size;
  console.log(
    `${file} -> ${path.basename(output)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
  );
}
