import type { Metadata } from "next";
import { AuditOffer } from "@/components/baustellencheck/AuditOffer";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

export const metadata: Metadata = {
  title: "Webseitecheck eingetragen",
  description:
    "Danke für deine Anfrage zum Stackwerkhaus Webseitecheck.",
  alternates: {
    canonical: "/webseitecheck/danke",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const nextLinks = [
  { label: "Pakete ansehen", href: "/#pricing" },
  { label: "Projektbeispiele ansehen", href: "/#projekte" },
  { label: "Direkt Gespräch buchen", href: "/#kontakt" },
] as const;

export default function BaustellencheckDankePage() {
  return (
    <main className="pb-16 lg:pb-24">
      <div className="section-shell grid min-h-[calc(100svh-13rem)] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.72fr)] lg:items-center">
        <div className="space-y-8">
          <div className="eyebrow text-foreground/75">
            Der Stackwerkhaus Webseitecheck
          </div>
          <div className="space-y-6">
            <h1 className="display-lg max-w-4xl">
              Deine Baustelle ist eingetragen.
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-muted md:text-xl md:leading-9">
              Wir schauen uns deinen digitalen Bauzustand an und prüfen
              Fundament, Grundriss, Fassade und Kontaktwege. Du bekommst eine
              kurze Einschätzung mit konkreten Punkten, keine generische
              Massenanalyse.
            </p>
          </div>
        </div>

        <aside className="border-t border-border pt-6">
          <div className="eyebrow text-foreground/75">Nächster Schritt</div>
          <p className="mt-5 text-base leading-7 text-muted">
            Während dein Check vorbereitet wird, kannst du direkt den
            vollständigen Befund buchen oder dir ansehen, wie Stackwerkhaus
            digitale Bauwerke plant.
          </p>
          <div className="mt-8">
            <AuditOffer variant="compact" />
          </div>
          <div className="mt-8 grid gap-3">
            {nextLinks.map((item) => (
              <HashLink
                key={item.href}
                href={item.href}
                className="link-arrow w-full justify-between border border-border px-4 py-4 text-foreground hover:border-foreground"
              >
                <LinkRippleText text={item.label} baseWeight={620} />
                <span aria-hidden>+</span>
              </HashLink>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
