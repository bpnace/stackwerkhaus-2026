import { faqs } from "@/lib/site-data";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FAQItem } from "@/components/ui/FAQItem";

export function FAQ() {
  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader id="faq" label="FAQ" marker="(SKWKHS® — 09)" />
        <div className="mb-10 max-w-4xl space-y-4 md:mb-16">
          <h2 className="display-lg">FAQ, aber in sinnvoll.</h2>
          <p className="text-lg leading-8 text-muted">
            Nicht nur Pflichtblock für die Sitemap, sondern Antworten auf
            Fragen, die man vor einem gemeinsamen Projektstart geklärt haben
            will.
          </p>
        </div>
        <div>
          {faqs.map((item) => (
            <FAQItem
              key={item.q}
              question={item.q}
              answer={item.a}
              links={item.links}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
