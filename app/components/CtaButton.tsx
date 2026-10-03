"use client";

import type { ReactNode } from "react";
import { AUDIT_ANCHOR } from "@/app/content";
import { trackCta } from "./track";

/**
 * Every call to action on the page is this component, so all of them scroll to
 * the same anchor and report the same event with a different `location`. That
 * is what makes it possible to tell which CTA actually drives audits.
 *
 * It stays a real anchor rather than a button with a scroll handler: it works
 * before hydration, it is keyboard and screen reader native, and middle click
 * still does something sensible.
 */
export default function CtaButton({
  location,
  children,
  className = "btn btn-primary",
  ...rest
}: {
  /** Reported as cta_location. Keep these distinct per placement. */
  location: string;
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  return (
    <a
      href={`#${AUDIT_ANCHOR}`}
      className={className}
      data-cta={location}
      onClick={() => trackCta(location)}
      {...rest}
    >
      {children}
    </a>
  );
}
