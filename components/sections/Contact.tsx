"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };

export function Contact() {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus(initialStatus);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      project: String(formData.get("project") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Die Anfrage konnte nicht gesendet werden.");
      }

      setStatus({
        type: "success",
        message: result.message || "Danke. Die Anfrage wurde aufgenommen.",
      });
      event.currentTarget.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Die Anfrage konnte nicht gesendet werden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="kontakt" className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:gap-20">
        <div>
          <SectionHeader label="Kontakt" marker="(SKWKHS® — 10)" />
          <div className="space-y-6">
            <h2 className="display-lg">Gib uns 30 Minuten, um dein Projekt zu verstehen.</h2>
            <p className="max-w-4xl text-lg leading-8 text-muted">
              Im Erstgespräch klären wir Angebot, Zielgruppe und Projektumfang,
              damit eine saubere Entscheidung möglich wird – ohne künstlichen
              Sales-Druck.
            </p>
            <div className="space-y-3 text-sm text-muted">
              <div>{siteConfig.location}</div>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover-weight-link hover:text-foreground"
              >
                <LinkRippleText text={siteConfig.email} />
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="border-t border-border pt-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="eyebrow">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                className="mt-2 w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground"
                placeholder="Wie sollen wir dich ansprechen?"
              />
            </div>
            <div>
              <label htmlFor="email" className="eyebrow">
                E-Mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground"
                placeholder="name@unternehmen.de"
              />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="project" className="eyebrow">
              Projekt
            </label>
            <textarea
              id="project"
              name="project"
              required
              rows={9}
              className="mt-2 min-h-[18rem] w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground"
              placeholder="Worum geht es, was soll die Website leisten, und was ist der aktuelle Stand?"
            />
          </div>
          <div className="mt-6 flex flex-col gap-4 border-t border-border pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="link-arrow w-fit border border-border px-6 py-4 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Wird gesendet ..." : "Jetzt Erstgespräch anfragen"}{" "}
              <span aria-hidden>↘</span>
            </button>
            {status.type !== "idle" ? (
              <p className="max-w-xl text-sm text-muted">{status.message}</p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
