/**
 * Schneidet die fünf Team-Portraits aus den Originalen des Molecule-Shoots.
 *
 * Ausschnitt und Skalierung – keine automatische Farbangleichung. Die
 * Bildbearbeitung passiert außerhalb: Liegt neben einer Aufnahme eine
 * bearbeitete Fassung mit Endung .jpeg (statt .JPG), wird die genommen.
 * Einzige Ausnahme ist `brightness` unten, ein von Hand gesetzter Feinschliff
 * für einzelne Aufnahmen.
 *
 *   node scripts/team-portraits.mjs
 *
 * Braucht den Rohordner src/assets/06_Team (821 MB, bewusst nicht im Repo).
 * Fehlt er, beendet sich das Skript, ohne die vorhandenen .webp anzufassen.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const RAW = "src/assets/06_Team";
const DIR = "src/assets";

const SIZE = 400;      // Kantenlänge der Ausgabe (dargestellt werden 160 px)
const QUALITY = 85;
const FACE = 0.275;    // Gesichtshöhe (Augen→Kinn) als Anteil der Ausschnittkante
const EYE_LINE = 0.37; // Augenlinie von oben

// Landmarken, von Hand auf Vorschauen mit 900 px langer Kante abgelesen
// (Originale sind 6000x4000, EXIF-Rotation vorher angewandt).
// PREVIEW = Originalpixel je Vorschaupixel.
const PREVIEW = 6000 / 900;
const PEOPLE = {
  // eyeY = Pupillenlinie, chinY = Kinnunterkante, headY = Haaransatz oben,
  // cx = Gesichtsmittelachse, io = Pupillenabstand, drop = Augenlinie tiefer,
  // brightness = Helligkeitsfaktor (1 = unverändert)
  Cameron: { src: "Cam/DSC_0263.JPG",     pw: 600, ph: 900, eyeY: 276, chinY: 400, headY: 152, cx: 322, io: 74.5 },
  Ivana:   { src: "Ivana/DSC_0330.JPG",   pw: 600, ph: 900, eyeY: 266, chinY: 368, headY: 145, cx: 270, io: 60, drop: 0.05, brightness: 1.05 },
  Lennert: { src: "Lennert/DSC_0318.JPG", pw: 900, ph: 600, eyeY: 135, chinY: 229, headY:  45, cx: 392, io: 53.5 },
  Meta:    { src: "Meta/DSC_0350.JPG",    pw: 900, ph: 600, eyeY: 222, chinY: 343, headY: 108, cx: 402, io: 72.5 },
  Stela:   { src: "Stela/DSC_0313.JPG",   pw: 600, ph: 900, eyeY: 284, chinY: 368, headY: 178, cx: 285, io: 55 },
};

// Gesichtsmaß: Mittel aus Augen→Kinn und Pupillenabstand × 1.65. Der Mix
// dämpft den Ablesefehler einer einzelnen Strecke.
const faceMetric = (p) => 0.5 * (p.chinY - p.eyeY) + 0.5 * (p.io * 1.65);

// Bearbeitete Fassung bevorzugen, sonst das Original.
function resolve(src) {
  const edited = path.join(RAW, src.replace(/\.JPG$/, ".jpeg"));
  return fs.existsSync(edited) ? edited : path.join(RAW, src);
}

function crop(p) {
  const side = Math.min(faceMetric(p) / FACE, p.pw, p.ph);
  const eye = EYE_LINE + (p.drop ?? 0);
  const top = Math.min(p.ph - side, Math.max(0, p.eyeY - eye * side));
  const left = Math.min(p.pw - side, Math.max(0, p.cx - side / 2));
  return {
    left: Math.round(left * PREVIEW), top: Math.round(top * PREVIEW),
    width: Math.round(side * PREVIEW), height: Math.round(side * PREVIEW),
    side,
  };
}

if (!fs.existsSync(RAW)) {
  console.log(`${RAW} fehlt – nichts zu tun.`);
  process.exit(0);
}

for (const [name, p] of Object.entries(PEOPLE)) {
  const src = resolve(p.src);
  const { side, ...box } = crop(p);
  const file = path.join(DIR, `${name}.webp`);
  let image = sharp(src).rotate().extract(box).resize(SIZE, SIZE, { kernel: "lanczos3" });
  if (p.brightness) image = image.modulate({ brightness: p.brightness });
  await image.webp({ quality: QUALITY }).toFile(file);
  const headroom = ((p.headY - box.top / PREVIEW) / side) * 100;
  console.log(
    `${name.padEnd(8)} ${path.basename(src).padEnd(14)} ` +
    `Ausschnitt ${box.width}px  Kopffreiheit ${headroom.toFixed(1)}%  ` +
    `${(fs.statSync(file).size / 1024).toFixed(1)} kB` +
    (src.endsWith(".jpeg") ? "  (bearbeitet)" : "") +
    (p.brightness ? `  Helligkeit ×${p.brightness}` : ""),
  );
}
