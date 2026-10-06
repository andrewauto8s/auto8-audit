"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AUDIT_HREF, CTA_LABEL } from "@/app/content";
import { trackCta } from "./track";

/**
 * Phone only. Most of this page's traffic arrives from a social feed on a
 * phone, where the hero CTA scrolls away in one swipe and there is no header
 * button to fall back on.
 *
 * It appears once the hero is behind you and then stays, since the audit now
 * lives on its own route and there is nothing on this page for it to cover.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-[var(--line)] bg-white/95 p-3 backdrop-blur transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      // Hidden from assistive tech and from tab order while off screen, so a
      // keyboard user never lands on an invisible control.
      aria-hidden={!visible}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <Link
        href={AUDIT_HREF}
        className="btn btn-primary w-full"
        data-cta="sticky-mobile"
        tabIndex={visible ? 0 : -1}
        onClick={() => trackCta("sticky-mobile")}
      >
        {CTA_LABEL}
      </Link>
    </div>
  );
}
