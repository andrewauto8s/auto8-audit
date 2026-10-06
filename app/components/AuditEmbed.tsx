"use client";

import { useEffect, useState } from "react";
import { AUDIT_EMBED_SRC, AUDIT_HEADER_CROP } from "@/app/content";

/** Only messages from the tool's own origin are trusted. */
const EMBED_ORIGIN = new URL(AUDIT_EMBED_SRC).origin;

/** Guards against a bad message collapsing or exploding the embed. */
const MIN_HEIGHT = 650;
const MAX_HEIGHT = 6000;

/**
 * Pulls a pixel height out of whatever shape the embedded tool posts.
 * Covers the common conventions (iframe-resizer, a bare number, a JSON
 * string, or an object with a height-ish key) so this keeps working if the
 * tool changes how it reports, without needing a change here.
 */
function readHeight(data: unknown): number | null {
  if (typeof data === "number") {
    return Number.isFinite(data) ? data : null;
  }

  if (typeof data === "string") {
    // iframe-resizer: "[iFrameSizer]iFrameResizer0:420:0:init"
    const sizer = data.match(/\[iFrameSizer\][^:]*:(\d+(?:\.\d+)?)/);
    if (sizer) return Number(sizer[1]);

    const bare = Number(data);
    if (data.trim() !== "" && Number.isFinite(bare)) return bare;

    try {
      return readHeight(JSON.parse(data));
    } catch {
      return null;
    }
  }

  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    for (const key of ["height", "scrollHeight", "documentHeight", "frameHeight"]) {
      const value = obj[key];
      if (typeof value === "number" && Number.isFinite(value)) return value;
      if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) {
        return Number(value);
      }
    }
  }

  return null;
}

/**
 * The audit tool. The wrapper classes come from globals.css and are the embed
 * code the tool ships with: the iframe is drawn taller than its frame and
 * pulled up by the tool's own header height, so its internal title bar is
 * cropped and the page heading above is not duplicated.
 *
 * Height is the hard part. A cross-origin iframe cannot be measured from the
 * parent, so the frame is a fixed height by default and anything taller than
 * it has to be scrolled inside the frame, which is poor on a phone. If the
 * tool posts its content height, this adopts it and the frame grows to fit,
 * removing the nested scroll entirely. If it posts nothing, the CSS height
 * stands and behaviour is unchanged, so this is safe either way.
 *
 * loading="eager" is deliberate. This is the page's single conversion target
 * and it sits above the fold on a phone, so it must never wait on lazy loading.
 */
export default function AuditEmbed() {
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== EMBED_ORIGIN) return;

      const reported = readHeight(event.data);
      if (reported === null || !Number.isFinite(reported)) return;

      const clamped = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, Math.round(reported)));
      // Ignore sub-pixel churn, which would otherwise rerender on every frame
      // while the tool animates.
      setHeight((current) =>
        current !== null && Math.abs(current - clamped) < 2 ? current : clamped
      );
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="audit-frame">
      <div
        className="audit-embed"
        style={{
          // How much of the tool's own header to crop. See AUDIT_HEADER_CROP.
          ["--internal-header-height" as string]: `${AUDIT_HEADER_CROP}px`,
          // Inline height wins over the stylesheet only once the tool has
          // actually reported one.
          ...(height ? { height: `${height}px` } : {}),
        }}
      >
        <iframe
          src={AUDIT_EMBED_SRC}
          title="Free Local SEO Audit"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-write"
        />
      </div>
    </div>
  );
}
