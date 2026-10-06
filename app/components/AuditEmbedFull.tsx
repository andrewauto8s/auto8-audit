import { AUDIT_EMBED_SRC } from "@/app/content";

/**
 * The audit tool given an entire viewport.
 *
 * Nothing is cropped and no height is guessed: the tool simply fills the box
 * the page hands it, which is what the tool's own responsive layout was built
 * for. That removes every sizing problem the inline embed has to manage, at
 * the cost of the surrounding page copy.
 */
export default function AuditEmbedFull() {
  return (
    <iframe
      src={AUDIT_EMBED_SRC}
      title="Free Local SEO Audit"
      loading="eager"
      referrerPolicy="strict-origin-when-cross-origin"
      allow="clipboard-write"
      className="block h-full w-full border-0"
    />
  );
}
