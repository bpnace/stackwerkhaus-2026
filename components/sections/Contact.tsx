"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { pricingTiers } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };
const PRESET_LIMIT = 3;

function buildPackageProjectMessage(selectedPackage: string | null): string {
  const packageSlug = selectedPackage?.toLowerCase().trim();
  if (!packageSlug) {
    return "";
  }

  const tier = pricingTiers.find(
    (entry: PricingTier) => entry.name.toLowerCase() === packageSlug,
  );
  if (!tier) {
    return "";
  }

  const topFeatures = tier.features
    .filter((feature) => feature.enabled)
    .slice(0, PRESET_LIMIT)
    .map((feature) => feature.label);

  const featureText =
    topFeatures.length > 0 ? `\n\nEnthalten:\n- ${topFeatures.join("\n- ")}` : "";

  return `Wir interessieren uns für das Paket "${tier.name}".\n\n`
    + `Kurz: ab ${tier.price} €, ${tier.timeline}, ${tier.pages}.`
    + featureText
    + "\n\nErgänze bitte:\n- Dein Ziel\n- Gewünschter Umfang\n- Wann soll gestartet werden?\n\nWir freuen uns auf dein Update!";
}

type ContactFormProps = {
  selectedPackage: string | null;
};

function ContactForm({ selectedPackage }: ContactFormProps) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const prefill = buildPackageProjectMessage(selectedPackage);
    if (prefill) {
      setMessage(prefill);
    }
  }, [selectedPackage]);

  const isNameValid = name.trim().length >= 2;
  const isEmailReady = email.trim().length > 0;
  const isMessageValid = message.trim().length >= 12;
  const isFormValid =
    isNameValid && isEmailReady && isMessageValid && termsAccepted;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!isFormValid || !form.reportValidity()) {
      setShowValidationHint(true);
      return;
    }

    setIsSubmitting(true);
    setStatus(initialStatus);
    setShowValidationHint(false);

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      terms: formData.get("terms") ?? "",
      website: String(formData.get("website") ?? ""),
      submitted_at: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
      origin: siteConfig.name,
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
      form.reset();
      setName("");
      setEmail("");
      setMessage("");
      setTermsAccepted(false);
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
    <form onSubmit={onSubmit} className="pt-12 md:pt-26">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="eyebrow text-white">
            <b>Name</b>
          </label>
          <input
            id="name"
            name="name"
            required
            minLength={2}
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (showValidationHint) {
                setShowValidationHint(false);
              }
            }}
            className="mt-2 w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
            placeholder="Wie heißt du?"
          />
        </div>
        <div>
          <label htmlFor="email" className="eyebrow text-white">
            <b>E-Mail</b>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (showValidationHint) {
                setShowValidationHint(false);
              }
            }}
            className="mt-2 w-full rounded-none border-b border-border bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
            placeholder="beispiel@unternehmen.de"
          />
        </div>
      </div>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="mt-6">
        <label htmlFor="message" className="eyebrow text-white">
          <b>Nachricht</b>
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={12}
          rows={9}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (showValidationHint) {
              setShowValidationHint(false);
            }
          }}
          className="mt-2 min-h-[12rem] w-full bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic md:min-h-[18rem]"
          placeholder="Worum geht es, was soll die Website leisten, und was ist der aktuelle Stand?"
        />
      </div>
      <div className="mt-6 border-t border-border pt-6">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="terms"
            checked={termsAccepted}
            onChange={(event) => {
              setTermsAccepted(event.target.checked);
              if (showValidationHint) {
                setShowValidationHint(false);
              }
            }}
            className="mt-1 h-4 w-4 shrink-0 accent-foreground"
            required
          />
          <span>
            Ich akzeptiere die{" "}
            <Link href="/datenschutz" className="font-semibold text-foreground">
              Datenschutzerklärung
            </Link>{" "}
            und stimme der Verarbeitung meiner Angaben gemäß Art. 6 Abs. 1 lit.
            a DSGVO zur Bearbeitung meiner Anfrage zu.
          </span>
        </label>
      </div>
      <div className="mt-6 flex flex-col items-center gap-4 pt-6">
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="link-arrow mx-auto w-fit border border-border px-6 py-4 font-bold disabled:cursor-not-allowed disabled:opacity-30"
        >
          {isSubmitting ? (
            "Wird gesendet ..."
          ) : status.type !== "idle" ? (
            <>
              <span className="text-center normal-case tracking-normal md:hidden">
                {status.message}
              </span>
              <span className="hidden md:inline">
                <LinkRippleText
                  text="Jetzt Erstgespräch anfragen"
                  baseWeight={900}
                  activeWeight={900}
                />
              </span>
            </>
          ) : (
            <LinkRippleText
              text="Jetzt Erstgespräch anfragen"
              baseWeight={900}
              activeWeight={900}
            />
          )}{" "}
        </button>
        {showValidationHint ? (
          <p className="max-w-xl text-center text-xs text-muted">
            Bitte Name, E-Mail und Nachricht ausfüllen und der Verarbeitung
            zustimmen.
          </p>
        ) : null}
        {status.type !== "idle" ? (
          <p className="hidden max-w-xl text-sm text-muted md:block">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function ContactFormWithSearchParams() {
  const searchParams = useSearchParams();
  return <ContactForm selectedPackage={searchParams.get("paket")} />;
}

export function Contact() {
  return (
    <section id="kontakt" className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:gap-20">
        <div>
          <SectionHeader label="Kontakt" marker="(SKWKHS® — 10)" />
          <div className="space-y-6">
            <h2 className="display-lg">Lass uns was einzigartiges bauen.</h2>
            <p className="max-w-4xl text-lg leading-8 text-muted">
              Wir klären gemeinsam, worum’s geht, was gerade bremst und was als Nächstes
              Priorität hat. Angebot schärfen, Zielgruppe sauber einordnen und Projektumfang
              realisieren damit der nächsten Schritt nicht aus dem Bauch heraus entscheiden wird.
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
            <div className="max-w-2xl border-t border-border pt-6">
              <p className="text-sm leading-6 text-muted">
                Du willst noch kein direktes Gespräch? Der Website Check zeigt
                dir zuerst, wo dein Auftritt trägt, knirscht oder neu sortiert
                werden sollte.
              </p>
              <HashLink
                href="/webseitecheck"
                className="link-arrow mt-5 w-fit text-foreground"
              >
                <LinkRippleText text="Website Check starten" baseWeight={700} />
                <span aria-hidden>+</span>
              </HashLink>
            </div>
          </div>
        </div>

        <Suspense fallback={<ContactForm selectedPackage={null} />}>
          <ContactFormWithSearchParams />
        </Suspense>
      </div>
    </section>
  );
}
