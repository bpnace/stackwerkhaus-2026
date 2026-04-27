import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { LandingPage as LandingPageData } from "@/lib/landing-pages";
import {
  getLandingPageStructuredData,
  stringifyJsonLd,
} from "@/lib/landing-pages";

type LandingPageProps = {
  page: LandingPageData;
};

export function LandingPage({ page }: LandingPageProps) {
  const structuredData = getLandingPageStructuredData(page);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: stringifyJsonLd(structuredData),
        }}
      />

      <section className="section-space pt-8 md:pt-14">
        <div className="section-shell space-y-8 md:space-y-10">
          <div className="max-w-6xl space-y-7">
            <div className="eyebrow text-foreground/75">Stackwerkhaus Leistung</div>
            <h1 className="max-w-[15ch] font-display text-[clamp(2.7rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.055em] break-words hyphens-none text-balance">
              {page.h1}
            </h1>
          </div>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.36fr)] lg:items-end">
            <div className="max-w-5xl space-y-7">
              <p className="max-w-4xl text-lg leading-8 text-muted md:text-xl md:leading-9">
                {page.heroText}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <HashLink
                  href="/#kontakt"
                  className="link-arrow w-full justify-between bg-foreground px-5 py-4 text-background sm:w-fit"
                >
                  <LinkRippleText text="Projekt anfragen" baseWeight={760} />
                  <span aria-hidden>+</span>
                </HashLink>
                <HashLink
                  href={`${page.path}#faq`}
                  className="link-arrow w-full justify-between border border-border px-5 py-4 text-foreground hover:border-foreground/45 sm:w-fit"
                >
                  <LinkRippleText text="FAQ ansehen" baseWeight={560} />
                  <span aria-hidden>+</span>
                </HashLink>
              </div>
            </div>

            <aside className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8">
              <div className="eyebrow text-foreground/60">Worum es geht</div>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-muted">
                {page.keywords.slice(0, 4).map((keyword) => (
                  <li key={keyword} className="flex gap-3">
                    <span aria-hidden className="text-foreground">
                      +
                    </span>
                    <span>{keyword}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[#f4eee5] py-12 text-[#111111] md:py-16">
        <div className="section-shell grid gap-8 lg:grid-cols-[minmax(220px,0.35fr)_1fr] lg:gap-14">
          <div>
            <div className="text-[length:var(--label)] uppercase tracking-[0.35em] text-black/48">
              Auf den Punkt
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.045em] text-[#111111] md:text-5xl">
              {page.answerHeading}
            </h2>
          </div>
          <p className="max-w-4xl text-lg leading-8 text-black/72 md:text-xl md:leading-9">
            {page.directAnswer}
          </p>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(240px,0.32fr)_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="eyebrow">Bauplan</div>
              <h2 className="mt-4 display-md max-w-[11ch]">
                {page.guideHeading}
              </h2>
              <p className="mt-5 max-w-md text-base leading-7 text-muted">
                Sichtbarer, lesbarer Inhalt für Menschen zuerst. Strukturierte
                Daten und interne Links ergänzen die Seite, behaupten aber
                nichts, was hier nicht steht.
              </p>
            </div>

            <div className="border-y border-border">
              {page.sections.map((section) => (
                <article
                  key={section.heading}
                  className="grid gap-6 border-border py-8 not-first:border-t md:grid-cols-[minmax(220px,0.36fr)_1fr] md:gap-10 md:py-10"
                >
                  <h2 className="text-3xl font-black tracking-[-0.045em] text-foreground hyphens-auto break-words md:text-4xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-5 text-base leading-7 text-muted md:text-lg md:leading-8">
                    {section.summary ? (
                      <p className="text-foreground/90">{section.summary}</p>
                    ) : null}
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.items ? (
                      <ul className="grid gap-3 pt-2 text-base leading-7 text-foreground/84 sm:grid-cols-2">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden className="text-foreground">
                              +
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {section.steps ? (
                      <ol className="grid gap-3 pt-2">
                        {section.steps.map((step, index) => (
                          <li
                            key={step.title}
                            className="grid gap-3 border-t border-border pt-4 sm:grid-cols-[48px_1fr]"
                          >
                            <span className="text-[length:var(--label)] font-black uppercase tracking-[0.25em] text-foreground/48">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3 className="text-base font-black tracking-[-0.015em] text-foreground md:text-lg">
                                {step.title}
                              </h3>
                              <p className="mt-1 text-sm leading-6 text-muted md:text-base md:leading-7">
                                {step.text}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ol>
                    ) : null}
                    {section.table ? (
                      <div className="overflow-x-auto border-y border-border">
                        <table className="min-w-full border-collapse text-left text-sm leading-6">
                          <caption className="sr-only">
                            {section.table.caption}
                          </caption>
                          <thead className="text-[11px] uppercase tracking-[0.22em] text-foreground/58">
                            <tr>
                              {section.table.columns.map((column) => (
                                <th
                                  key={column}
                                  scope="col"
                                  className="border-b border-border py-3 pr-5 font-medium"
                                >
                                  {column}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="text-foreground/78">
                            {section.table.rows.map((row) => (
                              <tr key={row.join("|")} className="border-t border-border/70">
                                {row.map((cell, index) => (
                                  <td
                                    key={`${row[0]}-${index}`}
                                    className={`py-3 pr-5 align-top ${
                                      index === 0 ? "font-black text-foreground" : ""
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : null}
                    {section.contextualLinks ? (
                      <div className="grid gap-3 border-t border-border pt-5 text-sm leading-6 sm:grid-cols-2">
                        {section.contextualLinks.map((link) => (
                          <HashLink
                            key={link.href}
                            href={link.href}
                            className="group block text-foreground transition hover:text-foreground/72"
                          >
                            <span className="block font-black tracking-[-0.015em]">
                              {link.label}
                            </span>
                            <span className="mt-1 block text-muted">
                              {link.description}
                            </span>
                          </HashLink>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="section-space bg-[#f4eee5] text-[#111111]">
        <div className="section-shell">
          <div className="mb-10 max-w-4xl space-y-4 md:mb-14">
            <div className="text-[length:var(--label)] uppercase tracking-[0.35em] text-black/48">
              FAQ
            </div>
            <h2 className="text-4xl font-black tracking-[-0.05em] text-[#111111] md:text-6xl">
              Häufige Fragen
            </h2>
          </div>
          <div className="border-y border-black/12">
            {page.faqs.map((faq) => (
              <article
                key={faq.question}
                className="grid gap-4 border-black/12 py-7 not-first:border-t md:grid-cols-[minmax(240px,0.38fr)_1fr] md:gap-10"
              >
                <h3 className="text-xl font-black tracking-[-0.025em] text-[#111111] md:text-2xl">
                  {faq.question}
                </h3>
                <p className="max-w-4xl text-base leading-7 text-black/68 md:text-lg md:leading-8">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,0.6fr)] lg:items-start lg:gap-16">
          <div className="space-y-6">
            <div className="eyebrow">Nächster Schritt</div>
            <h2 className="display-md max-w-[12ch]">
              {page.finalHeading}
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-muted">
              Wenn die Richtung passt, klären wir Umfang, Inhalt, technische
              Anforderungen und den saubersten Weg zum Launch. Kurz, konkret
              und ohne unnötigen Agentur-Nebel.
            </p>
            <p className="text-sm uppercase tracking-[0.24em] text-muted">
              Stand: {page.updatedAt}
            </p>
            <HashLink
              href="/#kontakt"
              className="link-arrow w-full justify-between bg-foreground px-5 py-4 text-background sm:w-fit"
            >
              <LinkRippleText text="Erstgespräch anfragen" baseWeight={760} />
              <span aria-hidden>+</span>
            </HashLink>
          </div>

          <div>
            <div className="eyebrow">Verwandte Leistungen</div>
            <div className="mt-6 border-y border-border">
              {page.internalLinks.map((link) => (
                <HashLink
                  key={link.href}
                  href={link.href}
                  className="group block border-border py-5 not-first:border-t"
                >
                  <span className="flex items-start justify-between gap-6">
                    <span>
                      <span className="block text-xl font-black tracking-[-0.035em] text-foreground md:text-2xl">
                        {link.label}
                      </span>
                      <span className="mt-2 block max-w-lg text-sm leading-6 text-muted">
                        {link.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="pt-1 text-foreground/58 transition group-hover:text-foreground"
                    >
                      +
                    </span>
                  </span>
                </HashLink>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
