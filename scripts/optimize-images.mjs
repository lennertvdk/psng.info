import sharp from "sharp";
import path from "path";
import fs from "fs";

const dir = path.resolve("src/assets");

/**
 * Rechnet einen weißen Hintergrund in Transparenz zurück. Für Strichgrafik auf
 * Weiß ist das die saubere Umkehrung dessen, was beim Abspeichern passiert ist:
 * Eine Farbe C auf weißem Grund ist C = T·a + 255·(1−a). Aus dem dunkelsten
 * Kanal folgt die Deckung a, daraus die ursprüngliche Farbe T. Anders als ein
 * Schwellwert erhält das die weichen Kanten, und die Innenflächen der Zeichnung
 * werden durchsichtig statt weiß – ein Logo, das nur auf Weiß funktioniert,
 * stünde auf jeder getönten Fläche als Kasten darin.
 */
async function unmultiplyWhite(pipeline) {
  const { data, info } = await pipeline
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const cover = 255 - Math.min(r, g, b);
    if (cover === 0) {
      data[i + 3] = 0;
      continue;
    }
    const a = cover / 255;
    data[i] = Math.round((r - 255 * (1 - a)) / a);
    data[i + 1] = Math.round((g - 255 * (1 - a)) / a);
    data[i + 2] = Math.round((b - 255 * (1 - a)) / a);
    data[i + 3] = cover;
  }

  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
}

// [filename, maxDimension, quality, outputName?, options?]
// options: { crop, unmultiplyWhite }
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
  // Werden mit 105x105 gerendert – 240px reicht auch auf Retina-Displays.
  // Nicht zuschneiden: Die Talk-Assets sind bereits final gesetzt, ein eigener
  // Ausschnitt schneidet sonst oben die Haare ab.
  ["PSNG-BPSA-Logo.png", 240, 88],
  // Vierter Wert: abweichender Ausgabename, damit der Import im Code stabil
  // bleibt, auch wenn das Talk-Asset in v3, v4, … neu geliefert wird.
  ["Torsten-Passie-Talk-Asset-3-v2.png", 240, 88, "Torsten-Passie"],
  // Fünfter Wert: Zuschnitt vor dem Skalieren. Miguels Rohbild ist quadratisch,
  // die Person steht aber klein in der Mitte – ohne Crop wäre der Kopf in der
  // 105px-Kachel der Eventkarte kaum zu erkennen.
  [
    "Miguel-E-Headshot-blue-bg.png",
    240,
    88,
    "Miguel-Mora-Vera",
    { crop: { left: 149, top: 129, width: 560, height: 560 } },
  ],
  // BPSA-Logo mit Wortmarke, für Partnerleiste, Partnerkarte und die
  // Kooperationsleiste der Eventkarten. Die Datei bringt einen weißen
  // Hintergrund mit; der wird herausgerechnet, weil die Leiste getönt ist.
  ["BPSA/BPSA-Logo-Decent.png", 240, 88, "BPSA-Logo", { unmultiplyWhite: true }],
  // PARAB-Logo, transparent und quadratisch. Quelle:
  // ../literature.parab.ch/static/images/PARAB-Logo.webp.
  ["PARAB-Logo-source.webp", 400, 88, "PARAB-Logo"],
  // Vorschaubild des Kick-off-Videos. YouTubes eigenes Standbild war für die
  // 16:9-Kachel zu grob; deshalb ein eigenes Motiv, lokal gehostet – siehe
  // Kommentar bei EventAssets.youtubeThumbnail zum Datenschutzgrund.
  ["PSNG-kickoff-thumbnail.jpg", 960, 82, "yt-fH9gMcj65l4"],
  // Screengrab des Medien-Blogs für die Launch-Karte. Der Zuschnitt bringt das
  // 1804x1164-Bild auf 16:9, damit es dieselbe Kachelform hat wie die Videos
  // daneben – und nicht das CSS entscheiden muss, was weggeschnitten wird.
  [
    "Medien-Blog-Screengrab-thumbnail.png",
    960,
    82,
    "Medien-Blog",
    { crop: { left: 0, top: 74, width: 1804, height: 1015 } },
  ],
];

for (const [file, maxDim, quality, outputName, options = {}] of targets) {
  const { crop, unmultiplyWhite: stripWhite } = options;
  const input = path.join(dir, file);
  if (!fs.existsSync(input)) {
    console.log(`skip (missing): ${file}`);
    continue;
  }
  const ext = path.extname(file);
  const output = path.join(dir, (outputName ?? path.basename(file, ext)) + ".webp");
  const before = fs.statSync(input).size;

  let pipeline = sharp(input);
  if (crop) pipeline.extract(crop);
  // Vor dem Skalieren: Auf dem Original sind die Kanten noch scharf, und die
  // Deckung lässt sich exakt aus ihnen ablesen.
  if (stripWhite) pipeline = await unmultiplyWhite(pipeline);

  await pipeline
    .resize({ width: maxDim, height: maxDim, fit: "inside", withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);

  const after = fs.statSync(output).size;
  console.log(
    `${file} -> ${path.basename(output)}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`,
  );
}
