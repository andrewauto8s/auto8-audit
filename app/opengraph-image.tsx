import { ImageResponse } from "next/og";
import { HERO, META } from "@/app/content";

export const alt = META.ogTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time so the Facebook and LinkedIn share card is a real
 * designed image rather than a screenshot. Deliberately typographic: no logo
 * fetch, no custom font download, nothing that can fail during a build.
 *
 * The headline is read from content rather than repeated here. It was
 * duplicated once and silently drifted out of sync with the page when the
 * hero copy changed.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0f1e",
          padding: "72px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 6,
              borderRadius: 3,
              background:
                "linear-gradient(100deg, #0066ff 0%, #673ab7 28%, #f15ebd 52%, #ff8a3d 76%, #facc15 100%)",
            }}
          />
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            Free Local Marketing &amp; AI Rank Audit
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.08,
            letterSpacing: -2,
            fontWeight: 600,
            maxWidth: 940,
          }}
        >
          {HERO.heading}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          <div style={{ display: "flex" }}>
            Rankings. Heat maps. Competitors. AI visibility.
          </div>
          <div style={{ display: "flex", color: "#ffffff", fontWeight: 600 }}>
            auto8.ai
          </div>
        </div>
      </div>
    ),
    size
  );
}
