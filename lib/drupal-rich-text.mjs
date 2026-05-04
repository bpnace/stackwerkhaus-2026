import rehypeParse from "rehype-parse";
import { defaultSchema } from "rehype-sanitize";
import rehypeSanitize from "rehype-sanitize";
import { unified } from "unified";

export const DRUPAL_ALLOWED_TAGS = [
  "p",
  "br",
  "h2",
  "h3",
  "ul",
  "ol",
  "li",
  "blockquote",
  "strong",
  "em",
  "code",
  "pre",
  "a",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "hr",
];

export const DRUPAL_ALLOWED_PROTOCOLS = ["http", "https", "mailto"];

export const drupalSanitizeSchema = {
  ...defaultSchema,
  tagNames: DRUPAL_ALLOWED_TAGS,
  attributes: {
    a: ["href", "title"],
    code: [],
    pre: [],
    table: [],
    thead: [],
    tbody: [],
    tfoot: [],
    tr: [],
    th: ["scope", "colspan", "rowspan"],
    td: ["colspan", "rowspan"],
    caption: [],
  },
  protocols: {
    href: DRUPAL_ALLOWED_PROTOCOLS,
  },
};

const drupalHtmlProcessor = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize, drupalSanitizeSchema);

const ENCODED_DRUPAL_TAG_PATTERN =
  /&lt;\/?(?:p|h[1-6]|ul|ol|li|blockquote|strong|em|code|pre|a|table|thead|tbody|tfoot|tr|th|td|caption|hr|section)\b/i;

const HTML_ENTITY_MAP = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function decodeHtmlEntities(value) {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity) => {
    const normalizedEntity = entity.toLowerCase();

    if (normalizedEntity in HTML_ENTITY_MAP) {
      return HTML_ENTITY_MAP[normalizedEntity];
    }

    if (normalizedEntity.startsWith("#x")) {
      const codePoint = Number.parseInt(normalizedEntity.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    if (normalizedEntity.startsWith("#")) {
      const codePoint = Number.parseInt(normalizedEntity.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : match;
    }

    return match;
  });
}

export function prepareDrupalHtmlSource(source) {
  if (!source) {
    return "";
  }

  if (!ENCODED_DRUPAL_TAG_PATTERN.test(source)) {
    return source;
  }

  return decodeHtmlEntities(
    source
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>\s*<p>/gi, "\n\n")
      .replace(/<\/?(?:p|div|article|section)>/gi, "")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\u00a0/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function createSanitizedDrupalTree(source) {
  const preparedSource = prepareDrupalHtmlSource(source);

  if (!preparedSource.trim()) {
    return null;
  }

  return drupalHtmlProcessor.runSync(
    drupalHtmlProcessor.parse(preparedSource),
  );
}

export function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function normalizeDrupalHtmlToText(value) {
  if (!value) {
    return "";
  }

  return prepareDrupalHtmlSource(value)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|h[1-6]|blockquote|pre|article|section|tr|table)>/gi, "\n\n")
    .replace(/<\/(th|td)>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\r/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/[^\S\r\n]{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function getDrupalPlainTextParagraphs(value) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function getReadingTimeFromText(value) {
  const words = value.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 220))} min`;
}

export function getExcerptFromText(summary, body) {
  const source = summary || body;
  if (source.length <= 180) {
    return source;
  }

  return `${source.slice(0, 177).trimEnd()}...`;
}
