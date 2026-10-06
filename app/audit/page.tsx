import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import AuditEmbedFull from "@/app/components/AuditEmbedFull";
import AuditPageView from "@/app/components/AuditPageView";
import { META } from "@/app/content";

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  // A funnel destination, not a search landing page. Indexing it would put a
  // near contentless page into competition with the real one.
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

/**
 * Viewport for this route only.
 *
 * iOS Safari zooms the page whenever a focused input has a font size under
 * 16px. The inputs belong to the third party tool, so their font size is not
 * ours to change, and the zoom leaves the page wider than the screen with the
 * layout cut off at both edges. maximumScale stops that automatic zoom.
 *
 * It does not trap anyone: since iOS 10 Safari allows pinch zoom regardless of
 * this value, so a visitor who wants to zoom still can. It is set here rather
 * than in the root layout so the landing page, whose own type we control, is
 * unaffected.
 *
 * interactiveWidget asks the browser to shrink the layout viewport when the
 * keyboard opens, instead of sliding a full height page around underneath it.
 * Support is partial, so it is an improvement where honoured and inert where
 * it is not.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  interactiveWidget: "resizes-content",
  themeColor: "#ffffff",
};

/**
 * The audit on its own screen.
 *
 * The inline embed on the landing page has to guess a height, because a cross
 * origin iframe cannot be measured from the parent. Here there is nothing to
 * guess: a thin bar, then the tool fills the rest of the viewport exactly, so
 * the tool's own responsive layout does the work it was designed to do. That
 * matters most on a phone, where a short fixed height turns the audit into a
 * small scrolling window inside a scrolling page.
 */
export default function AuditPage() {
  return (
    <div className="audit-page">
      <AuditPageView />

      <header className="flex shrink-0 items-center justify-between border-b border-[var(--line)] bg-white px-4 py-2.5 sm:px-6">
        <Link href="/" aria-label="Back to Auto8">
          <Image
            src="/auto8-wordmark.webp"
            alt="Auto8"
            width={2000}
            height={569}
            priority
            className="h-[20px] w-auto sm:h-[24px]"
          />
        </Link>
        <Link
          href="/"
          className="text-sm font-medium text-[var(--ink-2)] hover:text-[var(--ink)]"
        >
          Back
        </Link>
      </header>

      <div className="audit-page-frame">
        <AuditEmbedFull />
      </div>
    </div>
  );
}
