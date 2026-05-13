import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
  terms?: boolean | string | number | null;
  website?: string;
  submitted_at?: string;
  origin?: string;
  page_url?: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  language?: string;
  timezone?: string;
};

type WebhookResult = {
  status?: string;
  code?: string;
  message?: string;
  reason?: string;
  httpStatus?: number;
};

function isValidEmail(value: string) {
  if (value.length > 254 || value !== value.trim()) {
    return false;
  }

  const atIndex = value.indexOf("@");
  if (atIndex <= 0 || atIndex !== value.lastIndexOf("@")) {
    return false;
  }

  const localPart = value.slice(0, atIndex);
  const domain = value.slice(atIndex + 1);
  if (!localPart || !domain || domain.startsWith(".") || domain.endsWith(".")) {
    return false;
  }

  const domainLabels = domain.split(".");
  return (
    domainLabels.length >= 2 &&
    !domainLabels.some((label) => label.length === 0) &&
    !Array.from(value).some((character) => character.trim().length === 0)
  );
}

function isTermsAccepted(value: ContactPayload["terms"]) {
  if (value === true) {
    return true;
  }

  const normalized = String(value ?? "").toLowerCase().trim();
  return ["on", "true", "1", "yes"].includes(normalized);
}

function getWebhookMessage(result: WebhookResult | null) {
  const message = String(result?.message ?? "").trim();
  if (message) {
    return message;
  }

  const reason = String(result?.reason ?? "").trim();
  if (reason) {
    return reason;
  }

  return null;
}

function getDefaultWebhookMessage(status: number) {
  switch (status) {
    case 200:
      return "Danke. Die Anfrage wurde gesendet und wir melden uns zeitnah.";
    case 400:
      return "Bitte prüfe deine Eingaben und versuche es erneut.";
    case 403:
      return "Die Anfrage wurde aus Sicherheitsgründen blockiert.";
    case 429:
      return "Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten erneut.";
    default:
      return "Die Anfrage konnte gerade nicht weitergeleitet werden. Bitte versuche es erneut.";
  }
}

function resolveContactWebhookUrl() {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(webhookUrl);
    return parsedUrl.protocol === "https:" ? parsedUrl.toString() : null;
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactPayload;

  const name = String(payload.name ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const website = String(payload.website ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json(
      { message: "Bitte gib einen gültigen Namen ein." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { message: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 },
    );
  }

  if (message.length < 12) {
    return NextResponse.json(
      {
        message:
          "Beschreibe deine Nachricht bitte etwas genauer, damit wir sinnvoll antworten können.",
      },
      { status: 400 },
    );
  }

  if (website.length > 0) {
    return NextResponse.json(
      { message: "Die Anfrage konnte nicht verarbeitet werden." },
      { status: 403 },
    );
  }

  if (!isTermsAccepted(payload.terms)) {
    return NextResponse.json(
      {
        message:
          "Bitte bestätige die Verarbeitung deiner Angaben, bevor du die Nachricht sendest.",
      },
      { status: 400 },
    );
  }

  const forwardedPayload = {
    name,
    email,
    message,
    terms: true,
    website,
    submitted_at:
      payload.submitted_at && String(payload.submitted_at).trim().length > 0
        ? String(payload.submitted_at)
        : new Date().toISOString(),
    origin: String(payload.origin ?? "STACKWERKHAUS").trim() || "STACKWERKHAUS",
    page_url: String(payload.page_url ?? "").trim(),
    page_title: String(payload.page_title ?? "").trim(),
    referrer: String(payload.referrer ?? "").trim(),
    user_agent:
      String(payload.user_agent ?? "").trim() ||
      request.headers.get("user-agent") ||
      "",
    language:
      String(payload.language ?? "").trim() ||
      request.headers.get("accept-language") ||
      "",
    timezone: String(payload.timezone ?? "").trim(),
  };

  const webhookUsername = process.env.CONTACT_WEBHOOK_USERNAME?.trim();
  const webhookPassword = process.env.CONTACT_WEBHOOK_PASSWORD?.trim();
  const webhookUrl = resolveContactWebhookUrl();

  if (!webhookUrl || !webhookUsername || !webhookPassword) {
    return NextResponse.json(
      {
        message:
          "Die Anfrage konnte gerade nicht weitergeleitet werden. Die Webhook-Konfiguration ist nicht vollständig.",
      },
      { status: 500 },
    );
  }

  const webhookResponse = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${webhookUsername}:${webhookPassword}`,
      ).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(forwardedPayload),
    cache: "no-store",
  });

  let upstreamPayload: WebhookResult | null = null;
  try {
    upstreamPayload = (await webhookResponse.json()) as WebhookResult;
  } catch {
    upstreamPayload = null;
  }

  const upstreamStatus =
    typeof upstreamPayload?.httpStatus === "number"
      ? upstreamPayload.httpStatus
      : webhookResponse.status;
  const upstreamMessage = getWebhookMessage(upstreamPayload);

  if (!webhookResponse.ok) {
    return NextResponse.json(
      {
        message: getDefaultWebhookMessage(upstreamStatus),
      },
      { status: upstreamStatus >= 400 ? upstreamStatus : 502 },
    );
  }

  return NextResponse.json({
    message:
      upstreamMessage ||
      getDefaultWebhookMessage(upstreamStatus),
  });
}
