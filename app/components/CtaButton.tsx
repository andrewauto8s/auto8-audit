"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AUDIT_HREF } from "@/app/content";
import { trackCta } from "./track";

/**
 * Every call to action on the page is this component, so all of them go to the
 * same place and report the same event with a different `location`. That is
 * what makes it possible to tell which CTA actually drives audits.
 *
 * Link rather than a bare anchor: Next prefetches the audit route, so the page
 * is already in hand when someone taps. On a phone over cellular that is the
 * difference between instant and a visible wait at the exact moment of intent.
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
    <Link
      href={AUDIT_HREF}
      className={className}
      data-cta={location}
      onClick={() => trackCta(location)}
      {...rest}
    >
      {children}
    </Link>
  );
}
