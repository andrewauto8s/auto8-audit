import { AUDIT_EMBED_SRC } from "@/app/content";

/**
 * The audit tool itself. The wrapper classes come from globals.css and are the
 * embed code the tool ships with: the iframe is drawn taller than its frame and
 * pulled up by the tool's own header height, so its internal title bar is
 * cropped and the page heading above is not duplicated.
 *
 * loading="eager" is deliberate. This is the page's single conversion target
 * and it sits above the fold on a phone, so it must never wait on lazy loading.
 */
export default function AuditEmbed() {
  return (
    <div className="audit-frame">
      <div className="audit-embed">
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
