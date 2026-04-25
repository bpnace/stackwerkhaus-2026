import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { HashLink } from "@/components/ui/HashLink";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
] as const;

export function Footer() {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();
  const githubProfileUrl = githubUsername
    ? `https://github.com/${githubUsername}`
    : undefined;

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[linear-gradient(180deg,#fcfbf8_0%,#f2ebe2_52%,#e7ded1_100%)] text-[#141414]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_top_right,rgba(17,24,39,0.08),transparent_28%)]" />

      <div className="section-shell relative py-10 md:py-10">
        <div className="grid gap-14 border-b border-black/10 pb-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(360px,0.8fr)] lg:gap-20">
          <div className="space-y-7">
            <div className="text-[11px] font-black uppercase tracking-[0.42em] text-black/55">
              {siteConfig.name}
            </div>

            <div className="space-y-6">
              <p className="display-lg max-w-4xl text-balance text-[#101010]">
                Deine digitalen Architekten.
              </p>
              <p className="max-w-2xl text-base leading-8 text-black/65 md:text-lg">
                  Digitale Auftritte mit stabilem Aufbau, klarer Führung und
                  einem Fundament, das mehr kann als nur gut aussehen.
              </p>
            </div>
          </div>

          <div className="p-8 md:p-10">
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                  Navigation
                </div>
                <div className="space-y-3 text-sm uppercase tracking-[0.22em] text-black/68">
                  {siteConfig.navigation.map((item) => (
                    <HashLink
                      key={item.href}
                      href={item.href}
                      className="hover-weight-link block w-fit hover:text-black"
                    >
                      <LinkRippleText
                        text={item.label}
                        baseWeight={500}
                        activeWeight={820}
                      />
                    </HashLink>
                  ))}
                  <HashLink
                    href="/webseitecheck"
                    className="hover-weight-link block w-fit hover:text-black"
                  >
                    <LinkRippleText
                      text="Website Check"
                      baseWeight={500}
                      activeWeight={820}
                    />
                  </HashLink>
                </div>

                <div className="space-y-4 pt-4">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                    Rechtliches
                  </div>
                  <div className="space-y-3 text-sm uppercase tracking-[0.22em] text-black/68">
                    {legalLinks.map((item) => (
                      <HashLink
                        key={item.href}
                        href={item.href}
                        className="hover-weight-link block w-fit hover:text-black"
                      >
                        <LinkRippleText
                          text={item.label}
                          baseWeight={500}
                          activeWeight={820}
                        />
                      </HashLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                  Kontakt
                </div>
                <div className="space-y-3 text-sm uppercase tracking-[0.22em] text-black/68">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover-weight-link block w-fit hover:text-black"
                  >
                    <LinkRippleText
                      text={siteConfig.email}
                      baseWeight={500}
                      activeWeight={820}
                    />
                  </a>
                  {siteConfig.socialLinks.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-weight-link block w-fit hover:text-black"
                    >
                      <LinkRippleText
                        text={item.label}
                        baseWeight={500}
                        activeWeight={820}
                      />
                    </a>
                  ))}
                  {githubProfileUrl ? (
                    <a
                      href={githubProfileUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="hover-weight-link block w-fit hover:text-black"
                    >
                      <LinkRippleText
                        text="GitHub"
                        baseWeight={500}
                        activeWeight={820}
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-[11px] uppercase tracking-[0.32em] text-black/48">
            <div>
              © {siteConfig.name} 2026
            </div>
            <div>Webdesign · Frontend · Backend · AEO/SEO</div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <div className="inline-flex min-h-10 items-center px-3 py-3">
              <Image
                src="/logos/eu_lock.svg"
                alt="EU badge"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>

            <div className="inline-flex min-h-10 items-center px-3 py-3">
              <Image
                src="/logos/eu_hoster.png"
                alt="EU hosting badge"
                width={44}
                height={44}
                className="h-11 w-11 object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
