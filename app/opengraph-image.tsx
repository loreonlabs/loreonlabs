import { ImageResponse } from "next/og";

export const alt =
  "LoreonLabs — Discover what gains attention before consensus.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "84px",
          background: "#F8FAFC",
          position: "relative",
        }}
      >
        {/* ambient cyan/blue field */}
        <div
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 640,
            height: 640,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.38), rgba(79,140,255,0) 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -260,
            left: -160,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(79,140,255,0.28), rgba(79,140,255,0) 68%)",
          }}
        />

        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 16,
              height: 40,
              borderRadius: 8,
              background: "linear-gradient(180deg, #25C9FF, #4F8CFF)",
            }}
          />
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>
            <div style={{ color: "#07101F" }}>Loreon</div>
            <div style={{ color: "#718096" }}>Labs</div>
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#07101F",
              lineHeight: 1.04,
              letterSpacing: "-0.02em",
              maxWidth: 940,
            }}
          >
            Discover what gains attention before consensus.
          </div>
          <div style={{ fontSize: 32, color: "#2D3748", maxWidth: 880 }}>
            Intelligence & discovery for narratives, builders, projects, and
            markets.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#0E7490" }}>
          loreonlabs.xyz
        </div>
      </div>
    ),
    size,
  );
}
