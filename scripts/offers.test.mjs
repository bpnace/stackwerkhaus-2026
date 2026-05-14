import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";

const root = process.cwd();

async function readFile(relativePath) {
  return fs.readFile(new URL(relativePath, `file://${root}/`), "utf8");
}

function hasMatch(source, text) {
  return source.includes(text);
}

test("offer configuration contains phase-1 canonical IDs and billing types", async () => {
  const offersSource = await readFile("lib/offers.ts");
  assert.ok(hasMatch(offersSource, 'id: "care"'), "care offer missing");
  assert.ok(hasMatch(offersSource, 'id: "growth"'), "growth offer missing");
  assert.ok(hasMatch(offersSource, 'id: "website-abo"'), "website-abo offer missing");
  assert.ok(hasMatch(offersSource, 'billingType: "recurring"'), "recurring billing type missing");
  assert.ok(
    hasMatch(offersSource, "export const recurringOffers"),
    "recurringOffers alias missing",
  );
});

test("payment link env placeholders are present in env example", async () => {
  const envExample = await readFile(".env.example");
  assert.ok(
    hasMatch(envExample, "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_CARE="),
    "care payment link env placeholder missing",
  );
  assert.ok(
    hasMatch(envExample, "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_GROWTH="),
    "growth payment link env placeholder missing",
  );
  assert.ok(
    hasMatch(envExample, "NEXT_PUBLIC_STRIPE_PAYMENT_LINK_WEBSITE_ABO="),
    "website abo payment link env placeholder missing",
  );
});

test("contact prefill logic is offer-driven (shared offer model)", async () => {
  const contactSource = await readFile("components/sections/Contact.tsx");
  const offersSource = await readFile("lib/offers.ts");
  assert.ok(
    contactSource.includes("findOffer"),
    "Contact should use shared offer resolver",
  );
  assert.ok(
    hasMatch(offersSource, "export const findOffer"),
    "offers file missing findOffer export",
  );
  assert.ok(
    contactSource.includes("buildOfferProjectMessage(selectedPackage)"),
    "Contact should reuse shared offer lookup for package params",
  );
  assert.ok(
    contactSource.includes("buildOfferProjectMessage(selectedOffer)"),
    "Contact should reuse shared offer lookup for offer params",
  );
});

test("pricing UI should apply offer-driven fallback CTA strategy", async () => {
  const pricingSource = await readFile("components/sections/Pricing.tsx");
  assert.ok(
    hasMatch(pricingSource, "resolveOfferCtaHref(offer, process.env)"),
    "Pricing should use env-backed offer CTA resolver",
  );
  assert.ok(
    hasMatch(pricingSource, "getOfferContactHref(offer)"),
    "Pricing should fall back to contact anchor",
  );
});

test("llms.txt matches phase-1 retainer + abo offer naming", async () => {
  const llmsSource = await readFile("public/llms.txt");
  assert.ok(hasMatch(llmsSource, "Care-Retainer"), "llms.txt should include Care-Retainer");
  assert.ok(hasMatch(llmsSource, "Growth-Retainer"), "llms.txt should include Growth-Retainer");
  assert.ok(hasMatch(llmsSource, "Website-Abo"), "llms.txt should include Website-Abo");
  assert.ok(
    !hasMatch(llmsSource, "Digitales Facility Management"),
    "llms.txt should not include legacy facility-management wording",
  );
});
