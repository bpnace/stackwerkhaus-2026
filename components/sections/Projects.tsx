import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { LoopingScrambleText } from "@/components/ui/LoopingScrambleText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WordMaskRevealController } from "@/components/ui/WordMaskRevealController";
import type { Project } from "@/lib/projects";
import { renderWordMaskText } from "@/lib/word-mask-text";

const projectsIntro = "Sieht gut aus. Funktioniert noch besser.";

const projectPillars = [
  {
    title: "Planung",
    text: "Full Stack Development, Performance, saubere technische Struktur und eine Basis, die nicht beim ersten Umbau bröckelt.",
  },
  {
    title: "Konstruktion",
    text: "Klare Seitenstruktur, verständliche Nutzerführung und Inhalte, die Besucher nicht durch verwinkelte Flure schicken.",
  },
  {
    title: "Fassade",
    text: "Webdesign, UI/UX und Markenwirkung, die hochwertig aussieht, aber nicht nur dekoriert, sondern verkauft.",
  },
];

type ProjectsProps = {
  projects: Project[];
};

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader id="projekte" label="Projekte" marker="(SKWKHS® — 02)" />
        <div className="mb-10 grid gap-8 md:mb-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.55fr)] lg:items-center lg:gap-14">
          <div data-word-mask-scope="true" className="max-w-3xl space-y-4">
            <h2 className="display-lg">{renderWordMaskText(projectsIntro)}</h2>
            <p className="text-lg leading-8 text-muted">
              Hier landen keine drapierten Showcase-Screens, sondern Projekte,
              bei denen Design, Nutzerführung und technische Umsetzung gemeinsam
              dafür sorgen, dass aus Aufmerksamkeit auch echtes Interesse wird.
            </p>
            <WordMaskRevealController dependencyKey={projects.length} />
          </div>
          <aside
            aria-label="Projekt-Schwerpunkte"
            className="border-y border-white/14 lg:mb-1"
          >
            {projectPillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="grid grid-cols-[3.5rem_1fr] gap-4 border-white/14 py-5 first:border-t-0 not-first:border-t"
              >
                <span className="pt-1 text-[11px] font-semibold uppercase tracking-[0.34em] text-foreground/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {pillar.text}
                  </p>
                </div>
              </div>
            ))}
          </aside>
        </div>
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} index={index} project={project} />
          ))}
          <Link
            href="/projekte"
            transitionTypes={["nav-forward"]}
            className="group grid gap-4 border-b border-border py-6 transition-colors hover:border-foreground/40 md:grid-cols-[72px_1.2fr_110px_1fr_40px] md:items-center"
          >
            <span className="eyebrow text-foreground/80">
              <LoopingScrambleText
                className="tabular-nums"
                delayMs={180}
                text={String(projects.length + 1).padStart(2, "0")}
                updateMs={96}
              />
            </span>
            <div>
              <div className="text-2xl font-semibold tracking-tight">
                Weitere Projekte ansehen
              </div>
              <p className="mt-2 max-w-xl text-sm text-muted md:hidden">
                Alle Cases im Projektarchiv
              </p>
            </div>
            <span className="text-sm text-muted">Archiv</span>
            <div className="text-sm text-muted">
              <LoopingScrambleText
                delayMs={420}
                text="Projektarchiv"
                updateMs={84}
              />
            </div>
            <span className="text-right text-xl text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
