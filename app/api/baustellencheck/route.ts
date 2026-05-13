import { NextResponse } from "next/server";
import {
  buildForwardedBaustellencheckPayload,
  validateBaustellencheckPayload,
} from "@/lib/baustellencheck.mjs";

type BaustellencheckPayload = {
  name?: string;
  email?: string;
  websiteUrl?: string;
  currentState?: string;
  goals?: string[] | string;
  company?: string;
  message?: string;
  terms?: boolean | string | number | null;
  newsletterOptIn?: boolean | string | number | null;
  source?: string;
  privacy_accepted_at?: string;
  newsletter_opt_in_at?: string;
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

function getDefaultWebhookMessage(status: number) {
  switch (status) {
    case 400:
      return "Bitte prüfe deine Eingaben und versuche es erneut.";
    case 403:
      return "Die Anfrage wurde aus Sicherheitsgründen blockiert.";
    case 429:
      return "Zu viele Anfragen in kurzer Zeit. Bitte versuche es in ein paar Minuten erneut.";
    default:
      return "Der Baustellencheck konnte gerade nicht weitergeleitet werden. Bitte versuche es erneut.";
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
  let payload: BaustellencheckPayload;

  try {
    payload = (await request.json()) as BaustellencheckPayload;
  } catch {
    return NextResponse.json(
      { message: "Bitte sende gültige Formulardaten." },
      { status: 400 },
    );
  }

  const validation = validateBaustellencheckPayload(payload);

  if (!validation.ok) {
    const firstError = Object.values(validation.errors)[0];
    return NextResponse.json(
      {
        message:
          typeof firstError === "string"
            ? firstError
            : "Bitte prüfe deine Eingaben und versuche es erneut.",
        errors: validation.errors,
      },
      { status: validation.errors.website ? 403 : 400 },
    );
  }

  const webhookUsername = process.env.CONTACT_WEBHOOK_USERNAME?.trim();
  const webhookPassword = process.env.CONTACT_WEBHOOK_PASSWORD?.trim();
  const webhookUrl = resolveContactWebhookUrl();

  if (!webhookUrl || !webhookUsername || !webhookPassword) {
    return NextResponse.json(
      {
        message:
          "Der Baustellencheck konnte gerade nicht weitergeleitet werden. Die Webhook-Konfiguration ist nicht vollständig.",
      },
      { status: 500 },
    );
  }

  let webhookResponse: Response;

  try {
    webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${webhookUsername}:${webhookPassword}`,
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        buildForwardedBaustellencheckPayload(
          validation.data,
          payload,
          request,
        ),
      ),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json(
      {
        message: getDefaultWebhookMessage(502),
      },
      { status: 502 },
    );
  }

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

  if (!webhookResponse.ok) {
    return NextResponse.json(
      {
        message: getDefaultWebhookMessage(upstreamStatus),
      },
      { status: upstreamStatus >= 400 ? upstreamStatus : 502 },
    );
  }

  return NextResponse.json({
    message: "Dein Baustellencheck ist eingetragen.",
  });
}
