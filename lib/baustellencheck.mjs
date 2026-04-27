export const currentStateOptions = [
  {
    value: "new-low-leads",
    label: "Sie ist neu, aber bringt wenig Anfragen",
  },
  {
    value: "old-needs-renovation",
    label: "Sie ist alt und müsste saniert werden",
  },
  {
    value: "looks-ok-feels-off",
    label: "Sie sieht okay aus, aber fühlt sich nicht richtig an",
  },
  {
    value: "rough-build",
    label: "Sie ist eher Rohbau",
  },
  {
    value: "unknown",
    label: "Ich weiß es nicht, genau deshalb bin ich hier",
  },
];

export const goalOptions = [
  {
    value: "more-inquiries",
    label: "Mehr Anfragen",
  },
  {
    value: "professional",
    label: "Professioneller wirken",
  },
  {
    value: "search-visibility",
    label: "Besser gefunden werden",
  },
  {
    value: "clear-offers",
    label: "Angebote klarer erklären",
  },
  {
    value: "technical-cleanup",
    label: "Technisch sauberer werden",
  },
  {
    value: "all",
    label: "Alles davon",
  },
];

export const inspectionFields = [
  {
    title: "Fundament",
    text: "Steht die Website stabil oder wackelt schon der Keller?",
    checks: [
      "Lädt die Seite schnell genug?",
      "Funktioniert sie mobil sauber?",
      "Gibt es technische Stolperstellen?",
      "Ist die Grundstruktur klar?",
    ],
  },
  {
    title: "Grundriss",
    text: "Findet man den Weg oder braucht man einen Lageplan?",
    checks: [
      "Ist sofort klar, was angeboten wird?",
      "Kommt man schnell zu Leistungen, Preisen oder Kontakt?",
      "Ist die Navigation logisch?",
      "Hat jede Seite eine klare Aufgabe?",
    ],
  },
  {
    title: "Fassade",
    text: "Sieht es nach Baukunst aus oder nach schnell gestrichener Außenwand?",
    checks: [
      "Wirkt die Website professionell?",
      "Passt das Design zur Zielgruppe?",
      "Gibt es Wiedererkennung?",
      "Ist der Auftritt hochwertig genug für die Preise?",
    ],
  },
  {
    title: "Statik",
    text: "Trägt die Seite das Geschäftsmodell oder sieht sie nur nett aus?",
    checks: [
      "Gibt es klare Nutzenargumente?",
      "Sind Leistungen verständlich?",
      "Gibt es Vertrauen durch Referenzen oder Beispiele?",
      "Führt die Seite zu einer konkreten Handlung?",
    ],
  },
  {
    title: "Eingang",
    text: "Kommt man rein oder steht man vor verschlossener Tür?",
    checks: [
      "Ist der Kontaktweg klar sichtbar?",
      "Gibt es einen guten primären Button?",
      "Ist das Formular einfach genug?",
      "Wirkt die Anfrage sicher und seriös?",
    ],
  },
  {
    title: "Heizungskeller",
    text: "Was passiert hinter der Fassade?",
    checks: [
      "Ist die Seite wartbar?",
      "Gibt es saubere technische Systeme?",
      "Sind CMS, Formulare oder Integrationen sinnvoll gelöst?",
      "Gibt es unnötige technische Altlasten?",
    ],
  },
  {
    title: "Bauabnahme",
    text: "Abriss, Ausbau oder Richtfest?",
    checks: [
      "Was ist gut?",
      "Was bremst aktuell?",
      "Was sollte als Erstes verbessert werden?",
      "Welches Stackwerkhaus Angebot passt dazu?",
    ],
  },
];

export const buildingResults = [
  {
    title: "Penthouse mit kleinen Rissen",
    meaning: "Die Website ist grundsätzlich gut, braucht aber Feinschliff.",
    text: "Dein Auftritt steht schon ziemlich weit oben. Ein paar Details in Struktur, Performance oder Conversion könnten ihn noch tragfähiger machen.",
    recommendations: [
      "Kleiner Audit",
      "Conversion Feinschliff",
      "Landingpage Optimierung",
    ],
  },
  {
    title: "Solides Stadthaus",
    meaning: "Gute Basis, aber noch nicht wirklich stark.",
    text: "Das Fundament steht, aber der Grundriss könnte klarer sein. Mit besserer Nutzerführung, stärkeren Texten und saubereren Kontaktwegen lässt sich hier viel holen.",
    recommendations: [
      "Website Optimierung",
      "Relaunch Light",
      "Neue Leistungsseiten",
    ],
  },
  {
    title: "Plattenbau mit Potenzial",
    meaning: "Funktioniert irgendwie, wirkt aber generisch oder veraltet.",
    text: "Die Website erfüllt ihren Zweck, aber sie verkauft deine Qualität nicht richtig. Sie steht da, aber sie erzählt zu wenig darüber, warum jemand dich wählen sollte.",
    recommendations: [
      "Relaunch",
      "Neue Startseite",
      "Neue Angebotsstruktur",
    ],
  },
  {
    title: "Digitaler Rohbau",
    meaning: "Es fehlt an Klarheit, Struktur, Wirkung oder Technik.",
    text: "Hier ist noch viel Baustelle. Nicht schlimm, aber sichtbar. Die Seite braucht einen klaren Bauplan, bessere Struktur und eine technische Basis, die zum Unternehmen passt.",
    recommendations: [
      "Kompletter Relaunch",
      "Starter Website",
      "Business Website",
    ],
  },
];

const MAX_TEXT_LENGTH = 2200;
const MAX_SHORT_TEXT_LENGTH = 160;

function cleanText(value, maxLength = MAX_TEXT_LENGTH) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function getOptionLabel(options, value) {
  return options.find((option) => option.value === value)?.label ?? "";
}

function getArrayValue(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim().length > 0) {
    return [value];
  }

  return [];
}

export function normalizeWebsiteUrl(value) {
  const rawValue = cleanText(value, 300);
  if (!rawValue) {
    return "";
  }

  if (/^[a-z][a-z\d+\-.]*:/i.test(rawValue) && !/^[a-z][a-z\d+\-.]*:\/\//i.test(rawValue)) {
    return "";
  }

  const valueWithProtocol = /^[a-z][a-z\d+\-.]*:\/\//i.test(rawValue)
    ? rawValue
    : `https://${rawValue}`;

  try {
    const url = new URL(valueWithProtocol);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }

    const hostname = url.hostname.toLowerCase();
    if (!hostname || (!hostname.includes(".") && hostname !== "localhost")) {
      return "";
    }

    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return "";
  }
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanText(value, 320));
}

export function isTermsAccepted(value) {
  if (value === true) {
    return true;
  }

  const normalized = String(value ?? "").toLowerCase().trim();
  return ["on", "true", "1", "yes"].includes(normalized);
}

export function validateBaustellencheckPayload(payload) {
  const errors = {};
  const name = cleanText(payload?.name, MAX_SHORT_TEXT_LENGTH);
  const email = cleanText(payload?.email, 320);
  const websiteUrl = normalizeWebsiteUrl(payload?.websiteUrl);
  const currentState = cleanText(payload?.currentState, MAX_SHORT_TEXT_LENGTH);
  const currentStateLabel = getOptionLabel(currentStateOptions, currentState);
  const goals = getArrayValue(payload?.goals)
    .map((goal) => cleanText(goal, MAX_SHORT_TEXT_LENGTH))
    .filter((goal) => getOptionLabel(goalOptions, goal));
  const uniqueGoals = Array.from(new Set(goals));
  const goalLabels = uniqueGoals.map((goal) => getOptionLabel(goalOptions, goal));
  const company = cleanText(payload?.company, MAX_SHORT_TEXT_LENGTH);
  const message = cleanText(payload?.message);
  const newsletterOptIn =
    payload?.newsletterOptIn === true ||
    String(payload?.newsletterOptIn ?? "").toLowerCase().trim() === "true" ||
    String(payload?.newsletterOptIn ?? "").toLowerCase().trim() === "on";
  const honeypot = cleanText(payload?.website, MAX_SHORT_TEXT_LENGTH);

  if (name.length < 2) {
    errors.name = "Bitte gib einen gültigen Namen ein.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }

  if (!websiteUrl) {
    errors.websiteUrl = "Bitte gib eine gültige Website URL ein.";
  }

  if (!currentStateLabel) {
    errors.currentState = "Bitte wähle den aktuellen Website-Zustand aus.";
  }

  if (uniqueGoals.length === 0) {
    errors.goals = "Bitte wähle mindestens ein Ziel aus.";
  }

  if (!isTermsAccepted(payload?.terms)) {
    errors.terms =
      "Bitte bestätige die Verarbeitung deiner Angaben für den Webseitecheck.";
  }

  if (honeypot.length > 0) {
    errors.website = "Die Anfrage konnte nicht verarbeitet werden.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    data: {
      name,
      email,
      websiteUrl,
      currentState,
      currentStateLabel,
      goals: uniqueGoals,
      goalLabels,
      company,
      message,
      terms: true,
      newsletterOptIn,
    },
  };
}

export function buildBaustellencheckSummary(data) {
  const lines = [
    "Stackwerkhaus Webseitecheck",
    `Website: ${data.websiteUrl}`,
    `Zustand: ${data.currentStateLabel}`,
    `Ziel: ${data.goalLabels.join(", ")}`,
    `Name: ${data.name}`,
    `E-Mail: ${data.email}`,
    `Unternehmen: ${data.company || "Nicht angegeben"}`,
    `Newsletter: ${data.newsletterOptIn ? "Ja" : "Nein"}`,
  ];

  if (data.message) {
    lines.push("", "Kurznotiz:", data.message);
  }

  return lines.join("\n");
}

export function buildForwardedBaustellencheckPayload(data, payload = {}, request) {
  const summary = buildBaustellencheckSummary(data);

  return {
    lead_type: "baustellencheck",
    name: data.name,
    email: data.email,
    website_url: data.websiteUrl,
    current_state: data.currentState,
    current_state_label: data.currentStateLabel,
    goals: data.goals,
    goal_labels: data.goalLabels,
    company: data.company,
    message: summary,
    visitor_message: data.message,
    newsletter_opt_in: data.newsletterOptIn,
    terms: true,
    website: "",
    summary,
    submitted_at:
      cleanText(payload.submitted_at, MAX_SHORT_TEXT_LENGTH) ||
      new Date().toISOString(),
    origin: cleanText(payload.origin, MAX_SHORT_TEXT_LENGTH) ||
      "STACKWERKHAUS Webseitecheck",
    page_url: cleanText(payload.page_url, 500),
    page_title: cleanText(payload.page_title, MAX_SHORT_TEXT_LENGTH),
    referrer: cleanText(payload.referrer, 500),
    user_agent:
      cleanText(payload.user_agent, 500) ||
      request?.headers?.get?.("user-agent") ||
      "",
    language:
      cleanText(payload.language, MAX_SHORT_TEXT_LENGTH) ||
      request?.headers?.get?.("accept-language") ||
      "",
    timezone: cleanText(payload.timezone, MAX_SHORT_TEXT_LENGTH),
  };
}
