import { TickerMotion } from "@/components/sections/TickerMotion";
import { tickerItems } from "@/lib/site-data";

export function Ticker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <section className="overflow-hidden border-y border-border bg-white text-black">
      <div data-ticker-root="true" className="py-4">
        <div
          data-ticker-track="true"
          className="ticker-track flex w-max gap-10 whitespace-nowrap px-6 md:gap-16 md:px-12"
        >
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="text-[length:var(--label)] font-medium uppercase tracking-[0.32em]"
            >
              {item}
            </span>
          ))}
        </div>
        <TickerMotion />
      </div>
    </section>
  );
}
