"use client";

import { useRef, useState } from "react";
import { ensureGsap, gsap, shouldReduceMotion } from "@/lib/gsap";
import { HashLink } from "@/components/ui/HashLink";
import { LinkRippleText } from "@/components/ui/LinkRippleText";

type FAQLink = {
  label: string;
  href: string;
};

type FAQItemProps = {
  question: string;
  answer: string;
  links?: readonly FAQLink[];
};

export function FAQItem({ question, answer, links = [] }: FAQItemProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const toggle = () => {
    ensureGsap();

    if (!contentRef.current || shouldReduceMotion()) {
      setOpen((value) => !value);
      return;
    }

    if (!open) {
      gsap.fromTo(
        contentRef.current,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.35, ease: "power2.out" },
      );
    } else {
      gsap.to(contentRef.current, {
        height: 0,
        autoAlpha: 0,
        duration: 0.28,
        ease: "power2.in",
      });
    }

    setOpen((value) => !value);
  };

  return (
    <div className="border-b border-border py-6">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-start justify-between gap-8 text-left"
        aria-expanded={open}
      >
        <span className="text-lg font-medium leading-7">{question}</span>
        <span className="text-2xl text-muted">{open ? "−" : "+"}</span>
      </button>
      <div
        ref={contentRef}
        style={open && shouldReduceMotion() ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden"
      >
        <p className="pt-4 max-w-3xl text-muted">{answer}</p>
        {links.length > 0 ? (
          <div className="flex max-w-3xl flex-col gap-3 pt-5 sm:flex-row sm:flex-wrap">
            {links.map((link) => (
              <HashLink
                key={link.href}
                href={link.href}
                className="link-arrow w-full justify-between border border-border px-4 py-3 text-foreground hover:border-foreground sm:w-fit"
              >
                <LinkRippleText text={link.label} baseWeight={620} />
                <span aria-hidden>+</span>
              </HashLink>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
