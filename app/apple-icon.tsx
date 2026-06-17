import { ImageResponse } from "next/og";

/**
 * Apple touch icon — the LoreonLabs signal-flow mark on a premium navy tile,
 * rendered to PNG (SVG is unsupported for apple-icon).
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07101F",
        }}
      >
        <svg width="120" height="103" viewBox="0 0 28 24" fill="none">
          <path
            d="M3.5 18.5 L11 13 L17.5 15 L24 5.5"
            stroke="#25C9FF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="3.5" cy="18.5" r="2" fill="#25C9FF" />
          <circle cx="11" cy="13" r="2" fill="#4FD8FF" />
          <circle cx="17.5" cy="15" r="2" fill="#25C9FF" />
          <circle cx="24" cy="5.5" r="2.9" fill="#00D4FF" />
        </svg>
      </div>
    ),
    size,
  );
}
