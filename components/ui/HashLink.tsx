"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent, ReactNode } from "react";

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
};

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

export function HashLink({ href, onClick, scroll, children, ...props }: HashLinkProps) {
  const pathname = usePathname();
  const parsedHref = (() => {
    try {
      return new URL(href, "https://stackwerkhaus.local");
    } catch {
      return null;
    }
  })();
  const isSamePathHash =
    Boolean(parsedHref?.hash) && parsedHref?.pathname === pathname;
  const resolvedScroll = scroll ?? (isSamePathHash ? false : undefined);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (
      event.defaultPrevented ||
      typeof window === "undefined" ||
      isModifiedEvent(event)
    ) {
      return;
    }

    const targetUrl = new URL(href, window.location.origin);
    const isSamePath = targetUrl.pathname === pathname;
    const hash = targetUrl.hash.replace(/^#/, "");

    if (isSamePath && !hash) {
      event.preventDefault();
      window.history.replaceState(
        null,
        "",
        `${targetUrl.pathname}${targetUrl.search}`,
      );
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    if (!hash || !isSamePath) {
      return;
    }

    const target = document.getElementById(hash);
    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(
      null,
      "",
      `${targetUrl.pathname}${targetUrl.search}`,
    );
    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <Link href={href} onClick={handleClick} scroll={resolvedScroll} {...props}>
      {children}
    </Link>
  );
}
