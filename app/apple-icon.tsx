import { ImageResponse } from "next/og";

/**
 * Apple touch icon — the LoreonLabs converging-signals mark on a premium navy
 * tile, rendered to PNG (SVG is unsupported for apple-icon).
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
        <svg width="112" height="112" viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient
              id="s"
              x1="6"
              y1="6"
              x2="26"
              y2="26"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3DD8FF" />
              <stop offset="1" stopColor="#4F8CFF" />
            </linearGradient>
            <radialGradient id="c" cx="0.5" cy="0.5" r="0.5">
              <stop stopColor="#5FE0FF" />
              <stop offset="1" stopColor="#00C4F0" />
            </radialGradient>
          </defs>
          <g stroke="url(#s)" strokeWidth="2.1" strokeLinecap="round" fill="none">
            <path d="M16 3.4 C 12.4 7.6, 12.9 12.2, 15.7 14.2" />
            <path
              d="M16 3.4 C 12.4 7.6, 12.9 12.2, 15.7 14.2"
              transform="rotate(120 16 16)"
            />
            <path
              d="M16 3.4 C 12.4 7.6, 12.9 12.2, 15.7 14.2"
              transform="rotate(240 16 16)"
            />
          </g>
          <circle cx="16" cy="16" r="2.7" fill="url(#c)" />
        </svg>
      </div>
    ),
    size,
  );
}
