import { Link } from "react-router-dom";
import { getEventAnchor, getLatestRatedEvent, formatEventDate } from "@/data/events";
import { useCopy } from "@/i18n/copy";
import { useLocale } from "@/i18n/locale";
import { pick } from "@/i18n/localized";
import { pathFor } from "@/i18n/routes";
import { eyebrowClass, homeSection } from "./shared";

/**
 * Was das PSNG ist und was nicht. Bei dem Thema ist für Neue zunächst offen,
 * ob hier ein akademisches Netzwerk, ein Verein für Drogenpolitik oder eine
 * Szene spricht – diese Sektion beantwortet das, bevor jemand fragen muss.
 *
 * Der Missionssatz steht hier statt in einer eigenen Sektion: Er ist die
 * Überschrift über genau diesen vier Punkten.
 */
export const Credibility = () => {
  const c = useCopy();
  const locale = useLocale();
  const k = c.lab.credibility;

  return (
    <section aria-labelledby="lab-credibility" className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <p className={`${eyebrowClass} mb-3`}>{k.eyebrow}</p>
          <h2 id="lab-credibility" className="font-heading text-3xl font-bold text-foreground md:text-4xl">
            {k.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/75">{k.mission}</p>
        </div>

        <ul className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {k.items.map((item) => (
            <li key={item.key} className="border-t-2 border-primary/40 pt-4">
              <h3 className="font-heading text-base font-semibold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          <Link
            to={pathFor("codeOfConduct", locale)}
            className="font-heading text-sm font-medium text-primary hover:underline"
          >
            {k.codeOfConduct}
          </Link>
          <Link
            to={homeSection(locale, "uber-uns")}
            className="font-heading text-sm font-medium text-primary hover:underline"
          >
            {k.about}
          </Link>
        </div>
      </div>
    </section>
  );
};

/**
 * Ein echter Beleg statt eines Zitats: das jüngste Event mit Rückmeldung der
 * Teilnehmenden, mit seinem stärksten Foto. Gibt es keins, entfällt die
 * Sektion – erfunden wird hier nichts.
 */
export const Proof = () => {
  const c = useCopy();
  const locale = useLocale();
  const event = getLatestRatedEvent();
  if (!event?.assets) return null;

  const a = event.assets;
  const photo = a.photos?.[0];
  const alt = pick(a.photoAlts?.[0], locale) ?? c.events.photoFallback;
  const figures = [
    { value: String(a.attendees), label: c.events.attendees },
    { value: a.rating!, label: c.events.rating },
    ...(a.recommendPercent
      ? [{ value: `${a.recommendPercent} %`, label: c.events.recommend }]
      : []),
  ];

  return (
    <section aria-labelledby="lab-proof" className="bg-white py-16 md:py-24">
      <div className="container mx-auto grid items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16">
        {photo && (
          <img
            src={photo}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
          />
        )}
        <div>
          <p className={`${eyebrowClass} mb-3`}>{c.lab.proof.eyebrow}</p>
          <h2 id="lab-proof" className="font-heading text-2xl font-bold leading-snug text-foreground md:text-3xl">
            {pick(event.highlightBadge, locale) ?? pick(event.title, locale)}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {formatEventDate(event.date, locale)}
            {event.partnerCredit ? ` · ${c.events.with} ${event.partnerCredit.short}` : ""}
          </p>
          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
            {figures.map((f) => (
              // Im DOM erst die Bezeichnung (so verlangt es <dl>), sichtbar die Zahl oben.
              <div key={f.label} className="flex flex-col-reverse">
                <dt className="mt-1 text-xs text-muted-foreground md:text-sm">{f.label}</dt>
                <dd className="font-heading text-3xl font-bold text-foreground md:text-4xl">{f.value}</dd>
              </div>
            ))}
          </dl>
          <Link
            to={homeSection(locale, getEventAnchor(event))}
            className="mt-6 inline-block font-heading text-sm font-medium text-primary hover:underline"
          >
            {c.lab.proof.more}
          </Link>
        </div>
      </div>
    </section>
  );
};
