import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Instagram, Youtube } from "lucide-react";
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
import { Button } from "@/components/ui/button";

const subjectOptions = [
  { value: "Gruppe gründen", label: "Ich möchte eine Lokalgruppe gründen" },
  { value: "Kooperation", label: "Kooperationsanfrage" },
  { value: "Feedback", label: "Feedback zur Website oder zum Netzwerk" },
  { value: "Beschwerde", label: "Beschwerde / Code-of-Conduct-Anliegen" },
  { value: "Sonstiges", label: "Sonstiges" },
];

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");

type Status = "idle" | "submitting" | "success" | "error";

const ContactSection = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState("");

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
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(data),
      });

      if (!response.ok) throw new Error("Submission failed");

      setStatus("success");
      form.reset();
      setSubject("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="kontakt" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <p className="font-heading text-sm uppercase tracking-[0.2em] text-primary mb-4">
            Kontakt
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            Schreib uns
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ob Gruppengründung, Kooperation, Feedback oder eine Beschwerde –
            wähle dein Anliegen und wir melden uns bei dir.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          {status === "success" ? (
            <div className="bg-card rounded-2xl border border-border p-8 text-center hover:shadow-lg transition-shadow">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                Danke für deine Nachricht!
              </h3>
              <p className="text-muted-foreground text-sm">
                Wir melden uns so bald wie möglich bei dir.
              </p>
            </div>
          ) : (
            <form
              name="kontakt"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-5 hover:shadow-lg transition-shadow"
            >
              {/* Required for Netlify form detection */}
              <input type="hidden" name="form-name" value="kontakt" />
              <p className="hidden">
                <label>
                  Nicht ausfüllen: <input name="bot-field" />
                </label>
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Anliegen</Label>
                <input type="hidden" name="subject" value={subject} />
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject" className="mt-1.5">
                    <SelectValue placeholder="Bitte auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message">Nachricht</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5"
                />
              </div>

              {status === "error" && (
                <p className="text-destructive text-sm">
                  Etwas ist schiefgelaufen. Bitte versuch es erneut oder
                  schreib uns direkt an{" "}
                  <a href="mailto:kontakt@psng.info" className="underline">
                    kontakt@psng.info
                  </a>
                  .
                </p>
              )}

              <Button
                type="submit"
                disabled={status === "submitting" || !subject}
                className="w-full gradient-psychedelic text-primary-foreground font-heading"
              >
                {status === "submitting" ? "Wird gesendet…" : "Nachricht senden"}
              </Button>
            </form>
          )}

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <a
              href="mailto:kontakt@psng.info"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Mail size={16} />
              kontakt@psng.info
            </a>
            <a
              href="https://www.instagram.com/psng.info/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Instagram size={16} />
              @psng.info
            </a>
            <a
              href="https://www.youtube.com/channel/UCMHHH4dOREJTJF_ySpgV7mA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              <Youtube size={16} />
              YouTube
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
