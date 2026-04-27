"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { currentStateOptions, goalOptions } from "@/lib/baustellencheck.mjs";
import { siteConfig } from "@/lib/site-config";
import type { BaustellencheckStep } from "@/components/baustellencheck/form-state";
import {
  canVisitStep as canVisitFormStep,
  getFirstIncompleteStep as getFirstIncompleteFormStep,
  isFormReady as isBaustellencheckFormReady,
  isStepReady,
  readBaustellencheckResponse,
  stepLabels,
} from "@/components/baustellencheck/form-state";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

type Status = {
  type: "idle" | "success" | "error";
  message: string;
};

const initialStatus: Status = { type: "idle", message: "" };

function StepKicker({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-muted">
      <span>
        {String(stepIndex + 1).padStart(2, "0")} / {stepLabels.length}
      </span>
      <span className="h-px flex-1 bg-border" aria-hidden="true" />
      <span>{stepLabels[stepIndex]}</span>
    </div>
  );
}

function FieldError({
  visible,
  children,
}: {
  visible: boolean;
  children: string;
}) {
  if (!visible) {
    return null;
  }

  return <p className="mt-4 text-sm leading-6 text-muted">{children}</p>;
}

export function BaustellencheckForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const [stepIndex, setStepIndex] = useState<BaustellencheckStep>(0);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [currentState, setCurrentState] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  const formState = {
    websiteUrl,
    currentState,
    goals,
    name,
    email,
    termsAccepted,
  };
  const formReady = isBaustellencheckFormReady(formState);
  const submitButtonText = isSubmitting
    ? "Wird eingetragen ..."
    : status.type !== "idle"
      ? status.message
      : "Webseitecheck anfragen";
  const showSubmitResponseText = isSubmitting || status.type !== "idle";

  function resetValidationHint() {
    if (showValidationHint) {
      setShowValidationHint(false);
    }
    if (status.type !== "idle") {
      setStatus(initialStatus);
    }
  }

  function isCurrentStepReady() {
    return isStepReady(formState, stepIndex);
  }

  function getFirstIncompleteStep() {
    return getFirstIncompleteFormStep(formState);
  }

  function canVisitStep(targetStep: BaustellencheckStep) {
    return canVisitFormStep(formState, stepIndex, targetStep);
  }

  function goToStep(nextStep: BaustellencheckStep) {
    if (!canVisitStep(nextStep)) {
      setShowValidationHint(true);
      return;
    }

    setStepIndex(nextStep);
    setShowValidationHint(false);
    setStatus(initialStatus);
  }

  function continueToNextStep() {
    if (!isCurrentStepReady()) {
      setShowValidationHint(true);
      return;
    }

    goToStep(
      Math.min(stepIndex + 1, stepLabels.length - 1) as BaustellencheckStep,
    );
  }

  function chooseCurrentState(value: string) {
    setCurrentState(value);
    setShowValidationHint(false);
    setStatus(initialStatus);
    setStepIndex(2);
  }

  function toggleGoal(goal: string) {
    setGoals((currentGoals) =>
      currentGoals.includes(goal)
        ? currentGoals.filter((entry) => entry !== goal)
        : [...currentGoals, goal],
    );
    resetValidationHint();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!formReady || !form.reportValidity()) {
      setStepIndex(getFirstIncompleteStep());
      setShowValidationHint(true);
      return;
    }

    setIsSubmitting(true);
    setStatus(initialStatus);
    setShowValidationHint(false);

    const formData = new FormData(form);
    const payload = {
      name,
      email,
      websiteUrl,
      currentState,
      goals,
      company,
      message,
      terms: termsAccepted ? "on" : "",
      newsletterOptIn: newsletterOptIn ? "on" : "",
      website: String(formData.get("website") ?? ""),
      submitted_at: new Date().toISOString(),
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? "",
      origin: `${siteConfig.name} Webseitecheck`,
    };

    try {
      const response = await fetch("/api/baustellencheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await readBaustellencheckResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Der Webseitecheck konnte nicht gesendet werden.",
        );
      }

      setIsSubmitting(false);
      setStatus({
        type: "success",
        message: result.message || "Deine Anfrage ist eingetragen.",
      });
      await new Promise((resolve) => setTimeout(resolve, 720));
      router.push("/webseitecheck/danke");
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Der Webseitecheck konnte nicht gesendet werden.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="border-t border-border">
      <div className="grid gap-8 py-7 lg:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] lg:py-9">
        <aside className="space-y-7">
          <div>
            <div className="eyebrow text-foreground/75">Abfrage</div>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] md:text-5xl">
              Einmal kurz durch klicken.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted md:text-base md:leading-7">
              Erst Selbstcheck, dann schauen wir gezielt auf Fundament,
              Grundriss, Fassade und Kontaktwege.
            </p>
          </div>

          <div className="grid gap-3 text-xs leading-5 text-muted sm:grid-cols-2 lg:grid-cols-1">
            <div className="border-t border-border pt-3">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-foreground/75">
                01 Selbstcheck
              </span>
              <span className="mt-2 block">
                Vier kurze Schritte. Keine Scanner-Show, kein Formularfriedhof.
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <span className="block text-[10px] uppercase tracking-[0.3em] text-foreground/75">
                02 Befund
              </span>
              <span className="mt-2 block">
                Danach kommt eine konkrete Einschätzung statt generischer
                Prozentzahl.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {stepLabels.map((label, index) => (
              <button
                key={label}
                type="button"
                onClick={() => goToStep(index as BaustellencheckStep)}
                disabled={!canVisitStep(index as BaustellencheckStep)}
                className={`border px-3 py-2 text-[10px] uppercase tracking-[0.24em] transition ${
                  stepIndex === index
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground hover:text-foreground disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-border disabled:hover:text-muted"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        <div className="min-h-[32rem] border-t border-border pt-7 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {stepIndex === 0 ? (
            <section className="space-y-8">
              <StepKicker stepIndex={stepIndex} />
              <div>
                <label
                  htmlFor="websiteUrl"
                  className="text-3xl font-black tracking-[-0.04em] md:text-5xl"
                >
                  Welche Website schauen wir uns an?
                </label>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                  Gib nur die URL ein. Den Rest prüfen wir später manuell, nicht
                  per wildem Score-Automaten.
                </p>
                <input
                  id="websiteUrl"
                  name="websiteUrl"
                  required
                  inputMode="url"
                  autoComplete="url"
                  value={websiteUrl}
                  onChange={(event) => {
                    setWebsiteUrl(event.target.value);
                    resetValidationHint();
                  }}
                  className="mt-8 w-full rounded-none border-b border-border bg-transparent px-0 py-5 text-2xl font-black tracking-[-0.04em] outline-none transition focus:border-foreground placeholder:text-white/28 placeholder:italic md:text-5xl"
                  placeholder="deine-website.de"
                />
                <FieldError visible={showValidationHint}>
                  Bitte gib zuerst eine Website URL ein.
                </FieldError>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={continueToNextStep}
                  className="link-arrow w-full justify-between border border-foreground px-5 py-4 text-foreground sm:w-fit sm:min-w-[14rem]"
                >
                  <LinkRippleText text="Weiter" baseWeight={720} />
                  <span aria-hidden>+</span>
                </button>
              </div>
            </section>
          ) : null}

          {stepIndex === 1 ? (
            <section className="space-y-8">
              <StepKicker stepIndex={stepIndex} />
              <fieldset className="space-y-5">
                <legend className="text-3xl font-black tracking-[-0.04em] md:text-5xl">
                  Was beschreibt den Zustand am besten?
                </legend>
                <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                  Ein Klick reicht. Das ist noch keine Diagnose, nur der erste
                  Blick auf die Baustelle.
                </p>
                <div className="grid gap-3 md:grid-cols-2">
                  {currentStateOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex min-h-18 cursor-pointer items-start gap-3 border px-4 py-4 text-sm leading-6 transition ${
                        currentState === option.value
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-transparent text-muted hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      <input
                        type="radio"
                        name="currentState"
                        required
                        value={option.value}
                        checked={currentState === option.value}
                        onChange={(event) => chooseCurrentState(event.target.value)}
                        className="mt-1 h-4 w-4 shrink-0 accent-foreground"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <FieldError visible={showValidationHint}>
                  Bitte wähle einen aktuellen Zustand aus.
                </FieldError>
              </fieldset>
              <div className="flex justify-start">
                <button
                  type="button"
                  onClick={() => goToStep(0)}
                  className="link-arrow py-3 pr-5 text-muted hover:text-foreground"
                >
                  <span aria-hidden>←</span>
                  <LinkRippleText text="Zurück" baseWeight={560} />
                </button>
              </div>
            </section>
          ) : null}

          {stepIndex === 2 ? (
            <section className="space-y-8">
              <StepKicker stepIndex={stepIndex} />
              <fieldset className="space-y-5">
                <legend className="text-3xl font-black tracking-[-0.04em] md:text-5xl">
                  Was soll die Website besser können?
                </legend>
                <p className="max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                  Mehrfachauswahl ist okay. Wenn alles knirscht, darf auch
                  „Alles davon“ rein.
                </p>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {goalOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex min-h-16 cursor-pointer items-start gap-3 border px-4 py-4 text-sm leading-6 transition ${
                        goals.includes(option.value)
                          ? "border-foreground bg-foreground text-background"
                          : "border-border bg-transparent text-muted hover:border-foreground hover:text-foreground"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="goals"
                        value={option.value}
                        checked={goals.includes(option.value)}
                        onChange={() => toggleGoal(option.value)}
                        className="mt-1 h-4 w-4 shrink-0 accent-foreground"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
                <FieldError visible={showValidationHint}>
                  Bitte wähle mindestens ein Ziel aus.
                </FieldError>
              </fieldset>
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="link-arrow py-3 pr-5 text-muted hover:text-foreground"
                >
                  <span aria-hidden>←</span>
                  <LinkRippleText text="Zurück" baseWeight={560} />
                </button>
                <button
                  type="button"
                  onClick={continueToNextStep}
                  className="link-arrow w-full justify-between border border-foreground px-5 py-4 text-foreground sm:w-fit sm:min-w-[14rem]"
                >
                  <LinkRippleText text="Weiter" baseWeight={720} />
                  <span aria-hidden>+</span>
                </button>
              </div>
            </section>
          ) : null}

          {stepIndex === 3 ? (
            <section className="space-y-8">
              <StepKicker stepIndex={stepIndex} />
              <div>
                <h3 className="text-3xl font-black tracking-[-0.04em] md:text-5xl">
                  Wohin geht der Befund?
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted md:text-lg md:leading-8">
                  Du bekommst eine kurze Einschätzung mit Bauzustand, Stärken,
                  Baustellen und einem sinnvollen nächsten Schritt.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="eyebrow text-foreground">
                    <b>Name</b>
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    minLength={2}
                    autoComplete="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      resetValidationHint();
                    }}
                    className="mt-3 w-full rounded-none border-b border-border bg-transparent px-0 py-4 text-lg outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
                    placeholder="Wie heißt du?"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="eyebrow text-foreground">
                    <b>E-Mail</b>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      resetValidationHint();
                    }}
                    className="mt-3 w-full rounded-none border-b border-border bg-transparent px-0 py-4 text-lg outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
                    placeholder="beispiel@unternehmen.de"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="company" className="eyebrow text-foreground">
                    <b>Unternehmen</b>{" "}
                    <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    className="mt-3 w-full rounded-none border-b border-border bg-transparent px-0 py-4 text-lg outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
                    placeholder="Falls relevant"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow text-foreground">
                    <b>Kurze Nachricht</b>{" "}
                    <span className="text-muted">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    className="mt-3 min-h-[7rem] w-full rounded-none border-b border-border bg-transparent px-0 py-4 outline-none transition focus:border-foreground placeholder:text-white/35 placeholder:italic"
                    placeholder="Was nervt dich aktuell am meisten?"
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

              <div className="space-y-5 border-t border-border pt-6">
                <label className="flex items-start gap-3 text-sm leading-6 text-muted">
                  <input
                    type="checkbox"
                    name="terms"
                    checked={termsAccepted}
                    onChange={(event) => {
                      setTermsAccepted(event.target.checked);
                      resetValidationHint();
                    }}
                    className="mt-1 h-4 w-4 shrink-0 accent-foreground"
                    required
                  />
                  <span>
                    Ich habe die{" "}
                    <Link
                      href="/datenschutz"
                      className="font-semibold text-foreground"
                    >
                      Datenschutzhinweise
                    </Link>{" "}
                    gelesen. Meine Angaben werden zur Bearbeitung des
                    Webseitechecks verarbeitet.
                  </span>
                </label>
                <label className="flex items-start gap-3 text-sm leading-6 text-muted">
                  <input
                    type="checkbox"
                    name="newsletterOptIn"
                    checked={newsletterOptIn}
                    onChange={(event) =>
                      setNewsletterOptIn(event.target.checked)
                    }
                    className="mt-1 h-4 w-4 shrink-0 accent-foreground"
                  />
                  <span>
                    Ich möchte gelegentlich Tipps zu Webdesign, Development und
                    digitalen Bauwerken erhalten.
                  </span>
                </label>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="link-arrow py-3 pr-5 text-muted hover:text-foreground"
                >
                  <span aria-hidden>←</span>
                  <LinkRippleText text="Zurück" baseWeight={560} />
                </button>
                <div className="flex flex-col items-start gap-4 sm:items-end">
                  <button
                    type="submit"
                    disabled={isSubmitting || status.type === "success"}
                    className="link-arrow min-h-[3.65rem] w-full justify-between border border-foreground bg-foreground px-5 py-4 text-background disabled:cursor-not-allowed disabled:border-border disabled:bg-transparent disabled:text-muted disabled:opacity-45 sm:w-fit sm:min-w-[22rem] sm:max-w-[31rem]"
                  >
                    {showSubmitResponseText ? (
                      <span
                        key={submitButtonText}
                        aria-live="polite"
                        className={`animate-[fade_180ms_cubic-bezier(0.22,1,0.36,1)_both] text-left ${
                          status.type === "idle"
                            ? "uppercase tracking-[0.24em]"
                            : "normal-case tracking-normal"
                        }`}
                      >
                        {submitButtonText}
                      </span>
                    ) : (
                      <>
                        <LinkRippleText
                          text={submitButtonText}
                          baseWeight={760}
                        />
                        <span aria-hidden>+</span>
                      </>
                    )}
                  </button>
                  <FieldError visible={showValidationHint}>
                    Bitte Name, E-Mail und Datenschutzhinweise ausfüllen.
                  </FieldError>
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </form>
  );
}
