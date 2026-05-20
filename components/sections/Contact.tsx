"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { pricingTiers, websiteCheckOffer } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";
import { TrackedHashLink } from "@/components/analytics/TrackedHashLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LinkRippleText } from "@/components/ui/LinkRippleText";
import type { PricingTier } from "@/lib/site-data";
import {
  renderWordMaskText,
  useWordMaskHeadingReveal,
} from "@/lib/word-mask-heading";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };
const PRESET_LIMIT = 3;

const offerPrefills = {
  "website-check": {
    title: websiteCheckOffer.name,
    price: websiteCheckOffer.price,
    bullets: [
      "für Neukunden",
      websiteCheckOffer.description,
      "konkrete Einschätzung mit nächsten Schritten",
    ],
  },
} as const;

const legacyOfferAliases = {
  care: "website-individuell",
  growth: "system-wachstum",
  "website-abo": "template-start",
  "facility-management": "website-individuell",
  "wartung-wachstum": "system-wachstum",
  "website-audit": "website-check",
  rohbau: "template-start",
  sanierung: "website-individuell",
  bauwerk: "system-wachstum",
} as const;

function normalizeOfferSlug(value: string | null) {
  const slug = value?.toLowerCase().trim();
  if (!slug) {
    return "";
  }

  return legacyOfferAliases[slug as keyof typeof legacyOfferAliases] ?? slug;
}

function buildTierPriceSummary(tier: PricingTier) {
  return `ab ${tier.monthlyPrice} ${tier.monthlySuffix} (${tier.monthlyNote}).`;
}

function findPricingTier(selectedPackage: string | null, selectedOffer: string | null) {
  const offerSlug = normalizeOfferSlug(selectedOffer);
  const packageSlug = normalizeOfferSlug(selectedPackage);
  const requestedSlug = offerSlug || packageSlug;

  if (!requestedSlug) {
    return undefined;
  }

  return pricingTiers.find(
    (entry: PricingTier) =>
      entry.slug === requestedSlug ||
      entry.name.toLowerCase() === requestedSlug,
  );
}

function buildPricingProjectMessage(
  selectedPackage: string | null,
  selectedOffer: string | null,
  selectedTemplate: string | null = null,
): string {
  const tier = findPricingTier(selectedPackage, selectedOffer);
  if (!tier) {
    return "";
  }

  const topFeatures = tier.includes.slice(0, PRESET_LIMIT);

  const featureText =
    topFeatures.length > 0 ? `\n\nEnthalten:\n- ${topFeatures.join("\n- ")}` : "";
  const templateText =
    tier.slug === "template-start" && selectedTemplate
      ? `\n\nGewähltes Template: ${selectedTemplate}`
      : "";

  return `Ich interessiere mich für das Paket "${tier.name}".\n\n`
    + `Preisrahmen: ${buildTierPriceSummary(tier)}`
    + templateText
    + featureText
    + "\n\nErgänze bitte:\n- Dein Ziel\n- aktueller Website-Stand\n- gewünschter Start";
}

function buildOfferProjectMessage(selectedOffer: string | null): string {
  const offerSlug = normalizeOfferSlug(selectedOffer);

  if (!offerSlug || !(offerSlug in offerPrefills)) {
    return "";
  }

  const offer = offerPrefills[offerSlug as keyof typeof offerPrefills];

  return `Ich interessiere mich für: ${offer.title} (${offer.price}).\n\n`
    + `Eckpunkte:\n- ${offer.bullets.join("\n- ")}`
    + "\n\nErgänze bitte:\n- Website URL\n- Aktuelle Frage oder Ziel\n- Gewünschter Start";
}

type ContactFormProps = {
  selectedPackage: string | null;
  selectedOffer: string | null;
};

type UrlSelection = {
  selectedPackage: string | null;
  selectedOffer: string | null;
  selectedTemplate: string | null;
};

function readUrlSelection(
  selectedPackage: string | null,
  selectedOffer: string | null,
): UrlSelection {
  if (typeof window === "undefined") {
    return { selectedPackage, selectedOffer, selectedTemplate: null };
  }

  const params = new URLSearchParams(window.location.search);
  const packageParam = params.get("paket");
  const offerParam = params.get("angebot");
  const templateParam = params.get("template");

  return {
    selectedPackage: packageParam ?? selectedPackage,
    selectedOffer: offerParam ?? selectedOffer,
    selectedTemplate: templateParam,
  };
}

function buildInitialProjectMessage(
  selectedPackage: string | null,
  selectedOffer: string | null,
  selectedTemplate: string | null = null,
) {
  return (
    buildPricingProjectMessage(
      selectedPackage,
      selectedOffer,
      selectedTemplate,
    ) ||
    buildOfferProjectMessage(selectedOffer) ||
    buildOfferProjectMessage(selectedPackage)
  );
}

function ContactForm({ selectedPackage, selectedOffer }: ContactFormProps) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(() =>
    buildInitialProjectMessage(selectedPackage, selectedOffer),
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [urlSelection, setUrlSelection] = useState<UrlSelection>(() => ({
    selectedPackage,
    selectedOffer,
    selectedTemplate: null,
  }));

  useEffect(() => {
    function updateUrlSelection() {
      setUrlSelection(readUrlSelection(selectedPackage, selectedOffer));
    }

    updateUrlSelection();
    window.addEventListener("popstate", updateUrlSelection);
    window.addEventListener("stackwerkhaus:urlchange", updateUrlSelection);

    return () => {
      window.removeEventListener("popstate", updateUrlSelection);
      window.removeEventListener("stackwerkhaus:urlchange", updateUrlSelection);
    };
  }, [selectedPackage, selectedOffer]);

  useEffect(() => {
    const prefill = buildInitialProjectMessage(
      urlSelection.selectedPackage,
      urlSelection.selectedOffer,
      urlSelection.selectedTemplate,
    );
    if (prefill) {
      setMessage(prefill);
    }
  }, [
    urlSelection.selectedPackage,
    urlSelection.selectedOffer,
    urlSelection.selectedTemplate,
  ]);

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
          rows={4}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            if (showValidationHint) {
              setShowValidationHint(false);
            }
          }}
          className="mt-2 min-h-[7.5rem] w-full bg-transparent px-0 py-3 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic md:min-h-[14rem]"
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
            Ich habe die{" "}
            <Link href="/datenschutz" className="font-semibold text-foreground">
              Datenschutzhinweise
            </Link>{" "}
            gelesen. Meine Angaben werden zur Bearbeitung meiner Anfrage
            verarbeitet.
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
            Bitte Name, E-Mail und Nachricht ausfüllen und die
            Datenschutzhinweise bestätigen.
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

export function Contact({
  selectedPackage = null,
  selectedOffer = null,
}: Partial<ContactFormProps>) {
  const titleScope = useRef<HTMLDivElement | null>(null);

  useWordMaskHeadingReveal(titleScope, [], {
    start: "top 82%",
    trigger: "scroll",
  });

  return (
    <section className="section-space">
      <div className="section-shell grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] xl:gap-20">
        <div>
          <SectionHeader id="kontakt" label="Kontakt" marker="(SKWKHS® — 10)" />
          <div ref={titleScope} className="space-y-6">
            <h2 className="hero-line display-lg">
              {renderWordMaskText("Lass uns was einzigartiges bauen.")}
            </h2>
            <p className="max-w-4xl text-lg leading-8 text-muted">
              Wir klären gemeinsam, worum’s geht, was gerade bremst und was als Nächstes
              Priorität hat. Angebot schärfen, Zielgruppe sauber einordnen und Projektumfang
              realisieren damit der nächsten Schritt nicht aus dem Bauch heraus entscheiden wird.
            </p>
            <div className="space-y-3 text-sm text-muted">
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
              <TrackedHashLink
                href="/webseitecheck"
                eventName="website_check_cta_click"
                eventParams={{ placement: "contact_alt_cta" }}
                className="link-arrow mt-5 w-fit text-foreground"
              >
                <LinkRippleText text="Website Check starten" baseWeight={700} />
                <span aria-hidden>+</span>
              </TrackedHashLink>
            </div>
          </div>
        </div>
        <ContactForm
          selectedPackage={selectedPackage}
          selectedOffer={selectedOffer}
        />
      </div>
    </section>
  );
}
