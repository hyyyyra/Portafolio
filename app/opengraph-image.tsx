import { ImageResponse } from "next/og"
import { PERSONAL_INFO } from "@/lib/constants"

export const alt = "Fabián Trapp Rodríguez — Desarrollador Full Stack en Santiago, Chile"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const ACCENT = "#0076b5"
const BG = "#081019"
const MUTED = "#8ea3b8"
const DIM = "#4c5b6b"
const FG = "#f3f6f9"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "72px",
          backgroundColor: BG,
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: -160,
            right: -160,
            width: 460,
            height: 460,
            borderRadius: 999,
            backgroundColor: "rgba(0,118,181,0.22)",
          }}
        />
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 420,
            height: 420,
            borderRadius: 999,
            backgroundColor: "rgba(0,118,181,0.10)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, backgroundColor: "#f87171" }} />
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, backgroundColor: "#facc15" }} />
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, backgroundColor: "#4ade80" }} />
            <div style={{ display: "flex", marginLeft: 14, fontSize: 22, color: DIM, fontFamily: "monospace" }}>
              fabian@dev ~ zsh
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: DIM }}>fabiantrappr.site</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: ACCENT,
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            {PERSONAL_INFO.role} · Santiago, Chile
          </div>
          <div style={{ display: "flex", fontSize: 76, color: FG, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>
            {PERSONAL_INFO.name}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: MUTED, maxWidth: 920, lineHeight: 1.4 }}>
            Transformo ideas en productos digitales escalables con resultados medibles.
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", gap: 14 }}>
          {["PHP", "TypeScript", "React", "SQL"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1.5px solid rgba(255,255,255,0.15)",
                color: "#dbe1e9",
                fontSize: 22,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
