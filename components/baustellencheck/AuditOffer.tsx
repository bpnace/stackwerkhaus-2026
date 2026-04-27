import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

const auditFacts = [
  "48h Lieferung",
  "5–8 Seiten oder Loom",
  "Anrechnung bei Projektbuchung",
] as const;

type AuditOfferProps = {
  variant?: "section" | "compact";
};

export function AuditOffer({ variant = "section" }: AuditOfferProps) {
  const compact = variant === "compact";

  return (
    <article
      className={
        compact
          ? "bg-foreground p-5 text-background"
          : "grid gap-8 border-y border-border py-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)] md:items-start"
      }
    >
      <div>
        <div
          className={`eyebrow ${
            compact ? "text-background/62" : "text-foreground/75"
          }`}
        >
          Bezahlter Befund
        </div>
        <h2
          className={`mt-4 font-display font-black leading-[0.96] tracking-[-0.045em] ${
            compact
              ? "max-w-[14ch] text-3xl text-background"
              : "max-w-4xl text-4xl text-foreground md:text-6xl"
          }`}
        >
          {compact
            ? "Willst du den vollständigen Befund?"
            : "Website Audit / Bauzustandsbericht – 249\u00a0€"}
        </h2>
        <p
          className={`mt-5 max-w-2xl text-base leading-7 ${
            compact ? "text-background/68" : "text-muted md:text-lg md:leading-8"
          }`}
        >
          {compact
            ? "Der kostenlose Check gibt dir die erste Richtung. Der vollständige Befund geht tiefer und zeigt dir konkret, was zuerst repariert werden sollte."
            : "Wenn du nach dem kostenlosen Check den kompletten Bauzustand willst, bekommst du einen klaren Audit mit priorisierten Befunden und nächsten Schritten."}
        </p>
      </div>
      <div className={compact ? "mt-6" : ""}>
        <ul
          className={`grid gap-3 text-sm leading-6 ${
            compact ? "text-background/78" : "text-foreground/88"
          }`}
        >
          {auditFacts.map((fact) => (
            <li key={fact} className="flex gap-3">
              <span
                aria-hidden
                className={compact ? "text-background" : "text-foreground"}
              >
                +
              </span>
              <span>{fact}</span>
            </li>
          ))}
        </ul>
        <HashLink
          href="/?angebot=website-audit#kontakt"
          className={`link-arrow mt-7 w-full justify-between px-4 py-4 sm:w-fit ${
            compact
              ? "bg-background text-foreground hover:bg-background/90"
              : "bg-foreground text-background hover:bg-foreground/90"
          }`}
        >
          <LinkRippleText text="Audit für 249 € buchen" baseWeight={760} />
          <span aria-hidden>+</span>
        </HashLink>
      </div>
    </article>
  );
}
