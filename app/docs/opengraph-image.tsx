import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";

export const runtime = "nodejs";
export const alt = "Loreon Docs — Methodology, sources, validation, and intelligence framework.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const steps = ["Collect", "Validate", "Correlate", "Score", "Surface"];

export default function OpengraphImage() {
  const logo = logoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          padding: "72px",
          background: "#F8FAFC",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", bottom: -240, right: -150, width: 660, height: 660, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,140,255,0.32), rgba(79,140,255,0) 68%)" }} />

        {/* left column: brand + copy */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={52} height={52} style={{ objectFit: "contain" }} alt="" />
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#07101F" }}>Loreon Docs</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 58, fontWeight: 700, color: "#07101F", lineHeight: 1.06, letterSpacing: "-0.02em" }}>
              Methodology, sources & the intelligence framework.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00D4FF" }} />
              <div style={{ fontSize: 25, color: "#0E7490", fontWeight: 600 }}>Documentation</div>
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 23, color: "#718096" }}>docs.loreonlabs.xyz</div>
        </div>

        {/* right column: knowledge architecture stack */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, flex: 1, paddingLeft: 56 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderRadius: 16, background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 14px 36px -22px rgba(15,23,42,0.22)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: 10, background: "rgba(0,212,255,0.12)", color: "#0E7490", fontSize: 18, fontWeight: 700 }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ display: "flex", fontSize: 26, fontWeight: 600, color: "#07101F" }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
