import Image from "next/image";
import { landingPages } from "@/lib/landing-pages";
import { siteConfig } from "@/lib/site-config";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import { HashLink } from "@/components/ui/HashLink";

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
] as const;

const archiveLinks = [
  { label: "Projektarchiv", href: "/projekte" },
  { label: "Blog", href: "/blog" },
] as const;

export function Footer() {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();
  const githubProfileUrl = githubUsername
    ? `https://github.com/${githubUsername}`
    : undefined;

  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[linear-gradient(180deg,#fcfbf8_0%,#f2ebe2_52%,#e7ded1_100%)] text-[#141414]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_top_right,rgba(17,24,39,0.08),transparent_28%)]" />

      <div className="section-shell relative py-8 md:py-10">
        <div className="grid gap-9 border-b border-black/10 pb-8 md:gap-14 md:pb-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(560px,0.95fr)] xl:gap-20">
          <div className="space-y-4 md:space-y-7">
            <div className="text-[11px] font-black uppercase tracking-[0.42em] text-black/55">
              {siteConfig.name}
            </div>

            <div className="space-y-6">
              <p className="max-w-[8.5ch] text-balance font-display text-[clamp(2.75rem,12vw,6.25rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-[#101010]">
                Deine digitalen Architekten.
              </p>
              <p className="hidden max-w-2xl text-base leading-8 text-black/65 sm:block md:text-lg">
                Digitale Auftritte mit stabilem Aufbau, klarer Führung und
                einem Fundament, das mehr kann als nur gut aussehen.
              </p>
            </div>
          </div>

          <div className="sm:p-8 md:p-10">
            <div className="grid items-start gap-x-6 gap-y-8 min-[380px]:grid-cols-[minmax(0,0.78fr)_minmax(190px,1fr)] sm:gap-10 sm:grid-cols-[minmax(0,0.8fr)_minmax(290px,1fr)]">
              <div className="space-y-3 sm:space-y-4">
                <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                  Navigation
                </div>
                <div className="space-y-2 text-[11px] uppercase tracking-[0.16em] text-black/68 sm:space-y-3 sm:text-sm sm:tracking-[0.22em]">
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
                  <TrackedHashLink
                    href="/webseitecheck"
                    eventName="website_check_cta_click"
                    eventParams={{ placement: "footer" }}
                    className="hover-weight-link block w-fit hover:text-black"
                  >
                    <LinkRippleText
                      text="Website Check"
                      baseWeight={500}
                      activeWeight={820}
                    />
                  </TrackedHashLink>
                  {archiveLinks.map((item) => (
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

                <div className="space-y-3 pt-3 sm:space-y-4 sm:pt-4">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                    Rechtliches
                  </div>
                  <div className="space-y-2 text-[11px] uppercase tracking-[0.16em] text-black/68 sm:space-y-3 sm:text-sm sm:tracking-[0.22em]">
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

              <div className="space-y-3 sm:space-y-4">
                <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                  Fachbereiche
                </div>
                <div className="space-y-2 text-[11px] uppercase tracking-[0.16em] text-black/48 sm:space-y-3 sm:text-sm sm:tracking-[0.22em]">
                  {landingPages.map((page) => (
                    <HashLink
                      key={page.path}
                      href={page.path}
                      className="hover-weight-link block w-fit whitespace-nowrap hover:text-black"
                    >
                      <LinkRippleText
                        text={page.homeTitle}
                        baseWeight={500}
                        activeWeight={820}
                      />
                    </HashLink>
                  ))}
                </div>

                <div className="space-y-3 pt-3 sm:space-y-4 sm:pt-4">
                  <div className="text-[11px] uppercase tracking-[0.32em] text-black/45">
                    Kontakt
                  </div>
                  <div className="space-y-2 text-[11px] uppercase tracking-[0.16em] text-black/68 sm:space-y-3 sm:text-sm sm:tracking-[0.22em]">
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
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-[11px] uppercase tracking-[0.32em] text-black/48">
            <div>
              © {siteConfig.name} 2026
            </div>
            <div>Webdesign · Frontend · Backend · AEO/SEO</div>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:justify-end md:gap-3">
            <div className="inline-flex min-h-9 items-center px-2 py-2 md:min-h-10 md:px-3 md:py-3">
              <Image
                src="/logos/eu_lock.svg"
                alt="EU badge"
                width={44}
                height={44}
                className="h-9 w-9 object-contain md:h-11 md:w-11"
              />
            </div>

            <div className="inline-flex min-h-9 items-center px-2 py-2 md:min-h-10 md:px-3 md:py-3">
              <Image
                src="/logos/eu_hoster.png"
                alt="EU hosting badge"
                width={44}
                height={44}
                className="h-9 w-9 object-contain md:h-11 md:w-11"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
