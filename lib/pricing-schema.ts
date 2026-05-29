import { pricingTiers, websiteCheckOffer } from "@/lib/site-data";
import { siteConfig } from "@/lib/site-config";

function schemaPrice(value: string) {
  return value.replace(/[^\d,.]/g, "").replace(/\./g, "").replace(",", ".");
}

export function getSubscriptionPricingSchemaOffers(baseUrl = siteConfig.url) {
  return pricingTiers.map((tier) => ({
    "@type": "Offer",
    "@id": `${siteConfig.url}#offer-${tier.slug}`,
    name: tier.name,
    description: `${tier.description} Startet bei ${tier.monthlyPrice} ${tier.monthlySuffix}.`,
    url: new URL(tier.ctaHref || `/?paket=${tier.slug}#kontakt`, baseUrl).toString(),
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: tier.monthlyPrice,
      priceCurrency: "EUR",
      unitText: "Monat",
    },
  }));
}

export function getSubscriptionPricingSchemaOffer(slug: string, baseUrl = siteConfig.url) {
  const offer = getSubscriptionPricingSchemaOffers(baseUrl).find((item) =>
    item["@id"].endsWith(`#offer-${slug}`),
  );

  if (!offer) {
    throw new Error(`Unknown subscription offer: ${slug}`);
  }

  return offer;
}

export function getWebsiteCheckSchemaOffer(baseUrl = siteConfig.url) {
  return {
    "@type": "Offer",
    "@id": `${siteConfig.url}#offer-${websiteCheckOffer.slug}`,
    name: websiteCheckOffer.name,
    description: websiteCheckOffer.description,
    url: new URL(`/?angebot=${websiteCheckOffer.slug}#kontakt`, baseUrl).toString(),
    priceSpecification: {
      "@type": "PriceSpecification",
      price: schemaPrice(websiteCheckOffer.price),
      priceCurrency: "EUR",
    },
  };
}
