import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import {
  createSanitizedDrupalTree,
  getExcerptFromText,
  getReadingTimeFromText,
  normalizeDrupalHtmlToText,
} from "../lib/drupal-rich-text.mjs";

function DrupalAnchor({ children, href, title }) {
  if (typeof href !== "string" || href.length === 0) {
    return children;
  }

  return jsx("a", { href, title, children });
}

function renderDrupalHtml(source) {
  const tree = createSanitizedDrupalTree(source);
  if (!tree) {
    return "";
  }
  const element = toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    components: {
      a: DrupalAnchor,
      hr: (props) => jsx("hr", { ...props, className: "border-border" }),
    },
  });

  return renderToStaticMarkup(element);
}

test("Drupal sanitizer preserves supported rich elements", () => {
  const html = [
    "<h2>Headline</h2>",
    '<p>Hello <strong>world</strong> <a href="https://example.com" title="Example">link</a></p>',
    "<ul><li>One</li><li>Two</li></ul>",
    "<blockquote>Quoted</blockquote>",
    "<pre><code>const x = 1;</code></pre>",
    "<hr>",
  ].join("");
  const rendered = renderDrupalHtml(html);

  assert.match(rendered, /<h2>Headline<\/h2>/);
  assert.match(rendered, /<strong>world<\/strong>/);
  assert.match(rendered, /<a href="https:\/\/example.com" title="Example">link<\/a>/);
  assert.match(rendered, /<ul><li>One<\/li><li>Two<\/li><\/ul>/);
  assert.match(rendered, /<blockquote>Quoted<\/blockquote>/);
  assert.match(rendered, /<pre><code>const x = 1;<\/code><\/pre>/);
  assert.match(rendered, /<hr class="border-border"\/>/);
});

test("Drupal sanitizer strips unsafe tags, attrs, and protocols", () => {
  const html = [
    '<p style="color:red" onclick="alert(1)">Safe text</p>',
    '<a href="javascript:alert(1)" target="_blank">Bad Link</a>',
    '<img src="https://example.com/test.png" alt="ignored">',
    "<script>alert('xss')</script>",
    "<table><tr><td>Table</td></tr></table>",
  ].join("");
  const rendered = renderDrupalHtml(html);

  assert.match(rendered, />Safe text</);
  assert.doesNotMatch(rendered, /style=/);
  assert.doesNotMatch(rendered, /onclick=/);
  assert.doesNotMatch(rendered, /javascript:/);
  assert.doesNotMatch(rendered, /target=/);
  assert.doesNotMatch(rendered, /<img/);
  assert.doesNotMatch(rendered, /<script/);
  assert.doesNotMatch(rendered, /<table/);
  assert.doesNotMatch(rendered, /<a[^>]*>Bad Link<\/a>/);
  assert.match(rendered, /Bad Link/);
});

test("Drupal text derivation stays plain text for metadata", () => {
  const body = "<h2>Headline</h2><p>Hello <strong>world</strong> and <em>team</em>.</p>";
  const summary = "<p>Short <a href=\"https://example.com\">summary</a>.</p>";

  const bodyText = normalizeDrupalHtmlToText(body);
  const summaryText = normalizeDrupalHtmlToText(summary);

  assert.equal(bodyText, "Headline\n\nHello world and team.");
  assert.equal(summaryText, "Short summary.");
  assert.equal(getExcerptFromText(summaryText, bodyText), "Short summary.");
  assert.equal(getReadingTimeFromText(bodyText), "1 min");
});

test("Drupal sanitizer decodes escaped CMS markup into rich content", () => {
  const html = [
    "<p>&lt;p&gt;<br>&nbsp;Ich nutze &lt;strong&gt;Micrography&lt;/strong&gt; nicht dekorativ.<br>&lt;/p&gt;</p>",
    "<p>&lt;h2&gt;Design als Positionierung&lt;/h2&gt;</p>",
  ].join("");
  const rendered = renderDrupalHtml(html);

  assert.match(
    rendered,
    /<p>\s*Ich nutze <strong>Micrography<\/strong> nicht dekorativ\.\s*<\/p>/,
  );
  assert.match(rendered, /<h2>Design als Positionierung<\/h2>/);
  assert.doesNotMatch(rendered, /&lt;(?:p|h2|strong)&gt;/);
  assert.equal(
    normalizeDrupalHtmlToText(html),
    "Ich nutze Micrography nicht dekorativ.\n\nDesign als Positionierung",
  );
});
