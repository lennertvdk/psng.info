import { useState, useEffect, useRef, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { primaryButton } from "@/components/astro/home/styles";
import { CONTACT_EMAIL } from "@/lib/links";
import { track } from "@/scripts/track";
import { useCopy } from "@/i18n/copy";
import { withLocale } from "@/i18n/locale";

/**
 * Die Werte gehen an /api/kontakt und landen in der Mail – sie bleiben deutsch und
 * damit über beide Sprachen hinweg vergleichbar. Übersetzt wird nur, was im
 * Auswahlfeld steht; die Zuordnung läuft über den Schlüssel aus copy.ts.
 */
const subjectValues: Record<string, string> = {
  group: "Gruppe gründen",
  team: "Team",
  talk: "Vortrag vorschlagen",
  cooperation: "Kooperation",
  feedback: "Feedback",
  complaint: "Beschwerde",
  other: "Sonstiges",
};


const subjectParamMap: Record<string, string> = {
  gruppe: "Gruppe gründen",
  team: "Team",
  vortrag: "Vortrag vorschlagen",
  kooperation: "Kooperation",
  feedback: "Feedback",
  beschwerde: "Beschwerde",
};

type Status = "idle" | "submitting" | "success" | "error";

interface Props {
  /** Vorgewähltes Anliegen als Schlüssel wie in `?subject=`, z. B. „team“. */
  defaultSubject?: keyof typeof subjectParamMap;
  /** Nur das Formular, ohne eigene Sektion und Überschrift – für „Mach mit“ auf /ueber-uns. */
  embedded?: boolean;
}

const ContactSection = ({ defaultSubject, embedded = false }: Props) => {
  const c = useCopy();
  const initialSubject = defaultSubject ? subjectParamMap[defaultSubject] : "";
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState(initialSubject);
  // Nach dem Absenden verschwindet das Formular; der Fokus geht auf die
  // Bestätigung, statt ins Leere zu fallen.
  const successRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);
  // ?subject=… aus den Knöpfen anderer Seiten wählt das Anliegen vor.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("subject");
    if (param && subjectParamMap[param]) setSubject(subjectParamMap[param]);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error("Submission failed");

      setStatus("success");
      track(`kontakt/${subject || "ohne-anliegen"}`);
      form.reset();
      setSubject(initialSubject);
    } catch {
      setStatus("error");
    }
  };

  const resetForm = () => {
    setStatus("idle");
    setSubject(initialSubject);
  };

  const body = status === "success" ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-card rounded-2xl border border-border p-8 text-center"
            >
              <h3 ref={successRef} tabIndex={-1} className="font-heading text-lg font-semibold text-foreground mb-2 focus:outline-none">
                {c.contact.successTitle}
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                {c.contact.successText}
              </p>
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-heading font-medium text-primary hover:underline"
              >
                {c.contact.successAgain}
              </button>
            </div>
          ) : (
            <form
              name="kontakt"
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5"
            >
              <p className="hidden">
                <label>
                  {c.contact.honeypot} <input name="bot-field" />
                </label>
              </p>

              <p className="text-sm text-muted-foreground">{c.contact.allRequired}</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">{c.contact.name}</Label>
                  <Input id="name" name="name" autoComplete="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">{c.contact.email}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">{c.contact.subject}</Label>
                <input type="hidden" name="subject" value={subject} />
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject" className="mt-1.5">
                    <SelectValue placeholder={c.contact.subjectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {c.contact.subjects.map((option) => (
                      <SelectItem
                        key={option.key}
                        value={subjectValues[option.key]}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">{c.contact.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5"
                />
              </div>

              <div role="status" aria-live="polite">
                {status === "error" && (
                  <p className="text-destructive text-sm">
                    {c.contact.errorBefore}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="underline">
                      {CONTACT_EMAIL}
                    </a>
                    {c.contact.errorAfter}
                  </p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === "submitting" || !subject}
                  aria-describedby={!subject ? "kontakt-anliegen-hinweis" : undefined}
                  className={`${primaryButton} w-full disabled:pointer-events-none disabled:opacity-50`}
                >
                  {status === "submitting" ? c.contact.submitting : c.contact.submit}
                </button>
                {!subject && (
                  <p id="kontakt-anliegen-hinweis" className="text-muted-foreground text-xs mt-2 text-center">
                    {c.contact.subjectRequired}
                  </p>
                )}
              </div>
            </form>
          );

  if (embedded) return body;

  return (
    <section id="kontakt" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            {c.contact.title}
          </h2>
          <p className="text-foreground/80 text-lg leading-relaxed max-w-[68ch]">
            {c.contact.intro}
          </p>
        </div>
        <div className="max-w-2xl mx-auto">{body}</div>
      </div>
    </section>
  );
};

export default withLocale(ContactSection);
