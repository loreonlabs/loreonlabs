import { ImageResponse } from "next/og";
import { logoDataUri } from "@/lib/og-logo";

export const runtime = "nodejs";
export const alt = "LoreonLabs — Discover what gains attention before consensus.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
        <div style={{ position: "absolute", top: -240, right: -150, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.42), rgba(79,140,255,0) 68%)" }} />
        <div style={{ position: "absolute", bottom: -260, left: -160, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,140,255,0.30), rgba(79,140,255,0) 68%)" }} />

        {/* discovery signal bars */}
        <div style={{ position: "absolute", right: 84, bottom: 150, display: "flex", alignItems: "flex-end", gap: 11 }}>
          {[60, 92, 72, 128, 104, 158, 196, 250].map((h, i) => (
            <div key={i} style={{ width: 18, height: h, borderRadius: 8, background: "linear-gradient(180deg,#25C9FF,#4F8CFF)", opacity: 0.9 }} />
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={56} height={56} style={{ objectFit: "contain" }} alt="" />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            <div style={{ color: "#07101F" }}>Loreon</div>
            <div style={{ color: "#718096" }}>Labs</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 76, fontWeight: 700, color: "#07101F", lineHeight: 1.04, letterSpacing: "-0.02em", maxWidth: 820 }}>
            Discover what gains attention before consensus.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#00D4FF" }} />
            <div style={{ fontSize: 27, color: "#0E7490", fontWeight: 600 }}>Discovery & Intelligence Platform</div>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 24, color: "#718096" }}>loreonlabs.xyz</div>
      </div>
    ),
    size,
  );
}
