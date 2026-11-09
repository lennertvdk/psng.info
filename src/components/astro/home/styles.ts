/*
 * Die Knopf- und Textformen der Startseite, aus /lab übernommen.
 * Ein Knopf bricht nur um, wenn er sonst über den Rand stünde, etwa bei 200 %
 * Schrift. Bei normaler Größe passt jeder Text in eine Zeile.
 */
export const primaryButton =
  "inline-flex max-w-full items-center justify-center rounded-lg text-center bg-primary px-5 py-3 sm:px-6 font-heading text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover";

export const secondaryButton =
  "inline-flex max-w-full items-center justify-center rounded-lg text-center border border-primary/30 bg-card/60 px-5 py-3 sm:px-6 font-heading text-sm font-medium text-primary transition-colors hover:bg-primary/5";

export const eyebrow = "font-heading text-xs uppercase tracking-[0.2em] text-primary";

export const sectionTitle = "font-heading text-3xl font-bold text-foreground md:text-4xl";

export const chip = "chip";

export const textLink = "font-heading text-sm font-medium text-primary hover:underline";
