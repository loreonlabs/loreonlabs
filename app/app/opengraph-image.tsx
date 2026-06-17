import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";

export const runtime = "nodejs";
export const alt = "Loreon App — Intelligence, narratives, ecosystems, and signals in one place.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const cards = [
  { label: "AI agents", state: "accelerating", tone: "#059669" },
  { label: "Stablecoins", state: "rising", tone: "#0E7490" },
  { label: "Base", state: "active", tone: "#0E7490" },
];

export default function OpengraphImage() {
  const logo = logoDataUri();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#F8FAFC",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ position: "absolute", top: -220, left: -140, width: 640, height: 640, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.38), rgba(79,140,255,0) 68%)" }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={52} height={52} style={{ objectFit: "contain" }} alt="" />
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#07101F" }}>Loreon App</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)" }}>
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#00D4FF" }} />
            <div style={{ fontSize: 20, color: "#0E7490", fontWeight: 600 }}>Live</div>
          </div>
        </div>

        {/* dashboard preview */}
        <div style={{ display: "flex", gap: 18 }}>
          {cards.map((c) => (
            <div key={c.label} style={{ display: "flex", flexDirection: "column", gap: 14, width: 300, padding: "22px", borderRadius: 20, background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 16px 40px -20px rgba(15,23,42,0.25)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00D4FF" }} />
                <div style={{ fontSize: 24, fontWeight: 600, color: "#07101F" }}>{c.label}</div>
              </div>
              <div style={{ display: "flex", fontSize: 18, color: c.tone, fontWeight: 600 }}>{c.state}</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6 }}>
                {[14, 22, 18, 30, 26, 40].map((h, i) => (
                  <div key={i} style={{ width: 12, height: h, borderRadius: 4, background: "rgba(0,212,255,0.7)" }} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 46, fontWeight: 700, color: "#07101F", letterSpacing: "-0.01em", maxWidth: 900 }}>
            Intelligence, narratives, ecosystems, and signals in one place.
          </div>
          <div style={{ display: "flex", fontSize: 23, color: "#718096" }}>app.loreonlabs.xyz · Intelligence Dashboard</div>
        </div>
      </div>
    ),
    size,
  );
}
