import { ReactNode } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  align?: "center" | "left";
}

export default function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl mx-auto mb-10 ${
        align === "left" ? "text-left" : "text-center"
      }`}
    >
      <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {intro ? (
        <p className="text-muted-foreground text-lg leading-relaxed">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
