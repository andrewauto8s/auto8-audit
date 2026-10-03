import { HEATMAP } from "@/app/content";

/**
 * An illustration, not live data. The grid is hard coded rather than generated
 * so it renders identically on the server and the client, and so the shape
 * tells the real story: strong at the pin, falling away with distance.
 */
const GRID: number[][] = [
  [12, 9, 7, 5, 8, 11, 15],
  [10, 6, 4, 3, 5, 9, 13],
  [7, 4, 2, 2, 3, 6, 10],
  [5, 3, 1, 2, 2, 4, 8],
  [6, 4, 2, 1, 3, 6, 11],
  [9, 7, 5, 4, 7, 10, 14],
  [13, 11, 9, 8, 12, 16, 20],
];

/** Centre cell carries the business pin. */
const PIN = { row: 3, col: 3 };

function colorFor(rank: number) {
  if (rank <= 3) return "#16a34a";
  if (rank <= 7) return "#eab308";
  if (rank <= 14) return "#f97316";
  return "#dc2626";
}

export default function HeatmapDemo() {
  return (
    <figure className="m-0">
      <div className="card p-3 sm:p-4">
        <div
          className="grid gap-1.5 sm:gap-2"
          style={{ gridTemplateColumns: "repeat(7, minmax(0, 1fr))" }}
          role="img"
          aria-label="Example local ranking heat map: positions one to three near the business address, falling to fifteen and lower at the edges of the service area."
        >
          {GRID.map((row, r) =>
            row.map((rank, c) => {
              const isPin = r === PIN.row && c === PIN.col;
              return (
                <div
                  key={`${r}-${c}`}
                  className="heat-cell"
                  style={{
                    background: colorFor(rank),
                    boxShadow: isPin
                      ? "inset 0 0 0 2px #fff, 0 0 0 2px #0b1222"
                      : undefined,
                  }}
                >
                  {rank >= 20 ? "20+" : rank}
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        {HEATMAP.legend.map((l) => (
          <span key={l.label} className="inline-flex items-center gap-2 text-sm text-[var(--ink-2)]">
            <span
              className="h-2.5 w-2.5 rounded-[3px]"
              style={{ background: l.color }}
              aria-hidden="true"
            />
            {l.label}
          </span>
        ))}
      </div>

      <figcaption className="mt-3 text-sm text-[var(--ink-3)]">
        {HEATMAP.caption}
      </figcaption>
    </figure>
  );
}
